"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Throttled scroll handler via rAF for high-performance scroll evaluation
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const currentScrollPos = window.scrollY;

        if (currentScrollPos <= 50) {
          setVisible(true);
          setIsSticky(false);
        } else {
          if (currentScrollPos > lastScrollY.current) {
            setVisible(false);
          } else {
            setVisible(true);
            setIsSticky(true);
          }
        }
        lastScrollY.current = currentScrollPos;
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Performance Optimization: Cache body reference and handle overflow smoothly
  useEffect(() => {
    const body = document.body;
    if (menuOpen) {
      body.style.setProperty('overflow', 'hidden', 'important');
      body.style.touchAction = 'none';
    } else {
      body.style.overflow = '';
      body.style.touchAction = '';
    }
    return () => {
      body.style.overflow = '';
      body.style.touchAction = '';
    };
  }, [menuOpen]);

  const iconClass =
    'text-white hover:text-blue-400 hover:scale-110 transition-all duration-200 flex items-center justify-center min-w-[24px] min-h-[24px]';

  // Desktop text sizes slightly reduced (from maxing out at lg:text-6xl down to xl:text-5xl / 2xl:text-5xl)
  const navLinkClass =
    'text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl font-light tracking-wide text-white hover:text-blue-400 transition-colors duration-300 block py-2 lg:py-3.5 break-words';

  const contactLinkClass = 'hover:text-blue-400 transition-colors duration-200 break-all';

  // Enhanced thickness for consistent visibility across zoom levels
  const lineClass = `h-[3.5px] rounded-full transition-all duration-300 ${
    !isSticky ? 'bg-white' : 'bg-slate-900'
  }`;

  return (
    <>
      {/* ─── HEADER BAR ─────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out will-change-transform ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isSticky
            ? 'bg-orange-50/95 backdrop-blur-md shadow-sm py-2.5 sm:py-3.5 text-slate-900'
            : 'bg-transparent py-5 sm:py-7 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          
          {/* Logo Container - Replaced Link with <a> to force a refreshed home page load */}
          <a href="/" className="flex items-center flex-shrink-0 transition-transform duration-300 hover:opacity-90">
            <div className={`relative flex items-center justify-center transition-all duration-300 ${
              isSticky ? 'w-20 h-10 sm:w-24 sm:h-11' : 'w-24 h-12 sm:w-28 sm:h-14'
            }`}>
              <Image
                src={isSticky ? "/4biz-logo-4.png" : "/4biz_logo-3.png"}
                alt="4biz Logo"
                fill
                sizes="(max-width: 640px) 96px, 112px"
                className="object-contain"
                priority
              />
            </div>
          </a>

          {/* Right side */}
          <div className="flex items-center gap-5 sm:gap-7 flex-shrink-0">
            {/* "Contact Us" pill — Zoom responsive display locks */}
            <div
              className={`hidden md:flex items-center transition-all duration-300 overflow-hidden ${
                isSticky ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0 pointer-events-none'
              }`}
            >
              <Link
                href="/#contact"
                className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-full px-6 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-sm hover:shadow-md hover:brightness-110 whitespace-nowrap border border-white/10"
              >
                Contact Us
              </Link>
            </div>

            {/* Asymmetrical hamburger with explicit structural bounding */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex flex-col gap-1.5 cursor-pointer p-1.5 focus:outline-none items-end justify-center group flex-shrink-0 min-w-[36px]"
              aria-label="Open Menu"
              aria-expanded={menuOpen}
              aria-controls="main-nav-overlay"
            >
              <span className={`w-8 sm:w-9 ${lineClass}`} />
              <span className={`w-6 sm:w-7 ${lineClass} group-hover:w-8 sm:group-hover:w-9`} />
              <span className={`w-8 sm:w-9 ${lineClass}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ─── FULLSCREEN OVERLAY MENU ────────────────────────────────────────── */}
      <div
        id="main-nav-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        className={`fixed inset-0 z-[9999999] bg-slate-950 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 text-white
          overflow-y-auto overscroll-contain min-h-screen w-full
          transition-all duration-300 ease-out will-change-[transform,opacity] transform-gpu
          ${menuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto visible'
            : 'opacity-0 translate-y-4 pointer-events-none invisible'
          }`}
      >
        <div className="min-h-full flex flex-col max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pb-12">
          
          {/* Top Bar inside Overlay */}
          <div className="flex justify-between items-center py-5 sm:py-7 flex-shrink-0 gap-4">
            <div className="relative w-24 h-12 sm:w-28 sm:h-14 flex items-center justify-center">
              <Image
                src="/4biz_logo-1.png"
                alt="4biz Logo"
                fill
                sizes="(max-width: 640px) 96px, 112px"
                className="object-contain"
                priority
              />
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 text-white hover:text-red-400 focus:outline-none text-4xl font-light hover:rotate-90 transition-all duration-300 ease-in-out leading-none select-none min-w-[48px] min-h-[48px] flex items-center justify-center"
              aria-label="Close Menu"
            >
              ✕
            </button>
          </div>

          {/* Main Layout Container — Fluid layout blocks preventing clip overflows */}
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 py-6 sm:py-10 items-start content-center">
            
            {/* LEFT: Navigation Links */}
            <nav className="lg:col-span-6 flex flex-col justify-center space-y-1.5 sm:space-y-3">
              {/* Home Link explicitly forced as standard <a> anchor layout for fresh reload */}
              <a
                href="/"
                onClick={() => setMenuOpen(false)}
                className={navLinkClass}
              >
                Home
              </a>

              {[
                { label: 'About', path: '/about' },
                { label: 'Services', path: '/services' },
                { label: 'Contact', path: '/contact' },
                { label: 'Blogs', path: '/blogs' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.path}
                  onClick={() => {
                    // Slight delay allows overlay animation to close smoothly before hash scroll hits
                    setTimeout(() => setMenuOpen(false), 50);
                  }}
                  className={navLinkClass}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* RIGHT: Contact Info Wrapper */}
            <div className="lg:col-span-6 flex flex-col space-y-8 sm:space-y-10 lg:text-left text-xs sm:text-sm text-white">
              
              {/* BLOCK 1: Get Social */}
              <div className="space-y-2.5 sm:space-y-3.5">
                <h4 className="font-semibold text-white tracking-wider uppercase text-[11px] sm:text-xs opacity-80">
                  Get Social
                </h4>
                <div className="flex flex-wrap gap-4 items-center pt-1">
                  {/* Facebook */}
                  <a href="https://www.facebook.com/4bizglobal" target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="Facebook">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://www.instagram.com/4biz_ae" target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="Instagram">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4.162 4.162 0 1 1 0-8.324A4.162 4.162 0 0 1 12 16zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a href="https://www.linkedin.com/company/4biz-international/" target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                    </svg>
                  </a>
                  {/* X */}
                  <a href="https://x.com/4biz123" target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="X (formerly Twitter)">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  {/* YouTube */}
                  <a href="https://www.youtube.com/@4bizinternationalae" target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="YouTube">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93-.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* BLOCK 2: Say Hello */}
              <div className="space-y-2.5 sm:space-y-3.5">
                <h4 className="font-semibold text-white tracking-wider uppercase text-[11px] sm:text-xs opacity-80">
                  Say Hello
                </h4>
                <div className="space-y-2.5 font-light text-[13px] sm:text-[14px]">
                  <p className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-medium text-white min-w-[80px] inline-block">Email:</span>
                    <a href="mailto:info@4bizinternational.com" className={contactLinkClass}>
                      info@4bizinternational.com
                    </a>
                  </p>
                  <p className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-medium text-white min-w-[80px] inline-block">UAE:</span>
                    <a href="tel:+971527925100" className={contactLinkClass}>+971 52 792 5100</a>
                  </p>
                  <p className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-medium text-white min-w-[80px] inline-block">India:</span>
                    <a href="tel:+919895717879" className={contactLinkClass}>+91 98957 17879</a>
                  </p>
                  <p className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-medium text-white min-w-[80px] inline-block">Whatsapp:</span>
                    <a
                      href="https://wa.me/919895717879?text=Hello%204Biz%20International%2C%20I%20am%20interested%20in%20your%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                      className={contactLinkClass}
                    >
                      +91 98957 17879
                    </a>
                  </p>
                </div>
              </div>

              {/* BLOCK 3: Contact Us Addresses */}
              <div className="space-y-2.5 sm:space-y-3.5">
                <h4 className="font-semibold text-white tracking-wider uppercase text-[11px] sm:text-xs opacity-80">
                  Contact Us
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 font-light leading-relaxed text-[13px] sm:text-[14px]">
                  <div>
                    <strong className="font-semibold block text-white mb-0.5">Dubai:</strong>
                    <p className="opacity-90">Office 104, Crystal Building, Al Karama, Near ADCB Metro, Dubai, UAE</p>
                  </div>
                  <div>
                    <strong className="font-semibold block text-white mb-0.5">India (HiLITE):</strong>
                    <p className="opacity-90">Tower 2, HiLITE Business Park, Office 2723, 7th Floor, near HiLITE Mall, Poovangal, Pantheeramkavu, Kozhikode, Kerala 673014, India</p>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <strong className="font-semibold block text-white mb-0.5">India (Nadakkave):</strong>
                    <p className="opacity-90">5th Floor, C. M. Mathew Brothers Arcade, Kannur Rd, West Nadakkave, Chakkorathukulam, Kozhikode, Kerala 673006, India</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}