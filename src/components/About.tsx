'use strict';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

// --- Performance Optimized Count-Up Animation Component ---
interface CounterProps {
  value: number;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ value, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 2.2,
        ease: [0.16, 1, 0.3, 1], // Custom ultra-smooth cubic bezier
      });
      return controls.stop;
    }
  }, [inView, count, value]);

  useEffect(() => {
    return rounded.onChange((latest) => {
      if (ref.current) {
        ref.current.textContent = latest + suffix;
      }
    });
  }, [rounded, suffix]);

  return (
    <span 
      ref={ref} 
      className="text-2xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#2bd4df] via-[#1ca6db] to-[#4f46e5] tracking-tight block drop-shadow-[0_2px_15px_rgba(43,212,223,0.3)]"
    >
      0{suffix}
    </span>
  );
};

// --- Main About Component ---
export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Track cursor position relative to container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const stats = [
    { value: 1000, suffix: '+', label: 'Projects' },
    { value: 16, suffix: '+', label: 'Years of experience' },
    { value: 10, suffix: '+', label: 'Top rated company' },
    { value: 8, suffix: '+', label: 'Countries serving' },
  ];

  return (
    <section id="about" className="relative w-full text-white py-12 md:py-20 overflow-hidden font-sans select-none bg-gradient-to-br from-[#0b0f2b] via-[#071330] to-[#041a38]">
      
      {/* ─── NUOX INSPIRED ULTRA-MODERN BACKGROUND AESTHETIC ─── */}
      <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-600/10 blur-[140px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[80vw] h-[80vw] rounded-full bg-gradient-to-bl from-indigo-600/15 via-purple-600/10 to-transparent blur-[160px] pointer-events-none mix-blend-screen" />
      
      {/* Subtle Soft Cyberpunk Ambient Light Streaks */}
      <div className="absolute top-1/4 right-[5%] w-[300px] h-[600px] bg-gradient-to-b from-cyan-400/5 to-transparent rotate-45 blur-[80px] pointer-events-none hidden lg:block" />

      {/* Cyberpunk Elegant Dynamic Line Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40 hidden md:block">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(43,212,223,0.25)" />
              <stop offset="40%" stopColor="rgba(28,166,219,0.08)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </linearGradient>
          </defs>
          <line x1="5%" y1="0%" x2="45%" y2="100%" stroke="url(#lineGrad)" strokeWidth="1.2" />
          <line x1="30%" y1="0%" x2="70%" y2="100%" stroke="url(#lineGrad)" strokeWidth="1" />
          <line x1="55%" y1="0%" x2="95%" y2="100%" stroke="url(#lineGrad)" strokeWidth="0.8" />
        </svg>
      </div>

      {/* ─── MAIN CONTENT CONTAINER ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 relative z-10">
        
        {/* Top Vertical Hierarchy with balanced modern layout gaps */}
        <div className="flex flex-col mb-12 md:mb-16 max-w-5xl">
          
          {/* Section Sub-Tag */}
          <div className="flex items-center mb-4 sm:mb-6 md:mb-8">
            <span className="text-sm sm:text-base md:text-2xl lg:text-3xl uppercase tracking-[0.25em] [word-spacing:0.35em] font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]">
              WE ARE
            </span>
          </div>
          
          {/* Ultra Modern Dynamic Typography Canvas Area */}
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full h-auto flex flex-col justify-center select-none group py-2 mb-6 sm:mb-10 lg:cursor-none"
          >
            {/* 📱 MOBILE & TABLET VIEW: Crisp, scalable, static solid gradient layout without stroke issues */}
            <div className="block lg:hidden text-[3.2rem] xs:text-[4rem] sm:text-7xl md:text-[6.5rem] font-black tracking-wider bg-gradient-to-r from-[#2bd4df] via-[#1ca6db] to-[#4f46e5] bg-clip-text text-transparent filter drop-shadow-[0_0_25px_rgba(0,205,244,0.3)] uppercase leading-[1.05] pointer-events-none select-none">
              4BIZ <br />
              <span className="text-[0.4em] tracking-normal block mt-1 sm:mt-0">INTERNATIONAL LLC</span>
            </div>

            {/* 💻 DESKTOP VIEW: Enhanced Outline Text Layer for clarity and rich depth */}
            <div 
              className="hidden lg:block text-[7.5rem] font-black tracking-wider text-transparent pointer-events-none select-none transition-all duration-500 uppercase leading-[1.05]"
              style={{ 
                WebkitTextStroke: '2px #00b0ff',
                opacity: isHovered ? 0.9 : 0.75,
                filter: 'drop-shadow(0 0 20px rgba(0, 176, 255, 0.35))'
              }}
            >
              4BIZ <br />
              <span className="text-[0.45em] tracking-normal block">INTERNATIONAL LLC</span>
            </div> 

            {/* 💻 DESKTOP VIEW: Preserved Interactive Mask Layer */}
            <div 
              className="absolute inset-0 py-2 hidden lg:flex flex-col justify-center text-[7.5rem] font-black tracking-wider bg-gradient-to-r from-[#2bd4df] via-[#1ca6db] to-[#4f46e5] bg-clip-text text-transparent pointer-events-none select-none filter drop-shadow-[0_0_30px_rgba(0,205,244,0.4)] uppercase transition-opacity duration-300 leading-[1.05]"
              style={{
                opacity: isHovered ? 1 : 0,
                clipPath: `circle(110px at ${mousePos.x}px ${mousePos.y}px)`
              }}
            >
              4BIZ <br />
              <span className="text-[0.45em] tracking-normal block">INTERNATIONAL LLC</span>
            </div> 

            {/* 💻 DESKTOP VIEW: Preserved Cyberpunk Dynamic Lens Flare Accent */}
            {isHovered && (
              <div 
                className="absolute pointer-events-none rounded-full transition-transform duration-75 ease-out hidden lg:flex items-center justify-center"
                style={{
                  width: '220px',
                  height: '220px',
                  left: `${mousePos.x - 110}px`,
                  top: `${mousePos.y - 110}px`,
                  background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, rgba(0,0,0,0) 75%)',
                  boxShadow: '0 0 50px rgba(0, 240, 255, 0.4), inset 0 0 20px rgba(0, 240, 255, 0.2)',
                  border: '2px solid #00f0ff'
                }}
              >
                {/* Crosshair Details */}
                <div className="absolute w-3 h-3 border-t-2 border-l-2 border-[#00f0ff] opacity-90 top-4 left-4" />
                <div className="absolute w-3 h-3 border-b-2 border-r-2 border-[#00f0ff] opacity-90 bottom-4 right-4" />
              </div>
            )}
          </div>

          {/* Core Descriptive Content Block */}
          <div className="flex flex-col space-y-4 md:space-y-5 pt-2">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-snug sm:leading-tight text-left">
              Leading IT Solutions & Software Development Company in <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-[#1ca6db] to-blue-500 drop-shadow-[0_2px_10px_rgba(34,211,238,0.2)]">Dubai</span>
            </h3>

            <p className="text-[#b1b9db] leading-relaxed text-sm md:text-base text-left font-normal tracking-wide max-w-4xl border-l-2 border-cyan-500/20 pl-4 md:pl-6 bg-gradient-to-r from-cyan-500/5 to-transparent py-2 rounded-r-xl">
              4Biz International is a leading IT solutions and digital transformation company in Dubai, helping businesses streamline operations, accelerate growth, and embrace innovation through advanced technology solutions. Our expertise spans software development, mobile app development, web design, ERP and CRM solutions, cloud services, cybersecurity, IT infrastructure, and digital marketing. With a client-focused approach and a team of experienced professionals, we deliver scalable, secure, and future-ready solutions tailored to meet unique business requirements. At 4Biz International, we bridge the gap between technology and business excellence, empowering organizations to thrive in an increasingly digital world.
            </p>
          </div>
          
          {/* Call-To-Action Neon Interactive Button */}
          <div className="pt-6 text-left">
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-5 sm:px-8 py-3 border border-[#2bd4df]/40 hover:border-[#00cdf4] rounded-full text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase transition-all duration-300 shadow-[inset_0_0_12px_rgba(43,212,223,0.15)] hover:shadow-[0_0_35px_rgba(0,205,244,0.4)] text-[#c4cceb] hover:text-white bg-gradient-to-r from-[#0d122b]/90 to-[#080b1a]/90 backdrop-blur-md group"
            >
              GET FREE CONSULTATION
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2 sm:ml-3 transform transition-transform duration-300 group-hover:translate-x-1.5 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Content: Numeric Metric Track Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 sm:gap-6 lg:gap-10 pt-10 border-t border-cyan-500/10">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="flex flex-col space-y-2 pl-3 sm:pl-4 border-l-2 border-cyan-500/10 hover:border-[#00cdf4]/80 transition-all duration-300 group bg-gradient-to-r from-cyan-500/[0.01] to-transparent py-1"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <div className="flex flex-col space-y-1.5">
                <span className="text-xs sm:text-sm text-[#8a94b3] group-hover:text-white transition-colors duration-300 font-medium tracking-wider max-w-[160px]">
                  {stat.label}
                </span>
                <div className="w-10 sm:w-12 h-[2px] bg-[#00cdf4] opacity-80 rounded-full transition-all duration-300 group-hover:w-16 sm:group-hover:w-20 group-hover:bg-cyan-300 shadow-[0_1px_5px_rgba(0,205,244,0.4)]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}