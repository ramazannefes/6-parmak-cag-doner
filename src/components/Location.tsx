import { Banknote, Clock, MapPin, Navigation, Phone } from 'lucide-react';
import { HOURS, SITE } from '../data/site';
import { useOpenStatus } from '../hooks/useOpenStatus';
import Reveal from './Reveal';

export default function Location() {
  const { open, today } = useOpenStatus();

  return (
    <section id="iletisim" className="relative bg-coal py-24 lg:py-32">
      <div className="container-x">
        <div className="text-center">
          <Reveal>
            <span className="kicker kicker--center justify-center">Konum & Saatler</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.4rem)] text-cream">
              Bize <span className="flame-text italic">Ulaşın</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
              Bursa Osmangazi’nin kalbinde, Kuruçeşme’deyiz. Yol tarifini alın, ateş sizi bekliyor.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* info card */}
          <Reveal>
            <div className="glass h-full rounded-3xl p-7 sm:p-9">
              <div className="flex items-start gap-4 border-b border-white/10 pb-6">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-flame-grad-soft text-flame2">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-flame2">Adres</p>
                  <a
                    href={SITE.mapsSearch}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-[15px] font-medium text-cream transition-colors hover:text-flame2"
                  >
                    {SITE.address}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-white/10 py-6">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-flame-grad-soft text-flame2">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-flame2">Telefon</p>
                  <a href={`tel:${SITE.phoneTel}`} className="mt-1 block text-[15px] font-semibold text-cream transition-colors hover:text-flame2">
                    {SITE.phoneDisplay}
                  </a>
                  <p className="mt-0.5 text-[12.5px] text-muted">Arayın, döneriniz ateşte sizi beklesin.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-white/10 py-6">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-flame-grad-soft text-flame2">
                  <Clock className="h-5 w-5" />
                </span>
                <div className="w-full">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-flame2">Çalışma Saatleri</p>
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                        open ? 'bg-[#7ed957]/15 text-[#7ed957]' : 'bg-[#ff5252]/15 text-[#ff5252]'
                      }`}
                    >
                      {open ? 'Açık — Kapanış 20:00' : 'Kapalı'}
                    </span>
                  </div>
                  <ul className="mt-4 grid grid-cols-2 gap-2">
                    {HOURS.map((h, i) => (
                      <li
                        key={h.day}
                        className={`flex items-center justify-between rounded-xl border px-3 py-2 text-[12.5px] ${
                          i === today ? 'border-flame/60 bg-flame-grad-soft' : 'border-white/10 bg-white/5'
                        }`}
                      >
                        <span className={i === today ? 'font-semibold text-cream' : 'text-muted'}>{h.day}</span>
                        <b className={`font-semibold ${i === today ? 'text-flame2' : 'text-cream2'}`}>{h.time}</b>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-6">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-flame-grad-soft text-flame2">
                  <Banknote className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-flame2">Kişi Başı</p>
                  <p className="mt-1 text-[15px] font-medium text-cream">{SITE.priceRange}</p>
                  <p className="mt-0.5 text-[12.5px] text-muted">Lezzete göre kıyaslanamaz değer.</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* map */}
          <Reveal delay={0.15}>
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-card">
              <iframe
                title="6 Parmak Cağ Döner harita konumu"
                src={SITE.mapsEmbed}
                className="h-full min-h-[420px] w-full border-0 opacity-90 grayscale-[0.3]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute left-4 top-4 flex flex-col gap-2.5">
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
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-coal/70 to-transparent" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
