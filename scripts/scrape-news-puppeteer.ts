import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.powerhousekorea.com';

async function scrapeNewsWithPuppeteer() {
    console.log('Scraping News with Puppeteer...');

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(`${BASE_URL}/news`, { waitUntil: 'networkidle2' });

    // Wait for news items to load
    await page.waitForSelector('a.post_link_wrap', { timeout: 10000 }).catch(() => {
        console.log('No news items found with selector a.post_link_wrap');
    });

    const newsItems = await page.evaluate(() => {
        const items: any[] = [];
        const links = document.querySelectorAll('a.post_link_wrap');

        links.forEach((link) => {
            const href = link.getAttribute('href');

            // Title
            const titleEl = link.querySelector('div > div:nth-child(2) > div:first-child');
            const title = titleEl?.textContent?.trim() || '';

            // Date
            const dateEl = link.querySelector('small');
            const date = dateEl?.textContent?.trim() || '';

            // Summary
            const summaryEl = link.querySelector('div > div:nth-child(2) > div:nth-child(2) span');
            const summary = summaryEl?.textContent?.trim() || '';

            // Image - check for background image
            const imageDiv = link.querySelector('div > div:first-child') as HTMLElement;
            let image = '';
            if (imageDiv) {
                const style = imageDiv.getAttribute('style') || '';
                const match = style.match(/url\(['"]?([^'"]+)['"]?\)/);
                if (match) {
                    image = match[1];
                }
            }

            if (title && href) {
                items.push({
                    title,
                    date,
                    summary: summary.substring(0, 200),
                    image,
                    link: href.startsWith('http') ? href : `${BASE_URL}${href}`,
                    category: 'news'
                });
            }
        });

        return items;
    });

    await browser.close();

    console.log(`Found ${newsItems.length} news items.`);
    fs.writeFileSync(path.join(__dirname, 'news_data.json'), JSON.stringify(newsItems, null, 2));
    return newsItems;
}

scrapeNewsWithPuppeteer();
