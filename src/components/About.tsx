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
      className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2bd4df] to-[#1ca6db] tracking-tight block drop-shadow-[0_2px_10px_rgba(43,212,223,0.2)]"
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
    { value: 70, suffix: '+', label: 'Software developers' },
    { value: 13, suffix: '+', label: 'Years of experience' },
    { value: 200, suffix: '+', label: 'Web & Mobile apps' },
    { value: 4, suffix: '+', label: 'Top rated company' },
  ];

  return (
    <section className="relative w-full bg-[#050714] text-white py-24 md:py-36 overflow-hidden font-sans select-none">
      
      {/* Dynamic Ambient Background Glows for "Wow" factor */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-600/10 to-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/10 to-purple-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Cyberpunk Elegant Diagonal Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30 hidden md:block">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(34,211,238,0.2)" />
              <stop offset="50%" stopColor="rgba(59,130,246,0.05)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </linearGradient>
          </defs>
          <line x1="10%" y1="0%" x2="50%" y2="100%" stroke="url(#lineGrad)" strokeWidth="1.5" />
          <line x1="35%" y1="0%" x2="75%" y2="100%" stroke="url(#lineGrad)" strokeWidth="1" />
          <line x1="60%" y1="0%" x2="100%" y2="100%" stroke="url(#lineGrad)" strokeWidth="1" />
        </svg>
      </div>

      {/* Main Layout Container with edge-to-edge premium padding */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 xl:px-32 relative z-10">
        
        {/* Top Vertical Hierarchy */}
        <div className="flex flex-col space-y-8 md:space-y-12 mb-24 md:mb-32 max-w-5xl">
          
          {/* Section Sub-Tag */}
          <div className="flex items-center space-x-3">
            <span className="h-[2px] w-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></span>
            <span className="text-xs md:text-sm uppercase tracking-[0.35em] font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500">
              WE ARE
            </span>
          </div>
          
          {/* Ultra Modern High-Contrast 4BIZ Interaction Canvas */}
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative cursor-none w-full h-[110px] sm:h-[160px] md:h-[220px] flex items-center select-none group"
          >
            {/* Background Base Typography: Crisp and Lucid Outlined Look with high-visibility #00cdf4 border */}
            <h2 
              className="text-7xl sm:text-9xl md:text-[13rem] font-black tracking-wider text-[#0c0f24] pointer-events-none select-none transition-colors duration-500"
              style={{ WebkitTextStroke: '1.5px #00cdf4' }}
            >
              4BIZ
            </h2>

            {/* Foreground Reveal Typography: Cyber Electric Gradient Text */}
            <h2 
              className="absolute inset-0 flex items-center text-7xl sm:text-9xl md:text-[13rem] font-black tracking-wider bg-gradient-to-r from-[#2bd4df] via-[#1ca6db] to-[#3b82f6] bg-clip-text text-transparent opacity-0 pointer-events-none select-none"
              style={{
                opacity: isHovered ? 1 : 0,
                clipPath: isHovered 
                  ? `circle(110px at ${mousePos.x}px ${mousePos.y}px)` 
                  : `circle(0px at 0px 0px)`
              }}
            >
              4BIZ
            </h2>

            {/* Enhanced High-Tech Floating Lens Wrapper with Colorful Border and Aurora Ring */}
            {isHovered && (
              <div 
                className="absolute pointer-events-none rounded-full transition-transform duration-100 ease-out flex items-center justify-center"
                style={{
                  width: '220px',
                  height: '220px',
                  left: `${mousePos.x - 110}px`,
                  top: `${mousePos.y - 110}px`,
                  background: 'radial-gradient(circle, rgba(0,205,244,0.12) 0%, rgba(0,0,0,0) 70%)',
                  boxShadow: '0 0 50px rgba(0, 205, 244, 0.4), inset 0 0 20px rgba(43, 212, 223, 0.25)',
                  border: '2px solid #00cdf4'
                }}
              >
                {/* Crosshair Accent Inside Lens for Premium Tech feel */}
                <div className="absolute w-2 h-2 border-t border-l border-[#00cdf4] opacity-80 top-4 left-4" />
                <div className="absolute w-2 h-2 border-b border-r border-[#00cdf4] opacity-80 bottom-4 right-4" />
              </div>
            )}
          </div>

          {/* Core Descriptive Content Block */}
          <div className="flex flex-col space-y-6 pt-6">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Leading IT Solutions & Software Development Company in <br></br><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-[#1ca6db]">Dubai</span>
            </h3>

            <p className="text-[#a4abc5] leading-relaxed text-sm sm:text-base text-justify font-normal tracking-wide max-w-4xl border-l-2 border-[#161f42] pl-4 md:pl-6">
              4Biz International is a leading IT solutions and digital transformation company in Dubai, helping businesses streamline operations, accelerate growth, and embrace innovation through advanced technology solutions. Our expertise spans software development, mobile app development, web design, ERP and CRM solutions, cloud services, cybersecurity, IT infrastructure, and digital marketing. With a client-focused approach and a team of 
experienced professionals, we deliver scalable, secure, and future-ready solutions tailored to meet unique business requirements. At 4Biz International, we bridge the gap between technology and business excellence, empowering organizations to thrive in an increasingly digital world.
            </p>
          </div>
          
          {/* Call-To-Action Neon Interactive Button */}
          <div className="pt-6">
            <a 
              href="#about" 
              className="inline-block px-10 py-4 border border-[#1e295d] hover:border-[#00cdf4] rounded-full text-xs md:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,205,244,0.3)] text-[#b0b9dc] hover:text-white bg-gradient-to-r from-[#0d122b]/80 to-[#080b1a]/80 backdrop-blur-sm group"
            >
              MORE ABOUT US
              <svg className="w-4 h-4 ml-2 inline-block transform transition-transform duration-300 group-hover:translate-x-1 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Content: Ultra Premium Numeric Metric Track Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 pt-16 border-t border-[#131a3a]">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="flex flex-col space-y-3 pl-4 border-l-2 border-cyan-500/10 hover:border-[#00cdf4]/60 transition-all duration-300 group"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <span className="text-xs md:text-sm text-[#8a94b3] group-hover:text-gray-200 transition-colors duration-300 font-semibold tracking-wide max-w-[160px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}