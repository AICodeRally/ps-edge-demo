import { prisma } from '../db';

export async function getAllDonors() {
  return await prisma.donor.findMany({
    include: { donations: true },
    orderBy: { totalGiving: 'desc' },
  });
}

export async function getDonorById(id: string) {
  return await prisma.donor.findUnique({
    where: { id },
    include: { donations: { orderBy: { date: 'desc' } } },
  });
}

export async function getDonorsByStatus(status: string) {
  return await prisma.donor.findMany({
    where: { status: status as any },
    include: { donations: true },
  });
}

export async function getDonorStats() {
  const donors = (await getAllDonors()) as Array<{ status: string }>;
  const donations = (await prisma.donation.findMany()) as Array<{
    amount: number;
    recurring: boolean;
  }>;

  return {
    totalDonors: donors.length,
    activeDonors: donors.filter(d => d.status === 'Active').length,
    totalRaised: donations.reduce((sum, d) => sum + d.amount, 0),
    avgDonation: donations.length > 0 ? donations.reduce((sum, d) => sum + d.amount, 0) / donations.length : 0,
    recurringDonors: donations.filter(d => d.recurring).length,
  };
}

export async function getAllCampaigns() {
  return await prisma.campaign.findMany({
    orderBy: { startDate: 'desc' },
  });
}

export async function getAllGrants() {
  return await prisma.grant.findMany({
    orderBy: { applicationDate: 'desc' },
  });
}
