import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync, statSync } from 'fs';
import { join, basename } from 'path';
import { createHash } from 'crypto';
import { prisma } from '../../db/prisma';
import {
  AgentFrontmatterSchema,
  AgentFrontmatter,
  SyncResult,
  SyncRequest,
} from '../contracts';

/**
 * Sync Service
 *
 * Handles bidirectional sync between .claude/agents/*.md files and the database.
 * - Pull: Read files from repos → Create/update DB records
 * - Push: Write DB changes → Update files in repos
 */

// ============================================================================
// YAML FRONTMATTER PARSER
// ============================================================================

/**
 * Parse YAML frontmatter from markdown content.
 * Simple implementation without external dependencies.
 */
function parseFrontmatter(content: string): { frontmatter: Record<string, unknown>; body: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const [, yamlContent, body] = match;
  const frontmatter: Record<string, unknown> = {};

  // Simple YAML parser for our use case
  const lines = yamlContent.split('\n');
  let currentKey: string | null = null;
  let currentArray: string[] | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Array item
    if (trimmed.startsWith('- ') && currentKey && currentArray) {
      currentArray.push(trimmed.slice(2).trim());
      continue;
    }

    // Key-value pair
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      // Save previous array if any
      if (currentKey && currentArray) {
        frontmatter[currentKey] = currentArray;
      }

      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();

      if (value === '') {
        // Start of array
        currentKey = key;
        currentArray = [];
      } else {
        // Scalar value
        currentKey = null;
        currentArray = null;
        frontmatter[key] = value;
      }
    }
  }

  // Save last array if any
  if (currentKey && currentArray) {
    frontmatter[currentKey] = currentArray;
  }

  return { frontmatter, body };
}

/**
 * Generate YAML frontmatter from object
 */
function generateFrontmatter(data: Record<string, unknown>): string {
  const lines: string[] = ['---'];

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) {
        lines.push(`  - ${item}`);
      }
    } else {
      lines.push(`${key}: ${value}`);
    }
  }

  lines.push('---');
  return lines.join('\n');
}

/**
 * Calculate file hash for change detection
 */
function calculateFileHash(content: string): string {
  return createHash('md5').update(content).digest('hex');
}

// ============================================================================
// SYNC SERVICE
// ============================================================================

export class SyncService {
  /**
   * Pull agents from a repo's .claude/agents/ directory into the database
   */
  async pullFromRepo(appId: string): Promise<SyncResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    let agentsProcessed = 0;
    let agentsCreated = 0;
    let agentsUpdated = 0;

    // Get app from database
    const app = await prisma.appRegistry.findUnique({
      where: { id: appId },
    });

    if (!app) {
      return {
        appId,
        appSlug: 'unknown',
        status: 'failed',
        agentsProcessed: 0,
        agentsCreated: 0,
        agentsUpdated: 0,
        agentsDeleted: 0,
        errors: ['App not found'],
        duration: Date.now() - startTime,
      };
    }

    if (!app.repoPath) {
      return {
        appId,
        appSlug: app.slug,
        status: 'failed',
        agentsProcessed: 0,
        agentsCreated: 0,
        agentsUpdated: 0,
        agentsDeleted: 0,
        errors: ['App has no repo path configured'],
        duration: Date.now() - startTime,
      };
    }

    const agentsDir = join(app.repoPath, '.claude', 'agents');

    // Check if agents directory exists
    if (!existsSync(agentsDir)) {
      return {
        appId,
        appSlug: app.slug,
        status: 'success',
        agentsProcessed: 0,
        agentsCreated: 0,
        agentsUpdated: 0,
        agentsDeleted: 0,
        errors: [],
        duration: Date.now() - startTime,
      };
    }

    // Read all .md files
    const files = readdirSync(agentsDir).filter(f =>
      f.endsWith('.md') &&
      !f.startsWith('AGENT_TEMPLATE') &&
      statSync(join(agentsDir, f)).isFile()
    );

