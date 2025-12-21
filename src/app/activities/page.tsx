import { getActivityPosts } from "@/lib/keystatic";
import { PostListPage } from "@/components/features/post-list-page";

export const revalidate = 60;

export default async function ActivitiesPage() {
    const posts = await getActivityPosts();

    return (
        <PostListPage
            title="청연 활동 소식"
            subtitle={[
                "한국청년유권자연맹의 최근 소식!",
                "어떤 일이 있었을까요?"
            ]}
            emptyMessage="아직 등록된 활동이 없습니다."
            posts={posts}
        />
    );
}
