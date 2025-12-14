"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    badge?: string;
    title: string;
    highlight?: string;
    description?: string;
    className?: string;
}

export function SectionHeader({ badge, title, highlight, description, className }: SectionHeaderProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={cn("text-center mb-16", className)}
        >
            {badge && (
                <motion.span
                    variants={fadeInUp}
                    className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-4"
                >
                    {badge}
                </motion.span>
            )}
            <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            >
                {title}
                {highlight && (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">
                        {" "}{highlight}
                    </span>
                )}
            </motion.h2>
            {description && (
                <motion.p
                    variants={fadeInUp}
                    className="text-muted-foreground text-lg max-w-2xl mx-auto"
                >
                    {description}
                </motion.p>
            )}
        </motion.div>
    );
}

interface SectionWrapperProps {
    children: React.ReactNode;
    className?: string;
    dark?: boolean;
}

export function SectionWrapper({ children, className, dark }: SectionWrapperProps) {
    return (
        <section
            className={cn(
                "relative py-24 overflow-hidden",
                dark && "bg-slate-950",
                className
            )}
        >
            {children}
        </section>
    );
}
