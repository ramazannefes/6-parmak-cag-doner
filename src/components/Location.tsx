import { Banknote, Clock, MapPin, Navigation, Phone } from 'lucide-react';
import { HOURS, SITE } from '../data/site';
import { useOpenStatus } from '../hooks/useOpenStatus';
import Reveal from './Reveal';

export default function Location() {
  const { open, today } = useOpenStatus();

  return (
    <section id="iletisim" className="relative bg-coal py-28 lg:py-40">
      <div className="container-x">
        <div className="text-center">
          <Reveal>
            <span className="kicker kicker--center justify-center">Konum & Saatler</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,3.2rem)] text-cream">
              Bize <span className="italic text-[#e8b45a]">Ulaşın</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.9] text-muted">
              Bursa Osmangazi’nin kalbinde, Kuruçeşme’deyiz. Yol tarifini alın, ateş sizi bekliyor.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-16 lg:grid-cols-2 lg:gap-24">
          {/* info */}
          <Reveal>
            <div className="divide-y divide-white/10">
              <div className="flex items-start gap-5 pb-8">
                <MapPin className="mt-1 h-5 w-5 flex-none text-[#e8b45a]" strokeWidth={1.6} />
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-muted">Adres</p>
                  <a
                    href={SITE.mapsSearch}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 block text-[15px] font-medium leading-relaxed text-cream transition-colors hover:text-[#e8b45a]"
                  >
                    {SITE.address}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5 py-8">
                <Phone className="mt-1 h-5 w-5 flex-none text-[#e8b45a]" strokeWidth={1.6} />
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-muted">Telefon</p>
                  <a href={`tel:${SITE.phoneTel}`} className="mt-1.5 block text-[15px] font-semibold text-cream transition-colors hover:text-[#e8b45a]">
                    {SITE.phoneDisplay}
                  </a>
                  <p className="mt-0.5 text-[12.5px] text-muted">Arayın, döneriniz ateşte sizi beklesin.</p>
                </div>
              </div>

              <div className="py-8">
                <div className="flex items-center gap-5">
                  <Clock className="mt-1 h-5 w-5 flex-none text-[#e8b45a]" strokeWidth={1.6} />
                  <div className="w-full">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-muted">Çalışma Saatleri</p>
                      <span
                        className={`text-[11px] font-bold uppercase tracking-[0.18em] ${
                          open ? 'text-[#8fbf6a]' : 'text-[#e07060]'
                        }`}
                      >
                        {open ? 'Açık — Kapanış 20:00' : 'Kapalı'}
                      </span>
                    </div>
                    <ul className="mt-5">
                      {HOURS.map((h, i) => (
                        <li
                          key={h.day}
                          className={`flex items-center justify-between border-t border-white/10 py-2.5 text-[13px] last:border-b ${
                            i === today ? 'text-cream' : 'text-muted'
                          }`}
                        >
                          <span className={i === today ? 'font-semibold' : undefined}>{h.day}</span>
                          <b className={`font-semibold ${i === today ? 'text-[#e8b45a]' : 'text-cream2/70'}`}>{h.time}</b>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-5 pt-8">
                <Banknote className="mt-1 h-5 w-5 flex-none text-[#e8b45a]" strokeWidth={1.6} />
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-muted">Kişi Başı</p>
                  <p className="mt-1.5 text-[15px] font-medium text-cream">{SITE.priceRange}</p>
                  <p className="mt-0.5 text-[12.5px] text-muted">Lezzete göre kıyaslanamaz değer.</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* map */}
          <Reveal delay={0.15}>
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-card">
              <iframe
                title="6 Parmak Cağ Döner harita konumu"
                src={SITE.mapsEmbed}
                className="h-full min-h-[420px] w-full border-0 opacity-90"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute left-4 top-4">
                <a
                  href={SITE.mapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--fire px-5 py-2.5 text-[12.5px]"
                >
                  <Navigation className="h-4 w-4" />
                  Yol Tarifi Al
                </a>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-coal/60 to-transparent" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
