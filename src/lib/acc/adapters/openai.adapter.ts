import { AgentContract } from '../contracts';

/**
 * OpenAI Adapter
 *
 * Handles translation between:
 * - Universal AgentContract format
 * - OpenAI API assistant configuration
 */

/**
 * Model ID mappings for OpenAI
 */
const OPENAI_MODELS: Record<string, string> = {
  'gpt-4': 'gpt-4-turbo-preview',
  'gpt-4o': 'gpt-4o',
  'gpt-4o-mini': 'gpt-4o-mini',
  'gpt-3.5-turbo': 'gpt-3.5-turbo',
};

/**
 * Convert AgentContract to OpenAI assistant config
 */
export function contractToOpenAIConfig(contract: AgentContract): {
  name: string;
  instructions: string;
  model: string;
  tools: Array<{ type: string }>;
  metadata: Record<string, string>;
} {
  return {
    name: contract.name,
    instructions: contract.systemPrompt ?? '',
    model: contract.modelId ?? 'gpt-4o',
    tools: contract.tools.map(tool => ({
      type: mapToolToOpenAI(tool),
    })).filter(t => t.type !== 'unknown'),
    metadata: {
      slug: contract.slug,
      agentType: contract.agentType,
      scope: contract.scope,
    },
  };
}

/**
 * Map universal tool names to OpenAI tool types
 */
function mapToolToOpenAI(tool: string): string {
  const toolMap: Record<string, string> = {
    'Read': 'code_interpreter',
    'Write': 'code_interpreter',
    'Edit': 'code_interpreter',
    'Bash': 'code_interpreter',
    'WebSearch': 'retrieval',
    'WebFetch': 'retrieval',
  };

  return toolMap[tool] ?? 'unknown';
}

/**
 * Get valid models for OpenAI
 */
export function getValidOpenAIModels(): string[] {
  return Object.values(OPENAI_MODELS);
}

/**
 * Get provider-specific configuration defaults
 */
export function getOpenAIDefaults(): Partial<AgentContract['config']> {
  return {
    temperature: 1,
    maxTokens: 4096,
    topP: 1,
  };
}

/**
 * Validate provider-specific configuration
 */
export function validateOpenAIConfig(config: AgentContract['config']): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (config.temperature !== undefined) {
    if (config.temperature < 0 || config.temperature > 2) {
      errors.push('OpenAI temperature must be between 0 and 2');
    }
  }

  if (config.maxTokens !== undefined) {
    if (config.maxTokens < 1 || config.maxTokens > 128000) {
      errors.push('OpenAI maxTokens must be between 1 and 128000');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
