import { z } from 'zod';

/**
 * Universal Agent Contract
 *
 * Provider-agnostic agent definition that works across:
 * - Claude Code agents (.claude/agents/*.md files)
 * - Runtime AI agents (Claude, GPT, Gemini, Codex, Ollama)
 * - Custom/local agents (self-hosted LLMs)
 */

// ============================================================================
// ENUMS
// ============================================================================

export const AgentTypeSchema = z.enum([
  'plan_execute',   // Plans then executes
  'multi_agent',    // Orchestrates other agents
  'rag',            // RAG-powered
  'tool_qa',        // Tool-focused Q&A
  'domain_expert',  // Domain specialist
  'assistant',      // General assistant
]);
export type AgentType = z.infer<typeof AgentTypeSchema>;

export const AgentProviderSchema = z.enum([
  'claude',         // Claude/Anthropic
  'openai',         // OpenAI GPT models
  'anthropic',      // Anthropic API
  'google',         // Google Gemini
  'ollama',         // Ollama local models
  'custom',         // Custom implementations
]);
export type AgentProvider = z.infer<typeof AgentProviderSchema>;

export const AgentScopeSchema = z.enum([
  'platform',       // Platform-wide agent
  'domain',         // Domain-specific (e.g., Sales, Finance)
  'tenant',         // Tenant-specific
  'app',            // App-specific
]);
export type AgentScope = z.infer<typeof AgentScopeSchema>;

export const AgentStatusSchema = z.enum([
  'draft',          // Not yet approved
  'active',         // In production
  'deprecated',     // Being phased out
  'archived',       // No longer used
]);
export type AgentStatus = z.infer<typeof AgentStatusSchema>;

// ============================================================================
// CONFIGURATION SCHEMAS
// ============================================================================

export const SessionManagementSchema = z.object({
  startProcedure: z.string().nullable().optional(),
  endProcedure: z.string().nullable().optional(),
  progressTemplate: z.string().nullable().optional(),
}).nullable().optional();

export const MemoryConfigSchema = z.object({
  enabled: z.boolean().default(false),
  type: z.enum(['conversation', 'vector', 'hybrid']).optional(),
  maxTokens: z.number().optional(),
  persistAcrossSessions: z.boolean().default(false),
}).optional();

export const ProviderConfigSchema = z.object({
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().optional(),
  topP: z.number().min(0).max(1).optional(),
  topK: z.number().optional(),
  // Extensible for provider-specific options
}).passthrough().default({});

// ============================================================================
// MAIN CONTRACT
// ============================================================================

export const AgentContractSchema = z.object({
  // Identity
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with dashes'),
  name: z.string().min(1).max(255),
  description: z.string().nullable().optional(),

  // Classification
  agentType: AgentTypeSchema,
  provider: AgentProviderSchema,
  modelId: z.string().nullable().optional(),  // e.g., "claude-3-opus", "gpt-4", "llama3:70b"

  // Scope
  scope: AgentScopeSchema.default('app'),

  // Core Configuration
  systemPrompt: z.string().nullable().optional(),
  tools: z.array(z.string()).default([]),
  config: ProviderConfigSchema,
  memoryConfig: MemoryConfigSchema,

  // Session Management (Claude Code specific but universal pattern)
  sessionManagement: SessionManagementSchema,

  // Governance
  status: AgentStatusSchema.default('draft'),
  owner: z.string().nullable().optional(),
  version: z.number().default(1),
});

export type AgentContract = z.infer<typeof AgentContractSchema>;

// ============================================================================
// CRUD SCHEMAS
// ============================================================================

export const CreateAgentContractSchema = AgentContractSchema.omit({
  version: true,
});
export type CreateAgentContract = z.infer<typeof CreateAgentContractSchema>;

export const UpdateAgentContractSchema = AgentContractSchema.partial().required({
  slug: true,
});
export type UpdateAgentContract = z.infer<typeof UpdateAgentContractSchema>;

// ============================================================================
// FILTER SCHEMAS
// ============================================================================

export const AgentFiltersSchema = z.object({
  provider: AgentProviderSchema.optional(),
  agentType: AgentTypeSchema.optional(),
  scope: AgentScopeSchema.optional(),
  status: AgentStatusSchema.optional(),
  appRegistryId: z.string().optional(),
  search: z.string().optional(),
}).partial();

export type AgentFilters = z.infer<typeof AgentFiltersSchema>;

// ============================================================================
// MARKDOWN FRONTMATTER SCHEMA
// ============================================================================

/**
 * Schema for parsing YAML frontmatter from .claude/agents/*.md files
 */
export const AgentFrontmatterSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  agent_type: z.string(),
  model: z.string().optional(),
  tools: z.array(z.string()).optional(),
  status: z.string().optional(),
  owner: z.string().optional(),
});

export type AgentFrontmatter = z.infer<typeof AgentFrontmatterSchema>;
