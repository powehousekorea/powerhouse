import { client } from "@/sanity/lib/client";
import { NEWS_QUERY } from "@/sanity/lib/queries";
import { PostCard } from "@/components/features/post-card";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function NewsPage() {
    const posts = await client.fetch(NEWS_QUERY);

    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            <div className="mb-20 text-center space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                    청연 NEWS
                </h1>
                <div className="space-y-2 text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                    <p>뉴스에 등장한 청연 소식!</p>
                    <p>어떤 활동이 있었는지 확인해 보세요!</p>
                </div>
            </div>

            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
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
