"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItem {
    href: string;
    label: string;
}

interface MobileMenuProps {
    isOpen: boolean;
    navItems: NavItem[];
    pathname: string;
}

export function MobileMenu({ isOpen, navItems, pathname }: MobileMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-40 md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-background/95 backdrop-blur-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Menu Content */}
                    <nav className="relative flex flex-col items-center justify-center h-full gap-2 px-4">
                        {navItems.map((item, index) => {
                            const isActive = pathname === item.href;
                            return (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.1,
                                        ease: [0.25, 0.1, 0.25, 1],
                                    }}
                                >
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "block px-8 py-4 text-2xl font-medium rounded-2xl transition-all duration-300",
                                            isActive
                                                ? "text-primary bg-primary/10"
                                                : "text-foreground/70 hover:text-foreground hover:bg-muted"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            );
                        })}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{
                                duration: 0.3,
                                delay: navItems.length * 0.1,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                            className="mt-4"
                        >
                            <Link
                                href="/join"
                                className="block px-12 py-4 text-xl font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                            >
                                함께하기
                            </Link>
                        </motion.div>
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
