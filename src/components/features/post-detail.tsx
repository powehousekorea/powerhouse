import Image from "next/image";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { urlFor } from "@/sanity/lib/image";
import type { Post, PortableTextBlock } from "@/types/post";

type PostType = "activity" | "news";

interface PostDetailProps {
  post: Post;
  type: PostType;
}

export function PostDetail({ post, type }: PostDetailProps) {
  const hasValidDate =
    post.publishedAt &&
    typeof post.publishedAt === "string" &&
    !isNaN(new Date(post.publishedAt).getTime());

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
          {type === "activity" ? (
            <span className="uppercase tracking-wider font-medium text-primary">
              Activity
            </span>
          ) : (
            post.categories?.map((cat: string) => (
              <span
                key={cat}
                className="uppercase tracking-wider font-medium text-primary"
              >
                {cat}
              </span>
            ))
          )}
          <span>•</span>
          {hasValidDate && (
            <time dateTime={post.publishedAt}>
              {format(new Date(post.publishedAt as string), "PPP", {
                locale: ko,
              })}
            </time>
          )}
        </div>

        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 leading-tight">
          {post.title}
        </h1>

        {post.summary && (
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {post.summary}
          </p>
        )}
      </div>

      {/* News main image */}
      {type === "news" && post.mainImage && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-12 bg-muted">
          <Image
            src={urlFor(post.mainImage).width(1200).height(675).url()}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Body */}
      <div className="prose prose-lg dark:prose-invert mx-auto">
        {post.body && (
          <div className="space-y-4">
            {post.body.map((block: PortableTextBlock, index: number) => {
              if (type === "activity" && block._type === "image") {
                // 활동 상세 페이지의 이미지 렌더링 방식 유지
                return (
                  <div
                    key={block._key || index}
                    className="relative aspect-video w-full overflow-hidden rounded-lg my-8"
                  >
                    <Image
                      src={urlFor(block).url()}
                      alt="Activity image"
                      fill
                      className="object-cover"
                    />
                  </div>
                );
              }

              // 기본 텍스트 블록 렌더링 (활동/뉴스 공통)
              return (
                <p key={block._key || index} className="leading-relaxed">
                  {block.children?.map((child) => child.text).join("")}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}


