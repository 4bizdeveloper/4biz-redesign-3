"use client";

import React from 'react';

const QuickContactButtons = () => {
  const phoneNumber = "971527925100";
  const formattedCallNumber = `+${phoneNumber}`;
  const whatsappMessage = encodeURIComponent("Hello! I am contacting from your website and would like to inquire about your IT services.");

  return (
    <>
      {/* =========================================================================
          1. CALL BUTTON CONTAINER (CLEAN & SATURATED TECH ORANGE)
          Stacked precisely at bottom 80px (directly above WhatsApp)
          ========================================================================= */}
      <div
        className="fixed z-[999999] flex flex-row-reverse items-center pointer-events-none group transform-gpu"
        style={{ bottom: '80px', right: '20px', overflow: 'visible' }}
      >
        <a
          href={`tel:${formattedCallNumber}`}
          className="call-modern-orb pointer-events-auto will-change-transform relative flex items-center justify-center"
          aria-label="Call Us Now"
          style={{ width: 48, height: 48 }}
        >
          {/* Ultra-Modern Hyper-Bright Luminous Laser Pulse Sequences (Orange Aura) */}
          <span className="call-radiation-wave call-wave-1" />
          <span className="call-radiation-wave call-wave-2" />
          <span className="call-radiation-wave call-wave-3" />

          {/* Core Structure: Clean & Saturated Symmetrical Tech Orange Base */}
          <span className="call-cyber-core" />

          {/* Internal Volumetric Energy Glow */}
          <span className="call-cyber-glow" />

          {/* Premium Glass Specular Shard Overlay (Enhanced Brightness/Shiness) */}
          <span style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.15) 45%, transparent 60%)',
            zIndex: 10, pointerEvents: 'none',
          }} />

          {/* Modern Phone Call Icon */}
          <svg 
            viewBox="0 0 24 24"
            style={{ 
              width: 22, 
              height: 22, 
              fill: 'none',
              stroke: '#ffffff',
              strokeWidth: '2.5',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              position: 'relative', 
              zIndex: 20, 
              flexShrink: 0, 
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25))'
            }}
            className="group-hover:scale-110 group-hover:rotate-12">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        </a>

        {/* Premium Cyber Tooltip — Call Button */}
        <div className="hidden lg:flex items-center mr-4 px-4 py-2 bg-[#1c0a01]/95 backdrop-blur-xl border border-[#ff5500]/[0.35] rounded-xl text-white text-[10px] font-bold uppercase tracking-[0.32em] opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 ease-out pointer-events-none whitespace-nowrap"
          style={{ boxShadow: '0 0 24px rgba(255,85,0,0.25)' }}>
          <span className="relative flex h-2 w-2 mr-3 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#ff5500' }}></span>
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#ea580c' }}></span>
          </span>
          Instant Phone Call
        </div>
      </div>

      {/* =========================================================================
          2. WHATSAPP BUTTON CONTAINER (DEEPENED RICH TECH GREEN)
          Positioned precisely at bottom 20px
          ========================================================================= */}
      <div
        className="fixed z-[999999] flex flex-row-reverse items-center pointer-events-none group transform-gpu"
        style={{ bottom: '20px', right: '20px', overflow: 'visible' }}
      >
        <a
          href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-modern-orb pointer-events-auto will-change-transform relative flex items-center justify-center"
          aria-label="Contact on WhatsApp"
          style={{ width: 48, height: 48 }}
        >
          {/* Ultra-Modern Hyper-Bright Luminous Laser Pulse Sequences (Green Aura) */}
          <span className="wa-radiation-wave wave-1" />
          <span className="wa-radiation-wave wave-2" />
          <span className="wa-radiation-wave wave-3" />

          {/* Core Structure: Symmetrical Saturated Deep Tech Green Base */}
          <span className="wa-cyber-core" />

          {/* Internal Volumetric Energy Glow */}
          <span className="wa-cyber-glow" />

          {/* Premium Glass Specular Shard Overlay (Enhanced Brightness/Shiness) */}
          <span style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.15) 45%, transparent 60%)',
            zIndex: 10, pointerEvents: 'none',
          }} />

          {/* Original WhatsApp Icon */}
          <svg viewBox="0 0 32 32"
            style={{ 
              width: 24, 
              height: 24, 
              fill: '#ffffff', 
              position: 'relative', 
              zIndex: 20, 
              flexShrink: 0, 
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25))'
            }}
            className="group-hover:scale-110 group-hover:rotate-6">
            <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825.737 5.48 2.025 7.78l-2.025 7.395 7.58-1.99c2.35 1.4 5.08 2.215 8.02 2.215 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.355c-2.585 0-4.99-.745-7.035-2.035l-.505-.315-4.485 1.175 1.2-4.385-.35-.555c-1.425-2.275-2.18-4.91-2.18-7.64 0-7.72 6.28-14 14-14s14 6.28 14 14-6.28 14-14 14zM22.9 19.33c-.385-.195-2.275-1.12-2.625-1.245s-.605-.195-.855.195-.975 1.245-1.195 1.5-.445.285-.83.09c-.385-.195-1.63-.6-3.105-1.915-1.145-1.025-1.92-2.29-2.145-2.675s-.025-.595.17-.79c.175-.175.385-.45.58-.675.19-.22.255-.385.385-.64s.065-.48-.035-.675-.855-2.065-1.17-2.825c-.305-.745-.615-.645-.855-.655s-.485-.015-.745-.015-.675.1-1.03.495c-.35.395-1.345 1.315-1.345 3.205s1.375 3.715 1.57 3.975c.195.255 2.705 4.13 6.55 5.79.915.39 1.63.625 2.185.8 1.015.32 1.935.275 2.665.165.815-.12 2.275-.93 2.59-1.83.315-.895.315-1.66.22-1.825-.095-.175-.35-.275-.735-.47z"/>
          </svg>
        </a>

        {/* Premium Cyber Tooltip — WhatsApp Button */}
        <div className="hidden lg:flex items-center mr-4 px-4 py-2 bg-[#011c15]/95 backdrop-blur-xl border border-[#10b981]/[0.35] rounded-xl text-white text-[10px] font-bold uppercase tracking-[0.32em] opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 ease-out pointer-events-none whitespace-nowrap"
          style={{ boxShadow: '0 0 24px rgba(16,185,129,0.25)' }}>
          <span className="relative flex h-2 w-2 mr-3 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#10b981' }}></span>
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#10b981' }}></span>
          </span>
          Instant IT Support
        </div>
      </div>

      {/* =========================================================================
          3. SCOPED ENGINE STYLING (Optimized Bright Borders & Deep Green Laws)
          ========================================================================= */}
      <style jsx global>{`
        /* ----------------------------------------------------
           CALL BUTTON (ORANGE) ENGINE
        ---------------------------------------------------- */
        .call-modern-orb {
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .call-modern-orb:hover { 
          transform: scale(1.14) translateY(-2px); 
        }

        /* Enhanced border brightness with increased inset contrast */
        .call-cyber-core {
          position: absolute; inset: 0; border-radius: 50%; z-index: 1;
          background: linear-gradient(135deg, #ff6a14 0%, #ea580c 100%);
          box-shadow:
            0 8px 24px rgba(255, 85, 0, 0.45),
            0 0 12px rgba(255, 85, 0, 0.25),
            inset 0 2.5px 3.5px rgba(255, 255, 255, 0.75),
            inset 0 -2.5px 4px rgba(0, 0, 0, 0.2);
          transition: filter 0.3s ease;
        }
        .call-modern-orb:hover .call-cyber-core {
          filter: brightness(1.1);
          box-shadow:
            0 10px 28px rgba(255, 85, 0, 0.6),
            0 0 16px rgba(255, 85, 0, 0.4),
            inset 0 2.5px 3.5px rgba(255, 255, 255, 0.85),
            inset 0 -2px 4px rgba(0, 0, 0, 0.15);
        }

        .call-cyber-glow {
          position: absolute; inset: 2px; border-radius: 50%; z-index: 5; pointer-events: none;
          background: radial-gradient(circle at 35% 25%, rgba(255,255,255,0.45) 0%, rgba(255,140,65,0.3) 50%, transparent 80%);
          animation: call-cyber-ambient 2.5s ease-in-out infinite alternate;
        }
        @keyframes call-cyber-ambient {
          0%   { opacity: 0.7; transform: scale(0.97); }
          100% { opacity: 1;   transform: scale(1.02); }
        }

        .call-radiation-wave {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          opacity: 0;
          border: 1px solid rgba(255, 110, 30, 0.4);
          background: radial-gradient(circle, rgba(255, 85, 0, 0.08) 0%, transparent 70%);
          will-change: transform, opacity;
        }
          
        .call-wave-1 { animation: call-radiation-pulse 2.8s cubic-bezier(0.215, 0.61, 0.355, 1) infinite; }
        .call-wave-2 { animation: call-radiation-pulse 2.8s cubic-bezier(0.215, 0.61, 0.355, 1) infinite 0.93s; }
        .call-wave-3 { animation: call-radiation-pulse 2.8s cubic-bezier(0.215, 0.61, 0.355, 1) infinite 1.86s; }

        @keyframes call-radiation-pulse {
          0% {
            transform: scale(0.95);
            opacity: 0;
            box-shadow: 0 0 0px 0px rgba(255, 85, 0, 0);
          }
          10% {
            opacity: 1;
            box-shadow: 0 0 16px 2px rgba(255, 85, 0, 0.5), inset 0 0 6px rgba(255, 140, 65, 0.25);
          }
          60% {
            opacity: 0.35;
            box-shadow: 0 0 24px 4px rgba(255, 85, 0, 0.3), inset 0 0 8px rgba(255, 140, 65, 0.15);
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
            box-shadow: 0 0 32px 8px rgba(234, 88, 12, 0);
          }
        }

        /* ----------------------------------------------------
           WHATSAPP BUTTON (GREEN) ENGINE
        ---------------------------------------------------- */
        .wa-modern-orb {
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .wa-modern-orb:hover { 
          transform: scale(1.14) translateY(-2px); 
        }

        /* Fixed: Increased darkness of the green core while making the inner top border shine dramatically */
        .wa-cyber-core {
          position: absolute; inset: 0; border-radius: 50%; z-index: 1;
          background: linear-gradient(135deg, #12a14b 0%, #0b662f 100%);
          box-shadow:
            0 8px 24px rgba(18, 161, 75, 0.45),
            0 0 12px rgba(18, 161, 75, 0.25),
            inset 0 2.5px 3.5px rgba(255, 255, 255, 0.75),
            inset 0 -2.5px 4px rgba(0, 0, 0, 0.25);
          transition: filter 0.3s ease;
        }
        .wa-modern-orb:hover .wa-cyber-core {
          filter: brightness(1.1);
          box-shadow:
            0 10px 28px rgba(18, 161, 75, 0.6),
            0 0 16px rgba(18, 161, 75, 0.4),
            inset 0 2.5px 3.5px rgba(255, 255, 255, 0.85),
            inset 0 -2px 4px rgba(0, 0, 0, 0.2);
        }

        .wa-cyber-glow {
          position: absolute; inset: 2px; border-radius: 50%; z-index: 5; pointer-events: none;
          background: radial-gradient(circle at 35% 25%, rgba(255,255,255,0.4) 0%, rgba(74,222,128,0.25) 50%, transparent 80%);
          animation: cyber-ambient 2.5s ease-in-out infinite alternate;
        }
        @keyframes cyber-ambient {
          0%   { opacity: 0.7; transform: scale(0.97); }
          100% { opacity: 1;   transform: scale(1.02); }
        }

        .wa-radiation-wave {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          opacity: 0;
          border: 1px solid rgba(74, 222, 128, 0.4);
          background: radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%);
          will-change: transform, opacity;
        }
          
        .wave-1 { animation: radiation-pulse 2.8s cubic-bezier(0.215, 0.61, 0.355, 1) infinite; }
        .wave-2 { animation: radiation-pulse 2.8s cubic-bezier(0.215, 0.61, 0.355, 1) infinite 0.93s; }
        .wave-3 { animation: radiation-pulse 2.8s cubic-bezier(0.215, 0.61, 0.355, 1) infinite 1.86s; }

        @keyframes radiation-pulse {
          0% {
            transform: scale(0.95);
            opacity: 0;
            box-shadow: 0 0px 0px 0px rgba(34, 197, 94, 0);
          }
          10% {
            opacity: 1;
            box-shadow: 0 0 16px 2px rgba(18, 161, 75, 0.5), inset 0 0 6px rgba(74, 222, 128, 0.25);
          }
          60% {
            opacity: 0.35;
            box-shadow: 0 0 24px 4px rgba(18, 161, 75, 0.3), inset 0 0 8px rgba(74, 222, 128, 0.15);
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
            box-shadow: 0 0 32px 8px rgba(11, 102, 47, 0);
          }
        }

        /* ----------------------------------------------------
           RESPONSIVE SAFETY FOOTPRINT LAWS
        ---------------------------------------------------- */
        @media (max-width: 768px) {
          .call-modern-orb {
            width: 44px !important;
            height: 44px !important;
          }
          @keyframes call-radiation-pulse {
            0% { transform: scale(0.95); opacity: 0; box-shadow: none; }
            10% { opacity: 1; box-shadow: 0 0 12px 2px rgba(255, 85, 0, 0.5); }
            100% { transform: scale(1.95); opacity: 0; box-shadow: none; }
          }

          .wa-modern-orb {
            width: 44px !important;
            height: 44px !important;
          }
          @keyframes radiation-pulse {
            0% { transform: scale(0.95); opacity: 0; box-shadow: none; }
            10% { opacity: 1; box-shadow: 0 0 12px 2px rgba(18, 161, 75, 0.5); }
            100% { transform: scale(1.95); opacity: 0; box-shadow: none; }
          }
        }
      `}</style>
    </>
  );
};

export default QuickContactButtons;