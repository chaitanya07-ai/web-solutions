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

export default function Home() {
  return (
    <>
      <Loader />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <Services />
        <Industries />
        <Portfolio />
        <Comparison />
        <Roi />
        <ChatbotDemo />
        <DashboardDemo />
        <Features />
        <WhyUs />
        <Process />
        <Testimonials />
        <FAQ />
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
