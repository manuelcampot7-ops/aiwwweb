"use client";
import React, { useState } from 'react';

export default function CTA() {
  const [name,  setName]  = useState('');
  const [email, setEmail] = useState('');
  const [sent,  setSent]  = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSent(true);
    setName('');
    setEmail('');
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden bg-white">

      {/* Top red accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/35 to-transparent" />

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="w-full h-full object-cover opacity-[0.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-transparent" />
      </div>

      {/* Pulse rings */}
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] pointer-events-none z-0">
        <div className="absolute inset-0 rounded-full border border-red-500/10" style={{ animation: 'pulse-ring-expand 4s ease-out infinite' }} />
        <div className="absolute inset-0 rounded-full border border-red-500/10" style={{ animation: 'pulse-ring-expand 4s ease-out 1.3s infinite' }} />
        <div className="absolute inset-0 rounded-full border border-red-500/10" style={{ animation: 'pulse-ring-expand 4s ease-out 2.6s infinite' }} />
      </div>

      {/* Subtle center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[280px] bg-red-600/[0.08] blur-[90px] rounded-full pointer-events-none z-0" />

      {/* UI corner brackets */}
      <div className="absolute top-8 left-8 z-[2] pointer-events-none hidden md:block">
        <div className="w-6 h-px bg-red-500/20" />
        <div className="w-px h-6 bg-red-500/20" />
      </div>
      <div className="absolute top-8 right-8 z-[2] pointer-events-none hidden md:flex flex-col items-end">
        <div className="w-6 h-px bg-red-500/20" />
        <div className="w-px h-6 bg-red-500/20" />
      </div>
      <div className="absolute bottom-8 left-8 z-[2] pointer-events-none hidden md:flex flex-col justify-end">
        <div className="w-px h-6 bg-red-500/20" />
        <div className="w-6 h-px bg-red-500/20" />
      </div>
      <div className="absolute bottom-8 right-8 z-[2] pointer-events-none hidden md:flex flex-col items-end justify-end">
        <div className="w-px h-6 bg-red-500/20" />
        <div className="w-6 h-px bg-red-500/20" />
      </div>

      <div className="relative z-10 max-w-[620px] mx-auto px-6 text-center">

        <div className="flex items-center justify-center gap-3 mb-8 sr-element-blur">
          <span className="w-6 h-px bg-red-500" />
          <span className="text-[0.6rem] font-mono font-bold tracking-[5px] uppercase text-red-500">Get Started</span>
          <span className="w-6 h-px bg-red-500" />
        </div>

        <h2 className="font-['Space_Grotesk'] text-[clamp(2.2rem,5.5vw,4.2rem)] font-extrabold tracking-[-0.04em] text-[#0a0a0a] leading-[1.04] mb-4 sr-element-blur sr-delay-1">
          Ready to Grow<br />
          <span className="bg-gradient-to-br from-red-400 to-red-600 bg-clip-text text-transparent">Your Business?</span>
        </h2>

        <p className="text-gray-500 text-[0.9rem] leading-relaxed mb-10 sr-element sr-delay-2">
          Let&apos;s build your website and AI system in 48 hours. No contracts. No technical headaches.
        </p>

        <form onSubmit={handleSubmit} className="sr-element-scale sr-delay-3 flex flex-col gap-3 max-w-[420px] mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="input-glow w-full px-5 py-3.5 bg-white border border-gray-200 text-[#0a0a0a] placeholder-gray-400 text-[0.87rem] font-mono focus:outline-none focus:border-red-500/50 transition-all duration-300"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input-glow w-full px-5 py-3.5 bg-white border border-gray-200 text-[#0a0a0a] placeholder-gray-400 text-[0.87rem] font-mono focus:outline-none focus:border-red-500/50 transition-all duration-300"
          />
          <button
            type="submit"
            className="btn-shimmer w-full py-4 font-extrabold text-[0.9rem] font-mono bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 shadow-[0_4px_30px_rgba(220,38,38,0.28)] hover:shadow-[0_8px_40px_rgba(220,38,38,0.40)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer tracking-wider"
          >
            {sent ? 'WE\'LL BE IN TOUCH SOON' : 'GET MY FREE CONSULTATION'}
          </button>
        </form>

        <div className="flex items-center justify-center gap-6 mt-8 sr-element sr-delay-4">
          <a href="mailto:hello@aiwwweb.com" className="flex items-center gap-2 text-gray-500 text-[0.78rem] font-mono hover:text-gray-700 transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            hello@aiwwweb.com
          </a>
          <span className="w-px h-3 bg-gray-200" />
          <span className="flex items-center gap-2 text-gray-500 text-[0.78rem] font-mono">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Florida, USA
          </span>
        </div>

      </div>
    </section>
  );
}
