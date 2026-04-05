"use client";

import React from 'react';

export default function Footer() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="relative z-[1] border-t border-purple-500/[0.06] py-10 pb-7">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="font-['Space_Grotesk'] font-extrabold text-[1.1rem] text-purple-600">
            AI WWWeb
          </div>
          <ul className="flex gap-6 list-none">
            {['services', 'portfolio', 'pricing', 'contact'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollTo(item)}
                  className="text-[0.82rem] text-gray-400 hover:text-purple-600 transition-colors capitalize bg-transparent border-none cursor-pointer"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full text-center text-[0.75rem] text-gray-400 mt-6 pt-6 border-t border-purple-500/[0.06]">
          &copy; 2026 AI WWWeb. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
