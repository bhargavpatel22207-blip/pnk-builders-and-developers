import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Projects } from "@/components/site/Projects";
import { Gallery } from "@/components/site/Gallery";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Testimonials } from "@/components/site/Testimonials";
import { EnquirySection } from "@/components/site/EnquirySection";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { EnquiryPopup } from "@/components/site/EnquiryPopup";
import { FloatingActions } from "@/components/site/FloatingActions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PNK Builders & Developers | Construction in Zaheerabad, Telangana" },
      { name: "description", content: "PNK Builders & Developers — 15+ years of premium residential & commercial construction across Zaheerabad, Narayankhed, Sangareddy & Rudraram. Build your dream home with us." },
      { name: "keywords", content: "construction company Zaheerabad, builders Telangana, residential construction, commercial construction, property developers, PNK Builders" },
      { property: "og:title", content: "PNK Builders & Developers | Building Trust. Delivering Quality." },
      { property: "og:description", content: "15+ years of excellence in construction and property development across Telangana." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function scrollToEnquiry() {
  document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
}

function Index() {
  return (
    <div className="overflow-x-hidden">
      <Toaster position="top-center" richColors />
      <Header onEnquire={scrollToEnquiry} />
      <main>
        <Hero onConsult={scrollToEnquiry} />
        <About />
        <Services />
        <Projects />
        <Gallery />
        <WhyChooseUs />
        <Testimonials />
        <EnquirySection />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      <EnquiryPopup />
    </div>
  );
}
