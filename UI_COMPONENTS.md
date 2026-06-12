# UI Component Kataloğu

Frontend geliştiricinin kullanacağı görsel bileşenlerin (Smart Components hariç) listesi ve prop detayları.

## 1. Atoms (Temel Parçalar)

### Button
**Dosya:** `components/ui/Button.tsx` (Önerilen)
**Varyasyonlar:**
1.  **Primary:** `bg-slate-900 text-white hover:bg-slate-800`
2.  **Secondary:** `bg-white border border-slate-200 text-slate-700 hover:bg-slate-50`
3.  **Accent:** `bg-emerald-600 text-white hover:bg-emerald-700` (Önemli aksiyonlar)
4.  **Ghost:** `text-slate-500 hover:bg-slate-100`

### Badge / Tag
**Kullanım:** Durumları (Status) göstermek için.
**Class Yapısı:** `text-[10px] font-bold px-2 py-0.5 rounded-full border`
**Örnekler:**
- **Success:** `bg-emerald-50 text-emerald-700 border-emerald-100`
- **Pending:** `bg-amber-50 text-amber-700 border-amber-100`
- **Info:** `bg-blue-50 text-blue-700 border-blue-100`

### Avatar
**Yapı:** Yuvarlak, içinde harf veya resim.
**Class:** `w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center`

---

## 2. Molecules (Birleşik Parçalar)

### StatCard (İstatistik Kartı)
Dashboard üzerindeki özet kutuları.
**Görünüm:** Beyaz kutu, sol tarafta metinler, sağ tarafta renkli ikon kutusu.
**Props:**
```typescript
{
  title: string;      // "Total Revenue"
  value: string;      // "£12,500"
  trend?: string;     // "+12%"
  icon: LucideIcon;   // Icon component
  color: string;      // "bg-emerald-100" (ikon arka planı için)
}
```

### KanbanCard (Sürükle-Bırak Kartı)
Satış hunisindeki veya görev listesindeki kart.
**Özellikler:**
- `cursor-grab`: Sürüklenebilir işareti.
- `active:cursor-grabbing`: Sürüklerkenki imleç.
- `hover:border-emerald-300`: Üzerine gelince kenarlık rengi değişimi.

### SearchBar (Arama Çubuğu)
**Yapı:**
- Container: `relative`
- Icon: `absolute left-3 top-2.5 text-slate-400`
- Input: `pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500`

---

## 3. Organisms (Karmaşık Yapılar)

### Sidebar (Sol Menü)
**Tasarım:**
- Genişlik: `w-64` (Desktop), `fixed` (Mobile).
- Aktif Menü: `bg-emerald-50 text-emerald-700 border-r-2 border-emerald-500`.
- Pasif Menü: `text-slate-500 hover:bg-slate-50`.

### Header (Üst Bar)
**Tasarım:**
- `sticky top-0 z-20`
- Glassmorphism efekti (`backdrop-blur`).
- İçerik: Sayfa başlığı (Sol), Global Arama ve Profil (Sağ).

### Drawer (Sağ Panel)
**Kullanım:** Detay görüntüleme (Hasta detayı, Deal detayı) için modal yerine kullanılır.
**Animasyon:** Sağdan sola kayarak gelir (`slide-in-from-right`).
**Yapı:**
- Backdrop: `fixed inset-0 bg-slate-900/30`
- Panel: `w-full md:w-[600px] bg-white h-full shadow-2xl`

---

## 4. Özel Görsel Bileşenler

### Dental Chart (Diş Şeması)
**Dosya:** `components/DentalChart.tsx`
**Görsel Mantık:**
- Her diş bir `div` veya `svg` dir.
- **Seçili:** `transform -translate-y-1 ring-2 ring-slate-800` (Yukarı zıplar).
- **İşlem Yapılmış:** Dişin üzerine yarı saydam renkli katman (`bg-blue-400/50`) eklenir.

### Calendar Grid (Takvim)
**Görsel Mantık:**
- **Hücre:** `min-h-[100px] border-b border-r border-slate-100`.
- **Event Chip:** `text-[10px] px-1.5 py-0.5 rounded truncate cursor-pointer`.
- **Renk Kodları:**
  - Ameliyat: `bg-blue-50 text-blue-700`
  - Kontrol: `bg-emerald-50 text-emerald-700`
  - Finans: `bg-purple-50 text-purple-700`
