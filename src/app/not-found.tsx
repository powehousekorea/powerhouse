"use client";

import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-16">
            <div className="text-center max-w-md mx-auto">
                {/* Icon */}
                <div className="relative mb-8">
                    <div className="w-32 h-32 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                        <Search className="w-16 h-16 text-primary/50" />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-muted border border-border text-sm font-medium text-muted-foreground">
                        404
                    </div>
                </div>

                {/* Message */}
                <h1 className="text-3xl font-bold tracking-tight mb-4">
                    페이지를 찾을 수 없습니다
                </h1>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                    요청하신 페이지가 존재하지 않거나,<br />
                    이동되었을 수 있습니다.<br />
                    주소를 다시 확인해 주세요.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                    >
                        <Home className="w-4 h-4" />
                        메인으로 돌아가기
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-muted transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        이전 페이지
                    </button>
                </div>

                {/* Help Links */}
                <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-4">
                        찾으시는 정보가 있으신가요?
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                        <Link
                            href="/about"
                            className="text-primary hover:underline underline-offset-4"
                        >
                            청연 소개
                        </Link>
                        <span className="text-border">•</span>
                        <Link
                            href="/activities"
                            className="text-primary hover:underline underline-offset-4"
                        >
                            활동 소식
                        </Link>
                        <span className="text-border">•</span>
                        <Link
                            href="/news"
                            className="text-primary hover:underline underline-offset-4"
                        >
                            뉴스
                        </Link>
                        <span className="text-border">•</span>
                        <Link
                            href="/join"
                            className="text-primary hover:underline underline-offset-4"
                        >
                            함께하기
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
