import { Container } from "@/components/ui/container";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <Container className="max-w-3xl">
          <h1 className="font-heading text-4xl font-bold text-text-primary mb-8">
            Privacy Policy
          </h1>
          <div className="prose prose-lg text-text-secondary space-y-6">
            <p>
              At Fig, we take your privacy seriously. This page outlines how we
              handle data collected through our website.
            </p>
            <h2 className="font-heading text-xl font-semibold text-text-primary mt-8">
              Information We Collect
            </h2>
            <p>
              When you submit our contact form, we collect your name, email
              address, company name (if provided), and your message. This
              information is used solely to respond to your enquiry.
            </p>
            <h2 className="font-heading text-xl font-semibold text-text-primary mt-8">
              How We Use Your Information
            </h2>
            <p>
              We use the information you provide to respond to your enquiry and,
              if applicable, to discuss potential collaboration. We do not sell,
              share, or distribute your personal information to third parties.
            </p>
            <h2 className="font-heading text-xl font-semibold text-text-primary mt-8">
              Contact
            </h2>
            <p>
              If you have any questions about this privacy policy, please contact
              us at hello@fig.agency.
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
