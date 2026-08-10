const SLICES = [
  { y: 62, w: 66 },
  { y: 90, w: 80 },
  { y: 118, w: 94 },
  { y: 146, w: 108 },
  { y: 174, w: 122 },
  { y: 202, w: 136 },
  { y: 230, w: 148 },
  { y: 258, w: 158 },
  { y: 286, w: 164 },
  { y: 314, w: 166 },
  { y: 342, w: 162 },
  { y: 370, w: 154 },
  { y: 398, w: 144 },
] as const;

const SLICE_H = 26;
const CX = 180;
const TOWER_TOP = 62;
const TOWER_BOTTOM = SLICES[SLICES.length - 1].y + SLICE_H;

function flamePath(x: number, w: number, h: number, yBase: number): string {
  const half = w / 2;
  const tip = yBase - h;
  return `M ${x - half} ${yBase}
    Q ${x - half * 0.92} ${yBase - h * 0.45} ${x} ${tip}
    Q ${x + half * 0.92} ${yBase - h * 0.45} ${x + half} ${yBase}
    Q ${x + half * 0.42} ${yBase - h * 0.16} ${x + half * 0.16} ${yBase}
    Z`;
}

const FLAMES = [
  { x: 138, w: 44, h: 92, dur: '2.3s', delay: '0s', core: true },
  { x: 172, w: 58, h: 118, dur: '2.9s', delay: '0.6s', core: true },
  { x: 210, w: 48, h: 100, dur: '2.6s', delay: '0.3s', core: true },
  { x: 124, w: 30, h: 64, dur: '2.1s', delay: '1.1s', core: false },
  { x: 236, w: 30, h: 66, dur: '2.4s', delay: '0.9s', core: false },
];

const SMOKE = [
  { left: '22%', top: '22%', size: '70px', delay: '0s' },
  { left: '60%', top: '14%', size: '90px', delay: '2.4s' },
  { left: '44%', top: '30%', size: '60px', delay: '4.6s' },
  { left: '12%', top: '38%', size: '80px', delay: '1.4s' },
  { left: '68%', top: '36%', size: '66px', delay: '3.6s' },
];

export default function Rotisserie() {
  return (
    <div className="relative mx-auto aspect-[360/560] w-full max-w-[420px] select-none">
      <div className="absolute left-1/2 top-1/2 h-[46%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,106,0,0.22),transparent_68%)] blur-2xl animate-pulse-glow" />

      <svg viewBox="0 0 360 560" className="relative z-10 h-auto w-full" role="img" aria-label="Odun ateşinde dönen, alevlerin üzerindeki cağ döner">
        <defs>
          <linearGradient id="meatGrad" gradientUnits="userSpaceOnUse" x1="0" y1={TOWER_TOP} x2="0" y2={TOWER_BOTTOM}>
            <stop offset="0%" stopColor="#c9773a" />
            <stop offset="28%" stopColor="#a6521f" />
            <stop offset="60%" stopColor="#8a3f17" />
            <stop offset="100%" stopColor="#5e2609" />
          </linearGradient>
          <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6b6b6b" />
            <stop offset="45%" stopColor="#cfcfcf" />
            <stop offset="60%" stopColor="#8f8f8f" />
            <stop offset="100%" stopColor="#4a4a4a" />
          </linearGradient>
          <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#fff1b8" />
            <stop offset="45%" stopColor="#ffb400" />
            <stop offset="100%" stopColor="#ff5a00" />
          </linearGradient>
          <linearGradient id="coreGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#ffe08a" />
            <stop offset="100%" stopColor="#ff8c00" />
          </linearGradient>
          <linearGradient id="sheenGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,244,224,0)" />
            <stop offset="50%" stopColor="rgba(255,244,224,0.5)" />
            <stop offset="100%" stopColor="rgba(255,244,224,0)" />
          </linearGradient>
          <radialGradient id="fireGlowGrad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(255,106,0,0.65)" />
            <stop offset="55%" stopColor="rgba(255,106,0,0.28)" />
            <stop offset="100%" stopColor="rgba(255,106,0,0)" />
          </radialGradient>
          <filter id="softGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
          <clipPath id="towerClip">
            <rect x={CX - 83} y={TOWER_TOP - 4} width="166" height={TOWER_BOTTOM - TOWER_TOP + 8} rx="83" />
          </clipPath>
        </defs>

        {/* fire glow behind everything */}
        <ellipse cx={CX} cy={472} rx="150" ry="66" fill="url(#fireGlowGrad)" filter="url(#softGlow)" />

        {/* flames */}
        <g>
          {FLAMES.map((f, i) => (
            <g
              key={i}
              className="animate-flicker"
              style={{ transformOrigin: `${f.x}px 482px`, animationDuration: f.dur, animationDelay: f.delay }}
            >
              <path d={flamePath(f.x, f.w, f.h, 486)} fill="url(#flameGrad)" opacity="0.95" />
              {f.core && <path d={flamePath(f.x, f.w * 0.42, f.h * 0.62, 486)} fill="url(#coreGrad)" opacity="0.9" />}
            </g>
          ))}
        </g>

        {/* coal bed */}
        <ellipse cx={CX} cy={508} rx="150" ry="26" fill="#0d0703" />
        <ellipse cx={CX} cy={508} rx="150" ry="26" fill="none" stroke="rgba(255,106,0,0.25)" strokeWidth="2" />

        {/* spit */}
        <path d={`M ${CX - 2.6} 14 L ${CX + 2.6} 14 L ${CX + 2} 28 L ${CX - 2} 28 Z`} fill="url(#metalGrad)" />
        <rect x={CX - 2.6} y={28} width="5.2" height={442} fill="url(#metalGrad)" />
        <rect x={CX - 4} y={452} width="8" height="34" rx="4" fill="url(#metalGrad)" />
        <rect x={CX - 26} y={488} width="52" height="8" rx="4" fill="url(#metalGrad)" />

        {/* meat tower */}
        <g style={{ transformOrigin: '180px 260px', transformBox: 'view-box' }} className="animate-sway">
          {SLICES.map((s, i) => {
            const x = CX - s.w / 2;
            return (
              <g key={i}>
                <rect x={x} y={s.y} width={s.w} height={SLICE_H} rx={s.w / 2} fill="url(#meatGrad)" />
                <rect x={x + s.w * 0.16} y={s.y + SLICE_H * 0.66} width={s.w * 0.68} height={SLICE_H * 0.3} rx={SLICE_H * 0.15} fill="rgba(20,6,0,0.4)" />
              </g>
            );
          })}

          {/* marbling streaks */}
          <path d="M 118 200 Q 132 196 140 210" stroke="rgba(40,12,0,0.5)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 226 240 Q 214 246 210 258" stroke="rgba(40,12,0,0.5)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 128 292 Q 140 300 148 314" stroke="rgba(40,12,0,0.45)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 212 330 Q 200 340 196 352" stroke="rgba(40,12,0,0.45)" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* caramelized rim highlight */}
          <g clipPath="url(#towerClip)">
            <rect x={CX - 90} y={TOWER_TOP - 4} width="70" height={TOWER_BOTTOM - TOWER_TOP + 8} fill="rgba(255,214,160,0.09)" />
            {/* turning sheen */}
            <rect x="0" y={TOWER_TOP - 4} width="90" height={TOWER_BOTTOM - TOWER_TOP + 8} fill="url(#sheenGrad)" className="animate-sheen" />
          </g>
        </g>
      </svg>

      {/* smoke */}
      {SMOKE.map((s, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute animate-smoke-rise rounded-full bg-gradient-to-b from-white/20 to-white/0"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            filter: 'blur(14px)',
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}
