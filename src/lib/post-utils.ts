import { reader } from "@/lib/keystatic";
import type { Post } from "@/types/post";
import type { Metadata } from "next";

export type PostCategory = "activity" | "news";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://powerhouse.kr";

interface PostDetailResult {
    post: Post;
    Content: React.ComponentType;
}

/**
 * Fetch post data and MDX content by slug
 * Handles slug decoding consistently across all post detail pages
 */
export async function getPostDetail(slug: string): Promise<PostDetailResult | null> {
    const post = await reader.collections.posts.read(slug);

    if (!post) {
        return null;
    }

    const { default: Content } = await import(`../../content/posts/${slug}/index.mdx`).catch(() => ({
        default: () => null
    }));

    const postData: Post = {
        slug,
        title: post.title,
        mainImage: post.mainImage,
        categories: post.categories,
        publishedAt: post.publishedAt,
        summary: post.summary,
    };

    return { post: postData, Content };
}

/**
 * Generate static params for a specific category
 */
export async function generatePostStaticParams(category: PostCategory) {
    const posts = await reader.collections.posts.all();
    return posts
        .filter((post) => post.entry.categories.includes(category))
        .map((post) => ({
            slug: post.slug,
        }));
}

/**
 * Generate metadata for post detail pages
 */
export async function generatePostMetadata(
    slug: string,
    category: PostCategory
): Promise<Metadata> {
    const post = await reader.collections.posts.read(slug);

    if (!post) {
        return {
            title: "게시물을 찾을 수 없습니다",
        };
    }

    const basePath = category === "activity" ? "/activities" : "/news";
    const categoryLabel = category === "activity" ? "활동" : "뉴스";

    return {
        title: post.title,
        description: post.summary || `한국청년유권자연맹 ${categoryLabel} - ${post.title}`,
        openGraph: {
            title: post.title,
            description: post.summary || `한국청년유권자연맹 ${categoryLabel}`,
            type: "article",
            url: `${SITE_URL}${basePath}/${slug}`,
            images: post.mainImage
                ? [
                    {
                        url: post.mainImage.startsWith("http")
                            ? post.mainImage
                            : `${SITE_URL}${post.mainImage}`,
                        width: 1200,
                        height: 630,
                        alt: post.title,
                    },
                ]
                : undefined,
            publishedTime: post.publishedAt || undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.summary || `한국청년유권자연맹 ${categoryLabel}`,
            images: post.mainImage
                ? [
                    post.mainImage.startsWith("http")
                        ? post.mainImage
                        : `${SITE_URL}${post.mainImage}`,
                ]
                : undefined,
        },
    };
}
