import { z } from 'zod';

/**
 * Pulse Contract - AICR Pulse Feed
 *
 * Represents Pulse cards from the AICR platform
 */

export const PulseUrgencySchema = z.enum(['critical', 'high', 'medium', 'low']);
export type PulseUrgency = z.infer<typeof PulseUrgencySchema>;

export const PulseChiefSchema = z.enum(['gov', 'ops', 'task', 'kb', 'summit', 'strategy']);
export type PulseChief = z.infer<typeof PulseChiefSchema>;

export const PulseCardSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  chief: PulseChiefSchema,
  title: z.string(),
  summary: z.string(),
  urgency: PulseUrgencySchema,
  source: z.string(),
  createdAt: z.string(), // ISO date string
  dismissedAt: z.string().nullable().optional(),
  snoozedUntil: z.string().nullable().optional(),
  pursuedAt: z.string().nullable().optional(),
});

export type PulseCard = z.infer<typeof PulseCardSchema>;

export const PulseFeedResponseSchema = z.object({
  success: z.boolean(),
  cards: z.array(PulseCardSchema),
  count: z.number(),
  timestamp: z.string(),
});

export type PulseFeedResponse = z.infer<typeof PulseFeedResponseSchema>;

export const PulseActionResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type PulseActionResponse = z.infer<typeof PulseActionResponseSchema>;

// Chief display names
export const CHIEF_LABELS: Record<PulseChief, string> = {
  gov: 'GovChief',
  ops: 'OpsChief',
  task: 'TaskChief',
  kb: 'KBChief',
  summit: 'SummitChief',
  strategy: 'StrategyChief',
};

// Urgency colors
export function getUrgencyColor(urgency: PulseUrgency): string {
  const colors: Record<PulseUrgency, string> = {
    critical: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    high: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
    medium: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    low: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  };
  return colors[urgency] || colors.low;
}
