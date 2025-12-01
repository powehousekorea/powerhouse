import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.powerhousekorea.com';

async function scrapePeople() {
    console.log('Scraping People...');
    const { data } = await axios.get(`${BASE_URL}/people`);
    const $ = cheerio.load(data);
    const people: any[] = [];

    // Adjust selector based on actual site structure (from previous analysis)
    // Assuming a list or grid structure. I'll target common containers.
    // Based on screenshot, it looks like a grid.
    // I'll try to find images and names.

    // Since I can't inspect the DOM interactively here, I'll use a generic approach 
    // and might need to refine it if I had the HTML content.
    // But I'll try to target elements that look like profile cards.

    // Let's assume standard Imweb structure or generic divs.
    // I'll look for images with alt text or adjacent text.

    // Strategy: Find all images in the main content area.
    $('img').each((i, el) => {
        const src = $(el).attr('src');
        const alt = $(el).attr('alt'); // Name often in alt

        // Filter out small icons or layout images
        if (src && !src.includes('logo') && !src.includes('icon')) {
            // Try to find role or bio nearby
            const container = $(el).closest('div');
            const text = container.text().trim();

            if (text.length > 2 && text.length < 200) {
                people.push({
                    name: alt || 'Unknown',
                    image: src,
                    bio: text.replace(alt || '', '').trim(),
                    role: 'Member' // Default role
                });
            }
        }
    });

    // Deduplicate and clean
    const uniquePeople = people.filter((p, index, self) =>
        index === self.findIndex((t) => (
            t.image === p.image
        ))
    );

    console.log(`Found ${uniquePeople.length} people.`);
    fs.writeFileSync(path.join(__dirname, 'people_data.json'), JSON.stringify(uniquePeople, null, 2));
}

scrapePeople();
