import { motion, useReducedMotion } from 'framer-motion';

const LETTERS = '6 PARMAK'.split('');

export default function Loader() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-coal"
      exit={{
        y: '-100%',
        transition: { duration: reduce ? 0.05 : 0.75, ease: [0.76, 0, 0.24, 1] },
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,106,0,0.16),transparent_62%)]" />

      <svg width="58" height="58" viewBox="0 0 64 64" className="relative mb-6">
        <path
          d="M32 8 C 30 16 22 20 22 30 C 22 38 28 42 32 42 C 36 42 42 38 42 30 C 42 20 34 16 32 8 Z"
          fill="url(#loaderFlame)"
        >
          <animate attributeName="opacity" values="1;0.72;1" dur="1.4s" repeatCount="indefinite" />
        </path>
        <path d="M32 16 C 31 21 27 23 27 29 C 27 34 31 37 32 37 C 33 37 37 34 37 29 C 37 23 33 21 32 16 Z" fill="#fff6dd" opacity="0.95">
          <animate attributeName="opacity" values="0.95;0.6;0.95" dur="1.1s" repeatCount="indefinite" />
        </path>
        <defs>
          <linearGradient id="loaderFlame" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#ff8c00" />
            <stop offset="100%" stopColor="#ff5a00" />
          </linearGradient>
        </defs>
      </svg>

      <div className="flex overflow-hidden">
        {LETTERS.map((ch, i) => (
          <motion.span
            key={i}
            className="font-display text-4xl font-bold tracking-wide text-cream sm:text-5xl"
            initial={reduce ? undefined : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 + i * 0.055, ease: [0.2, 0.65, 0.3, 1] }}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        ))}
      </div>

      <motion.p
        className="mt-3 text-[11px] font-semibold uppercase tracking-[0.55em] text-flame2"
        initial={reduce ? undefined : { opacity: 0, letterSpacing: '0.2em' }}
        animate={{ opacity: 1, letterSpacing: '0.55em' }}
        transition={{ duration: 0.9, delay: 0.55, ease: 'easeOut' }}
      >
        Cağ Döner
      </motion.p>

      <div className="relative mt-8 h-[3px] w-52 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full bg-flame-grad"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.6, delay: 0.25, ease: 'easeInOut' }}
        />
      </div>

      <motion.span
        className="absolute bottom-8 text-[10px] uppercase tracking-[0.35em] text-muted"
        initial={reduce ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        Bursa · Osmangazi
      </motion.span>
    </motion.div>
  );
}
