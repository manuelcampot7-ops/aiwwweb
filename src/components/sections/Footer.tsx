"use client";
import React from 'react';

const links = [
  { label: 'Services', id: 'services' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Why Us',   id: 'why' },
  { label: 'Pricing',  id: 'pricing' },
  { label: 'FAQ',      id: 'faq' },
];

export default function Footer() {
  const scroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#040404] bg-circuit">

      {/* Top red accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />

      {/* Main footer */}
      <div className="max-w-[1180px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="font-['Space_Grotesk'] text-[1.5rem] font-extrabold text-white mb-4 tracking-tight">
              AI<span className="text-red-500">WWWEB</span>
            </div>
            <p className="text-white/25 text-[0.84rem] leading-relaxed max-w-[240px] mb-5">
              Custom websites, AI voice & text agents, and business phone numbers — everything you need to grow online.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[0.58rem] font-mono text-red-500/50 tracking-[3px] uppercase">Systems Active</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[0.58rem] font-mono font-bold tracking-[4px] uppercase text-white/18 mb-5">Navigation</p>
            <ul className="flex flex-col gap-3">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scroll(l.id)}
                    className="text-white/30 text-[0.86rem] hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer font-sans group flex items-center gap-2"
                  >
                    <span className="w-0 h-px bg-red-500 group-hover:w-3 transition-all duration-300" />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[0.58rem] font-mono font-bold tracking-[4px] uppercase text-white/18 mb-5">Contact</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="mailto:hello@aiwwweb.com" className="text-white/30 text-[0.86rem] hover:text-white transition-colors duration-200 font-mono">
                  hello@aiwwweb.com
                </a>
              </li>
              <li>
                <span className="text-white/22 text-[0.86rem] font-mono">Florida, USA</span>
              </li>
              <li className="mt-3">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="btn-shimmer inline-flex items-center gap-2 text-[0.78rem] font-mono font-bold text-red-500 hover:text-red-400 transition-colors duration-200 px-4 py-2 border border-red-500/20 hover:border-red-500/40"
                >
                  Get a Free Consultation
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-[1180px] mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/16 text-[0.75rem] font-mono">&copy; 2026 AI WWWeb. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p className="text-white/12 text-[0.72rem] font-mono tracking-wider">BUILT WITH AI &middot; POWERED BY RESULTS</p>
            <a
              href="/login"
              className="text-white/20 text-[0.68rem] font-mono hover:text-white/50 transition-colors duration-200 border border-white/[0.06] hover:border-white/20 px-2.5 py-1 rounded"
            >
              Client Login
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
