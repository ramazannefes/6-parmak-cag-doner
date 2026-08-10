import { Flame } from 'lucide-react';

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-flame-grad text-[#0c0906] shadow-[0_6px_18px_-10px_rgba(255,106,0,.4)]">
        <Flame className="h-5 w-5" strokeWidth={2.4} />
      </span>
      {!compact && (
        <span className="leading-none">
          <strong className="block text-[17px] font-extrabold tracking-[0.06em] text-cream">6 PARMAK</strong>
          <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.3em] text-flame2">Cağ Döner</span>
        </span>
      )}
    </span>
  );
}
