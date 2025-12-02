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

async function removeDuplicates() {
    console.log('중복 게시글 삭제 시작...\n');
    
    // 모든 게시글 가져오기
    const posts = await client.fetch(`*[_type == "post"] { _id, title, publishedAt, slug, _createdAt }`);
    console.log(`총 ${posts.length}개의 게시물을 찾았습니다.\n`);

    // 제목별로 그룹화
    const titleMap = new Map<string, any[]>();
    posts.forEach((post: any) => {
        if (!titleMap.has(post.title)) {
            titleMap.set(post.title, []);
        }
        titleMap.get(post.title)?.push(post);
    });

    let totalDeleted = 0;
    let duplicateGroups = 0;

    // 각 중복 그룹 처리
    for (const [title, group] of titleMap.entries()) {
        if (group.length > 1) {
            duplicateGroups++;
            console.log(`\n[중복 그룹 ${duplicateGroups}] "${title}" (${group.length}개)`);
            
            // 날짜가 있는 것을 우선적으로 유지, 날짜가 같으면 가장 최근에 생성된 것을 유지
            group.sort((a, b) => {
                // 날짜가 있는 것을 우선
                if (a.publishedAt && !b.publishedAt) return -1;
                if (!a.publishedAt && b.publishedAt) return 1;
                
                // 둘 다 날짜가 있으면 날짜 비교
                if (a.publishedAt && b.publishedAt) {
                    const dateCompare = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
                    if (dateCompare !== 0) return dateCompare;
                }
                
                // 날짜가 같거나 둘 다 없으면 생성일 비교 (최신 것 우선)
                return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime();
            });

            // 첫 번째 것(가장 좋은 것)을 유지하고 나머지 삭제
            const [keep, ...remove] = group;
            console.log(`  ✓ 유지: ${keep._id} (날짜: ${keep.publishedAt || '없음'})`);
            
            for (const item of remove) {
                try {
                    await client.delete(item._id);
                    console.log(`  ✗ 삭제: ${item._id}`);
                    totalDeleted++;
                } catch (error) {
                    console.error(`  ✗ 삭제 실패: ${item._id}`, error);
                }
            }
        }
    }

    console.log(`\n\n=== 완료 ===`);
    console.log(`중복 그룹 수: ${duplicateGroups}개`);
    console.log(`삭제된 게시글 수: ${totalDeleted}개`);
    console.log(`남은 게시글 수: ${posts.length - totalDeleted}개`);
}

removeDuplicates();

