"use client";

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    /* ── Intersection Observer for reveal animations ── */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const selectors =
      '.sr-element, .sr-element-left, .sr-element-right, .sr-element-scale, ' +
      '.sr-element-rotate, .sr-element-blur, .sr-element-scale-rotate, ' +
      '.sr-clip-up, .sr-line-draw, .sr-text-reveal, .sr-words, .section-fade-in';
    const elements = document.querySelectorAll(selectors);
    elements.forEach((el) => observer.observe(el));

    /* ── Word-by-word reveal: wrap each word in a span ── */
    document.querySelectorAll('.sr-words').forEach((el) => {
      if (el.getAttribute('data-words-ready')) return;
      el.setAttribute('data-words-ready', '1');
      const text = el.textContent || '';
      const words = text.split(/\s+/).filter(Boolean);
      el.innerHTML = words
        .map(
          (w, i) =>
            `<span class="sr-word" style="transition-delay:${i * 0.06}s">${w}</span>`
        )
        .join(' ');
    });

    /* ── Parallax on scroll ── */
    const parallaxEls = document.querySelectorAll<HTMLElement>('[data-parallax]');
    if (parallaxEls.length === 0) {
      return () => observer.disconnect();
    }

    const handleParallax = () => {
      for (const el of parallaxEls) {
        const speed = parseFloat(el.getAttribute('data-parallax') || '0.15');
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const viewCenter = window.innerHeight / 2;
        const offset = (center - viewCenter) * speed;
        el.style.transform = `translateY(${offset}px)`;
      }
    };
    window.addEventListener('scroll', handleParallax, { passive: true });
    handleParallax();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);

  return null;
}
