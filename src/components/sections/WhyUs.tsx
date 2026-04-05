"use client";

import React from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';

const reasons = [
  { icon: '⚡', title: 'AI That Works While You Sleep', desc: 'Voice and text agents handle inquiries 24/7 — no missed calls, no lost leads.' },
  { icon: '🎯', title: 'Built to Convert, Not Just Look Pretty', desc: 'Every element is designed to turn visitors into paying customers.' },
  { icon: '🔧', title: 'All-In-One Solution', desc: 'Website, AI agents, phone number — one provider, one invoice, zero headaches.' },
  { icon: '🚀', title: 'Launch in Days, Not Months', desc: 'Your full digital system can be live in under two weeks.' },
];

export default function WhyUs() {
  return (
    <section id="why" className="relative z-[1] py-[120px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="sr-element">
            <div className="mb-16">
              <div className="text-[0.75rem] font-bold tracking-[3px] uppercase text-purple-600 mb-4 flex items-center gap-3">
                <span className="w-6 h-0.5 bg-purple-500 rounded" />
                Why AI WWWeb
              </div>
              <h2 className="font-['Space_Grotesk'] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight mb-4">
                Not Just a Website.<br />A Complete Digital Engine.
              </h2>
              <p className="text-[1.05rem] text-gray-500 max-w-[560px] leading-relaxed">
                Most agencies give you a website and wish you luck. We give you an entire AI-powered system that generates leads and grows your business.
              </p>
            </div>
            <div className="flex flex-col gap-8">
              {reasons.map((r) => (
                <div key={r.title} className="flex gap-4">
                  <div className="w-11 h-11 min-w-[44px] rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[1.1rem]">
                    {r.icon}
                  </div>
                  <div>
                    <h4 className="font-['Space_Grotesk'] text-[1rem] font-bold mb-1">{r.title}</h4>
                    <p className="text-[0.88rem] text-gray-500 leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <GlowCard glowColor="purple" customSize className="!aspect-auto !shadow-none !p-0 sr-element">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-3xl p-14 text-center relative z-[2]">
              <div className="font-['Space_Grotesk'] text-[5.5rem] font-extrabold bg-gradient-to-br from-purple-500 to-purple-700 bg-clip-text text-transparent leading-none">
                5-in-1
              </div>
              <div className="text-[1.1rem] text-gray-500 mt-2">
                Complete Digital Solution<br />in a Single Package
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
