import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { Post } from "@/types/post";

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    // Determine the correct path based on categories
    const basePath = post.categories?.includes('activity') ? '/activities' : '/news';

    return (
        <Link href={`${basePath}/${post.slug}`} className="group h-full block">
            <Card className="h-full overflow-hidden border-none shadow-none bg-transparent transition-colors hover:bg-muted/50">
                <div className="relative aspect-[1.6/1] w-full overflow-hidden rounded-lg bg-muted">
                    {post.mainImage ? (
                        <Image
                            src={post.mainImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            No Image
                        </div>
                    )}
                </div>
                <CardHeader className="p-4 pb-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        {post.categories?.map((cat) => (
                            <span key={cat} className="uppercase tracking-wider font-medium text-primary/80">
                                {cat}
                            </span>
                        ))}
                        {post.publishedAt && (
                            <>
                                <span>•</span>
                                <time dateTime={post.publishedAt}>
                                    {format(new Date(post.publishedAt), "PPP", { locale: ko })}
                                </time>
                            </>
                        )}
                    </div>
                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                    </h3>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.summary}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}
