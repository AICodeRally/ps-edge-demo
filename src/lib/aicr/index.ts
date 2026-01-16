/**
 * AICR Platform Integration Module
 *
 * Provides typed access to AICR Platform APIs:
 * - AskPS: Conversational AI queries
 * - Pulse: Channel insights feed
 * - Tasks: Task management
 */

export { AICRClient, createAICRClient, defaultClient } from './client';
export * from './types';
