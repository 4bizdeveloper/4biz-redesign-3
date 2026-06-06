"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  colorClass: string;
  activeTabClass: string;
  images: string[];
}

const servicesData: ServiceItem[] = [
  {
    id: "web-dev",
    title: "Web Design & Dev",
    subtitle: "Web Design & Development Services",
    description:
      "We provide complete Web Management Services, including website, email, and SEO. Partner with us for cost-effective solutions, expert support, and an optimized online presence. Our cutting-edge technology ensures your website works well on all devices, giving you a competitive edge in your industry.",
    points: ["Complete Web Management", "Optimized Online Presence", "Cutting-edge Technology", "Cross-device Compatibility"],
    colorClass: "from-blue-600 to-purple-600",
    activeTabClass: "bg-blue-600 text-white shadow-lg shadow-blue-600/30",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "seo",
    title: "SEO",
    subtitle: "Search Engine Optimization",
    description:
      "In the ever-evolving digital landscape, the visibility of your business in search engine results is paramount to your online success. At 4Biz International, we understand the critical importance of Search Engine Optimization (SEO) as an integral element of your marketing strategy. Our approach goes above and beyond conventional strategies to ensure that your website not only ranks high but shines brightly in the online realm.",
    points: ["Search Engine Visibility", "Conventional Strategy Integration", "High Keyword Rankings", "Digital Landscape Adaptation"],
    colorClass: "from-indigo-600 to-blue-700",
    activeTabClass: "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30",
    images: [
      "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "ms-dynamics",
    title: "Dynamics 365",
    subtitle: "Microsoft Dynamics 365 Integration",
    description:
      "At 4biz International, we take pride in offering an unparalleled solution to transform and empower your business—Microsoft Dynamics 365. This all-in-one platform seamlessly integrates Customer Relationship Management (CRM) and Enterprise Resource Planning (ERP), providing a unified system to streamline operations and elevate your overall business efficiency.",
    points: ["All-in-one Platform", "CRM & ERP Integration", "Streamlined Operations", "Business Efficiency Boost"],
    colorClass: "from-pink-600 to-purple-700",
    activeTabClass: "bg-pink-600 text-white shadow-lg shadow-pink-600/30",
    images: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=500&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "smm",
    title: "Social Media",
    subtitle: "Social Media Marketing",
    description:
      "In a digital landscape where social media reigns supreme, 4Biz International stands as your strategic partner to turn platforms like Facebook, Instagram, LinkedIn, and Twitter into powerful catalysts for brand success. We don't just manage social media; we craft digital narratives that elevate your brand's online presence. Our approach is a fusion of strategy, engagement, and content excellence.",
    points: ["Brand Success Catalysts", "Digital Narratives", "Strategy & Engagement", "Content Excellence"],
    colorClass: "from-cyan-500 to-blue-600",
    activeTabClass: "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30",
    images: [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1611244419377-b0a760c19719?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=500&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "hosting",
    title: "Domain & Hosting",
    subtitle: "Domain & Hosting Solutions",
    description:
      "At 4Biz, we offer our own fast and reliable hosting solutions. We use cutting-edge technology and high-performance hardware for exceptional results. Our dedicated servers provide fast and dependable hosting for websites and web apps. Whether you need hosting packages, Site Lock, SSL Certificates, or Hacking Protection, we've got you covered.",
    points: ["Fast & Reliable Infrastructure", "High-Performance Hardware", "Site Lock & SSL Certificates", "Advanced Hacking Protection"],
    colorClass: "from-teal-500 to-emerald-600",
    activeTabClass: "bg-teal-500 text-white shadow-lg shadow-teal-500/30",
    images: [
      "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "content-mkt",
    title: "Content Marketing",
    subtitle: "Content Marketing Services",
    description:
      "In the dynamic realm of digital marketing, content reigns supreme, and at 4Biz, we understand that quality content is the heartbeat of a successful strategy. Our Content Marketing services go beyond the ordinary, incorporating key elements that ensure your brand stands out in the digital landscape.",
    points: ["Quality Content Generation", "Strategic Brand Execution", "Amplify Digital Footprint", "Enhanced Copywriting Layouts"],
    colorClass: "from-orange-500 to-amber-600",
    activeTabClass: "bg-orange-500 text-white shadow-lg shadow-orange-500/30",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "email-sms",
    title: "Email & SMS Marketing",
    subtitle: "Email And SMS Marketing Campaigning",
    description:
      "At 4Biz, we understand the power of effective email marketing and SMS campaigns in today's digital landscape. Our comprehensive services are designed to help businesses reach their target audience, engage with customers, and drive measurable results with eye-catching responsive templates.",
    points: ["Target Audience Optimization", "Compelling Content Architecture", "Eye-catching Creative Templates", "Measurable Conversion Tracking"],
    colorClass: "from-purple-600 to-indigo-700",
    activeTabClass: "bg-purple-600 text-white shadow-lg shadow-purple-600/30",
    images: [
      "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1479920252409-6e3d8e8d4866?w=500&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "branding-service",
    title: "Branding",
    subtitle: "Corporate Branding and Identity Design",
    description:
      "Branding is about creating a distinct image through consistent advertising to stand out, attract loyal customers, and leave an impact. We have a unique approach for building strong brands. It requires a systematic strategy to make a lasting impression. It's not just about quality; it's about how you present your brand.",
    points: ["Distinct Identity Generation", "Consistent Media Advertising", "Systematic Strategic Layouts", "Lasting Impression Frameworks"],
    colorClass: "from-emerald-600 to-teal-700",
    activeTabClass: "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30",
    images: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=500&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "media-production",
    title: "Photoshoot & Video",
    subtitle: "Photoshoot And Videoshoot Production",
    description:
      "In the expansive realm of professional photography and video services, 4Biz emerges as your dedicated partner, committed to translating your brand vision into captivating visual stories. Our skilled team doesn't just wield technical prowess; they bring a creative passion that breathes life into every frame.",
    points: ["Captivating Visual Stories", "High-tier Creative Execution", "Professional Studio Gear", "Immersive Visual Experiences"],
    colorClass: "from-rose-600 to-red-700",
    activeTabClass: "bg-rose-600 text-white shadow-lg shadow-rose-600/30",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=500&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "crm",
    title: "CRM Software",
    subtitle: "Customer Relationship Management Systems",
    description:
      "At 4Biz International, we present a cutting-edge CRM (Customer Relationship Management) software solution designed to revolutionize how you manage and nurture customer relationships. Our CRM is not just a tool; it's a dynamic ecosystem equipped to enhance your customer management to unique levels.",
    points: ["Revolutionized Client Care", "Dynamic Client Ecosystems", "Advanced Interaction Audits", "Automated Retention Pipelines"],
    colorClass: "from-blue-500 to-cyan-600",
    activeTabClass: "bg-blue-500 text-white shadow-lg shadow-blue-500/30",
    images: [
      "https://images.unsplash.com/photo-1552581234-2612b75d8953?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=500&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "it-infra",
    title: "IT Infrastructure",
    subtitle: "Enterprise IT Infrastructure Engineering",
    description:
      "We specialize in modern, cost-effective IT infrastructure solutions, including structured cabling, networking, security, servers, and more. Our services also encompass system integration and managed services to support your business scaling safely and efficiently.",
    points: ["Structured Cabling Designs", "Secure Enterprise Networks", "High-Availability Configurations", "Managed Hardware Systems"],
    colorClass: "from-slate-600 to-slate-800",
    activeTabClass: "bg-slate-600 text-white shadow-lg shadow-slate-600/30",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=500&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "app-dev",
    title: "Mobile App Dev",
    subtitle: "Mobile Application Development Infrastructure",
    description:
      "Embark on a journey of digital transformation with 4Biz International as your dedicated innovation partner. We cater to entrepreneurs, businesses, and startups, managing the entire app development cycle from concept to a fully realized product. Our skilled team specializes in delivering strategically designed mobile app solutions.",
    points: ["Full-Cycle Application Dev", "Cross-Platform Native Design", "Performance Optimization", "Scalable Store Management"],
    colorClass: "from-orange-600 to-amber-700",
    activeTabClass: "bg-orange-600 text-white shadow-lg shadow-orange-600/30",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "cms",
    title: "CMS Software",
    subtitle: "Content Management Framework Systems",
    description:
      "At 4Biz International, we bring you the power of advanced CMS (Content Management System) technology for seamless and efficient digital content management. Our solutions cater to both enterprise and web content needs, fostering workplace collaboration through integrated document and asset management.",
    points: ["Advanced Content Frameworks", "Enterprise Architecture Assets", "Integrated Collaborative Systems", "Fluid Content Asset Lifecycles"],
    colorClass: "from-violet-600 to-fuchsia-700",
    activeTabClass: "bg-violet-600 text-white shadow-lg shadow-violet-600/30",
    images: [
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "erp",
    title: "4Biz ERP Solutions",
    subtitle: "Modular Enterprise Resource Planning",
    description:
      "4Biz ERP stands as a flexible and comprehensive solution meticulously designed to meet the unique needs of retail, supply chain distribution, and manufacturing industries. Tailor your ERP experience by selecting the modules that align with your business requirements, and scale up effortlessly as your business grows.",
    points: ["Retail & Manufacturing Sync", "Supply Chain Optimization", "Modular Engine Scaling", "High Investment Returns"],
    colorClass: "from-amber-600 to-yellow-700",
    activeTabClass: "bg-amber-600 text-white shadow-lg shadow-amber-600/30",
    images: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "brand-story",
    title: "Brand Story",
    subtitle: "Strategic Performance and Vision Evolution",
    description:
      "At 4Biz International, we see a digital landscape full of untapped potential. We transform that potential into performance by merging cutting-edge technological innovation with master-class strategic planning. Our mission is to scale your vision, optimize your operations, and ensure your business leads the evolution.",
    points: ["Performance Evolution Scaling", "Technological Innovations", "Masterclass Strategic Planning", "Operational Infrastructure Audits"],
    colorClass: "from-red-600 to-pink-700",
    activeTabClass: "bg-red-600 text-white shadow-lg shadow-red-600/30",
    images: [
      "https://images.unsplash.com/photo-1542204172-e7052809a86e?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60"
    ]
  }
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % servicesData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + servicesData.length) % servicesData.length);
  };

  const currentService = servicesData[activeIndex];

  return (
    <section className="w-full bg-[#0f172a] py-20 px-4 md:px-8 lg:px-16 text-white overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading matching original layout semantics */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 tracking-tight">
            What we do <span className="text-cyan-400">?</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-medium max-w-xl mx-auto">
            Discover our comprehensive suite of advanced digital capabilities tailored for modern enterprises.
          </p>
        </div>

        {/* Content Container Frame - Light Dark Blue Background */}
        <div className="bg-[#1e293b]/60 border border-slate-700/60 rounded-[2.5rem] p-5 md:p-8 lg:p-10 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col lg:flex-row gap-8 items-stretch min-h-[580px]">
            
            {/* LEFT COLUMN: NAVIGATION TABS (Desktop / Tablet Vertical Scroll Viewport) */}
            <div className="hidden md:flex flex-col justify-start items-center w-full lg:w-1/4 gap-2 relative border-r border-slate-700/40 pr-0 lg:pr-6 max-h-[580px] overflow-y-auto custom-scrollbar">
              <div className="text-slate-500 animate-pulse mb-1 hidden lg:block sticky top-0 bg-[#1e293b]/10 backdrop-blur-xs py-1 w-full text-center">
                <ChevronUp size={18} className="mx-auto" />
              </div>

              {servicesData.map((service, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveIndex(index)}
                    className={`w-full max-w-[240px] px-5 py-3.5 rounded-2xl text-left font-semibold transition-all duration-300 transform text-sm ${
                      isActive
                        ? service.activeTabClass + " scale-[1.03] shadow-md"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    {service.title}
                  </button>
                );
              })}

              <div className="text-slate-500 animate-pulse mt-1 hidden lg:block sticky bottom-0 bg-[#1e293b]/10 backdrop-blur-xs py-1 w-full text-center">
                <ChevronDown size={18} className="mx-auto" />
              </div>
            </div>

            {/* MOBILE ONLY NAVIGATION SLIDER CONTROLS */}
            <div className="md:hidden flex items-center justify-between bg-[#334155]/60 p-3.5 rounded-2xl border border-slate-700/50 shadow-inner">
              <button 
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 active:scale-95 transition-all"
                aria-label="Previous capability"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="font-bold text-sm tracking-wide text-cyan-400 text-center px-2">
                {currentService.title}
              </span>
              <button 
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 active:scale-95 transition-all"
                aria-label="Next capability"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* RIGHT COLUMN: MAIN CONTENT GRADIENT BOX (Preserves exact layouts & alignment) */}
            <div className={`flex-1 rounded-[2rem] bg-gradient-to-br ${currentService.colorClass} p-6 md:p-8 lg:p-10 text-white shadow-2xl flex flex-col xl:flex-row gap-8 transition-all duration-500 ease-in-out relative overflow-hidden`}>
              
              {/* Decorative Vector Texture Pattern Overlays */}
              <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay scale-150 transform rotate-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

              {/* Text Side */}
              <div className="flex-1 flex flex-col justify-between z-10 space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-tight leading-snug drop-shadow-md">
                    {currentService.subtitle}
                  </h3>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed font-normal text-justify tracking-wide">
                    {currentService.description}
                  </p>
                </div>

                {/* Bullets/Capability Points Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {currentService.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-center space-x-2 text-sm font-semibold tracking-wide drop-shadow-sm">
                      <span className="text-white/70 font-black text-xs select-none">»</span>
                      <span className="hover:translate-x-1 transition-transform duration-200 cursor-default">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layout Mockup Display Panels Side */}
              <div className="w-full xl:w-[45%] flex flex-col sm:grid sm:grid-cols-2 xl:flex xl:flex-col gap-4 relative justify-center items-center xl:items-end min-h-[300px] z-10 mt-4 xl:mt-0">
                
                {/* Panel 1: Top Right Floating Card */}
                <div className="w-full max-w-[220px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/20 transform hover:scale-105 hover:-rotate-1 transition-all duration-300 sm:justify-self-end">
                  <img 
                    src={currentService.images[0]} 
                    alt={`${currentService.title} asset overview primary`} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Panel 2: Offset Overlapping Mid Card */}
                <div className="w-full max-w-[200px] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/20 transform xl:-translate-x-14 xl:-translate-y-2 hover:scale-105 hover:rotate-2 transition-all duration-300 sm:justify-self-start">
                  <img 
                    src={currentService.images[1]} 
                    alt={`${currentService.title} asset viewport layout`} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Panel 3: Bottom Right Anchored Card */}
                <div className="w-full max-w-[230px] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/20 transform xl:-translate-y-4 hover:scale-105 hover:-rotate-1 transition-all duration-300 sm:col-span-2 sm:justify-self-center xl:justify-self-end">
                  <img 
                    src={currentService.images[2]} 
                    alt={`${currentService.title} detailed feature setup`} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Embedded CSS Style Blocks for scrollbar styling safely inside standard components */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </section>
  );
}