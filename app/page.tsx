import { carousel1Data, carousel2Data } from "@/lib/carousel-data";
import { HeroSection } from "@/components/landing/hero-section";
import { CarouselSection } from "@/components/landing/carousel-section";
import { ViewAllOpportunitiesSection } from "@/components/landing/view-all-opportunities-section";
import { WhatYouGetSection } from "@/components/landing/what-you-get";

export default function Home() {
  return (
    <div className="space-y-8 py-12">
      <HeroSection />
      <CarouselSection
        distributedCarousel1={carousel1Data}
        distributedCarousel2={carousel2Data}
      />
      <ViewAllOpportunitiesSection />
      <WhatYouGetSection />
    </div>
  );
}
