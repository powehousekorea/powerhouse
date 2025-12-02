import * as dotenv from 'dotenv';
import path from 'path';

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

async function cleanupActivities() {
    console.log('Cleaning up Activities...');

    // Fetch all posts with category 'activity'
    const query = `*[_type == "post" && "activity" in categories]._id`;
    const ids = await client.fetch(query);

    console.log(`Found ${ids.length} activities to delete.`);

    if (ids.length > 0) {
        const transaction = client.transaction();
        ids.forEach((id: string) => transaction.delete(id));
        await transaction.commit();
        console.log('Deletion complete.');
    } else {
        console.log('No activities found.');
    }
}

cleanupActivities();
