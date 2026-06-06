"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const iconClass = "text-white/80 hover:text-white hover:scale-110 transition-all duration-200 flex items-center justify-center";
  const navLinkClass = "text-3xl md:text-3xl font-light tracking-wide text-white hover:text-blue-400 transition-colors duration-300 block py-1 md:py-2";
  const contactLinkClass = "hover:text-blue-400 transition-colors duration-200";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out will-change-transform ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isSticky 
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-4 text-slate-900' 
            : 'bg-transparent py-6 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Main Logo Section */}
          <Link href="/" className="flex items-center">
            <div className="relative w-24 h-12 flex items-center justify-center">
              <Image
                src="/4biz_logo-1.png"
                alt="4biz Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Right Side Navigation / Call To Action */}
          <div className="hidden md:flex items-center space-x-6">
            <div className={`transition-all duration-300 overflow-hidden flex items-center ${isSticky ? 'max-w-[150px] opacity-100' : 'max-w-0 opacity-0 pointer-events-none'}`}>
              <Link 
                href="#contact" 
                className="border rounded-full px-6 py-2 text-xs uppercase tracking-wider font-semibold transition-all duration-300 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white whitespace-nowrap"
              >
                Contact Us
              </Link>
            </div>

            {/* Asymmetrical Hamburger Menu Trigger */}
            <button 
              onClick={() => setMenuOpen(true)}
              className="flex flex-col space-y-1.5 cursor-pointer p-2 focus:outline-none items-end justify-center group"
              aria-label="Open Menu"
            >
              <span className={`w-8 h-0.5 transition-all duration-300 ${!isSticky ? 'bg-white' : 'bg-slate-900'}`}></span>
              <span className={`w-5 h-0.5 transition-all duration-300 ${!isSticky ? 'bg-white' : 'bg-slate-900'}`}></span>
              <span className={`w-8 h-0.5 transition-all duration-300 ${!isSticky ? 'bg-white' : 'bg-slate-900'}`}></span>
            </button>
          </div>

          {/* Mobile Right Side Hamburger */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setMenuOpen(true)}
              className="flex flex-col space-y-1.5 cursor-pointer p-2 focus:outline-none items-end justify-center"
              aria-label="Open Menu"
            >
              <span className={`w-8 h-0.5 transition-all duration-300 ${!isSticky ? 'bg-white' : 'bg-slate-900'}`}></span>
              <span className={`w-5 h-0.5 transition-all duration-300 ${!isSticky ? 'bg-white' : 'bg-slate-900'}`}></span>
              <span className={`w-8 h-0.5 transition-all duration-300 ${!isSticky ? 'bg-white' : 'bg-slate-900'}`}></span>
            </button>
          </div>

        </div>
      </header>

      {/* Fullscreen Overlay Menu (Optimized Nuox-style Gradient Layout) */}
      <div 
        className={`fixed inset-0 z-[60] bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 backdrop-blur-xl text-white transition-all duration-500 ease-in-out ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Top Bar inside Navigation Window */}
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-6 flex justify-between items-center">
          <div className="relative w-24 h-12 flex items-center justify-center">
            <Image
              src="/4biz_logo-1.png"
              alt="4biz Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <button 
            onClick={() => setMenuOpen(false)}
            className="p-2 text-white hover:text-red-400 focus:outline-none text-3xl font-light hover:rotate-90 transition-all duration-300 ease-in-out"
            aria-label="Close Menu"
          >
            ✕
          </button>
        </div>

        {/* Menu Content Panels: Structured Nuox-Style Architecture */}
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 h-[calc(100vh-100px)] flex flex-col justify-start md:justify-center overflow-y-auto pb-8">
          
          {/* Main Links Row - Structured with interactive hover layout states */}
          <nav className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 text-left pt-2 md:pt-4 border-b border-white/10 pb-6 md:pb-8 md:-mt-12">
            <Link href="/about" onClick={() => setMenuOpen(false)} className={navLinkClass}>About</Link>
            <Link href="/services" onClick={() => setMenuOpen(false)} className={navLinkClass}>Services</Link>
            <Link href="/projects" onClick={() => setMenuOpen(false)} className={navLinkClass}>Projects</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className={navLinkClass}>Contact</Link>
          </nav>

          {/* Contact Details & Socials Base Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 pt-6 text-xs md:text-sm text-white/80">
            {/* Address Column */}
            <div className="space-y-2">
              <h4 className="font-semibold text-white tracking-wider uppercase text-[10px] md:text-xs opacity-60">Contact Us</h4>
              <div className="space-y-3 font-light leading-relaxed text-[11px] md:text-[13px]">
                <p>
                  <strong className="font-semibold block text-white/90">Dubai:</strong>
                  Office 104, Crystal Building, Al Karama, Near ADCB Metro, Dubai, UAE
                </p>
                <p>
                  <strong className="font-semibold block text-white/90">India (HiLITE):</strong>
                  Tower 2, HiLITE Business Park, Office 2723, 7th Floor, near HiLITE Mall, Poovangal, Pantheeramkavu, Kozhikode, Kerala 673014, India
                </p>
                <p>
                  <strong className="font-semibold block text-white/90">India (Nadakkave):</strong>
                  5th Floor, C. M. Mathew Brothers Arcade, Kannur Rd,  West Nadakkave, Chakkorathukulam, Kozhikode, Kerala 673006, India
                </p>
              </div>
            </div>

            {/* Communication Touchpoints Column - Enhanced Active Clickable States */}
            <div className="space-y-2">
              <h4 className="font-semibold text-white tracking-wider uppercase text-[10px] md:text-xs opacity-60">Say Hello</h4>
              <div className="space-y-1.5 font-light text-[11px] md:text-[13px]">
                <p>
                  <span className="inline-block w-16 text-white/60">Email:</span> 
                  <a href="mailto:info@4bizinternational.com" className={contactLinkClass}>info@4bizinternational.com</a>
                </p>
                <p>
                  <span className="inline-block w-16 text-white/60">UAE:</span> 
                  <a href="tel:+971527925100" className={contactLinkClass}>+971 52 792 5100</a>
                </p>
                <p>
                  <span className="inline-block w-16 text-white/60">India:</span> 
                  <a href="tel:+919895717879" className={contactLinkClass}>+91 98957 17879</a>
                </p>
                <p>
                  <span className="inline-block w-16 text-white/60">Whatsapp:</span> 
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

            {/* Social Connection Column */}
            <div className="space-y-2 md:col-span-2 lg:col-span-1">
              <h4 className="font-semibold text-white tracking-wider uppercase text-[10px] md:text-xs opacity-60">Get Social</h4>
              <div className="flex flex-wrap gap-4 items-center pt-1">
                {/* Facebook */}
                <a href="https://www.facebook.com/4bizglobal" target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>

                {/* Instagram */}
                <a href="https://www.instagram.com/4biz_ae" target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4.162 4.162 0 1 1 0-8.324A4.162 4.162 0 0 1 12 16zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                </a>

                {/* LinkedIn */}
                <a href="https://www.linkedin.com/company/4biz-international/" target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
                </a>

                {/* X / Twitter */}
                <a href="https://x.com/4biz123" target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="X">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>

                {/* YouTube */}
                <a href="https://www.youtube.com/@4bizinternationalae" target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="YouTube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93-.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}