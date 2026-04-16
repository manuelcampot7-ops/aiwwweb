"use client";

import React, { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Services', id: 'services' },
  { label: 'Work',     id: 'portfolio' },
  { label: 'Pricing',  id: 'pricing' },
  { label: 'FAQ',      id: 'faq' },
];

export default function Nav() {
  const [scrolled, setScrolled]         = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero');
      if (hero) setScrolled(hero.getBoundingClientRect().bottom <= 0);
      else setScrolled(window.scrollY > 60);

      // Scroll progress
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPercent(h > 0 ? (window.scrollY / h) * 100 : 0);

      // Active section detection
      const sections = ['faq', 'pricing', 'portfolio', 'services'];
      let found = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) { found = id; break; }
      }
      setActiveSection(found);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-400 ${
        scrolled
          ? 'py-3 bg-white/96 backdrop-blur-[24px] border-b border-black/[0.06] shadow-[0_1px_14px_rgba(0,0,0,0.04)]'
          : 'py-5'
      }`}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-red-600 to-red-500 z-[101]"
        style={{ width: `${scrollPercent}%`, transition: 'none' }}
      />

      <div className="max-w-[1180px] mx-auto px-6 flex items-center justify-between gap-8">

        {/* Logo */}
        <a href="#" className="group/logo font-['Space_Grotesk'] font-extrabold text-[1.4rem] tracking-tight shrink-0 relative">
          <span className="bg-gradient-to-br from-red-500 to-red-700 bg-clip-text text-transparent group-hover/logo:from-red-400 group-hover/logo:to-red-600 transition-all duration-300">AI</span>
          <span className={`transition-colors duration-400 ${scrolled ? 'text-[#0a0a0a]' : 'text-white'}`}>WWWEB</span>
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-red-500 to-red-700 group-hover/logo:w-full transition-all duration-400" />
        </a>

        {/* Center links — desktop */}
        <div className="hidden md:flex items-center gap-7 flex-1 justify-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`relative text-[0.82rem] font-medium transition-all duration-300 bg-transparent border-none cursor-pointer tracking-wide ${
                scrolled
                  ? activeSection === link.id ? 'text-red-600' : 'text-[#555] hover:text-red-600'
                  : activeSection === link.id ? 'text-white' : 'text-white/50 hover:text-white/90'
              }`}
            >
              {link.label}
              {/* Active dot */}
              <span
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-500 transition-all duration-300"
                style={{ opacity: activeSection === link.id ? 1 : 0, transform: `translateX(-50%) scale(${activeSection === link.id ? 1 : 0})` }}
              />
            </button>
          ))}
        </div>

        {/* Client Login */}
        <a
          href="/login"
          className={`btn-shimmer px-5 py-2 text-[0.8rem] font-semibold border transition-all duration-300 shrink-0 hover:-translate-y-0.5 ${
            scrolled
              ? 'text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 hover:shadow-[0_4px_16px_rgba(220,38,38,0.12)]'
              : 'text-white/65 border-white/18 hover:border-white/40 hover:text-white hover:shadow-[0_4px_16px_rgba(255,255,255,0.06)]'
          }`}
        >
          Client Login
        </a>
      </div>
    </nav>
  );
}
