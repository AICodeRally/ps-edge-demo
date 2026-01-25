import { prisma } from '../../db/prisma';
import {
  AgentContract,
  CreateAgentContract,
  UpdateAgentContract,
  AgentFilters,
  AgentContractSchema,
} from '../contracts';

/**
 * Agent Definition Service
 *
 * CRUD operations for agent definitions with versioning support.
 */

// Type for Prisma agent record
interface PrismaAgentDefinition {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  agentType: string;
  provider: string;
  modelId: string | null;
  scope: string;
  appRegistryId: string | null;
  tenantId: string | null;
  systemPrompt: string | null;
  tools: unknown;
  config: unknown;
  memoryConfig: unknown;
  sessionStartProcedure: string | null;
  sessionEndProcedure: string | null;
  progressTemplate: string | null;
  filePath: string | null;
  fileHash: string | null;
  lastFileSync: Date | null;
  status: string;
  version: number;
  approvedBy: string | null;
  approvedAt: Date | null;
  createdBy: string | null;
  createdAt: Date;
  updatedAt: Date;
  app?: {
    id: string;
    slug: string;
    name: string;
  } | null;
}

/**
 * Convert Prisma record to AgentContract
 */
function toAgentContract(record: PrismaAgentDefinition): AgentContract {
  return AgentContractSchema.parse({
    slug: record.slug,
    name: record.name,
    description: record.description,
    agentType: record.agentType,
    provider: record.provider,
    modelId: record.modelId,
    scope: record.scope,
    systemPrompt: record.systemPrompt,
    tools: record.tools ?? [],
    config: record.config ?? {},
    memoryConfig: record.memoryConfig,
    sessionManagement: {
      startProcedure: record.sessionStartProcedure,
      endProcedure: record.sessionEndProcedure,
      progressTemplate: record.progressTemplate,
    },
    status: record.status,
    owner: record.createdBy,
    version: record.version,
  });
}

