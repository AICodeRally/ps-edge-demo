'use client';

import { useState } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { createTask, updateTask, STATUS_CONFIG, PRIORITY_CONFIG } from '@/src/lib/task-service';
import type { Task, TaskStatus, TaskPriority, CreateTaskInput, UpdateTaskInput } from '@/src/lib/task-service';

interface TaskFormProps {
  task?: Task;
  onSave: () => void;
  onCancel: () => void;
}

export function TaskForm({ task, onSave, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState<TaskStatus>(task?.status || 'ready');
  const [priority, setPriority] = useState<TaskPriority>(task?.priority || 'medium');
  const [category, setCategory] = useState(task?.category || '');
  const [estimate, setEstimate] = useState(task?.estimate || '');
  const [labels, setLabels] = useState(task?.labels?.join(', ') || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!task;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const labelArray = labels.split(',').map(l => l.trim()).filter(Boolean);

    if (isEditing) {
      const input: UpdateTaskInput = {
        title: title.trim(),
        description: description.trim() || undefined,
        status,
        priority,
        category: category.trim() || undefined,
        estimate: estimate.trim() || undefined,
        labels: labelArray.length > 0 ? labelArray : undefined,
      };
      const result = await updateTask(task.id, input);
      if (result) onSave();
      else setError('Failed to update task');
    } else {
      const input: CreateTaskInput = {
        title: title.trim(),
        description: description.trim() || undefined,
        status,
        priority,
        category: category.trim() || undefined,
        estimate: estimate.trim() || undefined,
        labels: labelArray.length > 0 ? labelArray : undefined,
      };
      const result = await createTask(input);
      if (result) onSave();
      else setError('Failed to create task');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {isEditing ? 'Edit Task' : 'New Task'}
        </h2>
        <button onClick={onCancel} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <Cross2Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            placeholder="Task title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            placeholder="Task description"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {(Object.keys(STATUS_CONFIG) as TaskStatus[]).map((s) => (
                <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {(Object.keys(PRIORITY_CONFIG) as TaskPriority[]).map((p) => (
                <option key={p} value={p}>{PRIORITY_CONFIG[p].label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="e.g., feature, bug"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estimate</label>
            <input
              type="text"
              value={estimate}
              onChange={(e) => setEstimate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="e.g., 2h, 1d"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Labels</label>
          <input
            type="text"
            value={labels}
            onChange={(e) => setLabels(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Comma-separated labels"
          />
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
}
