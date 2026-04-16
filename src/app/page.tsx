import Nav from '@/components/sections/Nav';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import HowItWorks from '@/components/sections/HowItWorks';
import BrandMarquee from '@/components/sections/BrandMarquee';
import Portfolio from '@/components/sections/Portfolio';
import WhyUs from '@/components/sections/WhyUs';
import Pricing from '@/components/sections/Pricing';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';
import FloatingVoiceOrb from '@/components/sections/FloatingVoiceOrb';
import GridBackground from '@/components/sections/GridBackground';
import ScrollReveal from '@/components/sections/ScrollReveal';

export default function Home() {
  return (
    <>
      <GridBackground />
      <Nav />
      <Hero />
      <Services />
      <HowItWorks />
      <BrandMarquee />
      <Portfolio />
      <WhyUs />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
      <FloatingVoiceOrb />
      <ScrollReveal />
    </>
  );
}
