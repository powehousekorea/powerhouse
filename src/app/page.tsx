import { HeroSection } from "@/components/features/hero-section";
import { ImpactSection } from "@/components/features/impact-section";
import { CTASection } from "@/components/features/cta-section";
import { ActivitiesSection } from "@/components/features/activities-section";
import { NewsSection } from "@/components/features/news-section";
import { getActivityPosts, getLatestNews } from "@/lib/keystatic";

export const revalidate = 60;

export default async function Home() {
  const [activities, news] = await Promise.all([
    getActivityPosts(),
    getLatestNews(3),
  ]);

  const latestActivities = activities.slice(0, 6);
  const latestNews = news;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Full screen with gradient */}
      <HeroSection />

      {/* Impact Numbers Section */}
      <ImpactSection />

      {/* Activities Section */}
      <ActivitiesSection posts={latestActivities} />

      {/* CTA Section */}
      <CTASection />

      {/* News Section */}
      <NewsSection posts={latestNews} />
    </div>
  );
}
