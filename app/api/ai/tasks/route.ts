import { NextRequest, NextResponse } from 'next/server';
import { getAISettings } from '@/src/lib/config/ai-settings';

/**
 * Tasks API - Task management synced with AICR
 * Returns operational tasks across engagements, deliverables, support
 * Respects demo data mode setting
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tenantId = searchParams.get('tenantId') || 'ppg-main';
  const settings = getAISettings();

  try {
    // Check if demo data mode is enabled
    if (settings.useDemoData) {
      // Return nonprofit consulting demo tasks
      const tasks = getNonprofitTasks();
      return NextResponse.json({ tasks }, { status: 200 });
    }

    // TODO: Connect to AICR platform for task sync
    // const response = await fetch(`${process.env.AICR_API_URL}/api/tasks/${tenantId}`);
    // if (!response.ok) throw new Error('AICR unavailable');
    // return NextResponse.json(await response.json());

    // Fallback to demo data if AICR unavailable
    const tasks = getNonprofitTasks();
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    console.error('Tasks API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// Nonprofit consulting tasks
function getNonprofitTasks() {
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
