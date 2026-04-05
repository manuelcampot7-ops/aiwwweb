"use client";

import React, { useState } from 'react';

export default function CTA() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!name || !email) {
      alert('Please fill in your name and email.');
      return;
    }
    alert(`Thank you, ${name}! We'll be in touch within 24 hours.`);
    setName('');
    setEmail('');
  };

  return (
    <section id="contact" className="relative z-[1] pb-20 pt-[120px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-[28px] py-[72px] px-[60px] max-md:px-6 max-md:py-12 text-center relative overflow-hidden text-white sr-element">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08)_0%,transparent_60%)]" />

          <div className="text-[0.75rem] font-bold tracking-[3px] uppercase text-purple-200 mb-4 flex items-center justify-center gap-3 relative z-[1]">
            <span className="w-6 h-0.5 bg-purple-300 rounded" />
            Let&apos;s Talk
          </div>
          <h2 className="font-['Space_Grotesk'] text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold mb-4 text-white relative z-[1]">
            Ready to Transform Your<br />Online Presence?
          </h2>
          <p className="text-[1.05rem] text-white/80 max-w-[520px] mx-auto mb-9 relative z-[1]">
            Get a free consultation and see exactly how AI WWWeb can help your business grow. No pressure — just a conversation.
          </p>

          <div className="flex gap-2.5 max-w-[500px] mx-auto flex-wrap justify-center relative z-[1]">
            <input
              type="text"
              placeholder="Your name"
              aria-label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 min-w-[200px] px-[22px] py-3.5 rounded-full bg-white/[0.12] border border-white/20 text-white text-[0.9rem] font-sans outline-none transition-colors focus:border-white/50 placeholder:text-white/50"
            />
            <input
              type="email"
              placeholder="Your email"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 min-w-[200px] px-[22px] py-3.5 rounded-full bg-white/[0.12] border border-white/20 text-white text-[0.9rem] font-sans outline-none transition-colors focus:border-white/50 placeholder:text-white/50"
            />
            <button
              onClick={handleSubmit}
              className="px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-white text-purple-700 border-none cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
            >
              Get My Free Consultation
            </button>
          </div>

          <div className="flex justify-center gap-9 mt-7 flex-wrap max-md:flex-col max-md:items-center relative z-[1]">
            <div className="text-[0.85rem] text-white/70 flex items-center gap-2">
              <span className="text-purple-200">📧</span> hello@aiwwweb.com
            </div>
            <div className="text-[0.85rem] text-white/70 flex items-center gap-2">
              <span className="text-purple-200">📍</span> Florida, USA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
