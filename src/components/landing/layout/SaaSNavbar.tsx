'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, LogIn } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

interface SaaSNavbarProps {
  logo?: {
    text: string;
    icon?: React.ReactNode;
    href?: string;
  };
  links?: NavLink[];
  auth?: {
    login: {
      text: string;
      href: string;
      icon?: React.ReactNode;
    };
    signup: {
      text: string;
      href: string;
    };
  };
}

const SaaSNavbar = ({
  logo = {
    text: 'AlphaLedger',
    icon: null,
    href: '/',
  },
  links = [
    { label: 'Home', href: '#', isActive: true },
    { label: 'Features', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  auth = {
    login: {
      text: 'Login',
      href: '#',
      icon: <LogIn size={16} />,
    },
    signup: {
      text: 'Start Your Trial',
      href: '#',
    },
  },
}: SaaSNavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav
      className="w-full bg-white border-b border-gray-100 sticky top-0 z-50"
      style={{
        height: '70px',
      }}
    >
      {/* Desktop Navbar */}
      <div className="hidden md:flex h-full items-center justify-between mx-auto max-w-7xl px-6 lg:px-8">
        {/* LEFT SECTION - Logo */}
        <div style={{ flex: '0 0 auto' }}>
          <Link href={logo.href || '/'} className="flex items-center gap-2">
            {logo.icon && <span className="text-2xl">{logo.icon}</span>}
            <span
              className="font-semibold text-black"
              style={{
                fontSize: '20px',
                fontWeight: '600',
              }}
            >
              {logo.text}
            </span>
          </Link>
        </div>

        {/* CENTER SECTION - Navigation Links */}
        <div
          style={{
            flex: '1',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            className="flex items-center"
            style={{
              gap: '32px',
            }}
          >
            {links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className={`group relative inline-flex pb-1 text-[15px] font-medium transition-colors duration-200 ${
                  link.isActive ? 'text-black' : 'text-[#555] hover:text-black'
                }`}
              >
                <span>{link.label}</span>
                <span
                  className={`absolute left-0 -bottom-0.5 h-0.5 w-full origin-left bg-black transition-transform duration-300 ease-out ${
                    'scale-x-0 group-hover:scale-x-100'
                  }`}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION - Auth Buttons */}
        <div
          style={{
            flex: '0 0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {/* Login Button */}
          <Link
            href={auth.login.href}
            className="flex items-center gap-2 transition-colors duration-200 hover:text-black"
            style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#555',
            }}
          >
            {auth.login.icon}
            <span>{auth.login.text}</span>
          </Link>

          {/* CTA Button */}
          <Link
            href={auth.signup.href}
            className="inline-flex items-center justify-center font-medium text-white transition-all duration-200 hover:scale-105 hover:opacity-90"
            style={{
              backgroundColor: '#000',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '999px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            {auth.signup.text}
          </Link>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden h-full flex items-center justify-between px-6">
        {/* Mobile Logo */}
        <Link href={logo.href || '/'} className="flex items-center gap-2">
          {logo.icon && <span className="text-2xl">{logo.icon}</span>}
          <span
            className="font-semibold text-black"
            style={{
              fontSize: '18px',
              fontWeight: '600',
            }}
          >
            {logo.text}
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-black" />
          ) : (
            <Menu size={24} className="text-black" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div
          className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 md:hidden"
          style={{
            maxHeight: 'calc(100vh - 70px)',
            overflowY: 'auto',
          }}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-3 border-b border-gray-100 pb-4">
              {links.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="transition-colors duration-200 hover:text-black"
                  style={{
                    fontSize: '15px',
                    fontWeight: '500',
                    color: link.isActive ? '#000' : '#555',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col gap-3">
              <Link
                href={auth.login.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-2 transition-colors duration-200 hover:text-black"
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#555',
                }}
              >
                {auth.login.icon}
                <span>{auth.login.text}</span>
              </Link>

              <Link
                href={auth.signup.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center font-medium text-white transition-all duration-200 hover:scale-105 hover:opacity-90 py-2 w-full"
                style={{
                  backgroundColor: '#000',
                  color: '#fff',
                  borderRadius: '999px',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                {auth.signup.text}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default SaaSNavbar;
