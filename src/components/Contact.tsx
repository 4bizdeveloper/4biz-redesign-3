"use client";

import React, { useState, memo, useCallback, useEffect } from 'react';
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

  if (!mounted || !captcha) return <div className="h-24 bg-white/5 animate-pulse rounded-xl" />;

  return (
    <motion.div
      className="captcha-container-isolated rounded-xl overflow-hidden backdrop-blur-md"
      animate={shake ? { x: [-6, 6, -5, 5, -3, 3, 0] } : {}}
      transition={{ duration: 0.45 }}
      style={{
        background: 'rgba(34, 211, 238, 0.04)',
        border: '1px solid rgba(34, 211, 238, 0.3)',
        boxShadow: '0 0 25px rgba(34, 211, 238, 0.1)',
      }}
    >
      <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-cyan-500/20">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-cyan-400 flex items-center gap-1.5 font-bold">
          <RiShieldCheckLine className="text-sm text-purple-400" /> Security Protocol
        </span>
        {!verified && (
          <button type="button" onClick={refresh} className="text-cyan-400/70 hover:text-cyan-300 transition-colors">
            <RiRefreshLine className="text-base" />
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {verified ? (
          <motion.div key="verified" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-3 px-4 py-4">
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
                className="w-full min-w-0 text-base font-mono text-white bg-white/5 border-b-2 border-cyan-400/40 focus:border-purple-400 outline-none py-1 px-2 rounded-t transition-colors placeholder:text-white/30"
              />
              <button
                type="button"
                onClick={handleCheck}
                disabled={!input}
                className="shrink-0 text-[10px] font-mono font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-md active:scale-95 disabled:opacity-30 disabled:scale-100 transition-all"
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!captchaPassed) {
      setStatus('error');
      setErrorMsg('Complete the security verification first.');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
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
        }, 400);
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
        background: 'radial-gradient(circle at 0% 0%, #0c0a24 0%, #04040d 70%), radial-gradient(circle at 100% 100%, #160a2b 0%, #04040d 80%)',
        contentVisibility: 'auto',
        contain: 'paint layout',
        containmentIntrinsicSize: '1px 1000px',
      } as React.CSSProperties}
    >
      {/* High-Tech Dynamic Aurora Glows */}
      <div className="absolute top-10 left-10 w-[280px] md:w-[450px] h-[280px] md:h-[450px] bg-gradient-to-tr from-cyan-500/15 to-purple-500/5 rounded-full blur-[100px] md:blur-[140px] pointer-events-none transform-gpu animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-bl from-purple-500/15 to-teal-500/5 rounded-full blur-[120px] md:blur-[160px] pointer-events-none transform-gpu" />

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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.25)]">
              To Scale your Business
            </span>
          </motion.h3>
          <div className="w-20 md:w-28 h-[3px] bg-gradient-to-r from-cyan-500 via-teal-400 to-purple-500 mx-auto mt-5 md:mt-6 rounded-full" />
        </div>

        {/* 2-Column Desktop Grid / Stacked Mobile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* COLUMN 1: INFORMATION CARDS STACKED (5 Columns) */}
          <div className="lg:col-span-5 space-y-5 md:space-y-6 order-2 lg:order-1">
            
            {/* Mail Infrastructure Card */}
            <a href="mailto:info@4bizinternational.com" className="info-gradient-card group flex items-center gap-4 p-5 rounded-2xl border border-cyan-500/15 backdrop-blur-md w-full">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-xl group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.1)] shrink-0">
                <RiMailLine />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-bold">Mail Infrastructure</p>
                <p className="text-sm md:text-base font-semibold text-white truncate break-all mt-0.5">info@4bizinternational.com</p>
              </div>
            </a>

            {/* HQ Telecoms / WhatsApp Card (Perfectly Stacked Below) */}
            <div className="info-gradient-card flex items-start gap-4 p-5 rounded-2xl border border-purple-500/15 backdrop-blur-md w-full">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 text-xl shadow-[0_0_15px_rgba(168,85,247,0.1)] shrink-0">
                <RiWhatsappLine />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-mono tracking-widest text-purple-400 uppercase font-bold">HQ Telecoms / WhatsApp</p>
                <div className="space-y-0.5 mt-1">
                  <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                    +971 52 79 25 100 <span className="text-[9px] bg-cyan-500/15 text-cyan-300 px-1.5 py-0.5 rounded font-mono font-normal tracking-normal">(DUBAI)</span>
                  </p>
                  <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                    +91 98957 17879 <span className="text-[9px] bg-purple-500/15 text-purple-300 px-1.5 py-0.5 rounded font-mono font-normal tracking-normal">(INDIA)</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Dubai Location */}
            <div className="info-gradient-card p-5 md:p-6 rounded-2xl border border-cyan-500/15 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-lg shrink-0 mt-0.5">
                  <RiMapPinLine />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2 flex-wrap">
                    Dubai Corporate Hub <span className="px-2 py-0.5 text-[9px] bg-cyan-500/20 text-cyan-300 rounded font-mono normal-case tracking-normal">Global HQ</span>
                  </h4>
                  <p className="text-xs text-white/70 mt-2 leading-relaxed font-medium">
                    Crystal Building - Office # 104 - 2C St - near ADCB Metro Station - Al Karama - Dubai, UAE
                  </p>
                </div>
              </div>
            </div>

            {/* India Location 1 */}
            <div className="info-gradient-card p-5 md:p-6 rounded-2xl border border-purple-500/15 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 text-lg shrink-0 mt-0.5">
                  <RiMapPinLine />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2 flex-wrap">
                    India HiLite Business Park <span className="px-2 py-0.5 text-[9px] bg-purple-500/20 text-purple-300 rounded font-mono normal-case tracking-normal">Tech Wing</span>
                  </h4>
                  <p className="text-xs text-white/70 mt-2 leading-relaxed font-medium">
                    Tower 2, HiLITE Business Park, Office 2723, 7th Floor, near HiLITE Mall, Poovangal, Pantheeramkavu, Kozhikode, Kerala 673014, India
                  </p>
                </div>
              </div>
            </div>

            {/* India Location 2 */}
            <div className="info-gradient-card p-5 md:p-6 rounded-2xl border border-teal-500/15 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 text-lg shrink-0 mt-0.5">
                  <RiMapPinLine />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2 flex-wrap">
                    India Nadakkave Office <span className="px-2 py-0.5 text-[9px] bg-teal-500/20 text-teal-300 rounded font-mono normal-case tracking-normal">Operations</span>
                  </h4>
                  <p className="text-xs text-white/70 mt-2 leading-relaxed font-medium">
                    5th Floor, C. M. Mathew Brothers Arcade, Kannur Rd, near Hotel Westway, Vikas Nagar Housing Colony, West Nadakkave, Chakkorathukulam, Kozhikode, Kerala 673006, India
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMN 2: INDUSTRIAL CYBERWARE PORTAL FORM CONTAINER (7 Columns) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="tablet-frame relative rounded-2xl md:rounded-3xl border-4 border-[#1e1e38] bg-[#0c0c1d]/90 shadow-[0_0_50px_rgba(34,211,238,0.15)] overflow-hidden"
            >
              {/* Tablet Top Header Trim */}
              <div className="w-full bg-[#14142b] px-4 py-3.5 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <div className="w-16 h-2.5 bg-[#070714] rounded-full mx-auto absolute left-1/2 -translate-x-1/2 hidden sm:block" />
                <div className="text-[9px] md:text-[10px] font-mono text-cyan-400/70 font-bold tracking-wider uppercase pl-2 truncate max-w-[210px] sm:max-w-none">
                  Secure Communication Portal
                </div>
              </div>

              {/* Form Body Fields */}
              <div className="p-5 md:p-8 space-y-5">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative group w-full">
                      <input required name="name" placeholder="Full Name *" className="contact-input" />
                    </div>
                    <div className="relative group w-full">
                      <input required name="email" type="email" placeholder="Email Address *" className="contact-input" />
                    </div>
                  </div>

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
                        required
                      />
                    ) : (
                      <div className="w-full h-[56px] bg-white/5 animate-pulse rounded-xl" />
                    )}
                  </div>

                  <textarea name="message" placeholder="Mission Brief / Message Details (Optional)" className="contact-input h-36 resize-none" />

                  {/* Security Captcha Integration Block */}
                  <div className="captcha-block-wrapper">
                    <CaptchaWidget key={captchaResetKey} onVerify={setCaptchaPassed} />
                  </div>

                  {/* High-Impact Uplink Button */}
                  <button
                    disabled={status === 'sending' || !captchaPassed}
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 via-teal-400 to-purple-600 text-white font-black rounded-xl tracking-[0.2em] uppercase text-[11px] flex items-center justify-center gap-3 active:scale-[0.99] transition-all disabled:opacity-40 disabled:scale-100 transform-gpu shadow-lg shadow-cyan-500/20 hover:brightness-110"
                  >
                    {status === 'sending' ? (
                      <>
                        <RiLoader4Line className="animate-spin text-xl" /> ESTABLISHING UPLINK...
                      </>
                    ) : (
                      <>
                        ESTABLISH LINK <RiRocketLine className="text-xl" />
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
                            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' 
                            : 'bg-rose-500/10 border-rose-500/40 text-rose-400'
                        }`}
                      >
                        {status === 'success' ? (
                          <RiCheckboxCircleLine className="text-2xl shrink-0" />
                        ) : (
                          <RiErrorWarningLine className="text-2xl shrink-0" />
                        )}
                        <span className="uppercase tracking-wider font-bold">
                          {status === 'success' ? 'TRANSMISSION SUCCESSFUL. SECURE UPLINK VERIFIED.' : `CRITICAL ERROR: ${errorMsg}`}
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
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .info-gradient-card:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%);
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.45);
        }

        .contact-input {
          width: 100%;
          background: rgba(34, 211, 238, 0.03) !important;
          border: 1px solid rgba(34, 211, 238, 0.2) !important;
          padding: 1.1rem;
          color: white;
          border-radius: 12px;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 15px;
          height: 56px;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
        }
        .contact-input:focus {
          border-color: #a855f7 !important;
          background: rgba(34, 211, 238, 0.06) !important;
          box-shadow: 0 0 25px rgba(34, 211, 238, 0.2), inset 0 2px 4px rgba(0,0,0,0.2);
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
          background: rgba(34, 211, 238, 0.03) !important;
          border: 1px solid rgba(34, 211, 238, 0.2) !important;
          border-radius: 12px !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
          display: flex !important;
          align-items: center !important;
        }
        .react-international-phone-input-container:focus-within {
          border-color: #a855f7 !important;
          background: rgba(34, 211, 238, 0.06) !important;
          box-shadow: 0 0 25px rgba(34, 211, 238, 0.2);
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
          border-right: 1px solid rgba(34, 211, 238, 0.2) !important;
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
          background-color: #ffffff !important; /* Force solid white background */
          background: #ffffff !important;
          border: 1px solid #cbd5e1 !important; /* Slate boundary line */
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
          color: #0f172a !important; /* Slate-900 high contrast dark text */
          text-shadow: none !important;
          font-family: system-ui, -apple-system, sans-serif !important;
          font-size: 14px !important;
          font-weight: 500 !important;
        }
        
        /* Smooth light-mode hover indicators inside white dropdown menu */
        li.react-international-phone-country-selector-list-item:hover,
        li.react-international-phone-country-selector-list-item:hover * {
          background-color: #f1f5f9 !important; /* Soft Slate-100 hover bg */
          color: #0284c7 !important; /* High-contrast Sky-600 hover text */
        }
        
        /* Active / Selected item properties inside dropdown elements */
        li.react-international-phone-country-selector-list-item[aria-selected="true"],
        li.react-international-phone-country-selector-list-item[aria-selected="true"] * {
          background-color: #38bdf8 !important; /* Distinct Sky-400 highlight */
          color: #000000 !important; /* Solid black text for optimal readability */
        }
      `}</style>
    </section>
  );
};

export default Contact;