import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { PostCard } from "@/components/features/post-card";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function NewsPage() {
    const posts = await client.fetch(POSTS_QUERY);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12 text-center">
                <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                    News & Activities
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Powerhouse Korea의 최신 소식과 활동을 전해드립니다.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.length > 0 ? (
                    posts.map((post: any) => (
                        <PostCard key={post._id} post={post} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-muted-foreground">
                        아직 등록된 게시물이 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
}
