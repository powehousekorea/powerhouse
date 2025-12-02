"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
    return (
        <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-4 py-20">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 -z-10">
                {/* 배경 이미지 - 원본 사이트 스타일 */}
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000')",
                        filter: "brightness(0.4)",
                    }}
                />
                {/* 그라데이션 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
                {/* 파란색 액센트 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
            </div>

            <div className="container relative z-10 mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="space-y-8"
                >
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl leading-tight">
                        <span className="block mb-4">대한민국의 새로운 미래,</span>
                        <span className="block">청년들의 책임지는 참여로</span>
                        <span className="block">만들어 나갑니다!</span>
                    </h1>
                </motion.div>
            </div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-primary/30"
                        initial={{
                            x: Math.random() * 100 + "%",
                            y: Math.random() * 100 + "%",
                            opacity: 0,
                        }}
                        animate={{
                            y: [null, Math.random() * -100 - 50],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>
        </section>
    );
}
