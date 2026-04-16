"use client";
import React from 'react';

const projects = [
  {
    number: '01',
    name: 'Raul Lisazo Homes',
    category: 'Real Estate',
    desc: 'Full digital presence — custom website, AI voice agent, and dedicated business phone number.',
    tags: ['Website', 'AI Voice', 'Phone Number'],
    url: 'https://raullisazohomes.com',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80',
  },
  {
    number: '02',
    name: 'New Homes Hernando',
    category: 'New Construction',
    desc: 'Lead generation powerhouse — capturing buyers 24/7 with AI-driven automation.',
    tags: ['Website', 'AI Text Agent', 'Domain & Hosting'],
    url: 'https://newhomeshernando.com',
    image: 'https://image.thum.io/get/width/900/crop/600/https://newhomeshernando.com',
  },
  {
    number: '03',
    name: 'Conjunto Palomino',
    category: 'Legal & Property',
    desc: 'Bilingual property management site with integrated AI support — serving residents around the clock.',
    tags: ['Website', 'Bilingual', 'AI Agent'],
    url: 'https://conjuntopalomino.com',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=80',
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 md:py-32 bg-white bg-dots">

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e0e0e0] to-transparent" />

      {/* Parallax decorative */}
      <div data-parallax="0.12" className="absolute top-32 right-6 w-28 h-28 border border-red-100/40 rounded-full pointer-events-none hidden md:block" />

      <div className="max-w-[1180px] mx-auto px-6">

        {/* Header — blur reveal */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 sr-element-blur">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 h-px bg-red-500 sr-line-draw" />
              <span className="text-[0.62rem] font-mono font-bold tracking-[5px] uppercase text-red-500">Our Work</span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-[clamp(2rem,4.5vw,3.8rem)] font-extrabold tracking-[-0.04em] text-[#0a0a0a] leading-[1.04] sr-words">
              Built & Launched
            </h2>
          </div>
          <p className="text-[#9ca3af] text-[0.87rem] max-w-[260px] leading-relaxed mt-4 md:mt-0">
            Real businesses. Real results. Every site powered by AI from day one.
          </p>
        </div>

        {/* Projects */}
        <div className="flex flex-col gap-3">
          {projects.map((p, i) => {
            const anim = i % 2 === 0 ? 'sr-element-left' : 'sr-element-right';
            return (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${anim} sr-delay-${i + 1} group block`}
              >
                <div className="border border-[#e2e2e2] rounded-xl overflow-hidden transition-all duration-500 hover:border-[#0a0a0a] hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] hover:-translate-y-0.5">
                  <div className="grid md:grid-cols-[1fr_1.6fr] min-h-[220px]">

                    {/* Image with scan hover + parallax */}
                    <div className="img-scan-hover relative overflow-hidden min-h-[200px] md:min-h-auto">
                      <div data-parallax="0.06">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 min-h-[200px] md:min-h-[220px]"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80`;
                          }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute top-4 left-4 font-['Space_Grotesk'] text-[2.2rem] font-extrabold text-white/30 leading-none">{p.number}</div>
                      <div className="absolute top-0 left-0 w-8 h-[2px] bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                      <div className="absolute top-0 left-0 w-[2px] h-8 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center p-7 lg:p-9 bg-white group-hover:bg-[#fafafa] transition-colors duration-400">
                      <span className="text-[0.6rem] font-mono font-bold tracking-[4px] uppercase text-red-500 mb-2">{p.category}</span>
                      <h3 className="font-['Space_Grotesk'] text-[1.35rem] font-extrabold text-[#0a0a0a] mb-2 tracking-tight group-hover:text-red-600 transition-colors duration-300">{p.name}</h3>
                      <p className="text-[#6b7280] text-[0.86rem] leading-relaxed mb-5 max-w-[420px]">{p.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {p.tags.map(t => (
                          <span key={t} className="px-3 py-1 text-[0.62rem] font-mono font-bold border border-[#e2e2e2] text-[#888] group-hover:border-red-200 group-hover:text-red-500 transition-colors duration-300">{t}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-[0.78rem] font-bold text-[#b0b0b0] group-hover:text-red-500 transition-all duration-300 group-hover:gap-3">
                        <span>View Live Site</span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                        </svg>
                      </div>
                    </div>

                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Gradient into dark WhyUs section */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-[#080808] pointer-events-none z-10" />
    </section>
  );
}
