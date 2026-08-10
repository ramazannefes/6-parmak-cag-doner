import { Instagram, ExternalLink } from 'lucide-react';
import { GALLERY, SITE } from '../data/site';
import { useMedia } from '../lib/media';
import Reveal from './Reveal';

function InstagramTile({ g, index }: { g: (typeof GALLERY)[number]; index: number }) {
  const src = useMedia([g.real], g.src);
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <a
        href={SITE.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="group block overflow-hidden rounded-xl"
        aria-label={`Instagram'da görüntüle: ${g.caption}`}
      >
        <img
          src={src}
          alt={g.alt}
          loading="eager"
          decoding="async"
          className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </a>
    </Reveal>
  );
}

export default function InstagramSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-coal py-28 lg:py-40">
      <div className="container-x">
        <div className="text-center">
          <Reveal>
            <span className="kicker kicker--center justify-center">Instagram</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3rem)] text-cream">
              Her Gün, <span className="italic text-[#e8b45a]">Ateşin Başından</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-4 border-b border-white/20 pb-2 text-cream transition-colors hover:border-[#e8b45a]"
            >
              <span className="grid h-12 w-12 flex-none place-items-center rounded-full border border-white/15 text-[#e8b45a]">
                <Instagram className="h-5 w-5" />
              </span>
              <span className="text-left">
                <span className="block font-display text-[20px] text-cream transition-colors group-hover:text-[#e8b45a]">
                  6parmakcagdoner
                </span>
                <span className="block text-[12px] uppercase tracking-[0.18em] text-muted">Korum, döner ve Bursa günlükleri</span>
              </span>
              <ExternalLink className="h-4 w-4 flex-none text-[#e8b45a] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:gap-8">
          {GALLERY.map((g, i) => (
            <InstagramTile key={g.src} g={g} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
