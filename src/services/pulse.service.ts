/**
 * Pulse Service
 * Handles AI-powered operational insights and notifications
 */

export interface PulseItem {
  id: string;
  title: string;
  message: string;
  urgency: 'critical' | 'high' | 'medium' | 'low';
  category: 'alert' | 'warning' | 'info';
  timestamp: string;
  done?: boolean;
}

/**
 * Fetch pulse insights from AICR platform
 * Falls back to mock data when API unavailable
 */
export async function getPulseFeed(tenantId: string = 'ppg-main'): Promise<PulseItem[]> {
  try {
    // TODO: Connect to AICR platform
    // const response = await fetch(`${process.env.AICR_API_URL}/pulse/${tenantId}`);
    // if (!response.ok) throw new Error('Failed to fetch pulse');
    // return await response.json();

    // Mock data for now
    return getMockPulseItems();
  } catch (error) {
    console.error('Pulse service error:', error);
    return getMockPulseItems();
  }
}

/**
 * Mock pulse items for PS consulting with nonprofit clients
 */
function getMockPulseItems(): PulseItem[] {
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
      message: 'Phoenix Foundation completed their strategic planning phase. NPS score: 9/10. Good time for follow-on engagement discussion.',
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
