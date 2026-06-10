"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  rating: number;
}

const testimonialsData: TestimonialItem[] = [
  {
    id: 1,
    name: "Alexander Wright",
    role: "Chief Technology Officer",
    company: "Apex Global Solutions",
    content: "The custom enterprise architecture and cloud migration strategy delivered by this team transformed our digital infrastructure. Their execution was absolutely flawless, cutting our operational latency by over 40%. They don't just build software; they engineer massive business advantages.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "VP of Product Development",
    company: "Fintech Nexus Group",
    content: "We partnered with them for an intensive Next.js application overhaul and the results were stunning. Page load times plummeted, UX metrics hit record highs, and our core customer engagement metrics grew exponentially. They are hands-down the best modern development agency we've ever hired.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    rating: 5,
  },
  {
    id: 3,
    name: "Marcus Sterling",
    role: "Founder & CEO",
    company: "Quantum Cybernetics",
    content: "Finding an IT partner who truly understands high-performance web development, modern animation workflows, and scalable backend infrastructure is rare. They managed our end-to-end platform deployment with world-class technical precision. A genuine game-changer for our organization.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    rating: 5,
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isAutoplay, setIsAutoplay] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slideNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const slidePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  // Autoplay functionality
  useEffect(() => {
    if (isAutoplay) {
      timerRef.current = setInterval(() => {
        slideNext();
      }, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoplay, activeIndex]);

  // Handle manual interaction pauses
  const handleManualNavigation = (action: () => void) => {
    setIsAutoplay(false);
    action();
  };

  // Ultra-smooth slide variants using layout-preserving positioning parameters to prevent cross-fade layout jumps
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.99,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 32 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    },
    exit: (dir: number) => ({
      position: "absolute" as const,
      top: 0,
      left: 0,
      width: "100%",
      x: dir > 0 ? -30 : 30,
      opacity: 0,
      scale: 0.99,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 32 },
        opacity: { duration: 0.25 }
      }
    })
  };

  const currentTestimonial = testimonialsData[activeIndex];

  return (
    <section 
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 text-white overflow-hidden select-none transform-gpu flex flex-col justify-center"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #152466 0%, #0d1742 45%, #080f30 80%, #060b24 100%)',
        contentVisibility: 'auto',
        contain: 'paint layout',
        containmentIntrinsicSize: '1px 750px',
      } as React.CSSProperties}
    >
      {/* Dynamic Cyber Ambient Overlays — Pure dark blue/indigo, zero pure black */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111c52]/30 via-[#0d1742]/10 to-[#0a1236]/30 pointer-events-none" />

      {/* Expanded Luminous Mesh Backdrops to eliminate pure dark spots across top & bottom boundaries */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[140px] pointer-events-none mix-blend-screen transform -translate-y-1/3 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[140px] pointer-events-none mix-blend-screen transform translate-y-1/3" />
      <div className="absolute top-1/3 right-1/3 w-[350px] h-[350px] bg-blue-500/15 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      {/* High-Tech Grid Structure */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf806_1px,transparent_1px),linear-gradient(to_bottom,#38bdf806_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_80%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest text-cyan-300 uppercase bg-cyan-400/[0.12] border border-cyan-400/30 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            Client Success Stories
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-slate-300 leading-tight py-1">
            Trusted by Innovators Worldwide
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Discover how we help global enterprises and high-growth startups build complex architectures and digital products that scale.
          </p>
        </motion.div>

        {/* Core Testimonial Flex-box Frame — Fixed layouts via strict height clamping parameters across viewports */}
        <div className="relative w-full overflow-visible min-h-[460px] sm:min-h-[380px] md:min-h-[320px] lg:min-h-[290px] xl:min-h-[270px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentTestimonial.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#111d4a]/75 backdrop-blur-xl border border-cyan-400/25 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(6,11,38,0.5)] overflow-hidden group transform-gpu"
            >
              {/* Vibrant Background Quote Emblem */}
              <Quote className="absolute top-6 right-6 w-24 h-24 text-cyan-400/[0.12] pointer-events-none group-hover:text-cyan-400/20 group-hover:scale-105 transition-all duration-500 z-0" />
              
              {/* Left Column: Media Information Profile */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-cyan-400/20 pb-6 lg:pb-0 lg:pr-8 z-10 w-full">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-400 via-teal-300 to-purple-500 shadow-xl shadow-cyan-950/50">
                  <Image 
                    src={currentTestimonial.image} 
                    alt={currentTestimonial.name}
                    fill
                    sizes="(max-width: 768px) 96px, 112px"
                    priority
                    className="object-cover rounded-[14px]"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-white tracking-wide">
                  {currentTestimonial.name}
                </h3>
                <p className="text-sm font-medium text-cyan-300 mt-1">
                  {currentTestimonial.role}
                </p>
                <p className="text-xs text-slate-300 mt-0.5">
                  {currentTestimonial.company}
                </p>

                <div className="flex gap-1 mt-4">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]" />
                  ))}
                </div>
              </div>

              {/* Right Column: Statement Block */}
              <div className="lg:col-span-8 flex flex-col justify-center relative px-2 sm:px-4 z-10 w-full">
                <Quote className="w-10 h-10 text-cyan-400/50 mb-4 hidden lg:block drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]" />
                <p className="text-base sm:text-lg lg:text-xl text-slate-100 leading-relaxed font-light italic">
                  "{currentTestimonial.content}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global Navigation Layout Controls */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 px-2">
          
          {/* Progress Indicators */}
          <div className="flex gap-2.5 order-2 sm:order-1">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => handleManualNavigation(() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                })}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-8 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" : "w-2 bg-slate-600 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Interactive Arrow Controls */}
          <div className="flex gap-4 order-1 sm:order-2">
            <button
              onClick={() => handleManualNavigation(slidePrev)}
              className="p-3.5 sm:p-4 rounded-xl bg-[#13225c] border border-cyan-400/30 hover:border-cyan-400/60 text-slate-200 hover:text-white transition-all duration-200 shadow-lg hover:shadow-cyan-900/30 active:scale-95 group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => handleManualNavigation(slideNext)}
              className="p-3.5 sm:p-4 rounded-xl bg-[#13225c] border border-cyan-400/30 hover:border-cyan-400/60 text-slate-200 hover:text-white transition-all duration-200 shadow-lg hover:shadow-cyan-900/30 active:scale-95 group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}