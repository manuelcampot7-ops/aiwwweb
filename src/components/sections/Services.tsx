"use client";

import React from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';

const services = [
  { icon: '🌐', title: 'Custom Website', desc: 'Beautiful, fast, and conversion-optimized websites designed specifically for your business. Mobile-first, SEO-ready, built to impress.' },
  { icon: '🌏', title: 'Domain & Hosting', desc: 'We handle your domain registration, SSL certificates, and reliable hosting so your site is always online, secure, and fast.' },
  { icon: '🤖', title: 'AI Voice Agent', desc: 'An intelligent voice assistant that answers calls, qualifies leads, and books appointments — 24 hours a day, 7 days a week.' },
  { icon: '📞', title: 'AI Phone Number', desc: 'A dedicated business phone number powered by AI. Your customers get instant responses while you focus on your business.' },
  { icon: '💬', title: 'AI Text Agent', desc: 'Automated text messaging that engages leads, answers questions, sends follow-ups, and converts inquiries into clients on autopilot.' },
];

export default function Services() {
  return (
    <section id="services" className="relative z-[1] py-[120px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center mb-16 sr-element">
          <div className="text-[0.75rem] font-bold tracking-[3px] uppercase text-purple-600 mb-4 flex items-center justify-center gap-3">
            <span className="w-6 h-0.5 bg-purple-500 rounded" />
            What We Deliver
          </div>
          <h2 className="font-['Space_Grotesk'] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight mb-4">
            Everything Your Business Needs<br />To Win Online
          </h2>
          <p className="text-[1.05rem] text-gray-500 max-w-[560px] mx-auto leading-relaxed">
            From custom websites to AI-powered agents — we build the digital infrastructure that works for you around the clock.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.slice(0, 3).map((svc, i) => (
            <GlowCard key={svc.title} glowColor="purple" customSize className={`!aspect-auto !shadow-none !p-0 sr-element`} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="p-[36px_30px] relative z-[2]">
                <div className="w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center text-[1.4rem] mb-5 border border-purple-100">
                  {svc.icon}
                </div>
                <h3 className="font-['Space_Grotesk'] text-[1.15rem] font-bold mb-2.5">{svc.title}</h3>
                <p className="text-[0.9rem] text-gray-500 leading-relaxed">{svc.desc}</p>
              </div>
            </GlowCard>
          ))}
        </div>

        <div className="flex justify-center gap-5 mt-5 flex-col md:flex-row items-center">
          {services.slice(3).map((svc, i) => (
            <GlowCard key={svc.title} glowColor="purple" customSize className={`!aspect-auto !shadow-none !p-0 w-full md:max-w-[380px] sr-element`} style={{ animationDelay: `${(i + 3) * 0.1}s` }}>
              <div className="p-[36px_30px] relative z-[2]">
                <div className="w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center text-[1.4rem] mb-5 border border-purple-100">
                  {svc.icon}
                </div>
                <h3 className="font-['Space_Grotesk'] text-[1.15rem] font-bold mb-2.5">{svc.title}</h3>
                <p className="text-[0.9rem] text-gray-500 leading-relaxed">{svc.desc}</p>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
