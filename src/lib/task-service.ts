/**
 * Task Service
 *
 * Manages tasks via local Task API
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';
const TENANT_ID = 'np-edge';

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
 */
export async function getTasks(filters?: TaskFilters): Promise<Task[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.status) params.set('status', filters.status);
    if (filters?.priority) params.set('priority', filters.priority);
    if (filters?.assigneeId) params.set('assigneeId', filters.assigneeId);
    if (filters?.category) params.set('category', filters.category);

    const url = `${API_BASE}/api/tasks${params.toString() ? `?${params}` : ''}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-tenant-id': TENANT_ID,
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
 */
export async function getTask(taskId: string): Promise<Task | null> {
  try {
    const response = await fetch(`${API_BASE}/api/tasks/${taskId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-tenant-id': TENANT_ID,
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
 */
export async function createTask(input: CreateTaskInput): Promise<Task | null> {
  try {
    const response = await fetch(`${API_BASE}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-tenant-id': TENANT_ID,
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
 */
export async function updateTask(taskId: string, input: UpdateTaskInput): Promise<Task | null> {
  try {
    const response = await fetch(`${API_BASE}/api/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-tenant-id': TENANT_ID,
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
 */
export async function deleteTask(taskId: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-tenant-id': TENANT_ID,
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

// Display configuration
export const STATUS_CONFIG: Record<TaskStatus, { label: string; color: string; bg: string }> = {
  backlog: { label: 'Backlog', color: 'gray', bg: 'bg-gray-100 text-gray-700' },
  ready: { label: 'Ready', color: 'blue', bg: 'bg-blue-100 text-blue-700' },
  in_progress: { label: 'In Progress', color: 'yellow', bg: 'bg-yellow-100 text-yellow-700' },
  review: { label: 'Review', color: 'purple', bg: 'bg-purple-100 text-purple-700' },
  blocked: { label: 'Blocked', color: 'red', bg: 'bg-red-100 text-red-700' },
  done: { label: 'Done', color: 'green', bg: 'bg-green-100 text-green-700' },
};

export const PRIORITY_CONFIG: Record<TaskPriority, { label: string; color: string; bg: string }> = {
  low: { label: 'Low', color: 'gray', bg: 'bg-gray-100 text-gray-600' },
  medium: { label: 'Medium', color: 'blue', bg: 'bg-blue-100 text-blue-600' },
  high: { label: 'High', color: 'orange', bg: 'bg-orange-100 text-orange-600' },
  critical: { label: 'Critical', color: 'red', bg: 'bg-red-100 text-red-600' },
};
