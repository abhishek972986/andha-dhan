'use client';

import { MagicText } from '@/components/ui/magic-text';

const stats = [
  { value: '12k+', label: 'Accounts' },
  { value: '1.8k+', label: 'Pro Traders' },
  { value: '990M+', label: 'Trading Capital' },
];

const KeyFiguresSection = () => {
  return (
    <section className="w-full bg-[#FFFFFF] py-24 md:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <h2 className="text-center text-[34px] font-medium tracking-[-0.02em] text-black md:text-[38px]">
          Key Figures
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-12 text-center md:grid-cols-3 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <p className="text-[34px] font-semibold leading-none text-black md:text-[44px]">
                {stat.value}
              </p>
              <p className="mt-4 text-[18px] font-normal text-[#6b7280]">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-20 h-px w-[88%] bg-[#dbdbdb]" />

        <p className="mt-8 text-left text-[13px] font-medium uppercase tracking-[0.08em] text-[#111111]">
          Highlights
        </p>

        <MagicText
          text="When does a man die? When he is hit by a bullet? No! When he suffers a disease? No! When he ate a soup made out of a poisonous mushroom? No! A man dies when he is forgotten!"
        />
      </div>
    </section>
  );
};

export default KeyFiguresSection;