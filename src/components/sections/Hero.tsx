"use client";

import React, { useState, useEffect, useRef } from 'react';

const phrases = [
  'Answer Every Call',
  'Qualify Every Lead',
  'Book Appointments 24/7',
  'Grow Your Business',
  'Never Miss a Customer',
];

const marqueeItems = [
  'AI Voice Agent', 'Custom Websites', 'Lead Qualification',
  '24/7 Availability', 'Smart Conversations', 'Instant Responses',
  'CRM Integration', 'No Hold Times', 'Auto Booking', 'SEO Optimized',
];

const dataStreams = [
  'LEAD_CAPTURED', 'AGENT_ACTIVE', 'CALL_ROUTED', 'BOOKING_SET',
  'AI_PROCESSING', 'RESPONSE_OK', 'VOICE_ONLINE', 'CRM_SYNCED',
  'LEAD_SCORED', 'FOLLOW_UP',
];

function clamp01(x: number) { return Math.max(0, Math.min(1, x)); }

export default function Hero() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const heroRef     = useRef<HTMLDivElement>(null);

  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isAnimating,   setIsAnimating]   = useState(false);
  const scrollFadeTarget = useRef(1);
  const scrollFadeCurrent = useRef(1);
  const fadeRaf = useRef<number>(0);

  /* ── Smooth scroll fade ── */
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      scrollFadeTarget.current = clamp01(1 - (-rect.top / (window.innerHeight * 0.4)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const animate = () => {
      const diff = scrollFadeTarget.current - scrollFadeCurrent.current;
      scrollFadeCurrent.current += diff * 0.08;
      if (Math.abs(diff) < 0.001) scrollFadeCurrent.current = scrollFadeTarget.current;

      // Update DOM directly for smoothness
      const els = heroRef.current?.querySelectorAll<HTMLElement>('[data-fade]');
      els?.forEach(el => { el.style.opacity = String(scrollFadeCurrent.current); });

      fadeRaf.current = requestAnimationFrame(animate);
    };
    fadeRaf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(fadeRaf.current);
  }, []);

  /* ── Enhanced particle field ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; pulse: number;
    }
    const pts: Particle[] = [];

    const resize = () => {
      if (canvas) {
        canvas.width = canvas.offsetWidth * 1.5;
        canvas.height = canvas.offsetHeight * 1.5;
      }
    };
    const seed = () => {
      if (!canvas) return;
      pts.length = 0;
      const n = Math.min(100, Math.floor((canvas.width * canvas.height) / 12000));
      for (let i = 0; i < n; i++) pts.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - .5) * .5, vy: (Math.random() - .5) * .5,
        size: Math.random() * 1.8 + .3, opacity: Math.random() * .32 + .05,
        pulse: Math.random() * Math.PI * 2,
      });
    };

    let time = 0;
    const draw = () => {
      if (!canvas || !ctx) return;
      time += 0.016;
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Connection lines
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = dx * dx + dy * dy;
        if (d < 18000) {
          const alpha = .05 * (1 - Math.sqrt(d) / 134);
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(220,38,38,${alpha})`; ctx.lineWidth = .6; ctx.stroke();
        }
      }
      // Particles with pulse
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        const pulse = 1 + Math.sin(time * 1.5 + p.pulse) * 0.3;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,38,38,${p.opacity * pulse})`; ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    resize(); seed(); draw();
    const onResize = () => { resize(); seed(); };
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(animId); };
  }, []);

  /* ── Phrase rotation ── */
  useEffect(() => {
    const id = setInterval(() => {
      if (document.hidden) return;
      setIsAnimating(true);
      setTimeout(() => { setCurrentPhrase(p => (p + 1) % phrases.length); setIsAnimating(false); }, 400);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={heroRef} className="relative" style={{ height: '100svh' }} id="hero">
      <div className="relative overflow-hidden bg-white" style={{ height: '100svh' }}>

        {/* Particle canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[1] pointer-events-none" style={{ imageRendering: 'auto' }} />

        {/* Circuit grid overlay */}
        <div className="absolute inset-0 z-[1] pointer-events-none bg-circuit opacity-40" />

        {/* Floating data streams */}
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
          {dataStreams.map((text, i) => (
            <div
              key={i}
              className="absolute font-mono whitespace-nowrap select-none"
              style={{
                left: `${8 + i * 9}%`,
                fontSize: '0.38rem',
                color: i % 3 === 0 ? 'rgba(220,38,38,0.08)' : 'rgba(0,0,0,0.03)',
                letterSpacing: '2px',
                animation: `data-float-up ${14 + i * 2.5}s linear infinite`,
                animationDelay: `${i * 1.8}s`,
              }}
            >
              {text}
            </div>
          ))}
        </div>

        {/* Horizontal scan line */}
        <div className="absolute z-[6] pointer-events-none overflow-hidden"
          style={{ top: '47%', left: 0, right: 0, height: '1px' }}>
          <div className="w-full h-full bg-gradient-to-r from-transparent via-red-500/30 to-transparent animate-h-scan" />
        </div>

        {/* ════ Ambient rings behind the orb ════ */}
        <div
          className="absolute z-[3] pointer-events-none"
          data-fade
          style={{
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full border border-gray-200/50 flex items-center justify-center animate-orb-ring">
            <div className="w-[180px] h-[180px] md:w-[240px] md:h-[240px] rounded-full border border-red-200/40" />
          </div>
        </div>

        {/* ════ HEADLINE — Above orb ════ */}
        <div className="absolute z-[4] w-full text-center px-6 pointer-events-none"
          style={{
            top: 'max(80px, calc(50% - 260px))',
          }}
          data-fade>
          <h1
            className="font-['Space_Grotesk'] text-[clamp(1.85rem,4.8vw,4.2rem)] font-extrabold tracking-[-0.04em] leading-[1.04] text-[#0a0a0a] mb-2"
            style={{ animation: 'glitch-flicker 8s ease-in-out infinite' }}
          >
            Your AI Agent That Can
          </h1>
          <div className="font-['Space_Grotesk'] text-[clamp(1.85rem,4.8vw,4.2rem)] font-extrabold tracking-[-0.04em] leading-[1.04]">
            <span className={`bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent inline-block transition-all duration-400 ${isAnimating ? 'opacity-0 blur-[10px] translate-y-2' : 'opacity-100 blur-0 translate-y-0'}`}>
              {phrases[currentPhrase]}
            </span>
          </div>
        </div>

        {/* ════ SUBTITLE — Below orb ════ */}
        <div className="absolute z-[4] w-full text-center px-6 pointer-events-none"
          style={{
            bottom: 'max(80px, calc(50% - 285px))',
          }}
          data-fade>
          <p className="text-gray-500 text-[0.88rem] md:text-[0.98rem] leading-relaxed max-w-[480px] mx-auto font-light">
            An AI agent that lives on your website — answering questions, qualifying leads, and booking appointments. No redirects. No hold times.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-[58px] left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-1.5 pointer-events-none"
          data-fade>
          <span className="text-[0.5rem] font-mono tracking-[4px] uppercase text-gray-400">SCROLL</span>
          <div className="w-px h-7 bg-gradient-to-b from-gray-400 to-transparent" />
          <div className="w-[3px] h-[3px] rounded-full bg-red-500/45 animate-bounce" />
        </div>

        {/* Bottom marquee */}
        <div className="absolute bottom-0 left-0 right-0 z-[4] border-t border-gray-200 bg-white/80 backdrop-blur-sm py-[9px] overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="inline-flex items-center shrink-0">
                <span className="text-[0.56rem] font-mono tracking-[3px] uppercase text-gray-400 px-6">{item}</span>
                <span className="w-[2px] h-[2px] rounded-full bg-red-500/40 shrink-0" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
