"use client";

import React from 'react';

const CallButton = () => {
  const phoneNumber = "+971527925100";

  return (
    <>
      {/* CONTAINER: Positioned precisely at bottom 80px (stacked directly above WhatsApp's bottom 20px + 48px height + 12px margin).
          Using visible overflow so the outward radiation pulses are never clipped.
      */}
      <div
        className="fixed z-[999999] flex flex-row-reverse items-center pointer-events-none group transform-gpu"
        style={{ bottom: '80px', right: '20px', overflow: 'visible' }}
      >
        <a
          href={`tel:${phoneNumber}`}
          className="call-modern-orb pointer-events-auto will-change-transform relative flex items-center justify-center"
          aria-label="Call Us Now"
          style={{ width: 48, height: 48 }}
        >
          {/* Ultra-Modern Hyper-Bright Luminous Laser Pulse Sequences (Orange Aura) */}
          <span className="call-radiation-wave call-wave-1" />
          <span className="call-radiation-wave call-wave-2" />
          <span className="call-radiation-wave call-wave-3" />

          {/* Core Structure: Vibrant High-Visibility Tech Orange Base */}
          <span className="call-cyber-core" />

          {/* Internal Volumetric Energy Glow */}
          <span className="call-cyber-glow" />

          {/* Premium Glass Specular Shard Overlay */}
          <span style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 45%, transparent 60%)',
            zIndex: 10, pointerEvents: 'none',
          }} />

          {/* Modern Phone Call Icon (Optimized scaling and drop shadow) */}
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
              filter: 'drop-shadow(0px 2px 4px rgba(50, 20, 0, 0.35))'
            }}
            className="group-hover:scale-110 group-hover:rotate-12">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        </a>

        {/* Premium Cyber Tooltip — Aligned with the high-visibility aesthetic */}
        <div className="hidden lg:flex items-center mr-4 px-4 py-2 bg-[#2e1202]/95 backdrop-blur-xl border border-[#f97316]/[0.3] rounded-xl text-white text-[10px] font-bold uppercase tracking-[0.32em] opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 ease-out pointer-events-none whitespace-nowrap"
          style={{ boxShadow: '0 0 24px rgba(249,115,22,0.3)' }}>
          <span className="relative flex h-2 w-2 mr-3 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#f97316' }}></span>
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#ea580c' }}></span>
          </span>
          Instant Phone Call
        </div>
      </div>

      {/* STYLING: Scoped styling engineered to run in perfect phase alignment with WhatsApp */}
      <style jsx global>{`
        .call-modern-orb {
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .call-modern-orb:hover { 
          transform: scale(1.14) translateY(-2px); 
        }

        /* Ultra-bright High-Visibility Modern Tech Orange Core */
        .call-cyber-core {
          position: absolute; inset: 0; border-radius: 50%; z-index: 1;
          background: linear-gradient(135deg, #f97316 0%, #c2410c 100%);
          box-shadow:
            0 8px 24px rgba(249,115,22,0.5),
            0 0 12px rgba(249,115,22,0.3),
            inset 0 2.5px 4px rgba(255,255,255,0.45),
            inset 0 -4px 8px rgba(0,0,0,0.25);
          transition: filter 0.3s ease;
        }
        .call-modern-orb:hover .call-cyber-core {
          filter: brightness(1.15);
          box-shadow:
            0 10px 28px rgba(249,115,22,0.65),
            0 0 16px rgba(249,115,22,0.45),
            inset 0 2.5px 4px rgba(255,255,255,0.5),
            inset 0 -4px 8px rgba(0,0,0,0.2);
        }

        /* Ambient Internal Volumetric Luminous Glow */
        .call-cyber-glow {
          position: absolute; inset: 2px; border-radius: 50%; z-index: 5; pointer-events: none;
          background: radial-gradient(circle at 35% 25%, rgba(255,255,255,0.45) 0%, rgba(253, 186, 116, 0.4) 40%, transparent 75%);
          animation: call-cyber-ambient 2.5s ease-in-out infinite alternate;
        }
        @keyframes call-cyber-ambient {
          0%   { opacity: 0.7; transform: scale(0.96); }
          100% { opacity: 1;   transform: scale(1.03); }
        }

        /* HIGH-ELEGANCE RADIATION SHADOW WAVES */
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
          border: 1px solid rgba(253, 186, 116, 0.4);
          background: radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, transparent 70%);
          will-change: transform, opacity;
        }
          
        /* Completely Identical Performance Wave Timings */
        .call-wave-1 { animation: call-radiation-pulse 2.8s cubic-bezier(0.215, 0.61, 0.355, 1) infinite; }
        .call-wave-2 { animation: call-radiation-pulse 2.8s cubic-bezier(0.215, 0.61, 0.355, 1) infinite 0.93s; }
        .call-wave-3 { animation: call-radiation-pulse 2.8s cubic-bezier(0.215, 0.61, 0.355, 1) infinite 1.86s; }

        @keyframes call-radiation-pulse {
          0% {
            transform: scale(0.95);
            opacity: 0;
            box-shadow: 0 0 0px 0px rgba(249, 115, 22, 0), inset 0 0 0px rgba(249, 115, 22, 0);
          }
          10% {
            opacity: 1;
            box-shadow: 0 0 16px 2px rgba(249, 115, 22, 0.65), inset 0 0 8px rgba(253, 186, 116, 0.3);
          }
          60% {
            opacity: 0.4;
            box-shadow: 0 0 28px 6px rgba(249, 115, 22, 0.35), inset 0 0 12px rgba(253, 186, 116, 0.15);
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
            box-shadow: 0 0 40px 12px rgba(194, 65, 12, 0), inset 0 0 20px rgba(194, 65, 12, 0);
          }
        }

        /* Responsive Safety Footprint Rules - Exact Match */
        @media (max-width: 768px) {
          .call-modern-orb {
            width: 44px !important;
            height: 44px !important;
          }
          @keyframes call-radiation-pulse {
            0% { transform: scale(0.95); opacity: 0; box-shadow: none; }
            10% { opacity: 1; box-shadow: 0 0 12px 2px rgba(249, 115, 22, 0.6); }
            100% { transform: scale(1.95); opacity: 0; box-shadow: none; }
          }
        }
      `}</style>
    </>
  );
};

export default CallButton;