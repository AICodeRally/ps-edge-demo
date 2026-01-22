// Mock data for Volunteers department

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  availability: 'Weekdays' | 'Weekends' | 'Flexible';
  status: 'Active' | 'Inactive' | 'New';
  joinDate: string;
  totalHours: number;
  assignedPrograms: string[];
}

export interface Shift {
  id: string;
  program: string;
  role: string;
  date: string;
  startTime: string;
  endTime: string;
  volunteers: string[];
  spotsTotal: number;
  spotsFilled: number;
  status: 'Open' | 'Full' | 'In Progress' | 'Completed';
}

export interface VolunteerHours {
  volunteerId: string;
  volunteerName: string;
  month: string;
  hours: number;
  shifts: number;
}

export const volunteers: Volunteer[] = [
  {
    id: 'V001',
    name: 'Sarah Williams',
    email: 'sarah.w@email.com',
    phone: '555-0101',
    skills: ['Teaching', 'Mentoring', 'Event Planning'],
    availability: 'Weekends',
    status: 'Active',
    joinDate: '2023-03-15',
    totalHours: 187,
    assignedPrograms: ['After-School Tutoring', 'Youth Mentorship'],
  },
  {
    id: 'V002',
    name: 'Michael Chen',
    email: 'michael.c@email.com',
    phone: '555-0102',
    skills: ['Medical', 'First Aid', 'Community Outreach'],
    availability: 'Flexible',
    status: 'Active',
    joinDate: '2023-06-20',
    totalHours: 156,
    assignedPrograms: ['Community Health Screenings', 'Senior Wellness'],
  },
  {
    id: 'V003',
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    phone: '555-0103',
    skills: ['Food Service', 'Logistics', 'Spanish'],
    availability: 'Weekdays',
    status: 'Active',
    joinDate: '2022-11-10',
    totalHours: 243,
    assignedPrograms: ['Food Pantry Network'],
  },
  {
    id: 'V004',
    name: 'David Thompson',
    email: 'david.t@email.com',
    phone: '555-0104',
    skills: ['Construction', 'Maintenance', 'Project Management'],
    availability: 'Weekends',
    status: 'Active',
    joinDate: '2023-01-08',
    totalHours: 198,
    assignedPrograms: ['Emergency Housing Support'],
  },
  {
    id: 'V005',
    name: 'Jennifer Lee',
    email: 'jennifer.l@email.com',
    phone: '555-0105',
    skills: ['Administration', 'Communications', 'Social Media'],
    availability: 'Flexible',
    status: 'Active',
    joinDate: '2023-08-15',
    totalHours: 134,
    assignedPrograms: ['Marketing & Outreach'],
  },
  {
    id: 'V006',
    name: 'Robert Kim',
    email: 'robert.k@email.com',
    phone: '555-0106',
    skills: ['Teaching', 'Music', 'Arts'],
    availability: 'Weekends',
    status: 'New',
    joinDate: '2024-11-01',
    totalHours: 12,
    assignedPrograms: ['Youth Services'],
  },
];

export const shifts: Shift[] = [
  {
    id: 'SH001',
    program: 'Food Pantry',
    role: 'Food Distribution',
    date: '2024-12-15',
    startTime: '09:00',
    endTime: '12:00',
    volunteers: ['Emily Rodriguez', 'David Thompson'],
    spotsTotal: 4,
    spotsFilled: 2,
    status: 'Open',
  },
  {
    id: 'SH002',
    program: 'Tutoring',
    role: 'Math Tutor',
    date: '2024-12-16',
    startTime: '15:00',
    endTime: '18:00',
    volunteers: ['Sarah Williams'],
    spotsTotal: 3,
    spotsFilled: 1,
    status: 'Open',
  },
  {
    id: 'SH003',
    program: 'Health Screening',
    role: 'Registration Desk',
    date: '2024-12-15',
    startTime: '08:00',
    endTime: '14:00',
    volunteers: ['Michael Chen', 'Jennifer Lee', 'Robert Kim'],
    spotsTotal: 3,
    spotsFilled: 3,
    status: 'Full',
  },
  {
    id: 'SH004',
    program: 'Senior Wellness',
    role: 'Activity Leader',
    date: '2024-12-14',
    startTime: '10:00',
    endTime: '13:00',
    volunteers: ['Michael Chen', 'Sarah Williams'],
    spotsTotal: 2,
    spotsFilled: 2,
    status: 'Completed',
  },
];

export const volunteerHours: VolunteerHours[] = [
  { volunteerId: 'V001', volunteerName: 'Sarah Williams', month: 'Dec', hours: 24, shifts: 8 },
  { volunteerId: 'V002', volunteerName: 'Michael Chen', month: 'Dec', hours: 21, shifts: 7 },
  { volunteerId: 'V003', volunteerName: 'Emily Rodriguez', month: 'Dec', hours: 27, shifts: 9 },
  { volunteerId: 'V004', volunteerName: 'David Thompson', month: 'Dec', hours: 18, shifts: 6 },
  { volunteerId: 'V005', volunteerName: 'Jennifer Lee', month: 'Dec', hours: 15, shifts: 5 },
  { volunteerId: 'V006', volunteerName: 'Robert Kim', month: 'Dec', hours: 6, shifts: 2 },
];

// Monthly volunteer metrics
export const monthlyVolunteerMetrics = [
  { month: 'Jul', volunteers: 124, hours: 1850, shifts: 287 },
  { month: 'Aug', volunteers: 132, hours: 1920, shifts: 298 },
  { month: 'Sep', volunteers: 145, hours: 2180, shifts: 342 },
  { month: 'Oct', volunteers: 138, hours: 2050, shifts: 318 },
  { month: 'Nov', volunteers: 156, hours: 2340, shifts: 367 },
  { month: 'Dec', volunteers: 167, hours: 2510, shifts: 392 },
];

// Hours by program
export const hoursByProgram = [
  { program: 'Food Pantry', hours: 487 },
  { program: 'Tutoring', hours: 342 },
  { program: 'Health Screenings', hours: 298 },
  { program: 'Senior Wellness', hours: 267 },
  { program: 'Youth Mentorship', hours: 234 },
  { program: 'Housing Support', hours: 189 },
  { program: 'Events & Outreach', hours: 156 },
];

// Volunteer retention
export const volunteerRetention = [
  { range: '< 3 months', count: 12, percentage: 18 },
  { range: '3-6 months', count: 15, percentage: 22 },
  { range: '6-12 months', count: 18, percentage: 27 },
  { range: '1-2 years', count: 14, percentage: 21 },
  { range: '2+ years', count: 8, percentage: 12 },
];
