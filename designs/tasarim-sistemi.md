# UI/UX Tasarım Sistemi

Bu doküman, üç farklı UI/UX tasarımında kullanılacak ortak tasarım sistemini tanımlar.

## Renk Paleti

### Ana Renkler
| Renk | Hex Kodu | Kullanım Alanları |
|------|----------|-------------------|
| Koyu Mavi | #4A90E2 | Ana eylem butonları, başlıklar, önemli bilgiler |
| Turkuaz | #50E3C2 | Vurgular, ilerleyiş göstergeleri, başarılı durum bildirimleri |
| Turuncu | #F5A623 | Çağrı-Eylem (CTA) butonları, önemli bildirimler |

### Nötral Renkler
| Renk | Hex Kodu | Kullanım Alanları |
|------|----------|-------------------|
| Beyaz | #FFFFFF | Arka planlar, kartlar |
| Açık Gri | #F5F5F5 | Alternatif arka planlar |
| Gri | #E0E0E0 | Kenar çizgileri, ayırıcılar |
| Koyu Gri | #9B9B9B | İkincil metin |
| Antrasit | #4A4A4A | Ana metin rengi |

### Durum Renkleri
| Renk | Hex Kodu | Kullanım Alanları |
|------|----------|-------------------|
| Başarılı | #27AE60 | Başarılı işlem bildirimleri |
| Hata | #EB5757 | Hata mesajları, uyarılar |
| Bilgi | #2D9CDB | Bilgi mesajları |
| Uyarı | #F2C94C | Dikkat çekmesi gereken uyarılar |

## Tipografi

### Font Aileleri
- **Ana Font:** 'Inter', sans-serif
- **Başlık Font:** 'Manrope', sans-serif

### Font Boyutları ve Ağırlıkları
| Eleman | Boyut | Satır Yüksekliği | Ağırlık | Kullanım |
|--------|-------|-------------------|---------|----------|
| H1 | 32px | 40px | 700 | Ana sayfa başlıkları |
| H2 | 24px | 32px | 600 | Bölüm başlıkları |
| H3 | 20px | 28px | 600 | Alt bölüm başlıkları |
| H4 | 18px | 24px | 600 | Kart başlıkları |
| Body | 16px | 24px | 400 | Normal metin içeriği |
| Small | 14px | 20px | 400 | İkincil bilgiler, dipnotlar |
| Caption | 12px | 16px | 400 | Etiketler, formlar |

## Aralıklar ve Izgara Sistemi

### Boşluk Ölçüleri
- 4px - Çok küçük boşluklar
- 8px - Standart boşluklar
- 16px - Orta boşluklar
- 24px - Geniş boşluklar
- 32px - Ekstra geniş boşluklar
- 48px - Bölüm arası boşluklar
- 64px - Sayfa bölümleri arası boşluklar

### Izgara Sistemi
- 12 sütunlu esnek ızgara sistemi
- 24px kenar boşluğu
- 16px sütun arası boşluk
- Mobil cihazlar için 4 sütunlu sistem

## UI Bileşenleri

### Butonlar
| Tür | Yükseklik | İç Boşluk | Köşe Yuvarlaklığı | Kullanım |
|-----|-----------|-----------|-------------------|----------|
| Primary | 48px | 24px | 8px | Ana eylemler |
| Secondary | 48px | 24px | 8px | İkincil eylemler |
| Text | 48px | 16px | 8px | Önemsiz eylemler |
| Icon | 48px | 12px | 24px | İkon butonları |

### Form Elemanları
| Eleman | Yükseklik | İç Boşluk | Köşe Yuvarlaklığı |
|--------|-----------|-----------|-------------------|
| Input | 48px | 16px | 8px |
| Select | 48px | 16px | 8px |
| Checkbox | 24px | - | 4px |
| Radio | 24px | - | 12px |
| Toggle | 24px | - | 12px |

### Kartlar
| Tür | İç Boşluk | Köşe Yuvarlaklığı | Gölge |
|-----|-----------|-------------------|-------|
| Standard | 24px | 16px | 0 4px 12px rgba(0,0,0,0.08) |
| Elevated | 24px | 16px | 0 8px 24px rgba(0,0,0,0.12) |

## İkonlar

- Çizgi tarzı minimal ikonlar
- 24px x 24px temel boyut
- 2px çizgi kalınlığı
- 32px x 32px dokunma alanı

## Animasyon ve Geçişler

| Eleman | Süre | Easing |
|--------|------|--------|
| Buton Hover | 200ms | ease-in-out |
| Sayfa Geçişleri | 300ms | ease-in-out |
| İçerik Yüklemeleri | 400ms | ease-out |
| Modaller | 250ms | ease |

## Erişilebilirlik

- Minimum AA seviyesi WCAG 2.1 uyumluluğu
- Kontrast oranı metin için minimum 4.5:1
- Klavye erişilebilirliği
- Ekran okuyucu uyumluluğu
- Odak göstergeleri 