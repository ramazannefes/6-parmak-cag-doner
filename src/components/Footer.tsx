import { ArrowUp, Instagram, MapPin, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NAV_LINKS, SITE } from '../data/site';
import { useModal } from '../context/ModalContext';
import Logo from './Logo';

export default function Footer() {
  const { openReserve } = useModal();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const el = document.querySelector(href);
    if (el) {
      e.preventDefault();
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-white/10 bg-coal2 pb-10 pt-20">
      <div className="container-x">
        <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.1fr_1fr]">
          <div>
            <a href="#anasayfa" onClick={(e) => go(e, '#anasayfa')} aria-label="6 Parmak Cağ Döner — ana sayfa">
              <Logo />
            </a>
            <p className="mt-6 max-w-xs text-[14px] leading-relaxed text-muted">
              Odun ateşinde pişen gerçek cağ döner. Bursa Osmangazi’de her dilimde ustanın eli.
            </p>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 rounded-xl border border-white/10 px-4 py-2.5 text-[13.5px] font-medium text-cream2 transition-all duration-300 hover:-translate-y-0.5 hover:border-flame/60 hover:text-flame2"
              aria-label="Instagram'da takip et"
            >
              <Instagram className="h-5 w-5" />
              @6parmakcagdoner
            </a>
          </div>

          <nav aria-label="Hızlı linkler">
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-cream">Hızlı Linkler</p>
            <ul className="mt-5 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => go(e, l.href)}
                    className="text-[14px] text-muted transition-all duration-200 hover:pl-1.5 hover:text-flame2"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <button onClick={openReserve} className="text-[14px] text-muted transition-all duration-200 hover:pl-1.5 hover:text-flame2">
                  Rezervasyon
                </button>
              </li>
            </ul>
          </nav>

          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-cream">İletişim</p>
            <ul className="mt-5 space-y-3.5 text-[14px]">
              <li className="flex items-start gap-2.5 text-muted">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-flame2" />
                {SITE.address}
              </li>
              <li>
                <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-2.5 text-muted transition-colors hover:text-flame2">
                  <Phone className="h-4 w-4 flex-none text-flame2" />
                  {SITE.phoneDisplay}
                </a>
              </li>
            </ul>
            <button onClick={openReserve} className="btn btn--fire mt-6 px-6 py-3 text-[12.5px]">
              Rezervasyon Yap
            </button>
          </div>

          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-cream">Çalışma Saatleri</p>
            <div className="mt-5 space-y-2 text-[13.5px]">
              <p className="flex items-center justify-between text-muted">
                <span>Pzt – Cmt</span>
                <b className="font-semibold text-cream2">11:00 – 20:00</b>
              </p>
              <p className="flex items-center justify-between text-muted">
                <span>Pazar</span>
                <b className="font-semibold text-cream2">12:00 – 19:00</b>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-[12.5px] text-muted sm:flex-row">
          <p>© 2026 6 Parmak Cağ Döner — Tüm hakları saklıdır.</p>
          <p>Bursa’nın ustalık lezzeti</p>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-[90] grid h-12 w-12 place-items-center rounded-full bg-flame-grad text-[#0c0906] shadow-flame-lg transition-all duration-300 hover:-translate-y-1 ${
          showTop ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-label="Yukarı çık"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}
