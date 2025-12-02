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

async function cleanupPeople() {
    console.log('People 데이터 정리 중...');

    // 모든 person 문서 가져오기
    const query = `*[_type == "person"]._id`;
    const ids = await client.fetch(query);

    console.log(`총 ${ids.length}개의 person 문서를 찾았습니다.`);

    if (ids.length > 0) {
        const transaction = client.transaction();
        ids.forEach((id: string) => transaction.delete(id));
        await transaction.commit();
        console.log('삭제 완료.');
    } else {
        console.log('삭제할 문서가 없습니다.');
    }
}

cleanupPeople();
