"use client";

import React, { useRef, useMemo, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate, useInView } from 'framer-motion';
import Image from 'next/image';
import { RiDownloadCloud2Line, RiFilePdfLine, RiCompass3Line, RiFocus2Line, RiShieldFlashLine, RiCpuLine, RiGlobalLine } from 'react-icons/ri';

// ─── PERFORMANCE OPTIMIZED CLS-FREE COUNTER ─────────────────────────────────
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
        ease: [0.16, 1, 0.3, 1],
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

  return <span ref={ref} className="text-3xl sm:text-5xl font-black text-white" />;
};

// ─── MAIN ABOUT PAGE COMPONENT ───────────────────────────────────────────────
export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 400, damping: 40 });
  const smoothY = useSpring(mouseY, { stiffness: 400, damping: 40 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const stats = useMemo(() => [
    { value: 1000, suffix: '+', label: 'Global Projects' },
    { value: 16, suffix: '+', label: 'Years Experience' },
    { value: 10, suffix: '+', label: 'Top Rated Matrix' },
    { value: 8, suffix: '+', label: 'Countries Served' },
  ], []);

  const embedVideoUrl = "https://www.youtube.com/embed/xwGzKRwNSA0?autoplay=0&mute=1&rel=0&loop=1";

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-[#070b1e] text-white overflow-hidden font-sans select-none selection:bg-cyan-500 selection:text-black"
    >
      {/* Ambient Premium Core Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-gradient-to-tr from-cyan-500/10 via-blue-600/5 to-transparent blur-[130px] mix-blend-screen" />
        <div className="absolute bottom-[20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-bl from-purple-600/10 via-pink-500/5 to-transparent blur-[140px] mix-blend-screen" />
      </div>

      {/* Micro-mesh Grid Structural Backdrop Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-3/5 flex flex-col space-y-6 text-left"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-transparent border border-cyan-500/20 px-4 py-1.5 rounded-full w-fit backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-400 font-bold">Digital Vanguard</span>
          </div>
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tighter leading-[1.05]">
            Architecting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              Digital Futures
            </span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-xl leading-relaxed font-light">
            We are a high-performance global network crafting elite ecosystems, seamless architectures, and transformational growth platforms for modern market leaders.
          </p>
          <div className="pt-4">
            <a 
              href="#portfolio" 
              className="relative group inline-flex items-center space-x-3 bg-white text-black px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:bg-cyan-400 hover:text-black shadow-lg hover:shadow-cyan-400/20 transform-gpu hover:-translate-y-0.5"
            >
              <span>Explore Architecture</span>
              <RiCompass3Line className="text-lg transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </div>
        </motion.div>

        {/* Right Core Logo Frame with 3D Structural Glowing Cosmic Rings */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-2/5 flex items-center justify-center relative min-h-[350px] sm:min-h-[420px]"
          style={{ perspective: 1200 }}
        >
          {/* Energy Radiation Pulse Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none transform-gpu">
            <div className="absolute w-56 h-56 bg-radial-gradient from-cyan-500/30 via-pink-500/20 to-transparent blur-2xl animate-pulse" />

            {/* Thick 3D Multi-colored Pulsating Layers */}
            <div className="absolute w-48 h-48 rounded-full border-[6px] border-cyan-400/30 shadow-[0_0_25px_rgba(34,211,238,0.4)] animate-[ping_3.5s_cubic-bezier(0.16,1,0.3,1)_infinite]" />
            <div className="absolute w-60 h-60 rounded-full border-[4px] border-pink-500/20 shadow-[0_0_30px_rgba(236,72,153,0.3)] animate-[ping_3.5s_cubic-bezier(0.16,1,0.3,1)_infinite_0.9s]" />
            <div className="absolute w-72 h-72 rounded-full border-[5px] border-purple-500/10 shadow-[0_0_35px_rgba(168,85,247,0.2)] animate-[ping_3.5s_cubic-bezier(0.16,1,0.3,1)_infinite_1.8s]" />

            {/* Dynamic Orbital Geometry Tracks */}
            <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border-[3px] border-dashed border-cyan-400/40 animate-[spin_25s_linear_infinite]" />
            <div className="absolute w-[18rem] h-[18rem] sm:w-[23rem] sm:h-[23rem] rounded-full border-[2px] border-double border-pink-500/30 animate-[spin_18s_linear_infinite_reverse]" />
            <div className="absolute w-[21rem] h-[21rem] sm:w-[26rem] sm:h-[26rem] rounded-full border-[4px] border-transparent border-t-purple-500/40 border-b-teal-400/40 animate-[spin_35s_linear_infinite]" />
          </div>

          <div className="absolute inset-0 bg-radial-gradient from-cyan-500/20 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />
          
          <div className="relative w-64 h-32 sm:w-80 sm:h-40 transition-transform duration-700 hover:scale-105 transform-gpu filter drop-shadow-[0_0_40px_rgba(6,182,212,0.4)]">
            <Image
              src="/4biz_logo-1.png"
              alt="4Biz International Corporate Logo"
              fill
              sizes="(max-width: 768px) 256px, 320px"
              className="object-contain relative z-10"
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* ─── NUMERIC STATS INTERCONNECTED LINE ─── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-8 border-t border-b border-white/5 bg-white/[0.01] backdrop-blur-md">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col space-y-1 md:pl-4 md:border-l border-white/10 first:border-0 py-2">
              <div className="flex items-center justify-center md:justify-start space-x-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(34,211,238,0.2)]">
                <Counter value={stat.value} suffix={stat.suffix} />
                <span className="text-xl sm:text-2xl font-extrabold text-cyan-400">{stat.suffix}</span>
              </div>
              <span className="text-xs sm:text-sm text-white/50 font-mono uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── EXPANDED BRAND STORY & SMARTPHONE REEL CONTAINER ─── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Extended Text Block */}
        <div className="lg:col-span-7 flex flex-col space-y-8">
          <div className="flex flex-col space-y-3">
            <div className="inline-flex items-center space-x-2 text-purple-400 font-mono text-xs uppercase tracking-widest font-bold">
              <RiFocus2Line className="text-base animate-spin" style={{ animationDuration: '6s' }} />
              <span>Operational DNA & Strategy Blueprint</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Brand Story
            </h2>
          </div>
          
          <div className="space-y-6 text-white/80 text-base sm:text-lg font-light leading-relaxed text-justify">
            <p>
              At 4Biz International, we see a digital landscape full of untapped potential. We transform that potential into performance by merging cutting-edge technological innovation with master-class strategic planning. Our mission is to scale your vision, optimize your operations, and ensure your business doesn't just survive the digital evolution—it leads it.
            </p>
            <p>
              We drive organizational change through technical excellence and precision architecture. Our global frameworks provide companies with advanced cloud integrations, fluid user experience platforms, and scalable data models tailored for complex industries. By removing structural barriers, we turn digital capabilities into real market advantages.
            </p>
          </div>

          {/* Value Highlights Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/5">
            <div className="flex items-start space-x-3 group">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300">
                <RiCpuLine className="text-xl" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Elite Infrastructure</h4>
                <p className="text-xs text-white/50 leading-normal">High-throughput custom application stacks.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 group">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:bg-purple-500 group-hover:text-black transition-all duration-300">
                <RiShieldFlashLine className="text-xl" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Absolute Velocity</h4>
                <p className="text-xs text-white/50 leading-normal">Zero-latency optimization protocols.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 group">
              <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 group-hover:bg-pink-500 group-hover:text-black transition-all duration-300">
                <RiGlobalLine className="text-xl" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Global Scale</h4>
                <p className="text-xs text-white/50 leading-normal">Cross-border operations across top clusters.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Video Inside an Authentic Smartphone Chassis Framework */}
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[290px] sm:max-w-[320px] aspect-[9/16] rounded-[2.8rem] p-3.5 bg-[#0e1126] border-[4px] border-[#222954] shadow-[0_30px_70px_rgba(0,0,0,0.7),inset_0_2px_4px_rgba(255,255,255,0.1)] group transform-gpu transition-all duration-500 hover:scale-[1.03] hover:border-cyan-400/50">
            
            {/* Left Hardware Volume Keys (+/-) */}
            <div className="absolute top-[24%] -left-[8px] w-[4px] h-9 bg-[#2b3369] rounded-l border-l border-white/10 shadow-md z-50" />
            <div className="absolute top-[32%] -left-[8px] w-[4px] h-9 bg-[#2b3369] rounded-l border-l border-white/10 shadow-md z-50" />
            
            {/* Right Hardware Power Switch Button */}
            <div className="absolute top-[28%] -right-[8px] w-[4px] h-12 bg-[#2b3369] rounded-r border-r border-white/10 shadow-md z-50" />
            
            {/* Top Ear-Speaker Strip & Dot Sensor Matrix */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-black rounded-full z-30 flex items-center justify-center space-x-1.5 px-3">
              <div className="w-8 h-1 bg-white/20 rounded-full" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#161a36]" />
            </div>

            {/* Inner Display Surface */}
            <div className="w-full h-full rounded-[2.2rem] overflow-hidden bg-black relative border border-black shadow-inner">
              <iframe
                className="w-full h-full relative z-10 border-0"
                src={embedVideoUrl}
                title="4Biz International Corporate Video Reel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO INTERACTIVE FULLY RESPONSIVE ADAPTIVE CONTAINER ─── */}
      <section id="portfolio" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-12 md:py-20">
        <div className="flex flex-col space-y-8 w-full">
          
          {/* Header Controls Strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-4 border-b border-white/10">
            <div className="flex flex-col space-y-1">
              <span className="text-xs font-mono tracking-[0.4em] uppercase text-pink-500 font-bold">Interactive Platform Deck</span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">Company Profile</h2>
            </div>
            
            <a 
              href="https://new.4bizinternational.com/documents/4biz-international-company-profile.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2.5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold text-xs sm:text-sm tracking-wide px-6 py-3 rounded-full shadow-[0_4px_25px_rgba(236,72,153,0.3)] hover:shadow-[0_4px_35px_rgba(236,72,153,0.5)] transition-all duration-300 transform-gpu hover:-translate-y-0.5"
            >
              <span>Download Profile</span>
              <RiDownloadCloud2Line className="text-base group-hover:animate-bounce" />
            </a>
          </div>

          {/* OUTER ACCENT FRAME WITH INTEGRATED HARDWARE BUTTONS */}
          <div className="relative w-full mx-auto max-w-4xl p-2 sm:p-3.5 rounded-[2.5rem] sm:rounded-[3rem] bg-gradient-to-tr from-pink-500 via-red-500 via-orange-400 via-cyan-400 to-purple-600 shadow-[0_25px_65px_rgba(236,72,153,0.35)] group transform-gpu transition-all duration-500">
            
            {/* Ambient Shadow Bleed */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-pink-500 via-purple-600 to-cyan-400 opacity-20 blur-2xl rounded-[3.5rem] pointer-events-none group-hover:opacity-35 transition-opacity duration-500" />
            
            {/* ── PHYSICAL HARDWARE COMPONENTS EMBEDDED DIRECTLY ON THE OUTER ACCENT BORDER ── */}
            
            {/* 1. VOLUME BUTTONS (+/-): Placed on the outside left edge across all sizes */}
            <div className="absolute top-[28%] -left-[6px] w-[6px] h-10 bg-[#bd215c] rounded-l border-l border-white/20 shadow-md z-50" />
            <div className="absolute top-[38%] -left-[6px] w-[6px] h-10 bg-[#bd215c] rounded-l border-l border-white/20 shadow-md z-50" />
            
            {/* 2. POWER BUTTONS: Layout positions adjust instantly to preserve responsive ergonomics */}
            {/* Mobile: Mounted on outer right border */}
            <div className="absolute top-[32%] -right-[6px] w-[6px] h-12 bg-[#ab4bc4] rounded-r border-r border-white/20 md:hidden z-50" />
            {/* Desktop/Tablet: Mounted cleanly on top-right side rim */}
            <div className="hidden md:block absolute -top-[6px] right-20 w-14 h-[6px] bg-[#ab4bc4] rounded-t border-t border-white/20 z-50" />

            {/* CHASSIS MONITOR SHELL: 
                - Mobile view: fluid 100% device span, aspect-[9/16] portrait, zero overflow.
                - Tablet/Desktop view: switches seamlessly to standard aspect-[4/3] landscape frame.
            */}
            <div className="relative w-full rounded-[2.2rem] sm:rounded-[2.5rem] bg-[#0c0f24] border-[12px] sm:border-[20px] md:border-[22px] border-[#161a36] shadow-2xl overflow-hidden aspect-[9/16] md:aspect-[4/3] flex flex-col transform-gpu transition-all duration-500">
              
              {/* 3. CENTERED FRONT CAMERA LENS INTERNAL MATRIX */}
              {/* Mobile Portrait Bezel Camera */}
              <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#202752] border border-black/50 shadow-inner md:hidden flex items-center justify-center z-50">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/40" />
              </div>
              {/* Desktop Landscape Bezel Camera */}
              <div className="hidden md:flex absolute top-[4px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#202752] border border-black/60 shadow-inner items-center justify-center z-50">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 flex items-center justify-center">
                  <div className="w-0.5 h-0.5 rounded-full bg-white/80" />
                </div>
              </div>

              {/* Secure Document Rendering Layer Content Viewport */}
              <object
                data="https://new.4bizinternational.com/documents/4biz-international-company-profile.pdf"
                type="application/pdf"
                className="w-full h-full rounded-[1.2rem] bg-[#121630]"
              >
                {/* Fallback Screen Viewport Control Deck */}
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-5 sm:p-8 bg-gradient-to-b from-[#141936] to-[#0d1026] text-white">
                  <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center border border-pink-500/30 mb-4 shadow-inner">
                    <RiFilePdfLine className="text-xl text-pink-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black mb-1">Company Profile</h3>
                  <p className="text-white/60 text-xs max-w-xs leading-relaxed mb-6">
                    Click down below to pull and inspect our high-performance interactive portfolio assets instantly on your device screen.
                  </p>
                  <a
                    href="https://new.4bizinternational.com/documents/4biz-international-company-profile.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black font-bold text-xs tracking-wide px-6 py-3 rounded-full transition-all duration-300 hover:bg-cyan-400 hover:text-black shadow-md transform-gpu active:scale-95"
                  >
                    Launch Fullscreen Profile
                  </a>
                </div>
              </object>
            </div>

          </div>
        </div>
      </section>

      {/* Smooth Ambient Cursor Spotlighting Tracker Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(600px circle at var(--x) var(--y), rgba(34, 211, 238, 0.02), transparent 50%)`,
          // @ts-ignore - dynamic styling variable bindings
          '--x': smoothX,
          '--y': smoothY,
        }}
      />
    </div>
  );
}