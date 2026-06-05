"use client";

import React from 'react';

const WhatsAppButton = () => {
  const phoneNumber = "971527925100";
  const message = encodeURIComponent("Hello! I'd like to inquire about your services.");

  return (
    <>
      <div
        className="fixed z-[999999] flex flex-row-reverse items-center pointer-events-none group transform-gpu"
        style={{ bottom: '80px', right: '20px' }}
      >
        <a
          href={`https://wa.me/${phoneNumber}?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-orb pointer-events-auto will-change-transform relative flex items-center justify-center transition-all duration-500"
          aria-label="Contact on WhatsApp"
          style={{ width: 48, height: 48 }}
        >
          {/* Pulsing rings */}
          <span className="wa-ring wa-ring-1" />
          <span className="wa-ring wa-ring-2" />

          {/* Chromatic spinning core — reverse direction vs AI button */}
          <span className="wa-orb-core" />

          {/* Inner radial glow */}
          <span className="wa-inner-glow" />

          {/* Gloss overlay */}
          <span style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.24) 0%, transparent 50%)',
            zIndex: 10, pointerEvents: 'none',
          }} />

          {/* Original WhatsApp SVG icon from JSX */}
          <svg viewBox="0 0 32 32"
            style={{ width: 22, height: 22, fill: 'white', position: 'relative', zIndex: 20, flexShrink: 0, transition: 'transform 0.5s' }}
            className="group-hover:rotate-12">
            <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825.737 5.48 2.025 7.78l-2.025 7.395 7.58-1.99c2.35 1.4 5.08 2.215 8.02 2.215 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.355c-2.585 0-4.99-.745-7.035-2.035l-.505-.315-4.485 1.175 1.2-4.385-.35-.555c-1.425-2.275-2.18-4.91-2.18-7.64 0-7.72 6.28-14 14-14s14 6.28 14 14-6.28 14-14 14zM22.9 19.33c-.385-.195-2.275-1.12-2.625-1.245s-.605-.195-.855.195-.975 1.245-1.195 1.5-.445.285-.83.09c-.385-.195-1.63-.6-3.105-1.915-1.145-1.025-1.92-2.29-2.145-2.675s-.025-.595.17-.79c.175-.175.385-.45.58-.675.19-.22.255-.385.385-.64s.065-.48-.035-.675-.855-2.065-1.17-2.825c-.305-.745-.615-.645-.855-.655s-.485-.015-.745-.015-.675.1-1.03.495c-.35.395-1.345 1.315-1.345 3.205s1.375 3.715 1.57 3.975c.195.255 2.705 4.13 6.55 5.79.915.39 1.63.625 2.185.8 1.015.32 1.935.275 2.665.165.815-.12 2.275-.93 2.59-1.83.315-.895.315-1.66.22-1.825-.095-.175-.35-.275-.735-.47z"/>
          </svg>
        </a>

        {/* Tooltip — exactly as per JSX requirement */}
        <div className="hidden lg:flex items-center mr-4 px-4 py-2 bg-[#03030b]/88 backdrop-blur-xl border border-white/[0.08] rounded-xl text-white text-[10px] font-bold uppercase tracking-[0.32em] opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 ease-out pointer-events-none whitespace-nowrap"
          style={{ boxShadow: '0 0 24px rgba(91,222,252,0.22)' }}>
          <span className="relative flex h-2 w-2 mr-3 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#5bdefc' }}></span>
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'linear-gradient(135deg,#5bdefc,#ef29de)' }}></span>
          </span>
          WhatsApp
        </div>
      </div>

      <style jsx global>{`
        .wa-orb {
          border-radius: 50%;
          contain: layout paint;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .wa-orb:hover { transform: scale(1.16) translateY(-3px); }

        .wa-orb-core {
          position: absolute; inset: 0; border-radius: 50%; z-item: 1;
          background: conic-gradient(from 180deg,
            #5bdefc 0deg,
            #ef29de 120deg,
            #5bdefc 240deg,
            #ef29de 360deg
          );
          animation: wa-spin 5s linear infinite reverse, wa-brightness 3.5s ease-in-out infinite alternate;
          box-shadow:
            0 0 16px rgba(91,222,252,0.65),
            0 0 32px rgba(239,41,222,0.28),
            inset 0 0 12px rgba(0,0,0,0.65);
        }
        @keyframes wa-spin { to { transform: rotate(360deg); } }
        @keyframes wa-brightness {
          0%   { filter: brightness(0.9) saturate(1.1); }
          100% { filter: brightness(1.2) saturate(1.4); }
        }

        .wa-inner-glow {
          position: absolute; inset: 5px; border-radius: 50%; z-index: 5; pointer-events: none;
          background: radial-gradient(circle at 62% 33%,
            rgba(91,222,252,0.55) 0%,
            rgba(239,41,222,0.28) 50%,
            transparent 100%
          );
          animation: wa-glow 3s ease-in-out infinite alternate;
        }
        @keyframes wa-glow {
          0%   { opacity: 0.5;  transform: scale(0.88); }
          100% { opacity: 1;    transform: scale(1.1); }
        }

        .wa-ring {
          position: absolute; border-radius: 50%;
          border: 1px solid transparent; pointer-events: none;
        }
        .wa-ring-1 { inset: -3px; border-color: rgba(91,222,252,0.55);  animation: wa-pulse-ring 2.8s ease-out infinite; }
        .wa-ring-2 { inset: -3px; border-color: rgba(239,41,222,0.40); animation: wa-pulse-ring 2.8s ease-out infinite 1.4s; }
        @keyframes wa-pulse-ring {
          0%   { transform: scale(1);   opacity: 0.85; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default WhatsAppButton;