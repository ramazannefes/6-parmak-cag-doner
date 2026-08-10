import { useEffect, useState } from 'react';
import { MEDIA_SLOTS, VIDEOS } from '../data/site';
import Reveal from './Reveal';

const CANDIDATES = MEDIA_SLOTS.video;

function useFirstAvailable(candidates: readonly string[]): string {
  const [src, setSrc] = useState('');
  const key = candidates.join('|');
  useEffect(() => {
    let live = true;
    const check = async () => {
      for (const c of candidates) {
        try {
          const r = await fetch(c, { method: 'HEAD' });
          const ct = r.headers.get('content-type') || '';
          if (live && r.ok && (ct.startsWith('video/') || ct.startsWith('application/octet-stream'))) {
            setSrc(c);
            return;
          }
        } catch {
          /* devam */
        }
      }
    };
    check();
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return src;
}

export default function VideoSection() {
  const video = VIDEOS[0];
  const src = useFirstAvailable(CANDIDATES);

  if (!src) return null;

  return (
    <section className="bg-coal py-28 lg:py-40" aria-label="Video">
      <div className="container-x">
        <div className="text-center">
          <Reveal>
            <span className="kicker kicker--center justify-center">Video</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3rem)] text-cream">
              Ateşin <span className="italic text-[#e8b45a]">Başından</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.9] text-muted">
              Korum, şiş ve ustanın eli. Sesi açıp bu ritme eşlik edin.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-2xl border border-white/10 shadow-card">
            <video
              src={src}
              poster={video.poster}
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              className="aspect-video h-auto w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
