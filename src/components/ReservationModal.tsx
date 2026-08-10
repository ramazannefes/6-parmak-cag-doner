import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Check, Clock, Send, Users, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SITE } from '../data/site';

type Props = { open: boolean; onClose: () => void };

const inputCls =
  'w-full rounded-xl border border-white/10 bg-card px-4 py-3 text-[14.5px] text-cream outline-none transition-all duration-200 placeholder:text-muted/70 focus:border-flame focus:shadow-[0_0_0_3px_rgba(255,106,0,0.15)]';

export default function ReservationModal({ open, onClose }: Props) {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: '', tel: '', people: '2 Kişi', date: '', time: '', note: '' });

  useEffect(() => {
    if (!open) return;
    document.body.classList.add('no-scroll');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const today = new Date();
    const iso = today.toISOString().split('T')[0];
    setForm((f) => ({ ...f, date: f.date || iso }));
    return () => {
      document.body.classList.remove('no-scroll');
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      `Merhaba, 6 Parmak Cağ Döner'den rezervasyon yapmak istiyorum.%0A` +
      `Ad: ${encodeURIComponent(form.name)}%0A` +
      `Telefon: ${encodeURIComponent(form.tel)}%0A` +
      `Tarih: ${form.date} ${form.time}%0A` +
      `Kişi: ${encodeURIComponent(form.people)}` +
      (form.note ? `%0ANot: ${encodeURIComponent(form.note)}` : '');
    window.open(`https://wa.me/${SITE.whatsapp}?text=${msg}`, '_blank', 'noopener');
    setDone(true);
  };

  const resetAndClose = () => {
    setDone(false);
    setForm({ name: '', tel: '', people: '2 Kişi', date: '', time: '', note: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1800] flex items-center justify-center overflow-y-auto p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={resetAndClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="reserve-title"
        >
          <div className="absolute inset-0 bg-coal/85 backdrop-blur-lg" />
          <motion.div
            className="relative z-10 my-auto w-full max-w-[560px] rounded-3xl border border-white/10 bg-coal2 p-7 shadow-card sm:p-9"
            initial={{ opacity: 0, y: 34, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.2, 0.65, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={resetAndClose}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream2 transition-colors hover:border-flame hover:text-flame2"
              aria-label="Kapat"
            >
              <X className="h-5 w-5" />
            </button>

            {!done ? (
              <>
                <span className="kicker">Rezervasyon</span>
                <h2 id="reserve-title" className="mt-3 font-display text-[30px] text-cream">
                  Masanız <span className="flame-text italic">Hazır</span>
                </h2>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                  Formu doldurun, rezervasyonunuzu WhatsApp üzerinden anında onaylayalım.
                </p>

                <form onSubmit={submit} className="mt-7">
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-muted" htmlFor="r-name">
                    Ad Soyad *
                  </label>
                  <input
                    id="r-name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Adınız Soyadınız"
                    className={inputCls}
                  />

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-muted" htmlFor="r-tel">
                        Telefon *
                      </label>
                      <input
                        id="r-tel"
                        required
                        type="tel"
                        value={form.tel}
                        onChange={(e) => setForm({ ...form, tel: e.target.value })}
                        placeholder="05xx xxx xx xx"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-muted" htmlFor="r-people">
                        Kişi Sayısı
                      </label>
                      <div className="relative">
                        <select
                          id="r-people"
                          value={form.people}
                          onChange={(e) => setForm({ ...form, people: e.target.value })}
                          className={`${inputCls} appearance-none pr-10`}
                        >
                          {['1 Kişi', '2 Kişi', '3 Kişi', '4 Kişi', '5 Kişi', '6+ Kişi'].map((p) => (
                            <option key={p}>{p}</option>
                          ))}
                        </select>
                        <Users className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-muted" htmlFor="r-date">
                        Tarih *
                      </label>
                      <div className="relative">
                        <input
                          id="r-date"
                          required
                          type="date"
                          value={form.date}
                          onChange={(e) => setForm({ ...form, date: e.target.value })}
                          className={`${inputCls} pr-10`}
                        />
                        <Calendar className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-muted" htmlFor="r-time">
                        Saat *
                      </label>
                      <div className="relative">
                        <input
                          id="r-time"
                          required
                          type="time"
                          value={form.time}
                          onChange={(e) => setForm({ ...form, time: e.target.value })}
                          className={`${inputCls} pr-10`}
                        />
                        <Clock className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                      </div>
                    </div>
                  </div>

                  <label className="mb-1.5 mt-4 block text-[11px] font-semibold uppercase tracking-[0.1em] text-muted" htmlFor="r-note">
                    Not (İsteğe bağlı)
                  </label>
                  <textarea
                    id="r-note"
                    rows={2}
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    placeholder="Özel istekleriniz…"
                    className={`${inputCls} resize-none`}
                  />

                  <button type="submit" className="btn btn--fire mt-6 w-full py-4">
                    <Send className="h-4 w-4" />
                    Rezervasyonu Gönder
                  </button>
                  <p className="mt-3.5 text-center text-[12px] leading-relaxed text-muted">
                    Gönderime tıkladığınızda WhatsApp açılır. Mesajı göndermeniz yeterli. Açılmazsa{' '}
                    <a href={`tel:${SITE.phoneTel}`} className="text-flame2">
                      {SITE.phoneDisplay}
                    </a>
                    ’yı arayın.
                  </p>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center"
              >
                <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-flame-grad shadow-flame-lg">
                  <Check className="h-9 w-9 text-[#0c0906]" strokeWidth={3} />
                </span>
                <h2 className="mt-6 font-display text-[28px] text-cream">Teşekkürler!</h2>
                <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-muted">
                  Rezervasyon isteğiniz WhatsApp’ta sizi bekliyor. Mesajı göndermeniz yeterli,
                  en kısa sürede dönüş yapacağız.
                </p>
                <button onClick={resetAndClose} className="btn btn--fire mt-8 px-8 py-3.5">
                  Kapat
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
