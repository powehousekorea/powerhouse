"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { heroTextVariants, staggerContainer, fadeIn } from "@/lib/animations";

export function HeroSection() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
        });
    };

    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 -z-10">
                {/* Base gradient - Dark blue to purple */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-violet-950" />

                {/* Animated gradient orbs */}
                {mounted && (
                    <>
                        <motion.div
                            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[120px]"
                            animate={{
                                x: [0, 50, 0],
                                y: [0, 30, 0],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                        <motion.div
                            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-500/20 blur-[100px]"
                            animate={{
                                x: [0, -40, 0],
                                y: [0, -50, 0],
                                scale: [1, 1.15, 1],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                        <motion.div
                            className="absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[80px]"
                            animate={{
                                x: [0, 30, 0],
                                y: [0, -30, 0],
                            }}
                            transition={{
                                duration: 7,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </>
                )}

                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                    }}
                />

                {/* Top fade for header blend */}
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-slate-950 to-transparent" />
            </div>

            {/* Main Content */}
            <div className="container relative z-10 mx-auto px-4 text-center">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto space-y-8"
                >
                    {/* Badge */}
                    <motion.div variants={heroTextVariants}>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-blue-300 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            2010년부터 청년과 함께
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        variants={heroTextVariants}
                        className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]"
                    >
                        <span className="block">대한민국의</span>
                        <span className="block bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                            새로운 미래
                        </span>
                        <span className="block text-white/90">청년이 만듭니다</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        variants={heroTextVariants}
                        className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
                    >
                        책임지는 참여로 사회를 변화시키고,
                        <br className="hidden sm:block" />
                        미래를 창조하는 글로벌 청년 리더를 양성합니다.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={heroTextVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                    >
                        <motion.a
                            href="/join"
                            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="relative z-10">함께하기</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.a>
                        <motion.a
                            href="/about"
                            className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            청연 알아보기
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Floating particles */}
            {mounted && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-white/30"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -100 - Math.random() * 100],
                                opacity: [0, 0.8, 0],
                            }}
                            transition={{
                                duration: 4 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 4,
                                ease: "easeOut",
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Scroll indicator */}
            <motion.button
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                onClick={scrollToContent}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors cursor-pointer"
            >
                <span className="text-sm font-medium">스크롤</span>
                <motion.div
                    animate={{
                        y: [0, 8, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <ChevronDown className="w-6 h-6" />
                </motion.div>
            </motion.button>
        </section>
    );
}
