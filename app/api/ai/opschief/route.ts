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
        type: 'alert',
        title: 'Capacity Constraint in Strategic Planning',
        description: 'All 3 senior consultants fully booked through Q1 2026. Two new nonprofit strategic planning requests (Ocean Conservation, Urban Gardens) cannot be staffed.',
        timestamp: new Date(),
        severity: 'critical',
        actionable: true,
        suggestedAction: 'Options: (1) Hire senior consultant with nonprofit strategy experience, (2) Upskill mid-level consultant to take one engagement, (3) Defer one engagement to Q2.',
      },
      {
        id: 'insight_2',
        type: 'warning',
        title: 'Grant Cycle Creating Deadline Pressure',
        description: 'Federal grant cycle (Feb 15) has 3 clients rushing strategic plans simultaneously. Risk of quality issues or missed deadlines.',
        timestamp: new Date(),
        severity: 'high',
        actionable: true,
        suggestedAction: 'Prioritize Hopewell Foundation (largest engagement). Consider weekend hours or temp contractor for Metro Food Bank grant writing.',
      },
      {
        id: 'insight_3',
        type: 'info',
        title: 'Nonprofit Sector Revenue Up 18%',
        description: 'Nonprofit consulting revenue $487K this month (+12% MoM, +18% YoY). Average engagement value $87K. Capacity building workshops showing strong demand.',
        timestamp: new Date(),
        severity: 'low',
        actionable: false,
      },
      {
        id: 'insight_4',
        type: 'warning',
        title: 'Board Development Proposal Win Rate Low',
        description: 'Only 2 of 6 board development proposals accepted (33% win rate vs 45% target). Losing to competitors on governance experience positioning.',
        timestamp: new Date(),
        severity: 'medium',
        actionable: true,
        suggestedAction: 'Strengthen board development credentials: (1) Feature completed board projects in proposals, (2) Add governance certification to consultant bios, (3) Create board development case study library.',
      },
      {
        id: 'insight_5',
        type: 'info',
        title: 'Client Retention Outstanding',
        description: 'Nonprofit client retention at 96% (industry avg: 78%). NPS score 72. Strong referral network - 23 new leads from existing clients this quarter.',
        timestamp: new Date(),
        severity: 'low',
        actionable: false,
      },
      {
        id: 'insight_6',
        type: 'warning',
        title: 'Lakeside Arts Support Ticket Aging',
        description: 'Client portal issue open for 8 days (SLA: 5 days). Dashboard showing incorrect volunteer hours. Client satisfaction may decline if not resolved soon.',
        timestamp: new Date(),
        severity: 'medium',
        actionable: true,
        suggestedAction: 'Escalate to technical lead. Schedule client call to demonstrate progress and set expectations. Consider temporary manual workaround.',
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
