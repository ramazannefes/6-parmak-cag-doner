import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Phone, Star } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { SITE } from '../data/site';
import Embers from './Embers';
import Rotisserie from './Rotisserie';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.2, 0.65, 0.3, 1] as const } },
};

const CHIPS = [
  { label: 'Cağ Döner', sub: 'Odun ateşinde', price: '₺320', pos: 'left-[6%] top-[30%]' },
  { label: 'Google Puanı', sub: '3.888 yorum', price: '4.9 ★', pos: 'right-[2%] top-[24%]' },
  { label: 'Odun Ateşi', sub: '%100 kor köz', price: '', pos: 'right-[6%] bottom-[22%]' },
];

export default function Hero({ started }: { started: boolean }) {
  const reduce = useReducedMotion();
  const { openReserve } = useModal();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, 130]);
  const fade = useTransform(scrollY, [0, 620], [1, 0]);
  const rotY = useTransform(scrollY, [0, 800], [0, -60]);

  return (
    <section id="anasayfa" className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 lg:pt-32">
      {/* ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_75%_10%,rgba(255,106,0,0.1),transparent_60%),radial-gradient(900px_500px_at_15%_85%,rgba(224,67,30,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-coal via-coal to-coal" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-coal to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-coal to-transparent" />
      <Embers density={0.7} />

      <div className="container-x relative z-10 grid w-full items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        {/* copy */}
        <motion.div style={reduce ? undefined : { y: parallaxY, opacity: fade }}>
          <motion.div variants={container} initial={reduce ? undefined : 'hidden'} animate={started ? 'show' : undefined}>
            <motion.div variants={item} className="mb-7 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-flame2/40 bg-flame2/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-flame2 backdrop-blur-sm">
                Bursa · Osmangazi
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[12px] text-cream2">
                <span className="flex items-center gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                </span>
                4.9 · 3.888 yorum
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="font-display text-[clamp(3rem,8vw,5.4rem)] font-bold leading-[1.02] text-cream"
            >
              6 PARMAK
              <span className="flame-text mt-1 block italic">Cağ Döner</span>
            </motion.h1>

            <motion.p variants={item} className="mt-7 max-w-xl text-[clamp(1rem,1.5vw,1.2rem)] font-light leading-relaxed text-cream2">
              Odun ateşinde, yatık şişte sabırla çevrilen cağ döner. Her dilimde ustanın eli,
              her lokmada alevin kokusu ve yarım asırlık bir geleneğin tadı.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#menu" className="btn btn--fire px-8 py-4 text-[13.5px] uppercase tracking-wider">
                Menüyü Keşfet
              </a>
              <a href={`tel:${SITE.phoneTel}`} className="btn btn--line px-7 py-4 text-[13.5px]">
                <Phone className="h-4 w-4 text-flame2" />
                {SITE.phoneDisplay}
              </a>
              <button onClick={openReserve} className="btn btn--ghost px-6 py-4 text-[13.5px]">
                Rezervasyon
              </button>
            </motion.div>

            <motion.dl variants={item} className="mt-12 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
              {[
                ['4.9★', 'Google Puanı'],
                ['50+', 'Yıl Ustalık'],
                ['%100', 'Odun Ateşi'],
                ['₺200-400', 'Kişi Başı'],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-display text-[26px] font-semibold leading-none text-white">{v}</dd>
                  <dd className="mt-2 text-[11px] uppercase tracking-[0.14em] text-muted">{l}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>
        </motion.div>

        {/* rotisserie */}
        <motion.div
          className="relative mx-auto w-full max-w-[430px]"
          style={reduce ? undefined : { y: rotY }}
          initial={reduce ? undefined : { opacity: 0, scale: 0.92 }}
          animate={started ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Rotisserie />
          <Embers density={1.3} className="!inset-x-6 !bottom-0 !top-auto h-[46%]" />

          {CHIPS.map((c, i) => (
            <motion.div
              key={c.label}
              className={`glass absolute hidden rounded-2xl px-4 py-3 shadow-card lg:block ${c.pos}`}
              initial={{ opacity: 0, y: 18 }}
              animate={started ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.9 + i * 0.18, duration: 0.7, ease: [0.2, 0.65, 0.3, 1] }}
              style={{ animation: 'floaty 6s ease-in-out infinite', animationDelay: `${-i * 1.6}s` }}
            >
              <p className="text-[13px] font-semibold text-cream">{c.label}</p>
              <p className="text-[11px] text-muted">{c.sub}</p>
              {c.price && <p className="mt-0.5 text-[13px] font-bold text-flame2">{c.price}</p>}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.a
        href="#hikaye"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector('#hikaye')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5 text-[10px] uppercase tracking-[0.3em] text-muted transition-colors hover:text-flame2"
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : undefined}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-label="Aşağı kaydır"
      >
        Keşfet
        <ChevronDown className="h-4 w-4 animate-bounce text-flame" />
      </motion.a>
    </section>
  );
}
