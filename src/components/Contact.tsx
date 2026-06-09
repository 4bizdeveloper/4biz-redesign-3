"use client";

import React, { useState, memo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiRocketLine, 
  RiCheckboxCircleLine, 
  RiErrorWarningLine, 
  RiLoader4Line, 
  RiShieldCheckLine, 
  RiRefreshLine 
} from 'react-icons/ri';
import Image from 'next/image';
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
      className="captcha-container-isolated rounded-xl overflow-hidden"
      animate={shake ? { x: [-6, 6, -5, 5, -3, 3, 0] } : {}}
      transition={{ duration: 0.45 }}
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: verified ? '1px solid rgba(34,211,238,0.45)' : '1px solid rgba(255,255,255,0.08)',
        boxShadow: verified ? '0 0 20px rgba(34,211,238,0.1)' : 'none',
      }}
    >
      <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-white/5">
        <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/30 flex items-center gap-1.5">
          <RiShieldCheckLine className="text-xs" /> Security Protocol
        </span>
        {!verified && (
          <button type="button" onClick={refresh} className="text-white/25 hover:text-cyan-400 transition-colors">
            <RiRefreshLine className="text-sm" />
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {verified ? (
          <motion.div key="verified" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-3 px-4 py-3">
            <RiCheckboxCircleLine className="text-cyan-400 text-lg shrink-0" />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-cyan-400">Identity Confirmed</span>
          </motion.div>
        ) : (
          <motion.div key="challenge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 px-4 py-3">
            <div className="shrink-0 font-mono text-base tracking-tight select-none bg-gradient-to-br from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {captcha.a} {captcha.op} {captcha.b} = ?
            </div>
            <div className="flex-1 flex items-center gap-2">
              <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Answer"
                className="w-full min-w-0 text-sm font-mono text-white bg-transparent border-b border-white/15 focus:border-cyan-400 outline-none py-1 transition-colors placeholder:text-white/20"
              />
              <button
                type="button"
                onClick={handleCheck}
                disabled={!input}
                className="shrink-0 text-[9px] font-mono tracking-[0.2em] uppercase px-3 py-1.5 rounded-lg border border-cyan-400/20 text-cyan-400 disabled:opacity-30"
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

// ─── HOLOGRAPHIC CORE ─────────────────────────────────────────────────────────
const HolographicCore = memo(() => (
  <div className="flex justify-center order-1 lg:order-1 relative select-none pointer-events-none mb-8 lg:mb-0 transform-gpu">
    <motion.div
      className="relative w-full max-w-[320px] md:max-w-[450px] aspect-square flex items-center justify-center will-change-transform"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute w-[70%] h-[70%] bg-cyan-500/10 rounded-full blur-[60px] md:blur-[100px] -z-10 transform-gpu" />
      <div className="absolute inset-0 border border-white/5 rounded-full scale-110" />
      <div className="absolute inset-4 border border-dashed border-cyan-500/20 rounded-full animate-spin-ultra-slow" />

      <div className="absolute inset-0 rounded-full animate-spin-reverse-slow">
        <div className="absolute top-0 left-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] opacity-80" />
        <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7] opacity-80" />
      </div>

      <motion.div
        className="relative z-10 w-[82%] h-[82%] rounded-full border border-white/10 p-1 bg-[#050510]/40 backdrop-blur-sm shadow-2xl overflow-hidden"
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-full h-full rounded-full relative overflow-hidden mask-radial transform-gpu">
          <Image
            src="/images/itplanet.avif"
            alt="Holographic Planet"
            fill
            priority
            className="object-cover saturate-[1.3] brightness-[0.8] mix-blend-lighten opacity-70 transform-gpu"
          />
        </div>
      </motion.div>
    </motion.div>
  </div>
));
HolographicCore.displayName = 'HolographicCore';

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
      className="py-12 md:py-20 px-4 md:px-10 relative bg-transparent overflow-hidden transform-gpu"
      style={{
        contentVisibility: 'auto',
        contain: 'paint layout',
        containmentIntrinsicSize: '1px 700px',
      } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <HolographicCore />

        <div className="order-2 lg:order-2">
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter text-center lg:text-left">
              Contact Us <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                To Scale your Business
              </span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-[550px] mx-auto lg:mx-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required name="name" placeholder="Full Name *" className="contact-input" />
                <input required name="email" type="email" placeholder="Email Address *" className="contact-input" />
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
                  <div className="w-full h-[54px] bg-white/5 animate-pulse rounded-xl" />
                )}
              </div>

              <textarea name="message" placeholder="Mission Brief (Optional)" className="contact-input h-32 resize-none" />

              <div className="captcha-block-wrapper">
                <CaptchaWidget key={captchaResetKey} onVerify={setCaptchaPassed} />
              </div>

              <button
                disabled={status === 'sending' || !captchaPassed}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl tracking-[0.2em] uppercase text-[10px] flex items-center justify-center gap-3 active:scale-[0.98] transition-all disabled:opacity-50 transform-gpu shadow-lg shadow-cyan-500/10"
              >
                {status === 'sending' ? (
                  <>
                    <RiLoader4Line className="animate-spin text-lg" /> ESTABLISHING UPLINK...
                  </>
                ) : (
                  <>
                    ESTABLISH LINK <RiRocketLine className="text-lg" />
                  </>
                )}
              </button>

              <AnimatePresence mode="wait">
                {status !== 'idle' && status !== 'sending' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                    className={`p-4 border rounded-xl flex items-center gap-3 text-[11px] font-mono leading-tight ${status === 'success' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                    {status === 'success' ? <RiCheckboxCircleLine className="text-xl shrink-0" /> : <RiErrorWarningLine className="text-xl shrink-0" />}
                    <span className="uppercase tracking-wider">
                      {status === 'success' ? 'TRANSMISSION SUCCESSFUL. SECURE UPLINK VERIFIED.' : `CRITICAL ERROR: ${errorMsg}`}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .contact-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 1rem;
          color: white;
          border-radius: 12px;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 15px;
          height: 54px;
        }
        .contact-input:focus {
          border-color: #22d3ee;
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 25px rgba(34,211,238,0.15);
          transform: translateY(-1px);
        }
        textarea.contact-input {
          height: 128px !important;
        }
        
        .phone-input-container {
          width: 100%;
          display: flex !important;
          height: 54px !important;
          position: relative;
          z-index: 50 !important; 
        }
        .react-international-phone-input-container {
          width: 100% !important;
          display: flex !important;
          align-items: stretch !important;
          height: 54px !important;
          background: rgba(255,255,255,0.03) !important;
          border: 1px solid rgba(255,255,255,0.08) !important;
          border-radius: 12px !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .react-international-phone-input-container:focus-within {
          border-color: #22d3ee !important;
          background: rgba(255,255,255,0.06) !important;
          box-shadow: 0 0 25px rgba(34,211,238,0.15);
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
        
        .react-international-phone-selector-button {
          background: transparent !important;
          border: none !important;
          border-right: 1px solid rgba(255,255,255,0.08) !important;
          height: 100% !important;
          width: 54px !important;
          min-width: 54px !important;
          padding: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          border-top-left-radius: 12px !important;
          border-bottom-left-radius: 12px !important;
          cursor: pointer !important;
        }
        
        .react-international-phone-country-selector-dropdown,
        ul.react-international-phone-country-selector-dropdown {
          background-color: #ffffff !important;
          background: #ffffff !important;
          border: 1px solid #cbd5e1 !important;
          border-radius: 12px !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.85) !important;
          padding: 8px !important;
          max-height: 250px !important;
          width: 270px !important;
          position: absolute !important;
          top: 100% !important;
          left: 0 !important;
          z-index: 9999999 !important; 
        }
        
        .captcha-block-wrapper,
        .captcha-container-isolated {
          position: relative !important;
          z-index: 1 !important; 
        }
        
        ul.react-international-phone-country-selector-dropdown li,
        li.react-international-phone-country-selector-list-item {
          background-color: transparent !important;
          padding: 10px 12px !important;
          border-radius: 6px !important;
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
        }
        
        .react-international-phone-country-selector-list-item-name,
        .react-international-phone-country-selector-list-item-dial-code,
        li.react-international-phone-country-selector-list-item span,
        li.react-international-phone-country-selector-list-item * {
          color: #000000 !important;
          text-shadow: none !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          font-size: 14px !important;
          font-weight: 600 !important;
        }
        
        li.react-international-phone-country-selector-list-item:hover,
        li.react-international-phone-country-selector-list-item:hover * {
          background-color: #f1f5f9 !important;
          color: #000000 !important;
        }
        
        li.react-international-phone-country-selector-list-item[aria-selected="true"],
        li.react-international-phone-country-selector-list-item[aria-selected="true"] * {
          background-color: #cbd5e1 !important;
          color: #000000 !important;
        }

        .mask-radial {
          mask-image: radial-gradient(circle, black 50%, transparent 100%);
          -webkit-mask-image: radial-gradient(circle, black 50%, transparent 100%);
        }
        @keyframes spin-ultra-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-reverse-slow { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        .animate-spin-ultra-slow { animation: spin-ultra-slow 60s linear infinite; }
        .animate-spin-reverse-slow { animation: spin-reverse-slow 40s linear infinite; }
      `}</style>
    </section>
  );
};

export default Contact;