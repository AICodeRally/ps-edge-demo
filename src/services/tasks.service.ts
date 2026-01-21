/**
 * Tasks Service
 * Handles task management synced with AICR platform
 */

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'in_progress' | 'blocked' | 'done';
  priority: 'high' | 'critical' | 'low';
  assignee?: string;
  dueDate?: string;
  context: 'engagement' | 'deliverable' | 'support' | 'admin';
}

/**
 * Fetch tasks from AICR platform
 * Falls back to mock data when API unavailable
 */
export async function getTasks(tenantId: string = 'ppg-main'): Promise<Task[]> {
  try {
    // TODO: Connect to AICR platform
    // const response = await fetch(`${process.env.AICR_API_URL}/tasks/${tenantId}`);
    // if (!response.ok) throw new Error('Failed to fetch tasks');
    // return await response.json();

    // Mock data for now
    return getMockTasks();
  } catch (error) {
    console.error('Tasks service error:', error);
    return getMockTasks();
  }
}

/**
 * Mock tasks for development/offline mode
 */
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
    {
      id: '4',
      title: 'Update client onboarding process',
      description: 'Document improvements from recent feedback',
      status: 'done',
      priority: 'low',
      assignee: 'Jordan Lee',
      context: 'admin',
    },
    {
      id: '5',
      title: 'Prepare proposal for Community Arts Center',
      description: 'Draft SOW and pricing for strategic planning engagement',
      status: 'in_progress',
      priority: 'high',
      assignee: 'Sarah Chen',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      context: 'engagement',
    },
  ];
}
