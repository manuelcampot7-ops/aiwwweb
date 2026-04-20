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
      '.sr-element-flip, .sr-element-slide-up, .sr-underline-draw, .sr-mask-wipe, ' +
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
    const skewEls = document.querySelectorAll<HTMLElement>('[data-scroll-skew]');

    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();
    let skewRaf = 0;
    let currentSkew = 0;

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

    /* ── Scroll-velocity skew ── */
    const updateVelocity = () => {
      const now = performance.now();
      const dy = window.scrollY - lastScrollY;
      const dt = Math.max(now - lastScrollTime, 1);
      lastScrollY = window.scrollY;
      lastScrollTime = now;
      // px/ms → degrees, capped to ±5deg
      const target = Math.max(-5, Math.min(5, dy / dt * 2));
      // Ease back to 0 when not scrolling
      currentSkew += (target - currentSkew) * 0.18;
      if (Math.abs(currentSkew) < 0.02) currentSkew = 0;

      for (const el of skewEls) {
        const intensity = parseFloat(el.getAttribute('data-scroll-skew') || '1');
        el.style.transform = `skewY(${currentSkew * intensity}deg)`;
      }
      skewRaf = requestAnimationFrame(updateVelocity);
    };

    const hasWork = parallaxEls.length > 0 || skewEls.length > 0;
    if (!hasWork) {
      return () => observer.disconnect();
    }

    if (parallaxEls.length > 0) {
      window.addEventListener('scroll', handleParallax, { passive: true });
      handleParallax();
    }
    if (skewEls.length > 0) {
      skewRaf = requestAnimationFrame(updateVelocity);
    }

    return () => {
      observer.disconnect();
      if (parallaxEls.length > 0) window.removeEventListener('scroll', handleParallax);
      if (skewRaf) cancelAnimationFrame(skewRaf);
    };
  }, []);

  return null;
}
