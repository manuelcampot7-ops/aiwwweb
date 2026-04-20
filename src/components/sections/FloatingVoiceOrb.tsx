"use client";

import { useEffect, useRef, useState, useCallback } from 'react';

function clamp01(x: number) { return Math.max(0, Math.min(1, x)); }
function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

export default function FloatingVoiceOrb() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [activated, setActivated] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const shellRef     = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const extCanvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef       = useRef<number>(0);
  const extRafRef    = useRef<number>(0);
  const timeRef      = useRef(0);
  const extTimeRef   = useRef(0);

  const targetT   = useRef(0);
  const currentT  = useRef(0);
  const smoothRaf = useRef<number>(0);
  const maxScale  = useRef(3); // shrinks on mobile so particles don't collide with hero text

  // Mouse tracking refs (relative to orb center, normalized -1 to 1)
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const isHovering  = useRef(false);
  const hoverSmooth = useRef(0); // 0=not hovering, 1=fully hovering
  const clickPulse  = useRef(0); // burst animation on click

  /* ── Responsive max scale ── */
  useEffect(() => {
    const update = () => {
      maxScale.current = window.innerWidth < 768 ? 1.9 : 3;
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  /* ── Scroll target ── */
  useEffect(() => {
    const handle = () => {
      const hero = document.getElementById('hero');
      if (!hero) return;
      targetT.current = clamp01(window.scrollY / (hero.offsetHeight * 0.55));
    };
    window.addEventListener('scroll', handle, { passive: true });
    handle();
    return () => window.removeEventListener('scroll', handle);
  }, []);

  /* ── Mouse tracking on the orb ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onEnter = () => { isHovering.current = true; };
    const onLeave = () => { isHovering.current = false; mouseX.current = 0; mouseY.current = 0; };
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Normalize to -1..1 relative to orb center, accounting for scale
      const ms = maxScale.current;
      const scale = ms - easeOutCubic(currentT.current) * (ms - 1);
      const halfSize = 36 * scale;
      mouseX.current = clamp01(Math.abs((e.clientX - cx) / halfSize)) * Math.sign(e.clientX - cx);
      mouseY.current = clamp01(Math.abs((e.clientY - cy) / halfSize)) * Math.sign(e.clientY - cy);
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mousemove', onMove);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mousemove', onMove);
    };
  }, []);

  /* ── Smooth position loop ── */
  const updatePosition = useCallback(() => {
    const el = containerRef.current;
    const shell = shellRef.current;
    if (!el) { smoothRaf.current = requestAnimationFrame(updatePosition); return; }

    currentT.current = lerp(currentT.current, targetT.current, 0.065);
    if (Math.abs(currentT.current - targetT.current) < 0.001) currentT.current = targetT.current;

    // Smooth hover
    const hTarget = isHovering.current ? 1 : 0;
    hoverSmooth.current = lerp(hoverSmooth.current, hTarget, 0.08);

    // Decay click pulse
    if (clickPulse.current > 0) clickPulse.current *= 0.94;
    if (clickPulse.current < 0.01) clickPulse.current = 0;

    const t = easeOutCubic(currentT.current);
    const ms = maxScale.current;
    const scale = ms - t * (ms - 1);
    const offsetXpct = (1 - t) * -50;
    const offsetYpct = (1 - t) * -50;
    const cornerAdjustX = (1 - t) * 28;
    const cornerAdjustY = (1 - t) * 28;

    el.style.transform = `translate(calc(${offsetXpct}vw + ${50 * (1 - t)}% + ${cornerAdjustX}px), calc(${offsetYpct}vh + ${50 * (1 - t)}% + ${cornerAdjustY}px)) scale(${scale})`;

    // Dynamic glow — intensifies on hover + click pulse
    if (shell) {
      const gi = 1 - t;
      const h = hoverSmooth.current;
      const cp = clickPulse.current;
      shell.style.boxShadow = `
        0 0 ${26 + gi * 40 + h * 20 + cp * 60}px rgba(220,40,40,${0.40 + gi * 0.35 + h * 0.2 + cp * 0.4}),
        0 0 ${55 + gi * 60 + h * 30 + cp * 80}px rgba(180,20,20,${0.18 + gi * 0.22 + h * 0.15 + cp * 0.3}),
        0 0 ${90 + gi * 80 + h * 40 + cp * 100}px rgba(140,10,10,${0.10 + gi * 0.18 + h * 0.1 + cp * 0.2}),
        inset 0 0 ${20 + h * 8 + cp * 15}px rgba(${cp > 0.1 ? '255,60,30' : '0,0,0'},${0.65 - h * 0.2})
      `;
      shell.style.borderColor = `rgba(200,35,35,${0.40 + h * 0.3 + cp * 0.3})`;
      shell.style.transform = `scale(${1 + h * 0.06 + cp * 0.12})`;
    }

    smoothRaf.current = requestAnimationFrame(updatePosition);
  }, []);

  useEffect(() => {
    smoothRaf.current = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(smoothRaf.current);
  }, [updatePosition]);

  // ══════════════════════════════════════════════
  // EXTERIOR CANVAS — scales down when small
  // ══════════════════════════════════════════════
  useEffect(() => {
    const canvas = extCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const size = 160;
    canvas.width = size * 2;
    canvas.height = size * 2;
    ctx.scale(2, 2);
    const cx = size / 2, cy = size / 2;

    const particles: {
      angle: number; r: number; speed: number; baseSpeed: number;
      size: number; phase: number;
    }[] = [];
    for (let i = 0; i < 18; i++) {
      const speed = (0.3 + Math.random() * 0.5) * (Math.random() > 0.5 ? 1 : -1);
      particles.push({
        angle: Math.random() * Math.PI * 2,
        r: 40 + Math.random() * 18,
        speed, baseSpeed: speed,
        size: 0.8 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const bursts: { angle: number; r: number; speed: number; life: number; size: number }[] = [];

    const draw = () => {
      extTimeRef.current += 0.016;
      const t = extTimeRef.current;
      const h = hoverSmooth.current;
      const cp = clickPulse.current;
      // intensity: 1 when big, 0.4 when small
      const intensity = 1 - easeOutCubic(currentT.current) * 0.6;

      ctx.clearRect(0, 0, size, size);

      // Click burst ring
      if (cp > 0.05) {
        const burstR = 36 + (1 - cp) * 50;
        ctx.beginPath();
        ctx.arc(cx, cy, burstR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,100,60,${cp * 0.5})`;
        ctx.lineWidth = 1.5 * cp;
        ctx.stroke();
      }

      // Pulse rings — only 2, subtle
      for (let i = 0; i < 2; i++) {
        const haloR = 42 + i * 14 + Math.sin(t * (1.2 - i * 0.3) + i * 1.5) * 3;
        const haloAlpha = (0.06 - i * 0.02 + h * 0.03) * intensity;
        if (haloAlpha < 0.01) continue;
        ctx.beginPath();
        ctx.arc(cx, cy, haloR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(220,40,40,${haloAlpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Orbiting particles — fewer visible when small
      for (let idx = 0; idx < particles.length; idx++) {
        const p = particles[idx];
        p.speed = lerp(p.speed, p.baseSpeed * (1 + h * 0.8), 0.05);
        p.angle += p.speed * 0.016;
        const wobble = Math.sin(t * 1.5 + p.phase) * 3;
        const pr = p.r + wobble;
        const px = cx + Math.cos(p.angle) * pr;
        const py = cy + Math.sin(p.angle) * pr;
        const brightness = (0.4 + Math.sin(t * 2 + p.phase) * 0.25 + h * 0.15) * intensity;
        const sz = p.size * (0.9 + Math.sin(t * 3 + p.phase) * 0.3);

        if (brightness < 0.05) continue;

        // Short trail
        for (let j = 1; j <= 2; j++) {
          const ta = p.angle - p.speed * 0.016 * j * 3;
          const tpr = p.r + Math.sin(t * 1.5 + p.phase - j * 0.1) * 3;
          ctx.beginPath();
          ctx.arc(cx + Math.cos(ta) * tpr, cy + Math.sin(ta) * tpr, sz * (1 - j * 0.3), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220,40,40,${brightness * (0.25 - j * 0.08)})`;
          ctx.fill();
        }

        // Glow
        const grd = ctx.createRadialGradient(px, py, 0, px, py, sz * 3);
        grd.addColorStop(0, `rgba(255,80,60,${brightness * 0.4})`);
        grd.addColorStop(0.5, `rgba(200,30,30,${brightness * 0.12})`);
        grd.addColorStop(1, 'rgba(150,10,10,0)');
        ctx.beginPath();
        ctx.arc(px, py, sz * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        const core = ctx.createRadialGradient(px, py, 0, px, py, sz * 1.2);
        core.addColorStop(0, `rgba(255,200,180,${brightness * 0.9})`);
        core.addColorStop(0.4, `rgba(240,60,40,${brightness * 0.8})`);
        core.addColorStop(1, `rgba(180,20,20,${brightness * 0.2})`);
        ctx.beginPath();
        ctx.arc(px, py, sz * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = core;
        ctx.fill();
      }

      // Click burst particles
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.life += 0.016;
        b.r += b.speed * 0.016;
        b.speed *= 0.96;
        const alpha = Math.max(0, 1 - b.life * 1.8);
        ctx.beginPath();
        ctx.arc(cx + Math.cos(b.angle) * b.r, cy + Math.sin(b.angle) * b.r, b.size * alpha, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,140,90,${alpha * 0.7})`;
        ctx.fill();
        if (alpha <= 0) bursts.splice(i, 1);
      }

      extRafRef.current = requestAnimationFrame(draw);
    };
    extRafRef.current = requestAnimationFrame(draw);

    (canvas as HTMLCanvasElement & { triggerBurst?: () => void }).triggerBurst = () => {
      for (let i = 0; i < 14; i++) {
        bursts.push({ angle: Math.random() * Math.PI * 2, r: 36, speed: 30 + Math.random() * 50, life: 0, size: 1 + Math.random() * 2 });
      }
    };

    return () => cancelAnimationFrame(extRafRef.current);
  }, []);

  // ══════════════════════════════════════════════
  // INTERIOR CANVAS — clean, organized, eye follows mouse
  // ══════════════════════════════════════════════
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const size = 72;
    canvas.width = size * 2;
    canvas.height = size * 2;
    ctx.scale(2, 2);
    const cx = size / 2, cy = size / 2;

    const draw = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;
      const h = hoverSmooth.current;
      const cp = clickPulse.current;
      const mx = mouseX.current;
      const my = mouseY.current;

      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, 34, 0, Math.PI * 2);
      ctx.clip();

      // Deep background
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 34);
      bg.addColorStop(0, `rgba(${35 + cp * 20},4,4,0.88)`);
      bg.addColorStop(0.5, 'rgba(15,2,2,0.94)');
      bg.addColorStop(1, 'rgba(5,0,0,0.98)');
      ctx.beginPath();
      ctx.arc(cx, cy, 34, 0, Math.PI * 2);
      ctx.fillStyle = bg;
      ctx.fill();

      // 2 clean concentric rings — slow rotation
      for (let i = 0; i < 2; i++) {
        const radius = 18 + i * 10;
        const rot = t * (0.2 + i * 0.1) * (i % 2 === 0 ? 1 : -1);
        ctx.beginPath();
        ctx.arc(cx, cy, radius, rot, rot + Math.PI * 1.2);
        ctx.strokeStyle = `rgba(220,40,30,${0.06 + h * 0.04 + cp * 0.06})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // 4 subtle energy wisps flowing to center
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2 + t * 0.15;
        const len = 22 * (0.5 + Math.sin(t * 1.0 + i * 1.6) * 0.35);
        const startX = cx + Math.cos(angle) * len;
        const startY = cy + Math.sin(angle) * len;
        const wb = Math.sin(t * 2 + i * 1.7) * 2;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(cx + wb, cy - wb, cx, cy);
        ctx.strokeStyle = `rgba(180,15,15,${0.06 + Math.sin(t * 1.2 + i) * 0.03 + h * 0.04})`;
        ctx.lineWidth = 1.2;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // Core glow — eye follows mouse
      const eyeOffX = mx * 3.5 * h;
      const eyeOffY = my * 3.5 * h;
      const ecx = cx + eyeOffX;
      const ecy = cy + eyeOffY;

      // Outer glow
      const outerR = 7 + Math.sin(t * 1.2) * 1.5 + h * 1.5 + cp * 3;
      const og = ctx.createRadialGradient(ecx, ecy, 0, ecx, ecy, outerR);
      og.addColorStop(0, `rgba(255,60,30,${0.55 + Math.sin(t * 1.5) * 0.1 + h * 0.15 + cp * 0.15})`);
      og.addColorStop(0.35, `rgba(200,25,15,${0.28 + h * 0.1})`);
      og.addColorStop(0.7, 'rgba(80,6,4,0.08)');
      og.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(ecx, ecy, outerR, 0, Math.PI * 2);
      ctx.fillStyle = og;
      ctx.fill();

      // Hot center
      const eyeR = 2.5 + Math.sin(t * 2) * 0.6 + h * 0.6 + cp * 2;
      const eye = ctx.createRadialGradient(ecx, ecy, 0, ecx, ecy, eyeR);
      eye.addColorStop(0, `rgba(255,255,235,${0.9 + h * 0.05})`);
      eye.addColorStop(0.35, 'rgba(255,140,100,0.7)');
      eye.addColorStop(0.7, 'rgba(220,40,15,0.3)');
      eye.addColorStop(1, 'rgba(150,10,5,0)');
      ctx.beginPath();
      ctx.arc(ecx, ecy, eyeR, 0, Math.PI * 2);
      ctx.fillStyle = eye;
      ctx.fill();

      ctx.restore();
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  const handleClick = () => {
    // Trigger click pulse burst
    clickPulse.current = 1;

    // Trigger particle burst on exterior canvas
    const extCanvas = extCanvasRef.current as HTMLCanvasElement & { triggerBurst?: () => void };
    extCanvas?.triggerBurst?.();

    // Toggle activated state
    setActivated(a => !a);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  };

  return (
    <div
      ref={containerRef}
      className="fixed z-[200]"
      style={{
        bottom: '28px',
        right: '28px',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.6s ease',
        willChange: 'transform',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      {/* Small status pill — appears next to the orb */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: 'calc(100% + 10px)',
          transform: `translateY(-50%) ${showTooltip ? 'translateX(0)' : 'translateX(6px)'}`,
          background: activated ? 'rgba(220,38,38,0.15)' : 'rgba(0,0,0,0.7)',
          border: `1px solid ${activated ? 'rgba(220,38,38,0.3)' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: '20px',
          padding: '4px 10px',
          color: activated ? '#ff8a80' : 'rgba(255,255,255,0.5)',
          fontSize: '0.62rem',
          fontFamily: 'monospace',
          letterSpacing: '1px',
          whiteSpace: 'nowrap',
          opacity: showTooltip ? 1 : 0,
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          pointerEvents: 'none',
        }}
      >
        {activated ? 'ACTIVE' : 'AI'}
      </div>

      {/* Exterior canvas */}
      <canvas ref={extCanvasRef} style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)', width: '160px', height: '160px', pointerEvents: 'none',
      }} />

      {/* Orb shell */}
      <div
        ref={shellRef}
        style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'radial-gradient(circle at 32% 32%, rgba(160,30,30,0.75) 0%, rgba(80,8,8,0.88) 45%, rgba(18,2,2,0.96) 100%)',
          boxShadow: '0 0 26px rgba(220,40,40,0.40), 0 0 55px rgba(180,20,20,0.18), 0 0 90px rgba(140,10,10,0.10), inset 0 0 20px rgba(0,0,0,0.65)',
          border: '1px solid rgba(200,35,35,0.40)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
          transition: 'transform 0.15s ease-out',
        }}
      >
        <canvas ref={canvasRef} style={{
          position: 'absolute', width: '72px', height: '72px', borderRadius: '50%',
        }} />
      </div>
    </div>
  );
}
