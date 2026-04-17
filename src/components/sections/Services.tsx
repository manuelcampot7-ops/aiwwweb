"use client";
import React, { useEffect, useRef } from 'react';

const services = [
  {
    number: '01',
    title: 'Custom Website',
    desc: 'Beautiful, fast, and conversion-optimized — built specifically for your business.',
    tags: ['Mobile-First', 'SEO Optimized', 'Fast Loading', 'Custom Design'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Domain & Hosting',
    desc: 'Domain, SSL, and hosting — all handled. Your site stays online and protected 24/7.',
    tags: ['SSL Secured', '99.9% Uptime', 'Fully Managed'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="4" rx="1"/><rect x="2" y="9" width="20" height="4" rx="1"/><rect x="2" y="15" width="20" height="4" rx="1"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'AI Voice Agent',
    desc: 'Answers calls, qualifies leads, and books appointments — 24/7. No human needed.',
    tags: ['24/7 Active', 'Qualifies Leads', 'Books Appointments'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    ),
    featured: true,
  },
  {
    number: '04',
    title: 'Business Phone Number',
    desc: 'A dedicated AI-powered number. Instant, intelligent responses while you grow.',
    tags: ['Dedicated Number', 'Instant Response', 'AI Powered'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    featured: true,
  },
  {
    number: '05',
    title: 'AI Text Agent',
    desc: 'Engages leads, answers questions, and converts inquiries — on autopilot.',
    tags: ['Auto Follow-Up', 'Lead Nurturing', '24/7 Active'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    featured: true,
  },
];

/* Floating particle positions — static so they don't re-render */
const particles = Array.from({ length: 35 }, (_, i) => ({
  left: `${5 + (i * 17.3) % 90}%`,
  top: `${3 + (i * 23.7) % 94}%`,
  size: 3 + (i % 4) * 2,
  delay: (i * 0.6) % 8,
  duration: 3 + (i % 3) * 1.5,
  opacity: 0.15 + (i % 5) * 0.06,
}));

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!cards?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Delay based on transitionDelay to stagger
            const delay = parseInt((entry.target as HTMLElement).style.transitionDelay || '0');
            setTimeout(() => entry.target.classList.add('in-view'), delay);
          }
        });
      },
      { threshold: 0.08 }
    );

    cards.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative py-28 md:py-36 bg-white overflow-hidden">

      {/* Floating red particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(220,38,38,${p.opacity}) 0%, rgba(220,38,38,0) 70%)`,
            animation: `float-gentle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Larger ambient glows */}
      <div className="absolute top-[15%] left-[8%] w-[180px] h-[180px] rounded-full bg-red-500/[0.04] blur-[60px] pointer-events-none" />
      <div className="absolute top-[60%] right-[5%] w-[220px] h-[220px] rounded-full bg-red-500/[0.035] blur-[70px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[40%] w-[160px] h-[160px] rounded-full bg-red-400/[0.03] blur-[50px] pointer-events-none" />

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6">

        {/* Header */}
        <div data-reveal className="mb-20 text-center reveal-card">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px bg-red-400" />
            <span className="text-[0.6rem] font-mono font-bold tracking-[5px] uppercase text-red-500">What We Deliver</span>
            <span className="w-8 h-px bg-red-400" />
          </div>
          <h2 className="font-['Space_Grotesk'] text-[clamp(2rem,4.5vw,3.6rem)] font-extrabold tracking-[-0.04em] text-[#0a0a0a] leading-[1.06] max-w-[600px] mx-auto">
            Everything Your Business Needs To{' '}
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">Win Online</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* Row 1: Custom Website (wide) + Domain */}
          <div
            data-reveal
            className="md:col-span-7 group relative bg-white border border-gray-200 shadow-sm hover:border-red-300 rounded-2xl p-7 md:p-8 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(220,38,38,0.08)] hover:-translate-y-0.5"
            style={{ transitionDelay: '0ms' }}
          >
            <div className="absolute top-4 right-5 font-['Space_Grotesk'] text-[4.5rem] font-extrabold text-red-500/[0.05] select-none leading-none pointer-events-none">01</div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-5 text-white shadow-[0_4px_16px_rgba(220,38,38,0.2)] group-hover:shadow-[0_6px_24px_rgba(220,38,38,0.3)] group-hover:scale-105 transition-all duration-300">{services[0].icon}</div>
            <h3 className="font-['Space_Grotesk'] text-[1.15rem] font-bold text-[#0a0a0a] mb-2">{services[0].title}</h3>
            <p className="text-gray-500 text-[0.85rem] leading-relaxed mb-5 max-w-[380px]">{services[0].desc}</p>
            <div className="flex flex-wrap gap-2">
              {services[0].tags.map(t => (
                <span key={t} className="px-2.5 py-1 text-[0.6rem] font-mono font-semibold border border-red-200 text-red-500 rounded-full hover:bg-red-50 hover:border-red-300 transition-colors duration-200">{t}</span>
              ))}
            </div>
          </div>

          <div
            data-reveal
            className="md:col-span-5 group relative bg-white border border-gray-200 shadow-sm hover:border-red-300 rounded-2xl p-7 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(220,38,38,0.08)] hover:-translate-y-0.5"
            style={{ transitionDelay: '80ms' }}
          >
            <div className="absolute top-4 right-5 font-['Space_Grotesk'] text-[4.5rem] font-extrabold text-red-500/[0.05] select-none leading-none pointer-events-none">02</div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-5 text-white shadow-[0_4px_16px_rgba(220,38,38,0.2)] group-hover:shadow-[0_6px_24px_rgba(220,38,38,0.3)] group-hover:scale-105 transition-all duration-300">{services[1].icon}</div>
            <h3 className="font-['Space_Grotesk'] text-[1.15rem] font-bold text-[#0a0a0a] mb-2">{services[1].title}</h3>
            <p className="text-gray-500 text-[0.85rem] leading-relaxed mb-5">{services[1].desc}</p>
            <div className="flex flex-wrap gap-2">
              {services[1].tags.map(t => (
                <span key={t} className="px-2.5 py-1 text-[0.6rem] font-mono font-semibold border border-red-200 text-red-500 rounded-full hover:bg-red-50 hover:border-red-300 transition-colors duration-200">{t}</span>
              ))}
            </div>
          </div>

          {/* Row 2: AI trifecta */}
          {services.slice(2).map((s, i) => (
            <div
              key={s.number}
              data-reveal
              className="md:col-span-4 group relative rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 bg-gradient-to-b from-[#fafafa] to-white border border-gray-200 shadow-sm hover:border-red-300 hover:shadow-[0_10px_50px_rgba(220,38,38,0.1)]"
              style={{ transitionDelay: `${160 + i * 80}ms` }}
            >
              {/* AI badge */}
              <div className="absolute top-4 right-5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[0.5rem] font-mono font-bold tracking-[2px] uppercase text-red-500/60">AI</span>
              </div>

              <div className="absolute bottom-3 right-5 font-['Space_Grotesk'] text-[4rem] font-extrabold text-red-500/[0.06] select-none leading-none pointer-events-none">{s.number}</div>

              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-5 text-white shadow-[0_4px_16px_rgba(220,38,38,0.2)] group-hover:shadow-[0_6px_24px_rgba(220,38,38,0.3)] group-hover:scale-105 transition-all duration-300">{s.icon}</div>
              <h3 className="font-['Space_Grotesk'] text-[1.1rem] font-bold text-[#0a0a0a] mb-2">{s.title}</h3>
              <p className="text-gray-500 text-[0.84rem] leading-relaxed mb-5">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map(t => (
                  <span key={t} className="px-2.5 py-1 text-[0.6rem] font-mono font-semibold border border-red-200 text-red-500 rounded-full hover:bg-red-50 hover:border-red-300 transition-colors duration-200">{t}</span>
                ))}
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />

      <style>{`
        [data-reveal] {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), background 0.5s, border-color 0.5s, box-shadow 0.5s;
        }
        [data-reveal].in-view {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}
