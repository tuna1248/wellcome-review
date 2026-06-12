

import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  Plane, 
  BarChart3, 
  Settings,
  Megaphone,
  Banknote,
  Stethoscope,
  Zap,
  MessageSquare,
  CalendarRange,
  Star,
  Globe,
  Briefcase,
  Tag,
  ClipboardList,
  ShoppingBag,
  Percent,
  GitMerge
} from 'lucide-react';
import { UserRole, ViewState, NavItem, Patient, Lead, ClinicEvent, CalendarItem, Deal, Review, WorkflowTask, StaffMember } from './types';

// Navigation Configuration
export const NAVIGATION_ITEMS: NavItem[] = [
  { id: ViewState.DASHBOARD, label: 'Overview', icon: LayoutDashboard, allowedRoles: [UserRole.SALES, UserRole.DOCTOR, UserRole.MANAGER] },
  { id: ViewState.SALES_OPERATIONS, label: 'Multichannel Sales', icon: Briefcase, allowedRoles: [UserRole.SALES, UserRole.MANAGER] },
  { id: ViewState.TEAM_WORKFLOW, label: 'Team & Workflow', icon: ClipboardList, allowedRoles: [UserRole.SALES, UserRole.MANAGER, UserRole.DOCTOR] },
  { id: ViewState.COMMUNICATIONS, label: 'Communication Hub', icon: MessageSquare, allowedRoles: [UserRole.SALES, UserRole.MANAGER, UserRole.DOCTOR] },
  { id: ViewState.EVENT_MANAGER, label: 'Event Management', icon: CalendarRange, allowedRoles: [UserRole.MANAGER, UserRole.SALES] },
  { id: ViewState.OPERATIONS, label: 'Operations', icon: Plane, allowedRoles: [UserRole.SALES, UserRole.MANAGER] },
  { id: ViewState.CALENDAR, label: 'Calendar', icon: CalendarDays, allowedRoles: [UserRole.SALES, UserRole.DOCTOR, UserRole.MANAGER] },
  { id: ViewState.PATIENTS, label: 'Customers', icon: Users, allowedRoles: [UserRole.DOCTOR, UserRole.MANAGER, UserRole.SALES] },
  { id: ViewState.REPUTATION, label: 'Reputation', icon: Star, allowedRoles: [UserRole.MANAGER, UserRole.SALES] },
  { id: ViewState.PIPELINE_CONFIG, label: 'Pipeline Setup', icon: GitMerge, allowedRoles: [UserRole.MANAGER] },
  { id: ViewState.DIGITAL_PRESENCE, label: 'Digital Presence', icon: Globe, allowedRoles: [UserRole.MANAGER] },
  { id: ViewState.PRICING, label: 'Services & Pricing', icon: Tag, allowedRoles: [UserRole.MANAGER] },
  { id: ViewState.DISCOUNTS, label: 'Discount Setup', icon: Percent, allowedRoles: [UserRole.MANAGER] },
  { id: ViewState.ANALYTICS, label: 'Analytics & BI', icon: BarChart3, allowedRoles: [UserRole.MANAGER] },
  { id: ViewState.ADDONS, label: 'Marketplace', icon: ShoppingBag, allowedRoles: [UserRole.MANAGER] },
  { id: ViewState.SETTINGS, label: 'Settings', icon: Settings, allowedRoles: [UserRole.MANAGER] },
];

