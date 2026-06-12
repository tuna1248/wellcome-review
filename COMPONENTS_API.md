# Component API Reference

## 1. QuoteBuilderModal
A complex modal for creating multi-currency treatment plans with logistics.

**Path:** `components/QuoteBuilderModal.tsx`

**Props:**
```typescript
interface QuoteBuilderProps {
  patient: Patient;           // The patient object to attach quote to
  onClose: () => void;        // Function to close modal
  onSave: (quote: PatientQuote) => void; // Callback with the fully constructed quote object
}
```

**Key Logic:**
- Auto-calculates totals based on `items` + `logistics` - `discount`.
- Logistics toggle adds predefined costs (e.g., £150 for Transfer).
- Services are searched from `MOCK_SERVICES`.

---

## 2. DentalChart
Interactive FDI-numbered tooth chart for visual treatment planning.

**Path:** `components/DentalChart.tsx`

**Props:**
```typescript
interface DentalChartProps {
  initialRecords?: DentalRecord[]; // Existing treatments to display
  onSave: (records: DentalRecord[]) => void; // Triggered when treatments are added/removed
  onGenerateQuote: (quote: Partial<PatientQuote>) => void; // Triggered to convert chart to a quote draft
}
```

**Usage:**
1. Click teeth to select (turns blue outline).
2. Select procedure from bottom floating bar.
3. Records are added to the list on the right.

---

## 3. AddInstallmentModal
Financial tool to split a remaining balance into scheduled payments.

**Path:** `components/AddInstallmentModal.tsx`

**Props:**
```typescript
interface AddInstallmentModalProps {
  remainingBalance: number;   // Amount left to pay
  currencySymbol: string;     // £, €, $, or ₺
  onClose: () => void;
  onSave: (installments: PaymentInstallment[]) => void;
}
```

**Logic:**
- Allows 2-way or 3-way split.
- Sliders adjust percentage (e.g., 50/30/20).
- Auto-calculates dates (Today, +30 days, +60 days).

---

## 4. VideoMeetingModal
Modal to generate or schedule Google Meet/Zoom links.

**Path:** `components/VideoMeetingModal.tsx`

**Props:**
```typescript
interface VideoMeetingModalProps {
  patient: Patient;
  onClose: () => void;
  onSchedule: (details: { 
    platform: string; 
    date?: string; 
    time?: string; 
    link: string 
  }) => void;
}
```

---

## 5. Sidebar
Main navigation component with role-based filtering.

**Path:** `components/Sidebar.tsx`

**Props:**
```typescript
interface SidebarProps {
  navItems: NavItem[];        // List of all possible navigation items
  currentView: ViewState;     // ID of current active view
  onNavigate: (view: ViewState) => void;
  currentUserRole: UserRole;  // 'Sales Team', 'Doctor', 'Manager'
  isOpen: boolean;            // Mobile state
  onClose: () => void;        // Mobile close handler
}
```

---

## 6. ActionFab
Floating Action Button that expands into a menu. Context-aware based on role.

**Path:** `components/ActionFab.tsx`

**Props:**
```typescript
interface ActionFabProps {
  role: UserRole;
  onNavigate: (view: ViewState) => void; // Used to redirect user when action is clicked
}
```

**Role Behavior:**
- **Sales:** Shows "New Lead", "Log Call", "Create Quote".
- **Doctor:** Shows "Block Schedule", "Add Task".
- **Manager:** Shows "Broadcast", "Finance Report".

---

## 7. AIAssistant
Floating chat widget using Google Gemini.

**Path:** `components/AIAssistant.tsx`

**Props:**
```typescript
interface AssistantProps {
  role: UserRole;
  currentView: string; // Passes context to AI (e.g., "You are on the Calendar page")
}
```

**Environment Variable:**
Requires `process.env.API_KEY` for `gemini-3-flash-preview`.
