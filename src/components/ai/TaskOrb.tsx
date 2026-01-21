'use client';

import { useState, useEffect } from 'react';
import { CheckCircledIcon, Cross2Icon, CircleIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'in_progress' | 'blocked' | 'done';
  priority: 'high' | 'critical' | 'low';
  assignee?: string;
  dueDate?: string;
  context: 'engagement' | 'deliverable' | 'support' | 'admin';
}

interface TaskOrbProps {
  enabled?: boolean;
}

/**
 * TaskOrb - Task management synced from AICR platform
 *
 * Displays operational tasks:
 * - In progress work
 * - Blocked items needing attention
 * - Completed tasks (archived after 24h)
 *
 * Context types (PS-Edge specific):
 * - Engagement: Client project tasks
 * - Deliverable: Content/output creation
 * - Support: Ticket resolution
 * - Admin: Internal operations
 *
 * Position: Bottom-right (position 2)
 */
export function TaskOrb({ enabled = true }: TaskOrbProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'blocked' | 'done'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    fetchTasks();

    // Auto-refresh every 2 minutes
    const interval = setInterval(fetchTasks, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, [enabled]);

  const fetchTasks = async () => {
    setIsLoading(true);
    setIsOffline(false);

    try {
      const response = await fetch('/api/ai/tasks?tenantId=ppg-main');
      if (!response.ok) throw new Error('Failed to fetch tasks');

      const data = await response.json();
      setTasks(data.tasks || []);
    } catch (error) {
      console.error('Tasks fetch error:', error);
      setIsOffline(true);
      // Use mock data when offline
      setTasks(getMockTasks());
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter((t) => t.status === filter);
  const blockedCount = tasks.filter((t) => t.status === 'blocked').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length;
  const highPriorityCount = tasks.filter((t) => t.priority === 'high' || t.priority === 'critical').length;

  if (!enabled) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
        return <CheckCircledIcon className="w-4 h-4 text-green-600" />;
      case 'blocked':
        return <ExclamationTriangleIcon className="w-4 h-4 text-red-600" />;
      default:
        return <CircleIcon className="w-4 h-4 text-blue-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600 font-bold';
      case 'high':
        return 'text-orange-600 font-semibold';
      default:
        return 'text-gray-600';
    }
  };

  const getContextBadge = (context: string) => {
    const colors = {
      engagement: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      deliverable: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900 dark:text-fuchsia-300',
      support: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
      admin: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    };
    return colors[context as keyof typeof colors] || colors.admin;
  };

  return (
    <>
      {/* Orb Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-20 z-40 w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center text-white"
        style={{
          background: 'linear-gradient(135deg, #f97316, #facc15)',
        }}
        title="Tasks - AICR Synced"
      >
        <CheckCircledIcon className="w-6 h-6" />
        {blockedCount > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
            {blockedCount}
          </span>
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-20 z-50 w-[450px] bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[600px] flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900 dark:text-gray-100">Tasks</h3>
                {isOffline && (
                  <span className="text-xs text-yellow-600 dark:text-yellow-400">(Offline Mode)</span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                <Cross2Icon className="w-4 h-4" />
              </button>
            </div>

            {/* Stats Bar */}
            <div className="flex gap-4 text-xs text-gray-600 dark:text-gray-400">
              <div>
                <span className="font-semibold">{tasks.length}</span> total
              </div>
              <div>
                <span className="font-semibold text-blue-600">{inProgressCount}</span> in progress
              </div>
              <div>
                <span className="font-semibold text-red-600">{blockedCount}</span> blocked
              </div>
              <div>
                <span className="font-semibold text-orange-600">{highPriorityCount}</span> high priority
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mt-3">
              {(['all', 'in_progress', 'blocked', 'done'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    filter === f
                      ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {f.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {isLoading && tasks.length === 0 ? (
              <div className="text-center text-gray-500 py-8">Loading tasks...</div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <CheckCircledIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No {filter !== 'all' && filter} tasks</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    {getStatusIcon(task.status)}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                          {task.title}
                        </h4>
                        <span className={`text-xs ${getPriorityColor(task.priority)}`}>
                          {task.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {task.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-0.5 rounded text-xs ${getContextBadge(task.context)}`}>
                          {task.context}
                        </span>
                        {task.assignee && (
                          <span className="text-xs text-gray-500">
                            • {task.assignee}
                          </span>
                        )}
                        {task.dueDate && (
                          <span className="text-xs text-gray-500">
                            • Due {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 text-center">
            Synced with AICR platform
          </div>
        </div>
      )}
    </>
  );
}

// Mock data for offline mode
function getMockTasks(): Task[] {
  return [
    {
      id: '1',
      title: 'Complete Phoenix Foundation deliverable',
      description: 'Finalize impact report and schedule review meeting',
      status: 'in_progress',
      priority: 'high',
      assignee: 'Sarah Chen',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      context: 'deliverable',
    },
    {
      id: '2',
      title: 'Resolve Hopewell support ticket #234',
      description: 'Dashboard showing incorrect KPIs - investigate data source',
      status: 'blocked',
      priority: 'critical',
      assignee: 'Mike Johnson',
      context: 'support',
    },
    {
      id: '3',
      title: 'Review Q1 capacity planning',
      description: 'Analyze utilization trends and prepare recommendations',
      status: 'in_progress',
      priority: 'low',
      assignee: 'Alex Rivera',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      context: 'admin',
    },
  ];
}
