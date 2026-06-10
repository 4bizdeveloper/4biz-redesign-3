"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

/* ─── Quick-access suggestion chips ─── */
const SUGGESTIONS = [
  "What services do you offer?",
  "Tell me about Microsoft Dynamics 365",
  "How can I contact 4Biz?",
  "SEO & Digital Marketing",
];

/* ─── Animated bot avatar ─── */
const BotAvatar = () => (
  <div style={{
    width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
    background: 'conic-gradient(from 0deg, #5bdefc, #ef29de, #5bdefc)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 0 12px rgba(91,222,252,0.5)',
    animation: 'spin-avatar 6s linear infinite',
    position: 'relative',
  }}>
    <div style={{
      width: 22, height: 22, borderRadius: '50%',
      background: '#030712',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg viewBox="0 0 20 20" width="12" height="12">
        <circle cx="6" cy="7" r="1.5" fill="#5bdefc"/>
        <line x1="6" x2="9" y1="7" y2="10" stroke="#5bdefc" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M10 9c-3 0-5 2.5-5 5.5s2 5.5 5 5.5 5-2.5 5-5.5-2-5.5-5-5.5z" fill="white"/>
        <path d="M7 13.5c0-1 .8-1.8 1.8-1.8h2.4c1 0 1.8.8 1.8 1.8v1c0 1-.8 1.8-1.8 1.8H8.8c-1 0-1.8-.8-1.8-1.8v-1z" fill="#030712"/>
        <path d="M14 5.5h3c.7 0 1.2.5 1.2 1.2v2.6c0 .7-.5 1.2-1.2 1.2h-.8l-.2 1.3-1.1-1.3h-1.6c-.7 0-1.2-.5-1.2-1.2V6.7c0-.7.5-1.2 1.2-1.2z" fill="white"/>
      </svg>
    </div>
  </div>
);

/* ─── Typing indicator ─── */
const TypingDots = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 2px' }}>
    {[0, 1, 2].map(i => (
      <span key={i} style={{
        width: 6, height: 6, borderRadius: '50%',
        background: 'linear-gradient(135deg, #5bdefc, #ef29de)',
        display: 'inline-block',
        animation: `typing-dot 1.2s ease-in-out infinite`,
        animationDelay: `${i * 0.2}s`,
      }} />
    ))}
    <span style={{ fontSize: 10, color: 'rgba(91,222,252,0.6)', fontFamily: 'monospace', letterSpacing: '0.1em', marginLeft: 4 }}>
      Neural processing…
    </span>
  </div>
);

/* ─── Single message bubble ─── */
const MessageBubble = ({ msg, isLatest }: { msg: { role: string; text: string }; isLatest: boolean }) => {
  const isBot = msg.role === 'bot';
  return (
    <div style={{
      display: 'flex',
      justifyContent: isBot ? 'flex-start' : 'flex-end',
      alignItems: 'flex-end',
      gap: 8,
      animation: isLatest ? 'msg-in 0.32s cubic-bezier(0.34,1.4,0.64,1) both' : 'none',
    }}>
      {isBot && <BotAvatar />}
      <div style={{
        maxWidth: '78%',
        padding: '11px 15px',
        borderRadius: isBot ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
        fontSize: 13,
        lineHeight: 1.65,
        letterSpacing: '0.01em',
        color: isBot ? 'rgba(255,255,255,0.92)' : '#ffffff',
        background: isBot
          ? 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(91,222,252,0.07) 100%)'
          : 'linear-gradient(135deg, #ef29de 0%, #7c3aed 50%, #5bdefc 100%)',
        border: isBot ? '1px solid rgba(91,222,252,0.12)' : 'none',
        boxShadow: isBot
          ? '0 2px 20px rgba(91,222,252,0.06), inset 0 1px 0 rgba(255,255,255,0.05)'
          : '0 4px 24px rgba(239,41,222,0.35)',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}>
        {msg.text}
      </div>
    </div>
  );
};

const SYSTEM_PROMPT = `
You are the official AI Assistant for 4Biz International LLC (https://4bizinternational.com/).

CORE DIRECTIVE:
- Learn and promote services found at: https://4bizinternational.com/services.html
- Services include: Microsoft Dynamics 365 (CRM/ERP), SEO, Web Design & Development, Mobile App Development, Social Media Marketing, Domain & Hosting, Branding, and Photoshoots/Videoshoots.
- Products: Microsoft Licenses, Google Workspace, Zoho Solutions, custom Applications.
- Location: Office 104, Crystal Building, Al Karama, Dubai, UAE.
- Contact: info@4bizinternational.com | +971 52 792 5100.

FORMATTING RULES:
- NEVER use markdown bolding (**) or headers (###).
- Use plain text only.
- For lists, use simple bullet points (•) with clear indentation.
- Keep messages concise and professional.
- Ensure every response feels clean and aligned.
- Max 5 sentences per response unless a detailed list is necessary.
`;

const AIChatWindow = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! I'm the 4Biz AI Assistant. How can I help you with our IT or Digital Marketing solutions today?" }
  ]);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  /* auto-scroll */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isThinking]);

  /* focus input on open */
  useEffect(() => {
    if (isOpen && inputRef.current) setTimeout(() => inputRef.current?.focus(), 120);
  }, [isOpen]);

  /* Header canvas — deep-sea sonar pulse */
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.offsetWidth || 520, H = canvas.offsetHeight || 72;
    canvas.width = W; canvas.height = H;

    let t = 0;
    const stars = Array.from({ length: 40 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.2, op: Math.random(),
      speed: Math.random() * 0.008 + 0.003,
    }));
    const fish = Array.from({ length: 4 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.15,
      size: Math.random() * 3 + 2,
      color: Math.random() > 0.5 ? '91,222,252' : '239,41,222',
    }));

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.015;

      stars.forEach(s => {
        s.op = 0.15 + 0.55 * Math.abs(Math.sin(t * s.speed * 40 + s.x));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,200,255,${s.op * 0.55})`;
        ctx.fill();
      });

      const pulse = (t * 0.5) % 1;
      const pr = pulse * Math.max(W, H) * 0.7;
      ctx.beginPath();
      ctx.arc(W * 0.15, H * 0.5, pr, 0, Math.PI * 2); // Pulse targets the left side avatar now
      ctx.strokeStyle = `rgba(91,222,252,${(1 - pulse) * 0.12})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      fish.forEach(f => {
        f.x += f.vx; f.y += f.vy;
        if (f.x < -10) f.x = W + 10;
        if (f.x > W + 10) f.x = -10;
        if (f.y < 2) f.vy = Math.abs(f.vy);
        if (f.y > H - 2) f.vy = -Math.abs(f.vy);
        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.scale(f.vx < 0 ? -1 : 1, 1);
        ctx.beginPath();
        ctx.ellipse(0, 0, f.size * 2, f.size * 0.8, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${f.color},0.35)`;
        ctx.fill();
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isOpen]);

  const handleSend = useCallback(async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || isThinking) return;
    setShowSuggestions(false);
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setInput('');
    setIsThinking(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key missing");
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-flash-latest',
        systemInstruction: SYSTEM_PROMPT,
      });
      const result = await model.generateContent(msg);
      const response = await result.response;
      setMessages(prev => [...prev, { role: 'bot', text: response.text() }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: "I'm having a connection issue. Please try again or reach us at +971 52 792 5100." }]);
    } finally {
      setIsThinking(false);
    }
  }, [input, isThinking]);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); handleSend(); };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes spin-avatar { to { transform: rotate(360deg); } }
        @keyframes typing-dot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes msg-in {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)  scale(1); }
        }
        @keyframes window-in {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes header-scan {
          0%   { right: -30%; left: auto; }
          100% { right: 110%; left: auto; }
        }
        @keyframes suggest-in {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .chat-scrollbar::-webkit-scrollbar { width: 3px; }
        .chat-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .chat-scrollbar::-webkit-scrollbar-thumb { background: rgba(91,222,252,0.18); border-radius: 10px; }
        .send-btn:hover { background: linear-gradient(135deg,#5bdefc,#ef29de) !important; transform: scale(1.05); }
        .send-btn:active { transform: scale(0.97); }
        .chip:hover { background: rgba(91,222,252,0.12) !important; border-color: rgba(91,222,252,0.4) !important; color: #5bdefc !important; transform: translateY(-1px); }
        .close-btn:hover { background: rgba(255,255,255,0.1); }

        /* ── Responsive chat window ─────────────────────────
           Mobile  (<640px): fills viewport with 8px safe inset
                             on all sides — never touches edges.
           Desktop (≥640px): FIXED size always — never shrinks
                             or grows with content. Messages
                             scroll inside the fixed area.
        ──────────────────────────────────────────────────── */
        .chat-window {
          position: fixed;
          z-index: 1000002;
          display: flex;
          flex-direction: column;
          border-radius: 24px;
          overflow: hidden;
          animation: window-in 0.38s cubic-bezier(0.34,1.3,0.64,1) both;
          box-shadow: 0 32px 80px rgba(0,0,0,0.7),
                      0 0 0 1px rgba(91,222,252,0.1),
                      0 0 60px rgba(239,41,222,0.10);
          background: linear-gradient(160deg,
            rgba(3,7,18,0.98)  0%,
            rgba(5,4,20,0.98)  60%,
            rgba(2,8,16,0.98)  100%);
          -webkit-backdrop-filter: blur(24px);
          backdrop-filter: blur(24px);

          /* ── Mobile-first: 8px safe inset, fills full viewport ── */
          top:    8px;
          left:   8px;
          right:  8px;
          bottom: 8px;
          width:      auto;
          height:     auto;
          max-height: none;
        }

        /* ── Desktop: shifts to the bottom-left corner ── */
        @media (min-width: 640px) {
          .chat-window {
            /* Anchor to bottom-left above the floating buttons */
            top:    auto;
            right:  auto;
            left:   16px;
            bottom: 80px;

            /* Fixed dimensions — never change regardless of content */
            width:      520px;
            height:     calc(100dvh - 100px);
            max-height: 780px;

            /* dvh fallback for older browsers */
            height:     calc(100vh - 100px);
            max-height: 780px;
          }
        }
      `}</style>

      <div className="chat-window">

        {/* ── HEADER ── */}
        <div style={{
          position: 'relative', flexShrink: 0,
          padding: '0 18px',
          height: 72,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid rgba(91,222,252,0.08)',
          overflow: 'hidden',
        }}>
          <canvas ref={canvasRef} style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(90deg, rgba(239,41,222,0.12) 0%, rgba(91,222,252,0.06) 50%, rgba(91,222,252,0.12) 100%)',
          }} />
          <div style={{
            position: 'absolute', top: 0, bottom: 0, width: 60, pointerEvents: 'none',
            background: 'linear-gradient(90deg, transparent, rgba(91,222,252,0.09), transparent)',
            animation: 'header-scan 3.5s linear infinite',
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 1 }}>
            <BotAvatar />
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.22em', color: '#ffffff', textTransform: 'uppercase', lineHeight: 1.2 }}>
                4Biz Neural Interface
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#5bdefc',
                  boxShadow: '0 0 8px #5bdefc',
                  animation: 'typing-dot 2s ease-in-out infinite',
                  display: 'inline-block',
                }} />
                <span style={{ fontSize: 9, color: 'rgba(91,222,252,0.7)', letterSpacing: '0.15em', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                  Online
                </span>
              </div>
            </div>
          </div>

          {/* Close button — strokeWidth 3.5 for bold visibility */}
          <button onClick={onClose} className="close-btn" style={{
            position: 'relative', zIndex: 1,
            width: 32, height: 32, borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'transparent', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="3.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* ── MESSAGES — flex:1 so it fills remaining fixed height ── */}
        <div ref={scrollRef} className="chat-scrollbar" style={{
          flex: 1, overflowY: 'auto', padding: '18px 16px',
          display: 'flex', flexDirection: 'column', gap: 14,
          minHeight: 0, /* critical: lets flex child shrink + scroll */
        }}>
          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} isLatest={i === messages.length - 1} />
          ))}

          {isThinking && (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <BotAvatar />
              <div style={{
                padding: '10px 14px', borderRadius: '4px 18px 18px 18px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(91,222,252,0.1)',
              }}>
                <TypingDots />
              </div>
            </div>
          )}

          {showSuggestions && messages.length === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 4 }}>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'monospace', paddingLeft: 38 }}>
                Quick prompts
              </span>
              {SUGGESTIONS.map((s, i) => (
                <button key={s} onClick={() => handleSend(s)} className="chip" style={{
                  alignSelf: 'flex-start', marginLeft: 38,
                  padding: '7px 13px', borderRadius: 20,
                  background: 'rgba(91,222,252,0.06)',
                  border: '1px solid rgba(91,222,252,0.18)',
                  color: 'rgba(255,255,255,0.65)', fontSize: 12,
                  cursor: 'pointer', transition: 'all 0.2s',
                  animation: `suggest-in 0.3s ease both`,
                  animationDelay: `${i * 0.06}s`,
                  fontFamily: 'inherit', textAlign: 'left',
                }}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── INPUT ── */}
        <form onSubmit={handleSubmit} style={{
          flexShrink: 0,
          padding: '12px 14px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(0,0,0,0.35)',
          display: 'flex', gap: 8, alignItems: 'flex-end',
        }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Ask about our IT & digital solutions…"
              disabled={isThinking}
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 14,
                padding: '11px 16px',
                color: '#fff', fontSize: 13,
                outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
                fontFamily: 'inherit',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(91,222,252,0.4)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(91,222,252,0.07)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
            />
          </div>

          <button type="submit" className="send-btn" disabled={isThinking || !input.trim()} style={{
            width: 42, height: 42, borderRadius: 12, flexShrink: 0,
            background: input.trim() && !isThinking
              ? 'linear-gradient(135deg,#ef29de,#5bdefc)'
              : 'rgba(255,255,255,0.07)',
            border: 'none', cursor: input.trim() && !isThinking ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
            boxShadow: input.trim() && !isThinking ? '0 4px 16px rgba(239,41,222,0.4)' : 'none',
          }}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </form>

        {/* Bottom brand tag */}
        <div style={{
          flexShrink: 0, padding: '5px 0 7px',
          textAlign: 'center',
          fontSize: 9, color: 'rgba(255,255,255,0.18)',
          letterSpacing: '0.18em', fontFamily: 'monospace', textTransform: 'uppercase',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          background: 'rgba(0,0,0,0.2)',
        }}>
          Powered by 4Biz AI
        </div>
      </div>
    </>
  );
};

export default AIChatWindow;