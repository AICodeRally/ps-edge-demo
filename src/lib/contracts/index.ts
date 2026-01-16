/**
 * PS-Edge Contracts Index
 *
 * Zod-based type contracts for all domain entities.
 * Provides runtime validation and TypeScript type inference.
 */

// Professional Services Contracts
export * from './client.contract';
export * from './engagement.contract';
export * from './proposal.contract';
export * from './time-entry.contract';
export * from './invoice.contract';
export * from './deliverable.contract';
export * from './consultant.contract';

// Channel Partner Contracts
export * from './client-tenant.contract';
export * from './client-signal.contract';
