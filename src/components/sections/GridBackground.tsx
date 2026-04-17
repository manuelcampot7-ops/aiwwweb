"use client";

import React, { useEffect, useRef } from 'react';

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0;
    const CELL = 44;
    const REPEL_RADIUS = 160;
    const REPEL_FORCE = 14;

    interface Particle {
      x: number; y: number;
      baseX: number; baseY: number;
      vx: number; vy: number;
      size: number; opacity: number;
      phase: number;
    }

    let particles: Particle[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = document.documentElement.scrollHeight;
      canvas.width = w * 1.5;
      canvas.height = window.innerHeight * 1.5;
      canvas.style.width = w + 'px';
      canvas.style.height = window.innerHeight + 'px';
      seedParticles();
    };

    const seedParticles = () => {
      // ~1 particle per 25000px² of visible area
      const count = Math.min(80, Math.floor((w * window.innerHeight) / 16000));
      particles = [];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w * 1.5;
        const y = Math.random() * window.innerHeight * 1.5;
        particles.push({
          x, y, baseX: x, baseY: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: 3 + Math.random() * 4,
          opacity: 0.25 + Math.random() * 0.25,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    let time = 0;
    let gridOffset = 0;
    let raf: number;

    const draw = () => {
      time += 0.016;
      gridOffset = (gridOffset + 0.15) % CELL;
      const cw = canvas.width;
      const ch = canvas.height;
      ctx.clearRect(0, 0, cw, ch);

      const mx = mouseRef.current.x * 1.5;
      const my = (mouseRef.current.y) * 1.5;

      // ── Grid lines ──
      ctx.strokeStyle = 'rgba(0,0,0,0.025)';
      ctx.lineWidth = 0.5;

      const cellScaled = CELL * 1.5;
      const startX = (gridOffset * 1.5) % cellScaled;
      const startY = (gridOffset * 1.5) % cellScaled;

      // Vertical lines
      for (let x = startX; x < cw; x += cellScaled) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ch);
        ctx.stroke();
      }
      // Horizontal lines
      for (let y = startY; y < ch; y += cellScaled) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(cw, y);
        ctx.stroke();
      }

      // Red accent lines near mouse
      if (mx > 0 && my > 0) {
        const accentR = 200 * 1.5;
        for (let x = startX; x < cw; x += cellScaled) {
          const dx = Math.abs(x - mx);
          if (dx < accentR) {
            const alpha = 0.06 * (1 - dx / accentR);
            ctx.strokeStyle = `rgba(220,38,38,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(x, Math.max(0, my - accentR));
            ctx.lineTo(x, Math.min(ch, my + accentR));
            ctx.stroke();
          }
        }
        for (let y = startY; y < ch; y += cellScaled) {
          const dy = Math.abs(y - my);
          if (dy < accentR) {
            const alpha = 0.06 * (1 - dy / accentR);
            ctx.strokeStyle = `rgba(220,38,38,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(Math.max(0, mx - accentR), y);
            ctx.lineTo(Math.min(cw, mx + accentR), y);
            ctx.stroke();
          }
        }
      }

      // ── Particles ──
      const repelR = REPEL_RADIUS * 1.5;

      for (const p of particles) {
        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0) p.x = cw;
        if (p.x > cw) p.x = 0;
        if (p.y < 0) p.y = ch;
        if (p.y > ch) p.y = 0;

        // Mouse repulsion — strong push away
        if (mx > -500 && my > -500) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const distSq = dx * dx + dy * dy;
          const repelRSq = repelR * repelR;
          if (distSq < repelRSq && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const strength = ((repelR - dist) / repelR);
            const force = strength * strength * REPEL_FORCE;
            p.vx += (dx / dist) * force * 0.3;
            p.vy += (dy / dist) * force * 0.3;
          }
        }

        // Dampen velocity so particles slow down after push
        p.vx *= 0.96;
        p.vy *= 0.96;

        // Gentle drift back to keep them moving
        if (Math.abs(p.vx) < 0.1) p.vx += (Math.random() - 0.5) * 0.05;
        if (Math.abs(p.vy) < 0.1) p.vy += (Math.random() - 0.5) * 0.05;

        // Pulse
        const pulse = 1 + Math.sin(time * 1.5 + p.phase) * 0.3;
        const sz = p.size * pulse;
        const alpha = p.opacity * pulse;

        // Outer glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, sz * 4);
        grd.addColorStop(0, `rgba(220,38,38,${alpha * 0.7})`);
        grd.addColorStop(0.4, `rgba(220,38,38,${alpha * 0.2})`);
        grd.addColorStop(1, 'rgba(220,38,38,0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Bright core
        const coreGrd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, sz);
        coreGrd.addColorStop(0, `rgba(255,120,100,${alpha * 1.2})`);
        coreGrd.addColorStop(0.5, `rgba(220,38,38,${alpha})`);
        coreGrd.addColorStop(1, `rgba(180,20,20,${alpha * 0.3})`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = coreGrd;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY};
    };
    const onLeave = () => {
      mouseRef.current = { x: -999, y: -999 };
    };
    document.addEventListener('mousemove', onMouse);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mousemove', onMouse);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ imageRendering: 'auto' }}
    />
  );
}
