"use client";

import React, { useState } from 'react';
import AIChatWindow from './AIChatWindow';

const AIChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AIChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/*
        STACK ORDER (bottom-left corner, vertical):
        • WhatsApp   → bottom: 80px  (above AI)
        • AI Chat    → bottom: 20px  (lowest, at very bottom)
        Chat window opens upward from AI button top edge:
        AI top = 20 + 48 = 68px, + 12px gap = bottom: 80px for window
      */}
      <div
        className="fixed z-[999998] hover:z-[1000000] flex flex-row items-center pointer-events-none group transform-gpu"
        style={{ bottom: '20px', left: '20px' }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ai-orb pointer-events-auto will-change-transform relative flex items-center justify-center"
          aria-label="Toggle AI Chat"
          style={{ width: 48, height: 48 }}
        >
          {/* Pulsing rings */}
          <span className="ai-ring ai-ring-1" />
          <span className="ai-ring ai-ring-2" />

          {/* Bright shiny violet gradient core (Static) */}
          <span className="ai-orb-core" />

          {/* Inner radial glow */}
          <span className="ai-inner-glow" />

          {/* Gloss */}
          <span style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 52%)',
            zIndex: 10, pointerEvents: 'none',
          }} />

          {/* Original AI SVG icon - Exact copy from JSX */}
          <svg viewBox="0 0 100 100"
            style={{ width: 32, height: 32, position: 'relative', zIndex: 20, transition: 'transform 0.5s', flexShrink: 0 }}
            className="group-hover:scale-110">
            <circle cx="28" cy="32" r="4.5" fill="white"/>
            <line x1="28" x2="42" y1="32" y2="48" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <path d="M50 42c-15 0-27 12-27 27s12 27 27 27 27-12 27-27-12-27-27-27z" fill="white"/>
            <path d="M32 65c0-4 3-8 8-8h20c5 0 8 4 8 8v5c0 4-3 8-8 8H40c-5 0-8-4-8-8v-5z" fill="#03030b"/>
            <path d="M40 68c2-2 5-2 7 0M53 68c2-2 5-2 7 0" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M44 85c0 3 3 6 6 6s6-3 6-6" stroke="#ef29de" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M64 28h18c3 0 5 2 5 5v12c0 3-2 5-5 5h-4l-1 6-5-6h-8c-3 0-5-2-5-5V33c0-3 2-5 5-5z" fill="white"/>
          </svg>
        </button>

        {/* Tooltip — desktop only, slides out to the right */}
        <div className="hidden lg:flex items-center ml-4 px-4 py-2 bg-[#03030b]/88 backdrop-blur-xl border border-white/[0.08] rounded-xl text-white text-[10px] font-bold uppercase tracking-[0.32em] opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 ease-out pointer-events-none whitespace-nowrap"
          style={{ boxShadow: '0 0 24px rgba(218,47,252,0.35)' }}>
          <span className="relative flex h-2 w-2 mr-3 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#da2ffc' }}></span>
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'linear-gradient(135deg,#da2ffc,#8900f2)' }}></span>
          </span>
          AI Assistant
        </div>
      </div>

      <style jsx global>{`
        .ai-orb {
          border-radius: 50%;
          contain: layout paint;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .ai-orb:hover { transform: scale(1.16) translateY(-3px); }

        .ai-orb-core {
          position: absolute; inset: 0; border-radius: 50%; z-index: 1;
          /* Shiny, deep-to-bright multi-stop intense violet gradient without animation */
          background: linear-gradient(135deg, 
            #e0aaff 0%, 
            #c77dff 25%, 
            #9d4edd 50%, 
            #7b2cbf 75%, 
            #5a189a 100%
          );
          box-shadow:
            0 0 18px rgba(157, 78, 221, 0.85),
            0 0 36px rgba(199, 125, 255, 0.4),
            inset 0 2px 4px rgba(255, 255, 255, 0.4),
            inset 0 -4px 12px rgba(0, 0, 0, 0.5);
        }

        .ai-inner-glow {
          position: absolute; inset: 4px; border-radius: 50%; z-index: 5; pointer-events: none;
          background: radial-gradient(circle at 35% 30%,
            rgba(255, 255, 255, 0.45) 0%,
            rgba(199, 125, 255, 0.25) 50%,
            transparent 100%
          );
        }

        .ai-ring {
          position: absolute; border-radius: 50%;
          border: 1px solid transparent; pointer-events: none;
        }
        .ai-ring-1 { inset: -3px; border-color: rgba(199, 125, 255, 0.6); animation: ai-pulse-ring 2.8s ease-out infinite; }
        .ai-ring-2 { inset: -3px; border-color: rgba(157, 78, 221, 0.45); animation: ai-pulse-ring 2.8s ease-out infinite 1.4s; }
        @keyframes ai-pulse-ring {
          0%   { transform: scale(1);   opacity: 0.85; }
          100% { transform: scale(2.3); opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default AIChatButton;