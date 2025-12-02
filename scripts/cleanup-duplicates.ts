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

const DATE_MAPPING: Record<string, string> = {
    "공지 활동 [국회 토론회] 1인가구 및 고립된 시민의 '연결된 사회'를 향한 정책토론회 참여": "2025-09-23T00:00:00Z",
    "공지 활동 충북청년미래센터와 '위기청년 발굴·지원을 위한 업무협약' 진행": "2025-07-15T00:00:00Z",
    "공지 성명서 새 정부의 출범을 축하하며, 청년의 이름으로 이재명 대통령에게 요구한다.": "2025-06-05T00:00:00Z",
    "공지 활동 청년 정치 인식 서베이 “혼란, 분노, 각성… 탄핵을 겪은 청년들, 2025 대선에 묻다”": "2025-06-05T00:00:00Z",
    "공지 성명서 윤석열 파면을 환영하며, 청년세대와 함께 민주주의를 다시 세우겠다": "2025-04-04T00:00:00Z",
    "공지 활동 [대한민국 청년정책 어워즈] 청년정책 발굴단 오프라인 교류회 참석": "2025-02-25T00:00:00Z"
};

async function cleanupDuplicates() {
    // Fetch all posts
    const posts = await client.fetch(`*[_type == "post"] { _id, title, publishedAt, slug }`);
    console.log(`총 ${posts.length}개의 게시물을 가져왔습니다.`);

    // Group by title
    const titleMap = new Map<string, any[]>();
    posts.forEach((post: any) => {
        if (!titleMap.has(post.title)) {
            titleMap.set(post.title, []);
        }
        titleMap.get(post.title)?.push(post);
    });

    // Process each group
    for (const [title, group] of titleMap.entries()) {
        // 1. Handle Duplicates
        if (group.length > 1) {
            console.log(`\n중복 정리 중: "${title}" (${group.length}개)`);
            
            // Keep the first one, delete the rest
            const [keep, ...remove] = group;
            console.log(`  - 유지: ${keep._id}`);
            
            for (const item of remove) {
                console.log(`  - 삭제: ${item._id}`);
                await client.delete(item._id);
            }

            // 2. Update Date for the kept item
            if (DATE_MAPPING[title]) {
                console.log(`  - 날짜 업데이트: ${DATE_MAPPING[title]}`);
                await client.patch(keep._id).set({ publishedAt: DATE_MAPPING[title] }).commit();
            }
        } else if (group.length === 1) {
            // Even if not duplicate, check if date needs update
            const item = group[0];
            if ((!item.publishedAt || item.publishedAt === "") && DATE_MAPPING[title]) {
                 console.log(`\n날짜 업데이트 (단일 항목): "${title}"`);
                 console.log(`  - 날짜 설정: ${DATE_MAPPING[title]}`);
                 await client.patch(item._id).set({ publishedAt: DATE_MAPPING[title] }).commit();
            }
        }
    }
    
    console.log('\n정리 완료!');
}

cleanupDuplicates();



