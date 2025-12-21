/**
 * 마이그레이션 스크립트: powerhousekorea.com -> Keystatic (로컬 MDX)
 * Puppeteer를 사용하여 JavaScript 렌더링된 콘텐츠 추출
 *
 * 사용법: npm run migrate
 */

import puppeteer, { Browser, Page } from "puppeteer";
import TurndownService from "turndown";
import * as fs from "fs/promises";
import * as path from "path";
import axios from "axios";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";

// ============================================================================
// 설정
// ============================================================================

const BASE_URL = "https://www.powerhousekorea.com";

const SOURCES = [
    {
        listUrl: `${BASE_URL}/news`,
        category: "news" as const,
        name: "뉴스",
    },
    {
        listUrl: `${BASE_URL}/article`,
        category: "activity" as const,
        name: "활동",
    },
];

const CONTENT_DIR = path.resolve(process.cwd(), "content/posts");
const IMAGES_DIR = path.resolve(process.cwd(), "public/images/posts");

// 요청 딜레이 (서버 부하 방지)
const REQUEST_DELAY_MS = 2000;
const PAGE_LOAD_TIMEOUT = 30000;

// ============================================================================
// 유틸리티 함수
// ============================================================================

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s가-힣-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
        .substring(0, 50);
}

function generateSlug(title: string, date: string): string {
    const datePrefix = date.replace(/-/g, "").substring(0, 8);
    const titleSlug = slugify(title);
    return `${datePrefix}-${titleSlug}`;
}

function extractSummary(text: string, maxLength: number = 100): string {
    const cleaned = text.replace(/\s+/g, " ").trim();
    if (cleaned.length <= maxLength) return cleaned;
    return cleaned.substring(0, maxLength).trim() + "...";
}

function getImageExtension(url: string, contentType?: string): string {
    if (contentType) {
        const match = contentType.match(/image\/(\w+)/);
        if (match) {
            const ext = match[1].toLowerCase();
            if (ext === "jpeg") return ".jpg";
            return `.${ext}`;
        }
    }

    const urlMatch = url.match(/\.(\w{3,4})(?:\?|$)/);
    if (urlMatch) {
        return `.${urlMatch[1].toLowerCase()}`;
    }

    return ".jpg";
}

// ============================================================================
// Turndown (HTML -> Markdown) 설정
// ============================================================================

const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
});

// 이미지 태그 처리
turndownService.addRule("images", {
    filter: "img",
    replacement: (content, node) => {
        const img = node as HTMLImageElement;
        const src = img.getAttribute("src") || img.getAttribute("data-src") || "";
        const alt = img.getAttribute("alt") || "";
        if (!src) return "";
        return `![${alt}](${src})`;
    },
});

// ============================================================================
// 이미지 다운로드
// ============================================================================

async function downloadImage(
    imageUrl: string,
    slug: string,
    filename: string
): Promise<string | null> {
    try {
        let absoluteUrl = imageUrl;
        if (imageUrl.startsWith("//")) {
            absoluteUrl = `https:${imageUrl}`;
        } else if (imageUrl.startsWith("/")) {
            absoluteUrl = `${BASE_URL}${imageUrl}`;
        } else if (!imageUrl.startsWith("http")) {
            absoluteUrl = `${BASE_URL}/${imageUrl}`;
        }

        // 특수 문자 처리
        absoluteUrl = absoluteUrl.replace(/&amp;/g, "&");

        console.log(`    📥 다운로드: ${absoluteUrl.substring(0, 80)}...`);

        const response = await axios.get(absoluteUrl, {
            responseType: "stream",
            timeout: 30000,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                Referer: BASE_URL,
            },
        });

        const contentType = response.headers["content-type"];
        const ext = getImageExtension(absoluteUrl, contentType);
        const safeFilename = filename.replace(/[^\w-]/g, "_") + ext;

        const imageDir = path.join(IMAGES_DIR, slug);
        await fs.mkdir(imageDir, { recursive: true });

        const imagePath = path.join(imageDir, safeFilename);
        const writer = createWriteStream(imagePath);

        await pipeline(response.data, writer);

        const localPath = `/images/posts/${slug}/${safeFilename}`;
        console.log(`    ✅ 저장됨: ${localPath}`);

        return localPath;
    } catch (error) {
        console.error(`    ❌ 이미지 다운로드 실패: ${imageUrl}`);
        return null;
    }
}

// ============================================================================
// 본문 내 이미지 경로 변환
// ============================================================================

async function processContentImages(
    content: string,
    slug: string
): Promise<string> {
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    const matches = [...content.matchAll(imageRegex)];

    let processedContent = content;
    let imageIndex = 0;

    for (const match of matches) {
        const [fullMatch, alt, imageUrl] = match;
        imageIndex++;

        const localPath = await downloadImage(imageUrl, slug, `content-${imageIndex}`);
        if (localPath) {
            processedContent = processedContent.replace(fullMatch, `![${alt}](${localPath})`);
        }
    }

    return processedContent;
}

