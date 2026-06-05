'use client';

import React, { useState, useEffect } from 'react';

export default function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);
  const iconClass = 'text-white flex items-center justify-center transition-all duration-300 hover:scale-115 hover:opacity-100 opacity-80';

  useEffect(() => {
    const handleScroll = () => {
      // Triggers the fade-out effect as soon as user scrolls down 20px
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socials = [
    {
      href: 'https://wa.me/971527925100?text=Hello%204Biz%20International,%20I%20am%20interested%20in%20your%20services.%20Please%20share%20more%20details.',
      label: 'WhatsApp',
      path: 'M20.52 3.48A11.8 11.8 0 0 0 12.04 0C5.4 0 .02 5.38.02 12c0 2.12.56 4.19 1.62 6.02L0 24l6.15-1.61A11.97 11.97 0 0 0 12.04 24C18.66 24 24 18.62 24 12c0-3.2-1.25-6.2-3.48-8.52zM12.04 21.9c-1.8 0-3.56-.48-5.1-1.38l-.36-.21-3.65.96.98-3.56-.24-.37A9.8 9.8 0 0 1 2.24 12c0-5.4 4.4-9.8 9.8-9.8s9.8 4.4 9.8 9.8-4.4 9.9-9.8 9.9zm5.38-7.36c-.29-.15-1.72-.85-1.99-.95-.27-.1-.47-.15-.66.15-.19.29-.76.95-.93 1.14-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.43-.86-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.66-1.58-.9-2.16-.24-.58-.49-.5-.66-.51h-.56c-.19 0-.51.07-.78.36-.27.29-1.02 1-.98 2.43.05 1.43 1.02 2.81 1.16 3 .15.19 2.02 3.08 4.89 4.31.68.29 1.21.46 1.62.58.68.22 1.3.19 1.79.12.55-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.19-.56-.34z',
      target: '_blank',
    },
    {
      href: 'tel:+971527925100',
      label: 'Call',
      path: 'M23.27 17.53l-5.3-2.27c-.57-.24-1.22-.08-1.61.39l-2.35 2.87c-3.65-1.72-6.59-4.66-8.31-8.31l2.87-2.35c.47-.39.63-1.04.39-1.61L6.69.73A1.5 1.5 0 0 0 5.03-.13L.89.83A1.5 1.5 0 0 0-.25 2.29C-.25 14.3 9.7 24.25 21.71 24.25a1.5 1.5 0 0 0 1.46-1.14l.96-4.14a1.5 1.5 0 0 0-.86-1.44z',
    },
    {
      href: 'https://www.facebook.com/4bizglobal',
      label: 'Facebook',
      path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
      target: '_blank',
    },
    {
      href: 'https://www.instagram.com/4biz_ae',
      label: 'Instagram',
      path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4.162 4.162 0 1 1 0-8.324A4.162 4.162 0 0 1 12 16zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
      target: '_blank',
    },
    {
      href: 'https://www.linkedin.com/company/4biz-international/',
      label: 'LinkedIn',
      path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z',
      target: '_blank',
    },
    {
      href: 'https://x.com/4biz123',
      label: 'X',
      path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
      target: '_blank',
    },
    {
      href: 'https://www.youtube.com/@4bizinternationalae',
      label: 'YouTube',
      path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93-.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
      target: '_blank',
    },
  ];

  return (
    <>
      {/* Modern Animation Keyframes injected globally to guarantee extreme rendering speed with no bundle overhead */}
      <style jsx global>{`
        @keyframes dynamicWheel {
          0% { transform: translateY(0) scaleY(1); opacity: 0.3; }
          20% { transform: translateY(2px) scaleY(1.3); opacity: 1; filter: drop-shadow(0 0 8px #fff); }
          60% { transform: translateY(14px) scaleY(0.8); opacity: 0; }
          100% { transform: translateY(0) scaleY(1); opacity: 0.3; }
        }
        @keyframes microPulse {
          0%, 100% { border-color: rgba(255,255,255,0.3); box-shadow: 0 4px 20px rgba(0,0,0,0.8); }
          50% { border-color: rgba(255,255,255,0.6); box-shadow: 0 4px 30px rgba(255,255,255,0.1), 0 4px 20px rgba(0,0,0,0.9); }
        }
      `}</style>

      <section
        className="relative h-svh min-h-[480px] w-full flex flex-col justify-between text-center overflow-hidden bg-[#020406]"
        aria-label="Introduction Summary"
      >
        {/* ── BACKGROUND ── */}
        <div
          className="absolute inset-0 z-0 select-none pointer-events-none flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16"
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/4biz-hero-2.jpeg"
            alt=""
            width="1536"
            height="1024"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-contain object-center brightness-[0.85] contrast-[1.1]"
            style={{ willChange: 'transform, opacity' }}
          />
        </div>

        {/* ── SOCIAL SIDEBAR ── */}
        <nav
          aria-label="Social media links"
          className={`
            absolute top-1/2 -translate-y-1/2 z-40
            flex flex-col items-center justify-center
            left-2 gap-3
            sm:left-3 sm:gap-4
            lg:left-[14px] lg:gap-[22px]
            transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
            ${isScrolled ? 'opacity-0 pointer-events-none -translate-x-4' : 'opacity-100 pointer-events-auto translate-x-0'}
          `}
        >
          {socials.map(({ href, label, path, target }) => (
            <a
              key={label}
              href={href}
              target={target}
              rel={target === '_blank' ? 'noopener noreferrer' : undefined}
              className={iconClass}
              aria-label={label}
            >
              <svg
                viewBox="0 0 24 24"
                fill="#FFFFFF"
                aria-hidden="true"
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 block shrink-0 transition-transform duration-300"
              >
                <path d={path} />
              </svg>
            </a>
          ))}
        </nav>

        {/* ── CENTRE CONTENT ── */}
        <div className="relative flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-10 sm:px-16 z-30 pt-4 sm:pt-10 min-h-0">
          <div className="w-full flex flex-col items-center gap-1 sm:gap-3 lg:gap-4" />
        </div>

        {/* ── SCROLL SIGNAL (Ultra-modern animated CSS element) ── */}
        <div
          className={`
            relative w-full flex flex-col items-center justify-center pb-[2vh] z-50 pointer-events-none shrink-0
            transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
            ${isScrolled ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
          `}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center justify-center gap-y-2 sm:gap-y-3">
            {/* Mouse outline — enhanced with custom dynamic hardware-accelerated animations */}
            <div
              style={{
                position: 'relative',
                width: '24px',
                height: '42px',
                borderRadius: '14px',
                border: '2px solid rgba(255,255,255,0.4)',
                background: 'rgba(2, 4, 6, 0.6)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: '6px',
                animation: 'microPulse 4s infinite ease-in-out',
                willChange: 'transform, opacity, border-color',
              }}
            >
              {/* Dynamic scrolling dot tracker */}
              <span
                style={{
                  display: 'block',
                  width: '3px',
                  height: '8px',
                  borderRadius: '9999px',
                  background: '#ffffff',
                  boxShadow: '0 0 12px #fff, 0 0 4px #fff',
                  animation: 'dynamicWheel 2.2s infinite cubic-bezier(0.25, 1, 0.5, 1)',
                  willChange: 'transform, opacity',
                }}
              />
            </div>

            <span
              className="text-[0.5rem] sm:text-[0.65rem] font-black tracking-[0.5em] uppercase text-white opacity-75 pl-[0.5em] transition-opacity duration-300"
              style={{ textShadow: '0 2px 8px #000, 0 1px 2px rgba(0,0,0,0.8)' }}
            >
              scroll down
            </span>
          </div>
        </div>
      </section>
    </>
  );
}