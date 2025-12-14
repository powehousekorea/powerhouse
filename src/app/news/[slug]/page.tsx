import { reader } from "@/lib/keystatic";
import { notFound } from "next/navigation";
import { PostDetail } from "@/components/features/post-detail";

export const revalidate = 60;

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = await reader.collections.posts.all();
    return posts
        .filter((post) => post.entry.categories.includes('news'))
        .map((post) => ({
            slug: post.slug,
        }));
}

export default async function PostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await reader.collections.posts.read(slug);

    if (!post) {
        notFound();
    }

    // MDX 콘텐츠 렌더링
    const { default: Content } = await import(`../../../../content/posts/${slug}/index.mdx`).catch(() => ({
        default: () => null
    }));

    const postData = {
        slug,
        title: post.title,
        mainImage: post.mainImage,
        categories: post.categories,
        publishedAt: post.publishedAt,
        summary: post.summary,
    };

    return <PostDetail post={postData} type="news" content={<Content />} />;
}
