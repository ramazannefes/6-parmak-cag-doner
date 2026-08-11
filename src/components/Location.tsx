import { MapPin, Navigation, Phone } from 'lucide-react';
import { BRANCHES } from '../data/site';
import Reveal from './Reveal';

export default function Location() {
  return (
    <section id="iletisim" className="relative bg-coal py-28 lg:py-40">
      <div className="container-x">
        <div className="text-center">
          <Reveal>
            <span className="kicker kicker--center justify-center">Şubelerimiz</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,3.2rem)] text-cream">
              Bize <span className="italic text-[#e8b45a]">Ulaşın</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.9] text-muted">
              Osmangazi ve Güzelyalı'da iki şubemizle hizmetinizdeyiz. Yol tarifini alın, ateş sizi bekliyor.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-2">
          {BRANCHES.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.12}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card">
                <div className="relative h-52 overflow-hidden sm:h-60">
                  <iframe
                    title={`${b.label} şube harita konumu`}
                    src={b.mapsEmbed}
                    className="h-full w-full border-0 opacity-90"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal/80 to-transparent" />
                  <div className="absolute bottom-4 left-5 flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e8b45a]/15 text-[#e8b45a]">
                      <MapPin className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <h3 className="font-display text-[22px] text-cream">{b.label}</h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted">{b.area}</p>
                  <a
                    href={b.mapsSearch}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-[15px] font-medium leading-relaxed text-cream transition-colors hover:text-[#e8b45a]"
                  >
                    {b.address}
                  </a>
                  <a
                    href={`tel:${b.phoneTel}`}
                    className="mt-3 inline-flex items-center gap-2 text-[15px] font-semibold text-cream transition-colors hover:text-[#e8b45a]"
                  >
                    <Phone className="h-4 w-4 text-[#e8b45a]" />
                    {b.phoneDisplay}
                  </a>
                  <p className="mt-2 text-[13px] text-muted">{b.hoursNote}</p>

                  <div className="mt-auto flex flex-wrap gap-3 pt-7">
                    <a
                      href={b.mapsDirections}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--fire px-5 py-3 text-[12px] uppercase tracking-[0.16em]"
                    >
                      <Navigation className="h-4 w-4" />
                      Yol Tarifi
                    </a>
                    <a href={`tel:${b.phoneTel}`} className="btn btn--line px-5 py-3 text-[12px] uppercase tracking-[0.16em]">
                      <Phone className="h-4 w-4 text-[#e8b45a]" />
                      Telefon
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
