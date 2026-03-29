import SaaSNavbar from '@/components/landing/layout/SaaSNavbar';
import HeroSection from '@/components/landing/sections/HeroSection';
import KeyFiguresSection from '@/components/landing/sections/KeyFiguresSection';
import FeaturesSection from '@/components/landing/sections/FeaturesSection';
import FeatureAssemblySection from '@/components/landing/sections/FeatureAssemblySection';
import PricingSection from '@/components/landing/sections/PricingSection';
import CTASection from '@/components/landing/sections/CTASection';
import Footer from '@/components/landing/layout/Footer';

export const metadata = {
  title: 'AlphaLedger - Your Trading Companion',
  description: 'AlphaLedger connects traders and investors with analytics, verified performance, and new opportunities.',
  openGraph: {
    title: 'AlphaLedger - Your Trading Companion',
    description: 'AlphaLedger connects traders and investors with analytics, verified performance, and new opportunities.',
    url: 'https://alphaledger.com',
    siteName: 'AlphaLedger',
  },
};

export default function LandingPage() {
  return (
    <main className="bg-white min-h-screen">
      <SaaSNavbar />
      <HeroSection />
      <KeyFiguresSection />
      <FeaturesSection />
      <div className="h-24 bg-white md:h-32" aria-hidden="true" />
      <FeatureAssemblySection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
