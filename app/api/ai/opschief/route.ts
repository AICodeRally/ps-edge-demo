import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { validateQueryParams, successResponse } from '@/src/lib/api/validation';

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
    // Mock insights for AFFCF (Arizona Friends of Foster Children Foundation)
    const insights: OpsChiefInsight[] = [
      // Foster Care Program Operations
      {
        id: 'insight_1',
        type: 'warning',
        title: 'Keys to Success Program at 94% Capacity',
        description: '142 of 150 youth enrolled in after-school tutoring. Waitlist of 23 students. Spring semester registration opens Feb 1st - expect to hit capacity within 2 weeks.',
        timestamp: new Date(),
        severity: 'high',
        actionable: true,
        suggestedAction: 'Options: (1) Open additional tutoring section (requires 2 tutors, $12K budget), (2) Extend current sessions by 30 mins, (3) Partner with school district for space/volunteers.',
      },
      {
        id: 'insight_2',
        type: 'alert',
        title: 'Grant Report Deadline Approaching',
        description: 'ABC Foundation grant report due Feb 28th (36 days). Report requires updated beneficiary outcomes, program metrics, and financial reconciliation. Data collection not yet started.',
        timestamp: new Date(),
        severity: 'critical',
        actionable: true,
        suggestedAction: 'Immediate action: (1) Assign Program Director to compile outcomes data by Feb 10, (2) Request financial report from Accounting by Feb 15, (3) Schedule review with Executive Director Feb 20.',
      },
      {
        id: 'insight_3',
        type: 'info',
        title: 'Foster Youth Outcomes Exceeding Targets',
        description: 'Education programs showing strong results: 89% of students improved 2+ grade levels (target: 75%). College enrollment rate 68% (target: 60%). Satisfaction score 93%.',
        timestamp: new Date(),
        severity: 'low',
        actionable: true,
        suggestedAction: 'Leverage these outcomes for fundraising: Include in annual appeal, share with major donors, use in grant proposals for program expansion.',
      },

      // Fundraising & Development
      {
        id: 'insight_4',
        type: 'warning',
        title: 'Year-End Giving Campaign Below Target',
        description: 'Annual campaign raised $387K of $500K goal (77%). Dec 31st deadline approaching. 245 donors contributed vs 350 target. Average gift $1,580.',
        timestamp: new Date(),
        severity: 'medium',
        actionable: true,
        suggestedAction: 'Final push strategies: (1) Personal outreach to lapsed major donors (14 prospects), (2) Email blast to non-donors highlighting impact stories, (3) Social media campaign week of Dec 15-22.',
      },
      {
        id: 'insight_5',
        type: 'info',
        title: 'Donor Retention Strong at 87%',
        description: 'Donor retention rate 87% (national avg: 43%). Major gift retention 94%. Monthly donor program grew 12% this year. Strong relationship-building efforts paying off.',
        timestamp: new Date(),
        severity: 'low',
        actionable: false,
      },

      // Compliance & Governance
      {
        id: 'insight_6',
        type: 'warning',
        title: 'Form 990 Preparation Should Begin',
        description: 'IRS Form 990 due May 15, 2025 (4 months). Finance team typically needs 6-8 weeks for preparation. Starting late January recommended to avoid rush.',
        timestamp: new Date(),
        severity: 'medium',
        actionable: true,
        suggestedAction: 'Schedule Form 990 kickoff meeting with Finance Director, Program Directors, and ED by Jan 30. Gather program outcome data, financial statements, and governance docs.',
      },

      // AI-Enhanced Operations
      {
        id: 'insight_ai_1',
        type: 'info',
        title: 'AI Could Enhance Donor Engagement',
        description: 'Analysis of donor database (2,847 donors, 8-year history) shows patterns: major donors prefer quarterly updates, monthly donors engage via social media, lapsed donors respond to impact stories.',
        timestamp: new Date(),
        severity: 'low',
        actionable: true,
        suggestedAction: 'AI opportunities: (1) Predictive modeling to identify major gift prospects, (2) Automated donor segmentation for personalized outreach, (3) Chatbot for donor FAQs on website.',
      },
      {
        id: 'insight_ai_2',
        type: 'info',
        title: 'Student Progress Tracking Could Be Automated',
        description: 'Program staff spend 12 hours/week manually tracking student progress across 142 beneficiaries. AI could automate data collection, flag at-risk youth, generate progress reports.',
        timestamp: new Date(),
        severity: 'low',
        actionable: true,
        suggestedAction: 'Pilot AI-powered case management system: (1) Automate attendance tracking, (2) Flag students with declining performance, (3) Generate monthly outcome reports for funders.',
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
