"use client";

import React, { memo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Initial provided high-quality client assets
const KNOWN_CLIENTS = [
  { id: 'theyyampattil', src: '/client-logos/theyyampattil-ogo.avif', alt: 'Theyyampattil Logo' },
  { id: 'opusbm', src: '/client-logos/opusbm-logo.png', alt: 'OpusBM Logo' },
  { id: 'opus-acoustic', src: '/client-logos/opus-acoustic-logo.png', alt: 'Opus Acoustic Logo' },
  { id: 'aimbridge', src: '/client-logos/aimbridge-logo.png', alt: 'Aimbridge Logo' },
];

// High-quality vibrant showcase placeholder logos from reputable CDNs
const PLACEHOLDER_CLIENTS = [
  { id: 'p1', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', alt: 'Amazon Logo' },
  { id: 'p2', src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', alt: 'Google Logo' },
  { id: 'p3', src: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg', alt: 'Netflix Logo' },
  { id: 'p4', src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg', alt: 'Microsoft Logo' },
];

// Duplicated arrays to enable an uninterrupted infinite marquee effect
const ALL_LOGOS = [...KNOWN_CLIENTS, ...PLACEHOLDER_CLIENTS];

const ClientSection = () => {
  return (
    <section 
      className="py-20 md:py-28 relative overflow-hidden transform-gpu"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #0d1742 0%, #070b24 70%, #040616 100%)',
        contentVisibility: 'auto',
        contain: 'paint layout',
        containmentIntrinsicSize: '1px 450px',
      } as React.CSSProperties}
    >
      {/* Premium Multi-Layered Cyber Gradient Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060a21]/50 via-[#0a1033]/30 to-[#05081c]/50 pointer-events-none" />
      
      {/* High-Tech Glowing Aurora Orbs - Optimized Opacity and Placements for Ultra-Modern Rich Deep Blue Texture */}
      <div className="absolute top-0 left-1/4 w-[300px] sm:w-[600px] h-[300px] bg-cyan-500/15 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none transform-gpu -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[300px] sm:w-[600px] h-[300px] bg-purple-500/12 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none transform-gpu translate-y-1/2" />

      {/* Cybernetic Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:45px_45px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] pointer-events-none opacity-80" />

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-12 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/[0.05] backdrop-blur-md mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-cyan-300">
              Strategic Enterprise Integrations
            </span>
          </motion.div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-tight"
          >
            Empowering Modern Infrastructure <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.3)]">
              For Industry Leaders
            </span>
          </motion.h3>
        </div>

        {/* Outer Slider Container with Ultra-Wide Vivid Windows (Minimal Edge Clipping) */}
        <div className="relative w-full overflow-hidden mask-marquee py-6">
          <div className="flex w-max items-center marquee-track gap-12 sm:gap-16 md:gap-28">
            
            {/* First Track Sequence */}
            {ALL_LOGOS.map((logo) => (
              <LogoItem key={`track1-${logo.id}`} logo={logo} />
            ))}

            {/* Mirror Twin Sequence to keep the loop flawlessly continuous */}
            {ALL_LOGOS.map((logo) => (
              <LogoItem key={`track2-${logo.id}`} logo={logo} />
            ))}
            
          </div>
        </div>

      </div>

      <style jsx global>{`
        /* Seamless CSS Infinite Hardware-Accelerated Marquee Loop - Optimized layout boundaries preventing layouts shift or jumping */
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        
        .marquee-track {
          animation: marquee 35s linear infinite;
          will-change: transform;
          display: flex;
          align-items: center;
        }

        /* Smooth slow down instead of full harsh pause on hover for high-end feel */
        .marquee-track:hover {
          animation-play-state: paused;
        }

        /* Ultra-modern framing mask: Maximizes full-color exposure, transitions only at absolute edges */
        .mask-marquee {
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }
      `}</style>
    </section>
  );
};

/* Individual Logo Component Layered with High-Fidelity Vibrancy Mechanics */
const LogoItem = memo(({ logo }: { logo: { src: string; alt: string } }) => {
  return (
    <div className="relative group flex items-center justify-center w-[120px] h-[50px] sm:w-[140px] sm:h-[55px] md:w-[185px] md:h-[75px] shrink-0 transform-gpu transition-all duration-300">
      <div className="relative w-full h-full max-w-full max-h-full">
        <Image
          src={logo.src}
          alt={logo.alt}
          fill
          sizes="(max-width: 640px) 120px, (max-width: 768px) 140px, 185px"
          className="object-contain opacity-85 brightness-[1.1] contrast-[1.05] drop-shadow-[0_2px_10px_rgba(255,255,255,0.02)] group-hover:opacity-100 group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.35)] transition-all duration-300 ease-out transform-gpu"
          loading="lazy" 
        />
      </div>
    </div>
  );
});
LogoItem.displayName = 'LogoItem';

export default ClientSection;