"use client";

import React, { useState, useEffect } from 'react';

export default function AIOrb() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 4000);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed bottom-7 right-7 z-[200] cursor-pointer group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      <div className={`absolute bottom-[calc(100%+16px)] right-0 bg-white border border-red-500/[0.12] rounded-2xl px-5 py-4 w-[260px] shadow-lg transition-all duration-300 ${showTooltip ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'}`}>
        <h4 className="text-[0.9rem] font-bold text-gray-900 font-['Space_Grotesk']">🔮 AI Voice Agent</h4>
        <p className="text-[0.8rem] text-gray-500 leading-snug mt-1">Hi! I&apos;m the AI assistant. Click me to start a conversation.</p>
        <div className="absolute top-full right-7 border-8 border-transparent border-t-white" />
      </div>

      {/* Orb */}
      <div className="w-[68px] h-[68px] max-md:w-[58px] max-md:h-[58px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#a78bfa,#7c3aed,#5b21b6)] shadow-[0_0_30px_rgba(139,92,246,0.35),0_0_60px_rgba(139,92,246,0.15),inset_0_0_20px_rgba(255,255,255,0.15)] relative animate-orb-breathe hover:scale-110 transition-transform">
        {/* Rings */}
        <span className="absolute inset-[-6px] rounded-full border-2 border-red-500/25 animate-orb-ring" />
        <span className="absolute inset-[-14px] rounded-full border border-red-500/10 animate-orb-ring [animation-delay:0.5s]" />

        {/* Inner shine */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute w-[120%] h-[120%] -top-[30%] -left-[10%] bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.2),transparent,transparent)] animate-spin-slow" />
        </div>

        {/* Mic icon */}
        <div className="absolute inset-0 flex items-center justify-center z-[2]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="1.5">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="12" y1="19" x2="12" y2="23" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="8" y1="23" x2="16" y2="23" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Wave bars */}
      <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex gap-[3px] items-end h-4">
        {[6, 12, 8, 14, 6].map((h, i) => (
          <span
            key={i}
            className="w-[3px] rounded-[3px] bg-red-500 animate-wave-bar"
            style={{ height: `${h}px`, animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
