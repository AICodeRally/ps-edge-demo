import { prisma } from '../db';

export async function getAllPrograms() {
  return await prisma.program.findMany({
    include: { projects: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getProgramById(id: string) {
  return await prisma.program.findUnique({
    where: { id },
    include: { projects: true, beneficiaryLinks: { include: { beneficiary: true } } },
  });
}

export async function getProgramsByStatus(status: string) {
  return await prisma.program.findMany({
    where: { status: status as any },
    include: { projects: true },
  });
}

export async function getProgramStats() {
  const programs = (await getAllPrograms()) as Array<{
    status: string;
    budget: number;
    spent: number;
    beneficiaries: number;
  }>;

  return {
    total: programs.length,
    active: programs.filter(p => p.status === 'Active').length,
    totalBudget: programs.reduce((sum, p) => sum + p.budget, 0),
    totalSpent: programs.reduce((sum, p) => sum + p.spent, 0),
    totalBeneficiaries: programs.reduce((sum, p) => sum + p.beneficiaries, 0),
  };
}
