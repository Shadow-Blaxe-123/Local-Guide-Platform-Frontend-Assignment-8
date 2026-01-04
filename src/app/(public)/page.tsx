import AboutUsSection from "@/components/modules/public/Home/AboutSection";
import BecomeAGuideSection from "@/components/modules/public/Home/BecomeAGuide";
import FAQSection from "@/components/modules/public/Home/FaqSection";
import HeroSection from "@/components/modules/public/Home/HeroSection";
import HowItWorksSection from "@/components/modules/public/Home/HowItWorks";
import TestimonialsSection from "@/components/modules/public/Home/TestimonialsSection";

function HomePage() {
  return (
    <div className="grid gap-20">
      <div className="min-h-screen flex items-center justify-center">
        <HeroSection />
      </div>
      <AboutUsSection />
      <HowItWorksSection />
      <BecomeAGuideSection />
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
}

export default HomePage;
