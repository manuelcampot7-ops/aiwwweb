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
  const progressRef = useRef(0);

  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isAnimating,   setIsAnimating]   = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  /* ── Scroll progress ── */
  useEffect(() => {
    const handle = () => {
      if (!heroRef.current) return;
      const rect      = heroRef.current.getBoundingClientRect();
      const scrollable = heroRef.current.offsetHeight - window.innerHeight;
      const p         = clamp01(-rect.top / scrollable);
      progressRef.current = p;
      setScrollProgress(p);
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  /* ── Particle field (enhanced) ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;

    interface Particle { x:number; y:number; vx:number; vy:number; size:number; opacity:number; pulse:number; }
    const pts: Particle[] = [];

    const resize = () => { if (canvas) { canvas.width = canvas.offsetWidth * 1.5; canvas.height = canvas.offsetHeight * 1.5; } };
    const seed = () => {
      if (!canvas) return;
      pts.length = 0;
      const n = Math.min(80, Math.floor((canvas.width * canvas.height) / 16000));
      for (let i = 0; i < n; i++) pts.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random()-.5)*.4, vy: (Math.random()-.5)*.4,
        size: Math.random()*1.6+.3, opacity: Math.random()*.28+.04,
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
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = dx*dx + dy*dy;
        if (d < 16000) {
          const alpha = .04 * (1 - Math.sqrt(d) / 126);
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
      if (document.hidden || progressRef.current > 0.25) return;
      setIsAnimating(true);
      setTimeout(() => { setCurrentPhrase(p => (p+1)%phrases.length); setIsAnimating(false); }, 400);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const s = scrollProgress;
  const scene1 = clamp01(1 - (s - 0.18) / 0.20);
  const scene2 = clamp01(Math.min((s - 0.30) / 0.14, 1 - (s - 0.60) / 0.12));
  const scene3 = clamp01((s - 0.70) / 0.14);
  const ringScale  = 1 + s * 0.10;
  const activeScene = s < 0.38 ? 0 : s < 0.72 ? 1 : 2;

  return (
    <section ref={heroRef} className="relative" style={{ height: '300svh' }} id="hero">
      <div className="sticky top-0 overflow-hidden bg-[#050505]" style={{ height: '100svh' }}>

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
                color: i % 3 === 0 ? 'rgba(220,38,38,0.07)' : 'rgba(255,255,255,0.04)',
                letterSpacing: '2px',
                animation: `data-float-up ${14 + i * 2.5}s linear infinite`,
                animationDelay: `${i * 1.8}s`,
              }}
            >
              {text}
            </div>
          ))}
        </div>


        {/* Horizontal scan line — fires once */}
        <div className="absolute z-[6] pointer-events-none overflow-hidden"
          style={{ top: '47%', left: 0, right: 0, height: '1px' }}>
          <div className="w-full h-full bg-gradient-to-r from-transparent via-red-500/30 to-transparent animate-h-scan" />
        </div>

        {/* ════ TARGETING RETICLE ════ */}
        <div
          className="absolute z-[3] pointer-events-none flex items-center justify-center"
          style={{ top:'50%', left:'50%', transform:`translate(-50%,-50%) scale(${ringScale})`, willChange:'transform' }}
        >
          {/* Ambient outer pulse */}
          <div className="absolute rounded-full border border-white/[0.025] animate-orb-ring" style={{ inset: '-75px' }} />

          {/* Ring 1 */}
          <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full border border-white/[0.055] flex items-center justify-center">
            {/* Rotating conic arc */}
            <div className="absolute inset-0 rounded-full" style={{
              background: 'conic-gradient(from 0deg, transparent 0%, transparent 80%, rgba(220,38,38,0.22) 91%, rgba(220,38,38,0.06) 97%, transparent 100%)',
              animation: 'spin-slow 18s linear infinite',
            }} />
            {/* Second arc, counter */}
            <div className="absolute inset-[8px] rounded-full" style={{
              background: 'conic-gradient(from 180deg, transparent 0%, transparent 88%, rgba(255,255,255,0.04) 94%, transparent 100%)',
              animation: 'counter-spin 25s linear infinite',
            }} />

            {/* Compass ticks */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[10px] h-[1px] bg-red-500/35" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[10px] h-[1px] bg-red-500/22" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[10px] w-[1px] bg-red-500/22" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[10px] w-[1px] bg-red-500/22" />

            {/* Ring 2 — counter-spin */}
            <div className="w-[200px] h-[200px] md:w-[275px] md:h-[275px] rounded-full border border-white/[0.035] relative flex items-center justify-center"
              style={{ animation: 'counter-spin 30s linear infinite' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[4px] h-[4px] rounded-full bg-red-500/45 shadow-[0_0_8px_rgba(220,38,38,0.35)]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[3px] h-[3px] rounded-full bg-red-400/25" />
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-white/12" />
              <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-white/08" />

              {/* Ring 3 — inner red */}
              <div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full border border-red-500/[0.18] relative flex items-center justify-center"
                style={{ animation: 'spin-slow 22s linear infinite' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-red-500/55 shadow-[0_0_12px_rgba(220,38,38,0.45)]" />

                {/* Core */}
                <div className="w-[68px] h-[68px] md:w-[88px] md:h-[88px] rounded-full bg-gradient-to-br from-[#160404] to-[#080808] border border-red-500/[0.22] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/25 via-transparent to-transparent" style={{ animation: 'orb-core-pulse 4s ease-in-out infinite' }} />
                  {/* Crosshairs */}
                  <div className="absolute top-0 left-1/2 -translate-x-[0.5px] w-px h-full bg-red-500/12" />
                  <div className="absolute left-0 top-1/2 -translate-y-[0.5px] w-full h-px bg-red-500/12" />
                  {/* Center pulse */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.9),0_0_6px_rgba(220,38,38,1)]" />
                </div>
              </div>
            </div>
          </div>

          {/* Data labels — desktop */}
          <div className="hidden md:block absolute right-full top-1/2 -translate-y-1/2 mr-10 text-right pointer-events-none">
            <div className="text-[0.46rem] font-mono text-white/14 tracking-[3px] uppercase mb-1.5">SYS STATUS</div>
            <div className="flex items-center justify-end gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[0.55rem] font-mono text-red-500/50 tracking-[2px] uppercase">Active</span>
            </div>
          </div>
          <div className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-10 pointer-events-none">
            <div className="text-[0.46rem] font-mono text-white/14 tracking-[3px] uppercase mb-1.5">Response</div>
            <div className="text-[0.55rem] font-mono text-white/22 tracking-[2px]">&lt; 1.0s</div>
          </div>
        </div>

        {/* ════ SCENE 1 — Above ════ */}
        <div className="absolute z-[4] w-full text-center px-6 pointer-events-none"
          style={{ top: 'max(80px, calc(50% - 295px))', opacity: scene1, transform: `translateY(${-s * 28}px)` }}>
          <h1
            className="font-['Space_Grotesk'] text-[clamp(1.85rem,4.8vw,4.2rem)] font-extrabold tracking-[-0.04em] leading-[1.04] text-white mb-2"
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

        {/* ════ SCENE 1 — Below ════ */}
        <div className="absolute z-[4] w-full text-center px-6 pointer-events-none"
          style={{ top: 'calc(50% + 205px)', opacity: scene1, transform: `translateY(${s * 28}px)` }}>
          <p className="text-white/20 text-[0.88rem] md:text-[0.98rem] leading-relaxed max-w-[480px] mx-auto font-light">
            An AI agent that lives on your website — answering questions, qualifying leads, and booking appointments. No redirects. No hold times.
          </p>
        </div>

        {/* ════ SCENE 2 ════ */}
        <div className="absolute z-[4] w-full text-center px-6 pointer-events-none"
          style={{ top: 'calc(50% + 205px)', opacity: scene2, transform: `translateY(${(1 - clamp01(scene2 * 10)) * 20}px)` }}>
          <p className="text-[0.54rem] font-mono tracking-[5px] uppercase text-red-500/52 mb-3">Live 24 · 7 · 365</p>
          <h2 className="font-['Space_Grotesk'] text-[clamp(1.8rem,4.2vw,3.6rem)] font-extrabold tracking-[-0.03em] leading-[1.05] text-white mb-5">
            Never misses<br />a customer.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2.5">
            {['Answers every call', 'Qualifies every lead', 'Books automatically'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-white/32 text-[0.78rem] font-medium tracking-wide">
                <span className="w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* ════ SCENE 3 ════ */}
        <div className="absolute z-[4] w-full text-center px-6 pointer-events-none"
          style={{ top: 'calc(50% + 205px)', opacity: scene3, transform: `translateY(${(1 - clamp01(scene3 * 10)) * 20}px)` }}>
          <p className="text-[0.54rem] font-mono tracking-[5px] uppercase text-red-500/52 mb-3">Your website · Your agent</p>
          <h2 className="font-['Space_Grotesk'] text-[clamp(1.8rem,4.2vw,3.6rem)] font-extrabold tracking-[-0.03em] leading-[1.05] text-white mb-5">
            Built into<br />your website.
          </h2>
          <p className="text-white/25 text-[0.88rem] md:text-[0.98rem] leading-relaxed max-w-[440px] mx-auto font-light">
            Not a chatbot. Not a redirect. An intelligent agent that lives where your customers already are.
          </p>
        </div>

        {/* Scene progress bars */}
        <div className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 z-[5] flex flex-col gap-2.5 pointer-events-none">
          {[0, 1, 2].map((i) => (
            <div key={i} className="transition-all duration-500 ease-out"
              style={{
                width: '1px',
                height: activeScene === i ? '22px' : '4px',
                backgroundColor: activeScene === i ? 'rgba(220,38,38,0.7)' : 'rgba(255,255,255,0.12)',
                boxShadow: activeScene === i ? '0 0 8px rgba(220,38,38,0.4)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-[58px] left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-1.5 pointer-events-none"
          style={{ opacity: clamp01(1 - s / 0.07) }}>
          <span className="text-[0.5rem] font-mono tracking-[4px] uppercase text-white/16">SCROLL</span>
          <div className="w-px h-7 bg-gradient-to-b from-white/14 to-transparent" />
          <div className="w-[3px] h-[3px] rounded-full bg-red-500/45 animate-bounce" />
        </div>

        {/* Bottom marquee */}
        <div className="absolute bottom-0 left-0 right-0 z-[4] border-t border-white/[0.04] bg-[#050505]/80 backdrop-blur-sm py-[9px] overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="inline-flex items-center shrink-0">
                <span className="text-[0.56rem] font-mono tracking-[3px] uppercase text-white/13 px-6">{item}</span>
                <span className="w-[2px] h-[2px] rounded-full bg-red-500/25 shrink-0" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
