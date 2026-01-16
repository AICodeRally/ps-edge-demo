/**
 * Task Service
 *
 * Manages tasks via AICR Platform Task API
 *
 * Note: This service now accepts dynamic tenantId for multi-tenant support.
 * For a more abstracted approach, see src/lib/aicr/client.ts
 */

const AICR_API_BASE = process.env.NEXT_PUBLIC_AICR_API_BASE || 'https://app.aicoderally.com';
const DEFAULT_TENANT_ID = 'ps-edge';

export type TaskStatus = 'backlog' | 'ready' | 'in_progress' | 'review' | 'blocked' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';
export type AssigneeType = 'person' | 'agent';

export interface Task {
  id: string;
  tenantId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  category?: string;
  assigneeType?: AssigneeType;
  assigneeId?: string;
  labels: string[];
  estimate?: string;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  _count?: { comments: number };
}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  assigneeId?: string;
  category?: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  category?: string;
  assigneeType?: AssigneeType;
  assigneeId?: string;
  labels?: string[];
  estimate?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  category?: string;
  assigneeType?: AssigneeType;
  assigneeId?: string;
  labels?: string[];
  estimate?: string;
}

/**
 * Fetch tasks from AICR Platform
 * @param filters - Optional filters for tasks
 * @param tenantId - Tenant identifier (defaults to 'ps-edge')
 */
export async function getTasks(filters?: TaskFilters, tenantId: string = DEFAULT_TENANT_ID): Promise<Task[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.status) params.set('status', filters.status);
    if (filters?.priority) params.set('priority', filters.priority);
    if (filters?.assigneeId) params.set('assigneeId', filters.assigneeId);
    if (filters?.category) params.set('category', filters.category);

    const url = `${AICR_API_BASE}/api/tasks${params.toString() ? `?${params}` : ''}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-tenant-id': tenantId,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Task API error:', response.status);
      return [];
    }

    const data = await response.json();
    return data.tasks || [];
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return [];
  }
}

/**
 * Get a single task
 * @param taskId - Task identifier
 * @param tenantId - Tenant identifier (defaults to 'ps-edge')
 */
export async function getTask(taskId: string, tenantId: string = DEFAULT_TENANT_ID): Promise<Task | null> {
  try {
    const response = await fetch(`${AICR_API_BASE}/api/tasks/${taskId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-tenant-id': tenantId,
      },
      cache: 'no-store',
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data.task;
  } catch (error) {
    console.error('Failed to fetch task:', error);
    return null;
  }
}

/**
 * Create a new task
 * @param input - Task data
 * @param tenantId - Tenant identifier (defaults to 'ps-edge')
 */
export async function createTask(input: CreateTaskInput, tenantId: string = DEFAULT_TENANT_ID): Promise<Task | null> {
  try {
    const response = await fetch(`${AICR_API_BASE}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-tenant-id': tenantId,
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data.task;
  } catch (error) {
    console.error('Failed to create task:', error);
    return null;
  }
}

/**
 * Update a task
 * @param taskId - Task identifier
 * @param input - Update data
 * @param tenantId - Tenant identifier (defaults to 'ps-edge')
 */
export async function updateTask(taskId: string, input: UpdateTaskInput, tenantId: string = DEFAULT_TENANT_ID): Promise<Task | null> {
  try {
    const response = await fetch(`${AICR_API_BASE}/api/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-tenant-id': tenantId,
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data.task;
  } catch (error) {
    console.error('Failed to update task:', error);
    return null;
  }
}

/**
 * Delete a task
 * @param taskId - Task identifier
 * @param tenantId - Tenant identifier (defaults to 'ps-edge')
 */
export async function deleteTask(taskId: string, tenantId: string = DEFAULT_TENANT_ID): Promise<boolean> {
  try {
    const response = await fetch(`${AICR_API_BASE}/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-tenant-id': tenantId,
      },
    });
    return response.ok;
  } catch (error) {
    console.error('Failed to delete task:', error);
    return false;
  }
}

/**
 * Update task status
 */
export async function updateTaskStatus(taskId: string, status: TaskStatus): Promise<Task | null> {
  return updateTask(taskId, { status });
}

// Display configuration with dark mode support
export const STATUS_CONFIG: Record<TaskStatus, { label: string; bg: string }> = {
  backlog: { label: 'Backlog', bg: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300' },
  ready: { label: 'Ready', bg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
  in_progress: { label: 'In Progress', bg: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' },
  review: { label: 'Review', bg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' },
  blocked: { label: 'Blocked', bg: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' },
  done: { label: 'Done', bg: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
};

export const PRIORITY_CONFIG: Record<TaskPriority, { label: string; bg: string }> = {
  low: { label: 'Low', bg: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400' },
  medium: { label: 'Medium', bg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
  high: { label: 'High', bg: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' },
  critical: { label: 'Critical', bg: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' },
};
