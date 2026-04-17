"use client";
import React from 'react';

export default function BrandMarquee() {
  const row1 = Array.from({ length: 12 });
  const row2 = Array.from({ length: 14 });
  const row3 = Array.from({ length: 12 });

  const services = ['WEBSITES', 'AI VOICE AGENTS', 'AI TEXT AGENTS', 'BUSINESS PHONES', 'LEAD AUTOMATION', 'CUSTOM DOMAINS', '24/7 SUPPORT'];

  return (
    <div className="relative bg-white py-12 md:py-16 overflow-hidden border-y border-gray-200 group/strip">

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

      {/* Row 1 — Main brand, large */}
      <div className="flex whitespace-nowrap animate-marquee-brand mb-4 group-hover/strip:[animation-duration:20s]">
        {row1.map((_, i) => (
          <span key={i} className="inline-flex items-center shrink-0">
            <span
              className="font-['Space_Grotesk'] text-[3rem] md:text-[4.5rem] font-extrabold tracking-[-0.03em] px-6 select-none transition-all duration-500 hover:scale-105 cursor-default"
              style={{
                color: i % 3 === 1 ? 'rgba(220,38,38,0.12)' : 'transparent',
                WebkitTextStroke: i % 3 === 1 ? 'none' : i % 2 === 0 ? '1.5px rgba(0,0,0,0.08)' : '1.5px rgba(220,38,38,0.20)',
              }}
            >
              AIWWWEB
            </span>
            <span className="text-red-500/15 text-[1.4rem] font-light select-none mx-2">/</span>
          </span>
        ))}
      </div>

      {/* Row 2 — Services ticker */}
      <div className="flex whitespace-nowrap animate-marquee-brand-reverse mb-4 group-hover/strip:[animation-duration:25s]">
        {row2.map((_, i) => (
          <span key={i} className="inline-flex items-center shrink-0">
            <span className="text-[0.65rem] md:text-[0.75rem] font-mono font-bold tracking-[5px] uppercase text-gray-300 px-4 select-none hover:text-red-400/50 transition-colors duration-300 cursor-default">
              {services[i % services.length]}
            </span>
            <span className="w-1 h-1 rounded-full bg-red-500/20 shrink-0 mx-3" />
          </span>
        ))}
      </div>

      {/* Row 3 — Brand smaller */}
      <div className="flex whitespace-nowrap animate-marquee group-hover/strip:[animation-duration:15s]">
        {row3.map((_, i) => (
          <span key={i} className="inline-flex items-center shrink-0">
            <span
              className="font-['Space_Grotesk'] text-[1.4rem] md:text-[2rem] font-extrabold tracking-tight px-5 select-none hover:text-red-500/15 transition-colors duration-300 cursor-default"
              style={{
                color: 'transparent',
                WebkitTextStroke: i % 2 === 0 ? '1px rgba(220,38,38,0.10)' : '1px rgba(0,0,0,0.04)',
              }}
            >
              AIWWWEB
            </span>
            <span className="font-mono text-[0.45rem] text-gray-300 tracking-[3px] select-none mx-3">///</span>
          </span>
        ))}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
    </div>
  );
}
