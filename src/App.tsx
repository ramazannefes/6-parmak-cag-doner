import { AnimatePresence, motion, useReducedMotion, useScroll } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Hero from './components/Hero';
import InstagramSection from './components/InstagramSection';
import Loader from './components/Loader';
import Location from './components/Location';
import MenuSection from './components/MenuSection';
import Navbar from './components/Navbar';
import ReservationModal from './components/ReservationModal';
import Story from './components/Story';
import { ModalContext } from './context/ModalContext';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[1700] h-[3px] origin-left bg-flame-grad shadow-[0_0_12px_rgba(255,106,0,0.8)]"
      aria-hidden="true"
    />
  );
}

function CursorGlow() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer:fine)').matches) return;
    const el = ref.current;
    if (!el) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.style.opacity = '1';
    };
    const onLeave = () => {
      el.style.opacity = '0';
    };
    const loop = () => {
      x += (tx - x) * 0.09;
      y += (ty - y) * 0.09;
      el.style.transform = `translate(${x - 260}px, ${y - 260}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [reduce]);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[520px] w-[520px] rounded-full opacity-0 mix-blend-screen"
      style={{
        background: 'radial-gradient(circle, rgba(255,106,0,0.16) 0%, rgba(255,106,0,0.05) 40%, transparent 70%)',
        transition: 'opacity 0.4s ease',
      }}
      aria-hidden="true"
    />
  );
}

export default function App() {
  const reduce = useReducedMotion();
  const [loading, setLoading] = useState(true);
  const [reserveOpen, setReserveOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), reduce ? 120 : 2150);
    return () => clearTimeout(t);
  }, [reduce]);

  const openReserve = useCallback(() => setReserveOpen(true), []);
  const closeReserve = useCallback(() => setReserveOpen(false), []);

  return (
    <ModalContext.Provider value={{ openReserve }}>
      <div className="grain relative">
        <CursorGlow />
        <ScrollProgress />
        <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
        <Navbar />
        <main>
          <Hero started={!loading} />
          <Story />
          <Experience />
          <MenuSection />
          <Gallery />
          <InstagramSection />
          <Location />
        </main>
        <Footer />
        <ReservationModal open={reserveOpen} onClose={closeReserve} />
      </div>
    </ModalContext.Provider>
  );
}
