import { client } from "@/sanity/lib/client";
import { ACTIVITIES_QUERY } from "@/sanity/lib/queries";
import { PostCard } from "@/components/features/post-card";

export const revalidate = 60;

export default async function ActivitiesPage() {
    const posts = await client.fetch(ACTIVITIES_QUERY);

    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            <div className="mb-20 text-center space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                    청연 활동 소식
                </h1>
                <div className="space-y-2 text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                    <p>한국청년유권자연맹의 최근 소식!</p>
                    <p>어떤 일이 있었을까요?</p>
                </div>
            </div>

            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {posts.length > 0 ? (
                    posts.map((post: any) => (
                        <PostCard key={post._id} post={post} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-muted-foreground">
                        아직 등록된 활동이 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
}
