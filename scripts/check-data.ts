import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN
});

const ACTIVITIES_QUERY = `*[_type == "post" && "activity" in categories] { title, publishedAt, slug, mainImage }`;

async function checkData() {
    const activities = await client.fetch(ACTIVITIES_QUERY);
    console.log(`총 ${activities.length}개의 활동을 찾았습니다.`);
    activities.forEach((a: any, index: number) => {
        console.log(`\n[${index + 1}] 제목: ${a.title}`);
        console.log(`발행일: ${a.publishedAt} (타입: ${typeof a.publishedAt})`);
        console.log(`Slug: ${JSON.stringify(a.slug)}`);
        console.log(`Slug.current: "${a.slug?.current}"`);
        console.log(`메인 이미지: ${a.mainImage ? '있음' : '없음'}`);
    });
}

checkData();
