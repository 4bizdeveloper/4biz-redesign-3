"use client";

import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface Location {
  city: string;
  title: string;
  subtitle: string;
  address: string;
  src: string;
  link: string;
}

/**
 * MEMOIZED PREMIUM TOUCH DEVICE LOCATION CARD
 * Renders an expansive, hyper-realistic smartphone/tablet hybrid hardware frame.
 * Features side buttons, realistic corner styling, deep screen glass reflections,
 * and high-performance hardware acceleration.
 */
const LocationCard = memo(({ loc, index }: { loc: Location; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 35 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.65, delay: index * 0.15, ease: [0.215, 0.610, 0.355, 1.000] }}
    className="group relative flex flex-col items-center h-full w-full transform-gpu"
    style={{ willChange: 'transform' }}
  >
    {/* OUTER HARDWARE FRAME WRAPPER - Creates realistic device depth and physical dimensions */}
    {/* Optimized top padding (pt-[16px]) to symmetrically house the centered hardware camera array */}
    <div className="relative w-full max-w-[340px] sm:max-w-[360px] md:max-w-[380px] aspect-[3/4] pt-[16px] pb-[12px] px-[12px] rounded-[3rem] bg-gradient-to-b from-[#334155] via-[#1e293b] to-[#0f172a] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.2)] transition-all duration-700 ring-1 ring-white/10 group-hover:from-cyan-400 group-hover:via-indigo-500 group-hover:to-purple-600 group-hover:shadow-[0_0_50px_rgba(34,211,238,0.3)]">
      
      {/* PHYSICAL HARDWARE SIDE BUTTON ACCENTS (Volume & Power switches) */}
      <div className="absolute left-[-3px] top-24 w-[3px] h-10 bg-[#1e293b] rounded-l border-l border-white/10 group-hover:bg-cyan-400 transition-colors duration-700" />
      <div className="absolute left-[-3px] top-38 w-[3px] h-14 bg-[#1e293b] rounded-l border-l border-white/10 group-hover:bg-cyan-400 transition-colors duration-700" />
      <div className="absolute right-[-3px] top-32 w-[3px] h-16 bg-[#1e293b] rounded-r border-r border-white/10 group-hover:bg-indigo-400 transition-colors duration-700" />

      {/* DISCRETE FRONT CAMERA / PROXIMITY SENSOR EYE - Centered symmetrically within top frame thickness */}
      <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#090d16] rounded-full z-40 flex items-center justify-center border border-white/5 shadow-inner">
        <div className="w-0.5 h-0.5 bg-blue-500/40 rounded-full animate-pulse" />
      </div>

      {/* INNER SCREEN EDGE INNER SHADOW & BEZEL BUFFER */}
      <div className="relative w-full h-full overflow-hidden rounded-[2.3rem] bg-[#0d1527] ring-1 ring-black/40 shadow-[inset_0_4px_12px_rgba(0,0,0,0.9)]">
        
        {/* FLOATING GLASSMORPHIC HUD OVERLAY */}
        <a 
          href={loc.link}
          target="_blank"
          rel="noreferrer"
          className="absolute top-4 left-4 right-4 z-20 bg-[#0d1527]/85 backdrop-blur-xl border border-white/10 p-4 rounded-2xl transition-all duration-300 hover:bg-[#0d1527]/95 group/info pointer-events-auto shadow-2xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]" />
                <span className="text-cyan-400 font-mono text-[9px] uppercase tracking-[0.25em]">Node Active</span>
              </div>
              <h4 className="text-white font-black text-base uppercase tracking-tight group-hover/info:text-cyan-400 transition-colors">
                {loc.city}
              </h4>
              <p className="text-cyan-400/80 text-[10px] font-mono font-bold uppercase tracking-wider">
                {loc.title}
              </p>
            </div>
            <div className="p-2 bg-white/5 border border-white/10 rounded-lg group-hover/info:bg-cyan-500 group-hover/info:border-cyan-400 transition-all duration-500 shadow-md shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </div>
          </div>
        </a>

        {/* NATIVE GOOGLE MAP EMBED IFRAME - RUNNING ON ISOLATED SECURITY WRAPPER */}
        <iframe 
          src={loc.src} 
          width="100%" 
          height="100%" 
          style={{ 
            border: 0,
            background: '#e5e7eb' 
          }} 
          allowFullScreen={true}
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title={`${loc.city} - ${loc.title}`}
          className="w-full h-full opacity-100 transition-opacity duration-500 transform-gpu rounded-[2.3rem]"
        />

        {/* TOP STATUS BAR POLISH / GRADIENT SHIELD */}
        <div className="absolute inset-x-0 top-0 h-20 pointer-events-none bg-gradient-to-b from-black/40 via-black/10 to-transparent z-10" />

        {/* HARDWARE EMBOSSED SCREEN REFLECTION LAYER */}
        <div className="shine-layer absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700 z-30" />
      </div>
    </div>

    {/* SEO OPTIMIZED INFRASTRUCTURE DETAILS */}
    <div className="mt-6 px-2 text-center sm:text-left w-full max-w-[340px] sm:max-w-[360px] md:max-w-[380px]">
      <p className="text-white font-bold text-base tracking-wide mb-1 group-hover:text-cyan-400 transition-colors duration-300">
        {loc.subtitle}
      </p>
      <p className="text-white/60 font-mono text-[12px] uppercase tracking-wider space-x-1 leading-relaxed">
        <span className="text-cyan-400 font-bold">{"//"}</span> <span>{loc.address}</span>
      </p>
    </div>
  </motion.div>
));

