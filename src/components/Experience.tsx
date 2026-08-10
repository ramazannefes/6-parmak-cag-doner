import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Reveal from './Reveal';

const FEATURES = [
  { t: 'Odun Ateşi', s: 'Meşe korunda pişen lezzet' },
  { t: 'Usta Eli', s: 'Ateşi ve eti tanıyan eller' },
  { t: 'Günlük Taze Kesim', s: 'Her sabah yeni et' },
  { t: '4.9 ★ Google', s: '3.888 mutlu misafir' },
];

export default function Experience() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section id="deneyim" className="relative overflow-hidden bg-coal">
      {/* cinematic parallax band */}
      <div ref={ref} className="relative flex min-h-[58vh] items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-[-12%]" style={{ y: reduce ? 0 : imgY }}>
          <img
            src="/images/food/cag-doner-slicing.jpg"
            alt="Ustanın eliyle odun ateşinde pişen cağ dönerden dilim alınması"
            className="h-full w-full scale-110 object-cover"
            loading="eager"
            decoding="async"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(12,9,6,0.3),rgba(12,9,6,0.85))]" />
        <div className="relative z-10 max-w-3xl px-6 py-28 text-center">
          <Reveal>
            <blockquote className="font-display text-[clamp(1.9rem,5vw,3.4rem)] italic leading-tight text-cream">
              “Ateş, et ve ustalık…
              <br />
              Gerisi <span className="text-[#e8b45a]">gelir.</span>”
            </blockquote>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-[12px] uppercase tracking-[0.22em] text-cream2/70">— 6 Parmak Cağ Döner Ustası</p>
          </Reveal>
        </div>
      </div>

      {/* story of the craft */}
      <div className="container-x grid items-center gap-16 py-28 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24 lg:py-40">
        <Reveal className="order-2 lg:order-1">
          <div className="group relative overflow-hidden rounded-2xl">
            <img
              src="/images/food/Gemini_Generated_Image_u4e2nju4e2nju4e2.png"
              alt="Odun ateşi üzerinde dönen cağ döner"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              loading="eager"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="font-display text-4xl font-medium text-cream">4.9 ★</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-cream2/70">3.888 Google yorumu</p>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="kicker">Cağ Döner Deneyimi</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,3.2rem)] leading-tight text-cream">
              Yatık Şişte,
              <br />
              <span className="italic text-[#e8b45a]">Odun Ateşinde</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-[15.5px] leading-[1.9] text-cream2">
              Cağ döner; yatay şişe geçirilen, kuzu etinin odun ateşine karşı sabırla döndürülerek
              pişirildiği bir ustalık eseridir. Dış yüzeyi nar gibi kızarır, katman katman dilimlenir,
              yeniden ateşe döner.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-4 text-[15px] leading-[1.9] text-muted">
              Bu ritmi yıllardır koruyoruz: her sabah taze kesim, meşe odununun koru, ustanın eli.
              Gerisi, sofrada misafirin yüzündeki o ilk lokmadaki sessizlik.
            </p>
          </Reveal>

          <div className="mt-12">
            {FEATURES.map((f, i) => (
              <Reveal key={f.t} delay={0.12 + i * 0.06}>
                <div className="flex items-baseline gap-6 border-t border-white/10 py-5 last:border-b">
                  <span className="w-44 flex-none text-[14px] font-semibold text-cream">{f.t}</span>
                  <span className="text-[13.5px] text-muted">{f.s}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
