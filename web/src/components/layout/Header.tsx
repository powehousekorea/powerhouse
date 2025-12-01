import Link from 'next/link'

export function Header() {
    return (
        <header className="w-full py-4 px-6 md:px-12 lg:px-24 flex justify-between items-center bg-white border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-white/95">

            {/* 로고: md 크기 기준으로 텍스트 분리 및 제어 */}
            <Link href="/" className="text-xl font-bold tracking-tight text-gray-900 hover:opacity-80 transition-opacity">
                
                {/* 1. 모바일 (기본값) 및 md 사이즈 미만에서만 보이는 텍스트 */}
                <span className="md:hidden">
                    IMPACT FOUNDER
                </span>

                {/* 2. 데스크톱 (md 사이즈 이상)에서만 보이는 텍스트 */}
                <span className="hidden md:inline">
                    IMPACT FOUNDER&nbsp;&nbsp;|&nbsp;&nbsp;Jung Jaewook 
                </span>
                
            </Link>

            {/* PC 메뉴: About을 가장 위로 올렸습니다 */}
            <nav className="hidden md:flex gap-8">
                {/* 1. About (가장 왼쪽) */}
                <Link href="/about" className="text-sm font-medium text-secondary hover:text-foreground transition-colors">
                    About
                </Link>

                {/* 2. Blog */}
                <Link href="/blog" className="text-sm font-medium text-secondary hover:text-foreground transition-colors">
                    Blog
                </Link>

                {/* 3. Media */}
                <Link href="/media" className="text-sm font-medium text-secondary hover:text-foreground transition-colors">
                    Media
                </Link>
            </nav>

            {/* 모바일 메뉴 버튼 */}
            <button className="md:hidden p-2 text-secondary hover:bg-muted rounded transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>

        </header>
    )
}