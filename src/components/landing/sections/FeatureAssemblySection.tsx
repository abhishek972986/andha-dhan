'use client';

import { BarChart3, LaptopMinimalCheck, ShieldCheck, Users } from 'lucide-react';
import { useRef } from 'react';

const FeatureAssemblySection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section ref={sectionRef} className="relative z-20 h-[180vh] w-full bg-[#050608] py-8">
      <div className="sticky top-0 flex h-[92vh] items-center justify-center overflow-visible px-4 md:px-8">
        <div className="relative mx-auto w-full max-w-7xl">
          <p className="text-center text-[13px] uppercase tracking-[0.16em] text-white/45">Feature Assembly</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-center text-[34px] font-medium leading-[1.08] tracking-[-0.02em] text-white md:text-[50px]">
            Unlock The Full Power
            <br />
            of Quantitative Trading
          </h2>

          <div className="relative mt-8 hidden h-130 md:block">
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-68 w-110 -translate-x-1/2 -translate-y-1/2 rounded-[24px] border border-white/12 bg-[linear-gradient(155deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] [clip-path:polygon(0_0,100%_0,100%_70%,78%_100%,22%_100%,0_70%)]" />
            <div id="assembly-center-target" className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-px w-px -translate-x-1/2 -translate-y-1/2" />

            <article className="absolute left-0 top-0 flex h-60 w-[34%] min-w-65 flex-col rounded-[22px] border border-white/12 bg-[linear-gradient(145deg,#15171d,#111317)] px-5 py-6">
              <div className="flex items-center justify-between text-white/80">
                <BarChart3 size={24} />
                <span className="text-[24px] font-medium tracking-[-0.02em] text-white/35">01</span>
              </div>
              <div className="mt-auto">
                <h3 className="text-[34px] font-medium leading-[1.05] tracking-[-0.02em] text-white">Real-Time Insights</h3>
                <p className="mt-3 max-w-md text-[22px] leading-tight text-white/68">
                  Our quantitative dashboard delivers actionable insights on any account in unparalleled detail.
                </p>
              </div>
            </article>

            <article className="absolute right-0 top-0 flex h-60 w-[34%] min-w-65 flex-col rounded-[22px] border border-white/12 bg-[linear-gradient(145deg,#15171d,#111317)] px-5 py-6">
              <div className="flex items-center justify-between text-white/80">
                <span className="text-[24px] font-medium tracking-[-0.02em] text-white/35">02</span>
                <ShieldCheck size={24} />
              </div>
              <div className="mt-auto text-right">
                <h3 className="text-[34px] font-medium leading-[1.05] tracking-[-0.02em] text-white">Secure Connection</h3>
                <p className="mt-3 ml-auto max-w-md text-[22px] leading-tight text-white/68">
                  AlphaLedger&apos;s proprietary infrastructure is built for secure processing and protection of sensitive data.
                </p>
              </div>
            </article>

            <article className="absolute bottom-0 left-0 flex h-60 w-[34%] min-w-65 flex-col rounded-[22px] border border-white/12 bg-[linear-gradient(145deg,#15171d,#111317)] px-5 py-6">
              <div className="flex items-center justify-between text-white/80">
                <LaptopMinimalCheck size={24} />
                <span className="text-[24px] font-medium tracking-[-0.02em] text-white/35">03</span>
              </div>
              <div className="mt-auto">
                <h3 className="text-[34px] font-medium leading-[1.05] tracking-[-0.02em] text-white">Tech Driven Precision</h3>
                <p className="mt-3 max-w-md text-[22px] leading-tight text-white/68">
                  Leverage high-precision equity calculations and in-depth trade analysis to maximize outcomes.
                </p>
              </div>
            </article>

            <article className="absolute bottom-0 right-0 flex h-60 w-[34%] min-w-65 flex-col rounded-[22px] border border-white/12 bg-[linear-gradient(145deg,#15171d,#111317)] px-5 py-6">
              <div className="flex items-center justify-between text-white/80">
                <span className="text-[24px] font-medium tracking-[-0.02em] text-white/35">04</span>
                <Users size={24} />
              </div>
              <div className="mt-auto text-right">
                <h3 className="text-[34px] font-medium leading-[1.05] tracking-[-0.02em] text-white">Trading Community</h3>
                <p className="mt-3 ml-auto max-w-md text-[22px] leading-tight text-white/68">
                  Connect with thousands of professional traders and investors across global markets.
                </p>
              </div>
            </article>
          </div>

          <div className="mt-8 grid gap-4 md:hidden">
            <article className="rounded-[20px] border border-white/12 bg-[linear-gradient(145deg,#15171d,#111317)] px-5 py-6">
              <div className="flex items-center justify-between text-white/80">
                <BarChart3 size={22} />
                <span className="text-[20px] text-white/40">01</span>
              </div>
              <h3 className="mt-6 text-[28px] font-medium leading-[1.05] tracking-[-0.02em] text-white">Real-Time Insights</h3>
            </article>

            <article className="rounded-[20px] border border-white/12 bg-[linear-gradient(145deg,#15171d,#111317)] px-5 py-6">
              <div className="flex items-center justify-between text-white/80">
                <ShieldCheck size={22} />
                <span className="text-[20px] text-white/40">02</span>
              </div>
              <h3 className="mt-6 text-[28px] font-medium leading-[1.05] tracking-[-0.02em] text-white">Secure Connection</h3>
            </article>

            <article className="rounded-[20px] border border-white/12 bg-[linear-gradient(145deg,#15171d,#111317)] px-5 py-6">
              <div className="flex items-center justify-between text-white/80">
                <LaptopMinimalCheck size={22} />
                <span className="text-[20px] text-white/40">03</span>
              </div>
              <h3 className="mt-6 text-[28px] font-medium leading-[1.05] tracking-[-0.02em] text-white">Tech Driven Precision</h3>
            </article>

            <article className="rounded-[20px] border border-white/12 bg-[linear-gradient(145deg,#15171d,#111317)] px-5 py-6">
              <div className="flex items-center justify-between text-white/80">
                <Users size={22} />
                <span className="text-[20px] text-white/40">04</span>
              </div>
              <h3 className="mt-6 text-[28px] font-medium leading-[1.05] tracking-[-0.02em] text-white">Trading Community</h3>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureAssemblySection;