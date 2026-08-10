import { useEffect, useRef } from 'react';

type Ember = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  hue: number;
  life: number;
  maxLife: number;
};

const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Embers({ className = '', density = 1 }: { className?: string; density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let parts: Ember[] = [];
    let raf = 0;
    let running = false;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = () => {
      parts.push({
        x: width * (0.25 + Math.random() * 0.5),
        y: height * (0.86 + Math.random() * 0.12),
        r: Math.random() * 2.2 + 0.8,
        vy: Math.random() * 0.9 + 0.45,
        vx: (Math.random() - 0.5) * 0.5,
        hue: Math.random() < 0.55 ? 24 : 42,
        life: 0,
        maxLife: 90 + Math.random() * 90,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const target = Math.min(60, Math.floor(30 * density));
      if (parts.length < target && Math.random() < 0.6) spawn();

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life++;
        p.y -= p.vy;
        p.x += p.vx + Math.sin((p.life + p.r * 7) * 0.06) * 0.12;
        const t = p.life / p.maxLife;
        const alpha = Math.max(0, 1 - t) * 0.9;
        const rad = p.r * (1 - t * 0.55);

        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, ${p.hue > 30 ? 62 : 55}%, ${alpha})`;
        ctx.shadowColor = 'rgba(255, 106, 0, 0.9)';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (p.life > p.maxLife || p.y < -12) parts.splice(i, 1);
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !running) {
            running = true;
            raf = requestAnimationFrame(draw);
          } else if (!entry.isIntersecting && running) {
            running = false;
            cancelAnimationFrame(raf);
            parts = [];
            ctx.clearRect(0, 0, width, height);
          }
        });
      },
      { threshold: 0.02 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden && running) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!document.hidden && !running && canvas.getBoundingClientRect().height > 0) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
    };
  }, [density]);

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
}
