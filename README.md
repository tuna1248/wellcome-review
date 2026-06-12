# Wellcome for Business - Medical Tourism OS

**Wellcome for Business** is a specialized Clinic Operating System designed for high-value medical tourism (Dental, Hair Transplant, Aesthetics). It bridges the gap between a CRM, an ERP, and a Clinical Management System.

## Tech Stack
- **Framework:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **AI:** Google Gemini (`gemini-3-flash-preview` for text)
- **Charts:** Recharts

## Directory Structure

```
/
├── components/       # Reusable UI widgets (Modals, Charts, Sidebar)
├── views/            # Full-page screen layouts (Dashboard, Pipeline)
├── services/         # API integrations (Gemini AI)
├── types.ts          # TypeScript interfaces (Patient, Deal, Quote)
├── constants.ts      # Mock data and configuration maps
└── App.tsx           # Main router and layout controller
```

## Key Features
1.  **Omnichannel CRM:** Unified inbox for WhatsApp/Insta/Email.
2.  **Medical Tourism Logistics:** Flight tracking, Hotel & Transfer management.
3.  **Clinical Charting:** Visual dental chart linked to quoting engine.
4.  **Financials:** Custom installment plan builder and multi-currency quotes.
5.  **Role-Based Access:** Distinct views for Sales, Doctors, and Managers.

## Quick Start
1.  Ensure `process.env.API_KEY` is set for Gemini AI.
2.  `npm install`
3.  `npm start`
