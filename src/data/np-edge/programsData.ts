// Mock data for Programs department

export interface Program {
  id: string;
  name: string;
  category: 'Education' | 'Health' | 'Housing' | 'Food Security' | 'Youth Services' | 'Senior Services';
  status: 'Active' | 'Planned' | 'Completed' | 'On Hold';
  budget: number;
  spent: number;
  beneficiaries: number;
  targetBeneficiaries: number;
  startDate: string;
  endDate?: string;
  manager: string;
  impact: {
    metric: string;
    value: number;
    target: number;
    unit: string;
  }[];
}

export interface Beneficiary {
  id: string;
  name: string;
  age: number;
  programs: string[];
  enrollmentDate: string;
  status: 'Active' | 'Graduated' | 'Inactive';
  attendanceRate: number;
  outcomes: {
    metric: string;
    score: number;
  }[];
}

export interface Project {
  id: string;
  name: string;
  programId: string;
  programName: string;
  description: string;
  progress: number;
  budget: number;
  spent: number;
  startDate: string;
  dueDate: string;
  status: 'On Track' | 'At Risk' | 'Behind' | 'Completed';
  assignedTo: string;
  milestones: {
    name: string;
    completed: boolean;
    dueDate: string;
  }[];
}

export const programs: Program[] = [
  {
    id: 'PR001',
    name: 'After-School Tutoring',
    category: 'Education',
    status: 'Active',
    budget: 125000,
    spent: 87500,
    beneficiaries: 142,
    targetBeneficiaries: 150,
    startDate: '2024-09-01',
    endDate: '2025-06-15',
    manager: 'Emily Rodriguez',
    impact: [
      { metric: 'Reading Level Improvement', value: 2.3, target: 2.0, unit: 'grades' },
      { metric: 'Math Score Increase', value: 18, target: 15, unit: '%' },
      { metric: 'Attendance Rate', value: 92, target: 85, unit: '%' },
    ],
  },
  {
    id: 'PR002',
    name: 'Community Health Screenings',
    category: 'Health',
    status: 'Active',
    budget: 85000,
    spent: 62000,
    beneficiaries: 487,
    targetBeneficiaries: 500,
    startDate: '2024-01-01',
    manager: 'Dr. Michael Chen',
    impact: [
      { metric: 'Screenings Completed', value: 487, target: 500, unit: 'people' },
      { metric: 'Health Referrals', value: 124, target: 100, unit: 'referrals' },
      { metric: 'Follow-up Rate', value: 78, target: 75, unit: '%' },
    ],
  },
  {
    id: 'PR003',
    name: 'Emergency Housing Support',
    category: 'Housing',
    status: 'Active',
    budget: 250000,
    spent: 198000,
    beneficiaries: 67,
    targetBeneficiaries: 75,
    startDate: '2024-01-01',
    manager: 'Sarah Thompson',
    impact: [
      { metric: 'Families Housed', value: 67, target: 75, unit: 'families' },
      { metric: 'Avg. Housing Duration', value: 4.2, target: 3.0, unit: 'months' },
      { metric: 'Permanent Housing Rate', value: 72, target: 70, unit: '%' },
    ],
  },
  {
    id: 'PR004',
    name: 'Food Pantry Network',
    category: 'Food Security',
    status: 'Active',
    budget: 180000,
    spent: 145000,
    beneficiaries: 823,
    targetBeneficiaries: 800,
    startDate: '2024-01-01',
    manager: 'Carlos Martinez',
    impact: [
      { metric: 'Meals Distributed', value: 12450, target: 12000, unit: 'meals' },
      { metric: 'Families Served', value: 823, target: 800, unit: 'families' },
      { metric: 'Fresh Produce %', value: 45, target: 40, unit: '%' },
    ],
  },
  {
    id: 'PR005',
    name: 'Youth Mentorship Program',
    category: 'Youth Services',
    status: 'Active',
    budget: 95000,
    spent: 71000,
    beneficiaries: 85,
    targetBeneficiaries: 100,
    startDate: '2024-09-01',
    endDate: '2025-06-15',
    manager: 'Jennifer Lee',
    impact: [
      { metric: 'Active Mentorships', value: 85, target: 100, unit: 'pairs' },
      { metric: 'GPA Improvement', value: 0.8, target: 0.5, unit: 'points' },
      { metric: 'College Enrollment', value: 68, target: 60, unit: '%' },
    ],
  },
  {
    id: 'PR006',
    name: 'Senior Wellness Program',
    category: 'Senior Services',
    status: 'Active',
    budget: 110000,
    spent: 88000,
    beneficiaries: 156,
    targetBeneficiaries: 150,
    startDate: '2024-01-01',
    manager: 'Patricia Anderson',
    impact: [
      { metric: 'Weekly Participants', value: 156, target: 150, unit: 'seniors' },
      { metric: 'Health Improvement', value: 82, target: 75, unit: '%' },
      { metric: 'Social Isolation Reduction', value: 65, target: 60, unit: '%' },
    ],
  },
];

