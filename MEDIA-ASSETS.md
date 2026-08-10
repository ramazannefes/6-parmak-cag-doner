# 6 Parmak Cağ Döner — Medya Envanteri ve Eksik Asset Listesi

> Güncelleme tarihi: 2026-08-10
>
> **ÖNEMLİ:** Instagram hesabı (`@6parmakcagdoner`) bu ortamdan teknik olarak
> erişilemedi (oturum duvarı, aynalar 403). Aşağıdaki görseller **6 Parmak'a ait
> DEĞİLDİR** — bunlar geçici **stock placeholder**'lardır (Pexels). Uydurma
> içerik kullanılmamıştır. Gerçek marka medyası gelince aşağıdaki dosyaların
> üzerine yazmanız yeterlidir; kod değişmez.

## 1. Mevcut Görsel Eşlemesi (placeholder)

| Site alanı | Dosya | Gerçek içerik olması gereken |
| --- | --- | --- |
| Galeri (1), OG/twitter image, Experience sağ görsel, Video poster | `public/images/food/cag-doner.jpg` | Gerçek cağ döner yakın plan |
| Experience sinematik bant, Galeri (2) | `public/images/food/cag-doner-slicing.jpg` | Ustanın eliyle döner dilimleme |
| Galeri (3), Instagram grid | `public/images/food/skewers.jpg` | Döner şişi / közde pişme |
| Galeri (4), Instagram grid | `public/images/food/service.jpg` | Servis tabağı |
| Galeri (5), Instagram grid | `public/images/food/warm-service.jpg` | Mekan / servis / müşteri deneyimi |
| Galeri (6), Instagram grid | `public/images/food/meze.jpg` | Meze / yan ürünler |

Kaynak eşlemesi `src/data/site.ts` → `GALLERY` ve `VIDEOS`, görsellerin tek
noktasından yönetilir.

## 2. EKSİK MEDYA — indirip `public/` altına bırakılmalı

Aşağıdaki dosyaların hiçbiri henüz mevcut değil. Dosyaları oluşturursanız site
otomatik olarak kullanmaya başlar (kod değişikliği gerekmez).

**MISSING (fotoğraf):**
- `public/images/food/cag-doner.jpg` → gerçek cağ döner görseli (mevcut stock yerine)
- `public/images/food/cag-doner-slicing.jpg` → dilimleme anı
- `public/images/food/skewers.jpg` → şiş/ateş/köz karesi
- `public/images/food/service.jpg` → servis tabağı
- `public/images/food/warm-service.jpg` → mekan / servis
- `public/images/food/meze.jpg` → meze/yan ürün
- (isteğe bağlı) `public/images/food/restaurant.jpg` → mekan içi
- (isteğe bağlı) `public/images/brand/logo.jpg` → logo/marka görseli

**MISSING (video):**
- `public/videos/hero-doner.mp4` → dönerin piştiği/kesildiği kısa Reels benzeri
  video (16:9 veya kare; WebM/MP4). `src/components/VideoSection.tsx` bu dosyayı
  algılar ve sinematik video bölümünü **otomatik** gösterir. Dosya yokken bölüm
  sayfada hiç görünmez, hata üretmez.

## 3. Önerilen gerçek içerik konuları (Instagram'dan)

- cağ döner / döner şişi yakın plan
- dönerin pişmesi (ateş, köz, kor)
- kesim / dilimleme anı
- servis, tabak sunumu
- mekan içi, masa, müşteri deneyimi
- marka/logo görseli

## 4. Not

- Görseller **stock/placeholder** olduğu sürece hiçbir yerde "6 Parmak'a aittir"
  iddiası yoktur; alt metinler görseldeki içeriği tanımlar.
- Gerçek marka görselleri geldiğinde bu dosya güncellenip "placeholder" ibaresi
  kaldırılmalıdır.
