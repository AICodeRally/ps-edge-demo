import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding AFFCF nonprofit data...');

  // Clean existing data
  await prisma.eventRegistration.deleteMany();
  await prisma.event.deleteMany();
  await prisma.volunteerAssignment.deleteMany();
  await prisma.volunteer.deleteMany();
  await prisma.donation.deleteMany();
  await prisma.donor.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.grant.deleteMany();
  await prisma.beneficiaryProgram.deleteMany();
  await prisma.beneficiary.deleteMany();
  await prisma.programProject.deleteMany();
  await prisma.program.deleteMany();
  await prisma.filing.deleteMany();
  await prisma.outreach.deleteMany();

  // ============================================================================
  // PROGRAMS
  // ============================================================================

  const programs = await Promise.all([
    prisma.program.create({
      data: {
        name: 'Keys to Success',
        category: 'YouthServices',
        status: 'Active',
        description: 'Mentorship program pairing foster youth with caring adults',
        budget: 285000,
        spent: 178000,
        beneficiaries: 142,
        targetBeneficiaries: 200,
        startDate: new Date('2024-01-01'),
        manager: 'Sarah Johnson',
        impact: {
          mentorships: 142,
          graduationRate: 0.87,
          collegeEnrollment: 0.62,
        },
      },
    }),
    prisma.program.create({
      data: {
        name: 'Educational Support',
        category: 'Education',
        status: 'Active',
        description: 'Tutoring, school supplies, and field trips for foster children',
        budget: 420000,
        spent: 312000,
        beneficiaries: 856,
        targetBeneficiaries: 1000,
        startDate: new Date('2023-08-01'),
        manager: 'Michael Chen',
        impact: {
          tutoringHours: 4200,
          suppliesProvided: 856,
          fieldTrips: 24,
        },
      },
    }),
    prisma.program.create({
      data: {
        name: 'Scholarship Program',
        category: 'Education',
        status: 'Active',
        description: 'College and vocational scholarships for foster youth',
        budget: 650000,
        spent: 485000,
        beneficiaries: 187,
        targetBeneficiaries: 200,
        startDate: new Date('2024-01-01'),
        manager: 'Jennifer Martinez',
        impact: {
          scholarshipsAwarded: 187,
          totalAmount: 485000,
          collegeRetention: 0.91,
        },
      },
    }),
    prisma.program.create({
      data: {
        name: 'Transition Services',
        category: 'YouthServices',
        status: 'Active',
        description: 'Support for youth aging out of foster care (18-21)',
        budget: 340000,
        spent: 198000,
        beneficiaries: 89,
        targetBeneficiaries: 120,
        startDate: new Date('2024-01-01'),
        manager: 'David Williams',
        impact: {
          housingSupport: 45,
          jobPlacements: 67,
          lifeSkillsTraining: 89,
        },
      },
    }),
    prisma.program.create({
      data: {
        name: 'Activity Funding',
        category: 'YouthServices',
        status: 'Active',
        description: 'Extracurricular activities, sports, and arts for foster children',
        budget: 175000,
        spent: 142000,
        beneficiaries: 423,
        targetBeneficiaries: 500,
        startDate: new Date('2024-01-01'),
        manager: 'Lisa Thompson',
        impact: {
          sportsRegistrations: 156,
          artsPrograms: 98,
          summerCamps: 169,
        },
      },
    }),
    prisma.program.create({
      data: {
        name: 'Life Skills Training',
        category: 'YouthServices',
        status: 'Active',
        description: 'Driver education, job readiness, and financial literacy',
        budget: 225000,
        spent: 167000,
        beneficiaries: 234,
        targetBeneficiaries: 300,
        startDate: new Date('2024-01-01'),
        manager: 'Robert Garcia',
        impact: {
          driversLicenses: 78,
          jobReadiness: 156,
          financialLiteracy: 234,
        },
      },
    }),
  ]);

  console.log(`✅ Created ${programs.length} programs`);

  // ============================================================================
  // BENEFICIARIES
  // ============================================================================

  const beneficiaries = await Promise.all([
    ...Array.from({ length: 25 }, (_, i) =>
      prisma.beneficiary.create({
        data: {
          name: `Foster Youth ${i + 1}`,
          age: 12 + Math.floor(Math.random() * 9), // Ages 12-20
          enrollmentDate: new Date(2024, Math.floor(Math.random() * 12), 1),
          status: Math.random() > 0.2 ? 'Active' : 'Graduated',
          attendanceRate: 0.75 + Math.random() * 0.25,
          outcomes: {
            academicProgress: Math.random() > 0.3 ? 'Improved' : 'Stable',
            behavioralGoals: Math.floor(Math.random() * 4) + 1,
            socialConnections: Math.floor(Math.random() * 5) + 2,
          },
          demographics: {
            grade: 6 + Math.floor(Math.random() * 7),
            school: ['Phoenix High', 'Mesa Middle', 'Tempe Academy'][Math.floor(Math.random() * 3)],
          },
        },
      })
    ),
  ]);

  console.log(`✅ Created ${beneficiaries.length} beneficiaries`);

  // ============================================================================
  // DONORS
  // ============================================================================

  const donors = await Promise.all([
    // Major Individual Donors
    prisma.donor.create({
      data: {
        name: 'James & Patricia Anderson',
        email: 'janderson@example.com',
        phone: '602-555-0101',
        type: 'Individual',
        totalGiving: 125000,
        lastGift: new Date('2024-12-15'),
        lastGiftAmount: 25000,
        status: 'Active',
        memberSince: new Date('2018-03-15'),
        tags: ['Major Donor', 'Board Member'],
        engagementScore: 95,
      },
    }),
    prisma.donor.create({
      data: {
        name: 'Robert & Susan Mitchell',
        email: 'rmitchell@example.com',
        phone: '480-555-0102',
        type: 'Individual',
        totalGiving: 87500,
        lastGift: new Date('2024-11-20'),
        lastGiftAmount: 15000,
        status: 'Active',
        memberSince: new Date('2019-06-01'),
        tags: ['Major Donor', 'Monthly Sustainer'],
        engagementScore: 88,
      },
    }),

    // Corporate Sponsors
    prisma.donor.create({
      data: {
        name: 'Desert Financial Credit Union',
        email: 'community@desertfinancial.com',
        phone: '602-555-0201',
        type: 'Corporate',
        totalGiving: 250000,
        lastGift: new Date('2024-12-01'),
        lastGiftAmount: 50000,
        status: 'Active',
        memberSince: new Date('2017-01-15'),
        tags: ['Platinum Sponsor', 'Scholarship Fund'],
        engagementScore: 92,
      },
    }),
    prisma.donor.create({
      data: {
        name: 'Arizona Public Service (APS)',
        email: 'giving@aps.com',
        phone: '602-555-0202',
        type: 'Corporate',
        totalGiving: 175000,
        lastGift: new Date('2024-10-15'),
        lastGiftAmount: 35000,
        status: 'Active',
        memberSince: new Date('2016-05-01'),
        tags: ['Gold Sponsor', 'Employee Match'],
        engagementScore: 85,
      },
    }),

    // Foundations
    prisma.donor.create({
      data: {
        name: 'Arizona Community Foundation',
        email: 'grants@azfoundation.org',
        type: 'Foundation',
        totalGiving: 450000,
        lastGift: new Date('2024-09-30'),
        lastGiftAmount: 150000,
        status: 'Active',
        memberSince: new Date('2015-01-01'),
        tags: ['Major Funder', 'Multi-Year Grant'],
        engagementScore: 90,
      },
    }),
    prisma.donor.create({
      data: {
        name: 'Virginia G. Piper Charitable Trust',
        email: 'info@pipertrust.org',
        type: 'Foundation',
        totalGiving: 600000,
        lastGift: new Date('2024-08-15'),
        lastGiftAmount: 200000,
        status: 'Active',
        memberSince: new Date('2014-03-01'),
        tags: ['Major Funder', 'Program Support'],
        engagementScore: 95,
      },
    }),

    // Mid-Level & Annual Donors
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.donor.create({
        data: {
          name: `Donor ${i + 1}`,
          email: `donor${i + 1}@example.com`,
          type: Math.random() > 0.7 ? 'Corporate' : 'Individual',
          totalGiving: Math.floor(Math.random() * 15000) + 1000,
          lastGift: new Date(2024, Math.floor(Math.random() * 12), 15),
          lastGiftAmount: Math.floor(Math.random() * 3000) + 500,
          status: Math.random() > 0.15 ? 'Active' : 'Lapsed',
          memberSince: new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), 1),
          tags: Math.random() > 0.5 ? ['Annual Fund'] : ['Event Sponsor'],
          engagementScore: Math.floor(Math.random() * 40) + 40,
        },
      })
    ),
  ]);

  console.log(`✅ Created ${donors.length} donors`);

  // ============================================================================
  // CAMPAIGNS
  // ============================================================================

  const campaigns = await Promise.all([
    prisma.campaign.create({
      data: {
        name: '2024 Annual Appeal',
        goal: 500000,
        raised: 387500,
        donors: 342,
        startDate: new Date('2024-09-01'),
        endDate: new Date('2024-12-31'),
        status: 'Active',
        type: 'Annual',
        description: 'Support all AFFCF programs throughout the year',
      },
    }),
    prisma.campaign.create({
      data: {
        name: 'Keys to Success Capital Campaign',
        goal: 2000000,
        raised: 1450000,
        donors: 89,
        startDate: new Date('2023-01-01'),
        endDate: new Date('2025-12-31'),
        status: 'Active',
        type: 'Capital',
        description: 'Expand mentorship program to serve 500 youth annually',
      },
    }),
    prisma.campaign.create({
      data: {
        name: 'Spring Gala 2024',
        goal: 150000,
        raised: 178500,
        donors: 124,
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-04-15'),
        status: 'Completed',
        type: 'SpecialEvent',
        description: 'Annual gala fundraiser',
      },
    }),
  ]);

  console.log(`✅ Created ${campaigns.length} campaigns`);

  // ============================================================================
  // VOLUNTEERS
  // ============================================================================

  const volunteers = await Promise.all([
    prisma.volunteer.create({
      data: {
        name: 'Emily Rodriguez',
        email: 'emily.r@example.com',
        phone: '602-555-1001',
        status: 'Active',
        joinDate: new Date('2022-06-15'),
        totalHours: 245,
        skills: ['Tutoring', 'Mentoring', 'Event Planning'],
        interests: ['Education', 'Youth Development'],
      },
    }),
    prisma.volunteer.create({
      data: {
        name: 'Michael Chang',
        email: 'mchang@example.com',
        phone: '480-555-1002',
        status: 'Active',
        joinDate: new Date('2023-01-10'),
        totalHours: 189,
        skills: ['College Prep', 'Career Counseling', 'Resume Writing'],
        interests: ['Higher Education', 'Career Development'],
      },
    }),
    prisma.volunteer.create({
      data: {
        name: 'Sarah Williams',
        email: 'swilliams@example.com',
        phone: '623-555-1003',
        status: 'Active',
        joinDate: new Date('2021-09-01'),
        totalHours: 412,
        skills: ['Mentoring', 'Life Skills', 'Driver Training'],
        interests: ['Youth Empowerment', 'Independence Skills'],
      },
    }),
    ...Array.from({ length: 12 }, (_, i) =>
      prisma.volunteer.create({
        data: {
          name: `Volunteer ${i + 4}`,
          email: `volunteer${i + 4}@example.com`,
          status: Math.random() > 0.2 ? 'Active' : 'Inactive',
          joinDate: new Date(2022 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 12), 1),
          totalHours: Math.floor(Math.random() * 200) + 20,
          skills: ['Tutoring', 'Mentoring'][Math.floor(Math.random() * 2)] ? ['Tutoring'] : ['Mentoring'],
          interests: ['Education', 'Youth Services'],
        },
      })
    ),
  ]);

  console.log(`✅ Created ${volunteers.length} volunteers`);

  // ============================================================================
  // EVENTS
  // ============================================================================

  const events = await Promise.all([
    prisma.event.create({
      data: {
        name: 'Annual Gala 2025',
        type: 'Fundraiser',
        status: 'Planned',
        startDate: new Date('2025-04-12'),
        location: 'Phoenix Convention Center',
        description: 'Annual fundraising gala supporting all AFFCF programs',
        capacity: 400,
        registered: 0,
        goal: 200000,
        raised: 0,
        coordinator: 'Sarah Johnson',
      },
    }),
    prisma.event.create({
      data: {
        name: 'Volunteer Appreciation Lunch',
        type: 'Community',
        status: 'Active',
        startDate: new Date('2025-02-15'),
        location: 'AFFCF Center',
        description: 'Thank you event for our amazing volunteers',
        capacity: 150,
        registered: 67,
        coordinator: 'Michael Chen',
      },
    }),
    prisma.event.create({
      data: {
        name: 'College Prep Workshop',
        type: 'Training',
        status: 'Active',
        startDate: new Date('2025-02-28'),
        location: 'Mesa Community College',
        description: 'SAT prep and college application workshop',
        capacity: 60,
        registered: 42,
        coordinator: 'Jennifer Martinez',
      },
    }),
    prisma.event.create({
      data: {
        name: 'Fall Festival 2024',
        type: 'Community',
        status: 'Completed',
        startDate: new Date('2024-10-26'),
        location: 'Tempe Beach Park',
        description: 'Family-friendly fall festival',
        capacity: 500,
        registered: 487,
        goal: 15000,
        raised: 18500,
        coordinator: 'Lisa Thompson',
      },
    }),
  ]);

  console.log(`✅ Created ${events.length} events`);

  // ============================================================================
  // GRANTS
  // ============================================================================

  const grants = await Promise.all([
    prisma.grant.create({
      data: {
        funder: 'Arizona Community Foundation',
        program: 'Educational Support',
        amount: 150000,
        status: 'Awarded',
        applicationDate: new Date('2024-02-01'),
        decisionDate: new Date('2024-05-15'),
        reportDue: new Date('2025-05-31'),
        purpose: 'Tutoring and school supplies for foster youth',
      },
    }),
    prisma.grant.create({
      data: {
        funder: 'Virginia G. Piper Charitable Trust',
        program: 'Keys to Success',
        amount: 200000,
        status: 'Awarded',
        applicationDate: new Date('2023-11-01'),
        decisionDate: new Date('2024-02-28'),
        reportDue: new Date('2025-02-28'),
        purpose: 'Mentorship program expansion',
      },
    }),
    prisma.grant.create({
      data: {
        funder: 'First Things First',
        program: 'Life Skills Training',
        amount: 75000,
        status: 'UnderReview',
        applicationDate: new Date('2024-12-01'),
        purpose: 'Driver education and job readiness',
      },
    }),
  ]);

  console.log(`✅ Created ${grants.length} grants`);

  // ============================================================================
  // FILINGS
  // ============================================================================

  const filings = await Promise.all([
    prisma.filing.create({
      data: {
        category: 'IRS990',
        name: 'Form 990 - Tax Year 2024',
        formType: '990',
        description: 'Annual IRS Form 990 filing',
        dueDate: new Date('2025-05-15'),
        status: 'NotStarted',
        priority: 'Critical',
        completion: 0,
        assignedTo: 'Finance Director',
      },
    }),
    prisma.filing.create({
      data: {
        category: 'State',
        name: 'Arizona Annual Report',
        formType: 'ACC-501',
        description: 'Arizona Corporation Commission annual report',
        dueDate: new Date('2025-04-30'),
        status: 'InProgress',
        priority: 'High',
        completion: 45,
        assignedTo: 'Executive Director',
      },
    }),
    prisma.filing.create({
      data: {
        category: 'Grant',
        name: 'ACF Grant Report - Educational Support',
        description: 'Arizona Community Foundation grant reporting',
        dueDate: new Date('2025-05-31'),
        status: 'PendingReview',
        priority: 'High',
        completion: 85,
        assignedTo: 'Program Manager',
      },
    }),
  ]);

  console.log(`✅ Created ${filings.length} filings`);

  console.log('✅ Seed data complete!');
  console.log(`
📊 Summary:
- ${programs.length} programs
- ${beneficiaries.length} beneficiaries
- ${donors.length} donors
- ${campaigns.length} campaigns
- ${volunteers.length} volunteers
- ${events.length} events
- ${grants.length} grants
- ${filings.length} filings
  `);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
