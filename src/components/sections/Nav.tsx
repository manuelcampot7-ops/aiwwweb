"use client";

import React, { useState, useEffect } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-400 ${scrolled ? 'py-3 bg-white/85 backdrop-blur-[24px] border-b border-purple-500/[0.06] shadow-[0_1px_10px_rgba(0,0,0,0.04)]' : 'py-5'}`}>
      <div className="max-w-[1180px] mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-['Space_Grotesk'] font-extrabold text-[1.4rem] tracking-tight">
          <span className="bg-gradient-to-br from-purple-500 to-purple-700 bg-clip-text text-transparent">AI</span>WWWeb
        </a>
        <ul className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-full md:top-auto left-0 md:left-auto w-full md:w-auto bg-white/[0.97] md:bg-transparent backdrop-blur-[20px] md:backdrop-blur-none p-6 md:p-0 gap-[18px] md:gap-9 list-none border-b md:border-0 border-purple-500/[0.06] shadow-md md:shadow-none`}>
          {['services', 'portfolio', 'why', 'pricing', 'faq'].map((item) => (
            <li key={item}>
              <button onClick={() => scrollTo(item)} className="text-[0.875rem] font-medium text-gray-500 hover:text-purple-600 transition-colors capitalize bg-transparent border-none cursor-pointer">
                {item === 'why' ? 'Why Us' : item}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => scrollTo('contact')} className="hidden md:block px-6 py-2.5 rounded-full text-[0.875rem] font-semibold bg-purple-600 text-white hover:bg-purple-700 hover:shadow-[0_8px_30px_rgba(139,92,246,0.18)] hover:-translate-y-px transition-all border-none cursor-pointer">
          Get Started
        </button>
        <button className="md:hidden bg-transparent border-none text-gray-900 text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          &#9776;
        </button>
      </div>
    </nav>
  );
}
