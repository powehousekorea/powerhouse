import { client } from "@/sanity/lib/client";
import { POST_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { PostDetail } from "@/components/features/post-detail";

export const revalidate = 60;

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ActivityPage({ params }: PageProps) {
    const { slug: encodedSlug } = await params;
    const slug = decodeURIComponent(encodedSlug);
    const post = await client.fetch(POST_QUERY, { slug });

    if (!post) {
        notFound();
    }

    return <PostDetail post={post} type="activity" />;
}
