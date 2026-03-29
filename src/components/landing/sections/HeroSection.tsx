'use client';

import { ChevronDown } from 'lucide-react';
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import RotatingText from '@/components/ui/RotatingText';

const HeroSection = () => {
  const transitionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const { scrollYProgress } = useScroll({
    target: transitionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = scrollYProgress;
  // Hinge phases stop once flattened (holds from 0.8 -> 1).
  const videoRotateX = useTransform(smoothProgress, [0, 0.45, 0.8, 1], [-45, -10, 0, 0]);
  const videoScale = useTransform(smoothProgress, [0, 0.45, 0.8, 1], [0.7, 0.8, 1, 1]);
  const videoY = useTransform(smoothProgress, [0, 0.45, 0.8, 1], [10, 40, 70, 70]);
  const videoWidth = useTransform(smoothProgress, [0, 0.45, 0.8, 1], ['133%', '111%', '100%', '100%']);

  // Shadow progression: small -> large -> medium.
  const shadowY = useTransform(smoothProgress, [0, 0.45, 0.8, 1], [3, 30, 16, 16]);
  const shadowBlur = useTransform(smoothProgress, [0, 0.45, 0.8, 1], [10, 86, 38, 38]);
  const shadowAlpha = useTransform(smoothProgress, [0, 0.45, 0.8, 1], [0.06, 0.32, 0.16, 0.16]);

  const videoShadow = useMotionTemplate`0 ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowAlpha})`;

  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToNextSection = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section ref={transitionRef} id="home" className="relative w-full" style={{ backgroundColor: '#ffffff', filter: 'none', backdropFilter: 'none' }}>
      {/* Main Content */}
      <div className="w-full px-6" style={{ paddingTop: '140px', paddingBottom: '100px' }}>
        <div className="mx-auto max-w-5xl">
          {/* Hero Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Main Heading */}
            <h1 className="mx-auto flex w-full items-baseline justify-center text-center text-black" style={{ 
              fontSize: isMobile ? '36px' : isTablet ? '48px' : '72px',
              fontWeight: 600, 
              letterSpacing: '-0.02em', 
              lineHeight: 1.1, 
              maxWidth: '1200px', 
              margin: '0 auto',
              paddingBottom: '8px',
              whiteSpace: isMobile ? 'normal' : 'nowrap',
              gap: '0px 20px',
              flexWrap: isMobile ? 'wrap' : 'nowrap',
              textAlign: 'center',
              transform: isMobile ? 'none' : 'translateX(9%)'
            }}>
              <span>Your trading</span>
              <RotatingText
                texts={['Partner', 'Comapnion', 'AI Agent']}
                mainClassName="inline-flex w-[10ch] min-w-[10ch] max-w-[10ch]  shrink-0 justify-start items-center leading-none text-black overflow-hidden"
                staggerFrom="last"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-120%' }}
                staggerDuration={0.065}
                splitLevelClassName="overflow-hidden pb-1"
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                rotationInterval={3000}
              />
            </h1>

            {/* Subtext */}
            <p className="text-center" style={{ fontSize: '18px', color: '#6b7280', lineHeight: 1.6, maxWidth: '600px', margin: '20px auto 0' }}>
              AlphaLedger connects traders and investors with analytics, verified performance, and new opportunities.
            </p>
          </div>
        </div>

        {/* Hero Image Section */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ marginTop: '124px' }}
        >
          <div className="relative mx-auto h-[200vh] w-full max-w-300">
            <div className="relative z-0 mx-auto w-full max-w-350">
              <Image
                src="https://cdn.prod.website-files.com/67ac759ac4ad791b823d59ec/67aede63d0dd9f30fc5f7608_lep.webp"
                alt="AlphaLedger Laptop"
                width={1120}
                height={700}
                quality={95}
                priority
                className="w-full h-auto"
              />
            </div>

            <div className="pointer-events-none sticky bottom-0 z-10 flex h-screen items-end justify-center">
              <div className="perspective-distant relative w-full max-w-350" style={{ perspective: '2600px', transformStyle: 'preserve-3d' }}>
                <motion.div
                  className="absolute bottom-0 left-1/2 rounded-xl bg-red-500 will-change-transform"
                  style={{
                    height: 700,
                    width: videoWidth,
                    rotateX: videoRotateX,
                    scale: videoScale,
                    x: '-50%',
                    y: videoY,
                    transformOrigin: 'top center',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    filter: 'none',
                    mixBlendMode: 'normal',
                    boxShadow: videoShadow,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden lg:block absolute" style={{ right: '40px', bottom: '40px' }}>
        <button
          onClick={scrollToNextSection}
          className="flex items-center justify-center rounded-full hover:bg-gray-400 transition-all duration-300 hover:scale-110"
          style={{ width: '48px', height: '48px', backgroundColor: '#eeeeee', animation: 'bounce 2s infinite' }}
          aria-label="Scroll to next section"
        >
          <ChevronDown size={20} className="text-black" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
