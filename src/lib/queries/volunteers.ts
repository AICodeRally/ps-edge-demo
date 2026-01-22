import { prisma } from '../db';

export async function getAllVolunteers() {
  return await prisma.volunteer.findMany({
    include: { assignments: true },
    orderBy: { joinDate: 'desc' },
  });
}

export async function getVolunteerById(id: string) {
  return await prisma.volunteer.findUnique({
    where: { id },
    include: { assignments: true },
  });
}

export async function getActiveVolunteers() {
  return await prisma.volunteer.findMany({
    where: { status: 'Active' },
    include: { assignments: true },
  });
}

export async function getVolunteerStats() {
  const volunteers = (await getAllVolunteers()) as Array<{
    status: string;
    totalHours: number;
  }>;

  return {
    total: volunteers.length,
    active: volunteers.filter(v => v.status === 'Active').length,
    totalHours: volunteers.reduce((sum, v) => sum + v.totalHours, 0),
    avgHoursPerVolunteer: volunteers.length > 0 ? volunteers.reduce((sum, v) => sum + v.totalHours, 0) / volunteers.length : 0,
  };
}
