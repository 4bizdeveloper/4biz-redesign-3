"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RiCalendarLine, RiTimeLine, RiArrowRightUpLine } from 'react-icons/ri';

export default function BlogsLandingPage() {
  const pageMeta = {
    title: "Global Business Insights & Market Analysis | 4Biz International",
    description: "Expert corporate perspectives on setting up business operations in Dubai, international tax compliance strategies, and dual-jurisdiction operational scaling frameworks.",
    url: "https://new.4bizinternational.com/blogs",
  };

  // Preserved structural data model with requested unsplash thumbnail
  const featuredBlog = {
    title: "Ultimate Guide to Business Setup in Dubai: Scaling Globally from UAE in 2026",
    excerpt: "Navigate corporate tax laws, mainland vs free zone licensing, and optimize your international operational frameworks with 4Biz experts.",
    slug: "/blog/business-setup-dubai-global-scaling",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200",
    date: "June 08, 2026",
    readTime: "7 min read",
    category: "Business Setup"
  };

  return (
    <>
      {/* ─── NEXT.JS HEADER COMPLIANT METADATA ELEMENTS ─── */}
      <title>{pageMeta.title}</title>
      <meta name="description" content={pageMeta.description} />
      <link rel="canonical" href={pageMeta.url} />
      <meta name="robots" content="index, follow" />

      {/* Social Graphs (Open Graph / Facebook / LinkedIn / X) */}
      <meta property="og:title" content={pageMeta.title} />
      <meta property="og:description" content={pageMeta.description} />
      <meta property="og:url" content={pageMeta.url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={featuredBlog.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageMeta.title} />
      <meta name="twitter:description" content={pageMeta.description} />
      <meta name="twitter:image" content={featuredBlog.image} />

      {/* JSON-LD Schema Core Integration (Collection & Item List Definition) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": pageMeta.title,
            "description": pageMeta.description,
            "url": pageMeta.url,
            "publisher": {
              "@type": "Organization",
              "name": "4Biz International",
              "url": "https://new.4bizinternational.com"
            },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "url": `https://new.4bizinternational.com${featuredBlog.slug}`,
                  "name": featuredBlog.title
                }
              ]
            }
          })
        }}
      />

      {/* ─── MAIN LAYOUT BLOCK ─── */}
      {/* pt-40 guarantees safe distance from absolute/fixed headers on all screen widths */}
      <main className="min-h-screen bg-slate-950 text-slate-100 pt-40 pb-24 px-4 sm:px-8 lg:px-12 selection:bg-blue-600 selection:text-white">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Centered Page Identification Header */}
          <header className="max-w-3xl mx-auto text-center mb-16 sm:mb-24 px-2">
            <span className="text-blue-500 font-semibold uppercase tracking-[0.25em] text-xs sm:text-sm mb-4 block">
              Knowledge Hub
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
              Corporate Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Global Strategy</span>
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-6 rounded-full" />
            <p className="text-slate-400 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              Actionable strategic execution files, localized regulatory breakdowns, and institutional framework evaluations curated by 4Biz International advisory groups.
            </p>
          </header>

          {/* ─── GRID CONTAINER ─── */}
          {/* Fully fluid full-width column distribution with adaptive responsive grid handling */}
          <section className="w-full px-2 sm:px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
              
              <article className="group relative bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between transform-gpu hover:shadow-[0_10px_30px_-15px_rgba(59,130,246,0.2)]">
                
                {/* Visual Top Container Block */}
                <div>
                  {/* Hero Image Container: Lock-tight layout box ratio completely prevents cumulative layout shifts (CLS) */}
                  <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden border-b border-slate-800/60">
                    <Image 
                      src={featuredBlog.image} 
                      alt="Modern architectural glass highrises in the Dubai corporate commercial hub representing cross-border enterprise development metrics." 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-slate-950/80 backdrop-blur-md text-blue-400 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-md border border-white/5">
                        {featuredBlog.category}
                      </span>
                    </div>
                  </div>

                  {/* Core Content Layout Block */}
                  <div className="p-6 sm:p-8">
                    {/* Timestamp & Meta Information Row */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 font-medium">
                      <div className="flex items-center gap-1.5">
                        <RiCalendarLine className="text-sm text-slate-600" />
                        <span>{featuredBlog.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <RiTimeLine className="text-sm text-slate-600" />
                        <span>{featuredBlog.readTime}</span>
                      </div>
                    </div>

                    {/* Headline Link Target */}
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-3 group-hover:text-blue-400 transition-colors duration-300">
                      <Link href={featuredBlog.slug} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {featuredBlog.title}
                      </Link>
                    </h2>

                    {/* Brief Narrative Summary */}
                    <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed line-clamp-3">
                      {featuredBlog.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Base Row Block */}
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 mt-auto">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-blue-400 border-t border-slate-800/60 pt-4 w-full group-hover:text-blue-300 transition-colors">
                    <span>Read Investigation</span>
                    <RiArrowRightUpLine className="text-lg transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-blue-400 group-hover:text-blue-300" />
                  </div>
                </div>

              </article>

            </div>
          </section>

        </div>
      </main>
    </>
  );
}