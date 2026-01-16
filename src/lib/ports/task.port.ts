import type { Task, CreateTaskInput, UpdateTaskInput, TaskFilters } from '../task-service';

/**
 * Task Port Interface
 *
 * Defines operations for AICR task management.
 */
export interface ITaskPort {
  /**
   * Get all tasks, optionally filtered
   */
  getTasks(filters?: TaskFilters): Promise<Task[]>;

  /**
   * Get a single task by ID
   */
  getTask(id: string): Promise<Task | null>;

  /**
   * Create a new task
   */
  createTask(data: CreateTaskInput): Promise<Task | null>;

  /**
   * Update an existing task
   */
  updateTask(id: string, data: UpdateTaskInput): Promise<Task | null>;

  /**
   * Delete a task
   */
  deleteTask(id: string): Promise<boolean>;

  /**
   * Update task status (convenience method)
   */
  updateTaskStatus(id: string, status: Task['status']): Promise<Task | null>;
}
