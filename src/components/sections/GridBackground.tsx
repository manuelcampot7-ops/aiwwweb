"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function GridBackground() {
  const staticRef = useRef<SVGSVGElement>(null);
  const revealRef = useRef<SVGSVGElement>(null);
  const [show, setShow] = useState(false);
  const offsetRef = useRef({ x: 0, y: 0 });
  const mouseRef  = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const CELL = 40;

    function buildGrid(svg: SVGSVGElement, id: string) {
      const w  = window.innerWidth + CELL * 2;
      const h  = window.innerHeight + CELL * 2;
      const ns = 'http://www.w3.org/2000/svg';
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      svg.setAttribute('width', String(w));
      svg.setAttribute('height', String(h));
      svg.innerHTML = '';

      const defs = document.createElementNS(ns, 'defs');
      const pat  = document.createElementNS(ns, 'pattern');
      pat.setAttribute('id', id);
      pat.setAttribute('width', String(CELL));
      pat.setAttribute('height', String(CELL));
      pat.setAttribute('patternUnits', 'userSpaceOnUse');

      const path = document.createElementNS(ns, 'path');
      path.setAttribute('d', `M ${CELL} 0 L 0 0 0 ${CELL}`);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'currentColor');
      path.setAttribute('stroke-width', id === 'gp-s' ? '0.5' : '0.8');

      pat.appendChild(path);
      defs.appendChild(pat);
      svg.appendChild(defs);

      const rect = document.createElementNS(ns, 'rect');
      rect.setAttribute('width', '100%');
      rect.setAttribute('height', '100%');
      rect.setAttribute('fill', `url(#${id})`);
      svg.appendChild(rect);

      return pat;
    }

    let patStatic: SVGPatternElement | null = null;
    let patReveal: SVGPatternElement | null = null;

    function init() {
      if (staticRef.current) patStatic = buildGrid(staticRef.current, 'gp-s');
      if (revealRef.current) patReveal = buildGrid(revealRef.current, 'gp-r');
    }

    init();
    window.addEventListener('resize', init);

    let animId: number;
    function tick() {
      offsetRef.current.x = (offsetRef.current.x + 0.3) % CELL;
      offsetRef.current.y = (offsetRef.current.y + 0.3) % CELL;

      if (patStatic) {
        patStatic.setAttribute('x', String(offsetRef.current.x));
        patStatic.setAttribute('y', String(offsetRef.current.y));
      }
      if (patReveal) {
        patReveal.setAttribute('x', String(offsetRef.current.x));
        patReveal.setAttribute('y', String(offsetRef.current.y));
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (revealRef.current && mx > -999) {
        revealRef.current.style.maskImage = `radial-gradient(350px circle at ${mx}px ${my}px, black, transparent)`;
        (revealRef.current.style as any).webkitMaskImage = `radial-gradient(350px circle at ${mx}px ${my}px, black, transparent)`;
      }

      animId = requestAnimationFrame(tick);
    }
    tick();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (revealRef.current) revealRef.current.classList.add('!opacity-25');
    };
    const handleMouseLeave = () => {
      if (revealRef.current) revealRef.current.classList.remove('!opacity-25');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', init);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-600 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <svg ref={staticRef} className="absolute inset-0 w-full h-full opacity-[0.03] text-neutral-400" />
      <svg ref={revealRef} className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-400 text-red-400" />
    </div>
  );
}
