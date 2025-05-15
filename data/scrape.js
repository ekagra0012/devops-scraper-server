const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Get the URL from the environment variable (default to http://example.com)
const url = process.env.SCRAPE_URL || 'http://example.com';
console.log(`Starting to scrape: ${url}`);

(async () => {
  try {
    console.log('Launching Puppeteer...');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    console.log('Opening page...');
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Check for redirects to login pages
    const currentUrl = page.url();
    if (currentUrl !== url) {
      console.log(`Notice: Redirected to ${currentUrl}`);
    }
    if (currentUrl.includes('login')) {
      console.log('Redirected to a login page. Cannot scrape protected content.');
      await browser.close();
      return;
    }

    const title = await page.title();
    console.log(`Page Title: ${title}`);

    // Try to get the first <h1> element, handle if not present
    let heading = null;
    try {
      heading = await page.$eval('h1', el => el.textContent.trim());
      console.log(`First Heading: ${heading}`);
    } catch (e) {
      heading = null;
      console.log('No <h1> element found on the page.');
    }

    const scrapedData = { title, heading };

    // Use a relative output directory for portability
    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true }); // Ensure output directory exists
    }

    // Write data to output file
    const filePath = path.join(outputDir, 'scraped_data.json');
    fs.writeFileSync(filePath, JSON.stringify(scrapedData, null, 2));
    console.log(`Scraping completed. Data saved to ${filePath}`);

    await browser.close();
  } catch (error) {
    console.error('Error during scraping:', error);
  }
})();
