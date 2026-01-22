import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { validateRequestBody, errorResponse, successResponse } from '@/src/lib/api/validation';

/**
 * Request validation schema
 */
const AskPSRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string().min(1),
    })
  ).min(1, 'At least one message is required'),
  tenantId: z.string().min(1).max(50).default('ppg-main'),
  department: z.string().max(100).optional(),
  context: z.object({
    currentPage: z.string().max(200).optional(),
  }).optional(),
});

type AskPSRequest = z.infer<typeof AskPSRequestSchema>;

/**
 * POST /api/ai/askps
 *
 * Endpoint for AskPS Professional Services AI Assistant
 * Answers questions about clients, projects, billing, team management
 *
 * Request body:
 * - messages: Array of { role: 'user' | 'assistant', content: string }
 * - tenantId: Tenant ID (default: "ppg-main")
 * - department: Current department context (optional)
 * - context: Additional context like current page
 *
 * Response:
 * - text: AI assistant response
 * - metadata: Response metadata
 */
export async function POST(request: NextRequest) {
  try {
    // Validate request body
    const validation = await validateRequestBody(request, AskPSRequestSchema);
    if (!validation.success) {
      return validation.error;
    }

    const { messages, tenantId, department, context } = validation.data;

    const userMessage = messages[messages.length - 1];
    const userQuery = userMessage.content.toLowerCase();

    // TODO: Replace with actual LLM integration
    // Mock responses for AFFCF (Arizona Friends of Foster Children Foundation)
    let response = '';

    if (userQuery.includes('beneficiar') || userQuery.includes('youth') || userQuery.includes('student')) {
      response = `## Foster Youth Program Information

**Current Enrollment:** 1,760 beneficiaries across all programs

**Active Programs:**
- After-School Tutoring: 142 students
- Life Skills Training: 89 youth
- Scholarship Program: 34 students
- Transition Services: 58 young adults (ages 18-21)

**Recent Outcomes:**
- 89% improved 2+ grade levels in reading
- 92% attendance rate
- 68% college enrollment for graduates
- 93% beneficiary satisfaction

**Quick Actions:**
- View beneficiaries: Dashboard > Beneficiaries
- Track outcomes: Programs > Impact
- Add new beneficiary: Programs > Programs > Enroll

Need help with case management, enrollment, or outcome tracking?`;
    } else if (userQuery.includes('donor') || userQuery.includes('fundraising') || userQuery.includes('campaign')) {
      response = `## Fundraising & Donor Management

**Current Campaign:** Annual Giving 2024
- Goal: $500K
- Raised: $387K (77%)
- Days remaining: 9
- Donors: 245 contributors

**Donor Base:**
- Total donors: 2,847
- Active this year: 87%
- Major donors ($5K+): 42
- Monthly sustainers: 156

**Grant Pipeline:**
- Applied: 4 grants ($215K total)
- Under review: 3 grants
- Awarded YTD: $125K

**Quick Actions:**
- View donors: Dashboard > Fundraising
- Track campaigns: Fundraising > Campaigns
- Manage grants: Fundraising > Grants

How can I help with donor outreach or campaign planning?`;
    } else if (userQuery.includes('volunteer') || userQuery.includes('shift') || userQuery.includes('hours')) {
      response = `## Volunteer Management

**Active Volunteers:** 148
- Active status: 112 volunteers
- Total hours this year: 12,450 hours
- Average hours/volunteer: 84 hours

**This Week's Shifts:**
- Open shifts: 8
- Fully staffed: 12
- Fill rate: 89%

**Top Programs (by volunteer hours):**
- After-School Tutoring: 3,200 hours
- Life Skills Workshops: 2,100 hours
- Summer Camp: 1,850 hours

**Quick Actions:**
- View volunteers: Dashboard > Volunteers
- Track hours: Volunteers > Hours
- Manage schedule: Volunteers > Schedule

Need help with volunteer scheduling or recognition programs?`;
    } else if (userQuery.includes('compliance') || userQuery.includes('filing') || userQuery.includes('990')) {
      response = `## Compliance & Regulatory Filings

**Upcoming Deadlines:**
- Grant Report (ABC Foundation): Feb 28, 2025
- State Registration Renewal: Mar 1, 2025
- IRS Form 990: May 15, 2025

**Compliance Status:**
- Board meeting minutes: Current (Q4 2024)
- Financial audits: Complete
- Background checks: 94% current (6 volunteers need renewal)

**Form 990 Preparation:**
- Fiscal year: Jan 1 - Dec 31, 2024
- Estimated gross receipts: $2.8M
- Form type: 990 (full form)
- Preparation time needed: 6-8 weeks

**Quick Actions:**
- View filings: Dashboard > Compliance
- Track deadlines: Compliance > Calendar
- Review reports: Compliance > Reports

Need help with filing preparation or compliance tracking?`;
    } else if (userQuery.includes('program') || userQuery.includes('budget') || userQuery.includes('impact')) {
      response = `## Program Operations & Budget

**Active Programs:** 8
- Education focus: 4 programs
- Youth services: 2 programs
- Transition support: 2 programs

**Budget Overview:**
- Total budget FY2024: $845K
- Spent: $651K (77%)
- Remaining: $194K
- Budget health: Good

**Program Highlights:**
- Keys to Success (After-School): $125K budget, 142 students
- Scholarship Fund: $95K awarded to 34 students
- Life Skills Training: $68K budget, 89 participants

**Quick Actions:**
- View programs: Dashboard > Programs
- Track projects: Programs > Projects
- Monitor budget: Programs > Budget
- Measure impact: Programs > Impact

What program information do you need?`;
    } else {
      response = `I'm your AI assistant for Arizona Friends of Foster Children Foundation! I can help with:

**Foster Care Programs:**
- Beneficiary enrollment & tracking
- Program outcomes & impact measurement
- Case management support

**Fundraising:**
- Donor management & campaigns
- Grant tracking & reporting
- Major gift strategies

**Volunteers:**
- Shift scheduling & coordination
- Hour tracking & reporting
- Volunteer recognition

**Compliance:**
- Form 990 preparation
- Grant reporting deadlines
- State registration tracking

**Quick Stats:**
- 1,760 youth served
- 2,847 active donors
- 148 volunteers
- 8 active programs

Ask me anything about foster care operations, fundraising, program management, or how AI can support AFFCF!`;
    }

    console.log('AskPS query processed:', {
      query: userMessage.content.substring(0, 50),
      tenantId,
      department,
      page: context?.currentPage,
    });

    return successResponse({
      text: response,
      metadata: {
        tenantId,
        department: department || 'professional-services',
        page: context?.currentPage,
        responseLength: response.length,
      },
    });
  } catch (error) {
    console.error('AskPS error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      {
        error: 'Failed to process request',
        details: errorMessage,
        text: '⚠️ Sorry, I encountered an error. Please try again.',
      },
      { status: 500 }
    );
  }
}
