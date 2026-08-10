export const SITE = {
  name: '6 Parmak Cağ Döner',
  shortName: '6 PARMAK',
  tagline: 'Odun Ateşinde Cağ Döner',
  address: 'Kuruçeşme, Sakarya Cd. No:11, 16050 Osmangazi/Bursa',
  addressShort: 'Kuruçeşme, Sakarya Cd. No:11 · Osmangazi/Bursa',
  phoneDisplay: '0501 107 62 16',
  phoneTel: '+905011076216',
  whatsapp: '905011076216',
  priceRange: '₺200–400 / kişi',
  openNote: 'Açık — Kapanış: 20:00',
  instagram: 'https://www.instagram.com/6parmakcagdoner/',
  mapsEmbed:
    'https://www.google.com/maps?q=Kuru%C3%A7e%C5%9Fme%2C%20Sakarya%20Cd.%20No%3A11%2C%20Osmangazi%2C%20Bursa&z=16&output=embed',
  mapsDirections:
    'https://www.google.com/maps/dir/?api=1&destination=Kuru%C3%A7e%C5%9Fme%2C+Sakarya+Cd.+No%3A11%2C+Osmangazi%2C+Bursa',
  mapsSearch:
    'https://www.google.com/maps/search/?api=1&query=Kuru%C3%A7e%C5%9Fme+Sakarya+Cd.+No%3A11+Osmangazi+Bursa',
} as const;

export const HOURS = [
  { day: 'Pazartesi', time: '11:00 – 20:00' },
  { day: 'Salı', time: '11:00 – 20:00' },
  { day: 'Çarşamba', time: '11:00 – 20:00' },
  { day: 'Perşembe', time: '11:00 – 20:00' },
  { day: 'Cuma', time: '11:00 – 20:00' },
  { day: 'Cumartesi', time: '11:00 – 20:00' },
  { day: 'Pazar', time: '12:00 – 19:00' },
] as const;

export type MenuItem = {
  name: string;
  price: string;
  desc: string;
  badge?: string;
};

export type MenuCategory = {
  id: string;
  label: string;
  items: MenuItem[];
};

export const MENU: MenuCategory[] = [
  {
    id: 'doner',
    label: 'Döner & Izgara',
    items: [
      { name: 'Cağ Döner', price: '₺320', desc: 'Odun ateşinde üç kez çevrilen, dinlendirilmiş kuzu eti. Yanında piyaz ve közlenmiş biber.', badge: 'Favori' },
      { name: 'Tavuk Döner Dürüm', price: '₺170', desc: 'Özel baharatlarla marine edilmiş tavuk, yufka ekmeğinde. Sumaklı soğan ve maydanozla.' },
      { name: 'Cağ Döner Dürüm', price: '₺240', desc: 'Yatık şişte pişen cağ dönerin yufka sarayı. Yanında ayran tavsiye ederiz.' },
      { name: 'Kokoreç Porsiyon', price: '₺190', desc: 'Kuzu bağırsağı odun ateşinde közlenir; acılı ya da sade, karar sizin.', badge: 'Yöresel' },
      { name: 'Tavuk Şiş', price: '₺190', desc: 'Marine edilmiş göğüs ve but karışımı, közlenmiş biber ve domatesle.' },
      { name: 'Pirzola Izgara', price: '₺380', desc: 'Kuzu pirzola, odun ateşinde nar gibi. Mevsim salata ile servis edilir.' },
      { name: 'Tavuk Kanat Izgara', price: '₺180', desc: 'Odun ateşinde közlenen, özel barbekü soslu tavuk kanat. Dilerseniz acılı.', badge: 'Yeni' },
    ],
  },
  {
    id: 'kebap',
    label: 'Kebap',
    items: [
      { name: 'Adana Kebap', price: '₺320', desc: 'El yapımı kıyma, közlenmiş biber ve domatesle. Lavaş eşliğinde.', badge: 'Özel' },
      { name: 'Kuzu Şiş', price: '₺360', desc: 'Yumuşacık kuzu eti, zeytinyağı ve kekikle dinlendirilmiş.' },
      { name: 'İskender', price: '₺310', desc: 'Döner, taze tereyağı, domates sosu ve yoğurt. Bursa’ya yakışan.' },
      { name: 'Urfa Kebap', price: '₺300', desc: 'Adana’nın acısız kardeşi; aynı ustalık, farklı damak.' },
      { name: 'Patlıcanlı Kebap', price: '₺310', desc: 'Közlenmiş patlıcan yatağında kuzu kuşbaşı, sarımsaklı yoğurtla.' },
      { name: 'Kuzu Tandır', price: '₺420', desc: 'Kuzu kol, güveçte uzun saatler dinlendirilmiş; yumuşacık ve tereyağlı.', badge: 'Yeni' },
    ],
  },
  {
    id: 'meze',
    label: 'Meze',
    items: [
      { name: 'Haydari', price: '₺90', desc: 'Süzme yoğurt, sarımsak ve dereotu. Dönerin yanında şart.' },
      { name: 'Patlıcan Ezme', price: '₺90', desc: 'Közlenmiş patlıcan, biber ve nar ekşisi.' },
      { name: 'Humus', price: '₺85', desc: 'Nohut, tahin ve zeytinyağının buluşması.' },
      { name: 'Atom', price: '₺95', desc: 'Biber, ceviz ve yoğurt. Cesur damaklara.', badge: 'Acılı' },
      { name: 'Mevsim Salata', price: '₺75', desc: 'Mevsimin en taze sebzeleri, nar ekşisi sosla.' },
    ],
  },
  {
    id: 'tatli',
    label: 'Tatlı & İçecek',
    items: [
      { name: 'Künefe', price: '₺180', desc: 'İnce kadayıf, hatay peyniri ve şerbet. Sıcacık servis.', badge: 'Tatlı' },
      { name: 'Fırın Sütlaç', price: '₺120', desc: 'Fırından yeni çıkmış, üzeri kızarmış ev sütlacı.' },
      { name: 'Ayran', price: '₺30', desc: 'Dönerin vazgeçilmezi, köpüklü ayran.' },
      { name: 'Şalgam Suyu', price: '₺35', desc: 'Acılı ya da sade. Kebaba eşlik eder.' },
      { name: 'Türk Kahvesi', price: '₺60', desc: 'Yemek sonrası, köpüklü ve koyu.' },
      { name: 'Çay', price: '₺25', desc: 'Sohbetin koyu, çayın demli olduğu yer.' },
    ],
  },
] as const;