// ============================================================================
// Puppeteer 브라우저 관리
// ============================================================================

let browser: Browser | null = null;

async function getBrowser(): Promise<Browser> {
    if (!browser) {
        browser = await puppeteer.launch({
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu",
            ],
        });
    }
    return browser;
}

async function closeBrowser(): Promise<void> {
    if (browser) {
        await browser.close();
        browser = null;
    }
}

// ============================================================================
// 페이지 파싱 (Puppeteer)
// ============================================================================

interface PostData {
    title: string;
    date: string;
    mainImage: string | null;
    content: string;
    url: string;
}

async function getPostUrls(listUrl: string): Promise<string[]> {
    console.log(`\n📋 목록 페이지 로드: ${listUrl}`);

    const b = await getBrowser();
    const page = await b.newPage();

    try {
        await page.goto(listUrl, {
            waitUntil: "networkidle2",
            timeout: PAGE_LOAD_TIMEOUT,
        });

        // 페이지 로딩 대기
        await sleep(2000);

        // 게시물 링크 추출
        const urls = await page.evaluate((baseUrl) => {
            const links: string[] = [];
            const anchors = document.querySelectorAll("a[href*='bmode=view']");

            anchors.forEach((a) => {
                const href = a.getAttribute("href");
                if (href && !links.includes(href)) {
                    let fullUrl = href;
                    if (href.startsWith("/")) {
                        fullUrl = baseUrl + href;
                    }
                    links.push(fullUrl);
                }
            });

            return links;
        }, BASE_URL);

        console.log(`   발견된 게시물: ${urls.length}개`);
        return urls;
    } catch (error) {
        console.error(`목록 페이지 로드 실패: ${listUrl}`, error);
        return [];
    } finally {
        await page.close();
    }
}

async function parsePostPage(
    url: string,
    category: "news" | "activity"
): Promise<PostData | null> {
    console.log(`\n📄 게시물 파싱: ${url}`);

    const b = await getBrowser();
    const page = await b.newPage();

    try {
        await page.goto(url, {
            waitUntil: "networkidle2",
            timeout: PAGE_LOAD_TIMEOUT,
        });

        // 동적 콘텐츠 로딩 대기 (imweb은 느린 렌더링)
        await sleep(5000);

        // 추가 대기: 콘텐츠 영역이 나타날 때까지
        await page.waitForSelector(".fr-view, .board_txt_area, .board p, article, main", {
            timeout: 10000,
        }).catch(() => {
            console.log("   ⏳ 콘텐츠 선택자 대기 타임아웃");
        });

        const data = await page.evaluate(() => {
            // 제목 추출
            let title = "";
            const titleSelectors = [
                ".board-view-title",
                ".view-title",
                ".post-title",
                ".article-title",
                ".board-title",
                "h1.title",
                ".tit",
                "h1",
            ];

            for (const selector of titleSelectors) {
                const el = document.querySelector(selector);
                if (el && el.textContent) {
                    title = el.textContent.trim();
                    if (title.length > 0) break;
                }
            }

            // OG 태그에서 시도
            if (!title) {
                const ogTitle = document.querySelector('meta[property="og:title"]');
                if (ogTitle) {
                    title = ogTitle.getAttribute("content") || "";
                }
            }

            // 날짜 추출
            let date = "";
            const dateSelectors = [
                ".board-view-date",
                ".view-date",
                ".post-date",
                ".date",
                ".regdate",
                "time",
            ];

            for (const selector of dateSelectors) {
                const el = document.querySelector(selector);
                if (el && el.textContent) {
                    const text = el.textContent.trim();
                    const match = text.match(/(\d{4})[.-](\d{1,2})[.-](\d{1,2})/);
                    if (match) {
                        date = `${match[1]}-${match[2].padStart(2, "0")}-${match[3].padStart(2, "0")}`;
                        break;
                    }
                }
            }

            // 메인 이미지
            let mainImage = "";
            const ogImage = document.querySelector('meta[property="og:image"]');
            if (ogImage) {
                mainImage = ogImage.getAttribute("content") || "";
            }

            if (!mainImage) {
                const firstImg = document.querySelector(".board-view-content img, .view-content img, .post-content img");
                if (firstImg) {
                    mainImage = firstImg.getAttribute("src") || firstImg.getAttribute("data-src") || "";
                }
            }

            // 본문 추출 (imweb 플랫폼 구조)
            // imweb은 .board_txt_area.fr-view > .margin-top-xxl 내에 본문을 저장
            let contentHtml = "";

            // 1. margin-top-xxl 클래스 내부의 콘텐츠 (imweb 표준 구조)
            const contentDiv = document.querySelector(".board_txt_area .margin-top-xxl");
            if (contentDiv) {
                contentHtml = contentDiv.innerHTML;
            }

            // 2. 폴백: board_txt_area.fr-view에서 직접 추출
            if (contentHtml.length < 100) {
                const boardTxtArea = document.querySelector(".board_txt_area.fr-view");
                if (boardTxtArea) {
                    // file_area, comment 관련 요소 제외
                    const clone = boardTxtArea.cloneNode(true) as Element;
                    clone.querySelectorAll(".file_area, .comment_section, .table_bottom, .list_tap").forEach(el => el.remove());
                    contentHtml = clone.innerHTML;
                }
            }

            // 3. 폴백: 일반 .fr-view
            if (contentHtml.length < 100) {
                const frView = document.querySelector(".fr-view");
                if (frView) {
                    contentHtml = frView.innerHTML;
                }
            }

            return { title, date, mainImage, contentHtml };
        });

        if (!data.title) {
            console.log("   ⚠️ 제목을 찾을 수 없음");
            return null;
        }

        // 날짜가 없으면 현재 날짜 사용
        const finalDate = data.date || new Date().toISOString().split("T")[0];

        // HTML -> Markdown 변환
        const content = data.contentHtml ? turndownService.turndown(data.contentHtml) : "";

        console.log(`   ✅ 제목: ${data.title}`);
        console.log(`   📅 날짜: ${finalDate}`);
        console.log(`   🖼️ 이미지: ${data.mainImage ? "있음" : "없음"}`);
        console.log(`   📝 본문: ${content.length}자`);

        if (content.length < 10) {
            console.log("   ⚠️ 본문이 너무 짧음");
            return null;
        }

        return {
            title: data.title,
            date: finalDate,
            mainImage: data.mainImage || null,
            content,
            url,
        };
    } catch (error) {
        console.error(`게시물 파싱 실패: ${url}`, error);
        return null;
    } finally {
        await page.close();
    }
}

