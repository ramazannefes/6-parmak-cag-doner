import { motion } from 'framer-motion';
import { useState } from 'react';
import { MENU, SITE } from '../data/site';
import Reveal from './Reveal';

const gridV = { show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } };
const cardV = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 1] as const } },
};

export default function MenuSection() {
  const [cat, setCat] = useState(MENU[0].id);
  const active = MENU.find((c) => c.id === cat) ?? MENU[0];

  return (
    <section id="menu" className="relative bg-coal py-28 lg:py-40">
      <div className="container-x">
        <div className="text-center">
          <Reveal>
            <span className="kicker kicker--center justify-center">Menümüz</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,3.2rem)] text-cream">
              Ateşin Dilinden <span className="italic text-[#e8b45a]">Lezzetler</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.9] text-muted">
              Her tabakta odun ateşinin kokusu, ustanın dokunuşu. Fiyatlar günceldir, keyif bol olsun.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-9 gap-y-3" role="tablist" aria-label="Menü kategorileri">
            {MENU.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={c.id === cat}
                onClick={() => setCat(c.id)}
                className={`relative pb-2 text-[13px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                  c.id === cat ? 'text-[#e8b45a]' : 'text-muted hover:text-cream'
                }`}
              >
                {c.label}
                <span
                  className={`absolute inset-x-0 bottom-0 h-px bg-[#e8b45a] transition-all duration-300 ${c.id === cat ? 'opacity-100' : 'opacity-0'}`}
                />
              </button>
            ))}
          </div>
        </Reveal>

        <motion.ul
          key={active.id}
          variants={gridV}
          initial="hidden"
          animate="show"
          className="mx-auto mt-14 grid max-w-5xl gap-x-20 gap-y-1 sm:grid-cols-2"
        >
          {active.items.map((it) => (
            <motion.li key={it.name} variants={cardV}>
              <div className="group py-5">
                <div className="flex items-baseline gap-4">
                  {it.badge && (
                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.2em] text-[#e8b45a]">{it.badge}</span>
                  )}
                  <h3 className="font-display text-[19px] leading-snug text-cream transition-colors duration-300 group-hover:text-[#e8b45a]">
                    {it.name}
                  </h3>
                  <span aria-hidden="true" className="mx-1 flex-1 border-b border-dotted border-white/15" />
                  <span className="whitespace-nowrap font-display text-[17px] text-cream2">{it.price}</span>
                </div>
                <p className="mt-1.5 pl-1 text-[13px] leading-relaxed text-muted">{it.desc}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <Reveal delay={0.2}>
          <p className="mt-14 text-center text-[13.5px] text-muted">
            Fiyatlar değişiklik gösterebilir. Sorularınız için{' '}
            <a href={`tel:${SITE.phoneTel}`} className="text-[#e8b45a] underline underline-offset-4 transition-colors hover:text-flame2">
              {SITE.phoneDisplay}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
