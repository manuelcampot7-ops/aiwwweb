"use client";
import React, { useState } from 'react';
import IntakeFormModal from './IntakeFormModal';

const plans = [
  {
    name: 'Starter',
    price: '$49',
    setup: '$499',
    desc: 'Perfect for businesses ready to establish a professional digital presence.',
    features: [
      'Custom Website (up to 5 pages)',
      'Domain Registration',
      'SSL Certificate & Hosting',
      'Mobile Responsive Design',
      'Basic SEO Setup',
      'Contact Form',
    ],
    cta: 'Get Started',
    popular: false,
    dark: false,
  },
  {
    name: 'Professional',
    price: '$99',
    setup: '$999',
    desc: 'The complete AI-powered system for businesses serious about growth.',
    features: [
      'Everything in Starter',
      'AI Voice Agent (24/7)',
      'Dedicated Business Phone Number',
      'AI Text Agent',
      'Lead Capture Automations',
      'CRM Integration',
      'Priority Support',
    ],
    cta: 'Most Popular — Get Started',
    popular: true,
    dark: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    setup: 'Custom',
    desc: 'Tailored solutions for high-volume businesses with advanced needs.',
    features: [
      'Everything in Professional',
      'Multi-location Setup',
      'Custom AI Training',
      'Advanced Automations',
      'Dedicated Account Manager',
      'White-glove Onboarding',
    ],
    cta: "Let's Talk",
    popular: false,
    dark: false,
  },
];

export default function Pricing() {
  const [activePlan, setActivePlan] = useState<'Starter' | 'Professional' | 'Enterprise' | null>(null);

  return (
    <section id="pricing" className="relative py-24 md:py-32 bg-white overflow-hidden">

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Parallax decorative */}
      <div data-parallax="0.1" className="absolute top-20 left-8 w-20 h-20 border border-red-200/20 rounded-full pointer-events-none hidden md:block" />
      <div data-parallax="-0.07" className="absolute bottom-32 right-12 w-28 h-28 border border-red-100/30 rotate-45 pointer-events-none hidden md:block" />

      <div className="max-w-[1180px] mx-auto px-6">

        {/* Header — blur reveal */}
        <div className="text-center mb-14 sr-element-blur">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-6 h-px bg-red-500" />
            <span className="text-[0.62rem] font-mono font-bold tracking-[5px] uppercase text-red-500">Pricing</span>
            <span className="w-6 h-px bg-red-500" />
          </div>
          <h2 className="font-['Space_Grotesk'] text-[clamp(2rem,4.5vw,3.8rem)] font-extrabold tracking-[-0.04em] text-[#0a0a0a] leading-[1.04] mb-3 sr-words">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-500 text-[0.9rem] max-w-[380px] mx-auto leading-relaxed">
            No hidden fees. No long-term contracts. Just results.
          </p>
        </div>

        {/* Plans — each with different entrance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {plans.map((plan, i) => {
            const animations = ['sr-element-left', 'sr-element-scale-rotate', 'sr-element-right'];
            return (
              <div
                key={plan.name}
                className={`${animations[i]} sr-delay-${i + 1} relative flex flex-col transition-all duration-500 hover:-translate-y-1 ${
                  plan.dark
                    ? 'bg-[#0a0a0a] border-2 glow-border-animated md:scale-[1.04] z-10 hover:shadow-[0_28px_80px_rgba(220,38,38,0.12)]'
                    : 'bg-white border border-gray-200 hover:border-[#c8c8c8] hover:shadow-[0_16px_50px_rgba(0,0,0,0.07)]'
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-red-600 text-white text-[0.6rem] font-mono font-extrabold tracking-[3px] uppercase whitespace-nowrap shadow-[0_4px_20px_rgba(220,38,38,0.35)]">
                    Most Popular
                  </div>
                )}

                <div className="p-7 md:p-8 flex flex-col h-full">
                  <div className="mb-7">
                    <p className={`text-[0.6rem] font-mono font-bold tracking-[4px] uppercase mb-3 ${plan.dark ? 'text-white/35' : 'text-gray-500'}`}>{plan.name}</p>

                    <div className="flex items-end gap-2 mb-1">
                      <span className={`font-['Space_Grotesk'] text-[2.8rem] font-extrabold leading-none tracking-tight ${plan.dark ? 'text-white' : 'text-[#0a0a0a]'}`}>{plan.price}</span>
                      {plan.price !== 'Custom' && (
                        <span className={`text-[0.8rem] mb-2 ${plan.dark ? 'text-white/28' : 'text-gray-400'}`}>/mo</span>
                      )}
                    </div>
                    {plan.setup !== 'Custom' && (
                      <p className={`text-[0.74rem] font-mono mb-3 ${plan.dark ? 'text-white/22' : 'text-gray-400'}`}>
                        + {plan.setup} one-time setup
                      </p>
                    )}

                    <div className={`h-px mb-4 ${plan.dark ? 'bg-white/[0.06]' : 'bg-gray-100'}`} />

                    <p className={`text-[0.83rem] leading-relaxed ${plan.dark ? 'text-white/32' : 'text-gray-600'}`}>{plan.desc}</p>
                  </div>

                  <ul className="flex flex-col gap-2.5 mb-7 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <div className="shrink-0 w-[16px] h-[16px] flex items-center justify-center mt-0.5 text-red-500">
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                            <polyline points="2,6 5,9 10,3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </div>
                        <span className={`text-[0.82rem] leading-relaxed ${plan.dark ? 'text-white/40' : 'text-gray-600'}`}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setActivePlan(plan.name as 'Starter' | 'Professional' | 'Enterprise')}
                    className={`btn-shimmer w-full py-3.5 font-extrabold text-[0.85rem] font-mono tracking-wide cursor-pointer transition-all duration-300 hover:-translate-y-0.5 ${
                      plan.dark
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 shadow-[0_4px_24px_rgba(220,38,38,0.3)] hover:shadow-[0_8px_36px_rgba(220,38,38,0.45)]'
                        : 'border border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600 hover:shadow-[0_4px_16px_rgba(220,38,38,0.08)]'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {activePlan && (
        <IntakeFormModal plan={activePlan} onClose={() => setActivePlan(null)} />
      )}
    </section>
  );
}
