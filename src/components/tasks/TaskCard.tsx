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
      className={`bg-white rounded-lg shadow p-4 hover:shadow-md transition-all ${
        isProcessing ? 'opacity-50' : ''
      } ${isOverdue ? 'border-l-4 border-l-red-500' : 'border border-gray-200'}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
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
            className="p-1 rounded hover:bg-gray-100 text-gray-500"
          >
            <DotsVerticalIcon className="w-4 h-4" />
          </button>

          {isMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-1 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg z-20">
                <div className="px-3 py-1.5 text-xs font-medium text-gray-500 border-b border-gray-100">
                  Change Status
                </div>
                {(Object.keys(STATUS_CONFIG) as TaskStatus[]).map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 ${
                      task.status === status ? 'bg-gray-50 font-medium' : ''
                    }`}
                  >
                    {STATUS_CONFIG[status].label}
                  </button>
                ))}
                <div className="border-t border-gray-100 mt-1 pt-1">
                  {onEdit && (
                    <button
                      onClick={() => { setIsMenuOpen(false); onEdit(task); }}
                      className="w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Pencil1Icon className="w-3 h-3" /> Edit
                    </button>
                  )}
                  <button
                    onClick={handleDelete}
                    className="w-full px-3 py-1.5 text-left text-xs hover:bg-red-50 text-red-600 flex items-center gap-2"
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
      <h3 className="font-medium text-gray-900 mb-1">{task.title}</h3>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}

      {/* Meta */}
      <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
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
          <span className={`${isOverdue ? 'text-red-600 font-medium' : ''}`}>
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Labels */}
      {task.labels.length > 0 && (
        <div className="flex items-center gap-1 mt-2 flex-wrap">
          {task.labels.map((label) => (
            <span key={label} className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs">
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
          className="mt-3 w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 transition-colors disabled:opacity-50"
        >
          <CheckCircledIcon className="w-3 h-3" />
          Mark Complete
        </button>
      )}
    </div>
  );
}
