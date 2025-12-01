"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="font-serif text-xl font-bold tracking-tight">
                    Powerhouse Korea
                </Link>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/about" className="hover:text-primary/80 transition-colors">About</Link>
                    <Link href="/people" className="hover:text-primary/80 transition-colors">People</Link>
                    <Link href="/activities" className="hover:text-primary/80 transition-colors">Activities</Link>
                    <Link href="/news" className="hover:text-primary/80 transition-colors">News</Link>
                    <Button variant="default" size="sm" asChild>
                        <Link href="https://docs.google.com/forms/d/e/1FAIpQLSdX8..." target="_blank">Join Us</Link>
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
