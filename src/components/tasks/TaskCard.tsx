'use client';

import { useState } from 'react';
import {
  DotsVerticalIcon,
  CheckCircledIcon,
  Pencil1Icon,
  TrashIcon,
  PersonIcon,
  TimerIcon,
} from '@radix-ui/react-icons';
import type { Task, TaskStatus } from '@/src/lib/task-service';
import { updateTaskStatus, deleteTask, STATUS_CONFIG, PRIORITY_CONFIG } from '@/src/lib/task-service';

interface TaskCardProps {
  task: Task;
  onUpdate?: () => void;
  onEdit?: (task: Task) => void;
}

export function TaskCard({ task, onUpdate, onEdit }: TaskCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const statusConfig = STATUS_CONFIG[task.status];
  const priorityConfig = PRIORITY_CONFIG[task.priority];

  const handleStatusChange = async (newStatus: TaskStatus) => {
    setIsProcessing(true);
    setIsMenuOpen(false);
    await updateTaskStatus(task.id, newStatus);
    setIsProcessing(false);
    onUpdate?.();
  };

  const handleDelete = async () => {
    if (!confirm('Delete this task?')) return;
    setIsProcessing(true);
    setIsMenuOpen(false);
    await deleteTask(task.id);
    setIsProcessing(false);
    onUpdate?.();
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';

  return (
    <div
      className={`relative bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-all ${
        isProcessing ? 'opacity-50' : ''
      } ${isOverdue ? 'border-l-4 border-l-red-500' : ''}`}
    >
      {/* Purple AI accent bar */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-600 to-purple-800 rounded-l-lg" />

      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2 pl-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig.bg}`}>
            {statusConfig.label}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityConfig.bg}`}>
            {priorityConfig.label}
          </span>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
          >
            <DotsVerticalIcon className="w-4 h-4" />
          </button>

          {isMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-1 w-48 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-1 shadow-lg z-20">
                <div className="px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                  Change Status
                </div>
                {(Object.keys(STATUS_CONFIG) as TaskStatus[]).map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 ${
                      task.status === status ? 'bg-gray-50 dark:bg-gray-700 font-medium' : ''
                    }`}
                  >
                    {STATUS_CONFIG[status].label}
                  </button>
                ))}
                <div className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1">
                  {onEdit && (
                    <button
                      onClick={() => { setIsMenuOpen(false); onEdit(task); }}
                      className="w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300"
                    >
                      <Pencil1Icon className="w-3 h-3" /> Edit
                    </button>
                  )}
                  <button
                    onClick={handleDelete}
                    className="w-full px-3 py-1.5 text-left text-xs hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center gap-2"
                  >
                    <TrashIcon className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1 pl-2">{task.title}</h3>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 pl-2">{task.description}</p>
      )}

      {/* Meta */}
      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 flex-wrap pl-2">
        {task.assigneeId && (
          <span className="flex items-center gap-1">
            <PersonIcon className="w-3 h-3" />
            {task.assigneeId}
          </span>
        )}
        {task.estimate && (
          <span className="flex items-center gap-1">
            <TimerIcon className="w-3 h-3" />
            {task.estimate}
          </span>
        )}
        {task.dueDate && (
          <span className={`${isOverdue ? 'text-red-600 dark:text-red-400 font-medium' : ''}`}>
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Labels */}
      {task.labels.length > 0 && (
        <div className="flex items-center gap-1 mt-2 flex-wrap pl-2">
          {task.labels.map((label) => (
            <span key={label} className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs">
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Quick complete button */}
      {task.status !== 'done' && (
        <button
          onClick={() => handleStatusChange('done')}
          disabled={isProcessing}
          className="mt-3 ml-2 w-[calc(100%-0.5rem)] flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-colors disabled:opacity-50"
        >
          <CheckCircledIcon className="w-3 h-3" />
          Mark Complete
        </button>
      )}
    </div>
  );
}
