'use client';

const CTASection = () => {
  return (
    <section
      className="flex h-[100vh] min-h-144 w-full items-center justify-center"
      style={{
        backgroundColor: '#ffffff',
        backgroundImage:
          'repeating-linear-gradient(45deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 2px, transparent 2px, transparent 20px)',
      }}
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <h2 className="max-w-3xl text-[40px] font-semibold leading-[1.08] tracking-[-0.02em] text-black md:text-[56px]">
          Stay Ahead in Trading with AlphaLedger
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[#666666] md:text-lg">
          Join us today and take your trading to the next level. AlphaLedger is
          your partner in achieving financial success.
        </p>
        <button className="mt-7 inline-flex items-center justify-center rounded-full bg-black px-7 py-3 text-base font-medium text-white transition hover:scale-[1.02] hover:opacity-95">
          Create Account
        </button>
      </div>
    </section>
  );
};

export default CTASection;
