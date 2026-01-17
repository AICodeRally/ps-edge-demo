/**
 * Contract Schemas Page
 * Shows the universal agent contract schema
 */

'use client';

export default function ContractsPage() {
  const contractSchema = `// Universal Agent Contract
// Provider-agnostic definition for all LLM types

interface AgentContract {
  // Identity
  slug: string;          // "spot-dev", "sgm-dev"
  name: string;          // Display name
  description?: string;  // Brief description

  // Classification
  agentType:
    | 'plan_execute'    // Plans then executes
    | 'multi_agent'     // Orchestrates other agents
    | 'rag'             // RAG-powered
    | 'tool_qa'         // Tool-focused Q&A
    | 'domain_expert'   // Domain specialist
    | 'assistant';      // General assistant

  // Provider (universal)
  provider:
    | 'claude'          // Claude/Anthropic
    | 'openai'          // OpenAI GPT models
    | 'anthropic'       // Anthropic API
    | 'google'          // Google Gemini
    | 'ollama'          // Ollama local models
    | 'custom';         // Custom implementations

  modelId?: string;      // e.g., "claude-3-opus", "gpt-4"

  // Scope
  scope: 'platform' | 'domain' | 'tenant' | 'app';

  // Core Configuration
  systemPrompt?: string;
  tools: string[];
  config: {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    // ...extensible
  };

  // Session Management
  sessionManagement?: {
    startProcedure?: string;
    endProcedure?: string;
    progressTemplate?: string;
  };

  // Governance
  status: 'draft' | 'active' | 'deprecated' | 'archived';
  owner?: string;
  version: number;
}`;

  const frontmatterSchema = `# Claude Code Agent File Format
# Located in: .claude/agents/<slug>.md

---
name: agent-name
slug: agent-slug
description: One-sentence purpose of this agent.
agent_type: plan_execute
model: sonnet
tools:
  - Read
  - Write
  - Edit
  - Bash
  - Grep
  - Glob
status: active
owner: PS-Edge
---

# Agent Name

## Overview
Short summary of the agent's purpose.

## Scope
**In scope:** Primary responsibilities
**Out of scope:** Excluded work

## Responsibilities
- Key responsibilities

## Workflow
1. Step-by-step workflow
2. Decision points

## Guardrails
- Safety constraints
- Quality constraints`;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Contract Schemas
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Universal agent contract and file format specifications
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Universal Contract */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Universal Agent Contract
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              The universal contract defines the schema for all agent types, regardless of provider.
              Provider adapters handle the translation to provider-specific formats.
            </p>
            <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm font-mono">
              {contractSchema}
            </pre>
          </div>

          {/* Claude Code Format */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Claude Code Agent File Format
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Claude Code agents are defined as markdown files with YAML frontmatter.
              The sync service converts between this format and the universal contract.
            </p>
            <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm font-mono">
              {frontmatterSchema}
            </pre>
          </div>

          {/* Provider Adapters */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Provider Adapters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-gray-200 dark:border-dark-border-default">
                <div className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Claude Adapter
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Handles .claude/agents/*.md files with YAML frontmatter.
                  Maps model short names (sonnet, opus, haiku) to full IDs.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-gray-200 dark:border-dark-border-default">
                <div className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  OpenAI Adapter
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Converts to OpenAI Assistants API format.
                  Maps universal tools to OpenAI tool types.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-gray-200 dark:border-dark-border-default">
                <div className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Ollama Adapter
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Converts to Ollama generation request format.
                  Includes health check for local Ollama instance.
                </p>
              </div>
            </div>
          </div>

          {/* Scope Hierarchy */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Scope Hierarchy
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800">
                <span className="font-mono text-sm font-medium text-purple-600">platform</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Platform-wide agents available everywhere
                </span>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 ml-4">
                <span className="font-mono text-sm font-medium text-blue-600">domain</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Domain-specific (e.g., Sales, Finance, Operations)
                </span>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 ml-8">
                <span className="font-mono text-sm font-medium text-green-600">tenant</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Tenant-specific agents for multi-tenant apps
                </span>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 ml-12">
                <span className="font-mono text-sm font-medium text-yellow-600">app</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  App-specific agents (most common)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
