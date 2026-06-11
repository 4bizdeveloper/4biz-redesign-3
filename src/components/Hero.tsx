'use client';

import React, { useState, useEffect } from 'react';
import { FaFacebookF } from 'react-icons/fa6';

export default function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Custom interactive classes with 100% full opacity for a bright, shiny white appearance
  const iconClass = 'text-white flex items-center justify-center transition-all duration-300 hover:scale-115 opacity-100 filter drop-shadow-[0_0_1px_rgba(255,255,255,0.6)]';
  
  // Standardized sizing classes applied uniformly to both React Component icons and Raw SVGs
  const uniformIconSize = 'w-[20px] h-[20px] sm:w-[18px] sm:h-[18px] lg:w-[22px] lg:h-[22px] block shrink-0 transition-transform duration-300';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Passive listener ensures GTmetrix/Lighthouse maximum scrolling performance (No JBH/FID blocking)
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reordered array to match the exact sequence from the screenshot (Instagram -> Facebook -> X -> LinkedIn)
  const socials = [
    {
      href: 'https://www.instagram.com/4biz_ae',
      label: 'Instagram',
      isComponent: false,
      path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4.162 4.162 0 1 1 0-8.324A4.162 4.162 0 0 1 12 16zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
      target: '_blank',
    },
    {
      href: 'https://www.facebook.com/4bizglobal',
      label: 'Facebook',
      isComponent: true,
      component: <FaFacebookF className={uniformIconSize} />,
      target: '_blank',
    },
    {
      href: 'https://x.com/4biz123',
      label: 'X',
      isComponent: false,
      path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
      target: '_blank',
    },
    {
      href: 'https://www.linkedin.com/company/4biz-international/',
      label: 'LinkedIn',
      isComponent: false,
      path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z',
      target: '_blank',
    },
  ];

  return (
    <>
      {/* Complete hardware-accelerated animations optimizing Paint/Layout cycles for GTmetrix performance */}
      <style jsx global>{`
        @keyframes dynamicWheel {
          0% { transform: translateY(0) scaleY(1); opacity: 0.3; }
          20% { transform: translateY(3px) scaleY(1.4); opacity: 1; filter: drop-shadow(0 0 8px rgba(255,255,255,0.8)); }
          60% { transform: translateY(18px) scaleY(0.7); opacity: 0; }
          100% { transform: translateY(0) scaleY(1); opacity: 0.3; }
        }
        @keyframes microPulse {
          0%, 100% { 
            border-color: rgba(255,255,255,0.35); 
            box-shadow: 0 4px 20px rgba(0,0,0,0.8), inset 0 0 0px rgba(255,255,255,0);
            transform: scale(1);
          }
          50% { 
            border-color: rgba(255,255,255,0.7); 
            box-shadow: 0 0 25px rgba(255,255,255,0.15), 0 4px 25px rgba(0,0,0,0.9), inset 0 0 4px rgba(255,255,255,0.2);
            transform: scale(1.02);
          }
        }
        @keyframes subtleTextPulse {
          0%, 100% { opacity: 0.65; transform: scale(1); }
          50% { opacity: 0.95; transform: scale(1.02); }
        }
      `}</style>

      <section
        className="relative h-svh min-h-[480px] w-full flex flex-col justify-between text-center overflow-hidden bg-[#020406]"
        aria-label="Introduction Summary"
      >
        {/* ── BACKGROUND CONTAINER ── */}
        <div
          /* Removed inner responsive padding (p-6, p-10, etc.) to allow the background content to spread seamlessly to the very side edges of the display screen */
          className="absolute inset-0 z-0 select-none pointer-events-none flex items-center justify-center bg-[#020406]"
          aria-hidden="true"
        >
          {/* Visual Layer wrapper creating an enhanced feather-fade edge blend so image borders vanish */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <picture className="w-full h-full flex items-center justify-center">
              {/* Desktop Breakpoint: >= 1024px (lg variants) */}
              <source 
                media="(min-width: 1024px)" 
                srcSet="/hero-desktop-1.png" 
                width="1920"
                height="900"
              />
              {/* Tablet Breakpoint: >= 640px and < 1024px (sm variants) */}
              <source 
                media="(min-width: 640px)" 
                srcSet="/hero-tablet-1.png" 
                width="1024"
                height="768"
              />
              {/* Fallback/Mobile Default: < 640px */}
              <img
                src="/hero-mobile-1.png"
                alt=""
                width="390"
                height="844"
                fetchPriority="high"
                decoding="async"
                /* Modified: Changed object-contain to object-cover with object-bottom positioning.
                   Combined with a slight upward translate shift, this guarantees blank borders are filled seamlessly on all aspect ratios while preserving every detail of your main graphics. */
                className="w-full h-full object-cover object-bottom scale-100 -translate-y-[1.5%] brightness-110 contrast-120 saturate-130"
                style={{ 
                  willChange: 'transform, opacity',
                  aspectRatio: 'inherit'
                }}
              />
            </picture>

            {/* Vignette overlays remain soft and non-obstructive to ensure no clipping over the laptop deck background area */}
            <div className="absolute inset-0 pointer-events-none mix-blend-normal shadow-[inset_0_10px_40px_10px_#020406,inset_0_-10px_30px_5px_#020406] sm:shadow-[inset_0_20px_60px_20px_#020406,inset_0_-15px_40px_10px_#020406] lg:shadow-[inset_0_30px_80px_30px_#020406,inset_0_-20px_50px_15px_#020406]" />
            <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-20 bg-gradient-to-t from-transparent via-[#00aaff]/10 to-transparent" />
            <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-40 shadow-[inset_0_0_30px_15px_#020406]" />
          </div>
        </div>

        {/* ── SOCIAL SIDEBAR ── */}
        <nav
          aria-label="Social media links"
          className={`
            absolute top-1/2 -translate-y-1/2 z-40
            flex flex-col items-center justify-center
            left-6 gap-[18px]
            sm:left-8 sm:gap-5
            lg:left-10 lg:gap-[22px]
            transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
            ${isScrolled ? 'opacity-0 pointer-events-none -translate-x-4' : 'opacity-100 pointer-events-auto translate-x-0'}
          `}
          style={{ willChange: 'transform, opacity' }}
        >
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.target}
              rel={social.target === '_blank' ? 'noopener noreferrer' : undefined}
              className={iconClass}
              aria-label={social.label}
            >
              {social.isComponent ? (
                social.component
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="#FFFFFF"
                  aria-hidden="true"
                  className={uniformIconSize}
                >
                  <path d={social.path} />
                </svg>
              )}
            </a>
          ))}
        </nav>

        {/* ── CENTRE CONTENT ── */}
        <div className="relative flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-10 sm:px-16 z-30 pt-4 sm:pt-10 min-h-0">
          <div className="w-full flex flex-col items-center gap-1 sm:gap-3 lg:gap-4" />
        </div>

        {/* ── SCROLL SIGNAL ── */}
        <div
          className={`
            relative w-full flex flex-col items-center justify-center pb-[3vh] z-50 pointer-events-none shrink-0
            transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
            ${isScrolled ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
          `}
          style={{ willChange: 'transform, opacity' }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center justify-center gap-y-3">
            {/* Mouse Body Element */}
            <div
              style={{
                position: 'relative',
                width: '26px',
                height: '44px',
                borderRadius: '15px',
                border: '2px solid rgba(255,255,255,0.4)',
                background: 'rgba(2, 4, 6, 0.65)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: '7px',
                animation: 'microPulse 3.5s infinite ease-in-out',
                willChange: 'transform, border-color, box-shadow',
              }}
            >
              {/* Scrolling Track Dot */}
              <span
                style={{
                  display: 'block',
                  width: '3px',
                  height: '9px',
                  borderRadius: '9999px',
                  background: '#ffffff',
                  boxShadow: '0 0 10px #fff, 0 0 3px #fff',
                  animation: 'dynamicWheel 2s infinite cubic-bezier(0.25, 1, 0.5, 1)',
                  willChange: 'transform, opacity',
                }}
              />
            </div>

            {/* Scrolling Subtext Typography */}
            <span
              className="text-[0.55rem] sm:text-[0.65rem] font-black tracking-[0.55em] uppercase text-white pl-[0.55em]"
              style={{ 
                textShadow: '0 2px 8px #000, 0 1px 3px rgba(0,0,0,0.9)',
                animation: 'subtleTextPulse 3.5s infinite ease-in-out',
                willChange: 'transform, opacity'
              }}
            >
              scroll down
            </span>
          </div>
        </div>
      </section>
    </>
  );
}