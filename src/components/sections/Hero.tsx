"use client";

import React, { useState, useEffect } from 'react';

const phrases = [
  'Showcase Your Business',
  'Grow Your Brand',
  'Automate Your Sales',
  'Impress Your Clients',
  'Dominate Your Market',
  'Transform Your Presence'
];

export default function Hero() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const interval = setInterval(() => {
      if (!document.hidden) {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentPhrase((prev) => (prev + 1) % phrases.length);
          setIsAnimating(false);
        }, 400);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-[1] min-h-screen flex items-center pt-[140px] pb-[100px] overflow-hidden" id="hero">
      {/* Aurora Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0" style={{ maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 10%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 10%, transparent 70%)' }}>
          <div className="absolute inset-[-10px] pointer-events-none opacity-40 blur-[12px] animate-aurora"
            style={{
              backgroundImage: 'repeating-linear-gradient(100deg, #fff 0%, #fff 7%, transparent 10%, transparent 12%, #fff 16%), repeating-linear-gradient(100deg, #a78bfa 10%, #818cf8 15%, #93c5fd 20%, #c4b5fd 25%, #7c3aed 30%)',
              backgroundSize: '300% 200%',
            }}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-b from-transparent to-white z-[1]" />
      </div>

      <div className="max-w-[1180px] mx-auto px-6 w-full">
        <div className="text-center max-w-[860px] mx-auto relative z-[2]">
          {/* Pill */}
          <div className={`inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200 text-[0.8rem] font-semibold text-purple-600 mb-8 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[50px]'}`}>
            <span className="w-[7px] h-[7px] rounded-full bg-purple-500 animate-pulse" />
            AI-Powered Digital Solutions
          </div>

          {/* Heading */}
          <h1 className={`font-['Space_Grotesk'] text-[clamp(3rem,6.5vw,5.5rem)] font-extrabold tracking-tight leading-[1.1] mb-6 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[50px]'}`}>
            We Improve How You<br />
            <span
              className={`bg-gradient-to-br from-purple-500 via-purple-700 to-purple-600 bg-clip-text text-transparent inline-block transition-all duration-400 ${isAnimating ? 'opacity-0 blur-[6px]' : 'opacity-100 blur-0'}`}
            >
              {phrases[currentPhrase]}
            </span>
            <br />Online
          </h1>

          {/* Orbiting words */}
          <div className="relative mx-auto pointer-events-none hidden lg:block" style={{ position: 'absolute', width: '500px', height: '500px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animation: 'spin 30s linear infinite' }}>
            {['Websites', 'AI Agents', 'Voice AI', 'Text AI', 'Domains'].map((word, i) => {
              const styles: React.CSSProperties[] = [
                { top: '0%', left: '50%' },
                { top: '25%', right: '-5%' },
                { bottom: '5%', right: '10%' },
                { bottom: '15%', left: '-2%' },
                { top: '20%', left: '-5%' },
              ];
              return (
                <span
                  key={word}
                  className="absolute font-['Space_Grotesk'] font-bold text-[0.85rem] tracking-[2px] uppercase text-purple-300 opacity-50 px-4 py-1.5 rounded-full border border-purple-200 bg-purple-50/60 backdrop-blur-[4px] whitespace-nowrap"
                  style={{ ...styles[i], animation: 'counter-spin 30s linear infinite' }}
                >
                  {word}
                </span>
              );
            })}
          </div>

          {/* Subtitle */}
          <p className={`text-[clamp(1rem,1.8vw,1.2rem)] text-gray-500 max-w-[580px] mx-auto mb-11 leading-relaxed transition-all duration-1000 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[50px]'}`}>
            Custom websites, AI voice &amp; text agents, and a dedicated business phone number — everything you need to stand out and convert more customers, automatically.
          </p>

          {/* CTA Button */}
          <div className={`flex gap-3.5 justify-center flex-wrap transition-all duration-1000 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[50px]'}`}>
            <a href="tel:+1XXXXXXXXXX" className="group relative px-11 py-[18px] rounded-full font-extrabold text-[1.1rem] bg-gradient-to-br from-purple-600 to-purple-800 text-white border-none cursor-pointer inline-flex items-center gap-3 shadow-[0_6px_30px_rgba(124,58,237,0.3)] hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_16px_50px_rgba(124,58,237,0.4)] transition-all duration-400 overflow-hidden">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 animate-phone-ring">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </span>
              <span className="relative z-[1]">Talk to Us — It&apos;s Free</span>
              <span className="absolute inset-[-3px] rounded-full border-2 border-purple-500/50 animate-call-pulse" />
              <span className="absolute top-0 left-[-100%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer" />
            </a>
          </div>

          {/* Metrics */}
          <div className={`flex justify-center gap-14 mt-[72px] flex-wrap transition-all duration-1000 delay-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[50px]'}`}>
            {[
              { value: '5', label: 'AI-Powered Services' },
              { value: '24/7', label: 'Agents Always Active' },
              { value: '100%', label: 'Custom Built' },
            ].map((m) => (
              <div key={m.label} className="text-center">
                <strong className="block font-['Space_Grotesk'] text-[2.5rem] font-extrabold bg-gradient-to-br from-purple-500 to-purple-700 bg-clip-text text-transparent">
                  {m.value}
                </strong>
                <span className="text-[0.82rem] text-gray-400 font-medium">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
