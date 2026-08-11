# 6 Parmak Cağ Döner — Agent Guide

Sıcak, sinematik bir cağ döner restoranı sitesi. Koyu/ateş temalı, Türkçe.

## Ortam

- **Çalışma klasörü (repo kökü):** `6parmak-cag-doner/`
- **Stack:** Vite 5 · React 18 (TS) · Tailwind 3 · framer-motion · lucide-react
- **Repo:** `ramazannefes/6-parmak-cag-doner` · branch `main` · push ile Vercel redeploy olur

## Komutlar

```bash
npm run dev        # dev server
npm run typecheck  # tsc --noEmit (değişiklik sonrası her zaman çalıştır)
npm run build      # node node_modules/vite/bin/vite.js build
```

## Mimari

- `src/data/site.ts` — site/menü verisi (TR, `siteklonlama` kaynaklı)
- `src/components/` — `Hero`, `Story`, `Experience`, `MenuSection`, `Gallery`, `VideoSection`, `InstagramSection`, `Location`, `Footer`, `Navbar`, `Loader`, `Logo`, `Reveal`, `ReservationModal`, `Embers`, `Rotisserie`
- `src/context/` — `ModalContext` (`useModal().openReserve()`)
- `src/hooks/` — `useOpenStatus`
- `src/lib/media.ts` — `SmartImg` (Unsplash fallback zinciri)
- `App.tsx` — section sırası: Hero → Story → Experience → MenuSection → Gallery → VideoSection → InstagramSection → Location → Footer
- `MEDIA-ASSETS.md` — marka görsel/video varlık rehberi

## Tasarım dili

- Koyu kömür zemin + krem yazı + ateş turuncusu vurgular; sinematik, alev/kor temalı
- Renk token'ları: `coal #0c0906` · `coal2 #120c07` · `coal3 #1a120a` · `card #17100a` · `cream #f3e8d8` · `cream2 #cfbfa6` · `muted #a08d78` · `flame #ff6a00` · `flame2 #ffb400` · `ember #e0431e` · `gold #d9a441`
- Tipografi: başlıklar `font-display` (Playfair Display), gövde Onest; alev gradyanları `flame-grad`, `flame-grad-soft`, `flame-text`
- Shadow: `shadow-flame`, `shadow-flame-lg`, `shadow-card`; buton/CTA `btn` sınıfları ve `Embers`/ateş animasyonları (flicker, pulseGlow)

## Dikkat edilecekler

- Tema **koyu + ateş**; aydınlık/deniz teması kullanma (Giritli sitesinin kimliğidir).
- Metinler Türkçe; 6 Parmak'ın iki şubesi var (güncel: Güzel Yalı branch seçici + branch kartları — `Hero`/`Navbar`).
- Hero ana görsel olarak gerçek cağ döner videosu kullanır; görsel/video varlıkları için `MEDIA-ASSETS.md`'ye bak.
- Commit stili: kısa İngilizce, `feat:`/`fix:` prefix (örn. `Redesign menu section with photo grid and lightbox`).
- `dev.log` yerel log'dur — commit'lemeye gerek yok.
