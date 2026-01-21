import { NextRequest, NextResponse } from 'next/server';

/**
 * Tasks API - Task management synced with AICR
 * Returns operational tasks across engagements, deliverables, support
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tenantId = searchParams.get('tenantId') || 'ppg-main';

  try {
    // TODO: Connect to AICR platform for task sync
    // For now, return mock data
    const tasks = [
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
    ];

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    console.error('Tasks API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}
