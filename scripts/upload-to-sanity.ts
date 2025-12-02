import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2024-11-30',
});

async function uploadImage(imageUrl: string) {
    if (!imageUrl) return null;
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data);
        const asset = await client.assets.upload('image', buffer, {
            filename: path.basename(imageUrl)
        });
        return {
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: asset._id
            }
        };
    } catch (error) {
        console.error(`Failed to upload image: ${imageUrl}`, error);
        return null;
    }
}

async function uploadPeople() {
    const peopleData = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'people_data.json'), 'utf-8')
    );

    console.log(`Uploading ${peopleData.length} people to Sanity...`);

    for (const item of peopleData) {
        try {
            const imageAsset = await uploadImage(item.image);

            const doc = {
                _type: 'person',
                name: item.name,
                role: item.role,
                bio: item.bio,
                image: imageAsset,
            };

            await client.create(doc);
            console.log(`✓ Uploaded Person: ${item.name}`);
        } catch (error) {
            console.error(`✗ Failed to upload Person: ${item.name}`, error);
        }
    }
}

async function uploadActivities() {
    const activitiesData = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'activities_data.json'), 'utf-8')
    );

    console.log(`Uploading ${activitiesData.length} activities to Sanity...`);

    for (const item of activitiesData) {
        try {
            const imageAsset = await uploadImage(item.image);

            // Parse body HTML to blocks
            const blocks: any[] = [];
            if (item.body) {
                // Simple regex based parsing for <p> tags
                const paragraphs = item.body.split('</p>');
                for (const p of paragraphs) {
                    const cleanP = p.replace(/<p[^>]*>/g, '').trim();
                    if (!cleanP) continue;

                    // Check for image
                    const imgMatch = cleanP.match(/<img[^>]+src="([^">]+)"/);
                    if (imgMatch) {
                        const imgSrc = imgMatch[1];
                        const imgAsset = await uploadImage(imgSrc);
                        if (imgAsset) {
                            blocks.push({
                                _type: 'image',
                                _key: Math.random().toString(36).substring(7),
                                asset: imgAsset.asset
                            });
                        }
                        // 이미지가 있으면 텍스트 블록은 추가하지 않음
                        continue;
                    }

                    // Check for text (strip tags)
                    const text = cleanP.replace(/<[^>]+>/g, '').trim();
                    if (text) {
                        blocks.push({
                            _type: 'block',
                            _key: Math.random().toString(36).substring(7),
                            style: 'normal',
                            children: [{ _type: 'span', text: text }]
                        });
                    }
                }
            }

            // Parse and format the date
            let publishedAt = undefined;
            if (item.publishedAt && item.publishedAt.trim()) {
                try {
                    // Handle various date formats
                    const dateStr = item.publishedAt.trim();
                    // If date is in YYYY-MM-DD format, convert to ISO string
                    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
                        publishedAt = new Date(dateStr + 'T00:00:00Z').toISOString();
                    } else {
                        // Try parsing as-is
                        const parsed = new Date(dateStr);
                        if (!isNaN(parsed.getTime())) {
                            publishedAt = parsed.toISOString();
                        }
                    }
                } catch (e) {
                    console.warn(`Failed to parse date for ${item.title}: ${item.publishedAt}`);
                }
            }

            const doc = {
                _type: 'post',
                title: item.title,
                slug: {
                    _type: 'slug',
                    current: item.title
                        .toLowerCase()
                        .replace(/[^a-z0-9가-힣]+/g, '-')
                        .replace(/^-+|-+$/g, '')
                        .substring(0, 96)
                },
                publishedAt,
                mainImage: imageAsset,
                categories: ['activity'], // Add category
                body: blocks.length > 0 ? blocks : undefined,
                summary: blocks.find(b => b._type === 'block')?.children[0]?.text?.substring(0, 200)
            };

            await client.create(doc);
            console.log(`✓ Uploaded Activity: ${item.title}`);
        } catch (error) {
            console.error(`✗ Failed to upload Activity: ${item.title}`, error);
        }
    }
}

async function main() {
    await uploadPeople();
    await uploadActivities();
    console.log('All uploads complete!');
}

main();
