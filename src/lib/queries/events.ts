import { prisma } from '../db';

export async function getAllEvents() {
  return await prisma.event.findMany({
    include: { registrations: true },
    orderBy: { startDate: 'desc' },
  });
}

export async function getEventById(id: string) {
  return await prisma.event.findUnique({
    where: { id },
    include: { registrations: true },
  });
}

export async function getUpcomingEvents() {
  return await prisma.event.findMany({
    where: {
      startDate: {
        gte: new Date(),
      },
      status: {
        not: 'Cancelled',
      },
    },
    include: { registrations: true },
    orderBy: { startDate: 'asc' },
  });
}

export async function getEventStats() {
  const events = (await getAllEvents()) as Array<{
    startDate: string | Date;
    registered: number;
    raised: number | null;
  }>;

  return {
    total: events.length,
    upcoming: events.filter(e => new Date(e.startDate) > new Date()).length,
    totalRegistrations: events.reduce((sum, e) => sum + e.registered, 0),
    totalRaised: events.reduce((sum, e) => sum + (e.raised || 0), 0),
  };
}
