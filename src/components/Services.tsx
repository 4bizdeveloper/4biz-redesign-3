"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
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
    colorClass: "from-blue-700/95 to-purple-700/95",
    activeTabClass: "bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/20",
    images: [
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543013309-0d1f4edeb868?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "seo",
    title: "SEO",
    subtitle: "Search Engine Optimization",
    description:
      "In the ever-evolving digital landscape, the visibility of your business in search engine results is paramount to your online success. At 4Biz International, we understand the critical importance of Search Engine Optimization (SEO) as an integral element of your marketing strategy. Our approach goes above and beyond conventional strategies to ensure that your website not only ranks high but shines brightly in the online realm.",
    points: ["Search Engine Visibility", "Conventional Strategy Integration", "High Keyword Rankings", "Digital Landscape Adaptation"],
    colorClass: "from-indigo-700/95 to-blue-800/95",
    activeTabClass: "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/20",
    images: [
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1557838923-2985c318be48?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "ms-dynamics",
    title: "Microsoft Dynamics 365",
    subtitle: "Microsoft Dynamics 365 Integration",
    description:
      "At 4biz International, we take pride in offering an unparalleled solution to transform and empower your business—Microsoft Dynamics 365. This all-in-one platform seamlessly integrates Customer Relationship Management (CRM) and Enterprise Resource Planning (ERP), providing a unified system to streamline operations and elevate your overall business efficiency.",
    points: ["All-in-one Platform", "CRM & ERP Integration", "Streamlined Operations", "Business Efficiency Boost"],
    colorClass: "from-pink-700/95 to-purple-800/95",
    activeTabClass: "bg-pink-600 text-white shadow-lg shadow-pink-600/30 border border-pink-400/20",
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "smm",
    title: "Social Media",
    subtitle: "Social Media Marketing",
    description:
      "In a digital landscape where social media reigns supreme, 4Biz International stands as your strategic partner to turn platforms like Facebook, Instagram, LinkedIn, and Twitter into powerful catalysts for brand success. We don't just manage social media; we craft digital narratives that elevate your brand's online presence. Our approach is a fusion of strategy, engagement, and content excellence.",
    points: ["Brand Success Catalysts", "Digital Narratives", "Strategy & Engagement", "Content Excellence"],
    colorClass: "from-cyan-600/95 to-blue-700/95",
    activeTabClass: "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 border border-cyan-400/20",
    images: [
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579869847514-7c1a19d2d2ad?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "hosting",
    title: "Domain & Hosting",
    subtitle: "Domain & Hosting Solutions",
    description:
      "At 4Biz, we offer our own fast and reliable hosting solutions. We use cutting-edge technology and high-performance hardware for exceptional results. Our dedicated servers provide fast and dependable hosting for websites and web apps. Whether you need hosting packages, Site Lock, SSL Certificates, or Hacking Protection, we've got you covered.",
    points: ["Fast & Reliable Infrastructure", "High-Performance Hardware", "Site Lock & SSL Certificates", "Advanced Hacking Protection"],
    colorClass: "from-teal-600/95 to-emerald-700/95",
    activeTabClass: "bg-teal-500 text-white shadow-lg shadow-teal-500/30 border border-teal-400/20",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "content-mkt",
    title: "Content Marketing",
    subtitle: "Content Marketing Services",
    description:
      "In the dynamic realm of digital marketing, content reigns supreme, and at 4Biz, we understand that quality content is the heartbeat of a successful strategy. Our Content Marketing services go beyond the ordinary, incorporating key elements that ensure your brand stands out in the digital landscape.",
    points: ["Quality Content Generation", "Strategic Brand Execution", "Amplify Digital Footprint", "Enhanced Copywriting Layouts"],
    colorClass: "from-orange-600/95 to-amber-700/95",
    activeTabClass: "bg-orange-500 text-white shadow-lg shadow-orange-500/30 border border-orange-400/20",
    images: [
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "email-sms",
    title: "Email & SMS Marketing",
    subtitle: "Email And SMS Marketing Campaigning",
    description:
      "At 4Biz, we understand the power of effective email marketing and SMS campaigns in today's digital landscape. Our comprehensive services are designed to help businesses reach their target audience, engage with customers, and drive measurable results with eye-catching responsive templates.",
    points: ["Target Audience Optimization", "Compelling Content Architecture", "Eye-catching Creative Templates", "Measurable Conversion Tracking"],
    colorClass: "from-purple-700/95 to-indigo-800/95",
    activeTabClass: "bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400/20",
    images: [
      "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "branding-service",
    title: "Branding",
    subtitle: "Corporate Branding and Identity Design",
    description:
      "Branding is about creating a distinct image through consistent advertising to stand out, attract loyal customers, and leave an impact. We have a unique approach for building strong brands. It requires a systematic strategy to make a lasting impression. It's not just about quality; it's about how you present your brand.",
    points: ["Distinct Identity Generation", "Consistent Media Advertising", "Systematic Strategic Layouts", "Lasting Impression Frameworks"],
    colorClass: "from-emerald-700/95 to-teal-800/95",
    activeTabClass: "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-400/20",
    images: [
      "https://images.unsplash.com/photo-1636633762833-5d1658f1e29b?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1501769752-a59efa2298ce?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "media-production",
    title: "Photoshoot & Video",
    subtitle: "Photoshoot And Videoshoot Production",
    description:
      "In the expansive realm of professional photography and video services, 4Biz emerges as your dedicated partner, committed to translating your brand vision into captivating visual stories. Our skilled team doesn't just wield technical prowess; they bring a creative passion that breathes life into every frame.",
    points: ["Captivating Visual Stories", "High-tier Creative Execution", "Professional Studio Gear", "Immersive Visual Experiences"],
    colorClass: "from-rose-700/95 to-red-800/95",
    activeTabClass: "bg-rose-600 text-white shadow-lg shadow-rose-600/30 border border-rose-400/20",
    images: [
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "crm",
    title: "CRM Software",
    subtitle: "Customer Relationship Management Systems",
    description:
      "At 4Biz International, we present a cutting-edge CRM (Customer Relationship Management) software solution designed to revolutionize how you manage and nurture customer relationships. Our CRM is not just a tool; it's a dynamic ecosystem equipped to enhance your customer management to unique levels.",
    points: ["Revolutionized Client Care", "Dynamic Client Ecosystems", "Advanced Interaction Audits", "Automated Retention Pipelines"],
    colorClass: "from-blue-600/95 to-cyan-700/95",
    activeTabClass: "bg-blue-500 text-white shadow-lg shadow-blue-500/30 border border-blue-400/20",
    images: [
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "it-infra",
    title: "IT Infrastructure",
    subtitle: "Enterprise IT Infrastructure Engineering",
    description:
      "We specialize in modern, cost-effective IT infrastructure solutions, including structured cabling, networking, security, servers, and more. Our services also encompass system integration and managed services to support your business scaling safely and efficiently.",
    points: ["Structured Cabling Designs", "Secure Enterprise Networks", "High-Availability Configurations", "Managed Hardware Systems"],
    colorClass: "from-slate-700/95 to-slate-900/95",
    activeTabClass: "bg-slate-600 text-white shadow-lg shadow-slate-600/30 border border-slate-400/20",
    images: [
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "app-dev",
    title: "Mobile App Dev",
    subtitle: "Mobile Application Development Infrastructure",
    description:
      "Embark on a journey of digital transformation with 4Biz International as your dedicated innovation partner. We cater to entrepreneurs, businesses, and startups, managing the entire app development cycle from concept to a fully realized product. Our skilled team specializes in delivering strategically designed mobile app solutions.",
    points: ["Full-Cycle Application Dev", "Cross-Platform Native Design", "Performance Optimization", "Scalable Store Management"],
    colorClass: "from-orange-700/95 to-amber-800/95",
    activeTabClass: "bg-orange-600 text-white shadow-lg shadow-orange-600/30 border border-orange-400/20",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "cms",
    title: "CMS Software",
    subtitle: "Content Management Framework Systems",
    description:
      "At 4Biz International, we bring you the power of advanced CMS (Content Management System) technology for seamless and efficient digital content management. Our solutions cater to both enterprise and web content needs, fostering workplace collaboration through integrated document and asset management.",
    points: ["Advanced Content Frameworks", "Enterprise Architecture Assets", "Integrated Collaborative Systems", "Fluid Content Asset Lifecycles"],
    colorClass: "from-violet-700/95 to-fuchsia-800/95",
    activeTabClass: "bg-violet-600 text-white shadow-lg shadow-violet-600/30 border border-violet-400/20",
    images: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "erp",
    title: "4Biz ERP Solutions",
    subtitle: "Modular Enterprise Resource Planning",
    description:
      "4Biz ERP stands as a flexible and comprehensive solution meticulously designed to meet the unique needs of retail, supply chain distribution, and manufacturing industries. Tailor your ERP experience by selecting the modules that align with your business requirements, and scale up effortlessly as your business grows.",
    points: ["Retail & Manufacturing Sync", "Supply Chain Optimization", "Modular Engine Scaling", "High Investment Returns"],
    colorClass: "from-amber-700/95 to-yellow-800/95",
    activeTabClass: "bg-amber-600 text-white shadow-lg shadow-amber-600/30 border border-amber-400/20",
    images: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "brand-story",
    title: "Brand Story",
    subtitle: "Strategic Performance and Vision Evolution",
    description:
      "At 4Biz International, we see a digital landscape full of untapped potential. We transform that potential into performance by merging cutting-edge technological innovation with master-class strategic planning. Our mission is to scale your vision, optimize your operations, and ensure your business leads the evolution.",
    points: ["Performance Evolution Scaling", "Technological Innovations", "Masterclass Strategic Planning", "Operational Infrastructure Audits"],
    colorClass: "from-red-700/95 to-pink-800/95",
    activeTabClass: "bg-red-600 text-white shadow-lg shadow-red-600/30 border border-red-400/20",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&auto=format&fit=crop&q=80"
    ]
  }
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleCards, setVisibleCards] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % servicesData.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + servicesData.length) % servicesData.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleTabClick = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 400);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer && scrollContainer.children[activeIndex]) {
      const activeElement = scrollContainer.children[activeIndex] as HTMLElement;
      scrollContainer.scrollTo({
        top: activeElement.offsetTop - scrollContainer.offsetTop - 40,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards(true);
          }
        });
      },
      { threshold: 0.05 }
    );
    if (currentSection) observer.observe(currentSection);
    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, []);

  const currentService = servicesData[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="services-section w-full py-16 md:py-24 px-4 md:px-8 lg:px-16 text-white overflow-hidden select-none relative bg-[#0b1d3a]"
    >
      {/* BACKGROUND GRAPHICS */}
      <div className="absolute inset-0 services-bg pointer-events-none z-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 services-lines-overlay z-0" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute top-[30%] right-[5%] w-[500px] h-[500px] rounded-full bg-indigo-500/15 blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[40%] w-[550px] h-[550px] rounded-full bg-cyan-500/18 blur-[110px]" />
      </div>

      <div className={`max-w-7xl mx-auto relative z-10 transition-all duration-700 ${visibleCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-normal drop-shadow-md">
            What we do <span className="text-cyan-400">?</span>
          </h2>
          <p className="text-slate-300 text-sm md:text-base font-medium max-w-xl mx-auto tracking-normal">
            Discover our comprehensive suite of advanced digital capabilities tailored for modern enterprises.
          </p>
        </div>

        {/* Main Frame */}
        <div className="main-panel bg-white/[0.05] border border-white/[0.12] rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-8 lg:p-12 shadow-2xl backdrop-blur-md xl:pr-20">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-stretch min-h-auto lg:min-h-[600px]">

            {/* Navigation Tabs (Desktop) */}
            <div className="hidden md:flex flex-col justify-start items-center w-full lg:w-[220px] shrink-0 gap-2 relative border-r border-white/[0.1] pr-0 lg:pr-6 max-h-[600px]">
              <button
                onClick={handlePrev}
                className="text-slate-400 hover:text-cyan-400 transition-colors py-2 w-full text-center sticky top-0 backdrop-blur-sm z-20 cursor-pointer hidden lg:block bg-transparent border-0"
                aria-label="Scroll Up"
              >
                <ChevronUp size={22} className="mx-auto animate-bounce" />
              </button>

              <div
                ref={scrollContainerRef}
                className="w-full flex flex-col gap-1.5 overflow-y-auto custom-scrollbar max-h-[500px] py-1 items-center"
              >
                {servicesData.map((service, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={service.id}
                      onClick={() => handleTabClick(index)}
                      className={`w-full max-w-[220px] px-4 py-3.5 rounded-2xl text-left font-bold transition-all duration-300 transform text-sm leading-tight tracking-normal border-0 cursor-pointer ${
                        isActive
                          ? service.activeTabClass + " scale-[1.02]"
                          : "text-slate-300 bg-transparent hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {service.title}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNext}
                className="text-slate-400 hover:text-cyan-400 transition-colors py-2 w-full text-center sticky bottom-0 backdrop-blur-sm z-20 cursor-pointer hidden lg:block bg-transparent border-0"
                aria-label="Scroll Down"
              >
                <ChevronDown size={22} className="mx-auto animate-bounce" />
              </button>
            </div>

            {/* Mobile Prev/Next Controls */}
            <div className="md:hidden flex items-center justify-between bg-white/10 p-3 rounded-2xl border border-white/15 shadow-inner">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-white/10 text-white border border-white/10 hover:bg-white/15 active:scale-95 transition-all cursor-pointer"
                aria-label="Previous service"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="font-bold text-sm tracking-normal text-cyan-400 text-center px-2">
                {currentService.title}
              </span>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-white/10 text-white border border-white/10 hover:bg-white/15 active:scale-95 transition-all cursor-pointer"
                aria-label="Next service"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Content Card Panel */}
            <div
              ref={contentRef}
              className={`content-card flex-1 rounded-[2rem] bg-gradient-to-br ${currentService.colorClass} p-6 md:p-10 lg:p-12 text-white shadow-2xl flex flex-col xl:flex-row gap-8 xl:gap-12 relative overflow-hidden xl:overflow-visible transition-all duration-500 ease-in-out`}
            >
              {/* Mesh visual overlay background layers */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem] z-0" aria-hidden="true">
                <div
                  className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-25 mix-blend-overlay"
                  style={{ "--bg-feat": "url('/service-bg-1.png')" } as React.CSSProperties}
                  id="card-texture-layer"
                />
                <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[110%] rounded-full bg-white/15 blur-[100px] mix-blend-screen animate-pulse-slow" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[80%] h-[90%] rounded-full bg-black/30 blur-[90px] mix-blend-multiply" />
              </div>

              {/* Text Block Columns */}
              <div className="flex-1 flex flex-col justify-between z-10 space-y-6 md:space-y-8 relative" style={{ isolation: "isolate" }}>
                <div>
                  <h3 className="text-xl md:text-3xl lg:text-4xl font-black mb-4 md:mb-5 tracking-normal leading-snug drop-shadow-lg text-left">
                    {currentService.subtitle}
                  </h3>
                  <p className="text-white/95 text-sm md:text-base leading-relaxed font-normal text-left tracking-normal drop-shadow-sm max-w-2xl">
                    {currentService.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-4 border-t border-white/10">
                  {currentService.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-center space-x-3 text-sm md:text-base font-extrabold tracking-normal drop-shadow-md group/item">
                      <span className="text-white/80 font-black text-base select-none transition-transform group-hover/item:translate-x-1">»</span>
                      <span className="transition-transform duration-200 cursor-default group-hover/item:text-cyan-200 text-left">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Images Display Stack */}
              <div className="w-full xl:w-[42%] flex flex-row sm:flex-col xl:flex-col gap-4 md:gap-6 relative justify-center items-center xl:items-end z-20 mt-2 xl:mt-0 xl:-mr-20">

                <div className="img-panel img-panel-1 w-full max-w-[160px] sm:max-w-[200px] md:max-w-[240px] aspect-[4/3] relative rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] border-2 border-white/20 xl:-mt-16 xl:-mr-6 hover:scale-105 hover:-rotate-2 transition-all duration-500 shrink-0">
                  <Image
                    src={currentService.images[0]}
                    alt={`${currentService.title} primary visual`}
                    fill
                    sizes="(max-w-768px) 240px, 480px"
                    className="object-cover"
                    priority={activeIndex === 0}
                  />
                </div>

                <div className="img-panel img-panel-2 w-full max-w-[140px] sm:max-w-[180px] md:max-w-[210px] aspect-square relative rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border-2 border-white/20 xl:translate-x-6 xl:rotate-3 hover:scale-105 transition-all duration-500 shrink-0">
                  <Image
                    src={currentService.images[1]}
                    alt={`${currentService.title} secondary visual`}
                    fill
                    sizes="(max-w-768px) 210px, 420px"
                    className="object-cover"
                  />
                </div>

                <div className="img-panel img-panel-3 hidden sm:block w-full max-w-[180px] md:max-w-[260px] aspect-[16/10] relative rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)] border-2 border-white/20 xl:-mb-14 xl:-mr-10 xl:-rotate-6 hover:scale-105 hover:-rotate-3 transition-all duration-500 shrink-0 xl:self-end">
                  <Image
                    src={currentService.images[2]}
                    alt={`${currentService.title} feature visual`}
                    fill
                    sizes="(max-w-768px) 260px, 520px"
                    className="object-cover"
                  />
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Indicator Dots (Mobile Device Targets) */}
        <div className="flex justify-center gap-1.5 mt-6 lg:hidden" aria-label="Service navigation dots">
          {servicesData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`rounded-full transition-all duration-300 border-0 cursor-pointer ${
                index === activeIndex
                  ? "w-6 h-2 bg-cyan-400"
                  : "w-2 h-2 bg-slate-500 hover:bg-slate-400"
              }`}
              aria-label={`Go to ${servicesData[index].title}`}
            />
          ))}
        </div>

      </div>

      <style jsx global>{`
        .services-bg {
          background:
            radial-gradient(ellipse 80% 40% at 10% 0%, #1e3f7a 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 90% 50%, #14356e 0%, transparent 55%),
            radial-gradient(ellipse 80% 50% at 50% 110%, #0d244a 0%, transparent 60%),
            linear-gradient(175deg, #163265 0%, #102752 30%, #0d2044 65%, #0b1d3a 100%);
        }

        .services-lines-overlay {
          background-image:
            repeating-linear-gradient(
              -55deg,
              transparent,
              transparent 40px,
              rgba(255,255,255,0.025) 40px,
              rgba(255,255,255,0.025) 41px
            ),
            repeating-linear-gradient(
              35deg,
              transparent,
              transparent 60px,
              rgba(255,255,255,0.018) 60px,
              rgba(255,255,255,0.018) 61px
            );
        }

        #card-texture-layer {
          background-image: var(--bg-feat);
        }

        .custom-scrollbar::-webkit-scrollbar { 
          width: 6px; 
        }
        .custom-scrollbar::-webkit-scrollbar-track { 
          background: transparent; 
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: #475569; 
          border-radius: 10px;
          min-height: 40px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { 
          background: #64748b; 
        }

        @keyframes pulse-slow { 0%,100% { opacity:.7; } 50% { opacity:.3; } }
        .animate-pulse-slow { animation: pulse-slow 10s ease-in-out infinite; }

        @supports (animation-timeline: view()) {
          @media (min-width: 1024px) {
            .services-section {
              perspective: 1200px;
            }

            .main-panel {
              animation: panelScrollTilt linear both;
              animation-timeline: view();
              animation-range: entry 0% exit 100%;
              transform-style: preserve-3d;
              will-change: transform;
            }

            .content-card {
              animation: contentCardParallax linear both;
              animation-timeline: view();
              animation-range: entry 5% exit 95%;
              will-change: transform;
            }

            .img-panel-1 {
              animation: imgParallaxA linear both;
              animation-timeline: view();
              animation-range: entry 0% exit 100%;
              will-change: transform;
            }
            .img-panel-2 {
              animation: imgParallaxB linear both;
              animation-timeline: view();
              animation-range: entry 0% exit 100%;
              will-change: transform;
            }
            .img-panel-3 {
              animation: imgParallaxC linear both;
              animation-timeline: view();
              animation-range: entry 0% exit 100%;
              will-change: transform;
            }
          }
        }

        @keyframes panelScrollTilt {
          0%   { transform: rotateX(4deg) rotateY(-2deg) translateY(16px); }
          40%  { transform: rotateX(0deg) rotateY(0deg) translateY(0px); }
          60%  { transform: rotateX(0deg) rotateY(0deg) translateY(0px); }
          100% { transform: rotateX(-4deg) rotateY(2deg) translateY(-16px); }
        }

        @keyframes contentCardParallax {
          0%   { transform: translateY(12px) scale(0.99); }
          50%  { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-12px) scale(0.99); }
        }

        @keyframes imgParallaxA {
          0%   { transform: translateY(24px) scale(0.95) rotate(-2deg); }
          50%  { transform: translateY(0px) scale(1) rotate(-1deg); }
          100% { transform: translateY(-24px) scale(0.96) rotate(1deg); }
        }

        @keyframes imgParallaxB {
          0%   { transform: translateY(-20px) scale(1.02) rotate(3deg); }
          50%  { transform: translateY(0px) scale(0.99) rotate(3deg); }
          100% { transform: translateY(20px) scale(1.01) rotate(1deg); }
        }

        @keyframes imgParallaxC {
          0%   { transform: translateY(35px) scale(0.92) rotate(1deg); filter: blur(0.5px); }
          50%  { transform: translateY(0px) scale(1) rotate(0deg); filter: blur(0px); }
          100% { transform: translateY(-35px) scale(0.94) rotate(-2deg); filter: blur(0.5px); }
        }

        @media (max-width: 479px) {
          .img-panel { max-width: 120px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .img-panel,
          .main-panel,
          .content-card,
          .animate-bounce,
          .animate-pulse-slow {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}