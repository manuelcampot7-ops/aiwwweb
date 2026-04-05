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
    <section id="faq" className="relative z-[1] py-[120px] bg-[#faf8ff]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center mb-16 sr-element">
          <div className="text-[0.75rem] font-bold tracking-[3px] uppercase text-purple-600 mb-4 flex items-center justify-center gap-3">
            <span className="w-6 h-0.5 bg-purple-500 rounded" />
            FAQ
          </div>
          <h2 className="font-['Space_Grotesk'] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight mb-4">
            Got Questions?
          </h2>
          <p className="text-[1.05rem] text-gray-500 max-w-[560px] mx-auto leading-relaxed">
            Here are the most common ones. Don&apos;t see yours? Just reach out.
          </p>
        </div>

        <div className="max-w-[720px] mx-auto flex flex-col gap-2.5">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 sr-element ${
                openIndex === i ? 'border-purple-300 shadow-[0_1px_3px_rgba(0,0,0,0.04)]' : 'border-purple-500/[0.12]'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between bg-transparent border-none text-gray-900 text-[0.95rem] font-semibold cursor-pointer font-sans text-left"
              >
                {faq.q}
                <span className={`text-purple-500 text-[1.3rem] transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <div
                className="overflow-hidden transition-all duration-400"
                style={{ maxHeight: openIndex === i ? '300px' : '0px' }}
              >
                <div className="px-6 pb-5 text-[0.9rem] text-gray-500 leading-relaxed">
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
