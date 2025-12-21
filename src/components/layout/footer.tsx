import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Instagram, Youtube, Facebook } from "lucide-react";

const siteLinks = [
    { href: "/about", label: "소개" },
    { href: "/people", label: "사람들" },
    { href: "/activities", label: "활동" },
    { href: "/news", label: "뉴스" },
    { href: "/join", label: "함께하기" },
];

const socialLinks = [
    { href: "https://www.instagram.com/powerhouse_korea", icon: Instagram, label: "Instagram" },
    { href: "https://www.youtube.com/@powerhousekorea", icon: Youtube, label: "YouTube" },
    { href: "https://www.facebook.com/powerhousekorea", icon: Facebook, label: "Facebook" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-muted/30">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                    {/* Logo & Description */}
                    <div className="lg:col-span-1 space-y-4">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/logo.png"
                                alt="한국청년유권자연맹"
                                width={140}
                                height={45}
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            책임지는 참여로 사회를 변화시키고,
                            미래를 창조하는 글로벌 청년 리더를 양성합니다.
                        </p>
                        {/* Social Links - Mobile */}
                        <div className="flex items-center gap-3 pt-2 lg:hidden">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Site Map */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-foreground">사이트맵</h3>
                        <nav className="flex flex-col space-y-2">
                            {siteLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-foreground">연락처</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary/70" />
                                <span>서울특별시 영등포구 국회대로74길 9, 901호</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Mail className="w-4 h-4 shrink-0 text-primary/70" />
                                <a
                                    href="mailto:powerhouse@powerhouse.kr"
                                    className="hover:text-primary transition-colors"
                                >
                                    powerhouse@powerhouse.kr
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Phone className="w-4 h-4 shrink-0 text-primary/70" />
                                <a
                                    href="tel:02-780-7942"
                                    className="hover:text-primary transition-colors"
                                >
                                    02-780-7942
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links - Desktop */}
                    <div className="hidden lg:block space-y-4">
                        <h3 className="font-semibold text-foreground">소셜 미디어</h3>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground/70 pt-2">
                            청연의 소식을 SNS에서 만나보세요!
                        </p>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-border/50">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                        <p>
                            &copy; {currentYear} 사단법인 한국청년유권자연맹. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="/about" className="hover:text-primary transition-colors">
                                개인정보처리방침
                            </Link>
                            <span className="text-border">|</span>
                            <Link href="/about" className="hover:text-primary transition-colors">
                                이용약관
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
