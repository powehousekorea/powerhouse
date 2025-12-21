import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PostDetail } from "@/components/features/post-detail";
import { getPostDetail, generatePostStaticParams, generatePostMetadata } from "@/lib/post-utils";

export const revalidate = 60;

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return generatePostStaticParams("news");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    return generatePostMetadata(slug, "news");
}

export default async function NewsDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const result = await getPostDetail(decodedSlug);

    if (!result) {
        notFound();
    }

    const { post, Content } = result;
    return <PostDetail post={post} type="news" content={Content} />;
}
