'use client';

import React from 'react';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import MapSection from '@/components/MapSection';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-black">
      <Hero />
      <About />
      <Services />
        <Testimonials />
      <MapSection />
    </main>
  );
}