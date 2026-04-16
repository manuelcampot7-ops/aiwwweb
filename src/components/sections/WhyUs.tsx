"use client";
import React, { useState, useEffect, useRef } from 'react';

const stats = [
  { value: 24,  suffix: '/7', label: 'AI Always Active' },
  { value: 5,   suffix: '',   label: 'Services in One Package' },
  { value: 100, suffix: '%',  label: 'Custom Built for You' },
  { value: 48,  suffix: 'h',  label: 'Average Launch Time' },
];

const reasons = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'AI Agents Work Around the Clock',
    desc: 'Your voice and text agents never sleep. They qualify leads, answer questions, and book appointments 24/7 — even on holidays.',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Built to Convert, Not Just Look Good',
    desc: 'Every element on your site is designed with one goal: turning visitors into paying customers.',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: 'One Team. The Full Stack.',
    desc: 'Website, hosting, domain, voice AI, and text AI — all under one roof. No juggling vendors.',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: 'Fast Launch. Real Results.',
    desc: 'Most businesses go live within 48 hours. We move fast so you can start capturing leads immediately.',
  },
];

/* CountUp component */
function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const animate = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            setCount(Math.round(ease * target));
            if (t < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-['Space_Grotesk'] text-[2.6rem] font-extrabold text-white mb-1.5 leading-none">
      {count}{suffix}
    </div>
  );
}

/* Floating particles canvas */
function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 1.5;
      canvas.height = canvas.offsetHeight * 1.5;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.3 + 0.1,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 38, 38, ${p.alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
    />
  );
}

export default function WhyUs() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  return (
    <section
      id="why"
      className="relative py-24 md:py-32 bg-[#080808] overflow-hidden"
      onMouseMove={(e) => setMouse({ x: e.clientX, y: e.clientY })}
    >

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="w-full h-full object-cover opacity-[0.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808]" />
      </div>

      {/* Floating particles */}
      <ParticlesCanvas />

      {/* Subtle red glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[320px] bg-red-600/[0.05] blur-[100px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1180px] mx-auto px-6">

        {/* Header — word-by-word reveal */}
        <div className="text-center mb-16 sr-element-blur">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-6 h-px bg-red-500" />
            <span className="text-[0.62rem] font-mono font-bold tracking-[5px] uppercase text-red-500">Why AI WWWeb</span>
            <span className="w-6 h-px bg-red-500" />
          </div>
          <h2 className="font-['Space_Grotesk'] text-[clamp(2rem,4.5vw,4rem)] font-extrabold tracking-[-0.04em] text-white leading-[1.04] max-w-[680px] mx-auto">
            We Don&apos;t Just Build Websites.{' '}
            <span className="bg-gradient-to-br from-red-400 to-red-600 bg-clip-text text-transparent">
              We Build Machines That Sell.
            </span>
          </h2>
        </div>

        {/* Stats row — scale rotate entrance */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`sr-element-scale-rotate sr-delay-${i + 1} border border-white/[0.07] p-6 text-center transition-all duration-400 hover:border-red-500/20 hover:bg-white/[0.02]`}
            >
              <CountUp target={s.value} suffix={s.suffix} />
              <div className="text-[0.68rem] font-mono text-white/30 tracking-wide uppercase">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Reasons grid — alternating left/right entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`${i % 2 === 0 ? 'sr-element-left' : 'sr-element-right'} sr-delay-${i + 1} group relative border border-white/[0.07] p-6 flex gap-4 items-start transition-all duration-400 hover:border-red-500/20 overflow-hidden`}
            >
              {/* Pointer-following glow */}
              <div
                className="absolute w-[200px] h-[200px] bg-red-500/[0.06] blur-[60px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  left: mouse.x - 100,
                  top: mouse.y - 100,
                }}
              />
              <div className="relative z-10 shrink-0 w-9 h-9 border border-red-500/25 flex items-center justify-center text-red-500 mt-0.5 group-hover:border-red-500/50 group-hover:shadow-[0_0_12px_rgba(220,38,38,0.15)] transition-all duration-300">
                {r.icon}
              </div>
              <div className="relative z-10">
                <h3 className="font-['Space_Grotesk'] text-[0.95rem] font-extrabold text-white mb-1.5 tracking-tight">{r.title}</h3>
                <p className="text-white/32 text-[0.84rem] leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Gradient transition to light */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-[#f8f8f8] pointer-events-none z-10" />
    </section>
  );
}
