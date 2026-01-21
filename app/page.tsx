import { Footer } from "@/components/landing/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { ImpactStats } from "@/components/landing/impact-stats";
import { PhotoGallery } from "@/components/landing/photo-gallery";
import { SocialProof } from "@/components/landing/social-proof";
import { Testimonials } from "@/components/landing/testimonials";
import { UpcomingEvents } from "@/components/landing/upcoming-events";

export default function Home() {
  return (
     <main className="">
      <HeroSection />
      <ImpactStats />
      <UpcomingEvents />
      <PhotoGallery />
      <Testimonials />
      <SocialProof />
      <Footer />
    </main>
  );
}
