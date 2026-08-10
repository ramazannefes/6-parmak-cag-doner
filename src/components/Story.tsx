import { Award, Flame, Timer, Utensils } from 'lucide-react';
import Reveal from './Reveal';

const STEPS = [
  { icon: Award, title: 'Usta Eli', text: 'Ateşi ve eti tanıyan usta eller; her dilimde iz bırakır.' },
  { icon: Flame, title: 'Odun Ateşi', text: 'Meşe odununun koru; lezzete o kokuyu, ete o rengi verir.' },
  { icon: Timer, title: 'Sabır', text: 'Cağ döner acele etmez. Yatık şişte, kendi hızında pişer.' },
  { icon: Utensils, title: 'Sofranızda', text: 'Sıcak sıcak, tam zamanında. Afiyet olsun.' },
];

export default function Story() {
  return (
    <section id="hikaye" className="bg-coal2 py-28 lg:py-40">
      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.6fr] lg:gap-24">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <Reveal>
              <span className="kicker">Hikayemiz</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-tight text-cream">
                Ateşten Sofraya
                <br />
                <span className="italic text-[#e8b45a]">Dört Adım</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-sm text-[15px] leading-[1.9] text-muted">
                Bir dilim cağ dönerin sofraya ulaşana kadar geçtiği yol; ustalık, ateş ve sabrın buluşmasıdır.
              </p>
            </Reveal>
          </div>

          <ol className="divide-y divide-white/10">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 0.08}>
                  <div className="group flex flex-col gap-5 py-10 first:pt-0 sm:flex-row sm:items-start sm:gap-9">
                    <span className="font-display text-sm italic text-muted">0{i + 1}</span>
                    <span className="grid h-12 w-12 flex-none place-items-center rounded-full border border-white/15 text-[#e8b45a]">
                      <s.icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl text-cream transition-colors duration-300 group-hover:text-[#e8b45a]">
                        {s.title}
                      </h3>
                      <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-muted">{s.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
