"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

// 로고 이미지 경로 (public 폴더 기준)
const LOGO_PATH = "/logo.png"; // 또는 "/logo.svg", "/logo.webp" 등

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                    {/* 로고 이미지 */}
                    <div className="relative h-10 w-auto flex items-center">
                        <Image
                            src={LOGO_PATH}
                            alt="Powerhouse Korea"
                            width={150}
                            height={50}
                            className="h-10 w-auto object-contain"
                            priority
                        />
                    </div>
                </Link>
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link href="/about" className="hover:text-primary/80 transition-colors">소개</Link>
                    <Link href="/people" className="hover:text-primary/80 transition-colors">사람들</Link>
                    <Link href="/activities" className="hover:text-primary/80 transition-colors">활동</Link>
                    <Link href="/news" className="hover:text-primary/80 transition-colors">뉴스</Link>
                    <Button variant="default" size="sm" asChild className="ml-4">
                        <Link href="/join">함께하기</Link>
                    </Button>
                </nav>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </div>
        </header>
    );
}
