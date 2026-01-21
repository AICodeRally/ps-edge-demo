import { NextRequest, NextResponse } from 'next/server';
import { getAISettings } from '@/src/lib/config/ai-settings';

/**
 * Pulse API - AI-powered operational insights
 * Returns urgent insights about business operations
 * Respects demo data mode setting
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tenantId = searchParams.get('tenantId') || 'ppg-main';
  const settings = getAISettings();

  try {
    // Check if demo data mode is enabled
    if (settings.useDemoData) {
      // Return nonprofit consulting demo data
      const items = getNonprofitPulseItems();
      return NextResponse.json({ items }, { status: 200 });
    }

    // TODO: Connect to AICR platform for real insights
    // const response = await fetch(`${process.env.AICR_API_URL}/api/pulse/${tenantId}`);
    // if (!response.ok) throw new Error('AICR unavailable');
    // return NextResponse.json(await response.json());

    // Fallback to demo data if AICR unavailable
    const items = getNonprofitPulseItems();
    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error('Pulse API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pulse insights' },
      { status: 500 }
    );
  }
}

// Nonprofit consulting pulse items
function getNonprofitPulseItems() {
  return [
    {
      id: '1',
      title: 'Grant Deadline Approaching',
      message: 'Hopewell Foundation needs strategic plan completed before federal grant submission (Feb 15). Currently 72% complete.',
      urgency: 'critical',
      category: 'alert',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Board Meeting Prep Needed',
      message: 'Community Arts Center board presentation in 3 days. Draft fundraising plan needs executive review.',
      urgency: 'high',
      category: 'warning',
      timestamp: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Capacity Building Opportunity',
      message: 'Ocean Conservation Group expressed interest in leadership development workshop. High fit for Q1 2026.',
      urgency: 'medium',
      category: 'info',
      timestamp: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Client Milestone Achieved',
      message: 'Phoenix Foundation completed strategic planning phase. NPS score: 9/10. Good time for follow-on engagement discussion.',
      urgency: 'low',
      category: 'info',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '5',
      title: 'Senior Consultant Available',
      message: 'Sarah Chen completed Lakeside Arts engagement early. 16 billable hours available this week for nonprofit strategic planning.',
      urgency: 'medium',
      category: 'info',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    },
  ];
}
