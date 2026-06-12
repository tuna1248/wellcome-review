import { LucideIcon } from 'lucide-react';

export enum UserRole {
  SALES = 'Sales',
  DOCTOR = 'Doctor',
  MANAGER = 'Manager'
}

export enum ViewState {
  DASHBOARD = 'dashboard',
  SALES_OPERATIONS = 'sales_operations',
  PIPELINE_CONFIG = 'pipeline_config', // Added
  TEAM_WORKFLOW = 'team_workflow',
  COMMUNICATIONS = 'communications',
  OPERATIONS = 'operations',
  CALENDAR = 'calendar',
  PATIENTS = 'patients',
  REPUTATION = 'reputation',
  DIGITAL_PRESENCE = 'digital_presence',
  PRICING = 'pricing',
  DISCOUNTS = 'discounts',
  ANALYTICS = 'analytics',
  ADDONS = 'addons',
  SETTINGS = 'settings',
  LEADS_EVENTS = 'leads_events',
  SALES_PIPELINE = 'sales_pipeline',
  EVENT_MANAGER = 'event_manager',
  AUTOMATIONS = 'automations'
}

export interface NavItem {
  id: ViewState;
  label: string;
  icon: LucideIcon;
  allowedRoles: UserRole[];
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  workHours?: string;
  color: string;
}

export interface CalendarItem {
  id: string;
  title: string;
  patientName?: string;
  linkedPatientId?: string;
  date: string;
  time: string;
  endTime?: string;
  category: 'medical' | 'sales' | 'personal' | 'logistics';
  type: 'consultation' | 'surgery' | 'online_consult' | 'task' | 'break' | 'block' | 'call';
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  paymentStatus?: 'Paid' | 'Unpaid' | 'N/A';
  staffId?: string;
  notes?: string;
  origin?: string;
  isDone?: boolean;
}

export interface ClinicEvent {
  id: string;
  name: string;
  description?: string;
  contractId?: string;
  doctorIds?: string[];
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  timeZone: string;
  location: string;
  address?: string;
  sessionDuration: number;
  sessionCapacity: number;
  totalParticipantLimit: number;
  externalBookingLink?: string;
  image?: string;
  googleMapLink?: string;
  phoneNumber?: string;
  status: string;
  totalSlots: number;
  bookedSlots: number;
  color: string;
  type?: 'Physical' | 'Online';
}

export interface PaymentInstallment {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Upcoming' | 'Overdue';
  paidDate?: string;
}

export interface PaymentTransaction {
  id: string;
  date: string;
  amount: number;
  method: string;
  reference: string;
  recordedBy: string;
}

export interface FinancialRecord {
  totalPackagePrice: number;
  currency: string;
  currencySymbol: string;
  installments: PaymentInstallment[];
  transactions: PaymentTransaction[];
}

export type NoteCategory = 'Lead' | 'Sales' | 'Onboarding' | 'Clinical' | 'General';

export interface CRMNote {
  id: string;
  author: string;
  date: string;
  content: string;
  type: 'note' | 'call' | 'email';
  category?: NoteCategory;
}

export interface QuoteItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface QuoteLogistics {
  includeHotel: boolean;
  hotelNights: number;
  hotelPrice: number;
  includeTransfer: boolean;
  transferPrice: number;
  flightAssistance: boolean;
}

export interface QuoteDeposit {
  required: boolean;
  type: 'fixed' | 'percentage';
  value: number;
  amount: number;
}

export interface FlightDetails {
  code: string;
  time: string;
  date: string;
}

export interface TransferDetails {
  driver: string;
  vehicle: string;
  pickupTime: string;
}

export interface HotelDetails {
  name: string;
  checkIn: string;
  checkOut: string;
}

export interface Pickup {
  id: string;
  route: string;
  date: string;
  time: string;
  driver: string;
  vehicle: string;
}

export interface QuoteVisit {
  id: number;
  name?: string;
  nights: number;
  percentage: number;
  arrivalDate?: string;
  departureDate?: string;
  status?: 'Waiting' | 'Confirmed' | 'Completed' | 'Cancelled';
  estimatedArrivalDate?: string;
  estimatedDepartureDate?: string;
  arrivalFlight?: FlightDetails;
  departureFlight?: FlightDetails;
  hotel?: HotelDetails;
  pickups?: Pickup[];
  adults?: number;
  children?: number;
  childAges?: number[];
  cost?: number;
}

export interface QuoteInstallment {
  label: string;
  amount: number;
}

export interface PatientQuote {
  id: string;
  rootId?: string;
  version?: number;
  date: string;
  validUntil?: string;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Expired' | 'Archived';
  title: string;
  items: QuoteItem[];
  logistics: QuoteLogistics;
  discount: number;
  deposit: QuoteDeposit;
  subtotal: number;
  total: number;
  currency: string;
  notes?: string;
  visits?: QuoteVisit[];
  installments?: QuoteInstallment[];
  lastUpdated?: string;
  updatedBy?: string;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email?: string;
  country?: string;
  status: string;
  source?: string;
  nextAction?: string;
  totalSpend?: string;
  tags?: string[];
  eventHistory?: { id: string; eventName: string; date: string; status: string }[];
  timeline?: { id: string; date: string; title: string; description: string; type: string }[];
  financials?: FinancialRecord;
  quotes?: PatientQuote[];
  notes?: CRMNote[];
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source: string;
  eventInterest?: string;
  status: string;
  notes?: string;
  tags?: string[];
  acquisitionDate?: string;
  nextFollowUp?: string;
}

export interface Deal {
  id: string;
  patientName: string;
  value: string;
  source: 'Event' | 'Organic' | 'Walk-in' | 'Partner';
  sourceDetail?: string;
  lastAction?: string;
  status: string;
  probability: 'High' | 'Medium' | 'Low';
  treatmentType: string;
  linkedPatientId?: string;
  tags?: string[];
  acquisitionDate?: string;
  nextFollowUp?: string;
}

export interface Review {
  id: string;
  author: string;
  patientType?: 'Verified Patient' | 'Guest' | 'Anonymous';
  rating: number;
  source: string;
  date: string;
  content: string;
  status: 'Replied' | 'Pending' | 'Escalated' | 'Flagged';
  reply?: string;
  sentiment?: 'Positive' | 'Neutral' | 'Negative';
  topics?: string[];
  procedure?: string;
  internalNotes?: string[];
  likes?: number;
}

export interface WorkflowTask {
  id: string;
  patientId: string;
  title: string;
  stage: string;
  assigneeId: string;
  assigneeName: string;
  isPrivate: boolean;
  dueDate: string;
  isCompleted: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

export interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: LucideIcon;
  color: string;
}

export interface DentalRecord {
  id: string;
  toothId: number;
  procedureId: string;
  procedureName: string;
  price: number;
  status: 'Planned' | 'Completed' | 'Existing';
  date?: string;
  notes?: string;
}

export interface DiscountRule {
  id: string;
  name: string;
  category: string;
  type: 'percentage' | 'fixed_amount';
  value: number;
  maxLimit: number;
  scope: 'invoice_total' | 'line_item';
  isActive: boolean;
  color: string;
  description?: string;
}