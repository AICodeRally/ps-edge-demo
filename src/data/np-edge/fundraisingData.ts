// Mock data for Fundraising department

export interface Donor {
  id: string;
  name: string;
  email: string;
  type: 'Individual' | 'Corporate' | 'Foundation' | 'Government';
  totalGiving: number;
  lastGift: string;
  lastGiftAmount: number;
  status: 'Active' | 'Lapsed' | 'New';
  memberSince: string;
}

export interface Grant {
  id: string;
  funder: string;
  program: string;
  amount: number;
  status: 'Applied' | 'Under Review' | 'Awarded' | 'Rejected' | 'Reported';
  applicationDate: string;
  decisionDate?: string;
  reportDue?: string;
  purpose: string;
}

export interface Campaign {
  id: string;
  name: string;
  goal: number;
  raised: number;
  donors: number;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Completed' | 'Planned';
  type: 'Annual' | 'Capital' | 'Special Event' | 'Emergency';
}

export const donors: Donor[] = [
  {
    id: 'D001',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    type: 'Individual',
    totalGiving: 45000,
    lastGift: '2024-11-15',
    lastGiftAmount: 5000,
    status: 'Active',
    memberSince: '2019-03-12',
  },
  {
    id: 'D002',
    name: 'TechCorp Foundation',
    email: 'grants@techcorp.org',
    type: 'Corporate',
    totalGiving: 250000,
    lastGift: '2024-10-01',
    lastGiftAmount: 50000,
    status: 'Active',
    memberSince: '2018-01-15',
  },
  {
    id: 'D003',
    name: 'Michael Chen',
    email: 'mchen@email.com',
    type: 'Individual',
    totalGiving: 12500,
    lastGift: '2024-12-01',
    lastGiftAmount: 1000,
    status: 'Active',
    memberSince: '2020-06-20',
  },
  {
    id: 'D004',
    name: 'Community Foundation',
    email: 'info@commfound.org',
    type: 'Foundation',
    totalGiving: 180000,
    lastGift: '2024-09-15',
    lastGiftAmount: 25000,
    status: 'Active',
    memberSince: '2017-04-10',
  },
  {
    id: 'D005',
    name: 'Jennifer Martinez',
    email: 'jmartinez@email.com',
    type: 'Individual',
    totalGiving: 8500,
    lastGift: '2024-08-20',
    lastGiftAmount: 500,
    status: 'Lapsed',
    memberSince: '2021-02-14',
  },
  {
    id: 'D006',
    name: 'Global Giving Fund',
    email: 'contact@globalgiving.org',
    type: 'Foundation',
    totalGiving: 95000,
    lastGift: '2024-11-30',
    lastGiftAmount: 15000,
    status: 'Active',
    memberSince: '2019-08-05',
  },
  {
    id: 'D007',
    name: 'David Thompson',
    email: 'dthompson@email.com',
    type: 'Individual',
    totalGiving: 35000,
    lastGift: '2024-12-10',
    lastGiftAmount: 3000,
    status: 'Active',
    memberSince: '2018-11-22',
  },
  {
    id: 'D008',
    name: 'Local Business Alliance',
    email: 'info@localbiz.org',
    type: 'Corporate',
    totalGiving: 72000,
    lastGift: '2024-10-15',
    lastGiftAmount: 12000,
    status: 'Active',
    memberSince: '2020-01-08',
  },
];

export const grants: Grant[] = [
  {
    id: 'G001',
    funder: 'State Arts Commission',
    program: 'Youth Education Initiative',
    amount: 75000,
    status: 'Awarded',
    applicationDate: '2024-03-15',
    decisionDate: '2024-05-20',
    reportDue: '2025-06-01',
    purpose: 'After-school arts education for underserved youth',
  },
  {
    id: 'G002',
    funder: 'Community Foundation',
    program: 'Housing Support Program',
    amount: 50000,
    status: 'Under Review',
    applicationDate: '2024-11-01',
    purpose: 'Emergency housing assistance for families in crisis',
  },
  {
    id: 'G003',
    funder: 'Federal CDBG',
    program: 'Community Food Drive',
    amount: 125000,
    status: 'Applied',
    applicationDate: '2024-12-01',
    purpose: 'Food security program for low-income neighborhoods',
  },
  {
    id: 'G004',
    funder: 'Private Family Foundation',
    program: 'Senior Services',
    amount: 35000,
    status: 'Awarded',
    applicationDate: '2024-02-10',
    decisionDate: '2024-04-15',
    reportDue: '2025-01-15',
    purpose: 'Transportation and meal delivery for seniors',
  },
  {
    id: 'G005',
    funder: 'Corporate Giving Program',
    program: 'Environmental Education',
    amount: 45000,
    status: 'Reported',
    applicationDate: '2023-09-01',
    decisionDate: '2023-11-15',
    reportDue: '2024-11-30',
    purpose: 'Sustainability workshops in local schools',
  },
];

export const campaigns: Campaign[] = [
  {
    id: 'C001',
    name: 'Annual Fund 2024',
    goal: 500000,
    raised: 387500,
    donors: 245,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'Active',
    type: 'Annual',
  },
  {
    id: 'C002',
    name: 'Building Renovation Capital Campaign',
    goal: 2000000,
    raised: 1450000,
    donors: 89,
    startDate: '2023-06-01',
    endDate: '2025-06-01',
    status: 'Active',
    type: 'Capital',
  },
  {
    id: 'C003',
    name: 'Holiday Giving Campaign',
    goal: 150000,
    raised: 142000,
    donors: 312,
    startDate: '2024-11-01',
    endDate: '2024-12-31',
    status: 'Active',
    type: 'Special Event',
  },
  {
    id: 'C004',
    name: 'Emergency Food Relief',
    goal: 75000,
    raised: 82000,
    donors: 156,
    startDate: '2024-09-15',
    endDate: '2024-10-31',
    status: 'Completed',
    type: 'Emergency',
  },
];

export const monthlyDonations = [
  { month: 'Jan', amount: 32000, donors: 45 },
  { month: 'Feb', amount: 28000, donors: 42 },
  { month: 'Mar', amount: 35000, donors: 48 },
  { month: 'Apr', amount: 42000, donors: 52 },
  { month: 'May', amount: 38000, donors: 49 },
  { month: 'Jun', amount: 45000, donors: 58 },
  { month: 'Jul', amount: 31000, donors: 44 },
  { month: 'Aug', amount: 29000, donors: 41 },
  { month: 'Sep', amount: 52000, donors: 67 },
  { month: 'Oct', amount: 48000, donors: 63 },
  { month: 'Nov', amount: 62000, donors: 78 },
  { month: 'Dec', amount: 85000, donors: 95 },
];

export const donorsByType = [
  { type: 'Individual', count: 285, amount: 245000 },
  { type: 'Corporate', count: 45, amount: 380000 },
  { type: 'Foundation', count: 28, amount: 425000 },
  { type: 'Government', count: 12, amount: 150000 },
];
