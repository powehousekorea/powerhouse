import { PostCard } from "@/components/features/post-card";
import type { Post } from "@/types/post";

interface PostListPageProps {
    title: string;
    subtitle: string[];
    emptyMessage: string;
    posts: Post[];
}

export function PostListPage({ title, subtitle, emptyMessage, posts }: PostListPageProps) {
    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            <div className="mb-20 text-center space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                    {title}
                </h1>
                <div className="space-y-2 text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                    {subtitle.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            </div>

            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-muted-foreground">
                        {emptyMessage}
                    </div>
                )}
            </div>
        </div>
    );
}
