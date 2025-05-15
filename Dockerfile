FROM node:18-slim AS scraper

RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    libappindicator3-1 \
    libnss3 \
    lsb-release \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

COPY package.json /app/
RUN npm install

COPY data/scrape.js /app/

ARG SCRAPE_URL=http://example.com
ENV SCRAPE_URL=${SCRAPE_URL}

RUN node scrape.js

# Diagnostic: List files to verify output
RUN ls -l /app && ls -l /app/output || echo "No output directory"

FROM python:3.10-slim AS server

WORKDIR /app
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY --from=scraper /app/output/scraped_data.json /app/scraped_data.json



COPY server.py /app/

EXPOSE 5000
CMD ["python", "server.py"]
