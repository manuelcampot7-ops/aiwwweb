"use client";
import React from 'react';

const steps = [
  {
    num: '01',
    label: 'Setting Up',
    title: 'Tell Us Your Vision',
    desc: 'Share your business goals, brand identity, and what you need. We ask the right questions so we can build something that actually works for you.',
  },
  {
    num: '02',
    label: 'Building',
    title: 'We Build Everything',
    desc: 'Website, AI voice agent, text agent, business phone — we design, build, and connect every piece into one powerful system.',
  },
  {
    num: '03',
    label: 'Launching',
    title: 'Launch & Grow',
    desc: 'Your site goes live in as little as 48 hours. AI agents start working immediately — capturing leads, answering calls, booking appointments.',
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 md:py-32 bg-[#fafafa] overflow-hidden">

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e0e0e0] to-transparent" />

      {/* Parallax decorative elements */}
      <div data-parallax="0.1" className="absolute top-16 left-12 w-24 h-24 border border-red-200/30 rounded-full pointer-events-none hidden md:block" />
      <div data-parallax="-0.08" className="absolute bottom-28 right-16 w-16 h-16 border border-red-300/20 rotate-12 pointer-events-none hidden md:block" />

      <div className="max-w-[1180px] mx-auto px-6">

        {/* Header — blur reveal + word animation */}
        <div className="text-center mb-20 sr-element-blur">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-6 h-px bg-red-500" />
            <span className="text-[0.62rem] font-mono font-bold tracking-[5px] uppercase text-red-500">How It Works</span>
            <span className="w-6 h-px bg-red-500" />
          </div>
          <h2 className="font-['Space_Grotesk'] text-[clamp(2rem,4.5vw,3.8rem)] font-extrabold tracking-[-0.04em] text-[#0a0a0a] leading-[1.04] max-w-[520px] mx-auto">
            Getting Started{' '}
            <span className="bg-gradient-to-br from-red-500 to-red-700 bg-clip-text text-transparent">Is Simple.</span>
          </h2>
          <p className="text-[#9ca3af] text-[0.9rem] max-w-[380px] mx-auto leading-relaxed mt-4">
            Three steps to transform your online presence.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">

          {/* Desktop connecting dashed line — draws on scroll */}
          <div className="hidden md:block absolute top-[3px] left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] z-0">
            <svg width="100%" height="2" className="overflow-visible">
              <line
                x1="0" y1="1" x2="100%" y2="1"
                stroke="rgba(220,38,38,0.3)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                style={{ animation: 'dash-flow 1.5s linear infinite' }}
              />
            </svg>
          </div>

          {steps.map((step, i) => {
            const animations = ['sr-element-left', 'sr-element-blur', 'sr-element-right'];
            return (
              <div
                key={step.num}
                className={`${animations[i]} relative z-10 flex flex-col items-center text-center sr-delay-${i + 1}`}
              >
                {/* Large number — floats above with parallax */}
                <div className="relative mb-8" data-parallax={`${0.05 + i * 0.03}`}>
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-['Space_Grotesk'] text-[7rem] font-extrabold text-red-500/[0.06] select-none leading-none pointer-events-none whitespace-nowrap">
                    {step.num}
                  </span>
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(220,38,38,0.5)]" />
                    <div className="absolute inset-0 rounded-full border border-red-500/20 animate-orb-ring" />
                  </div>
                </div>

                <span className="text-[0.6rem] font-mono font-bold tracking-[4px] uppercase text-red-500/65 mb-3">{step.label}</span>

                <h3 className="font-['Space_Grotesk'] text-[1.2rem] font-extrabold text-[#0a0a0a] mb-3 leading-tight tracking-tight">
                  {step.title}
                </h3>

                <p className="text-[#6b7280] text-[0.86rem] leading-relaxed max-w-[300px]">
                  {step.desc}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
