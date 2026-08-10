import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { GALLERY } from '../data/site';
import Reveal from './Reveal';

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const step = useCallback(
    (dir: number) => {
      setIndex((i) => (i === null ? i : (i + dir + GALLERY.length) % GALLERY.length));
    },
    []
  );

  useEffect(() => {
    if (!open) return;
    document.body.classList.add('no-scroll');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndex(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('no-scroll');
      window.removeEventListener('keydown', onKey);
    };
  }, [open, step]);

  return (
    <section id="galeri" className="relative bg-coal2 py-24 lg:py-32">
      <div className="container-x">
        <div className="text-center">
          <Reveal>
            <span className="kicker kicker--center justify-center">Galeri</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.4rem)] text-cream">
              Ateşin Başından <span className="flame-text italic">Kareler</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
              Korum, şiş ve ustanın eli... Görüntüle, fotoğraflara dokun ve büyüt.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {GALLERY.map((g, i) => (
            <Reveal
              key={g.src}
              delay={(i % 3) * 0.1}
              className={i === 0 || i === 3 ? 'md:col-span-1' : undefined}
            >
              <button
                onClick={() => setIndex(i)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-white/10"
                aria-label={`Görseli büyüt: ${g.caption}`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${i % 3 === 1 ? 'aspect-square md:aspect-[3/4]' : 'aspect-square'}`}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-coal/80 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                <span className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 text-left opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100" style={{ transform: 'translateY(8px)' }}>
                  <span className="text-[12.5px] font-medium leading-snug text-cream">{g.caption}</span>
                  <Expand className="h-4 w-4 flex-none text-flame2" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && index !== null && (
          <motion.div
            className="fixed inset-0 z-[1500] flex items-center justify-center bg-coal/92 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Görsel önizleme"
          >
            <button
              onClick={() => setIndex(null)}
              className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-white/15 text-cream transition-colors hover:border-flame hover:text-flame2"
              aria-label="Kapat"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 text-cream transition-colors hover:border-flame hover:text-flame2 sm:left-6"
              aria-label="Önceki görsel"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 text-cream transition-colors hover:border-flame hover:text-flame2 sm:right-6"
              aria-label="Sonraki görsel"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.figure
              key={index}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.2, 0.65, 0.3, 1] }}
              className="max-h-[82vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY[index].src}
                alt={GALLERY[index].alt}
                className="max-h-[70vh] w-auto rounded-2xl object-contain shadow-card"
              />
              <figcaption className="mt-4 text-center">
                <p className="text-[15px] text-cream">{GALLERY[index].caption}</p>
                <p className="mt-1 text-[12px] tracking-[0.2em] text-muted">
                  {index + 1} / {GALLERY.length}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
