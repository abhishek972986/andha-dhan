'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, LogIn } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200" style={{ height: '70px' }}>
      <div className="w-full h-full">
        <nav className="flex items-center justify-between h-full" style={{ paddingLeft: '80px', paddingRight: '80px' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center">
              <span className="text-white text-sm font-bold">ⲁ</span>
            </div>
            <span className="text-xl font-bold text-black">AlphaLedger</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center" style={{ gap: '40px' }}>
            <Link href="#home" className="font-medium text-black hover:opacity-70 transition-opacity" style={{ fontSize: '16px' }}>
              Home
            </Link>
            <Link href="#features" className="font-medium hover:opacity-70 transition-opacity" style={{ fontSize: '16px', color: '#444' }}>
              Features
            </Link>
            <Link href="#about" className="font-medium hover:opacity-70 transition-opacity" style={{ fontSize: '16px', color: '#444' }}>
              About
            </Link>
            <Link href="#pricing" className="font-medium hover:opacity-70 transition-opacity" style={{ fontSize: '16px', color: '#444' }}>
              Pricing
            </Link>
            <Link href="#blog" className="font-medium hover:opacity-70 transition-opacity" style={{ fontSize: '16px', color: '#444' }}>
              Blog
            </Link>
            <Link href="#contact" className="font-medium hover:opacity-70 transition-opacity" style={{ fontSize: '16px', color: '#444' }}>
              Contact
            </Link>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center" style={{ gap: '24px' }}>
            <button className="flex items-center gap-2 font-medium hover:opacity-70 transition-opacity" style={{ fontSize: '16px', color: '#444' }}>
              <LogIn size={16} />
              <span>Login</span>
            </button>
            <button className="bg-black text-white font-medium rounded-full hover:bg-gray-900 transition-all hover:shadow-lg hover:scale-105" style={{ padding: '12px 24px', fontSize: '16px' }}>
              Start Your Trial
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4">
            <div className="flex flex-col gap-4">
              <Link href="#home" className="text-sm font-medium text-black">
                Home
              </Link>
              <Link href="#features" className="text-sm font-medium text-gray-700">
                Features
              </Link>
              <Link href="#about" className="text-sm font-medium text-gray-700">
                About
              </Link>
              <Link href="#pricing" className="text-sm font-medium text-gray-700">
                Pricing
              </Link>
              <Link href="#blog" className="text-sm font-medium text-gray-700">
                Blog
              </Link>
              <Link href="#contact" className="text-sm font-medium text-gray-700">
                Contact
              </Link>
              <hr className="my-2" />
              <button className="flex items-center gap-2 text-sm text-gray-700 py-2">
                <LogIn size={16} />
                <span>Login</span>
              </button>
              <button className="bg-black text-white text-sm font-medium py-3 px-6 rounded-full w-full hover:bg-gray-900 transition-all">
                Start Your Trial
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
