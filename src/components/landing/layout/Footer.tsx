'use client';

import Link from 'next/link';
import { Linkedin, Instagram, X, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Set initial state
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative w-full h-screen overflow-hidden"
      style={{
        backgroundColor: '#ffff',
        paddingTop: 'clamp(150px, 20vw, 170px)',
        paddingBottom: '0px',
        paddingLeft: 'clamp(24px, 5vw, 40px)',
        paddingRight: 'clamp(24px, 5vw, 40px)',
      }}
    >
      {/* Floating Scroll-To-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="absolute z-40 flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            right: '40px',
            bottom: '80px',
            width: '44px',
            height: '44px',
            backgroundColor: '#000',
            borderRadius: '999px',
            color: '#fff',
          }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Main Content */}
      <div className="relative z-20 mx-auto" style={{ maxWidth: '1280px' }}>
        {/* Top Section - 3 Column Layout */}
        <div
          className="flex flex-col lg:flex-row items-center lg:items-start mb-16 w-full lg:gap-0"
          style={{
            gap: 'clamp(40px, 8vw, 60px)',
          }}
        >
          {/* LEFT COLUMN - Navigation Links */}
          <div style={{ flex: '0 0 20%' }} className="hidden lg:block">
            <nav className="flex flex-col" style={{ gap: '18px' }}>
              <Link
                href="#home"
                className="font-bold text-black transition-opacity hover:opacity-70"
                style={{ fontSize: '15px' }}
              >
                Home
              </Link>
              <Link
                href="#features"
                className="transition-opacity hover:opacity-70"
                style={{ fontSize: '15px', color: '#666' }}
              >
                Features
              </Link>
              <Link
                href="#about"
                className="transition-opacity hover:opacity-70"
                style={{ fontSize: '15px', color: '#666' }}
              >
                About
              </Link>
              <Link
                href="#pricing"
                className="transition-opacity hover:opacity-70"
                style={{ fontSize: '15px', color: '#666' }}
              >
                Pricing
              </Link>
              <Link
                href="#blog"
                className="transition-opacity hover:opacity-70"
                style={{ fontSize: '15px', color: '#666' }}
              >
                Blog
              </Link>
              <Link
                href="#news"
                className="transition-opacity hover:opacity-70"
                style={{ fontSize: '15px', color: '#666' }}
              >
                News
              </Link>
            </nav>
          </div>

          {/* CENTER COLUMN - Brand & Social (PERFECTLY CENTERED) */}
          <div
            style={{
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {/* Logo + Brand Name */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="flex items-center justify-center rounded-sm bg-black" style={{ width: '32px', height: '32px' }}>
                <span className="text-white text-sm font-bold">ⲁ</span>
              </div>
              <span
                className="text-black"
                style={{ fontSize: '28px', fontWeight: '600', transform: 'rotate(180deg)', display: 'inline-block' }}
              >
                AlphaLedger
              </span>
            </div>

            {/* Description */}
            <p
              className="text-gray-600"
              style={{
                fontSize: '15px',
                maxWidth: '460px',
                marginTop: '12px',
                lineHeight: '1.6',
              }}
            >
              Dynamic solutions to elevate your trading success. Discover our unmatched performance, trusted by top traders worldwide.
            </p>

            {/* Social Icons */}
            <div className="flex items-center justify-center" style={{ gap: '14px', marginTop: '18px' }}>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-all hover:scale-110"
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: '#000',
                  borderRadius: '50%',
                  color: '#fff',
                }}
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-all hover:scale-110"
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: '#000',
                  borderRadius: '50%',
                  color: '#fff',
                }}
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-all hover:scale-110"
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: '#000',
                  borderRadius: '50%',
                  color: '#fff',
                }}
                aria-label="X (Twitter)"
              >
                <X size={18} />
              </a>
            </div>

            {/* Mobile CTA Button */}
            <button
              className="w-full lg:hidden font-medium text-white transition-all hover:scale-[1.03] hover:opacity-90 mt-8"
              style={{
                backgroundColor: '#000',
                color: '#fff',
                padding: '12px 26px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Connect Now
            </button>
          </div>

          {/* RIGHT COLUMN - CTA Button (Aligned with logo top) */}
          <div style={{ flex: '0 0 20%', display: 'flex', justifyContent: 'flex-end' }} className="hidden lg:flex">
            <button
              className="font-medium text-white transition-all hover:scale-[1.03] hover:opacity-90"
              style={{
                backgroundColor: '#000',
                color: '#fff',
                padding: '12px 26px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Connect Now
            </button>
          </div>
        </div>

        {/* Divider Line */}
        <div
          style={{
            borderTop: '1px solid #ddd',
            marginTop: '60px',
            marginBottom: '0px',
          }}
        />

        {/* Bottom Section - Legal & Info (PROPERLY CENTERED) */}
        <div
          className="relative flex flex-col gap-4 md:gap-6 items-center justify-center md:flex-row md:items-center md:justify-between"
          style={{
            textAlign: 'center',
          }}
        >
          {/* LEFT - Copyright */}
          <p
            className="text-gray-600 text-center md:text-left"
            style={{ fontSize: '13px' }}
          >
            © All rights reserved. 2025 AlphaLedger
          </p>

          {/* CENTER - Email (ABSOLUTELY CENTERED on desktop, static on mobile) */}
          <a
            href="mailto:info@AlphaLedger.ai"
            className="font-medium text-black transition-opacity hover:opacity-70 md:absolute md:left-1/2"
            style={{
              fontSize: '13px',
              transform: isDesktop ? 'translateX(-50%)' : 'none',
            }}
          >
            info@AlphaLedger.ai
          </a>

          {/* RIGHT - Legal Links */}
          <div className="flex items-center gap-2 text-center md:text-right" style={{ fontSize: '13px' }}>
            <Link href="#" className="text-gray-600 transition-opacity hover:opacity-70">
              Terms of Service
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="#" className="text-gray-600 transition-opacity hover:opacity-70">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Background Typography - Giant AlphaLedger Text */}
      <div
        className="absolute z-0 left-1/2 pointer-events-none hidden lg:block"
        style={{
          bottom: '15px',
          transform: 'translateX(-50%)',
        }}
      >
        <div
          style={{
            fontSize: '180px',
            fontWeight: '600',
            color: '#000',
            opacity: 1,
            lineHeight: '1',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          AlphaLedger
        </div>
      </div>

      {/* Background Typography - Medium screens */}
      <div
        className="absolute z-0 left-1/2 pointer-events-none hidden md:block lg:hidden"
        style={{
          bottom: '-100px',
          transform: 'translateX(-50%)',
        }}
      >
        <div
          style={{
            fontSize: '120px',
            fontWeight: '600',
            color: '#000',
            opacity: 1,
            lineHeight: '1',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          AlphaLedger
        </div>
      </div>

      {/* Background Typography - Small screens */}
      <div
        className="absolute z-0 left-1/2 pointer-events-none md:hidden"
        style={{
          bottom: '-100px',
          transform: 'translateX(-50%)',
        }}
      >
        <div
          style={{
            fontSize: '90px',
            fontWeight: '600',
            color: '#000',
            opacity: 1,
            lineHeight: '1',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          AlphaLedger
        </div>
      </div>
    </footer>
  );
};

export default Footer;
