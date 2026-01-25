import { AgentContract } from '../contracts';

/**
 * Ollama Adapter
 *
 * Handles translation between:
 * - Universal AgentContract format
 * - Ollama API configuration for local LLMs
 */

/**
 * Common Ollama model configurations
 */
const OLLAMA_MODELS: Record<string, { contextLength: number; recommended: boolean }> = {
  'llama3:70b': { contextLength: 8192, recommended: true },
  'llama3:8b': { contextLength: 8192, recommended: true },
  'mistral:7b': { contextLength: 8192, recommended: true },
  'mixtral:8x7b': { contextLength: 32768, recommended: true },
  'codellama:34b': { contextLength: 16384, recommended: false },
  'deepseek-coder:33b': { contextLength: 16384, recommended: false },
};

/**
 * Convert AgentContract to Ollama generation request
 */
export function contractToOllamaConfig(contract: AgentContract): {
  model: string;
  system: string;
  options: {
    temperature?: number;
    num_predict?: number;
    top_p?: number;
    top_k?: number;
  };
} {
  return {
    model: contract.modelId ?? 'llama3:8b',
    system: contract.systemPrompt ?? '',
    options: {
      temperature: contract.config.temperature,
      num_predict: contract.config.maxTokens,
      top_p: contract.config.topP,
      top_k: contract.config.topK,
    },
  };
}

/**
 * Get available Ollama models
 */
export function getOllamaModels(): Array<{
  id: string;
  contextLength: number;
  recommended: boolean;
}> {
  return Object.entries(OLLAMA_MODELS).map(([id, config]) => ({
    id,
    ...config,
  }));
}

/**
 * Get provider-specific configuration defaults
 */
export function getOllamaDefaults(): Partial<AgentContract['config']> {
  return {
    temperature: 0.7,
    maxTokens: 2048,
    topP: 0.9,
    topK: 40,
  };
}

/**
 * Validate provider-specific configuration
 */
export function validateOllamaConfig(config: AgentContract['config']): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (config.temperature !== undefined) {
    if (config.temperature < 0 || config.temperature > 2) {
      errors.push('Ollama temperature must be between 0 and 2');
    }
  }

  if (config.maxTokens !== undefined) {
    if (config.maxTokens < 1) {
      errors.push('Ollama maxTokens must be at least 1');
    }
  }

  if (config.topK !== undefined) {
    if (config.topK < 1 || config.topK > 100) {
      errors.push('Ollama topK must be between 1 and 100');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Check if Ollama is available locally
 */
export async function checkOllamaHealth(baseUrl = 'http://localhost:11434'): Promise<{
  available: boolean;
  models: string[];
  error?: string;
}> {
  try {
    const response = await fetch(`${baseUrl}/api/tags`);
    if (!response.ok) {
      return { available: false, models: [], error: 'Ollama API returned error' };
    }

    const data = await response.json() as { models?: Array<{ name: string }> };
    const models = data.models?.map(m => m.name) ?? [];

    return { available: true, models };
  } catch {
    return { available: false, models: [], error: 'Cannot connect to Ollama' };
  }
}