export class AgentDefinitionService {
  /**
   * Get all agent definitions with optional filtering
   */
  async getAll(filters: AgentFilters = {}): Promise<(AgentContract & { id: string; appSlug?: string })[]> {
    const where: Record<string, unknown> = {};

    if (filters.provider) {
      where.provider = filters.provider;
    }
    if (filters.agentType) {
      where.agentType = filters.agentType;
    }
    if (filters.scope) {
      where.scope = filters.scope;
    }
    if (filters.status) {
      where.status = filters.status;
    }
    if (filters.appRegistryId) {
      where.appRegistryId = filters.appRegistryId;
    }
    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { slug: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const agents = await prisma.agentDefinition.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        app: {
          select: { id: true, slug: true, name: true },
        },
      },
    });

    return agents.map((agent: PrismaAgentDefinition) => ({
      id: agent.id,
      appSlug: agent.app?.slug,
      ...toAgentContract(agent),
    }));
  }

  /**
   * Get a single agent by ID
   */
  async getById(id: string): Promise<(AgentContract & { id: string }) | null> {
    const agent = await prisma.agentDefinition.findUnique({
      where: { id },
      include: {
        app: true,
        versions: {
          orderBy: { version: 'desc' },
          take: 5,
        },
      },
    });

    if (!agent) return null;
    return { id: agent.id, ...toAgentContract(agent) };
  }

  /**
   * Get a single agent by slug and app
   */
  async getBySlugAndApp(slug: string, appRegistryId?: string): Promise<(AgentContract & { id: string }) | null> {
    const agent = await prisma.agentDefinition.findFirst({
      where: {
        slug,
        appRegistryId: appRegistryId ?? null,
      },
      include: {
        app: true,
      },
    });

    if (!agent) return null;
    return { id: agent.id, ...toAgentContract(agent) };
  }

  /**
   * Create a new agent definition
   */
  async create(
    data: CreateAgentContract,
    appRegistryId?: string,
    createdBy?: string
  ): Promise<AgentContract & { id: string }> {
    const agent = await prisma.agentDefinition.create({
      data: {
        slug: data.slug,
        name: data.name,
        description: data.description,
        agentType: data.agentType,
        provider: data.provider,
        modelId: data.modelId,
        scope: data.scope ?? 'app',
        systemPrompt: data.systemPrompt,
        tools: data.tools ?? [],
        config: data.config ?? {},
        memoryConfig: data.memoryConfig ?? {},
        sessionStartProcedure: data.sessionManagement?.startProcedure,
        sessionEndProcedure: data.sessionManagement?.endProcedure,
        progressTemplate: data.sessionManagement?.progressTemplate,
        status: data.status ?? 'draft',
        appRegistryId,
        createdBy,
      },
    });

    return { id: agent.id, ...toAgentContract(agent) };
  }

  /**
   * Update an existing agent definition with versioning
   */
  async update(
    id: string,
    data: UpdateAgentContract,
    changeReason?: string,
    changedBy?: string
  ): Promise<AgentContract & { id: string }> {
    // Get current agent for versioning
    const current = await prisma.agentDefinition.findUnique({
      where: { id },
    });

    if (!current) {
      throw new Error(`Agent with id ${id} not found`);
    }

    // Create version snapshot before update
    await prisma.agentDefinitionVersion.create({
      data: {
        agentDefinitionId: id,
        version: current.version,
        name: current.name,
        description: current.description,
        agentType: current.agentType,
        provider: current.provider,
        systemPrompt: current.systemPrompt,
        tools: current.tools,
        config: current.config,
        changeReason,
        changedBy,
      },
    });

    // Update agent
    const agent = await prisma.agentDefinition.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        agentType: data.agentType,
        provider: data.provider,
        modelId: data.modelId,
        scope: data.scope,
        systemPrompt: data.systemPrompt,
        tools: data.tools,
        config: data.config,
        memoryConfig: data.memoryConfig,
        sessionStartProcedure: data.sessionManagement?.startProcedure,
        sessionEndProcedure: data.sessionManagement?.endProcedure,
        progressTemplate: data.sessionManagement?.progressTemplate,
        status: data.status,
        version: { increment: 1 },
      },
    });

    return { id: agent.id, ...toAgentContract(agent) };
  }

  /**
   * Delete an agent definition
   */
  async delete(id: string): Promise<void> {
    await prisma.agentDefinition.delete({
      where: { id },
    });
  }

  /**
   * Approve an agent definition
   */
  async approve(id: string, approvedBy: string): Promise<AgentContract & { id: string }> {
    const agent = await prisma.agentDefinition.update({
      where: { id },
      data: {
        status: 'active',
        approvedBy,
        approvedAt: new Date(),
      },
    });

    return { id: agent.id, ...toAgentContract(agent) };
  }

  /**
   * Deprecate an agent definition
   */
  async deprecate(id: string): Promise<AgentContract & { id: string }> {
    const agent = await prisma.agentDefinition.update({
      where: { id },
      data: {
        status: 'deprecated',
      },
    });

    return { id: agent.id, ...toAgentContract(agent) };
  }

  /**
   * Get version history for an agent
   */
  async getVersionHistory(agentId: string): Promise<unknown[]> {
    return prisma.agentDefinitionVersion.findMany({
      where: { agentDefinitionId: agentId },
      orderBy: { version: 'desc' },
    });
  }

  /**
   * Update file sync information
   */
  async updateFileSync(
    id: string,
    filePath: string,
    fileHash: string
  ): Promise<void> {
    await prisma.agentDefinition.update({
      where: { id },
      data: {
        filePath,
        fileHash,
        lastFileSync: new Date(),
      },
    });
  }

  /**
   * Get agent statistics
   */
  async getStats(): Promise<{
    total: number;
    byProvider: Record<string, number>;
    byStatus: Record<string, number>;
    byType: Record<string, number>;
    pendingReview: number;
  }> {
    const agents = await prisma.agentDefinition.findMany({
      select: { provider: true, status: true, agentType: true },
    });

    const byProvider: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};

    agents.forEach((agent: { provider: string; status: string; agentType: string }) => {
      byProvider[agent.provider] = (byProvider[agent.provider] || 0) + 1;
      byStatus[agent.status] = (byStatus[agent.status] || 0) + 1;
      byType[agent.agentType] = (byType[agent.agentType] || 0) + 1;
    });

    return {
      total: agents.length,
      byProvider,
      byStatus,
      byType,
      pendingReview: byStatus['draft'] || 0,
    };
  }
}

export const agentDefinitionService = new AgentDefinitionService();
