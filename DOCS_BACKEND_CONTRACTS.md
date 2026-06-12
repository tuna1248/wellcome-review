# Backend Veri Kontratları (API Contracts)

Frontend'in beklediği veri yapıları ve TypeScript arayüzlerinin Backend karşılıkları.

## 1. Hasta (Patient) Modeli
Ana veri objesi. CRM ve Klinik veriyi birleştirir.

```json
{
  "id": "uuid-v4",
  "name": "Sarah Connor",
  "phone": "+44 7700 900077",
  "country": "UK",
  "status": "In Treatment", // Enum: Lead, Deposit Paid, In Treatment, Completed
  "tags": ["VIP", "High Anxiety"], // Renklendirme için frontend'de kullanılır
  "nextAction": "Surgery Tomorrow",
  "financials": {
    "totalPackagePrice": 5000,
    "currency": "GBP",
    "installments": [
      { "id": "1", "amount": 1000, "dueDate": "2024-10-01", "status": "Paid" },
      { "id": "2", "amount": 4000, "dueDate": "2024-10-25", "status": "Upcoming" }
    ]
  }
}
```

## 2. Fırsat/Anlaşma (Deal) Modeli
Satış hunisindeki (Pipeline) her bir kart.

```json
{
  "id": "deal-123",
  "patientId": "uuid-v4", // Foreign Key -> Patient
  "stage": "Quote Sent", // Kanban kolonu
  "value": 4500,
  "currency": "GBP",
  "probability": "High", // 'High' | 'Medium' | 'Low'
  "source": "Instagram Ads",
  "assignedTo": ["user-id-1"], // Satış temsilcisi
  "activities": [
    {
      "type": "note",
      "content": "Hasta eşiyle görüştü, onay bekliyor.",
      "createdAt": "2024-10-24T10:00:00Z",
      "createdBy": "user-id-1"
    }
  ]
}
```

## 3. Randevu/Takvim (CalendarItem) Modeli
Takvimdeki her bir kutucuk.

```json
{
  "id": "evt-555",
  "title": "Implant Surgery",
  "patientId": "uuid-v4",
  "start": "2024-10-25T09:00:00Z",
  "end": "2024-10-25T11:00:00Z",
  "type": "surgery", // 'surgery' | 'consultation' | 'online_meet'
  "resourceId": "room-1" // Hangi odada veya hangi doktorda
}
```

## 4. Operasyon/Lojistik (Logistics) Modeli
Hastanın seyahat detayları.

```json
{
  "patientId": "uuid-v4",
  "flight": {
    "code": "TK1984",
    "arrivalDate": "2024-10-24T14:30:00Z",
    "status": "Landed" // API entegrasyonu ile güncellenir
  },
  "hotel": {
    "name": "Hilton Bomonti",
    "checkIn": "2024-10-24",
    "checkOut": "2024-10-30",
    "status": "Booked"
  },
  "transfer": {
    "driverName": "Ahmet",
    "plate": "34 VIP 99",
    "vehicleType": "Mercedes Vito"
  }
}
```

## 5. Özel Notlar
*   **Para Birimi:** Tüm finansal işlemlerde `currency` alanı zorunludur. Frontend çoklu para birimi (GBP, EUR, USD, TRY) destekler.
*   **Tarihler:** Tüm tarihler ISO 8601 formatında (`YYYY-MM-DD` veya `YYYY-MM-DDTHH:mm:ssZ`) saklanmalıdır.
*   **Dosya Yükleme:** `PatientProfile` içindeki "Documents" sekmesi için bir S3 (veya benzeri) depolama entegrasyonu gerekir.
