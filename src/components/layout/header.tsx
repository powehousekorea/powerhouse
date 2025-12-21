"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";

const LOGO_PATH = "/logo.png";

const navItems = [
    { href: "/about", label: "소개" },
    { href: "/people", label: "사람들" },
    { href: "/activities", label: "활동" },
    { href: "/news", label: "뉴스" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    const isHomePage = pathname === "/";

    return (
        <>
            <motion.header
                className={cn(
                    "fixed top-0 z-50 w-full transition-all duration-300",
                    isScrolled
                        ? "bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-sm"
                        : "bg-transparent"
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4">
                    {/* Logo */}
                    <Link href="/" className="relative z-10 flex items-center group">
                        <motion.div
                            className="relative h-10 w-auto flex items-center"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Image
                                src={LOGO_PATH}
                                alt="Powerhouse Korea"
                                width={150}
                                height={50}
                                className={cn(
                                    "h-10 w-auto object-contain transition-all duration-300",
                                    !isScrolled && isHomePage && "brightness-0 invert"
                                )}
                                priority
                            />
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
                                        isActive
                                            ? "text-primary"
                                            : isScrolled || !isHomePage
                                                ? "text-foreground/70 hover:text-foreground hover:bg-muted"
                                                : "text-white/80 hover:text-white hover:bg-white/10"
                                    )}
                                >
                                    {item.label}
                                    {isActive && (
                                        <motion.div
                                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                                            layoutId="activeNav"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                href="/join"
                                className={cn(
                                    "ml-4 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
                                    isScrolled || !isHomePage
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                                        : "bg-white text-slate-900 hover:bg-white/90"
                                )}
                            >
                                함께하기
                            </Link>
                        </motion.div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className={cn(
                            "md:hidden relative z-10 p-2 rounded-full transition-colors",
                            isMobileMenuOpen
                                ? "text-foreground"
                                : isScrolled || !isHomePage
                                    ? "text-foreground hover:bg-muted"
                                    : "text-white hover:bg-white/10"
                        )}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileTap={{ scale: 0.95 }}
                    >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="h-6 w-6" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ opacity: 0, rotate: 90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: -90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu className="h-6 w-6" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <span className="sr-only">Toggle menu</span>
                    </motion.button>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                navItems={navItems}
                pathname={pathname}
            />
        </>
    );
}
