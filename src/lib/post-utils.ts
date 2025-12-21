import * as fs from "fs/promises";
import * as path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import type { Post } from "@/types/post";
import type { Metadata } from "next";
import { getAllPosts, getNewsPosts, getActivityPosts } from "./keystatic";

export type PostCategory = "activity" | "news";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://powerhouse.kr";
const SITE_NAME = "한국청년유권자연맹";

interface PostDetailResult {
    post: Post;
    Content: React.ReactNode;
}

/**
 * Find the actual folder name that matches the given slug
 * Handles URL-encoded slugs and partial matches
 */
async function findPostFolder(slug: string): Promise<string | null> {
    const postsDir = path.join(process.cwd(), "content/posts");
    const decodedSlug = decodeURIComponent(slug);

    try {
        const dirs = await fs.readdir(postsDir);

        // Exact match first
        if (dirs.includes(decodedSlug)) {
            return decodedSlug;
        }

        // Try URL-encoded version
        if (dirs.includes(slug)) {
            return slug;
        }

        // No match found
        return null;
    } catch {
        return null;
    }
}

/**
 * Fetch post data and MDX content by slug
 * Uses fs and gray-matter for reading, compileMDX for rendering
 */
export async function getPostDetail(slug: string): Promise<PostDetailResult | null> {
    const folderName = await findPostFolder(slug);

    if (!folderName) {
        return null;
    }

    const mdxPath = path.join(process.cwd(), "content/posts", folderName, "index.mdx");

    try {
        const fileContent = await fs.readFile(mdxPath, "utf-8");
        const { data: frontmatter, content } = matter(fileContent);

        // Compile MDX content
        const { content: Content } = await compileMDX({
            source: content,
            options: {
                parseFrontmatter: false,
            },
        });

        const post: Post = {
            slug: folderName,
            title: frontmatter.title || "",
            mainImage: frontmatter.mainImage || null,
            categories: Array.isArray(frontmatter.categories) ? frontmatter.categories : [],
            publishedAt: frontmatter.publishedAt || null,
            summary: frontmatter.summary || null,
        };

        return { post, Content };
    } catch (error) {
        console.error(`Error reading post ${slug}:`, error);
        return null;
    }
}

/**
 * Generate static params for a specific category
 * Uses fs-based getAllPosts from keystatic.ts
 */
export async function generatePostStaticParams(category: PostCategory) {
    const posts = category === "activity" ? await getActivityPosts() : await getNewsPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

/**
 * Generate metadata for post detail pages
 * Includes SEO best practices: robots, canonical, authors
 */
export async function generatePostMetadata(slug: string, category: PostCategory): Promise<Metadata> {
    const decodedSlug = decodeURIComponent(slug);
    const folderName = await findPostFolder(decodedSlug);

    if (!folderName) {
        return {
            title: "게시물을 찾을 수 없습니다",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const mdxPath = path.join(process.cwd(), "content/posts", folderName, "index.mdx");

    try {
        const fileContent = await fs.readFile(mdxPath, "utf-8");
        const { data: post } = matter(fileContent);

        const basePath = category === "activity" ? "/activities" : "/news";
        const categoryLabel = category === "activity" ? "활동" : "뉴스";
        const canonicalUrl = `${SITE_URL}${basePath}/${folderName}`;
        const description = post.summary || `${SITE_NAME} ${categoryLabel} - ${post.title}`;

        const imageUrl = post.mainImage
            ? post.mainImage.startsWith("http")
                ? post.mainImage
                : `${SITE_URL}${post.mainImage}`
            : undefined;

        return {
            title: post.title,
            description,
            authors: [{ name: SITE_NAME }],
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    "max-image-preview": "large",
                    "max-snippet": -1,
                    "max-video-preview": -1,
                },
            },
            alternates: {
                canonical: canonicalUrl,
            },
            openGraph: {
                title: post.title,
                description,
                type: "article",
                url: canonicalUrl,
                siteName: SITE_NAME,
                locale: "ko_KR",
                images: imageUrl
                    ? [
                          {
                              url: imageUrl,
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
                description,
                images: imageUrl ? [imageUrl] : undefined,
            },
        };
    } catch {
        return {
            title: "게시물을 찾을 수 없습니다",
            robots: {
                index: false,
                follow: false,
            },
        };
    }
}
