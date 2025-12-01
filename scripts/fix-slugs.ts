import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2024-11-30',
});

async function fixSlugs() {
    console.log('Fetching posts...');
    const posts = await client.fetch(`*[_type == "post"]`);

    console.log(`Found ${posts.length} posts. Updating slugs...`);

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const newSlug = `news-${i + 1}`;

        try {
            await client
                .patch(post._id)
                .set({ slug: { _type: 'slug', current: newSlug } })
                .commit();

            console.log(`✓ Updated: ${post.title} → ${newSlug}`);
        } catch (error) {
            console.error(`✗ Failed to update: ${post.title}`, error);
        }
    }

    console.log('Slug update complete!');
}

fixSlugs();
