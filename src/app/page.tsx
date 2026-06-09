'use client';

import React from 'react';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import MapSection from '@/components/MapSection';
import Contact from '@/components/Contact';
import ClientSection from '@/components/ClientSection';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-black">
      <Hero />
      <About />
      <Services />  
       <ClientSection />   
      <Testimonials />   
      <MapSection />
      <Contact />    
    </main>
  );
}