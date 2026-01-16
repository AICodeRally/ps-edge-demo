import { z } from 'zod';

/**
 * Task Contract - AICR Tasks
 *
 * Represents tasks from the AICR platform
 */

export const TaskStatusSchema = z.enum(['pending', 'in_progress', 'completed', 'cancelled']);
export type TaskStatus = z.infer<typeof TaskStatusSchema>;

export const TaskPrioritySchema = z.enum(['urgent', 'high', 'medium', 'low']);
export type TaskPriority = z.infer<typeof TaskPrioritySchema>;

export const TaskSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  status: TaskStatusSchema,
  priority: TaskPrioritySchema,
  dueDate: z.string().optional(), // ISO date string
  assigneeId: z.string().optional(),
  assigneeName: z.string().optional(),
  source: z.string(), // Which chief/system created it
  sourceEntityId: z.string().optional(), // Link to related entity
  sourceEntityType: z.string().optional(), // Type of related entity
  createdAt: z.string(), // ISO date string
  updatedAt: z.string(), // ISO date string
  completedAt: z.string().optional(),
});

export type Task = z.infer<typeof TaskSchema>;

export const CreateTaskSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateTask = z.infer<typeof CreateTaskSchema>;

export const UpdateTaskSchema = TaskSchema.partial().required({ id: true });
export type UpdateTask = z.infer<typeof UpdateTaskSchema>;

export const TaskFiltersSchema = z.object({
  tenantId: z.string().optional(),
  status: TaskStatusSchema.optional(),
  priority: TaskPrioritySchema.optional(),
  assigneeId: z.string().optional(),
  source: z.string().optional(),
}).partial();

export type TaskFilters = z.infer<typeof TaskFiltersSchema>;

export const TaskListResponseSchema = z.object({
  success: z.boolean(),
  tasks: z.array(TaskSchema),
  count: z.number(),
  timestamp: z.string(),
});

export type TaskListResponse = z.infer<typeof TaskListResponseSchema>;

export const TaskActionResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  task: TaskSchema.optional(),
});

export type TaskActionResponse = z.infer<typeof TaskActionResponseSchema>;

// Priority colors
export function getPriorityColor(priority: TaskPriority): string {
  const colors: Record<TaskPriority, string> = {
    urgent: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    high: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
    medium: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    low: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  };
  return colors[priority] || colors.low;
}

// Status colors
export function getStatusColor(status: TaskStatus): string {
  const colors: Record<TaskStatus, string> = {
    pending: 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20',
    in_progress: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
    completed: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
    cancelled: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
  };
  return colors[status] || colors.pending;
}