export const PATIENT_TYPE_CONFIG: Record<string, { label: string; className: string }> = {
  'VIP': { label: 'VIP', className: 'bg-purple-100 text-purple-800 border-purple-200' },
  'High Value': { label: 'High Value', className: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  'Revision': { label: 'Revision', className: 'bg-orange-100 text-orange-800 border-orange-200' },
  'Remote': { label: 'Remote', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  'Influencer': { label: 'Influencer', className: 'bg-pink-100 text-pink-800 border-pink-200' },
  'Medical Risk': { label: 'Medical Risk', className: 'bg-red-100 text-red-800 border-red-200' },
  'Fast Track': { label: 'Fast Track', className: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
};

export const MOCK_STAFF: StaffMember[] = [
  { id: 's1', name: 'Dr. Ryan Scott', role: 'Doctor', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop', workHours: '10:00am - 7:00pm', color: 'bg-blue-100' },
  { id: 's2', name: 'Dr. Alice Miller', role: 'Doctor', avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop', workHours: '10:00am - 7:00pm', color: 'bg-emerald-100' },
  { id: 's3', name: 'Dr. Sarah Vance', role: 'Doctor', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop', workHours: '10:00am - 7:00pm', color: 'bg-purple-100' },
  { id: 's4', name: 'Jane Dawson', role: 'Sales', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop', workHours: '09:00am - 6:00pm', color: 'bg-amber-100' },
  { id: 's5', name: 'John Sutton', role: 'Sales', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop', workHours: '09:00am - 6:00pm', color: 'bg-cyan-100' },
];

export const MOCK_CALENDAR_ITEMS: CalendarItem[] = [
  // --- DECEMBER 23 2025 ("Today" for Demo) ---
  
  // Morning (Completed / Past if 12:00PM)
  { 
    id: 'dec23-4', title: 'Laser Whitening', patientName: 'Alice Woods', 
    date: '2025-12-23', time: '09:00', endTime: '10:30', category: 'medical', type: 'consultation', 
    status: 'completed', paymentStatus: 'Paid', staffId: 's3', notes: 'Patient requested extra sensitivity gel.'
  },
  { 
    id: 'dec23-1', title: 'Routine Check-up', patientName: 'Mark Taylor', 
    date: '2025-12-23', time: '10:00', endTime: '10:30', category: 'medical', type: 'consultation', 
    status: 'completed', paymentStatus: 'Paid', staffId: 's1', notes: 'All clear.'
  },
  {
    id: 'dec23-6', title: 'Consultation: New Lead', patientName: 'Emma Smith',
    date: '2025-12-23', time: '10:30', endTime: '11:15', category: 'medical', type: 'consultation',
    status: 'completed', paymentStatus: 'N/A', staffId: 's2', notes: 'Free initial consultation for veneers.'
  },

  // Mid-Day (On-Going if 12:00PM)
  { 
    id: 'dec23-2', title: 'Implant Stage 2 Surgery', patientName: 'Gary Owen', 
    date: '2025-12-23', time: '11:00', endTime: '13:00', category: 'medical', type: 'surgery', 
    status: 'confirmed', paymentStatus: 'Paid', staffId: 's1', notes: 'Sterile setup required. Dr. Ryan performing.'
  },
  {
    id: 'dec23-7', title: 'Deep Cleaning', patientName: 'Bruce Wallace',
    date: '2025-12-23', time: '11:30', endTime: '12:30', category: 'medical', type: 'consultation',
    status: 'confirmed', paymentStatus: 'Unpaid', staffId: 's3', notes: 'Payment to be collected at desk.'
  },

  // Afternoon (Upcoming)
  { 
    id: 'dec23-8', title: 'Lunch Break', 
    date: '2025-12-23', time: '13:00', endTime: '14:00', category: 'personal', type: 'break', 
    status: 'confirmed', staffId: 's1'
  },
  { 
    id: 'dec23-5', title: 'Airport Transfer Coord', 
    date: '2025-12-23', time: '14:00', endTime: '15:00', category: 'logistics', type: 'task', 
    status: 'confirmed', staffId: 's5', notes: 'Coordinate pickup for TK1984.'
  },
  { 
    id: 'dec23-3', title: 'Zoom: UK Consult', patientName: 'Harry Parker', 
    date: '2025-12-23', time: '15:00', endTime: '15:45', category: 'medical', type: 'online_consult', 
    status: 'confirmed', staffId: 's1', origin: 'International', notes: 'Discussing full mouth restoration plan.'
  },
  {
    id: 'dec23-9', title: 'Root Canal Therapy', patientName: 'Ryan Wells',
    date: '2025-12-23', time: '16:00', endTime: '17:30', category: 'medical', type: 'surgery',
    status: 'confirmed', paymentStatus: 'Unpaid', staffId: 's2', notes: 'Emergency appointment for pain.'
  },
  {
    id: 'dec23-10', title: 'Sales Follow-up Calls',
    date: '2025-12-23', time: '16:30', endTime: '18:00', category: 'sales', type: 'task',
    status: 'pending', staffId: 's4'
  },

  // --- DECEMBER 24 2025 ---
  { 
    id: 'dec24-1', title: 'Emergency Repair', patientName: 'Local Patient', 
    date: '2025-12-24', time: '09:00', endTime: '10:00', category: 'medical', type: 'surgery', 
    status: 'confirmed', staffId: 's1' 
  },
  { 
    id: 'dec24-2', title: 'Half Day / Holiday', 
    date: '2025-12-24', time: '13:00', endTime: '20:00', category: 'personal', type: 'block', 
    status: 'confirmed', staffId: 's1' 
  },
  { 
    id: 'dec24-3', title: 'Half Day / Holiday', 
    date: '2025-12-24', time: '13:00', endTime: '20:00', category: 'personal', type: 'block', 
    status: 'confirmed', staffId: 's2' 
  },
  { 
    id: 'dec24-4', title: 'Half Day / Holiday', 
    date: '2025-12-24', time: '13:00', endTime: '20:00', category: 'personal', type: 'block', 
    status: 'confirmed', staffId: 's3' 
  },
  { 
    id: 'dec24-5', title: 'Last Minute Sales', 
    date: '2025-12-24', time: '10:00', endTime: '12:00', category: 'sales', type: 'call', 
    status: 'confirmed', staffId: 's4' 
  },
];

export const MOCK_CONTRACTS = [
  { id: 'c1', name: 'Standard Event Contract' },
  { id: 'c2', name: 'VIP Roadshow Agreement' },
  { id: 'c3', name: 'Online Webinar Terms' },
];

export const MOCK_EVENTS_LIST: ClinicEvent[] = [
  { 
    id: 'EVT-LDN', 
    name: 'London Dental Meetup', 
    description: 'A comprehensive dental meetup in the heart of London.',
    contractId: 'c1',
    doctorIds: ['s1', 's2'],
    startDate: '2025-12-12',
    endDate: '2025-12-14',
    startTime: '09:00',
    endTime: '18:00',
    timeZone: 'GMT',
    location: 'London, UK', 
    address: '123 Baker Street, London',
    sessionDuration: 60,
    sessionCapacity: 5,
    totalParticipantLimit: 20,
    status: 'Upcoming', 
    totalSlots: 20, 
    bookedSlots: 14, 
    color: 'from-blue-600 to-indigo-600', 
    type: 'Physical' 
  },
  { 
    id: 'EVT-MAN', 
    name: 'Manchester Smile Day', 
    description: 'Discover your best smile in Manchester.',
    contractId: 'c2',
    doctorIds: ['s3'],
    startDate: '2026-01-15',
    endDate: '2026-01-16',
    startTime: '10:00',
    endTime: '17:00',
    timeZone: 'GMT',
    location: 'Manchester, UK', 
    address: '456 Piccadilly Gardens, Manchester',
    sessionDuration: 45,
    sessionCapacity: 3,
    totalParticipantLimit: 15,
    status: 'Upcoming', 
    totalSlots: 15, 
    bookedSlots: 3, 
    color: 'from-emerald-600 to-teal-600', 
    type: 'Physical' 
  },
  { 
    id: 'EVT-WEB', 
    name: 'Online Webinar: Implants', 
    description: 'Learn about the latest implant technologies from home.',
    contractId: 'c3',
    doctorIds: ['s1'],
    startDate: '2025-11-05',
    endDate: '2025-11-05',
    startTime: '19:00',
    endTime: '20:30',
    timeZone: 'GMT',
    location: 'Zoom', 
    sessionDuration: 90,
    sessionCapacity: 100,
    totalParticipantLimit: 100,
    externalBookingLink: 'https://zoom.us/j/123456789',
    status: 'Upcoming', 
    totalSlots: 100, 
    bookedSlots: 45, 
    color: 'from-purple-600 to-pink-600', 
    type: 'Online' 
  },
];

export const MOCK_PATIENTS: Patient[] = [
  { 
    id: '1', name: 'Sarah Collins', phone: '+44 7700 900077', country: 'United Kingdom',
    status: 'In Treatment', source: 'London Meetup', nextAction: 'Post-op check', 
    totalSpend: '£4,500', tags: ['VIP', 'Revision'],
    eventHistory: [{ id: 'e1', eventName: 'London Dental Meetup', date: 'Sep 28, 2024', status: 'Attended' }],
    timeline: [
      { id: 't1', date: '2024-10-24 10:00', title: 'Surgery Started', description: 'Implant procedure commenced.', type: 'medical' },
      { id: 't2', date: '2024-10-23 14:00', title: 'Airport Pickup', description: 'Driver met patient at IST Airport.', type: 'logistics' },
      { id: 't3', date: '2024-10-20 09:30', title: 'Flight Details Received', description: 'Patient booked TK1984.', type: 'logistics' },
      { id: 't4', date: '2024-10-10 15:45', title: 'Deposit Paid', description: '£500 deposit received via Stripe.', type: 'financial' },
      { id: 't5', date: '2024-10-05 11:00', title: 'Quote Accepted', description: 'Full Hollywood Smile package agreed.', type: 'interaction' },
      { id: 't6', date: '2024-09-28 14:00', title: 'Attended Event', description: 'Checked in at London Dental Meetup.', type: 'event_attendance' },
      { id: 't7', date: '2024-09-15 09:00', title: 'Lead Created', description: 'Registered interest via Facebook Event Ad.', type: 'lead_creation' },
    ],
    financials: {
      totalPackagePrice: 4500,
      currency: 'GBP',
      currencySymbol: '£',
      installments: [
        { id: 'p1', title: 'Reservation Deposit', amount: 500, dueDate: '2024-09-29', status: 'Paid', paidDate: '2024-09-29' },
        { id: 'p2', title: 'Visit 1: Arrival Payment', amount: 2000, dueDate: '2024-10-23', status: 'Paid', paidDate: '2024-10-23' },
        { id: 'p3', title: 'Visit 2: Completion Balance', amount: 2000, dueDate: '2025-01-15', status: 'Upcoming' },
      ],
      transactions: [
        { id: 'tx1', date: '2024-09-29', amount: 500, method: 'Link', reference: 'STRIPE_992', recordedBy: 'System' },
        { id: 'tx2', date: '2024-10-23', amount: 2000, method: 'Cash', reference: 'REC_001', recordedBy: 'Jane Dawson' },
      ]
    },
    quotes: [
      {
        id: 'q1_v2',
        rootId: 'q1',
        title: 'Hollywood Smile Package',
        date: '2024-10-05',
        status: 'Accepted',
        total: 4500,
        currency: 'GBP',
        version: 2,
        items: [],
        logistics: { includeHotel: true, hotelNights: 7, hotelPrice: 500, includeTransfer: true, transferPrice: 100, flightAssistance: true },
        discount: 0,
        deposit: { required: true, type: 'fixed', value: 500, amount: 500 },
        subtotal: 4500,
        visits: [
          { id: 1, nights: 7, percentage: 50, status: 'Confirmed', arrivalDate: '2024-10-23', departureDate: '2024-10-30' },
          { id: 2, nights: 5, percentage: 50, status: 'Waiting', estimatedArrivalDate: '2025-01-15' }
        ]
      },
      {
        id: 'q1_v1',
        rootId: 'q1',
        title: 'Hollywood Smile Package (Initial)',
        date: '2024-10-01',
        status: 'Archived',
        total: 4800,
        currency: 'GBP',
        version: 1,
        items: [],
        logistics: { includeHotel: true, hotelNights: 7, hotelPrice: 500, includeTransfer: true, transferPrice: 100, flightAssistance: true },
        discount: 0,
        deposit: { required: true, type: 'fixed', value: 500, amount: 500 },
        subtotal: 4800,
        visits: [
          { id: 1, nights: 7, percentage: 100, status: 'Waiting' }
        ]
      }
    ]
  },
  { 
    id: '2', name: 'John Sutton', phone: '+44 7700 900001', status: 'Lead', source: 'Instagram Ads', nextAction: 'Initial Call', totalSpend: '£0',
    tags: ['Remote', 'High Value'],
    timeline: [
      { id: 't1', date: '2024-10-24 08:30', title: 'Lead Created', description: 'New inquiry from Instagram Ads campaign.', type: 'lead_creation' }
    ],
    financials: {
      totalPackagePrice: 0, currency: 'GBP', currencySymbol: '£', installments: [], transactions: []
    }
  },
  { 
    id: '3', name: 'David Ross', phone: '+44 7700 900002', status: 'Lead', source: 'Manchester Event', nextAction: 'Re-engage', totalSpend: '£0',
    tags: ['Fast Track'],
    eventHistory: [
      { id: 'e1', eventName: 'Manchester Smile Day', date: 'Jan 15, 2024', status: 'Attended' },
      { id: 'e2', eventName: 'London Dental Meetup', date: 'Dec 12, 2023', status: 'Attended' },
      { id: 'e3', eventName: 'Webinar: Implants', date: 'Nov 05, 2023', status: 'Registered' }
    ],
    timeline: [
      { id: 't1', date: '2024-02-10 11:00', title: 'Call: No Answer', description: 'Left voicemail regarding quote expiry.', type: 'interaction' },
      { id: 't2', date: '2024-01-15 10:00', title: 'Attended Event', description: 'Checked in at Manchester Smile Day.', type: 'event_attendance' },
      { id: 't3', date: '2023-12-12 14:00', title: 'Attended Event', description: 'Checked in at London Dental Meetup.', type: 'event_attendance' },
      { id: 't4', date: '2023-11-05 18:00', title: 'Webinar Registration', description: 'Signed up for "Implants 101" webinar.', type: 'event_attendance' },
      { id: 't5', date: '2023-10-01 09:00', title: 'Lead Created', description: 'Referral from previous patient.', type: 'lead_creation' }
    ],
    financials: {
      totalPackagePrice: 6000,
      currency: 'EUR',
      currencySymbol: '€',
      installments: [],
      transactions: []
    }
  },
  {
    id: '4', name: 'Alice Thompson', phone: '+44 7700 900003', status: 'Lead', source: 'London Dental Meetup', nextAction: 'Follow Up', totalSpend: '£4,500',
    tags: ['Influencer'],
    timeline: [
      { id: 't1', date: '2024-10-24 09:00', title: 'Quote Sent', description: 'Sent proposal for 20 Veneers.', type: 'financial' },
      { id: 't2', date: '2024-10-23 11:00', title: 'Consultation', description: 'Initial consult at London Meetup.', type: 'interaction' }
    ],
    financials: { totalPackagePrice: 4500, currency: 'GBP', currencySymbol: '£', installments: [], transactions: [] }
  }
];

export interface LeadExtended extends Lead {
  acquisitionDate: string;
  nextFollowUp?: string;
}

export const MOCK_LEADS: LeadExtended[] = [
  { id: 'L1', name: 'Emma Wright', phone: '+44 7700 900077', source: 'Event', eventInterest: 'London Dental Meetup', status: 'New', notes: 'Interested in Veneers', tags: ['High Value'], acquisitionDate: '2024-10-10', nextFollowUp: '2024-10-20' },
  { id: 'L2', name: 'James Brooks', phone: '+44 7700 900007', source: 'Event', eventInterest: 'London Dental Meetup', status: 'Call 1', notes: 'No answer, left VM', tags: ['Medical Risk'], acquisitionDate: '2024-10-12' },
  { id: 'L3', name: 'Matthew King', phone: '+90 555 111 2233', source: 'Walk-in', status: 'New', notes: 'Walked in asking about whitening price.', acquisitionDate: '2024-10-24' },
  { id: 'L4', name: 'Sophie Taylor', phone: '+44 7700 900333', source: 'Digital', status: 'New', notes: 'Instagram Ad lead.', tags: ['Influencer'], acquisitionDate: '2024-10-15', nextFollowUp: '2024-10-18' },
  { id: 'L5', name: 'Ryan Wells', phone: '+44 7700 900444', source: 'Partner', status: 'Call 2', notes: 'Referred by Agency X', tags: ['Remote'], acquisitionDate: '2024-10-20' },
];

export interface DealExtended extends Deal {
  acquisitionDate: string;
  nextFollowUp?: string;
}

export const MOCK_DEALS: DealExtended[] = [
  { id: 'd1', patientName: 'Alice Thompson', value: '£4,500', source: 'Event', sourceDetail: 'London Dental Meetup', lastAction: 'Quote given', status: 'Quote & Plan', probability: 'High', treatmentType: 'Veneers (20)', linkedPatientId: '4', tags: ['Influencer'], acquisitionDate: '2024-10-01' },
  { id: 'd2', patientName: 'David Miller', value: '£8,200', source: 'Event', sourceDetail: 'Manchester Smile Day', lastAction: 'Chasing deposit', status: 'Decision Pending', probability: 'Medium', treatmentType: 'Implants', linkedPatientId: '2', tags: ['High Value'], acquisitionDate: '2024-10-05', nextFollowUp: '2024-10-22' },
  { id: 'd3', patientName: 'Sarah Collins', value: '£5,200', source: 'Event', sourceDetail: 'London Dental Meetup', lastAction: 'Quote Sent', status: 'Quote & Plan', probability: 'High', treatmentType: 'Veneers (Hollywood)', linkedPatientId: '1', tags: ['VIP', 'Revision'], acquisitionDate: '2024-09-15' },
  { id: 'd4', patientName: 'Robert Brown', value: '£3,000', source: 'Organic', sourceDetail: 'Instagram', lastAction: 'Requested photos', status: 'Active Inquiry', probability: 'Low', treatmentType: 'Whitening', acquisitionDate: '2024-10-20' },
  { id: 'd5', patientName: 'Ethan Hall', value: '£12,000', source: 'Organic', sourceDetail: 'Google', lastAction: 'Tickets sent', status: 'Travel Confirmed', probability: 'High', treatmentType: 'Full Mouth', tags: ['Fast Track'], acquisitionDate: '2024-10-18' },
];

export const MOCK_REVIEWS: Review[] = [
  { id: 'r1', author: 'Emma Wilson', rating: 5, source: 'Google', date: '2 days ago', content: 'Absolutely amazing experience!', status: 'Replied', reply: 'Thank you Emma!', sentiment: 'Positive' },
];

export const MOCK_WORKFLOW_TASKS: WorkflowTask[] = [
  { id: 'wt1', patientId: '1', title: 'Verify Flight Arrival', stage: 'Pre-Treatment', assigneeId: 'me', assigneeName: 'Me', isPrivate: false, dueDate: '2024-10-23', isCompleted: true, priority: 'High' },
  { id: 'wt2', patientId: '1', title: 'Prepare Surgery Room 3', stage: 'Treatment', assigneeId: 'nurse', assigneeName: 'Nurse A', isPrivate: true, dueDate: '2024-10-24', isCompleted: false, priority: 'High' },
  { id: 'wt3', patientId: '1', title: 'Book Return Transfer', stage: 'Post-Care', assigneeId: 'ops', assigneeName: 'Ops Team', isPrivate: false, dueDate: '2024-10-28', isCompleted: false, priority: 'Medium' },
  { id: 'wt4', patientId: '3', title: 'Confirm Hotel Booking', stage: 'Pre-Treatment', assigneeId: 'me', assigneeName: 'Me', isPrivate: false, dueDate: '2024-10-25', isCompleted: false, priority: 'Medium' },
  { id: 'wt5', patientId: '3', title: 'Collect Pre-op Blood Test', stage: 'Treatment', assigneeId: 'doc', assigneeName: 'Dr. Scott', isPrivate: false, dueDate: '2024-10-26', isCompleted: false, priority: 'High' },
];

export const ROLE_DESCRIPTIONS = {
  [UserRole.SALES]: "Manage leads, deposits, and patient logistics.",
  [UserRole.DOCTOR]: "View medical records, schedules and treatment plans.",
  [UserRole.MANAGER]: "Oversee the entire business performance."
};