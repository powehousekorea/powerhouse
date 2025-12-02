import { HeroSection } from "@/components/features/hero-section";
import { client } from "@/sanity/lib/client";
import { ACTIVITIES_QUERY, LATEST_NEWS_QUERY } from "@/sanity/lib/queries";
import { PostCard } from "@/components/features/post-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Post } from "@/types/post";

export const revalidate = 60;

export default async function Home() {
  const [activities, news] = await Promise.all([
    client.fetch(ACTIVITIES_QUERY),
    client.fetch(LATEST_NEWS_QUERY),
  ]);

  const latestActivities: Post[] = activities.slice(0, 7);
  const latestNews: Post[] = news.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Introduction Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="text-primary">한국청년유권자연맹</span>은...
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                <span className="font-bold text-foreground">무한 잠재력</span>과{" "}
                <span className="font-bold text-foreground">열정</span>을 지닌{" "}
                <span className="font-bold text-foreground">청년세대</span>들이
              </p>
              <p>
                <span className="font-bold text-foreground">스스로를 개척하고, 책임지는 참여를 통해</span>
              </p>
              <p>
                <span className="font-bold text-foreground">사회변혁은 물론 미래를 창조하는</span>
              </p>
              <p>
                <span className="font-bold text-foreground">글로벌 인재로 성장</span>할 수 있도록 하는데
              </p>
              <p className="text-xl font-bold text-foreground mt-6">
                그 목적을 두고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              따끈따끈
            </h2>
            <h3 className="text-2xl font-bold text-primary">
              청연 활동 소식
            </h3>
            <p className="text-lg text-muted-foreground">
              한국청년유권자연맹의 최근 소식!
            </p>
            <p className="text-muted-foreground">
              어떤 일이 있었을까요?
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {latestActivities.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/activities">아티클 더 보러가기</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              청연과 함께하기!
            </h2>
            <p className="text-lg text-muted-foreground">
              청년이 참여하는 새로운 대한민국.
            </p>
            <p className="text-muted-foreground">
              청년 정치에 조금이라도 관심 있다면 누구나 가능!
            </p>
            <div className="pt-6">
              <Button size="lg" asChild>
                <Link href="/join">한국청년유권자연맹 함께하기</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              청연 NEWS
            </h2>
            <p className="text-lg text-muted-foreground">
              뉴스에 등장한 청연 소식!
            </p>
            <p className="text-muted-foreground">
              어떤 활동이 있었는지 확인해 보세요!
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {latestNews.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/news">뉴스 더 보러가기</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
