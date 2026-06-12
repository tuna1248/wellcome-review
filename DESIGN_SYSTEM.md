# Wellcome UI Design System & Style Guide

Bu doküman, uygulamanın görsel dilini oluşturmak için kullanılan **Tailwind CSS** temellerini ve tasarım kurallarını içerir.

## 1. Renk Paleti (Color Palette)

Tasarım dili **"Medical-Grade Cleanliness" (Tıbbi Temizlik)** üzerine kuruludur.

### Primary (Marka Rengi) - Emerald
Güven, sağlık ve başarı hissi verir.
- **Main:** `bg-emerald-600` (Butonlar, Aktif State)
- **Hover:** `bg-emerald-700`
- **Surface/Light:** `bg-emerald-50` (Seçili öğeler, hafif arka planlar)
- **Border:** `border-emerald-100` veya `border-emerald-200`
- **Text:** `text-emerald-700` (Vurgulu metinler)

### Neutral (İskelet Rengi) - Slate
Profesyonel ve göz yormayan gri tonları. Saf siyah (`#000`) **kullanılmaz**.
- **Heading:** `text-slate-800` veya `text-slate-900`
- **Body:** `text-slate-600`
- **Caption/Label:** `text-slate-400`
- **Border:** `border-slate-200` (Tüm kartlar ve inputlar için standart)
- **Background:** `bg-slate-50` (Tüm uygulama zemini)

### Semantic Colors (Durum Renkleri)
- **Blue (Info/Digital):** `text-blue-600`, `bg-blue-50` (Linkler, Web Leadleri)
- **Purple (Event/VIP):** `text-purple-600`, `bg-purple-50` (Etkinlikler, Özel Hastalar)
- **Amber (Warning/Money):** `text-amber-600`, `bg-amber-50` (Bekleyen işlemler, Finans)
- **Rose (Critical/Action):** `text-rose-600`, `bg-rose-50` (İptaller, Tıbbi Riskler)

---

## 2. Tipografi (Typography)

Font Ailesi: **Inter** (Google Fonts)

### Hiyerarşi
1.  **Page Title:** `text-2xl font-bold text-slate-800 tracking-tight`
2.  **Section Header:** `text-lg font-bold text-slate-800`
3.  **Card Title:** `text-sm font-bold text-slate-800`
4.  **Body Text:** `text-sm font-medium text-slate-600`
5.  **Label/Caption:** `text-[10px] font-bold text-slate-400 uppercase tracking-wider`

---

## 3. Gölge ve Kenarlıklar (Shadows & Borders)

Uygulama "Flat" değil, hafif derinlikli bir yapıdadır.

- **Kart Standardı:**
  `bg-white rounded-2xl border border-slate-200 shadow-sm`
- **Hover Efekti:**
  `hover:shadow-md hover:border-emerald-300 transition-all duration-200`
- **Modal/Dropdown:**
  `shadow-2xl border border-slate-100`

---

## 4. Efektler (Effects)

### Glassmorphism (Cam Efekti)
Header ve Sticky elemanlar için kullanılır.
- `bg-white/80 backdrop-blur-md border-b border-slate-200`

### Animasyonlar
Kullanıcıya akıcılık hissi vermek için `animate-in` kullanılır.
- **Sayfa Geçişi:** `animate-in fade-in slide-in-from-bottom-4 duration-500`
- **Modal Açılış:** `animate-in zoom-in-95 duration-200`
- **Drawer (Sağdan Panel):** `animate-in slide-in-from-right duration-300`
