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
 * Mock pulse items for development/offline mode
 */
function getMockPulseItems(): PulseItem[] {
  return [
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
    {
      id: '4',
      title: 'Team Member Available',
      message: 'Alex Rivera has 12 hours available this week for new assignments.',
      urgency: 'medium',
      category: 'info',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
  ];
}
