import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";

const ServicesSection = dynamic(
  () =>
    import("@/components/sections/services-section").then(
      (mod) => mod.ServicesSection
    ),
  { ssr: true }
);

const ProcessSection = dynamic(
  () =>
    import("@/components/sections/process-section").then(
      (mod) => mod.ProcessSection
    ),
  { ssr: true }
);

const WhyFigSection = dynamic(
  () =>
    import("@/components/sections/why-fig-section").then(
      (mod) => mod.WhyFigSection
    ),
  { ssr: true }
);

const ContactSection = dynamic(
  () =>
    import("@/components/sections/contact-section").then(
      (mod) => mod.ContactSection
    ),
  { ssr: true }
);

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <WhyFigSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
