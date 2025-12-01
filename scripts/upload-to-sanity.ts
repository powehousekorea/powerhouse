import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN, // You'll need to add this
    apiVersion: '2024-11-30',
});

async function uploadNews() {
    const newsData = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'extracted_news.json'), 'utf-8')
    );

    console.log(`Uploading ${newsData.length} news items to Sanity...`);

    for (const item of newsData) {
        try {
            const doc = {
                _type: 'post',
                title: item.title,
                slug: {
                    _type: 'slug',
                    current: item.title
                        .toLowerCase()
                        .replace(/[^a-z0-9가-힣]+/g, '-')
                        .replace(/^-+|-+$/g, ''),
                },
                publishedAt: item.date,
                summary: item.summary,
                body: item.content.split('\n').map((line: string) => ({
                    _type: 'block',
                    _key: Math.random().toString(36).substring(7),
                    style: 'normal',
                    children: [
                        {
                            _type: 'span',
                            text: line,
                        },
                    ],
                })),
                categories: [item.category],
            };

            const result = await client.create(doc);
            console.log(`✓ Uploaded: ${item.title}`);
        } catch (error) {
            console.error(`✗ Failed to upload: ${item.title}`, error);
        }
    }

    console.log('Upload complete!');
}

uploadNews();
