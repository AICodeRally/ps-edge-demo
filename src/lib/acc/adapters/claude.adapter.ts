import { AgentContract, AgentFrontmatter } from '../contracts';

/**
 * Claude Adapter
 *
 * Handles translation between:
 * - Universal AgentContract format
 * - Claude Code .md file format (YAML frontmatter + markdown body)
 */

/**
 * Model ID mappings for Claude Code
 */
const CLAUDE_MODELS: Record<string, string> = {
  'sonnet': 'claude-sonnet-4-20250514',
  'opus': 'claude-opus-4-5-20251101',
  'haiku': 'claude-haiku-3-5-20241022',
};

const MODEL_SHORT_NAMES: Record<string, string> = {
  'claude-sonnet-4-20250514': 'sonnet',
  'claude-opus-4-5-20251101': 'opus',
  'claude-haiku-3-5-20241022': 'haiku',
};

/**
 * Convert AgentContract to Claude frontmatter format
 */
export function contractToFrontmatter(contract: AgentContract): AgentFrontmatter {
  const modelShortName = contract.modelId
    ? MODEL_SHORT_NAMES[contract.modelId] ?? contract.modelId
    : undefined;

  return {
    name: contract.name,
    slug: contract.slug,
    description: contract.description,
    agent_type: contract.agentType,
    model: modelShortName,
    tools: contract.tools,
    status: contract.status,
    owner: contract.owner,
  };
}

/**
 * Convert Claude frontmatter to AgentContract format
 */
export function frontmatterToContract(
  frontmatter: AgentFrontmatter,
  systemPrompt?: string
): Partial<AgentContract> {
  const modelId = frontmatter.model
    ? CLAUDE_MODELS[frontmatter.model] ?? frontmatter.model
    : undefined;

  return {
    slug: frontmatter.slug,
    name: frontmatter.name,
    description: frontmatter.description,
    agentType: frontmatter.agent_type as AgentContract['agentType'],
    provider: 'claude',
    modelId,
    tools: frontmatter.tools ?? [],
    status: (frontmatter.status ?? 'draft') as AgentContract['status'],
    owner: frontmatter.owner,
    systemPrompt,
  };
}

/**
 * Get valid tools for Claude Code agents
 */
export function getValidClaudeTools(): string[] {
  return [
    'Bash',
    'Read',
    'Write',
    'Edit',
    'Grep',
    'Glob',
    'LS',
    'Task',
    'WebFetch',
    'WebSearch',
    'NotebookEdit',
    'NotebookRead',
    'TodoWrite',
  ];
}

/**
 * Validate tools for Claude provider
 */
export function validateClaudeTools(tools: string[]): {
  valid: boolean;
  errors: string[];
} {
  const validTools = getValidClaudeTools();
  const errors: string[] = [];

  for (const tool of tools) {
    if (!validTools.includes(tool)) {
      errors.push(`Invalid tool: ${tool}. Valid tools: ${validTools.join(', ')}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Get provider-specific configuration defaults
 */
export function getClaudeDefaults(): Partial<AgentContract['config']> {
  return {
    temperature: 1,
    maxTokens: undefined, // Uses model default
    topP: undefined,
  };
}

/**
 * Validate provider-specific configuration
 */
export function validateClaudeConfig(config: AgentContract['config']): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (config.temperature !== undefined) {
    if (config.temperature < 0 || config.temperature > 1) {
      errors.push('Claude temperature must be between 0 and 1');
    }
  }

  if (config.maxTokens !== undefined) {
    if (config.maxTokens < 1 || config.maxTokens > 200000) {
      errors.push('Claude maxTokens must be between 1 and 200000');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
