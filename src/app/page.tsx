import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";

const ProblemSection = dynamic(
  () =>
    import("@/components/sections/problem-section").then(
      (mod) => mod.ProblemSection
    ),
  { ssr: true }
);

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

const CaseStudiesSection = dynamic(
  () =>
    import("@/components/sections/case-studies-section").then(
      (mod) => mod.CaseStudiesSection
    ),
  { ssr: true }
);

const FaqSection = dynamic(
  () =>
    import("@/components/sections/faq-section").then((mod) => mod.FaqSection),
  { ssr: true }
);

const FinalCtaSection = dynamic(
  () =>
    import("@/components/sections/final-cta-section").then(
      (mod) => mod.FinalCtaSection
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
        <ProblemSection />
        <ServicesSection />
        <ProcessSection />
        <WhyFigSection />
        <CaseStudiesSection />
        <FaqSection />
        <FinalCtaSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
