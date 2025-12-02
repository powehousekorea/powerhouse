import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.powerhousekorea.com';

async function scrapePeople() {
    console.log('Scraping People with Puppeteer...');

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto(`${BASE_URL}/people`, { waitUntil: 'networkidle2' });

    // Debug: Take a screenshot
    await page.screenshot({ path: path.join(__dirname, 'debug_people.png') });

    // Wait for text-table or similar
    try {
        await page.waitForSelector('.text-table', { timeout: 10000 });
    } catch (e) {
        console.log('No .text-table found (timeout)');
    }

    const people = await page.evaluate(() => {
        const items: any[] = [];
        // Each person is in a .col-dz div
        const columns = document.querySelectorAll('.col-dz');
        console.log(`Found ${columns.length} columns`);

        columns.forEach((col) => {
            // Find image
            let image = '';
            // Try multiple selectors
            let imgWrap = col.querySelector('.img-wrap');
            if (!imgWrap) {
                imgWrap = col.querySelector('[style*="background-image"]');
            }

            if (imgWrap) {
                const style = imgWrap.getAttribute('style') || '';
                const match = style.match(/url\(["']?([^"')]+)["']?\)/);
                if (match) {
                    image = match[1];
                    // Clean up URL
                    image = image.replace(/&quot;/g, '').split('?')[0];
                }
            }

            // Find text info
            const textTable = col.querySelector('.text-table');
            if (!textTable) return;

            const paragraphs = textTable.querySelectorAll('p');
            if (paragraphs.length === 0) return;

            let name = '';
            let role = '';
            let bio = '';

            // First paragraph is usually the name
            if (paragraphs.length >= 1) {
                name = paragraphs[0].textContent?.trim() || '';
            }
            // Second is role
            if (paragraphs.length >= 2) {
                role = paragraphs[1].textContent?.trim() || '';
            }
            // Third is bio
            if (paragraphs.length >= 3) {
                bio = paragraphs[2].textContent?.trim() || '';
            }

            // Filter out section headers and invalid entries
            if (name && name.length < 50 && !name.includes('함께하는') && !name.includes('운영위원') && !name.includes('청연과')) {
                items.push({
                    name,
                    role,
                    bio,
                    image,
                    _type: 'person'
                });
            }
        });

        return items;
    });

    await browser.close();

    console.log(`Found ${people.length} people.`);
    fs.writeFileSync(path.join(__dirname, 'people_data.json'), JSON.stringify(people, null, 2));
    return people;
}

scrapePeople();
