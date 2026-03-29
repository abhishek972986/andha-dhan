'use client';

import { ArrowLeft, ArrowUpRight, Fingerprint } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const transferCardRef = useRef<HTMLDivElement | null>(null);
  const [lockedCenter, setLockedCenter] = useState<{ x: number; y: number } | null>(null);
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Phase 1: horizontal card animation completes first.
  const trackX = useTransform(scrollYProgress, [0, 0.78, 1], ['25vw', '-156vw', '-156vw']);
  const scrollHintX = useTransform(scrollYProgress, [0, 0.1], [0, 42]);
  const scrollHintMaskStop = useTransform(scrollYProgress, [0, 0.1], [100, 0]);
  const scrollHintMaskTail = useTransform(scrollYProgress, [0, 0.1], [130, 30]);
  const scrollHintMask = useMotionTemplate`linear-gradient(to right, rgba(0,0,0,1) ${scrollHintMaskStop}%, rgba(0,0,0,0) ${scrollHintMaskTail}%)`;
  const transferDistanceX = useMotionValue(0);
  const transferDistance = useMotionValue(520);

  useEffect(() => {
    const updateTransferDistance = () => {
      if (!transferCardRef.current) {
        return;
      }

      const targetEl = document.getElementById('assembly-center-target');
      if (!targetEl) {
        return;
      }

      const cardRect = transferCardRef.current.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;
      const measuredX = targetCenterX - cardCenterX;
      const measured = Math.max(0, targetCenterY - cardCenterY);
      transferDistanceX.set(measuredX);
      transferDistance.set(measured);
    };

    updateTransferDistance();
    window.addEventListener('resize', updateTransferDistance);

    return () => {
      window.removeEventListener('resize', updateTransferDistance);
    };
  }, [transferDistance, transferDistanceX]);

  // Smooth progress for the whole transfer animation.
  const transferProgress = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const smoothProgress = useSpring(transferProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.5,
  });
  const transferXProgress = useTransform(smoothProgress, [0, 0.78, 1], [0, 0, 1]);
  const transferX = useTransform(transferXProgress, (p) => p * transferDistanceX.get());
  const transferY = useTransform(smoothProgress, (p) => p * transferDistance.get());
  const transferScale = useTransform(smoothProgress, [0, 1], [1, 1.25]);
  const transferOpacity = useTransform(smoothProgress, [0, 1], [1, 1]);

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (value) => {
      if (value >= 0.995) {
        if (!lockedCenter && transferCardRef.current) {
          const rect = transferCardRef.current.getBoundingClientRect();
          setLockedCenter({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
        }
        return;
      }

      if (value <= 0.92 && lockedCenter) {
        setLockedCenter(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [lockedCenter, smoothProgress]);

  const transferWrapperStyle = isClient
    ? lockedCenter
      ? {
          position: 'fixed' as const,
          left: `${lockedCenter.x}px`,
          top: `${lockedCenter.y}px`,
          transform: 'translate(-50%, -50%)',
        }
      : {
          position: 'absolute' as const,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }
    : undefined;

  return (
    <section ref={sectionRef} id="features" className="relative z-40 h-[300vh] w-full bg-[#ffff]">
      <div className="sticky top-0 h-screen overflow-visible">
        <motion.div
          className="pointer-events-none absolute bottom-20 left-10 z-20 hidden items-center gap-3 text-[#7a7a7a] md:flex"
          style={
            isClient
              ? {
                  x: scrollHintX,
                  maskImage: scrollHintMask,
                  WebkitMaskImage: scrollHintMask,
                }
              : { opacity: 1 }
          }
        >
          <span className="inline-flex origin-center scale-x-125">
            <ArrowLeft size={32} strokeWidth={1.45} />
          </span>
          <p className="text-[30px] font-normal tracking-[0.01em]">SCROLL</p>
        </motion.div>

        <div className="mx-auto h-full w-full max-w-400 px-6 md:px-8">
          <div className="pt-6 md:pt-10">
            <div className="h-px w-full bg-[#d9d9d9]" />
            <div className="mt-6 flex items-center justify-between text-[#8a8a8a]">
              <p className="text-[14px] uppercase tracking-[0.08em]">Features</p>
              <ArrowUpRight size={22} />
            </div>
            <h2 className="mt-14 text-center text-[42px] font-medium tracking-[-0.02em] text-black md:text-[56px]">
              Our Features
            </h2>
          </div>

          <div className="mt-8 h-[calc(100vh-220px)] min-h-105">
            <motion.div
              className="flex h-full items-stretch gap-[2vw]"
              style={{ x: isClient ? trackX : '60vw', width: '236vw' }}
            >
              <article className="relative h-full w-[76vw] overflow-hidden rounded-[28px] bg-[#07090d]">
                <Image
                  src="https://images.unsplash.com/photo-1642104704074-907c0698ef47?auto=format&fit=crop&w=1700&q=80"
                  alt="Dashboard interface preview"
                  fill
                  priority
                  className="object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_55%,rgba(69,99,255,0.24),transparent_35%)]" />
              </article>

              <article className="relative h-full w-[76vw] overflow-hidden rounded-[28px] bg-[#050608] text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_72%,rgba(117,138,255,0.24),transparent_42%)]" />

                <div className="grid h-full grid-cols-1 md:grid-cols-2">
                  <div className="relative min-h-60" />

                  <div className="flex flex-col justify-center px-6 pb-8 pt-4 md:px-10">
                    <Fingerprint size={24} className="mb-8 text-white/70" />
                    <h3 className="text-[42px] font-medium leading-[1.02] tracking-[-0.02em] md:text-[58px]">
                      Verified &amp; Audited Leaderboard
                    </h3>
                    <p className="mt-5 max-w-md text-[20px] leading-relaxed text-white/75">
                      Ranked strategies, independently audited for transparency and reliability.
                    </p>
                    <button className="mt-9 w-fit rounded-full bg-white px-8 py-3 text-[18px] font-medium text-black transition hover:bg-white/90">
                      Connect Now
                    </button>
                  </div>
                </div>
              </article>

              <article className="relative flex h-full w-[76vw] flex-col justify-center overflow-visible rounded-[28px] bg-[#06080c] px-10 text-white md:px-16">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_72%,rgba(117,138,255,0.24),transparent_42%)]" />

                <div className="pointer-events-none z-200" style={transferWrapperStyle}>
                  <motion.div
                    ref={transferCardRef}
                    className="h-70 w-62.5 rounded-[20px] border border-white/35 bg-[linear-gradient(145deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03))] px-5 py-4 shadow-[0_35px_80px_rgba(0,0,0,0.45)] will-change-transform"
                    style={{
                      x: isClient ? transferX : 0,
                      y: isClient ? transferY : 0,
                      scale: isClient ? transferScale : 1,
                      opacity: isClient ? transferOpacity : 1,
                    }}
                  >
                    <p className="text-[34px] font-medium tracking-[-0.02em] text-white">AlphaLedger</p>
                    <div className="mt-4 grid grid-cols-7 gap-x-2 gap-y-3 opacity-60">
                      {Array.from({ length: 42 }).map((_, index) => (
                        <span key={index} className="h-0.5 w-3.5 rotate-42 rounded bg-white/50" />
                      ))}
                    </div>
                    <div className="mt-6 flex justify-end text-white/90">
                      <ArrowUpRight size={44} strokeWidth={2.2} />
                    </div>
                  </motion.div>
                </div>

                <div>
                  <p className="text-[78px] font-semibold leading-none tracking-[-0.02em] md:text-[100px]">$9.35M</p>
                  <p className="mt-2 text-[30px] text-white/75 md:text-[34px]">Total profit</p>
                </div>
                <div className="mt-14 border-t border-white/15 pt-12">
                  <p className="text-[78px] font-semibold leading-none tracking-[-0.02em] md:text-[100px]">$98.7M</p>
                  <p className="mt-2 text-[30px] text-white/75 md:text-[34px]">Revenue Growth</p>
                </div>
              </article>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
