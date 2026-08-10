import { AnimatePresence, motion } from 'framer-motion';
import { Clock, MapPin, Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useModal } from '../context/ModalContext';
import { NAV_LINKS, SITE } from '../data/site';
import { useIstanbulClock, useOpenStatus } from '../hooks/useOpenStatus';
import Logo from './Logo';

export default function Navbar() {
  const { openReserve } = useModal();
  const { open, today } = useOpenStatus();
  const clock = useIstanbulClock();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 30);
        setHidden(y > 260 && y > lastY + 6 && y < document.documentElement.scrollHeight - window.innerHeight - 260);
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const el = document.querySelector(href);
    if (el) {
      e.preventDefault();
      setMenuOpen(false);
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[100]">
        {/* topbar */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-gradient-to-r from-[#1a0e04] to-[#221005] px-4 py-2 text-[12.5px] text-cream2 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex items-center gap-2">
              <span
                className={`h-2 w-2 flex-none rounded-full ${open ? 'bg-[#7ed957] shadow-[0_0_8px_#7ed957]' : 'bg-[#ff5252] shadow-[0_0_8px_#ff5252]'} animate-pulse`}
              />
              {open ? 'Şu anda açığız' : 'Şu anda kapalıyız'}
            </span>
            <span className="hidden items-center gap-1.5 font-medium text-flame2 tabular-nums md:flex">
              <Clock className="h-3.5 w-3.5" />
              {clock}
            </span>
          </div>
          <div className="flex min-w-0 items-center gap-4">
            <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-1.5 font-semibold text-cream transition-colors hover:text-flame2">
              <Phone className="h-3.5 w-3.5 text-flame2" />
              {SITE.phoneDisplay}
            </a>
            <span className="hidden items-center gap-1.5 lg:flex">
              <MapPin className="h-3.5 w-3.5 text-flame2" />
              {SITE.addressShort}
            </span>
          </div>
        </div>

        {/* nav */}
        <header
          className={`transition-all duration-300 ${scrolled ? 'glass border-b border-white/10 py-2.5' : 'bg-transparent py-4'} ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
        >
          <nav className="container-x flex items-center justify-between gap-6" aria-label="Ana menü">
            <a
              href="#anasayfa"
              onClick={(e) => go(e, '#anasayfa')}
              className="relative z-[102] shrink-0"
              aria-label="6 Parmak Cağ Döner — ana sayfa"
            >
              <Logo />
            </a>

            <ul className="hidden items-center gap-7 lg:flex">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => go(e, l.href)}
                    className="group relative py-2 text-sm font-medium text-cream2 transition-colors hover:text-cream"
                  >
                    {l.label}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-flame-grad transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <button onClick={openReserve} className="btn btn--fire hidden px-6 py-2.5 text-[13px] sm:inline-flex">
                Rezervasyon
              </button>
              <button
                onClick={() => setMenuOpen(true)}
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-cream transition-colors hover:border-flame hover:text-flame2 lg:hidden"
                aria-label="Menüyü aç"
                aria-expanded={menuOpen}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-coal/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-xl border border-white/15 text-cream transition-colors hover:border-flame hover:text-flame2"
              aria-label="Menüyü kapat"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,106,0,0.08),transparent_62%)]" />
            <nav className="relative flex flex-col items-center gap-1" aria-label="Mobil menü">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  className="px-6 py-2.5 font-display text-3xl font-semibold text-cream transition-colors hover:text-flame2"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.2, 0.65, 0.3, 1] }}
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.button
                onClick={() => {
                  setMenuOpen(false);
                  openReserve();
                }}
                className="btn btn--fire mt-6 px-8 py-3.5"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + NAV_LINKS.length * 0.06, duration: 0.5 }}
              >
                Rezervasyon Yap
              </motion.button>
              <motion.p
                className="mt-6 text-sm text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <a href={`tel:${SITE.phoneTel}`} className="text-flame2">
                  {SITE.phoneDisplay}
                </a>{' '}
                · {SITE.addressShort}
              </motion.p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
