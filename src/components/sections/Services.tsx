"use client";
import React from 'react';

const services = [
  {
    number: '01',
    title: 'Custom Website',
    desc: 'Beautiful, fast, and conversion-optimized websites built specifically for your business. Mobile-first, SEO-ready, engineered to impress.',
    tags: ['Mobile-First', 'SEO Optimized', 'Fast Loading', 'Custom Design'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Domain & Hosting',
    desc: 'Domain, SSL, and hosting — all handled. Your site stays online, fast, and protected 24/7.',
    tags: ['SSL Secured', '99.9% Uptime', 'Fully Managed'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Business Phone Number',
    desc: 'A dedicated AI-powered business number. Instant, intelligent responses while you focus on growth.',
    tags: ['Dedicated Number', 'Instant Response', 'AI Powered'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    number: '05',
    title: 'AI Text Agent',
    desc: 'Engages leads, answers questions, sends follow-ups, and converts inquiries — on autopilot.',
    tags: ['Auto Follow-Up', 'Lead Nurturing', '24/7 Active'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-white bg-dots overflow-hidden">

      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />

      {/* Decorative parallax elements */}
      <div data-parallax="0.08" className="absolute top-20 right-10 w-32 h-32 border border-red-100 rounded-full opacity-30 pointer-events-none hidden md:block" />
      <div data-parallax="-0.06" className="absolute bottom-40 left-8 w-20 h-20 border border-red-200 opacity-20 rotate-45 pointer-events-none hidden md:block" />

      <div className="relative z-10 max-w-[1180px] mx-auto px-6">

        {/* Header — blur reveal */}
        <div className="mb-16 sr-element-blur">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-red-500 sr-line-draw" />
            <span className="text-[0.62rem] font-mono font-bold tracking-[5px] uppercase text-red-500">What We Deliver</span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold tracking-[-0.04em] text-[#0a0a0a] leading-[1.04] max-w-[580px] sr-words">
            Everything Your Business Needs To Win Online
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          {/* 01 — Custom Website (span 2) */}
          <div className="md:col-span-2 sr-element-scale-rotate sr-delay-1 group card-scan-hover bg-white border border-[#e2e2e2] rounded-xl p-7 md:p-8 relative overflow-hidden transition-all duration-400 hover:shadow-[inset_2px_0_0_0_#dc2626,0_12px_40px_rgba(0,0,0,0.07)] hover:-translate-y-0.5">
            <div className="absolute top-3 right-5 font-['Space_Grotesk'] text-[5rem] font-extrabold text-black/[0.03] select-none leading-none pointer-events-none">01</div>
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-5 shadow-[0_4px_14px_rgba(220,38,38,0.22)] group-hover:scale-110 transition-transform duration-300">{services[0].icon}</div>
            <h3 className="font-['Space_Grotesk'] text-[1.2rem] font-extrabold text-[#0a0a0a] mb-2">{services[0].title}</h3>
            <p className="text-[#6b7280] text-[0.87rem] leading-relaxed mb-5 max-w-[400px]">{services[0].desc}</p>
            <div className="flex flex-wrap gap-2">
              {services[0].tags.map(t => (
                <span key={t} className="px-3 py-1 text-[0.65rem] font-mono font-bold border border-red-200 text-red-600 tracking-wide hover:bg-red-50 hover:border-red-300 transition-colors duration-200">{t}</span>
              ))}
            </div>
          </div>

          {/* 02 — Domain & Hosting */}
          <div className="sr-element-rotate sr-delay-2 group card-scan-hover bg-white border border-[#e2e2e2] rounded-xl p-7 relative overflow-hidden transition-all duration-400 hover:shadow-[inset_2px_0_0_0_#dc2626,0_12px_40px_rgba(0,0,0,0.07)] hover:-translate-y-0.5">
            <div className="absolute top-3 right-5 font-['Space_Grotesk'] text-[5rem] font-extrabold text-black/[0.03] select-none leading-none pointer-events-none">02</div>
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-5 shadow-[0_4px_14px_rgba(220,38,38,0.22)] group-hover:scale-110 transition-transform duration-300">{services[1].icon}</div>
            <h3 className="font-['Space_Grotesk'] text-[1.1rem] font-extrabold text-[#0a0a0a] mb-2">{services[1].title}</h3>
            <p className="text-[#6b7280] text-[0.85rem] leading-relaxed mb-5">{services[1].desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {services[1].tags.map(t => (
                <span key={t} className="px-2.5 py-1 text-[0.65rem] font-mono font-bold border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors duration-200">{t}</span>
              ))}
            </div>
          </div>

          {/* 03 — AI Voice Agent */}
          <div className="sr-element-left sr-delay-3 group card-scan-hover bg-white border border-[#e2e2e2] rounded-xl p-7 relative overflow-hidden transition-all duration-400 hover:shadow-[inset_2px_0_0_0_#dc2626,0_12px_40px_rgba(0,0,0,0.07)] hover:-translate-y-0.5">
            <div className="absolute top-3 right-5 font-['Space_Grotesk'] text-[5rem] font-extrabold text-black/[0.03] select-none leading-none pointer-events-none">03</div>
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-4 shadow-[0_4px_14px_rgba(220,38,38,0.22)] group-hover:scale-110 transition-transform duration-300">{services[2].icon}</div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-red-200 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[0.58rem] font-mono font-bold text-red-600 tracking-wider">LIVE 24/7</span>
            </div>
            <h3 className="font-['Space_Grotesk'] text-[1.1rem] font-extrabold text-[#0a0a0a] mb-2">{services[2].title}</h3>
            <p className="text-[#6b7280] text-[0.85rem] leading-relaxed mb-5">{services[2].desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {services[2].tags.map(t => (
                <span key={t} className="px-2.5 py-1 text-[0.65rem] font-mono font-bold border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors duration-200">{t}</span>
              ))}
            </div>
          </div>

          {/* 04 — Business Phone */}
          <div className="sr-element-right sr-delay-4 group card-scan-hover bg-white border border-[#e2e2e2] rounded-xl p-7 relative overflow-hidden transition-all duration-400 hover:shadow-[inset_2px_0_0_0_#dc2626,0_12px_40px_rgba(0,0,0,0.07)] hover:-translate-y-0.5">
            <div className="absolute top-3 right-5 font-['Space_Grotesk'] text-[5rem] font-extrabold text-black/[0.03] select-none leading-none pointer-events-none">04</div>
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-5 shadow-[0_4px_14px_rgba(220,38,38,0.22)] group-hover:scale-110 transition-transform duration-300">{services[3].icon}</div>
            <h3 className="font-['Space_Grotesk'] text-[1.1rem] font-extrabold text-[#0a0a0a] mb-2">{services[3].title}</h3>
            <p className="text-[#6b7280] text-[0.85rem] leading-relaxed mb-5">{services[3].desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {services[3].tags.map(t => (
                <span key={t} className="px-2.5 py-1 text-[0.65rem] font-mono font-bold border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors duration-200">{t}</span>
              ))}
            </div>
          </div>

          {/* 05 — AI Text Agent */}
          <div className="sr-element-scale-rotate sr-delay-5 group card-scan-hover bg-white border border-[#e2e2e2] rounded-xl p-7 relative overflow-hidden transition-all duration-400 hover:shadow-[inset_2px_0_0_0_#dc2626,0_12px_40px_rgba(0,0,0,0.07)] hover:-translate-y-0.5">
            <div className="absolute top-3 right-5 font-['Space_Grotesk'] text-[5rem] font-extrabold text-black/[0.03] select-none leading-none pointer-events-none">05</div>
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-5 shadow-[0_4px_14px_rgba(220,38,38,0.22)] group-hover:scale-110 transition-transform duration-300">{services[4].icon}</div>
            <h3 className="font-['Space_Grotesk'] text-[1.1rem] font-extrabold text-[#0a0a0a] mb-2">{services[4].title}</h3>
            <p className="text-[#6b7280] text-[0.85rem] leading-relaxed mb-4">{services[4].desc}</p>
            {/* Mini chat */}
            <div className="flex flex-col gap-1.5 mb-4 p-3 rounded-lg bg-[#f8f8f8] border border-[#ececec]">
              {[
                { msg: 'New lead', right: false },
                { msg: 'How can I help?', right: true },
                { msg: 'Need a quote', right: false },
                { msg: 'On it!', right: true },
              ].map((b, i) => (
                <div key={i} className={`flex ${b.right ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-2.5 py-1 text-[0.68rem] font-medium ${b.right ? 'bg-gradient-to-br from-red-600 to-red-700 text-white rounded-sm' : 'bg-white text-[#6b7280] border border-[#e2e2e2] rounded-sm'}`}>{b.msg}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {services[4].tags.map(t => (
                <span key={t} className="px-2.5 py-1 text-[0.65rem] font-mono font-bold border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors duration-200">{t}</span>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-100 to-transparent" />
    </section>
  );
}
