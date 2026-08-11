import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, MapPin, Navigation, Phone } from 'lucide-react';
import { useState } from 'react';
import { BRANCHES } from '../data/site';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.2, 0.65, 0.3, 1] as const } },
};

const itemFade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.1, ease: 'easeOut' as const } },
};

type StatDef =
  | { key: string; l: string; v: string }
  | { key: string; l: string; dynamic: 'open' | 'close' };

const STATS: StatDef[] = [
  { key: 'open', l: 'Açılış', dynamic: 'open' },
  { key: 'close', l: 'Kapanış', dynamic: 'close' },
  { key: 'wood', v: '%100', l: 'Odun Ateşi' },
  { key: 'price', v: '₺200–400', l: 'Kişi Başı' },
];

const HERO_VIDEO = '/videos/hero-doner.mp4';

export default function Hero({ started }: { started: boolean }) {
  const reduce = useReducedMotion();
  const [branchId, setBranchId] = useState(BRANCHES[0].id);
  const branch = BRANCHES.find((b) => b.id === branchId) ?? BRANCHES[0];
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 900], [0, 90]);
  const fade = useTransform(scrollY, [0, 700], [1, 0]);
  const videoY = useTransform(scrollY, [0, 900], [0, -60]);

  return (
    <section id="anasayfa" className="relative min-h-[100svh] overflow-hidden bg-coal">
      {/* sıcak ortam ışığı — çok hafif */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_620px_at_12%_80%,rgba(255,106,0,0.06),transparent_62%),radial-gradient(720px_480px_at_88%_6%,rgba(224,67,30,0.05),transparent_60%)]"
      />

      {/* SOL: metin + CTA + bilgiler */}
      <div className="relative z-10 pt-32 pb-2 lg:flex lg:min-h-[100svh] lg:items-center lg:py-24">
        <div className="w-full px-[clamp(1.5rem,6vw,7rem)]">
          <motion.div
            className="lg:w-[40vw] lg:max-w-[600px]"
            style={reduce ? undefined : { y: textY, opacity: fade }}
          >
            <motion.div
              variants={container}
              initial={reduce ? undefined : 'hidden'}
              animate={started ? 'show' : undefined}
            >
              <motion.div variants={item} className="flex flex-col items-start gap-3">
                <div
                  role="tablist"
                  aria-label="Şube seçimi"
                  className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-coal2/70 p-1 backdrop-blur-sm"
                >
                  {BRANCHES.map((b) => (
                    <button
                      key={b.id}
                      role="tab"
                      aria-selected={b.id === branchId}
                      onClick={() => setBranchId(b.id)}
                      className={`rounded-full px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.26em] transition-all duration-300 ${
                        b.id === branchId
                          ? 'bg-[#e8b45a] text-coal shadow-[0_0_20px_rgba(232,180,90,0.3)]'
                          : 'text-cream2/70 hover:text-cream'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={branch.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="flex items-center gap-1.5 text-[12.5px] text-cream2/75"
                  >
                    <MapPin className="h-3.5 w-3.5 flex-none text-[#e8b45a]" strokeWidth={1.8} />
                    {branch.addressShort}
                  </motion.p>
                </AnimatePresence>
              </motion.div>

              <motion.h1
                variants={item}
                className="mt-8 font-display text-[clamp(2.9rem,5.4vw,6.25rem)] font-bold leading-[1.02] tracking-[-0.01em] text-cream"
              >
                6 PARMAK
                <span className="mt-2 block italic text-[#e8b45a]">Cağ Döner</span>
              </motion.h1>

              <motion.p
                variants={itemFade}
                className="mt-9 max-w-md text-[clamp(1rem,1.35vw,1.125rem)] font-light leading-[1.85] text-cream2/90"
              >
                Odun ateşinde, yatık şişte sabırla çevrilen cağ döner. Her dilimde ustanın eli,
                her lokmada alevin kokusu. Bursa'da gerçek cağ döner deneyimi.
              </motion.p>

              <motion.div variants={item} className="mt-11 flex flex-wrap items-center gap-4">
                <a href="#menu" className="btn btn--fire px-8 py-4 text-[13px] uppercase tracking-[0.18em]">
                  Menüyü Keşfet
                </a>
                <a href={`tel:${branch.phoneTel}`} className="btn btn--line px-7 py-4 text-[13px]">
                  <Phone className="h-4 w-4 text-[#e8b45a]" />
                  Telefonla Ara
                </a>
                <a
                  href={branch.mapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--ghost px-7 py-4 text-[13px]"
                >
                  <Navigation className="h-4 w-4" />
                  Yol Tarifi Al
                </a>
              </motion.div>

              {/* stats — editorial hairline row */}
              <motion.div variants={itemFade} className="mt-14 flex max-w-xl flex-wrap items-center gap-x-10 gap-y-6">
                {STATS.map((s, i) => (
                  <div key={s.key} className={i > 0 ? 'lg:border-l lg:border-white/10 lg:pl-10' : undefined}>
                    <p className="font-display text-[26px] font-medium leading-none text-cream">
                      {'dynamic' in s ? (
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.span
                            key={branch.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="inline-block"
                          >
                            {s.dynamic === 'open' ? branch.openTime : branch.closeTime}
                          </motion.span>
                        </AnimatePresence>
                      ) : (
                        s.v
                      )}
                    </p>
                    <p className="mt-2 text-[10.5px] uppercase tracking-[0.22em] text-muted">{s.l}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* SAĞ: devasa gerçek döner videosu — edge-to-edge, player'sız */}
      <motion.div
        className="relative z-0 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[60%]"
        style={reduce ? undefined : { y: videoY }}
        initial={reduce ? undefined : { opacity: 0, scale: 1.05 }}
        animate={started ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 1.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <video
          src={HERO_VIDEO}
          className="aspect-[4/5] w-full object-cover object-center lg:aspect-auto lg:h-full"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          preload="auto"
        />
        {/* soldan yumuşak geçiş — desktop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-coal via-[#0b0806]/45 to-transparent lg:block"
        />
        {/* üst geçiş (navbar) — desktop */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 hidden h-36 bg-gradient-to-b from-coal/85 to-transparent lg:block" />
        {/* alt geçiş — sayfaya karışma */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-coal to-transparent" />
      </motion.div>

      {/* scroll hint */}
      <motion.a
        href="#hikaye"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector('#hikaye')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5 text-[10px] uppercase tracking-[0.3em] text-muted transition-colors hover:text-cream2"
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : undefined}
        transition={{ delay: 1.5, duration: 0.8 }}
        aria-label="Aşağı kaydır"
      >
        Keşfet
        <ChevronDown className="h-4 w-4 text-[#e8b45a]" />
      </motion.a>
    </section>
  );
}
