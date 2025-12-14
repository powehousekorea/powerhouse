"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations";
import { Heart, Users, Sparkles, ArrowRight } from "lucide-react";

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function JoinPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-violet-950" />
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <AnimatedSection className="text-center">
                        <motion.div variants={fadeInUp} className="space-y-6">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-blue-300 backdrop-blur-sm">
                                <Heart className="w-4 h-4" />
                                함께 만드는 변화
                            </span>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
                                청연과{" "}
                                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                                    함께하기
                                </span>
                            </h1>
                            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                                청년이 참여하는 새로운 대한민국.<br />
                                여러분의 참여가 미래를 만듭니다.
                            </p>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="pt-8">
                            <Button size="lg" asChild className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white border-0 shadow-lg shadow-blue-500/25">
                                <Link href="https://secure.donus.org/powerhouse/pay/step1" target="_blank" rel="noopener noreferrer">
                                    회원가입 및 후원하기
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </motion.div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Why Join Section */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 max-w-6xl">
                    <AnimatedSection className="text-center mb-16">
                        <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">
                            왜 청연과 함께해야 할까요?
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">
                            청연과 함께하는 것은 단순한 가입이 아닌, 대한민국의 미래를 설계하는 일입니다.
                        </motion.p>
                    </AnimatedSection>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                icon: Users,
                                title: "청년 네트워크",
                                desc: "전국의 열정적인 청년들과 연결되어 함께 성장하고 배울 수 있습니다."
                            },
                            {
                                icon: Sparkles,
                                title: "리더십 교육",
                                desc: "차세대 리더로 성장할 수 있는 다양한 교육 프로그램에 참여할 수 있습니다."
                            },
                            {
                                icon: Heart,
                                title: "사회 변화",
                                desc: "청년의 목소리를 정책에 반영하고 실질적인 사회 변화를 만들어갑니다."
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={scaleIn}
                                whileHover={{ y: -5 }}
                                className="p-8 rounded-2xl bg-card border border-border/50 text-center hover:shadow-lg transition-shadow"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                                    <item.icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-muted-foreground">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-4 max-w-4xl">
                    <AnimatedSection className="space-y-8">
                        <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-center mb-12">
                            회원가입 및 후원 안내
                        </motion.h2>

                        <motion.div variants={fadeInUp} className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                지금 대한민국은 정치적 위기를 맞이하고 있습니다. 이러한 위기를 극복하고,
                                우리나라의 미래를 책임질 정치 리더를 발굴하고 육성하는 일은 모두가 함께 해결해야 할 가장 중요한 과제입니다.
                            </p>
                            <p>
                                사단법인 한국청년유권자연맹은 2010년 1월 27일 창립 이후, 민주시민교육을 통해 청년들의 의식을 깨우고,
                                차세대 지도자를 양성하는 데 앞장서 왔습니다. 우리는 청년들의 목소리가 사회 전반에 반영되고,
                                이들이 정치적 역량을 갖춘 미래의 주역으로 성장하도록 돕고 있습니다.
                            </p>
                            <p className="font-medium text-foreground">
                                여러분의 후원과 참여는 단순한 기여를 넘어, 우리 사회의 미래를 설계하는 일입니다.
                                이는 청년들에게 더 나은 교육과 기회를 제공하며, 한국 정치의 지속 가능한 발전을 이루는 밑거름이 됩니다.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="bg-card p-8 rounded-2xl border shadow-sm mt-12"
                        >
                            <h3 className="text-xl font-bold mb-6">후원 안내</h3>
                            <p className="text-muted-foreground mb-6">
                                후원 계좌 및 자세한 문의는 아래 연락처로 부탁드립니다.
                            </p>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center gap-3">
                                    <span className="w-20 font-medium text-foreground">전화</span>
                                    <span>02-000-0000</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-20 font-medium text-foreground">이메일</span>
                                    <span>contact@powerhousekorea.com</span>
                                </li>
                            </ul>
                        </motion.div>
                    </AnimatedSection>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 max-w-4xl">
                    <AnimatedSection className="text-center">
                        <motion.div variants={fadeInUp} className="space-y-6">
                            <h2 className="text-3xl font-bold">
                                지금 바로 시작하세요
                            </h2>
                            <p className="text-muted-foreground text-lg">
                                청년 정치에 조금이라도 관심 있다면 누구나 참여할 수 있습니다.
                            </p>
                            <div className="pt-4">
                                <Button size="lg" asChild>
                                    <Link href="https://secure.donus.org/powerhouse/pay/step1" target="_blank" rel="noopener noreferrer">
                                        한국청년유권자연맹 함께하기
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
}
