import { NextRequest, NextResponse } from 'next/server';

/**
 * Pulse API - AI-powered operational insights
 * Returns urgent insights about business operations
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tenantId = searchParams.get('tenantId') || 'ppg-main';

  try {
    // TODO: Connect to AICR platform for real insights
    // For now, return mock data
    const items = [
      {
        id: '1',
        title: 'High Utilization Alert',
        message: 'Senior consultants at 95% capacity this week. Consider resource reallocation.',
        urgency: 'critical',
        category: 'alert',
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Engagement Milestone Due',
        message: 'Phoenix Foundation deliverable due in 2 days. Review progress.',
        urgency: 'high',
        category: 'warning',
        timestamp: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Revenue Opportunity',
        message: 'Client satisfaction score increased. Good time for upsell discussion.',
        urgency: 'low',
        category: 'info',
        timestamp: new Date().toISOString(),
      },
    ];

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error('Pulse API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pulse insights' },
      { status: 500 }
    );
  }
}
