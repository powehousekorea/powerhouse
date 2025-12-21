"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/types/post";

interface PostCardProps {
    post: Post;
    index?: number;
}

interface CardContentProps {
    post: Post;
    showArrowIndicator?: boolean;
}

function CardContent({ post, showArrowIndicator = false }: CardContentProps) {
    return (
        <>
            {/* Image Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                {post.mainImage ? (
                    <>
                        <Image
                            src={post.mainImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {/* Arrow indicator - only shown in animated version */}
                        {showArrowIndicator && (
                            <div className="absolute bottom-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <ArrowUpRight className="w-5 h-5 text-white" />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground bg-gradient-to-br from-muted to-muted/50">
                        <span className="text-4xl opacity-30">📝</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Meta info */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    {post.categories?.map((cat) => (
                        <span
                            key={cat}
                            className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium uppercase tracking-wider text-[10px]"
                        >
                            {cat}
                        </span>
                    ))}
                    {post.publishedAt && (
                        <time dateTime={post.publishedAt} className="text-muted-foreground/70">
                            {format(new Date(post.publishedAt), "yyyy.MM.dd", { locale: ko })}
                        </time>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold leading-snug mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post.title}
                </h3>

                {/* Summary */}
                {post.summary && (
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {post.summary}
                    </p>
                )}
            </div>
        </>
    );
}

export function PostCard({ post, index = 0 }: PostCardProps) {
    const basePath = post.categories?.includes('activity') ? '/activities' : '/news';

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            <Link href={`${basePath}/${post.slug}`} className="group block h-full">
                <motion.div
                    className="h-full overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                    whileHover={{ y: -5, scale: 1.01 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <CardContent post={post} showArrowIndicator />
                </motion.div>
            </Link>
        </motion.article>
    );
}

// Non-animated version for server components
export function PostCardStatic({ post }: { post: Post }) {
    const basePath = post.categories?.includes('activity') ? '/activities' : '/news';

    return (
        <article>
            <Link href={`${basePath}/${post.slug}`} className="group block h-full">
                <div className="h-full overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                    <CardContent post={post} />
                </div>
            </Link>
        </article>
    );
}
