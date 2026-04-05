"use client";

import React from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';

const projects = [
  {
    href: 'https://raullisazohomes.com',
    emoji: '🏠',
    domain: 'raullisazohomes.com',
    title: 'Raul Lisazo Homes',
    desc: 'Real estate website with property listings, lead capture, and AI agent integration.',
    tag: 'REAL ESTATE',
  },
  {
    href: 'https://newhomeshernando.com',
    emoji: '🏡',
    domain: 'newhomeshernando.com',
    title: 'New Homes Hernando',
    desc: 'New construction listings with virtual tours and automated follow-ups.',
    tag: 'REAL ESTATE',
  },
  {
    href: 'https://conjuntopalomino.com',
    emoji: '⚖️',
    domain: 'conjuntopalomino.com',
    title: 'Conjunto Palomino',
    desc: 'Law firm website with appointment booking, case inquiry forms, and professional branding.',
    tag: 'LEGAL',
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative z-[1] py-[120px] bg-[#faf8ff]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center mb-16 sr-element">
          <div className="text-[0.75rem] font-bold tracking-[3px] uppercase text-purple-600 mb-4 flex items-center justify-center gap-3">
            <span className="w-6 h-0.5 bg-purple-500 rounded" />
            Our Work
          </div>
          <h2 className="font-['Space_Grotesk'] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight mb-4">
            Projects We&apos;ve Brought to Life
          </h2>
          <p className="text-[1.05rem] text-gray-500 max-w-[560px] mx-auto leading-relaxed">
            Real businesses, real results. Click any project to visit the live website.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <a key={p.title} href={p.href} target="_blank" rel="noopener noreferrer" className="block group">
              <GlowCard glowColor="purple" customSize className={`!aspect-auto !shadow-none !p-0 !gap-0 sr-element hover:-translate-y-2 hover:scale-[1.01] transition-transform duration-500`}>
                {/* Thumbnail */}
                <div className="h-[220px] relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 rounded-t-2xl">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-[3.5rem]">
                    {p.emoji}
                    <span className="text-[0.8rem] text-gray-400 mt-2 font-sans">{p.domain}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/85 via-purple-900/20 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <span className="px-[22px] py-2.5 rounded-full bg-white text-purple-700 text-[0.82rem] font-bold inline-flex items-center gap-1.5">
                      Visit Live Site →
                    </span>
                  </div>
                </div>
                {/* Info */}
                <div className="p-[22px_24px] relative z-[2]">
                  <h3 className="font-['Space_Grotesk'] text-[1.1rem] font-bold mb-1.5">{p.title}</h3>
                  <p className="text-[0.85rem] text-gray-400 leading-relaxed">{p.desc}</p>
                  <span className="inline-block mt-3 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-[0.72rem] font-bold tracking-[0.5px]">
                    {p.tag}
                  </span>
                </div>
              </GlowCard>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
