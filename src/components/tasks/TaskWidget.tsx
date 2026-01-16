'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRightIcon, ReloadIcon, CheckCircledIcon, ListBulletIcon } from '@radix-ui/react-icons';
import { getTasks, STATUS_CONFIG, PRIORITY_CONFIG } from '@/src/lib/task-service';
import type { Task } from '@/src/lib/task-service';

export function TaskWidget() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadTasks = async () => {
    setIsLoading(true);
    const data = await getTasks();
    const activeTasks = data.filter(t => t.status !== 'done').slice(0, 5);
    setTasks(activeTasks);
    setIsLoading(false);
  };

  useEffect(() => {
    loadTasks();
    const interval = setInterval(loadTasks, 120000);
    return () => clearInterval(interval);
  }, []);

  const stats = {
    total: tasks.length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    blocked: tasks.filter(t => t.status === 'blocked').length,
  };

  return (
    <div className="relative rounded-lg border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 shadow-sm overflow-hidden">
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-800 text-white">
              <ListBulletIcon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Tasks</h3>
              <p className="text-xs text-purple-600 dark:text-purple-400">Work Items</p>
            </div>
          </div>
          {!isLoading && (
            <button
              onClick={loadTasks}
              className="rounded p-1 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              <ReloadIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center p-2 bg-white/50 dark:bg-gray-900/50 rounded">
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{stats.total}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Active</div>
          </div>
          <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
            <div className="text-lg font-semibold text-yellow-700 dark:text-yellow-400">{stats.inProgress}</div>
            <div className="text-xs text-yellow-600 dark:text-yellow-400">In Progress</div>
          </div>
          <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
            <div className="text-lg font-semibold text-red-700 dark:text-red-400">{stats.blocked}</div>
            <div className="text-xs text-red-600 dark:text-red-400">Blocked</div>
          </div>
        </div>

        {/* Tasks */}
        {isLoading ? (
          <div className="flex items-center justify-center py-6">
            <ReloadIcon className="w-5 h-5 animate-spin text-purple-600" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-3 text-center">
            <CheckCircledIcon className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-1" />
            <p className="text-sm text-green-800 dark:text-green-400 font-medium">All done!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {tasks.slice(0, 3).map((task) => (
              <div
                key={task.id}
                className="p-2 rounded-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
              >
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{task.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-1.5 py-0.5 rounded text-xs ${STATUS_CONFIG[task.status].bg}`}>
                    {STATUS_CONFIG[task.status].label}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded text-xs ${PRIORITY_CONFIG[task.priority].bg}`}>
                    {PRIORITY_CONFIG[task.priority].label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Link */}
        <Link
          href="/dashboard/tasks"
          className="mt-3 flex items-center justify-center gap-1.5 rounded-md bg-gradient-to-r from-purple-600 to-purple-700 px-3 py-2 text-xs font-medium text-white hover:from-purple-700 hover:to-purple-800 transition-all"
        >
          View All Tasks
          <ArrowRightIcon className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
