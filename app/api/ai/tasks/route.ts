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

// AFFCF operational tasks
function getNonprofitTasks() {
  return [
    {
      id: '1',
      title: 'ABC Foundation Grant Report',
      description: 'Compile Q4 program outcomes, financial data, and impact stories for ABC Foundation annual grant report. Due Feb 28th.',
      status: 'in_progress',
      priority: 'critical',
      assignee: 'Program Director',
      dueDate: new Date(Date.now() + 36 * 24 * 60 * 60 * 1000).toISOString(),
      context: 'compliance',
    },
    {
      id: '2',
      title: 'Spring Enrollment: Keys to Success',
      description: 'Process 23 waitlisted students for after-school tutoring. Verify eligibility, obtain parent consent, assign tutors. Program starts Feb 1.',
      status: 'in_progress',
      priority: 'high',
      assignee: 'Jennifer Martinez',
      dueDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
      context: 'program',
    },
    {
      id: '3',
      title: 'Volunteer Background Checks',
      description: '6 volunteers need background check renewals before Feb 15. Required for continued participation in youth programs.',
      status: 'in_progress',
      priority: 'high',
      assignee: 'Volunteer Coordinator',
      dueDate: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000).toISOString(),
      context: 'operations',
    },
    {
      id: '4',
      title: 'Scholarship Applications Review',
      description: 'Review 12 scholarship applications for spring semester. Award committee meeting scheduled Jan 30. $95K in funds available.',
      status: 'in_progress',
      priority: 'high',
      assignee: 'Scholarship Committee',
      dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
      context: 'program',
    },
    {
      id: '5',
      title: 'Year-End Appeal Follow-Up',
      description: 'Thank-you calls to 14 major donors ($5K+ gifts). Schedule cultivation meetings for 2025. Stewardship critical for retention.',
      status: 'in_progress',
      priority: 'high',
      assignee: 'Development Director',
      context: 'fundraising',
    },
    {
      id: '6',
      title: 'Form 990 Preparation Kickoff',
      description: 'Schedule kickoff meeting with Finance, Programs, and ED. Gather FY2024 financial statements, program data, governance docs. Due May 15.',
      status: 'done',
      priority: 'medium',
      assignee: 'Finance Director',
      context: 'compliance',
    },
    {
      id: '7',
      title: 'Update Student Progress Reports',
      description: 'Generate Q2 progress reports for all 142 tutoring students. Share with parents, caseworkers, and funders.',
      status: 'in_progress',
      priority: 'low',
      assignee: 'Program Staff',
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      context: 'program',
    },
  ];
}