// ============================================================================
// MDX 파일 생성
// ============================================================================

async function createMdxFile(
    post: PostData,
    category: "news" | "activity"
): Promise<void> {
    const slug = generateSlug(post.title, post.date);
    console.log(`\n💾 MDX 생성: ${slug}`);

    // 메인 이미지 다운로드
    let mainImagePath: string | null = null;
    if (post.mainImage) {
        mainImagePath = await downloadImage(post.mainImage, slug, "thumbnail");
    }

    // 본문 내 이미지 처리
    const processedContent = await processContentImages(post.content, slug);

    // 요약 생성
    const plainText = processedContent.replace(/[#*\[\]()!`]/g, "").trim();
    const summary = extractSummary(plainText, 100);

    // Frontmatter 생성
    const frontmatter = `---
title: "${post.title.replace(/"/g, '\\"')}"
mainImage: ${mainImagePath ? `"${mainImagePath}"` : "null"}
categories:
  - ${category}
publishedAt: "${post.date}T09:00:00.000Z"
summary: "${summary.replace(/"/g, '\\"')}"
---`;

    const mdxContent = `${frontmatter}

${processedContent}
`;

    // 폴더 생성 및 파일 저장
    const postDir = path.join(CONTENT_DIR, slug);
    await fs.mkdir(postDir, { recursive: true });

    const filePath = path.join(postDir, "index.mdx");
    await fs.writeFile(filePath, mdxContent, "utf-8");

    console.log(`   ✅ 저장됨: content/posts/${slug}/index.mdx`);
}

// ============================================================================
// 메인 실행
// ============================================================================

async function migrate() {
    console.log("=".repeat(60));
    console.log("🚀 마이그레이션 시작: powerhousekorea.com -> Keystatic");
    console.log("   (Puppeteer를 사용한 동적 콘텐츠 추출)");
    console.log("=".repeat(60));

    // 디렉토리 생성
    await fs.mkdir(CONTENT_DIR, { recursive: true });
    await fs.mkdir(IMAGES_DIR, { recursive: true });

    let totalPosts = 0;
    let successPosts = 0;

    try {
        for (const source of SOURCES) {
            console.log(`\n${"=".repeat(60)}`);
            console.log(`📂 카테고리: ${source.name} (${source.category})`);
            console.log(`   URL: ${source.listUrl}`);
            console.log("=".repeat(60));

            // 게시물 URL 수집
            const postUrls = await getPostUrls(source.listUrl);

            if (postUrls.length === 0) {
                console.log("   ⚠️ 게시물을 찾을 수 없습니다.");
                continue;
            }

            // 각 게시물 처리
            for (const postUrl of postUrls) {
                totalPosts++;

                try {
                    const post = await parsePostPage(postUrl, source.category);

                    if (post && post.title && post.content.length >= 10) {
                        await createMdxFile(post, source.category);
                        successPosts++;
                    }
                } catch (error) {
                    console.error(`   ❌ 오류 발생: ${postUrl}`);
                }

                // 요청 간 딜레이
                await sleep(REQUEST_DELAY_MS);
            }
        }
    } finally {
        await closeBrowser();
    }

    console.log(`\n${"=".repeat(60)}`);
    console.log("✅ 마이그레이션 완료!");
    console.log(`   전체: ${totalPosts}개, 성공: ${successPosts}개`);
    console.log("=".repeat(60));
}

// 실행
migrate().catch((error) => {
    console.error("마이그레이션 실패:", error);
    closeBrowser().finally(() => process.exit(1));
});
