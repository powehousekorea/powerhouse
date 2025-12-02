import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN
});

async function deleteAllActivities() {
    console.log('Fetching all activities...');
    const activities = await client.fetch(`*[_type == "post" && "activity" in categories] { _id, title }`);
    
    console.log(`Found ${activities.length} activities to delete.`);
    
    for (const activity of activities) {
        try {
            await client.delete(activity._id);
            console.log(`✓ Deleted: ${activity.title}`);
        } catch (error) {
            console.error(`✗ Failed to delete: ${activity.title}`, error);
        }
    }
    
    console.log('\nAll activities deleted!');
}

deleteAllActivities();