export const beneficiaries: Beneficiary[] = [
  {
    id: 'B001',
    name: 'Maria Garcia',
    age: 14,
    programs: ['After-School Tutoring', 'Youth Mentorship Program'],
    enrollmentDate: '2024-09-01',
    status: 'Active',
    attendanceRate: 95,
    outcomes: [
      { metric: 'Reading Level', score: 8.5 },
      { metric: 'Math Proficiency', score: 85 },
      { metric: 'GPA', score: 3.4 },
    ],
  },
  {
    id: 'B002',
    name: 'Robert Johnson',
    age: 72,
    programs: ['Senior Wellness Program'],
    enrollmentDate: '2024-02-15',
    status: 'Active',
    attendanceRate: 88,
    outcomes: [
      { metric: 'Physical Fitness', score: 78 },
      { metric: 'Social Engagement', score: 92 },
      { metric: 'Health Status', score: 85 },
    ],
  },
  {
    id: 'B003',
    name: 'Jennifer Martinez',
    age: 35,
    programs: ['Emergency Housing Support'],
    enrollmentDate: '2024-03-10',
    status: 'Graduated',
    attendanceRate: 100,
    outcomes: [
      { metric: 'Housing Stability', score: 95 },
      { metric: 'Employment Status', score: 100 },
      { metric: 'Financial Literacy', score: 88 },
    ],
  },
  {
    id: 'B004',
    name: 'David Kim',
    age: 16,
    programs: ['After-School Tutoring', 'Youth Mentorship Program'],
    enrollmentDate: '2024-09-01',
    status: 'Active',
    attendanceRate: 92,
    outcomes: [
      { metric: 'Reading Level', score: 9.2 },
      { metric: 'Math Proficiency', score: 90 },
      { metric: 'GPA', score: 3.7 },
    ],
  },
  {
    id: 'B005',
    name: 'Linda Thompson',
    age: 42,
    programs: ['Food Pantry Network', 'Community Health Screenings'],
    enrollmentDate: '2024-01-15',
    status: 'Active',
    attendanceRate: 78,
    outcomes: [
      { metric: 'Food Security', score: 82 },
      { metric: 'Health Status', score: 75 },
      { metric: 'Wellness Score', score: 80 },
    ],
  },
];

