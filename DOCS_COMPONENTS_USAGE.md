# Component Entegrasyon Rehberi

Bu doküman, oluşturulan UI komponentlerinin React içinde nasıl kullanılacağını, State yönetimini ve Backend entegrasyonu için gerekli veri akışını açıklar.

## 1. Temel Layout Bileşenleri

### Sidebar (Navigasyon)
Sol taraftaki ana menüdür. Kullanıcı rolüne (RBAC) göre menüleri filtreler.

**Dosya:** `components/Sidebar.tsx`

**Kullanım:**
```tsx
<Sidebar 
  navItems={NAVIGATION_ITEMS} // constants.ts içindeki liste
  currentView={currentView}   // State: O anki aktif sayfa ID'si
  onNavigate={(viewId) => setCurrentView(viewId)} // Sayfa değiştirme fonksiyonu
  currentUserRole="Sales Team" // 'Sales Team' | 'Doctor' | 'Manager'
  isOpen={isMobileMenuOpen}   // Mobil için aç/kapa state'i
  onClose={() => setIsMobileMenuOpen(false)}
/>
```

### Header (Üst Bar)
Arama çubuğu, bildirimler ve kullanıcı profilini içerir.

**Dosya:** `components/Header.tsx`

**Önemli Özellik:**
*   **Global Arama:** `onSearchSelect` prop'u ile bir hasta seçildiğinde, uygulama `PatientProfile` moduna geçmelidir.

```tsx
<Header 
  title="Dashboard"
  currentRole={role}
  onRoleChange={setRole} // Demo amaçlı rol değiştirici
  onSearchSelect={(patientId) => openPatientQuickView(patientId)} 
/>
```

---

## 2. Kritik Modallar (Business Logic)

Bu modallar uygulamanın "kalbidir". Backend geliştiricisi buradaki `onSave` çıktısını veritabanına kaydetmelidir.

### A. QuoteBuilderModal (Teklif Oluşturucu)
Hastaya tedavi ve lojistik (otel/transfer) içeren teklif hazırlar.

**Dosya:** `components/QuoteBuilderModal.tsx`

**Giriş (Props):**
*   `patient`: Seçili hasta objesi (İsim ve ID için).

**Çıkış (onSave Event):**
Bu fonksiyon çalıştığında aşağıdaki JSON yapısı döner. Backend bunu `quotes` tablosuna kaydetmelidir.

```json
// Backend'e gidecek JSON (Quote Objesi)
{
  "title": "Hollywood Smile Package",
  "items": [
    { "id": "s1", "name": "Veneer", "price": 250, "quantity": 20 }
  ],
  "logistics": {
    "includeHotel": true,
    "hotelPrice": 500, // Hesaplanan tutar
    "includeTransfer": true,
    "transferPrice": 150
  },
  "deposit": {
    "required": true,
    "amount": 500 // Alınması gereken ön ödeme
  },
  "total": 5650,
  "currency": "GBP"
}
```

### B. DentalChart (Diş Şeması)
Doktorların dişleri seçip tedavi atadığı görsel komponent.

**Dosya:** `components/DentalChart.tsx`

**Kullanım Senaryosu:**
1. Doktor dişe tıklar (örn: #11, #21).
2. Aşağıdan işlem seçer (örn: "Zirconia Crown").
3. `onSave` tetiklenir ve `DentalRecord` array'i güncellenir.

**Backend Kayıt Yapısı:**
```typescript
interface DentalRecord {
  toothId: 11;
  procedureId: "crown";
  status: "Planned" | "Completed" | "Existing";
  price: 300;
}
```

### C. AddInstallmentModal (Taksitlendirme)
Kalan bakiyeyi taksitlere böler.

**Dosya:** `components/AddInstallmentModal.tsx`

**Mantık:**
*   Kullanıcı 2 veya 3 taksit seçer.
*   Slider ile oranları ayarlar (%60 / %40 gibi).
*   Sistem otomatik tarih atar (Bugün, +30 gün).
*   **Backend:** `PaymentInstallment` tablosuna bu kayıtları eklemelidir.

---

## 3. Sayfa Yapıları (Views)

### SalesPipelineView (Kanban Board)
Satış hunisi yönetimi.

*   **Sürükle-Bırak:** `onDragEnd` olayında backend'e `UPDATE deal SET status = 'NewStage'` isteği atılmalıdır.
*   **Drawer (Çekmece):** Bir karta tıklandığında sağdan açılan detay panelidir. Bu panel `ExtendedDeal` verisine ihtiyaç duyar (Activity Log, Notes).

### PatientProfile (Müşteri 360)
Hastanın tüm geçmişi.

*   **Tab Yapısı:** Timeline, Notes, Finance, Files.
*   **Timeline:** Backend'den gelen `logs`, `appointments` ve `payments` tablolarının birleştirilmiş ve tarihe göre sıralanmış halidir.

### OperationsView (Lojistik)
Operasyon ekibi için.

*   Bu sayfa `polling` veya `websocket` ile gerçek zamanlı güncellenmelidir (Uçak indi, Transfer başladı gibi durumlar için).
