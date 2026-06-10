"use client";

import React, { useState, memo, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiRocketLine, 
  RiCheckboxCircleLine, 
  RiErrorWarningLine, 
  RiLoader4Line, 
  RiShieldCheckLine, 
  RiRefreshLine,
  RiMailLine,
  RiWhatsappLine,
  RiMapPinLine
} from 'react-icons/ri';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

// ─── CAPTCHA UTILS ────────────────────────────────────────────────────────────
const generateCaptcha = () => {
  const ops = ['+', '−', '×'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a: number, b: number, answer: number;

  if (op === '+') {
    a = Math.floor(Math.random() * 20) + 1;
    b = Math.floor(Math.random() * 20) + 1;
    answer = a + b;
  } else if (op === '−') {
    a = Math.floor(Math.random() * 10) + 10;
    b = Math.floor(Math.random() * 10) + 1;
    answer = a - b;
  } else {
    a = Math.floor(Math.random() * 9) + 2;
    b = Math.floor(Math.random() * 9) + 2;
    answer = a * b;
  }
  return { a, b, op, answer };
};

// ─── CAPTCHA WIDGET ───────────────────────────────────────────────────────────
const CaptchaWidget = memo(({ onVerify }: { onVerify: (val: boolean) => void }) => {
  const [captcha, setCaptcha] = useState<{a: number, b: number, op: string, answer: number} | null>(null);
  const [input, setInput] = useState('');
  const [shake, setShake] = useState(false);
  const [verified, setVerified] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCaptcha(generateCaptcha());
  }, []);

  const refresh = useCallback(() => {
    setCaptcha(generateCaptcha());
    setInput('');
    setVerified(false);
    onVerify(false);
  }, [onVerify]);

  useEffect(() => {
    onVerify(verified);
  }, [verified, onVerify]);

  const handleCheck = useCallback(() => {
    if (captcha && parseInt(input, 10) === captcha.answer) {
      setVerified(true);
    } else {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setCaptcha(generateCaptcha());
        setInput('');
      }, 600);
    }
  }, [input, captcha]);

  if (!mounted || !captcha) return <div className="h-24 bg-white/10 animate-pulse rounded-xl" />;

  return (
    <motion.div
      className="captcha-container-isolated rounded-xl overflow-hidden backdrop-blur-md"
      animate={shake ? { x: [-6, 6, -5, 5, -3, 3, 0] } : {}}
      transition={{ duration: 0.45 }}
      style={{
        background: 'rgba(34, 211, 238, 0.08)',
        border: '1px solid rgba(34, 211, 238, 0.45)',
        boxShadow: '0 0 25px rgba(34, 211, 238, 0.15)',
      }}
    >
      <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-cyan-500/30 bg-cyan-950/20">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-cyan-400 flex items-center gap-1.5 font-bold">
          <RiShieldCheckLine className="text-sm text-purple-400 animate-pulse" /> Security Protocol
        </span>
        {!verified && (
          <button type="button" onClick={refresh} className="text-cyan-400 hover:text-cyan-200 transition-colors">
            <RiRefreshLine className="text-base" />
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {verified ? (
          <motion.div key="verified" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-3 px-4 py-4 bg-emerald-950/10">
            <RiCheckboxCircleLine className="text-emerald-400 text-xl shrink-0" />
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-emerald-400 font-bold">Identity Confirmed</span>
          </motion.div>
        ) : (
          <motion.div key="challenge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 px-4 py-4">
            <div className="shrink-0 font-mono text-lg font-bold tracking-tight select-none bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {captcha.a} {captcha.op} {captcha.b} =
            </div>
            <div className="flex-1 flex items-center gap-2">
              <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Answer"
                className="w-full min-w-0 text-base font-mono text-white bg-white/10 border-b-2 border-cyan-400/50 focus:border-purple-400 outline-none py-1 px-2 rounded-t transition-colors placeholder:text-white/40"
              />
              <button
                type="button"
                onClick={handleCheck}
                disabled={!input}
                className="shrink-0 text-[10px] font-mono font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500 text-white shadow-lg shadow-cyan-500/20 active:scale-95 disabled:opacity-40 disabled:scale-100 transition-all font-black"
              >
                Verify
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
CaptchaWidget.displayName = 'CaptchaWidget';

// ─── MAIN CONTACT SECTION ─────────────────────────────────────────────────────
const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [captchaPassed, setCaptchaPassed] = useState(false);
  const [captchaResetKey, setCaptchaResetKey] = useState(0);
  const [countryCode, setCountryCode] = useState(''); 
  const [phone, setPhone] = useState('');
  
  // Custom Validation Alert Triggers (positioned directly ABOVE their respective fields)
  const [validationAlerts, setValidationAlerts] = useState({
    name: false,
    email: false,
    phone: false,
    captcha: false
  });

  const [formShake, setFormShake] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const resolveLocation = async () => {
      try {
        const zone = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase();
        if (zone.includes('kolkata') || zone.includes('calcutta') || zone.includes('india')) {
          setCountryCode('in');
          return;
        }
        if (zone.includes('dubai') || zone.includes('asia/dubai') || zone.includes('abudhabi')) {
          setCountryCode('ae');
          return;
        }
      } catch (_) {}

      try {
        const locale = navigator.language || (navigator.languages && navigator.languages[0]);
        if (locale && locale.includes('-')) {
          const region = locale.split('-')[1].toLowerCase();
          if (region === 'in' || region === 'ae') {
            setCountryCode(region);
            return;
          }
        }
      } catch (_) {}

      try {
        const res = await fetch('https://ipapi.co/json/');
        if (res.ok) {
          const data = await res.json();
          if (data.country_code) {
            setCountryCode(data.country_code.toLowerCase()); 
            return;
          }
        }
      } catch (_) {}

      setCountryCode('ae');
    };

    resolveLocation();
  }, []);

  // Clear alerts instantly when user provides input
  const handleInputChange = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    setValidationAlerts(prev => ({
      ...prev,
      name: name ? false : prev.name,
      email: email ? false : prev.email
    }));
  };

  useEffect(() => {
    if (phone.trim().length > 4) {
      setValidationAlerts(prev => ({ ...prev, phone: false }));
    }
  }, [phone]);

  useEffect(() => {
    if (captchaPassed) {
      setValidationAlerts(prev => ({ ...prev, captcha: false }));
    }
  }, [captchaPassed]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Read raw values
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    // Evaluate exact errors
    const errors = {
      name: !name || !name.trim(),
      email: !email || !email.trim(),
      phone: !phone || phone.trim().length <= 4,
      captcha: !captchaPassed
    };

    // Update state to render alerts ABOVE fields
    setValidationAlerts(errors);

    // If any error exists, shake form container and block pipeline execution
    if (errors.name || errors.email || errors.phone || errors.captcha) {
      setFormShake(true);
      setTimeout(() => setFormShake(false), 500);
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    const payload = Object.fromEntries(formData.entries());
    payload.phone = phone;
    payload.countryCode = (countryCode || 'ae').toUpperCase(); 

    try {
      const response = await fetch('./send-mail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Server status: ${response.status}`);

      const result = await response.json();

      if (result.status === 'success') {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        setPhone('');
        setCaptchaPassed(false);
        setCaptchaResetKey(prev => prev + 1);

        setTimeout(() => {
          setStatus('idle');
        }, 3000);
      } else {
        throw new Error(result.message || 'Interrupted');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-28 px-4 md:px-10 relative overflow-hidden transform-gpu"
      style={{
        background: 'radial-gradient(circle at 50% 0%, #152054 0%, #0d1330 65%, #0e1847 100%)',
        contentVisibility: 'auto',
        contain: 'paint layout',
        containmentIntrinsicSize: '1px 1000px',
      } as React.CSSProperties}
    >
      {/* High-Tech Dynamic Aurora Glows - Brightened Opacities and radius */}
      <div className="absolute top-10 left-10 w-[280px] md:w-[600px] h-[280px] md:h-[600px] bg-gradient-to-tr from-cyan-500/25 via-blue-500/15 to-transparent rounded-full blur-[100px] md:blur-[140px] pointer-events-none transform-gpu animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[300px] md:w-[700px] h-[300px] md:h-[700px] bg-gradient-to-bl from-purple-500/25 via-teal-500/15 to-transparent rounded-full blur-[120px] md:blur-[160px] pointer-events-none transform-gpu" />

      {/* Futuristic Background Matrix Grid Overlay - Brightened opacity */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-80" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Modern Centered Header Section */}
        <div className="text-center mb-14 md:mb-20">
          <motion.h3 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter"
          >
            Contact Us <br className="xs:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.35)]">
              To Scale your Business
            </span>
          </motion.h3>
          <div className="w-20 md:w-28 h-[3px] bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-500 mx-auto mt-5 md:mt-6 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
        </div>

        {/* 2-Column Desktop Grid / Stacked Mobile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* COLUMN 1: INFORMATION CARDS STACKED (5 Columns) */}
          <div className="lg:col-span-5 space-y-5 md:space-y-6 order-2 lg:order-1">
            
            {/* Mail Infrastructure Card */}
            <a href="mailto:info@4bizinternational.com" className="info-gradient-card group flex items-center gap-4 p-5 rounded-2xl border border-cyan-500/30 backdrop-blur-md w-full">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400 text-xl group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.2)] shrink-0">
                <RiMailLine />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-bold">Mail Infrastructure</p>
                <p className="text-sm md:text-base font-semibold text-white truncate break-all mt-0.5">info@4bizinternational.com</p>
              </div>
            </a>

            {/* HQ Telecoms / WhatsApp Card (Perfectly Stacked Below) */}
            <div className="info-gradient-card flex items-start gap-4 p-5 rounded-2xl border border-purple-500/30 backdrop-blur-md w-full">
              <div className="w-12 h-12 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400 text-xl shadow-[0_0_15px_rgba(168,85,247,0.2)] shrink-0">
                <RiWhatsappLine />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-mono tracking-widest text-purple-400 uppercase font-bold">HQ Telecoms / WhatsApp</p>
                <div className="space-y-0.5 mt-1">
                  <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                    +971 52 79 25 100 <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono font-bold tracking-wide border border-cyan-500/20">(DUBAI)</span>
                  </p>
                  <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                    +91 98957 17879 <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded font-mono font-bold tracking-wide border border-purple-500/20">(INDIA)</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Dubai Location */}
            <div className="info-gradient-card p-5 md:p-6 rounded-2xl border border-cyan-500/30 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-400 text-lg shrink-0 mt-0.5 border border-cyan-500/20">
                  <RiMapPinLine />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2 flex-wrap">
                    Dubai Corporate Hub <span className="px-2 py-0.5 text-[9px] bg-cyan-500/20 text-cyan-300 rounded font-mono font-bold uppercase tracking-wide border border-cyan-500/20">Global HQ</span>
                  </h4>
                  <p className="text-xs text-white/80 mt-2 leading-relaxed font-medium">
                    Crystal Building - Office # 104 - 2C St - near ADCB Metro Station - Al Karama - Dubai, UAE
                  </p>
                </div>
              </div>
            </div>

            {/* India Location 1 */}
            <div className="info-gradient-card p-5 md:p-6 rounded-2xl border border-purple-500/30 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-400 text-lg shrink-0 mt-0.5 border border-purple-500/20">
                  <RiMapPinLine />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2 flex-wrap">
                    India HiLite Business Park <span className="px-2 py-0.5 text-[9px] bg-purple-500/20 text-purple-300 rounded font-mono font-bold uppercase tracking-wide border border-purple-500/20">Tech Wing</span>
                  </h4>
                  <p className="text-xs text-white/80 mt-2 leading-relaxed font-medium">
                    Tower 2, HiLITE Business Park, Office 2723, 7th Floor, near HiLITE Mall, Poovangal, Pantheeramkavu, Kozhikode, Kerala 673014, India
                  </p>
                </div>
              </div>
            </div>

            {/* India Location 2 */}
            <div className="info-gradient-card p-5 md:p-6 rounded-2xl border border-teal-500/30 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-400 text-lg shrink-0 mt-0.5 border border-teal-500/20">
                  <RiMapPinLine />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2 flex-wrap">
                    India Nadakkave Office <span className="px-2 py-0.5 text-[9px] bg-teal-500/20 text-teal-300 rounded font-mono font-bold uppercase tracking-wide border border-teal-500/20">Operations</span>
                  </h4>
                  <p className="text-xs text-white/80 mt-2 leading-relaxed font-medium">
                    5th Floor, C. M. Mathew Brothers Arcade, Kannur Rd, near Hotel Westway, Vikas Nagar Housing Colony, West Nadakkave, Chakkorathukulam, Kozhikode, Kerala 673006, India
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMN 2: INDUSTRIAL CYBERWARE PORTAL FORM CONTAINER (7 Columns) */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative pt-2 pb-2 px-1 sm:p-0">
            
            {/* Physical Hardware Buttons Layout Configuration */}
            <div className="absolute -left-[10px] top-28 w-[4px] h-12 bg-gradient-to-b from-cyan-600 to-cyan-800 rounded-l border-y border-l border-cyan-400/40 shadow-md hidden lg:block" />
            <div className="absolute -left-[10px] top-44 w-[4px] h-12 bg-gradient-to-b from-cyan-600 to-cyan-800 rounded-l border-y border-l border-cyan-400/40 shadow-md hidden lg:block" />
            <div className="absolute -right-[10px] top-36 w-[4px] h-16 bg-gradient-to-b from-purple-600 to-purple-800 rounded-r border-y border-r border-purple-400/40 shadow-md hidden lg:block" />

            {/* Mobile View Side Hardware Buttons */}
            <div className="absolute left-1 top-24 w-[3px] h-8 bg-cyan-600 rounded-l border border-cyan-400/40 lg:hidden" />
            <div className="absolute left-1 top-36 w-[3px] h-8 bg-cyan-600 rounded-l border border-cyan-400/40 lg:hidden" />
            <div className="absolute right-1 top-30 w-[3px] h-12 bg-purple-600 rounded-r border border-purple-400/40 lg:hidden" />

            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              animate={formShake ? { x: [-10, 10, -8, 8, -5, 5, 0] } : {}}
              className="tablet-frame relative rounded-3xl md:rounded-[36px] border-[7px] md:border-[12px] border-[#161e46] bg-[#111a44]/90 backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,0.25),inset_0_0_0_2px_rgba(34,211,238,0.2)] overflow-hidden"
            >
              {/* Dynamic Universal Hardware Top Bar Bezel */}
              <div className="w-full bg-[#1b265c] px-4 pt-3 pb-3 flex items-center justify-between border-b border-cyan-500/20 relative">
                <div className="flex items-center gap-1.5 shrink-0 z-10">
                  <span className="w-2 h-2 rounded-full bg-red-500/80 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/80 shadow-[0_0_6px_rgba(234,179,8,0.5)]" />
                  <span className="w-2 h-2 rounded-full bg-green-500/80 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                </div>
                
                {/* Physical Smartphone Notch Config Container Slot */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 h-5 w-24 bg-[#161e46] rounded-b-xl border-x border-b border-white/5 flex items-center justify-center gap-2 px-2 z-30 lg:hidden">
                  <span className="w-8 h-1 bg-white/20 rounded-full" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 border border-cyan-400/40 shadow-sm" />
                </div>

                {/* Tablet Hardware Config Header Element */}
                <div className="w-28 h-4 bg-[#0d153a] rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2 flex items-center justify-center gap-3 border border-white/5 shadow-inner hidden lg:flex z-20">
                  <span className="w-12 h-1 bg-white/10 rounded-full" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/40 border border-cyan-400/30 shadow-[0_0_4px_rgba(6,182,212,0.6)] animate-pulse" />
                </div>

                <div className="text-[9px] md:text-[10px] font-mono text-cyan-400 font-bold tracking-wider uppercase pl-2 truncate max-w-[150px] sm:max-w-none z-10 lg:block pt-1 lg:pt-0">
                  Secure Communication Portal
                </div>
              </div>

              {/* Form Body Fields */}
              <div className="p-4 sm:p-5 md:p-8 space-y-5">
                <form ref={formRef} onSubmit={handleSubmit} onChange={handleInputChange} className="space-y-5" noValidate>
                  
                  {/* Name and Email Input Blocks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative group w-full flex flex-col">
                      <AnimatePresence>
                        {validationAlerts.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 5, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -5, height: 0 }}
                            className="p-2.5 mb-1.5 border border-rose-500/40 bg-rose-500/10 rounded-lg flex items-center gap-2 text-[10px] font-mono font-bold tracking-wide text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.12)]"
                          >
                            <RiErrorWarningLine className="text-sm text-rose-400 shrink-0" />
                            <span>NAME FIELD IS REQUIRED</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <input required name="name" placeholder="Full Name *" className="contact-input" />
                    </div>

                    <div className="relative group w-full flex flex-col">
                      <AnimatePresence>
                        {validationAlerts.email && (
                          <motion.div
                            initial={{ opacity: 0, y: 5, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -5, height: 0 }}
                            className="p-2.5 mb-1.5 border border-rose-500/40 bg-rose-500/10 rounded-lg flex items-center gap-2 text-[10px] font-mono font-bold tracking-wide text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.12)]"
                          >
                            <RiErrorWarningLine className="text-sm text-rose-400 shrink-0" />
                            <span>EMAIL FIELD IS REQUIRED</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <input required name="email" type="email" placeholder="Email Address *" className="contact-input" />
                    </div>
                  </div>

                  {/* Phone Input Container block */}
                  <div className="flex flex-col">
                    <AnimatePresence>
                      {validationAlerts.phone && (
                        <motion.div
                          initial={{ opacity: 0, y: 5, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          exit={{ opacity: 0, y: -5, height: 0 }}
                          className="p-2.5 mb-1.5 border border-rose-500/40 bg-rose-500/10 rounded-lg flex items-center gap-2 text-[10px] font-mono font-bold tracking-wide text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.12)]"
                        >
                          <RiErrorWarningLine className="text-sm text-rose-400 shrink-0" />
                          <span>PHONE NUMBER IS REQUIRED</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="phone-input-container">
                      {countryCode ? (
                        <PhoneInput
                          key={countryCode} 
                          defaultCountry={countryCode}
                          value={phone}
                          className="w-full"
                          onChange={(phoneStr, metaData) => {
                            setPhone(phoneStr);
                            if (metaData && metaData.country && metaData.country.iso2) {
                              setCountryCode(metaData.country.iso2.toLowerCase());
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-[56px] bg-white/10 animate-pulse rounded-xl" />
                      )}
                    </div>
                  </div>

                  <textarea name="message" placeholder="Mission Brief / Message Details (Optional)" className="contact-input h-36 resize-none" />

                  {/* Captcha Validation Warning Alert Banner */}
                  <AnimatePresence>
                    {validationAlerts.captcha && (
                      <motion.div
                        initial={{ opacity: 0, y: 5, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -5, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-2.5 mb-1.5 border border-rose-500/40 bg-rose-500/10 rounded-xl flex items-center gap-2 text-[10px] font-mono font-bold tracking-wide text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.12)]">
                          <RiErrorWarningLine className="text-sm text-rose-400 shrink-0 animate-bounce" />
                          <span>SECURITY PROTOCOL CHALLENGE IS UNVERIFIED</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Security Captcha Integration Block */}
                  <div className="captcha-block-wrapper">
                    <CaptchaWidget key={captchaResetKey} onVerify={setCaptchaPassed} />
                  </div>

                  {/* High-Impact Uplink Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500 text-white font-black rounded-xl tracking-[0.2em] uppercase text-[11px] flex items-center justify-center gap-3 active:scale-[0.99] transition-all transform-gpu shadow-lg shadow-cyan-500/20 hover:brightness-110"
                  >
                    {status === 'sending' ? (
                      <>
                        <RiLoader4Line className="animate-spin text-xl" /> ESTABLISHING UPLINK...
                      </>
                    ) : (
                      <>
                        ESTABLISH LINK <RiRocketLine className="text-xl animate-bounce" />
                      </>
                    )}
                  </button>

                  {/* Animated Response Feedback Toasts */}
                  <AnimatePresence mode="wait">
                    {status !== 'idle' && status !== 'sending' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`p-4 border-2 rounded-xl flex items-center gap-3 text-xs font-mono leading-tight ${
                          status === 'success' 
                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.15)]' 
                            : 'bg-rose-500/20 border-rose-500/50 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                        }`}
                      >
                        {status === 'success' ? (
                          <RiCheckboxCircleLine className="text-2xl shrink-0 text-emerald-400" />
                        ) : (
                          <RiErrorWarningLine className="text-2xl shrink-0 text-rose-400" />
                        )}
                        <span className="uppercase tracking-wider font-bold">
                          {status === 'success' ? 'TRANSMISSION SUCCESSFUL. SECURE UPLINK VERIFIED.' : `ALERT: ${errorMsg}`}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Embedded Global Cross-Browser Layout Fixes */}
      <style jsx global>{`
        .info-gradient-card {
          background: linear-gradient(135deg, rgba(28, 41, 102, 0.45) 0%, rgba(16, 24, 61, 0.25) 100%);
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .info-gradient-card:hover {
          background: linear-gradient(135deg, rgba(38, 56, 133, 0.55) 0%, rgba(22, 34, 84, 0.35) 100%);
          transform: translateY(-2px);
          border-color: rgba(34, 211, 238, 0.5) !important;
          box-shadow: 0 15px 35px rgba(6, 182, 212, 0.15);
        }

        .contact-input {
          width: 100%;
          background: rgba(34, 211, 238, 0.07) !important;
          border: 1px solid rgba(34, 211, 238, 0.4) !important;
          padding: 1.1rem;
          color: white;
          border-radius: 12px;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 15px;
          height: 56px;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
        }
        .contact-input:focus {
          border-color: #a855f7 !important;
          background: rgba(34, 211, 238, 0.12) !important;
          box-shadow: 0 0 25px rgba(34, 211, 238, 0.25), inset 0 2px 4px rgba(0,0,0,0.3);
          transform: translateY(-1px);
        }
        textarea.contact-input {
          height: 144px !important;
        }
        
        /* ─── FIXED PHONE INPUT COMPONENT STRUCTURAL LAYOUT ─── */
        .phone-input-container {
          width: 100%;
          height: 56px !important;
          position: relative;
          z-index: 50 !important; 
        }
        .react-international-phone-input-container {
          width: 100% !important;
          height: 56px !important;
          background: rgba(34, 211, 238, 0.07) !important;
          border: 1px solid rgba(34, 211, 238, 0.4) !important;
          border-radius: 12px !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
          display: flex !important;
          align-items: center !important;
        }
        .react-international-phone-input-container:focus-within {
          border-color: #a855f7 !important;
          background: rgba(34, 211, 238, 0.12) !important;
          box-shadow: 0 0 25px rgba(34, 211, 238, 0.25);
          transform: translateY(-1px);
        }
        .react-international-phone-input {
          flex: 1 !important;
          width: 100% !important;
          background: transparent !important;
          border: none !important;
          padding: 0 1rem !important;
          color: #ffffff !important; 
          height: 100% !important;
          font-size: 15px !important;
          outline: none !important;
        }
        
        /* Flag selector layout alignment fix */
        .react-international-phone-selector-button {
          background: transparent !important;
          border: none !important;
          border-right: 1px solid rgba(34, 211, 238, 0.4) !important;
          height: 100% !important;
          width: 56px !important;
          min-width: 56px !important;
          padding: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          border-top-left-radius: 12px !important;
          border-bottom-left-radius: 12px !important;
          cursor: pointer !important;
        }
        
        /* ─── PREMIUM WHITE BACKGROUND COUNTRY SELECTOR DROPDOWN ─── */
        .react-international-phone-country-selector-dropdown,
        ul.react-international-phone-country-selector-dropdown {
          background-color: #ffffff !important; 
          background: #ffffff !important;
          border: 1px solid #cbd5e1 !important; 
          border-radius: 12px !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2) !important;
          padding: 8px !important;
          max-height: 250px !important;
          width: 280px !important;
          position: absolute !important;
          top: 100% !important;
          left: 0 !important;
          z-index: 9999999 !important; 
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }
        
        .captcha-block-wrapper,
        .captcha-container-isolated {
          position: relative !important;
          z-index: 1 !important; 
        }
        
        ul.react-international-phone-country-selector-dropdown li,
        li.react-international-phone-country-selector-list-item {
          background-color: transparent !important;
          background: transparent !important;
          padding: 10px 12px !important;
          border-radius: 8px !important;
          display: flex !important;
          align-items: center !important;
          gap: 10px !important;
          transition: background 0.2s ease;
        }
        
        /* Typography overrides for visible dark text on white background */
        .react-international-phone-country-selector-list-item-name,
        .react-international-phone-country-selector-list-item-dial-code,
        li.react-international-phone-country-selector-list-item span,
        li.react-international-phone-country-selector-list-item * {
          color: #0f172a !important; 
          text-shadow: none !important;
          font-family: system-ui, -apple-system, sans-serif !important;
          font-size: 14px !important;
          font-weight: 500 !important;
        }
        
        /* Smooth light-mode hover indicators inside white dropdown menu */
        li.react-international-phone-country-selector-list-item:hover,
        li.react-international-phone-country-selector-list-item:hover * {
          background-color: #f1f5f9 !important; 
          color: #0284c7 !important; 
        }
        
        /* Active / Selected item properties inside dropdown elements */
        li.react-international-phone-country-selector-list-item[aria-selected="true"],
        li.react-international-phone-country-selector-list-item[aria-selected="true"] * {
          background-color: #38bdf8 !important; 
          color: #000000 !important; 
        }
      `}</style>
    </section>
  );
};

export default Contact;