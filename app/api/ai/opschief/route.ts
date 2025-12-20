import { NextRequest, NextResponse } from 'next/server';

interface OpsChiefInsight {
  id: string;
  type: 'alert' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: Date;
  severity: 'critical' | 'high' | 'medium' | 'low';
  actionable: boolean;
  suggestedAction?: string;
}

/**
 * GET /api/ai/opschief
 *
 * Endpoint for OpsChief Professional Services insights
 * Analyzes business operations and generates alerts/warnings
 *
 * Query params:
 * - tenantId: Tenant ID (default: "ppg-main")
 * - department: Filter insights by department (optional)
 *
 * Response:
 * - insights: Array of { type, title, description, severity, actionable }
 * - generatedAt: ISO timestamp
 * - nextRefresh: ISO timestamp for automatic refresh
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tenantId = searchParams.get('tenantId') || 'ppg-main';
    const department = searchParams.get('department');

    // TODO: Replace with actual business logic analysis
    // For now, return mock insights based on the 6Ps data
    const insights: OpsChiefInsight[] = [
      {
        id: 'insight_1',
        type: 'warning',
        title: 'Sales Team Utilization Below Target',
        description: 'Sales team utilization is at 68%, below the target of 75%. Consider redistributing pipeline work or reviewing capacity planning.',
        timestamp: new Date(),
        severity: 'medium',
        actionable: true,
        suggestedAction: 'Review sales pipeline assignments and consider reallocating 2-3 active opportunities to distribute workload more evenly.',
      },
      {
        id: 'insight_2',
        type: 'alert',
        title: 'Delivery Team Over-Utilized',
        description: 'Delivery team is running at 92% utilization (target: 85%). Burnout risk detected at 12% (+4% from last month).',
        timestamp: new Date(),
        severity: 'high',
        actionable: true,
        suggestedAction: 'Immediate action needed: Consider hiring 1-2 additional consultants or redistributing workload. Review project timelines for potential extensions.',
      },
      {
        id: 'insight_3',
        type: 'info',
        title: 'Strong Revenue Growth',
        description: 'Monthly revenue increased to $487K (+12% MoM). Revenue per consultant up 8% to $17.4K. Excellent project margins at 68%.',
        timestamp: new Date(),
        severity: 'low',
        actionable: false,
      },
      {
        id: 'insight_4',
        type: 'warning',
        title: 'Proposal Win Rate Declining',
        description: 'Proposal win rate dropped to 42% (target: 45%, down 3% from last quarter). May indicate pricing issues or proposal quality concerns.',
        timestamp: new Date(),
        severity: 'medium',
        actionable: true,
        suggestedAction: 'Conduct win/loss analysis on recent proposals. Review pricing strategy and proposal templates. Consider sales training on value articulation.',
      },
      {
        id: 'insight_5',
        type: 'info',
        title: 'Client Satisfaction Stable',
        description: 'Client satisfaction (NPS) holding steady at 72. Client retention rate excellent at 94%. 12 new testimonials received this quarter.',
        timestamp: new Date(),
        severity: 'low',
        actionable: false,
      },
    ];

    // Filter by department if specified
    const filteredInsights = department
      ? insights.filter((i) =>
          i.title.toLowerCase().includes(department.toLowerCase()) ||
          i.description.toLowerCase().includes(department.toLowerCase())
        )
      : insights;

    console.log('OpsChief/PS-Edge insights generated:', {
      department: department || 'all',
      insightCount: filteredInsights.length,
      tenantId,
    });

    return NextResponse.json({
      insights: filteredInsights,
      generatedAt: new Date().toISOString(),
      nextRefresh: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
      metadata: {
        tenantId,
        department: department || 'all',
        totalInsights: filteredInsights.length,
        alerts: filteredInsights.filter((i) => i.type === 'alert').length,
        warnings: filteredInsights.filter((i) => i.type === 'warning').length,
        info: filteredInsights.filter((i) => i.type === 'info').length,
      },
    });
  } catch (error) {
    console.error('OpsChief/PS-Edge error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      {
        error: 'Failed to generate operational insights',
        details: errorMessage,
        insights: [],
      },
      { status: 500 }
    );
  }
}
