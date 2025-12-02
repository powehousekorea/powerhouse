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

function removeTitlePrefix(title: string): string {
    // "공지 활동 " 또는 "공지 성명서 "로 시작하는 경우 제거
    let cleanedTitle = title.trim();
    
    if (cleanedTitle.startsWith('공지 활동 ')) {
        cleanedTitle = cleanedTitle.replace(/^공지 활동\s+/, '');
    } else if (cleanedTitle.startsWith('공지 성명서 ')) {
        cleanedTitle = cleanedTitle.replace(/^공지 성명서\s+/, '');
    }
    
    return cleanedTitle.trim();
}

async function removePrefixes() {
    console.log('활동 게시글 제목에서 접두사 제거 중...\n');
    
    // 활동 카테고리 게시글만 가져오기
    const posts = await client.fetch(`*[_type == "post" && "activity" in categories] { _id, title, slug }`);
    console.log(`총 ${posts.length}개의 활동 게시글을 찾았습니다.\n`);

    let updatedCount = 0;

    for (const post of posts) {
        const originalTitle = post.title;
        const cleanedTitle = removeTitlePrefix(originalTitle);

        // 제목이 변경된 경우에만 업데이트
        if (cleanedTitle !== originalTitle) {
            try {
                // 새로운 슬러그 생성
                const newSlug = cleanedTitle
                    .toLowerCase()
                    .replace(/[^a-z0-9가-힣]+/g, '-')
                    .replace(/^-+|-+$/g, '')
                    .substring(0, 96);

                await client
                    .patch(post._id)
                    .set({
                        title: cleanedTitle,
                        slug: {
                            _type: 'slug',
                            current: newSlug
                        }
                    })
                    .commit();

                console.log(`✓ 업데이트: "${originalTitle}"`);
                console.log(`  → "${cleanedTitle}"`);
                console.log(`  슬러그: ${newSlug}\n`);
                updatedCount++;
            } catch (error) {
                console.error(`✗ 실패: "${originalTitle}"`, error);
            }
        }
    }

    console.log(`\n완료! 총 ${updatedCount}개의 게시글 제목이 업데이트되었습니다.`);
}

removePrefixes();

