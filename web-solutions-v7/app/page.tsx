import Loader from "@/components/loader";
import Navbar from "@/components/navbar";
import { ScrollProgress } from "@/components/smooth-scroll";
import Hero from "@/components/sections/hero";
import Trust from "@/components/sections/trust";
import Services from "@/components/sections/services";
import Industries from "@/components/sections/industries";
import Portfolio from "@/components/sections/portfolio";
import Comparison from "@/components/sections/comparison";
import ChatbotDemo from "@/components/sections/chatbot";
import DashboardDemo from "@/components/sections/dashboard";
import Features from "@/components/sections/features";
import Process from "@/components/sections/process";
import WhyUs from "@/components/sections/why-us";
import Testimonials from "@/components/sections/testimonials";
import FAQ from "@/components/sections/faq";
import CTA from "@/components/sections/cta";
import Footer from "@/components/sections/footer";
import BookingModal from "@/components/booking";
import Assistant from "@/components/assistant";
import SampleWizard from "@/components/sample-wizard";
import { Roi, StickyBar } from "@/components/growth";
import { Cursor, MarqueeBand } from "@/components/effects";
import Workflow from "@/components/sections/workflow";
import Integrations from "@/components/sections/integrations";

export default function Home() {
  return (
    <>
      <Loader />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <Services />
        <Workflow />
        <MarqueeBand items={["Restaurants", "Salons", "Gyms", "Clinics", "Hotels", "Stores", "Real Estate", "Academies"]} />
        <Industries />
        <Portfolio />
        <Comparison />
        <Roi />
        <ChatbotDemo />
        <DashboardDemo />
        <Features />
        <Integrations />
        <WhyUs />
        <Process />
        <Testimonials />
        <FAQ />
        <MarqueeBand dark items={["Free sample", "Book a call", "7–14 days", "Worldwide", "One-time payment"]} />
        <CTA />
      </main>
      <Footer />
      <BookingModal />
      <Assistant />
      <SampleWizard />
      <StickyBar />
    </>
  );
}
