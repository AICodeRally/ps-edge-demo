/**
 * Prisma Client Singleton
 * Ensures single Prisma Client instance in development to avoid connection exhaustion
 */

type PrismaClient = any

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function getPrismaClient(): PrismaClient {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required to initialize Prisma.')
  }

  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma
  }

  // Lazy-require to avoid build-time dependency on generated Prisma types.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { PrismaClient } = require('@prisma/client') as {
    PrismaClient: new (args?: Record<string, unknown>) => PrismaClient
  }

  const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
  }

  return prisma
}

let prismaInstance: PrismaClient | undefined

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (!prismaInstance) {
      prismaInstance = getPrismaClient()
    }
    return (prismaInstance as any)[prop]
  },
})
