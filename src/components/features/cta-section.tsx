"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart, Users, Sparkles } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function CTASection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            className="relative py-32 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-violet-950 to-slate-950" />

                {/* Animated gradient orbs */}
                <motion.div
                    className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[100px]"
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/20 blur-[100px]"
                    animate={{
                        x: [0, -20, 0],
                        y: [0, 20, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>

            <div className="container mx-auto px-4 max-w-5xl relative">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="text-center"
                >
                    {/* Icons */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex justify-center gap-4 mb-8"
                    >
                        {[Heart, Users, Sparkles].map((Icon, index) => (
                            <motion.div
                                key={index}
                                className="p-3 rounded-full bg-white/5 border border-white/10"
                                animate={{
                                    y: [0, -5, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: index * 0.2,
                                }}
                            >
                                <Icon className="w-6 h-6 text-blue-400" />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h2
                        variants={fadeInUp}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                    >
                        청년의 목소리로
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400">
                            대한민국을 바꿉니다
                        </span>
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                        variants={fadeInUp}
                        className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        청년 정치에 조금이라도 관심이 있다면 누구나 가능합니다.
                        <br className="hidden sm:block" />
                        지금 바로 한국청년유권자연맹과 함께하세요.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div variants={fadeInUp}>
                        <Link href="/join">
                            <motion.button
                                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold text-lg overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Glow effect */}
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                                {/* Shimmer effect */}
                                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                                <span className="relative z-10">함께하기</span>
                                <motion.span
                                    className="relative z-10"
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </motion.span>
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Trust indicators */}
                    <motion.div
                        variants={fadeInUp}
                        className="mt-12 flex flex-wrap justify-center gap-8 text-slate-400 text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-400" />
                            <span>2010년 설립</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-400" />
                            <span>비영리 사단법인</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-violet-400" />
                            <span>정치적 중립</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