export const projects: Project[] = [
  {
    id: 'PJ001',
    name: 'New Tutoring Curriculum',
    programId: 'PR001',
    programName: 'After-School Tutoring',
    description: 'Develop and implement new STEM-focused curriculum for grades 6-8',
    progress: 75,
    budget: 25000,
    spent: 18750,
    startDate: '2024-09-01',
    dueDate: '2025-01-15',
    status: 'On Track',
    assignedTo: 'Emily Rodriguez',
    milestones: [
      { name: 'Curriculum Design', completed: true, dueDate: '2024-10-01' },
      { name: 'Teacher Training', completed: true, dueDate: '2024-11-01' },
      { name: 'Pilot Program', completed: false, dueDate: '2024-12-15' },
      { name: 'Full Rollout', completed: false, dueDate: '2025-01-15' },
    ],
  },
  {
    id: 'PJ002',
    name: 'Health Mobile Unit',
    programId: 'PR002',
    programName: 'Community Health Screenings',
    description: 'Purchase and equip mobile health screening unit for underserved neighborhoods',
    progress: 60,
    budget: 75000,
    spent: 52000,
    startDate: '2024-06-01',
    dueDate: '2025-02-01',
    status: 'At Risk',
    assignedTo: 'Dr. Michael Chen',
    milestones: [
      { name: 'Vehicle Purchase', completed: true, dueDate: '2024-08-01' },
      { name: 'Equipment Installation', completed: true, dueDate: '2024-10-01' },
      { name: 'Staff Hiring', completed: false, dueDate: '2024-12-01' },
      { name: 'Launch Event', completed: false, dueDate: '2025-02-01' },
    ],
  },
  {
    id: 'PJ003',
    name: 'Housing Partnership Expansion',
    programId: 'PR003',
    programName: 'Emergency Housing Support',
    description: 'Establish partnerships with 10 additional landlords for emergency housing',
    progress: 45,
    budget: 15000,
    spent: 8500,
    startDate: '2024-08-01',
    dueDate: '2025-03-01',
    status: 'Behind',
    assignedTo: 'Sarah Thompson',
    milestones: [
      { name: 'Landlord Outreach', completed: true, dueDate: '2024-09-01' },
      { name: 'Partnership Agreements', completed: false, dueDate: '2024-12-01' },
      { name: 'Unit Inspections', completed: false, dueDate: '2025-01-15' },
      { name: 'Program Launch', completed: false, dueDate: '2025-03-01' },
    ],
  },
  {
    id: 'PJ004',
    name: 'Farm-to-Pantry Initiative',
    programId: 'PR004',
    programName: 'Food Pantry Network',
    description: 'Establish direct partnerships with local farms for fresh produce distribution',
    progress: 85,
    budget: 30000,
    spent: 26500,
    startDate: '2024-03-01',
    dueDate: '2024-12-31',
    status: 'On Track',
    assignedTo: 'Carlos Martinez',
    milestones: [
      { name: 'Farm Partnerships', completed: true, dueDate: '2024-05-01' },
      { name: 'Distribution System', completed: true, dueDate: '2024-07-01' },
      { name: 'Pilot Distribution', completed: true, dueDate: '2024-09-01' },
      { name: 'Full Rollout', completed: false, dueDate: '2024-12-31' },
    ],
  },
];

// Monthly program impact data
export const monthlyImpact = [
  { month: 'Jan', beneficiaries: 1245, activities: 187, satisfaction: 88 },
  { month: 'Feb', beneficiaries: 1312, activities: 203, satisfaction: 89 },
  { month: 'Mar', beneficiaries: 1398, activities: 215, satisfaction: 91 },
  { month: 'Apr', beneficiaries: 1456, activities: 228, satisfaction: 90 },
  { month: 'May', beneficiaries: 1523, activities: 241, satisfaction: 92 },
  { month: 'Jun', beneficiaries: 1489, activities: 234, satisfaction: 91 },
  { month: 'Jul', beneficiaries: 1378, activities: 208, satisfaction: 87 },
  { month: 'Aug', beneficiaries: 1412, activities: 219, satisfaction: 88 },
  { month: 'Sep', beneficiaries: 1654, activities: 267, satisfaction: 93 },
  { month: 'Oct', beneficiaries: 1687, activities: 273, satisfaction: 92 },
  { month: 'Nov', beneficiaries: 1723, activities: 281, satisfaction: 94 },
  { month: 'Dec', beneficiaries: 1760, activities: 289, satisfaction: 93 },
];

export const programsByCategory = [
  { category: 'Education', count: 12, beneficiaries: 342 },
  { category: 'Health', count: 8, beneficiaries: 567 },
  { category: 'Housing', count: 5, beneficiaries: 89 },
  { category: 'Food Security', count: 7, beneficiaries: 823 },
  { category: 'Youth Services', count: 15, beneficiaries: 456 },
  { category: 'Senior Services', count: 6, beneficiaries: 234 },
];
