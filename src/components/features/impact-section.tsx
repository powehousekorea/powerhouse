"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";

interface ImpactStat {
    value: number;
    suffix: string;
    label: string;
    description: string;
}

const impactStats: ImpactStat[] = [
    {
        value: 2500,
        suffix: "+",
        label: "청년 참여",
        description: "다양한 프로그램에 참여한 청년",
    },
    {
        value: 15,
        suffix: "년",
        label: "활동 역사",
        description: "2010년부터 이어온 활동",
    },
    {
        value: 50,
        suffix: "+",
        label: "파트너 기관",
        description: "함께하는 협력 기관",
    },
    {
        value: 100,
        suffix: "+",
        label: "프로그램",
        description: "진행된 리더십 프로그램",
    },
];

function CountUpNumber({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        const duration = 2000;
        const steps = 60;
        const stepValue = value / steps;
        const stepDuration = duration / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            if (currentStep >= steps) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(stepValue * currentStep));
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [isInView, value]);

    return (
        <span className="tabular-nums">
            {count.toLocaleString()}{suffix}
        </span>
    );
}

export function ImpactSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            className="relative py-24 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            <div className="container mx-auto px-4 max-w-6xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-blue-400 font-medium text-sm tracking-wider uppercase mb-4 block">
                        Our Impact
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        청년들과 함께한 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">성과</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        한국청년유권자연맹은 대한민국 청년들의 정치 참여와 리더십 성장을 위해 끊임없이 노력해왔습니다.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {impactStats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            variants={fadeInUp}
                            className="group relative"
                        >
                            {/* Glassmorphism Card */}
                            <div className="relative p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />

                                {/* Number */}
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                    <CountUpNumber
                                        value={stat.value}
                                        suffix={stat.suffix}
                                        isInView={isInView}
                                    />
                                </div>

                                {/* Label */}
                                <div className="text-lg font-semibold text-white/90 mb-1">
                                    {stat.label}
                                </div>

                                {/* Description */}
                                <div className="text-sm text-slate-400">
                                    {stat.description}
                                </div>

                                {/* Decorative corner */}
                                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-500/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
