"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isTop, setIsTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Check if the page is at the very top initial state
      setIsTop(currentScrollPos < 50);

      // Determine visibility: visible if scrolling up, or if at the top
      const isScrollingUp = scrollPosition > currentScrollPos;
      setVisible(isScrollingUp || currentScrollPos < 50);

      setScrollPosition(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPosition]);

  // Styling class helper for social icons
  const iconClass = "text-white opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-200 flex items-center justify-center";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isTop 
            ? 'bg-transparent py-6' 
            : 'bg-white/95 backdrop-blur-md shadow-md py-4 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Main Logo Section */}
          <Link href="/" className="flex items-center">
            <div className="relative w-24 h-12 flex items-center justify-center">
              <Image
                src="/4biz_logo-1.avif"
                alt="4biz Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Right Side Navigation / Call To Action */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Contact Us button only appears when scrolled away from top */}
            {!isTop && (
              <Link 
                href="#contact" 
                className="border rounded-full px-6 py-2 text-xs uppercase tracking-wider font-semibold transition-all duration-300 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white"
              >
                Contact Us
              </Link>
            )}

            {/* Hamburger Menu Trigger for Full Navigation */}
            <button 
              onClick={() => setMenuOpen(true)}
              className="flex flex-col space-y-1.5 cursor-pointer p-1 focus:outline-none items-center justify-center"
              aria-label="Open Menu"
            >
              <span className={`w-8 h-0.5 transition-colors duration-300 ${isTop ? 'bg-white' : 'bg-slate-900'}`}></span>
              <span className={`w-5 h-0.5 transition-colors duration-300 ${isTop ? 'bg-white' : 'bg-slate-900'}`}></span>
              <span className={`w-8 h-0.5 transition-colors duration-300 ${isTop ? 'bg-white' : 'bg-slate-900'}`}></span>
            </button>
          </div>

          {/* Mobile Right Side Hamburger (Always Visible on Mobile/Tablet) */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setMenuOpen(true)}
              className="flex flex-col space-y-1.5 cursor-pointer p-1 focus:outline-none items-center justify-center"
              aria-label="Open Menu"
            >
              <span className={`w-8 h-0.5 transition-colors duration-300 ${isTop ? 'bg-white' : 'bg-slate-900'}`}></span>
              <span className={`w-5 h-0.5 transition-colors duration-300 ${isTop ? 'bg-white' : 'bg-slate-900'}`}></span>
              <span className={`w-8 h-0.5 transition-colors duration-300 ${isTop ? 'bg-white' : 'bg-slate-900'}`}></span>
            </button>
          </div>

        </div>
      </header>

      {/* Fullscreen Overlay Menu (Slides Down from Top) */}
      <div 
        className={`fixed inset-0 z-50 bg-gradient-to-tr from-emerald-500 via-teal-600 to-indigo-900 text-white transition-transform duration-500 ease-in-out ${
          menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Close Button Panel */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          {/* Overlay Menu Logo Section */}
          <div className="relative w-24 h-12 flex items-center justify-center">
            <Image
              src="/4biz_logo-1.avif"
              alt="4biz Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <button 
            onClick={() => setMenuOpen(false)}
            className="p-2 text-white focus:outline-none text-2xl font-light hover:opacity-70 transition-opacity"
            aria-label="Close Menu"
          >
            ✕
          </button>
        </div>

        {/* Menu Items Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-100px)] flex flex-col justify-center md:grid md:grid-cols-2 gap-10 overflow-y-auto pb-10">
          
          {/* Main Links */}
          <nav className="flex flex-col space-y-5 md:space-y-8 text-3xl md:text-5xl font-light tracking-wide justify-center">
            <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:opacity-70 transition-opacity w-fit">About</Link>
            <Link href="/services" onClick={() => setMenuOpen(false)} className="hover:opacity-70 transition-opacity w-fit">Services</Link>
            <Link href="/projects" onClick={() => setMenuOpen(false)} className="hover:opacity-70 transition-opacity w-fit">Projects</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:opacity-70 transition-opacity w-fit">Contact</Link>
          </nav>

          {/* Contact Details & Socials Sidebar */}
          <div className="flex flex-col justify-center space-y-6 border-t border-white/20 pt-6 md:border-t-0 md:pt-0 text-sm opacity-90">
            <div>
              <h4 className="font-bold text-lg mb-1 text-emerald-300">Contact Us</h4>
              <p className="font-light">HiLITE Business Park, Office 1419,</p>
              <p className="font-light">4th Floor, Kozhikode, Kerala 673014</p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-0.5 text-emerald-300">Say Hello</h4>
              <p className="font-light">Email: info@nuox.io</p>
              <p className="font-light">UAE: +91 43 545 833</p>
              <p className="font-light">KSA: +966 54 231 9651</p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-3 text-emerald-300">Get Social</h4>
              <div className="flex flex-wrap gap-5 items-center">
                {/* Facebook */}
                <a href="https://www.facebook.com/4bizglobal" target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="Facebook">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>

                {/* Instagram */}
                <a href="https://www.instagram.com/4biz_ae" target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4.162 4.162 0 1 1 0-8.324A4.162 4.162 0 0 1 12 16zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                </a>

                {/* LinkedIn */}
                <a href="https://www.linkedin.com/company/4biz-international/" target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="LinkedIn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
                </a>

                {/* X / Twitter */}
                <a href="https://x.com/4biz123" target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="X">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>

                {/* YouTube */}
                <a href="https://www.youtube.com/@4bizinternationalae" target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="YouTube">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}