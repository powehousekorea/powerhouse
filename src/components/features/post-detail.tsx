import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar, Clock, ChevronLeft } from "lucide-react";
import type { Post } from "@/types/post";

type PostType = "activity" | "news";

interface PostDetailProps {
  post: Post;
  type: PostType;
  content?: React.ReactNode;
}

export function PostDetail({ post, type, content }: PostDetailProps) {
  const hasValidDate =
    post.publishedAt &&
    typeof post.publishedAt === "string" &&
    !isNaN(new Date(post.publishedAt).getTime());

  return (
    <article className="min-h-screen bg-background pb-24">
      {/* 1. Hero Header Section */}
      <div className="relative w-full bg-muted/30 border-b border-border/40">
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl text-center">
          {/* Back Button */}
          <Link
            href={type === "activity" ? "/activities" : "/news"}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            목록으로 돌아가기
          </Link>

          {/* Category Badge */}
          <div className="flex justify-center gap-2 mb-6">
            {post.categories?.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20"
              >
                {cat === "news" ? "NEWS" : "ACTIVITY"}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6 leading-tight break-keep">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            {hasValidDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.publishedAt!}>
                  {format(new Date(post.publishedAt as string), "PPP", {
                    locale: ko,
                  })}
                </time>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>3 min read</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Section */}
      <div className="container mx-auto px-4 max-w-3xl mt-12">
        {/* MDX Body Content */}
        <div
          className="prose prose-lg prose-slate dark:prose-invert max-w-none
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
          prose-p:text-foreground/80 prose-p:leading-8
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-xl prose-img:shadow-md
          prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
          prose-li:marker:text-primary"
        >
          {content}
        </div>

        {/* 3. Footer */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex items-center justify-center">
            <Link
              href={type === "activity" ? "/activities" : "/news"}
              className="inline-flex items-center gap-2 px-6 py-3 bg-muted text-foreground font-semibold rounded-full hover:bg-muted/80 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
