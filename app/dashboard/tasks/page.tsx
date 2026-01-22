'use client';

import { ListBulletIcon } from '@radix-ui/react-icons';
import { TaskList } from '@/src/components/tasks/TaskList';

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-teal-500 text-white">
              <ListBulletIcon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
              <p className="text-gray-600">Manage and track your work items</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Task management powered by AICR Platform
          </p>
        </div>

        {/* Task List */}
        <TaskList />
      </div>
    </div>
  );
}
