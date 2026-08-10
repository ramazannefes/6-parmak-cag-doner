import { Instagram, ExternalLink } from 'lucide-react';
import { GALLERY, SITE } from '../data/site';
import Reveal from './Reveal';

const TRACK = [...GALLERY, ...GALLERY];

export default function InstagramSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-coal py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_320px_at_50%_50%,rgba(255,106,0,0.08),transparent_60%)]" />

      <div className="container-x relative z-10 text-center">
        <Reveal>
          <span className="kicker kicker--center justify-center">Instagram</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.2rem)] text-cream">
            Her Gün, <span className="flame-text italic">Ateşin Başından</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-card px-7 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-flame/50 hover:shadow-flame-lg"
          >
            <span className="grid h-14 w-14 flex-none place-items-center rounded-2xl bg-flame-grad text-[#0c0906] shadow-flame">
              <Instagram className="h-7 w-7" />
            </span>
            <span className="text-left">
              <span className="block text-[17px] font-bold text-cream">6parmakcagdoner</span>
              <span className="block text-[12.5px] text-muted">Korum, döner ve Bursa günlükleri</span>
            </span>
            <ExternalLink className="h-4 w-4 text-flame2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </Reveal>
      </div>

      <Reveal delay={0.25}>
        <div className="marquee relative z-0 mt-14 overflow-hidden" style={{ maskImage: 'linear-gradient(90deg,transparent,black 12%,black 88%,transparent)' }}>
          <div className="marquee-track flex w-max gap-4 pr-4">
            {TRACK.map((g, i) => (
              <a
                key={i}
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block h-44 w-44 flex-none overflow-hidden rounded-2xl sm:h-56 sm:w-56"
                aria-label={`Instagram: ${g.caption}`}
              >
                <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute inset-0 bg-coal/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      <style>{`
        .marquee-track { animation: marquee 46s linear infinite; }
        .marquee:hover .marquee-track { animation-play-state: paused; }
        @keyframes marquee { to { transform: translateX(calc(-50% - 8px)); } }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; flex-wrap: wrap; width: auto; justify-content: center; gap: 12px; }
          .marquee .marquee-track a { height: 140px; width: 140px; }
        }
      `}</style>
    </section>
  );
}
