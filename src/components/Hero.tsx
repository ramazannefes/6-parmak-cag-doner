import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Navigation, Phone, Star } from 'lucide-react';
import { SITE } from '../data/site';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.2, 0.65, 0.3, 1] as const } },
};

const STATS = [
  { v: '11:00', l: 'Açılış' },
  { v: '20:00', l: 'Kapanış' },
  { v: '%100', l: 'Odun Ateşi' },
  { v: '₺200–400', l: 'Kişi Başı' },
];

const HERO_VIDEO = '/videos/hero-doner.mp4';

export default function Hero({ started }: { started: boolean }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, 120]);
  const fade = useTransform(scrollY, [0, 620], [1, 0]);
  const rotY = useTransform(scrollY, [0, 800], [0, -50]);

  return (
    <section id="anasayfa" className="relative flex min-h-[100svh] items-center overflow-hidden pt-32 lg:pt-40">
      {/* quiet ambient */}
      <div className="absolute inset-0 bg-[radial-gradient(1000px_520px_at_78%_12%,rgba(255,106,0,0.05),transparent_60%),radial-gradient(800px_480px_at_12%_92%,rgba(224,67,30,0.04),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-coal to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-coal to-transparent" />

      <div className="container-x relative z-10 grid w-full items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        {/* copy */}
        <motion.div style={reduce ? undefined : { y: parallaxY, opacity: fade }}>
          <motion.div variants={container} initial={reduce ? undefined : 'hidden'} animate={started ? 'show' : undefined}>
            <motion.p
              variants={item}
              className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-cream2/80"
            >
              Bursa · Osmangazi
              <span className="inline-flex items-center gap-1.5 text-gold">
                <Star className="h-3.5 w-3.5 fill-current" />
                4.9 · 3.888 yorum
              </span>
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-8 font-display text-[clamp(3rem,8vw,5.4rem)] font-bold leading-[1.04] text-cream"
            >
              6 PARMAK
              <span className="mt-1 block italic text-[#e8b45a]">Cağ Döner</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-8 max-w-xl text-[clamp(1rem,1.5vw,1.15rem)] font-light leading-[1.8] text-cream2/90"
            >
              Odun ateşinde, yatık şişte sabırla çevrilen cağ döner. Her dilimde ustanın eli,
              her lokmada alevin kokusu. Bursa'da gerçek cağ döner deneyimi.
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#menu" className="btn btn--fire px-8 py-4 text-[13px] uppercase tracking-[0.18em]">
                Menüyü Keşfet
              </a>
              <a href={`tel:${SITE.phoneTel}`} className="btn btn--line px-7 py-4 text-[13px]">
                <Phone className="h-4 w-4 text-[#e8b45a]" />
                Telefonla Ara
              </a>
              <a
                href={SITE.mapsDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost px-7 py-4 text-[13px]"
              >
                <Navigation className="h-4 w-4" />
                Yol Tarifi Al
              </a>
            </motion.div>

            {/* stats — editorial hairline row */}
            <motion.div variants={item} className="mt-14 flex max-w-xl flex-wrap items-center gap-x-10 gap-y-6">
              {STATS.map((s, i) => (
                <div key={s.l} className={i > 0 ? 'lg:border-l lg:border-white/10 lg:pl-10' : undefined}>
                  <p className="font-display text-[26px] font-medium leading-none text-cream">{s.v}</p>
                  <p className="mt-2 text-[10.5px] uppercase tracking-[0.22em] text-muted">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* gerçek cağ döner videosu — canlı görsel, player değil */}
        <motion.div
          className="relative mx-auto w-full max-w-[440px]"
          style={reduce ? undefined : { y: rotY }}
          initial={reduce ? undefined : { opacity: 0, scale: 0.96 }}
          animate={started ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* hafif sıcak hale — çok yumuşak */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[radial-gradient(58%_58%_at_50%_42%,rgba(255,106,0,0.09),transparent_72%)]"
          />
          <div className="relative overflow-hidden rounded-[1.75rem] bg-coal2/60 shadow-card">
            <video
              src={HERO_VIDEO}
              className="aspect-[4/5] w-full object-cover object-center"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              disablePictureInPicture
              preload="auto"
            />
            {/* hafif vignette — döneri öne çıkarır, ağır efekt yok */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_45%,transparent_52%,rgba(12,12,12,0.42)_100%)]" />
            {/* alt geçiş — arka planla bütünleşme */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-coal/80 to-transparent" />
          </div>
        </motion.div>
      </div>

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
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-label="Aşağı kaydır"
      >
        Keşfet
        <ChevronDown className="h-4 w-4 text-[#e8b45a]" />
      </motion.a>
    </section>
  );
}