export const GALLERY = [
  { src: '/images/food/cag-doner.jpg', real: '/images/instagram/gallery-01.jpg', alt: 'Odun ateşinde dönen cağ döner', caption: 'Odun ateşinde pişen lezzet' },
  { src: '/images/food/cag-doner-slicing.jpg', real: '/images/instagram/gallery-02.jpg', alt: 'Cağ döner ustanın eliyle dilimlenirken', caption: 'Ustanın elinden, tam zamanında' },
  { src: '/images/food/skewers.jpg', real: '/images/instagram/gallery-03.jpg', alt: 'Köz üzerinde ızgara şişler', caption: 'Köz üzerinde ızgara' },
  { src: '/images/food/service.jpg', real: '/images/instagram/gallery-04.jpg', alt: 'Servise hazır ızgara tabağı', caption: 'Sofranız için atölyede hazırlık' },
  { src: '/images/food/warm-service.jpg', real: '/images/instagram/gallery-05.jpg', alt: 'Sıcak servis edilen lezzetler', caption: 'Sıcak servis, güler yüz' },
  { src: '/images/food/meze.jpg', real: '/images/instagram/gallery-06.jpg', alt: 'Taze hazırlanmış mezeler', caption: 'Mezeler hazır, tabaklar bekliyor' },
] as const;

// Gerçek 6 Parmak medyası yokken bile site çalışır:
// `real` yuvalarına gerçek dosya bırakılırsa site otomatik olarak
// placeholder'lar yerine gerçek medyayı gösterir (kod değişikliği gerekmez).
export const MEDIA_SLOTS = {
  hero: '/images/instagram/hero.jpg',
  menu: {
    doner: '/images/instagram/menu-doner.jpg',
    kebap: '/images/instagram/menu-kebap.jpg',
    meze: '/images/instagram/menu-meze.jpg',
    tatli: '/images/instagram/menu-tatli.jpg',
  } as Record<string, string>,
  video: ['/videos/instagram/hero-reel.mp4', '/videos/instagram/cooking.mp4', '/videos/hero-doner.mp4'],
} as const;

// Gerçek marka videosu yoksa VideoSection otomatik olarak görünmez.
// public/videos/ altına gerçek video bırakın — bölüm otomatik aktifleşir.
export const VIDEOS = [
  { src: '/videos/hero-doner.mp4', poster: '/images/food/cag-doner.jpg', title: 'Ateşin Başından' },
] as const;

export const NAV_LINKS = [
  { href: '#anasayfa', label: 'Ana Sayfa' },
  { href: '#hikaye', label: 'Hikayemiz' },
  { href: '#deneyim', label: 'Deneyim' },
  { href: '#menu', label: 'Menü' },
  { href: '#galeri', label: 'Galeri' },
  { href: '#iletisim', label: 'İletişim' },
] as const;
