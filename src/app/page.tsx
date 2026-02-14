import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { FigEvolutionSection } from "@/components/sections/fig-evolution-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ProcessSection } from "@/components/sections/process-section";
import { WhyFigSection } from "@/components/sections/why-fig-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FigEvolutionSection />
        <ServicesSection />
        <ProcessSection />
        <WhyFigSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
