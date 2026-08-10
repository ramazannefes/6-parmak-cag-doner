# 6 Parmak Cağ Döner — Medya Envanteri ve Eksik Asset Listesi

> Güncelleme: 2026-08-10 (revizyon)
>
> **MEDYA KAYNAK POLİTİKASI (kritik):**
> - **TASARIM REFERANSI:** `https://www.instagram.com/p/DaINkBBNC4y/` →
>   **sadece tasarım/anlayış referansı.** Bu kaynaktan **hiçbir fotoğraf/video
>   medya olarak kullanılmadı** (denetim: projede 0 iz, orijinal HTML dahil).
> - **GERÇEK MEDYA:** `https://www.instagram.com/6parmakcagdoner/` →
>   fotoğraf/video yalnızca bu hesaptan alınır. Şu an bu ortamdan **indirilemedi**
>   (denetim: 0 gerçek fotoğraf, 0 gerçek video).
> - `public/images/food/*` görselleri **stock placeholder (Pexels)** — 6 Parmak'a
>   ait **değildir**, hiçbir yerde marka medyası olarak sunulmaz; yalnızca
>   gerçek medya gelene kadar fallback'tir.

## Tak-çalıştır mantığı

Site artık **gerçek dosya öncelikli** çalışır: `real` yuvasındaki dosya mevcutsa
placeholder yerine onu gösterir (kod değişikliği gerekmez, `src/lib/media.ts` HEAD
kontrolü yapar). Aşağıdaki dosyaları belirtilen klasörlere bırakmanız yeterli.

## 1. EKSİK MEDYA — bırakılacak dosyalar

### Fotoğraflar (`public/images/instagram/`)

| Dosya | Kullanıldığı yer |
| --- | --- |
| `hero.jpg` | Hero: gerçek ürün görseli (yoksa procedural döner gösterilir) |
| `gallery-01.jpg` … `gallery-06.jpg` | Galeri + Instagram bölümü (6 kare) |
| `menu-doner.jpg` | Menü — Döner & Izgara kategorisi fotoğrafı |
| `menu-kebap.jpg` | Menü — Kebap kategorisi fotoğrafı |
| `menu-meze.jpg` | Menü — Meze kategorisi fotoğrafı |
| `menu-tatli.jpg` | Menü — Tatlı & İçecek kategorisi fotoğrafı |

### Videolar (`public/videos/instagram/` veya `public/videos/`)

| Dosya | Kullanıldığı yer |
| --- | --- |
| `hero-reel.mp4` | Video bölümü (öncelikli) |
| `cooking.mp4` | Video bölümü (yedek) |
| `hero-doner.mp4` | Video bölümü (yedek, kök videos klasöründe) |

Video bölümü (`src/components/VideoSection.tsx`) bu üç dosyadan ilk bulduğunu oynatır.
Hiçbiri yoksa bölüm sayfada **görünmez** ve hata üretmez.

## 2. Mevcut placeholder eşlemesi (şu an görünen)

| Site alanı | Dosya | Gerçek içerikle değiştirilecek |
| --- | --- | --- |
| Galeri/IG/Video poster (1) | `public/images/food/cag-doner.jpg` | `instagram/gallery-01.jpg` |
| Galeri/IG (2) | `public/images/food/cag-doner-slicing.jpg` | `instagram/gallery-02.jpg` |
| Galeri/IG (3) | `public/images/food/skewers.jpg` | `instagram/gallery-03.jpg` |
| Galeri/IG (4) | `public/images/food/service.jpg` | `instagram/gallery-04.jpg` |
| Galeri/IG (5) | `public/images/food/warm-service.jpg` | `instagram/gallery-05.jpg` |
| Galeri/IG (6) | `public/images/food/meze.jpg` | `instagram/gallery-06.jpg` |
| Menü (kategori fotoğrafları) | `public/images/food/*` | `instagram/menu-*.jpg` |
| Experience band + OG/twitter | `public/images/food/cag-doner-slicing.jpg`, `cag-doner.jpg` | gerçek dilimleme/döner karesi |

## 3. Kaynaklar

- `public/images/food/*` → **stock placeholder (Pexels) — 6 Parmak'a ait değil**
- `public/images/instagram/*` → boş (gerçek marka görseli bekliyor)
- `public/videos/instagram/*`, `public/videos/hero-doner.mp4` → boş (gerçek video bekliyor)

## 4. Not

- Hiçbir yerde placeholder görsel "6 Parmak'a aittir" diye sunulmuyor; alt metinler
  görseldeki içeriği tanımlar.
- Gerçek medya eklendiğinde bu dosya güncellenip placeholder ibareleri kaldırılmalıdır.
