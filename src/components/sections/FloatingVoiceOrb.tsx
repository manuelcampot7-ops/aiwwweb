"use client";

import { useEffect, useRef, useState } from 'react';

export default function FloatingVoiceOrb() {
  const [isVisible, setIsVisible]     = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const extCanvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef       = useRef<number>(0);
  const extRafRef    = useRef<number>(0);
  const timeRef      = useRef(0);
  const extTimeRef   = useRef(0);

  // ── EXTERIOR CANVAS — orbiting particles, energy trails ──
  useEffect(() => {
    const canvas = extCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const size = 160;
    canvas.width  = size * 2;
    canvas.height = size * 2;
    ctx.scale(2, 2);
    const cx = size / 2, cy = size / 2;

    const particles: {
      angle: number; r: number; speed: number;
      size: number; phase: number; trail: number;
    }[] = [];
    for (let i = 0; i < 18; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        r:     40 + Math.random() * 18,
        speed: (0.3 + Math.random() * 0.5) * (Math.random() > 0.5 ? 1 : -1),
        size:  0.8 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
        trail: 3 + Math.random() * 5,
      });
    }

    const draw = () => {
      extTimeRef.current += 0.016;
      const t = extTimeRef.current;

      ctx.clearRect(0, 0, size, size);

      for (const p of particles) {
        p.angle += p.speed * 0.016;
        const wobble = Math.sin(t * 1.5 + p.phase) * 3;
        const pr = p.r + wobble;
        const px = cx + Math.cos(p.angle) * pr;
        const py = cy + Math.sin(p.angle) * pr;
        const brightness = 0.4 + Math.sin(t * 2 + p.phase) * 0.25;
        const sz = p.size * (0.9 + Math.sin(t * 3 + p.phase) * 0.3);

        for (let j = 1; j <= 3; j++) {
          const ta  = p.angle - p.speed * 0.016 * j * 3;
          const tpr = p.r + Math.sin(t * 1.5 + p.phase - j * 0.1) * 3;
          const tx  = cx + Math.cos(ta) * tpr;
          const ty  = cy + Math.sin(ta) * tpr;
          ctx.beginPath();
          ctx.arc(tx, ty, sz * (1 - j * 0.25), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220,40,40,${brightness * (0.35 - j * 0.08)})`;
          ctx.fill();
        }

        const grd = ctx.createRadialGradient(px, py, 0, px, py, sz * 3.5);
        grd.addColorStop(0,   `rgba(255,80,60,${brightness * 0.45})`);
        grd.addColorStop(0.5, `rgba(200,30,30,${brightness * 0.18})`);
        grd.addColorStop(1,   'rgba(150,10,10,0)');
        ctx.beginPath();
        ctx.arc(px, py, sz * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        const core = ctx.createRadialGradient(px, py, 0, px, py, sz * 1.2);
        core.addColorStop(0,   `rgba(255,200,180,${brightness * 0.9})`);
        core.addColorStop(0.4, `rgba(240,60,40,${brightness * 0.85})`);
        core.addColorStop(1,   `rgba(180,20,20,${brightness * 0.3})`);
        ctx.beginPath();
        ctx.arc(px, py, sz * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = core;
        ctx.fill();
      }

      const pulseR = 38 + Math.sin(t * 1.8) * 3;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(220,40,40,${0.10 + Math.sin(t * 1.8) * 0.05})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      const pulseR2 = 44 + Math.sin(t * 1.3 + 1.2) * 3;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseR2, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(200,30,30,${0.06 + Math.sin(t * 1.3 + 1.2) * 0.03})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();

      extRafRef.current = requestAnimationFrame(draw);
    };
    extRafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(extRafRef.current);
  }, []);

  // ── INTERIOR CANVAS — energy wisps ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const size = 72;
    canvas.width  = size * 2;
    canvas.height = size * 2;
    ctx.scale(2, 2);
    const cx = size / 2, cy = size / 2;

    const draw = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;

      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, 34, 0, Math.PI * 2);
      ctx.clip();

      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 34);
      bg.addColorStop(0,   'rgba(55,6,6,0.85)');
      bg.addColorStop(0.5, 'rgba(22,3,3,0.92)');
      bg.addColorStop(1,   'rgba(8,1,1,0.97)');
      ctx.beginPath();
      ctx.arc(cx, cy, 34, 0, Math.PI * 2);
      ctx.fillStyle = bg;
      ctx.fill();

      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + t * 0.3;
        const len   = 10 + Math.sin(t * 1.2 + i * 2.1) * 5;
        const wb    = Math.sin(t * 2.5 + i * 1.7) * 2;
        const endX  = cx + Math.cos(angle) * len;
        const endY  = cy + Math.sin(angle) * len;
        const midX  = cx + Math.cos(angle) * len * 0.5 + wb;
        const midY  = cy + Math.sin(angle) * len * 0.5 - wb;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.quadraticCurveTo(midX, midY, endX, endY);
        ctx.strokeStyle = `rgba(6,1,1,${0.55 + Math.sin(t * 1.5 + i) * 0.15})`;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.quadraticCurveTo(midX, midY, endX, endY);
        ctx.strokeStyle = `rgba(180,15,15,${0.12 + Math.sin(t * 1.5 + i) * 0.06})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      const ig = ctx.createRadialGradient(cx, cy, 0, cx, cy, 10);
      ig.addColorStop(0,   `rgba(255,60,30,${0.65 + Math.sin(t * 1.5) * 0.15})`);
      ig.addColorStop(0.35, `rgba(180,15,10,${0.35 + Math.sin(t * 1.5) * 0.08})`);
      ig.addColorStop(0.7,  'rgba(60,4,4,0.18)');
      ig.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.fillStyle = ig;
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
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  };

  return (
    <div
      className="fixed bottom-7 right-7 z-[200] cursor-pointer"
      style={{
        opacity:    isVisible ? 1 : 0,
        transform:  isVisible ? 'scale(1)' : 'scale(0.8)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
      onClick={handleClick}
    >
      {/* Tooltip */}
      <div
        style={{
          position:   'absolute',
          bottom:     'calc(100% + 14px)',
          right:      0,
          background: 'rgba(0,0,0,0.85)',
          border:     '1px solid rgba(220,38,38,0.25)',
          borderRadius: '14px',
          padding:    '10px 16px',
          width:      '200px',
          color:      '#fff0f0',
          fontSize:   '0.82rem',
          lineHeight: '1.4',
          whiteSpace: 'normal',
          opacity:    showTooltip ? 1 : 0,
          transform:  showTooltip ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
          pointerEvents: 'none',
        }}
      >
        🎙️ <strong>Voice AI</strong> — coming soon!
        <div style={{
          position:    'absolute',
          top:         '100%',
          right:       24,
          width:       0,
          height:      0,
          borderLeft:  '7px solid transparent',
          borderRight: '7px solid transparent',
          borderTop:   '7px solid rgba(0,0,0,0.85)',
        }} />
      </div>

      {/* Exterior canvas */}
      <canvas
        ref={extCanvasRef}
        style={{
          position: 'absolute',
          top:      '50%',
          left:     '50%',
          transform:'translate(-50%,-50%)',
          width:    '160px',
          height:   '160px',
          pointerEvents: 'none',
        }}
      />

      {/* Orb shell */}
      <div style={{
        width:        72,
        height:       72,
        borderRadius: '50%',
        background:   'radial-gradient(circle at 32% 32%, rgba(160,30,30,0.75) 0%, rgba(80,8,8,0.88) 45%, rgba(18,2,2,0.96) 100%)',
        boxShadow:    '0 0 26px rgba(220,40,40,0.40), 0 0 55px rgba(180,20,20,0.18), 0 0 90px rgba(140,10,10,0.10), inset 0 0 20px rgba(0,0,0,0.65)',
        border:       '1px solid rgba(200,35,35,0.40)',
        display:      'flex',
        alignItems:   'center',
        justifyContent: 'center',
        position:     'relative',
      }}>
        <canvas
          ref={canvasRef}
          style={{
            position:     'absolute',
            width:        '72px',
            height:       '72px',
            borderRadius: '50%',
          }}
        />
      </div>
    </div>
  );
}
