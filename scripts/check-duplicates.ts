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

const ALL_POSTS_QUERY = `*[_type == "post"] { _id, title, publishedAt, slug, categories }`;

async function checkDuplicates() {
    const posts = await client.fetch(ALL_POSTS_QUERY);
    console.log(`총 ${posts.length}개의 게시물을 찾았습니다.`);

    const titleMap = new Map<string, any[]>();
    const invalidDatePosts: any[] = [];

    posts.forEach((post: any) => {
        if (!titleMap.has(post.title)) {
            titleMap.set(post.title, []);
        }
        titleMap.get(post.title)?.push(post);

        if (!post.publishedAt) {
            invalidDatePosts.push(post);
        }
    });

    console.log('\n=== 중복 게시물 검사 ===');
    let duplicateCount = 0;
    titleMap.forEach((items, title) => {
        if (items.length > 1) {
            console.log(`\n[중복됨] 제목: "${title}" (${items.length}개)`);
            items.forEach(item => {
                console.log(`  - ID: ${item._id}, 날짜: ${item.publishedAt}, 카테고리: ${item.categories}`);
            });
            duplicateCount++;
        }
    });

    if (duplicateCount === 0) {
        console.log('중복된 게시물이 없습니다.');
    }

    console.log(`\n=== 날짜 누락 게시물 검사 (${invalidDatePosts.length}개) ===`);
    invalidDatePosts.slice(0, 5).forEach(post => {
         console.log(`  - 제목: "${post.title}", ID: ${post._id}`);
    });
}

checkDuplicates();



