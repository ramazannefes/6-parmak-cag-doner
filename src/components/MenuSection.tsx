import { motion } from 'framer-motion';
import { useState } from 'react';
import { MENU, SITE } from '../data/site';
import Reveal from './Reveal';

const gridV = { show: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } } };
const cardV = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.65, 0.3, 1] as const } },
};

export default function MenuSection() {
  const [cat, setCat] = useState(MENU[0].id);
  const active = MENU.find((c) => c.id === cat) ?? MENU[0];

  return (
    <section id="menu" className="relative bg-coal py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_0%,rgba(255,106,0,0.06),transparent_60%)]" />
      <div className="container-x relative">
        <div className="text-center">
          <Reveal>
            <span className="kicker kicker--center justify-center">Menümüz</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.4rem)] text-cream">
              Ateşin Dilinden <span className="flame-text italic">Lezzetler</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
              Her tabakta odun ateşinin kokusu, ustanın dokunuşu. Fiyatlar günceldir, keyif bol olsun.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5" role="tablist" aria-label="Menü kategorileri">
            {MENU.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={c.id === cat}
                onClick={() => setCat(c.id)}
                className={`rounded-full px-5 py-2.5 text-[13.5px] font-medium transition-all duration-300 ${
                  c.id === cat
                    ? 'bg-flame-grad text-[#0c0906] shadow-flame'
                    : 'border border-white/10 bg-white/5 text-cream2 hover:border-flame/50 hover:text-cream'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.ul
          key={active.id}
          variants={gridV}
          initial="hidden"
          animate="show"
          className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2"
        >
          {active.items.map((it) => (
            <motion.li
              key={it.name}
              variants={cardV}
              className="group relative rounded-2xl border border-white/10 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-flame/50 hover:shadow-flame-lg"
            >
              {it.badge && (
                <span className="absolute -top-2.5 right-5 rounded-full bg-flame-grad px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0c0906] shadow-flame">
                  {it.badge}
                </span>
              )}
              <div className="flex items-baseline gap-3">
                <h3 className="text-[16.5px] font-bold text-cream">{it.name}</h3>
                <span aria-hidden="true" className="flex-1 border-b-2 border-dotted border-white/20" />
                <span className="whitespace-nowrap font-display text-[17px] font-semibold text-flame2">{it.price}</span>
              </div>
              <p className="mt-2.5 text-[13px] leading-relaxed text-muted">{it.desc}</p>
            </motion.li>
          ))}
        </motion.ul>

        <Reveal delay={0.2}>
          <p className="mt-12 text-center text-[13.5px] text-muted">
            Fiyatlar değişiklik gösterebilir. Sorularınız için{' '}
            <a href={`tel:${SITE.phoneTel}`} className="text-flame2 underline underline-offset-4 transition-colors hover:text-flame">
              {SITE.phoneDisplay}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
