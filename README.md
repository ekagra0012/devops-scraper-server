# 🐳 DevOps Scraper & API Server

[![Docker](https://img.shields.io/badge/Docker-ready-blue)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.10-blue)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-lightgrey)](https://flask.palletsprojects.com/)
[![Puppeteer](https://img.shields.io/badge/Puppeteer-HeadlessBrowser-orange)](https://pptr.dev/)

## 📌 Overview

This project demonstrates a **multi-stage Dockerized application** that:
- Uses **Node.js with Puppeteer and Chromium** to scrape data from a dynamic URL
- Uses **Python Flask** to serve the scraped data via a simple web API
- Combines **web scraping, containerization, and microservice deployment** into a lean and modular setup

---

## ⚙️ Tech Stack

| Layer        | Technology                    |
|--------------|-------------------------------|
| Scraping     | Node.js, Puppeteer, Chromium  |
| Hosting API  | Python 3.10, Flask            |
| Container    | Multi-stage Dockerfile        |
| Deployment   | Docker, VS Code               |

---

## 🧪 Features

- 🔗 Accepts any dynamic URL using an environment variable (`SCRAPE_URL`)
- 🌐 Extracts web page `title` and first `h1` heading
- 🧠 Uses Puppeteer + Chromium in **headless** mode
- 📤 Saves output to `scraped_data.json`
- 🔥 Flask API server exposes scraped data via `GET /`
- 🐳 Multi-stage Docker build ensures **minimal final image**

---

## 📁 Folder Structure
├── scrape.js              # Node.js web scraper using Puppeteer
├── server.py              # Flask server to host scraped JSON
├── Dockerfile             # Multi-stage build: Node.js + Python
├── package.json           # Node dependencies
├── requirements.txt       # Python dependencies
├── scraped_data.json      # Output (auto-generated)
└── README.md              # You’re reading it!

---

