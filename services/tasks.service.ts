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
 * Mock tasks for PS consulting with nonprofit clients
 */
function getMockTasks(): Task[] {
  return [
    {
      id: '1',
      title: 'Strategic Plan: Hopewell Foundation',
      description: 'Complete 3-year strategic plan for federal grant submission. Sections: program expansion, capacity building, fundraising strategy.',
      status: 'in_progress',
      priority: 'critical',
      assignee: 'Sarah Chen',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      context: 'deliverable',
    },
    {
      id: '2',
      title: 'Board Development: Ocean Conservation',
      description: 'Prepare governance training materials for new board members. Blocked - awaiting client approval on curriculum.',
      status: 'blocked',
      priority: 'high',
      assignee: 'Mike Johnson',
      context: 'engagement',
    },
    {
      id: '3',
      title: 'Fundraising Workshop: Community Arts Center',
      description: 'Design and deliver 2-day donor cultivation workshop for development team (8 attendees).',
      status: 'in_progress',
      priority: 'high',
      assignee: 'Alex Rivera',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      context: 'engagement',
    },
    {
      id: '4',
      title: 'Impact Assessment: Phoenix Foundation',
      description: 'Completed program evaluation report delivered. Client requested follow-on capacity building engagement.',
      status: 'done',
      priority: 'low',
      assignee: 'Jordan Lee',
      context: 'deliverable',
    },
    {
      id: '5',
      title: 'Support: Lakeside Arts Dashboard Issue',
      description: 'Client portal showing incorrect volunteer hour totals. Investigating data sync from Salesforce integration.',
      status: 'in_progress',
      priority: 'high',
      assignee: 'Sarah Chen',
      context: 'support',
    },
    {
      id: '6',
      title: 'Proposal: Tech Education Alliance',
      description: 'Draft SOW for digital transformation engagement - migration to cloud-based donor management system.',
      status: 'in_progress',
      priority: 'high',
      assignee: 'Alex Rivera',
      dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      context: 'engagement',
    },
    {
      id: '7',
      title: 'Grant Writing Support: Metro Food Bank',
      description: 'Review and edit USDA grant application. Add data-driven impact metrics from client portal.',
      status: 'in_progress',
      priority: 'low',
      assignee: 'Jordan Lee',
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      context: 'deliverable',
    },
  ];
}
