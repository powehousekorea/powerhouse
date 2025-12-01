import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.powerhousekorea.com';

async function scrapeNews() {
    console.log('Scraping News...');
    const { data } = await axios.get(`${BASE_URL}/news`);
    const $ = cheerio.load(data);
    const newsItems: any[] = [];

    // Based on DOM analysis: news items are in <a class="post_link_wrap">
    $('a.post_link_wrap').each((i, el) => {
        const $item = $(el);
        const link = $item.attr('href');

        // Extract title (second div's first child div)
        const title = $item.find('div > div:nth-child(2) > div:first-child').text().trim();

        // Extract date (small tag)
        const date = $item.find('small').text().trim();

        // Extract summary (span in second div's second child)
        const summary = $item.find('div > div:nth-child(2) > div:nth-child(2) span').text().trim();

        // Extract image - it's likely a background image, so we'll try to get it from style attribute
        const imageDiv = $item.find('div > div:first-child').first();
        const style = imageDiv.attr('style') || '';
        const imageMatch = style.match(/url\(['"]?([^'"]+)['"]?\)/);
        const image = imageMatch ? imageMatch[1] : null;

        if (title && link) {
            newsItems.push({
                title,
                date,
                summary: summary.substring(0, 200), // Limit summary length
                image,
                link: link.startsWith('http') ? link : `${BASE_URL}${link}`,
                category: 'news'
            });
        }
    });

    console.log(`Found ${newsItems.length} news items.`);
    fs.writeFileSync(path.join(__dirname, 'news_data.json'), JSON.stringify(newsItems, null, 2));
    return newsItems;
}

scrapeNews();
