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
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-teal-500 text-white">
            <ListBulletIcon className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Tasks</h3>
        </div>
        <Link
          href="/tasks"
          className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium"
        >
          View All
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center p-2 bg-gray-50 rounded">
          <div className="text-lg font-semibold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-500">Active</div>
        </div>
        <div className="text-center p-2 bg-yellow-50 rounded">
          <div className="text-lg font-semibold text-yellow-700">{stats.inProgress}</div>
          <div className="text-xs text-yellow-600">In Progress</div>
        </div>
        <div className="text-center p-2 bg-red-50 rounded">
          <div className="text-lg font-semibold text-red-700">{stats.blocked}</div>
          <div className="text-xs text-red-600">Blocked</div>
        </div>
      </div>

      {isLoading && tasks.length === 0 ? (
        <div className="flex items-center justify-center py-8">
          <ReloadIcon className="w-5 h-5 animate-spin text-gray-400" />
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-8">
          <CheckCircledIcon className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-sm text-gray-500">All tasks completed!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-2 rounded border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
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
    </div>
  );
}
