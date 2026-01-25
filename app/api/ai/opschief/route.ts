import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { validateQueryParams, successResponse } from '@/lib/api/validation';

/**
 * Query parameters validation schema
 */
const OpsChiefQuerySchema = z.object({
  tenantId: z.string().min(1).max(50).default('ppg-main'),
  department: z.string().max(100).optional(),
});

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
    // Validate query parameters
    const validation = validateQueryParams(request, OpsChiefQuerySchema);
    if (!validation.success) {
      return validation.error;
    }

    const { tenantId, department } = validation.data;

    // TODO: Replace with actual business logic analysis
    // For now, return mock insights based on the 6Ps data + 2026 AI Line of Service
    const insights: OpsChiefInsight[] = [
      // Core Operations Insights
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

      // 2026 AI Line of Service Insights
      {
        id: 'insight_ai_1',
        type: 'info',
        title: 'AI Readiness Assessment Demand Growing',
        description: '5 nonprofit clients inquiring about AI strategy (donor analytics, chatbots, automation). Phase 1 framework validated through Hopewell assessment. 85% of sector exploring AI but only 24% have formal plans.',
        timestamp: new Date(),
        severity: 'low',
        actionable: true,
        suggestedAction: 'Schedule 2 additional AI readiness assessments in Q1. Focus on clients with strong donor databases (>5K donors). Use Phase 1 template: data audit, quick-win identification, ethical governance roadmap.',
      },
      {
        id: 'insight_ai_2',
        type: 'warning',
        title: 'Donor Analytics Pilot Ready to Launch',
        description: 'Safe Harbor Housing approved AI donor analytics pilot ($22K Phase 2 project). Donor database audit complete (12K donors, 8-year history). Predictive model could identify 50-75 high-propensity major donors.',
        timestamp: new Date(),
        severity: 'medium',
        actionable: true,
        suggestedAction: 'Finalize vendor selection (2 analytics platforms evaluated). Ensure ethical AI policy compliance. Set pilot success metrics: identify 50+ prospects, track conversion rate over 6 months.',
      },
      {
        id: 'insight_ai_3',
        type: 'info',
        title: 'Advancement Academy AI Workshop High Interest',
        description: 'AI in Fundraising 101 workshop (Feb 15) has 47 registrations from 18 nonprofit organizations. Interest exceeds capacity. Could expand to series.',
        timestamp: new Date(),
        severity: 'low',
        actionable: false,
      },
      {
        id: 'insight_ai_4',
        type: 'info',
        title: 'AI Governance Framework Reusable Asset',
        description: 'Internal AI Use Policy finalized and tested with 3 Phase 1 clients. 76% of nonprofits lack AI governance policy (benchmark data). This framework is becoming reusable consulting deliverable.',
        timestamp: new Date(),
        severity: 'low',
        actionable: true,
        suggestedAction: 'Package AI governance framework as standalone deliverable ($8-12K). Market to clients exploring AI but not ready for full implementation.',
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
