import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.powerhousekorea.com';

async function scrapeActivities() {
    console.log('Scraping Activities with Puppeteer...');

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    let allActivities: any[] = [];
    let currentPage = 1;
    let hasMore = true;

    // Scrape all pages
    while (hasMore) {
        console.log(`\nScraping page ${currentPage}...`);
        const pageUrl = currentPage === 1 
            ? `${BASE_URL}/article` 
            : `${BASE_URL}/article?page=${currentPage}`;
        
        await page.goto(pageUrl, { waitUntil: 'networkidle2' });

        // Wait for items to load
        try {
            await page.waitForSelector('a.post_link_wrap', { timeout: 10000 });
        } catch (e) {
            console.log(`No more items found on page ${currentPage}`);
            hasMore = false;
            break;
        }

        const activities = await page.evaluate((baseUrl) => {
            const items: any[] = [];
            const links = document.querySelectorAll('a.post_link_wrap');

            links.forEach((link) => {
                const href = link.getAttribute('href');

                // Title
                const titleEl = link.querySelector('div.card-body > div.title');
                const titleText = titleEl?.textContent?.trim() || '';
                const title = titleText.replace(/\s+/g, ' ');

                // Date
                const dateEl = link.querySelector('div.card-foot small.date');
                const date = dateEl?.textContent?.trim() || '';

                // Image
                const imageDiv = link.querySelector('div.card_wrapper');
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
                        url: href.startsWith('http') ? href : `${baseUrl}${href}`,
                        publishedAt: date,
                        image,
                        _type: 'post',
                        category: 'activity'
                    });
                }
            });

            return items;
        }, BASE_URL);

        if (activities.length === 0) {
            hasMore = false;
            break;
        }

        console.log(`Found ${activities.length} activities on page ${currentPage}`);
        allActivities = [...allActivities, ...activities];

        // Check if there's a next page button
        const hasNextPage = await page.evaluate(() => {
            const nextButton = document.querySelector('.pagination a.next, .pagination a[aria-label="Next"]');
            return nextButton !== null;
        });

        if (!hasNextPage) {
            hasMore = false;
        } else {
            currentPage++;
        }
    }

    console.log(`\nTotal activities found: ${allActivities.length}. Starting detail scraping...`);

    // 2. Scrape details for each activity
    for (let i = 0; i < allActivities.length; i++) {
        const activity = allActivities[i];
        console.log(`[${i + 1}/${allActivities.length}] Scraping details for: ${activity.title.substring(0, 60)}...`);

        try {
            await page.goto(activity.url, { waitUntil: 'networkidle2' });
            
            // Wait a bit more for JavaScript rendering
            await new Promise(r => setTimeout(r, 2000));

            // Extract body and date if missing
            const details = await page.evaluate(() => {
                const contentEl = document.querySelector('.board_txt_area') || document.querySelector('.fr-view');
                const bodyText = contentEl?.innerHTML || '';

                let date = '';
                // Try to find date in the entire page content
                const allText = document.body.innerText || document.body.textContent || '';
                const dateMatch = allText.match(/(\d{4}-\d{2}-\d{2})/);
                if (dateMatch) {
                    date = dateMatch[1];
                }

                return { bodyText, date };
            });

            activity.body = details.bodyText;
            if (details.date) {
                activity.publishedAt = details.date;
            } else if (activity.body) {
                // Try to extract date from body text
                const bodyDateMatch = activity.body.match(/(\d{4}년\s*\d{1,2}월\s*\d{1,2}일)/);
                if (bodyDateMatch) {
                    const koreanDate = bodyDateMatch[1];
                    const match = koreanDate.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);
                    if (match) {
                        const year = match[1];
                        const month = match[2].padStart(2, '0');
                        const day = match[3].padStart(2, '0');
                        activity.publishedAt = `${year}-${month}-${day}`;
                    }
                } else {
                    // Try standard date format in body
                    const bodyStandardDateMatch = activity.body.match(/(\d{4}-\d{2}-\d{2})/);
                    if (bodyStandardDateMatch) {
                        activity.publishedAt = bodyStandardDateMatch[1];
                    }
                }
            }

            // Add a small delay
            await new Promise(r => setTimeout(r, 500));

        } catch (error) {
            console.error(`Failed to scrape details for ${activity.title}:`, error);
        }
    }

    await browser.close();

    console.log(`\nScraping complete! Total: ${allActivities.length} activities.`);
    fs.writeFileSync(path.join(__dirname, 'activities_data.json'), JSON.stringify(allActivities, null, 2));
    return allActivities;
}

scrapeActivities();
