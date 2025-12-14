import Image from "next/image";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { Post } from "@/types/post";

type PostType = "activity" | "news";

interface PostDetailProps {
  post: Post;
  type: PostType;
  content?: React.ReactNode; // MDX 렌더링된 콘텐츠
}

export function PostDetail({ post, type, content }: PostDetailProps) {
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
            <time dateTime={post.publishedAt!}>
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

      {/* Main image */}
      {post.mainImage && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-12 bg-muted">
          <Image
            src={post.mainImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Body - MDX Content */}
      <div className="prose prose-lg dark:prose-invert mx-auto">
        {content}
      </div>
    </article>
  );
}
