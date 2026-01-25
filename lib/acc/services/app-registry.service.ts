import { prisma } from '../../db/prisma';
import {
  AppRegistry,
  CreateAppRegistry,
  UpdateAppRegistry,
  AppRegistryFilters,
  AppRegistrySchema,
} from '../contracts';

/**
 * App Registry Service
 *
 * CRUD operations for registered applications that can have agent infrastructure.
 */

export class AppRegistryService {
  /**
   * Get all registered apps with optional filtering
   */
  async getAll(filters: AppRegistryFilters = {}): Promise<AppRegistry[]> {
    const where: Record<string, unknown> = {};

    if (filters.tier) {
      where.tier = filters.tier;
    }
    if (filters.status) {
      where.status = filters.status;
    }
    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { slug: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const apps = await prisma.appRegistry.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        agents: {
          select: { id: true, slug: true, name: true, status: true },
        },
      },
    });

    return apps.map((app: Record<string, unknown>) => AppRegistrySchema.parse(app));
  }

  /**
   * Get a single app by ID
   */
  async getById(id: string): Promise<AppRegistry | null> {
    const app = await prisma.appRegistry.findUnique({
      where: { id },
      include: {
        agents: true,
      },
    });

    if (!app) return null;
    return AppRegistrySchema.parse(app);
  }

  /**
   * Get a single app by slug
   */
  async getBySlug(slug: string): Promise<AppRegistry | null> {
    const app = await prisma.appRegistry.findUnique({
      where: { slug },
      include: {
        agents: true,
      },
    });

    if (!app) return null;
    return AppRegistrySchema.parse(app);
  }

  /**
   * Create a new app registration
   */
  async create(data: CreateAppRegistry): Promise<AppRegistry> {
    const app = await prisma.appRegistry.create({
      data: {
        slug: data.slug,
        name: data.name,
        description: data.description,
        repoPath: data.repoPath,
        repoUrl: data.repoUrl,
        port: data.port,
        hostname: data.hostname,
        tier: data.tier ?? 'demo',
        status: data.status ?? 'active',
        config: data.config ?? {},
      },
    });

    return AppRegistrySchema.parse(app);
  }

  /**
   * Update an existing app registration
   */
  async update(data: UpdateAppRegistry): Promise<AppRegistry> {
    const { id, ...updateData } = data;

    const app = await prisma.appRegistry.update({
      where: { id },
      data: updateData,
    });

    return AppRegistrySchema.parse(app);
  }

  /**
   * Delete an app registration
   */
  async delete(id: string): Promise<void> {
    await prisma.appRegistry.delete({
      where: { id },
    });
  }

  /**
   * Update sync status for an app
   */
  async updateSyncStatus(
    id: string,
    status: 'success' | 'failed' | 'pending'
  ): Promise<void> {
    await prisma.appRegistry.update({
      where: { id },
      data: {
        lastSyncAt: new Date(),
        lastSyncStatus: status,
      },
    });
  }

  /**
   * Get app statistics
   */
  async getStats(): Promise<{
    total: number;
    byTier: Record<string, number>;
    byStatus: Record<string, number>;
    totalAgents: number;
  }> {
    const [apps, agentCount] = await Promise.all([
      prisma.appRegistry.findMany({
        select: { tier: true, status: true },
      }),
      prisma.agentDefinition.count(),
    ]);

    const byTier: Record<string, number> = {};
    const byStatus: Record<string, number> = {};

    apps.forEach((app: { tier: string; status: string }) => {
      byTier[app.tier] = (byTier[app.tier] || 0) + 1;
      byStatus[app.status] = (byStatus[app.status] || 0) + 1;
    });

    return {
      total: apps.length,
      byTier,
      byStatus,
      totalAgents: agentCount,
    };
  }
}

export const appRegistryService = new AppRegistryService();
