import { HeroSection } from "@/components/features/hero-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      {/* Highlights Section Placeholder */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Latest Updates</h2>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
      </section>
    </div>
  );
}
