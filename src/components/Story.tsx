import { Award, Flame, Timer, Utensils } from 'lucide-react';
import Reveal from './Reveal';

const STEPS = [
  { icon: Award, title: 'Usta Eli', text: 'Nesilden nesile aktarılan, ateşi ve eti tanıyan usta eller.' },
  { icon: Flame, title: 'Odun Ateşi', text: 'Meşe odununun koru; lezzete o kokuyu, ete o rengi verir.' },
  { icon: Timer, title: 'Sabır', text: 'Cağ döner acele etmez. Yatık şişte, kendi hızında pişer.' },
  { icon: Utensils, title: 'Sofranızda', text: 'Sıcak sıcak, tam zamanında. Afiyet olsun.' },
];

export default function Story() {
  return (
    <section id="hikaye" className="relative bg-coal2 py-24 lg:py-32">
      <div className="container-x">
        <div className="text-center">
          <Reveal>
            <span className="kicker kicker--center justify-center">Hikayemiz</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.4rem)] text-cream">
              Ateşten Sofraya <span className="flame-text italic">Dört Adım</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
              Bir dilim cağ dönerin sofraya ulaşana kadar geçtiği yol; ustalık, ateş ve sabrın buluşmasıdır.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-[46px] hidden h-0.5 rounded bg-flame-grad opacity-40 lg:block">
            <div className="absolute -top-[2px] left-0 h-[6px] w-[70px] animate-pulse rounded-full bg-flame-grad shadow-[0_0_18px_rgba(255,106,0,0.8)]" style={{ animation: 'flameline 4s ease-in-out infinite' }} />
          </div>

          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12} className="relative text-center">
              <div className="relative mx-auto mb-6 grid h-[88px] w-[88px] place-items-center rounded-full border border-flame2/35 bg-card shadow-[0_0_0_8px_rgba(255,106,0,0.06)]">
                <s.icon className="h-8 w-8 text-flame2" strokeWidth={1.7} />
                <span className="absolute -right-1.5 -top-1.5 grid h-8 w-8 place-items-center rounded-full bg-flame-grad text-[12px] font-extrabold text-[#0c0906] shadow-flame">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-display text-xl text-cream">{s.title}</h3>
              <p className="mx-auto mt-2.5 max-w-[240px] text-[13.5px] leading-relaxed text-muted">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes flameline {
          0% { left: 0; opacity: 0.5; }
          50% { opacity: 1; }
          100% { left: calc(100% - 70px); opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
