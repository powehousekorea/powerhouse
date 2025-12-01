"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-background px-4 py-20">
            <div className="container relative z-10 mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="mb-6 font-serif text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
                        Powerhouse Korea
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <p className="mb-10 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
                        사람과 아이디어를 연결하는 디지털 허브.<br className="hidden sm:block" />
                        우리는 더 나은 미래를 위해 함께 고민하고 행동합니다.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col gap-4 sm:flex-row sm:justify-center"
                >
                    <Button size="lg" className="text-base px-8" asChild>
                        <Link href="/about">소개 보기</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="text-base px-8" asChild>
                        <Link href="/news">최신 소식</Link>
                    </Button>
                </motion.div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background opacity-50" />
        </section>
    );
}
