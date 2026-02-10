import { Footer } from "@/components/landing/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { ImpactStats } from "@/components/landing/impact-stats";
import { PhotoGallery } from "@/components/landing/photo-gallery";
import { SocialProof } from "@/components/landing/social-proof";
import { Testimonials } from "@/components/landing/testimonials";
import { UpcomingEvents } from "@/components/landing/upcoming-events";
import { getProfileInfo } from "@/server/user/actions";
import { UserType } from "./_type/User";

export default async function Home() {
  const data:UserType | null = await getProfileInfo()
  
  return (
     <main className="">
      <HeroSection data={data} />
      <ImpactStats />
      <UpcomingEvents />
      <PhotoGallery />
      <Testimonials />
      <SocialProof />
      <Footer />
    </main>
  );
}
