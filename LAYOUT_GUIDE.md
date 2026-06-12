# Layout ve Yerleşim Kılavuzu

Uygulamanın iskelet yapısını, katman yönetimini (z-index) ve responsive davranışlarını tanımlar.

## 1. Ana İskelet (Main Layout)

Uygulama **"Sidebar + Header + Content"** yapısını kullanır.

```
[ SIDEBAR (Fixed 256px) ]  [ HEADER (Sticky 64px)      ]
[                       ]  [                           ]
[                       ]  [ MAIN CONTENT (Scrollable) ]
[                       ]  [                           ]
```

**CSS Grid/Flex Yapısı:**
```tsx
<div className="flex min-h-screen bg-slate-50">
  {/* Sidebar */}
  <aside className="w-64 fixed inset-y-0 z-40">...</aside>

  {/* Main Wrapper */}
  <div className="flex-1 ml-64 flex flex-col">
     <header className="h-16 sticky top-0 z-30">...</header>
     <main className="flex-1 p-8">...</main>
  </div>
</div>
```

## 2. Z-Index Katman Yönetimi (Layering)

Elementlerin üst üste binme sırası çok önemlidir.

- **Base Content:** `z-0`
- **Sticky Header:** `z-20` (İçerik kayarken üstte kalması için)
- **Dropdown Menüler:** `z-50` (Header veya içerik üstünde açılması için)
- **Backdrop (Karartma):** `z-[90]` (Modalların arkası)
- **Modal / Drawer:** `z-[100]` (En üst katman)
- **Toast / Notifications:** `z-[110]` (Her şeyin üstünde)

## 3. Responsive Breakpoints

Tasarım **"Mobile First"** değil, **"Desktop First"** yaklaşımıyla optimize edilmiştir ancak mobilde de çalışır.

- **Mobile (< 768px):**
  - Sidebar gizlenir (`-translate-x-full`).
  - Header'da "Hamburger Menu" butonu açılır.
  - Grid yapıları tek kolona düşer (`grid-cols-1`).
  - Font boyutları küçülür (`text-xs`).

- **Tablet (768px - 1024px):**
  - İstatistik kartları 2 kolona düşer (`grid-cols-2`).
  - Sidebar ikon moduna geçebilir (Opsiyonel).

- **Desktop (> 1024px):**
  - Tam görünüm.
  - Kartlar 4 kolona çıkar (`grid-cols-4`).
  - Drawer ve Modallar geniş açılır.

## 4. Modal ve Overlay Yapıları

### Merkez Modal (Center Modal)
Küçük işlemler (Örn: Randevu ekle, Not al) için kullanılır.
- **Konum:** Ekranın tam ortası.
- **Genişlik:** `max-w-lg` veya `max-w-2xl`.
- **Animasyon:** `zoom-in-95` (Hafif büyüyerek açılma).

### Yan Panel (Drawer / Slide-over)
Detaylı işlemler (Örn: Hasta Profili, Satış Detayı) için kullanılır.
- **Konum:** Ekranın en sağı, tam yükseklik (`h-full`).
- **Genişlik:** `w-full md:w-[600px]`.
- **Animasyon:** `slide-in-from-right` (Sağdan kayarak gelme).
