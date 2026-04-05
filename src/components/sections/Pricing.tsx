"use client";

import React from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';

const plans = [
  {
    name: 'Starter',
    desc: 'Get online fast',
    price: '$499',
    priceNote: '/ setup',
    monthly: '+ $49/mo maintenance',
    features: ['Custom Website (up to 5 pages)', 'Domain & Hosting Setup', 'Mobile Responsive Design', 'Basic SEO Optimization', 'Contact Form Integration'],
    popular: false,
    fill: false,
  },
  {
    name: 'Professional',
    desc: 'The full AI-powered package',
    price: '$999',
    priceNote: '/ setup',
    monthly: '+ $99/mo maintenance',
    features: ['Everything in Starter', 'AI Voice Agent', 'AI Text Agent', 'Dedicated AI Phone Number', 'Lead Tracking Dashboard'],
    popular: true,
    fill: true,
  },
  {
    name: 'Enterprise',
    desc: 'For businesses ready to scale',
    price: 'Custom',
    priceNote: '',
    monthly: 'Tailored to your needs',
    features: ['Everything in Professional', 'Multi-location Support', 'Advanced AI Customization', 'API Integrations', 'Priority Support', 'Dedicated Account Manager'],
    popular: false,
    fill: false,
  },
];

export default function Pricing() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="pricing" className="relative z-[1] py-[120px] bg-[#faf8ff]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center mb-16 sr-element">
          <div className="text-[0.75rem] font-bold tracking-[3px] uppercase text-purple-600 mb-4 flex items-center justify-center gap-3">
            <span className="w-6 h-0.5 bg-purple-500 rounded" />
            Pricing
          </div>
          <h2 className="font-['Space_Grotesk'] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight mb-4">
            Simple, Transparent Plans
          </h2>
          <p className="text-[1.05rem] text-gray-500 max-w-[560px] mx-auto leading-relaxed">
            Choose the package that fits your business. Every plan includes setup, support, and ongoing maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <GlowCard key={plan.name} glowColor="purple" customSize className={`!aspect-auto !shadow-none !p-0 sr-element ${plan.popular ? '!border-purple-300 shadow-[0_8px_30px_rgba(139,92,246,0.18)]' : ''}`}>
              <div className={`p-[40px_32px] relative z-[2] ${plan.popular ? 'bg-gradient-to-b from-purple-50 to-white rounded-2xl' : ''}`}>
                {plan.popular && (
                  <span className="inline-block px-4 py-1.5 rounded-full bg-purple-600 text-white text-[0.7rem] font-bold tracking-wider mb-4">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="font-['Space_Grotesk'] text-[1.2rem] font-bold">{plan.name}</h3>
                <p className="text-[0.85rem] text-gray-400">{plan.desc}</p>
                <div className="font-['Space_Grotesk'] text-[3rem] font-extrabold mt-5 mb-1">
                  {plan.price} {plan.priceNote && <small className="text-[0.9rem] font-normal text-gray-400">{plan.priceNote}</small>}
                </div>
                <p className="text-[0.82rem] text-gray-400 mb-6">{plan.monthly}</p>
                <ul className="list-none mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="text-[0.88rem] text-gray-500 py-2.5 flex items-center gap-2.5 border-b border-purple-500/[0.05]">
                      <span className="text-purple-500 font-bold">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollTo('contact')}
                  className={`block w-full py-3.5 rounded-full font-bold text-[0.9rem] text-center cursor-pointer transition-all duration-300 ${
                    plan.fill
                      ? 'bg-purple-600 text-white border-none hover:bg-purple-700 hover:shadow-[0_8px_30px_rgba(139,92,246,0.18)] hover:-translate-y-0.5'
                      : 'bg-transparent text-gray-900 border-[1.5px] border-purple-500/[0.12] hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  {plan.name === 'Enterprise' ? 'Contact Us' : 'Get Started'}
                </button>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
