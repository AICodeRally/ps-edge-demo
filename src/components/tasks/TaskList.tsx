'use client';

import { useState, useEffect } from 'react';
import { TaskCard } from './TaskCard';
import { TaskForm } from './TaskForm';
import { getTasks, STATUS_CONFIG, PRIORITY_CONFIG } from '@/src/lib/task-service';
import type { Task, TaskStatus, TaskPriority } from '@/src/lib/task-service';
import { ReloadIcon, PlusIcon } from '@radix-ui/react-icons';

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const loadTasks = async () => {
    setIsLoading(true);
    const filters: Record<string, string> = {};
    if (statusFilter !== 'all') filters.status = statusFilter;
    if (priorityFilter !== 'all') filters.priority = priorityFilter;

    const data = await getTasks(Object.keys(filters).length > 0 ? filters as any : undefined);
    setTasks(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, [statusFilter, priorityFilter]);

  const handleTaskSaved = () => {
    setShowForm(false);
    setEditingTask(null);
    loadTasks();
  };

  if (isLoading && tasks.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <ReloadIcon className="w-8 h-8 animate-spin text-purple-600" />
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading tasks...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 flex-wrap">
        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'all')}
              className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800"
            >
              <option value="all">All Status</option>
              {(Object.keys(STATUS_CONFIG) as TaskStatus[]).map((s) => (
                <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as TaskPriority | 'all')}
              className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800"
            >
              <option value="all">All Priority</option>
              {(Object.keys(PRIORITY_CONFIG) as TaskPriority[]).map((p) => (
                <option key={p} value={p}>{PRIORITY_CONFIG[p].label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
          </span>
          <button
            onClick={loadTasks}
            disabled={isLoading}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all disabled:opacity-50"
          >
            <ReloadIcon className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all"
          >
            <PlusIcon className="w-4 h-4" />
            New Task
          </button>
        </div>
      </div>

      {/* Task Form Modal */}
      {(showForm || editingTask) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
            <TaskForm
              task={editingTask || undefined}
              onSave={handleTaskSaved}
              onCancel={() => { setShowForm(false); setEditingTask(null); }}
            />
          </div>
        </div>
      )}

      {/* Task List */}
      {tasks.length === 0 ? (
        <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-8 text-center border-2 border-purple-200 dark:border-purple-800">
          <p className="text-lg font-medium text-purple-900 dark:text-purple-100 mb-2">
            No tasks yet
          </p>
          <p className="text-sm text-purple-700 dark:text-purple-300 mb-4">
            Create your first task to get started
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all"
          >
            Create Task
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={loadTasks}
              onEdit={(t) => setEditingTask(t)}
            />
          ))}
        </div>
      )}

      {tasks.length > 0 && (
        <div className="text-center text-xs text-gray-400 py-2">
          {tasks.length} total | {tasks.filter(t => t.status === 'done').length} completed
        </div>
      )}
    </div>
  );
}
