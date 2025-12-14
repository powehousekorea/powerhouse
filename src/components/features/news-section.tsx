"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PostCard } from "./post-card";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { Post } from "@/types/post";

interface NewsSectionProps {
    posts: Post[];
}

export function NewsSection({ posts }: NewsSectionProps) {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            className="relative py-24 bg-muted/30"
        >
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Section Header */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="text-center mb-16"
                >
                    <motion.span
                        variants={fadeInUp}
                        className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-4"
                    >
                        News
                    </motion.span>
                    <motion.h2
                        variants={fadeInUp}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                    >
                        청연
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">
                            {" "}뉴스
                        </span>
                    </motion.h2>
                    <motion.p
                        variants={fadeInUp}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    >
                        뉴스에 등장한 청연 소식을 확인해보세요.
                    </motion.p>
                </motion.div>

                {/* Posts Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
                    {posts.map((post, index) => (
                        <PostCard key={post.slug} post={post} index={index} />
                    ))}
                </div>

                {/* View More Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-center"
                >
                    <Link href="/news">
                        <motion.span
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-foreground font-medium hover:bg-muted transition-colors duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            모든 뉴스 보기
                            <ArrowRight className="w-4 h-4" />
                        </motion.span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
