/**
 * ACC Provider Adapters
 *
 * Adapters translate between the universal AgentContract and provider-specific formats.
 */

import { AgentContract, AgentProvider } from '../contracts';
import * as claudeAdapter from './claude.adapter';
import * as openaiAdapter from './openai.adapter';
import * as ollamaAdapter from './ollama.adapter';

export * from './claude.adapter';
export * from './openai.adapter';
export * from './ollama.adapter';

/**
 * Get configuration defaults for a provider
 */
export function getProviderDefaults(provider: AgentProvider): Partial<AgentContract['config']> {
  switch (provider) {
    case 'claude':
    case 'anthropic':
      return claudeAdapter.getClaudeDefaults();
    case 'openai':
      return openaiAdapter.getOpenAIDefaults();
    case 'ollama':
      return ollamaAdapter.getOllamaDefaults();
    default:
      return {};
  }
}

/**
 * Validate configuration for a provider
 */
export function validateProviderConfig(
  provider: AgentProvider,
  config: AgentContract['config']
): { valid: boolean; errors: string[] } {
  switch (provider) {
    case 'claude':
    case 'anthropic':
      return claudeAdapter.validateClaudeConfig(config);
    case 'openai':
      return openaiAdapter.validateOpenAIConfig(config);
    case 'ollama':
      return ollamaAdapter.validateOllamaConfig(config);
    default:
      return { valid: true, errors: [] };
  }
}

/**
 * Provider display information
 */
export const PROVIDER_INFO: Record<AgentProvider, {
  name: string;
  icon: string;
  color: string;
  description: string;
}> = {
  claude: {
    name: 'Claude',
    icon: '🤖',
    color: '#cc785c',
    description: 'Anthropic Claude models for Claude Code agents',
  },
  anthropic: {
    name: 'Anthropic API',
    icon: '🔮',
    color: '#cc785c',
    description: 'Direct Anthropic API integration',
  },
  openai: {
    name: 'OpenAI',
    icon: '⚡',
    color: '#10a37f',
    description: 'OpenAI GPT models and assistants',
  },
  google: {
    name: 'Google Gemini',
    icon: '🌟',
    color: '#4285f4',
    description: 'Google Gemini models',
  },
  ollama: {
    name: 'Ollama',
    icon: '🦙',
    color: '#000000',
    description: 'Self-hosted LLMs via Ollama',
  },
  custom: {
    name: 'Custom',
    icon: '🔧',
    color: '#6b7280',
    description: 'Custom agent implementations',
  },
};