    for (const file of files) {
      try {
        const filePath = join(agentsDir, file);
        const content = readFileSync(filePath, 'utf-8');
        const fileHash = calculateFileHash(content);
        const { frontmatter, body } = parseFrontmatter(content);

        // Validate frontmatter
        const validationResult = AgentFrontmatterSchema.safeParse(frontmatter);
        if (!validationResult.success) {
          errors.push(`${file}: Invalid frontmatter - ${validationResult.error.message}`);
          continue;
        }

        const fm = validationResult.data;
        agentsProcessed++;

        // Check if agent already exists
        const existingAgent = await prisma.agentDefinition.findFirst({
          where: {
            slug: fm.slug,
            appRegistryId: appId,
          },
        });

        if (existingAgent) {
          // Check if file has changed
          if (existingAgent.fileHash === fileHash) {
            continue; // No changes
          }

          // Update existing agent
          await prisma.agentDefinition.update({
            where: { id: existingAgent.id },
            data: {
              name: fm.name,
              description: fm.description,
              agentType: fm.agent_type,
              modelId: fm.model,
              tools: fm.tools ?? [],
              status: fm.status ?? 'active',
              systemPrompt: body,
              filePath: `.claude/agents/${file}`,
              fileHash,
              lastFileSync: new Date(),
              version: { increment: 1 },
            },
          });
          agentsUpdated++;
        } else {
          // Create new agent
          await prisma.agentDefinition.create({
            data: {
              slug: fm.slug,
              name: fm.name,
              description: fm.description,
              agentType: fm.agent_type,
              provider: 'claude',
              modelId: fm.model,
              scope: 'app',
              tools: fm.tools ?? [],
              status: fm.status ?? 'active',
              systemPrompt: body,
              filePath: `.claude/agents/${file}`,
              fileHash,
              lastFileSync: new Date(),
              appRegistryId: appId,
              createdBy: fm.owner ?? 'sync',
            },
          });
          agentsCreated++;
        }
      } catch (error) {
        errors.push(`${file}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // Update app sync status
    await prisma.appRegistry.update({
      where: { id: appId },
      data: {
        lastSyncAt: new Date(),
        lastSyncStatus: errors.length === 0 ? 'success' : 'failed',
      },
    });

    return {
      appId,
      appSlug: app.slug,
      status: errors.length === 0 ? 'success' : 'failed',
      agentsProcessed,
      agentsCreated,
      agentsUpdated,
      agentsDeleted: 0,
      errors,
      duration: Date.now() - startTime,
    };
  }

  /**
   * Push an agent from database to its file
   */
  async pushToRepo(agentId: string): Promise<SyncResult> {
    const startTime = Date.now();

    const agent = await prisma.agentDefinition.findUnique({
      where: { id: agentId },
      include: { app: true },
    });

    if (!agent) {
      return {
        appId: '',
        appSlug: 'unknown',
        status: 'failed',
        agentsProcessed: 0,
        agentsCreated: 0,
        agentsUpdated: 0,
        agentsDeleted: 0,
        errors: ['Agent not found'],
        duration: Date.now() - startTime,
      };
    }

    if (!agent.app?.repoPath) {
      return {
        appId: agent.appRegistryId ?? '',
        appSlug: agent.app?.slug ?? 'unknown',
        status: 'failed',
        agentsProcessed: 0,
        agentsCreated: 0,
        agentsUpdated: 0,
        agentsDeleted: 0,
        errors: ['App has no repo path configured'],
        duration: Date.now() - startTime,
      };
    }

    const agentsDir = join(agent.app.repoPath, '.claude', 'agents');

    // Ensure directory exists
    if (!existsSync(agentsDir)) {
      mkdirSync(agentsDir, { recursive: true });
    }

    // Generate frontmatter
    const frontmatter: AgentFrontmatter = {
      name: agent.name,
      slug: agent.slug,
      description: agent.description ?? undefined,
      agent_type: agent.agentType,
      model: agent.modelId ?? undefined,
      tools: (agent.tools as string[]) ?? [],
      status: agent.status,
      owner: agent.createdBy ?? undefined,
    };

    const frontmatterYaml = generateFrontmatter(frontmatter as unknown as Record<string, unknown>);
    const content = `${frontmatterYaml}\n\n${agent.systemPrompt ?? ''}`;
    const fileHash = calculateFileHash(content);

    const filePath = join(agentsDir, `${agent.slug}.md`);
    writeFileSync(filePath, content, 'utf-8');

    // Update agent with file info
    await prisma.agentDefinition.update({
      where: { id: agentId },
      data: {
        filePath: `.claude/agents/${agent.slug}.md`,
        fileHash,
        lastFileSync: new Date(),
      },
    });

    return {
      appId: agent.appRegistryId ?? '',
      appSlug: agent.app.slug,
      status: 'success',
      agentsProcessed: 1,
      agentsCreated: 0,
      agentsUpdated: 1,
      agentsDeleted: 0,
      errors: [],
      duration: Date.now() - startTime,
    };
  }

  /**
   * Sync all apps or a specific app
   */
  async sync(request: SyncRequest): Promise<SyncResult[]> {
    const results: SyncResult[] = [];

    if (request.appId) {
      // Sync specific app
      if (request.direction === 'pull' || request.direction === 'both') {
        results.push(await this.pullFromRepo(request.appId));
      }
    } else {
      // Sync all apps
      const apps = await prisma.appRegistry.findMany({
        where: { status: 'active' },
      });

      for (const app of apps) {
        if (request.direction === 'pull' || request.direction === 'both') {
          results.push(await this.pullFromRepo(app.id));
        }
      }
    }

    return results;
  }

  /**
   * Get sync status for all apps
   */
  async getSyncStatus(): Promise<{
    lastGlobalSync: Date | null;
    apps: Array<{
      id: string;
      slug: string;
      name: string;
      lastSyncAt: Date | null;
      lastSyncStatus: string | null;
      agentCount: number;
    }>;
  }> {
    const apps = await prisma.appRegistry.findMany({
      include: {
        _count: {
          select: { agents: true },
        },
      },
      orderBy: { lastSyncAt: 'desc' },
    });

    const lastGlobalSync = apps.length > 0 && apps[0].lastSyncAt
      ? apps[0].lastSyncAt
      : null;

    return {
      lastGlobalSync,
      apps: apps.map((app: {
        id: string;
        slug: string;
        name: string;
        lastSyncAt: Date | null;
        lastSyncStatus: string | null;
        _count: { agents: number };
      }) => ({
        id: app.id,
        slug: app.slug,
        name: app.name,
        lastSyncAt: app.lastSyncAt,
        lastSyncStatus: app.lastSyncStatus,
        agentCount: app._count.agents,
      })),
    };
  }
}

export const syncService = new SyncService();
