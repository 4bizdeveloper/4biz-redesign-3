"use client";

import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { 
  RiFacebookFill, RiInstagramLine, RiLinkedinFill, 
  RiYoutubeFill, RiTwitterXFill, RiDownloadCloud2Line 
} from 'react-icons/ri';
import Image from 'next/image';

const Footer = () => {
  const footerRef = useRef(null);
  
  // High-precision scroll tracking for Parallax
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  // PHYSICS: Eliminates "jitter" on high-refresh displays
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    restDelta: 0.001
  });

  // 3D Transforms trigger GPU rendering to eliminate "shaking"
  const y1 = useTransform(smoothProgress, [0, 1], ["0px", "-100px"]);
  const y2 = useTransform(smoothProgress, [0, 1], ["0px", "100px"]);

  const socialLinks = useMemo(() => [
    { icon: <RiFacebookFill />, url: "https://www.facebook.com/4bizglobal" },
    { icon: <RiInstagramLine />, url: "https://www.instagram.com/4biz_ae" },
    { icon: <RiLinkedinFill />, url: "https://www.linkedin.com/company/4biz-international/" },
    { icon: <RiTwitterXFill />, url: "https://x.com/4biz123" },
    { icon: <RiYoutubeFill />, url: "https://www.youtube.com/@4bizinternationalae" },
  ], []);

  return (
    <footer 
      id="footer"
      ref={footerRef} 
      className="relative z-10 bg-transparent mt-4 pt-12 md:pt-16 pb-40 md:pb-24 overflow-hidden border-t border-white/5 transform-gpu backface-hidden"
      style={{ 
        contentVisibility: 'auto', 
        paddingBottom: 'calc(160px + env(safe-area-inset-bottom))'
      } as React.CSSProperties}
    >
      
      {/* --- HARDWARE ACCELERATED GRADIENTS --- */}
      <motion.div 
        style={{ y: y1, translateZ: 0 }} 
        className="absolute top-0 -right-20 w-[300px] md:w-[700px] h-[300px] md:h-[700px] bg-cyan-500/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse will-change-transform" 
      />
      <motion.div 
        style={{ y: y2, translateZ: 0 }} 
        className="absolute bottom-0 -left-20 w-[300px] md:w-[700px] h-[300px] md:h-[700px] bg-purple-600/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse will-change-transform" 
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-16 lg:gap-8 mb-20 items-start">
          
          {/* BRAND ARCHITECTURE */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-8 md:space-y-10">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative h-12 md:h-16 w-48 transition-transform duration-300 transform-gpu"
            >
              <Image 
                src="/4biz_logo-1.jpg" 
                alt="4Biz International" 
                fill
                className="object-contain"
                priority={false}
              />
            </motion.div>
            <p className="text-white/50 text-sm md:text-lg leading-relaxed font-medium max-w-md border-l-[3px] border-cyan-400 pl-6 md:pl-8 italic antialiased">
              "Engineering secure digital frontiers and redefining IT excellence for the next generation of global leaders."
            </p>
            
            <div className="flex flex-wrap gap-3 md:gap-4">
              {socialLinks.map((link, i) => (
                <a 
                  key={i} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border border-white/10 flex items-center justify-center text-xl md:text-2xl text-white/40 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-white hover:-translate-y-1 transform-gpu"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* CONTACT TERMINAL */}
          <div className="lg:col-span-4 flex flex-col space-y-8 md:space-y-10">
            <h4 className="text-cyan-400 font-black uppercase tracking-[0.5em] text-[10px] md:text-[11px] opacity-70">
              Terminal / Logistics
            </h4>
            <ul className="space-y-6 md:space-y-8 text-white/70">
              <li className="flex gap-4 md:gap-5 items-start group">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-purple-500/20 transition-colors">
                  <FaMapMarkerAlt className="text-purple-500 text-base" />
                </div>
                <span className="text-sm md:text-base leading-relaxed group-hover:text-white transition-colors">
                  Office 104, Crystal Building, Al Karama<br />
                  Near ADCB Metro, Dubai, UAE
                </span>
              </li>
              <li className="flex gap-4 md:gap-5 items-center group">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-cyan-400/20 transition-colors">
                  <FaPhoneAlt className="text-cyan-400 text-base" />
                </div>
                <a href="tel:+971527925100" className="text-base md:text-lg font-bold group-hover:text-cyan-400 transition-colors">
                  +971 52 79 25 100
                </a>
              </li>
              <li className="flex gap-4 md:gap-5 items-center group">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-purple-500/20 transition-colors">
                  <FaEnvelope className="text-purple-500 text-base" />
                </div>
                <a href="mailto:info@4bizinternational.com" className="break-all text-sm md:text-base group-hover:text-white transition-colors">
                  info@4bizinternational.com
                </a>
              </li>
            </ul>
          </div>

          {/* SYSTEM NAVIGATION */}
          <div className="lg:col-span-3 flex flex-col space-y-8 md:space-y-10">
            <h4 className="text-purple-500 font-black uppercase tracking-[0.5em] text-[10px] md:text-[11px] opacity-70">
              System Interface
            </h4>
            <div className="flex flex-col gap-8">
              <nav>
                <ul className="grid grid-cols-2 lg:grid-cols-1 gap-4 text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">
                  {['Home', 'About', 'Services', 'Contact'].map((item) => (
                    <li key={item}>
                      <a href={`#${item.toLowerCase()}`} className="group flex items-center gap-3 hover:text-cyan-400 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-cyan-400 transition-all" />
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <a 
                href="/documents/4biz-international-company-profile.pdf"
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between bg-white/[0.03] border border-white/10 text-white py-4 px-6 rounded-xl transition-all hover:bg-white/[0.06] transform-gpu"
              >
                <div className="flex flex-col relative z-10">
                  <span className="text-[8px] uppercase tracking-[0.4em] text-cyan-400 mb-1">Access File</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Our Portfolio</span>
                </div>
                <RiDownloadCloud2Line className="text-2xl text-purple-500 group-hover:translate-y-[-2px] transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* --- BOTTOM DATA STATUS BAR (CENTERED & CLEAN) --- */}
        <div className="pt-8 border-t border-white/5 flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-4">
            <p className="text-white/20 text-[8px] uppercase tracking-[0.4em] font-medium text-center">
              © 2026 4Biz International 
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;