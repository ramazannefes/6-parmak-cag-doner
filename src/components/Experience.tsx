import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Reveal from './Reveal';

export default function Experience() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section id="deneyim" className="relative overflow-hidden bg-coal">
      {/* cinematic parallax band */}
      <div ref={ref} className="relative flex min-h-[62vh] items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-[-14%]" style={{ y: reduce ? 0 : imgY }}>
          <img
            src="/images/cag-slicing.jpg"
            alt="Ustanın eliyle odun ateşinde pişen cağ dönerden dilim alınması"
            className="h-full w-full scale-110 object-cover"
            loading="lazy"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(12,9,6,0.25),rgba(12,9,6,0.88))]" />
        <div className="relative z-10 max-w-3xl px-6 py-28 text-center">
          <Reveal>
            <blockquote className="font-display text-[clamp(1.9rem,5vw,3.6rem)] italic leading-tight text-cream">
              “Ateş, et ve ustalık…
              <br />
              Gerisi <span className="flame-text">gelir.</span>”
            </blockquote>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-[12px] uppercase tracking-[0.22em] text-cream2">— 6 Parmak Cağ Döner Ustası</p>
          </Reveal>
        </div>
      </div>

      {/* story of the craft */}
      <div className="container-x grid items-center gap-14 py-24 lg:grid-cols-2 lg:py-32">
        <Reveal className="order-2 lg:order-1">
          <div className="group relative overflow-hidden rounded-3xl shadow-card">
            <img
              src="/images/doner-hero.jpg"
              alt="Odun ateşi üzerinde dönen cağ döner"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-2xl bg-flame-grad px-5 py-3 text-[#0c0906]">
              <p className="font-display text-3xl font-bold leading-none">50+</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em]">Yıl Ustalık</p>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="kicker">Cağ Döner Deneyimi</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.4rem)] leading-tight text-cream">
              Yatık Şişte,
              <br />
              <span className="flame-text italic">Odun Ateşinde</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-[15.5px] leading-relaxed text-cream2">
              Cağ döner; yatay şişe geçirilen, kuzu etinin odun ateşine karşı sabırla döndürülerek
              pişirildiği bir ustalık eseridir. Dış yüzeyi nar gibi kızarır, katman katman dilimlenir,
              yeniden ateşe döner.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Bu ritmi yıllardır koruyoruz: her sabah taze kesim, meşe odununun koru, ustanın eli.
              Gerisi, sofrada misafirin yüzündeki o ilk lokmadaki sessizlik.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2">
            {[
              ['Günlük Taze Kesim', 'Her sabah yeni et'],
              ['Meşe Odunu Korum', 'Lezzetin sırrı'],
              ['Usta Dili', 'Nesilden nesile'],
              ['4.9 ★ Google', '3.888 mutlu misafir'],
            ].map(([t, s], i) => (
              <Reveal key={t} delay={0.35 + i * 0.08}>
                <div className="rounded-2xl border border-white/10 bg-card p-4 transition-colors duration-300 hover:border-flame/50">
                  <p className="text-[14px] font-semibold text-cream">{t}</p>
                  <p className="mt-1 text-[12.5px] text-muted">{s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
