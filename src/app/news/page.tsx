import { getNewsPosts } from "@/lib/keystatic";
import { PostListPage } from "@/components/features/post-list-page";

export const revalidate = 60;

export default async function NewsPage() {
    const posts = await getNewsPosts();

    return (
        <PostListPage
            title="청연 NEWS"
            subtitle={[
                "뉴스에 등장한 청연 소식!",
                "어떤 활동이 있었는지 확인해 보세요!"
            ]}
            emptyMessage="아직 등록된 게시물이 없습니다."
            posts={posts}
        />
    );
}
