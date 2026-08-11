import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GALLERY, MEDIA_SLOTS, MENU, SITE, type MenuItem } from '../data/site';
import { useMedia } from '../lib/media';
import Reveal from './Reveal';

const gridV = { show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const cardV = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 1] as const } },
};

const POOL = GALLERY.map((g) => g.src);

function MenuPhoto({ real, index, className }: { real: string; index: number; className?: string }) {
  const fallback = POOL[index % POOL.length];
  const src = useMedia([real], fallback);
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="eager"
      decoding="async"
      className={className}
    />
  );
}

function MenuCard({
  item,
  real,
  index,
  onOpen,
}: {
  item: MenuItem;
  real: string;
  index: number;
  onOpen: () => void;
}) {
  const featured = index === 0;
  return (
    <motion.li
      variants={cardV}
      className={featured ? 'col-span-2' : undefined}
    >
      <button
        onClick={onOpen}
        className="group relative block w-full overflow-hidden rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-flame"
        aria-label={`${item.name} — ${item.price} (büyütmek için tıkla)`}
      >
        <div className="relative overflow-hidden">
          <MenuPhoto
            real={real}
            index={index}
            className={`w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06] ${featured ? 'aspect-[4/3] sm:aspect-[16/10]' : 'aspect-[4/5]'}`}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal via-coal/15 to-transparent" />

          {item.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-[#e8b45a]/95 px-3 py-1 text-[9.5px] font-bold uppercase tracking-[0.18em] text-coal">
              {item.badge}
            </span>
          )}

          <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-coal/30 text-cream opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
            <ZoomIn className="h-4 w-4" />
          </span>

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <h3 className="font-display text-[clamp(1.35rem,2.6vw,1.7rem)] leading-snug text-cream transition-colors duration-300 group-hover:text-[#e8b45a]">
              {item.name}
            </h3>
            <p className="mt-1.5 font-display text-[clamp(1.05rem,2vw,1.25rem)] text-[#e8b45a]">{item.price}</p>
            <p className="mt-2 max-h-0 overflow-hidden text-[13px] leading-relaxed text-cream2/85 opacity-0 transition-all duration-500 group-hover:max-h-28 group-hover:opacity-100">
              {item.desc}
            </p>
          </div>
        </div>
      </button>
    </motion.li>
  );
}

function MenuLightbox({
  items,
  real,
  index,
  onNavigate,
  onClose,
}: {
  items: MenuItem[];
  real: string;
  index: number;
  onNavigate: (i: number) => void;
  onClose: () => void;
}) {
  const item = items[index];
  const [dir, setDir] = useState(1);
  const src = useMedia([real], POOL[index % POOL.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        setDir(1);
        onNavigate(index + 1);
      }
      if (e.key === 'ArrowLeft') {
        setDir(-1);
        onNavigate(index - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, onClose, onNavigate]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[1500] flex items-center justify-center bg-coal/92 p-4 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name} — ${item.price}`}
    >
      <button
        onClick={onClose}
        className="absolute right-5 top-5 z-20 grid h-12 w-12 place-items-center rounded-full border border-white/15 text-cream transition-colors hover:border-flame hover:text-flame2"
        aria-label="Kapat"
      >
        <X className="h-6 w-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setDir(-1);
          onNavigate(index - 1);
        }}
        className="absolute left-3 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-coal/40 text-cream transition-colors hover:border-[#e8b45a] hover:text-[#e8b45a] lg:left-6 lg:h-14 lg:w-14"
        aria-label="Önceki ürün"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setDir(1);
          onNavigate(index + 1);
        }}
        className="absolute right-3 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-coal/40 text-cream transition-colors hover:border-[#e8b45a] hover:text-[#e8b45a] lg:right-6 lg:h-14 lg:w-14"
        aria-label="Sonraki ürün"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div
        className="relative z-10 w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: dir * 48, scale: 0.985 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: dir * -48, scale: 0.985 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid items-center gap-6 overflow-hidden rounded-2xl border border-white/10 bg-card shadow-card lg:grid-cols-[1.15fr_1fr] lg:gap-0"
          >
            <div className="relative min-h-[240px] overflow-hidden lg:min-h-[420px]">
              <motion.img
                src={src}
                alt={item.name}
                initial={{ scale: 1.07 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-coal/40" />
            </div>

            <div className="flex h-full flex-col justify-center p-7 sm:p-10 lg:pl-8 lg:pr-10">
              {item.badge && (
                <span className="mb-4 inline-flex w-fit items-center rounded-full bg-[#e8b45a]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e8b45a]">
                  {item.badge}
                </span>
              )}
              <h3 className="font-display text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight text-cream">
                {item.name}
              </h3>
              <p className="mt-4 text-[14.5px] leading-[1.85] text-cream2/85">{item.desc}</p>
              <p className="mt-7 font-display text-[clamp(1.6rem,3vw,2rem)] text-[#e8b45a]">{item.price}</p>
              <p className="mt-8 border-t border-white/10 pt-4 text-[11px] uppercase tracking-[0.22em] text-muted">
                {index + 1} / {items.length}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function MenuSection() {
  const [cat, setCat] = useState(MENU[0].id);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
          className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-7"
        >
          {active.items.map((it, i) => (
            <MenuCard key={it.name} item={it} real={MEDIA_SLOTS.menu[active.id]} index={i} onOpen={() => setOpenIndex(i)} />
          ))}
        </motion.ul>

        <Reveal delay={0.2}>
          <p className="mt-14 text-center text-[13.5px] text-muted">
            Fotoğrafların üzerine tıklayarak ürünleri yakından inceleyebilirsiniz. Fiyatlar değişiklik
            gösterebilir. Sorularınız için{' '}
            <a href={`tel:${SITE.phoneTel}`} className="text-[#e8b45a] underline underline-offset-4 transition-colors hover:text-flame2">
              {SITE.phoneDisplay}
            </a>
          </p>
        </Reveal>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <MenuLightbox
            items={active.items}
            real={MEDIA_SLOTS.menu[active.id]}
            index={openIndex}
            onNavigate={(i) => setOpenIndex((i + active.items.length) % active.items.length)}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
