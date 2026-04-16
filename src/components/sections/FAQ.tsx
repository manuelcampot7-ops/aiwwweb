"use client";

import React, { useState } from 'react';

const faqs = [
  { q: 'How long does it take to launch?', a: "Most projects are fully live within 7–14 business days. Simple websites can launch even faster. We'll give you a clear timeline during your free consultation." },
  { q: 'What does the AI Voice Agent actually do?', a: 'It answers incoming calls, greets callers professionally, answers common questions, qualifies leads, and can book appointments — all automatically, 24/7.' },
  { q: 'Do I need technical knowledge?', a: 'Not at all. We set up everything and provide simple dashboards to manage your leads and track performance. If you can use a smartphone, you can use our system.' },
  { q: 'Can I customize what the AI says?', a: 'Absolutely. We configure your AI agents with your specific business info, tone of voice, services, pricing, and FAQs. They respond exactly the way you want.' },
  { q: 'What if I already have a website?', a: "No problem! We can add AI agents to your existing site, or build you a brand new one that's fully integrated." },
  { q: 'Is there a contract?', a: 'No long-term contracts. Monthly maintenance is month-to-month and you can cancel anytime. We earn your business every month.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 md:py-28 bg-white bg-dots overflow-hidden">

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e0e0e0] to-transparent" />

      {/* Parallax decorative */}
      <div data-parallax="0.09" className="absolute top-24 right-10 w-20 h-20 border border-red-100/30 rounded-full pointer-events-none hidden md:block" />

      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center mb-14 sr-element-blur">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-6 h-px bg-red-500" />
            <span className="text-[0.62rem] font-mono font-bold tracking-[5px] uppercase text-red-500">FAQ</span>
            <span className="w-6 h-px bg-red-500" />
          </div>
          <h2 className="font-['Space_Grotesk'] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-[-0.04em] text-[#0a0a0a] mb-3 sr-words">
            Got Questions?
          </h2>
          <p className="text-[#9ca3af] text-[0.9rem] max-w-[360px] mx-auto leading-relaxed">
            Here are the most common ones. Don&apos;t see yours? Just reach out.
          </p>
        </div>

        <div className="max-w-[720px] mx-auto">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`${i % 2 === 0 ? 'sr-element-left' : 'sr-element-right'} sr-delay-${i + 1} border-b transition-all duration-300 ${
                i === 0 ? 'border-t border-b-[#e8e8e8]' : 'border-b-[#e8e8e8]'
              } ${openIndex === i ? 'border-t-red-500 bg-red-50/30' : ''}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-4 py-5 flex items-center justify-between bg-transparent border-none text-[#0a0a0a] text-[0.9rem] font-semibold cursor-pointer font-['Space_Grotesk'] text-left tracking-tight gap-4 group"
              >
                <span className="flex items-center gap-3">
                  <span className="text-[0.6rem] font-mono font-bold text-red-500/40 tracking-wider">{String(i + 1).padStart(2, '0')}</span>
                  <span>{faq.q}</span>
                </span>
                <span
                  className="shrink-0 w-6 h-6 border border-[#d8d8d8] flex items-center justify-center text-[#888] transition-all duration-300 group-hover:border-red-300 group-hover:text-red-500"
                  style={{ transform: openIndex === i ? 'rotate(45deg)' : 'none', borderColor: openIndex === i ? '#dc2626' : undefined, color: openIndex === i ? '#dc2626' : undefined }}
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <line x1="6" y1="2" x2="6" y2="10"/><line x1="2" y1="6" x2="10" y2="6"/>
                  </svg>
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-400"
                style={{ maxHeight: openIndex === i ? '280px' : '0px' }}
              >
                <div className="px-4 pb-5 text-[0.86rem] text-[#6b7280] leading-relaxed pl-[calc(1rem+2.5rem)]">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