LocationCard.displayName = 'LocationCard';

const MapSection = () => {
  const locations: Location[] = [
    {
      city: "Dubai, UAE",
      title: "Global Headquarters",
      subtitle: "International Enterprise Solutions Hub",
      address: "Crystal Building, Al Karama, Dubai",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.846921067268!2d55.2973838!3d25.2420804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d3f84a0cd39%3A0x6834edd5ea42e51d!2s4BIZ%20International%20LLC!5e0!3m2!1sen!2sae!4v1780903880922!5m2!1sen!2sae",
      link: "https://maps.app.goo.gl/32WmFGVmDaoCesDK9"
    },
    {
      city: "Kozhikode, IN",
      title: "Regional Tech Node",
      subtitle: "Offshore Software Development Center",
      address: "HiLite Business Park, Calicut, Kerala",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.1893273073897!2d75.8334759!3d11.247478800000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65b26cb564cd7%3A0x6e4ea8183d688e13!2s4biz%20International!5e0!3m2!1sen!2sae!4v1780903901319!5m2!1sen!2sae",
      link: "https://maps.app.goo.gl/ehYp13MsiQJxXmebA"
    },
    {
      city: "Nadakkavu, IN",
      title: "Operational Hub",
      subtitle: "Next-Gen IT Infrastructure & Operations",
      address: "4Biz International Tower, Calicut",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.778183213242!2d75.7727812!3d11.277709500000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65f2df7358683%3A0xdd71f8c39ea9198!2s4biz%20International%20-%20Nadakkavu!5e0!3m2!1sen!2sae!4v1780903922115!5m2!1sen!2sae",
      link: "https://maps.app.goo.gl/M1xzYiJ6AARUdH9i8"
    }
  ];

  return (
    <section 
      id="map" 
      className="py-24 md:py-36 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-[#091225]"
      style={{ 
        contentVisibility: 'auto', 
        containmentIntrinsicSize: '0 1100px',
        contain: 'paint' 
      } as React.CSSProperties}
    >
      {/* VIBRANT MODERN TECH-BLUE BACKGROUND SYSTEM */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a142c] via-[#070d1a] to-[#0c1a36] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(34,211,238,0.22)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(99,102,241,0.15)_0%,transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.12)_0%,transparent_50%)] pointer-events-none" />

      {/* MATRIX TECH GRID MESH */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SEO TARGETED ACCESSIBLE HEADER */}
        <header className="mb-24 flex flex-col items-center text-center w-full px-4">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-cyan-400 font-mono text-xs md:text-sm uppercase tracking-[0.3em] font-bold mb-3"
          >
            Enterprise Infrastructure
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9] pb-5"
          >
            Global IT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 inline-block">Nodes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/70 max-w-2xl text-xs sm:text-sm md:text-base font-medium tracking-wide leading-relaxed mb-6"
          >
            Connecting cross-border innovation hubs to engineer highly scalable, secure enterprise architectures and full-cycle digital software transformations.
          </motion.p>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "160px" }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full shadow-[0_0_25px_rgba(34,211,238,0.6)]"
          />
        </header>

        {/* RESPONSIVE IPAD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-14 justify-items-center">
          {locations.map((loc, index) => (
            <LocationCard key={index} loc={loc} index={index} />
          ))}
        </div>
      </div>

      <style jsx>{`
        /* High-Performance Hardware Acceleration Layer */
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1200px;
        }

        /* Prevent Layout Shifts and Elevate Hover Items */
        .group:hover {
          z-index: 20;
        }

        /* Smooth Cinematic Reflective Light Move */
        @keyframes shine-move {
          0% { background-position: -150% -150%; }
          100% { background-position: 250% 250%; }
        }

        .shine-layer {
          background: linear-gradient(
            135deg,
            transparent 40%,
            rgba(255, 255, 255, 0.06) 50%,
            rgba(34, 211, 238, 0.04) 55%,
            transparent 65%
          );
          background-size: 250% 250%;
          animation: shine-move 4.5s infinite linear;
        }
      `}</style>
    </section>
  );
};

export default MapSection;