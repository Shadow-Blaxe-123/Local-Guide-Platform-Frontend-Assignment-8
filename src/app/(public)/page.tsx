import AboutUsSection from "@/components/modules/public/Home/AboutSection";
import BecomeAGuideSection from "@/components/modules/public/Home/BecomeAGuide";
import CategorySection from "@/components/modules/public/Home/CategorySection";
import FAQSection from "@/components/modules/public/Home/FaqSection";
import HeroSection from "@/components/modules/public/Home/HeroSection";
import HowItWorksSection from "@/components/modules/public/Home/HowItWorks";
import TestimonialsSection from "@/components/modules/public/Home/TestimonialsSection";
import { getAllTours } from "@/services/public/getAllTours";

async function HomePage() {
  const data = await getAllTours("limit=3");
  console.log(data);
  return (
    <div className="grid">
      <div className="min-h-[75vh] flex items-center justify-center">
        <HeroSection />
      </div>
      <CategorySection />
      <AboutUsSection />
      <HowItWorksSection />
      <BecomeAGuideSection />
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
}

export default HomePage;
