import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AskPSRequest {
  messages: Message[];
  tenantId?: string;
  department?: string;
  context?: {
    currentPage?: string;
  };
}

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
    const body: AskPSRequest = await request.json();
    const { messages, tenantId = 'ppg-main', department, context } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const userMessage = messages[messages.length - 1];
    const userQuery = userMessage.content.toLowerCase();

    // TODO: Replace with actual LLM integration (Rally LLM or Claude API)
    // For now, return intelligent mock responses based on keywords
    let response = '';

    if (userQuery.includes('billable') || userQuery.includes('hours') || userQuery.includes('time')) {
      response = `## Time Tracking & Billable Hours

To track billable hours in PS-Edge:

1. **Navigate to Finance > Timesheets**
2. Click "Add Time Entry"
3. Select the engagement, date, and hours worked
4. Mark as "Billable" if client-facing work
5. Submit for approval

**Current Stats:**
- Team avg billable hours: 78%
- Delivery team: 82% billable (above target)
- Sales team: 68% billable (below target)

**Best Practices:**
- Log time daily for accuracy
- Use activity codes (Meeting, Development, Documentation)
- Mark internal work as non-billable
- Review weekly utilization reports`;
    } else if (userQuery.includes('utilization') || userQuery.includes('team')) {
      response = `## Current Team Utilization

**Overall:** 84% (+3% from last month)

**By Department:**
- **Delivery Team:** 92% (⚠️ Above 85% target - burnout risk)
- **Sales Team:** 68% (Below 75% target - capacity available)
- **Client Success:** 81% (On target)

**Recommendations:**
1. Consider hiring 1-2 delivery consultants
2. Redistribute 2-3 sales opportunities to improve coverage
3. Monitor delivery team for burnout indicators

Would you like me to pull up specific team member utilization or capacity planning tools?`;
    } else if (userQuery.includes('engagement') || userQuery.includes('project') || userQuery.includes('active')) {
      response = `## Active Engagements Overview

**Total Active Engagements:** 12

**By Type:**
- Strategic Planning: 4
- Capital Campaigns: 3
- Board Development: 2
- Grant Writing: 2
- Feasibility Study: 1

**Status Breakdown:**
- In Progress: 8 (67%)
- Planning: 3 (25%)
- At Risk: 1 (8%)

**Key Metrics:**
- On-time delivery: 96%
- Avg project duration: 8.4 weeks
- Client satisfaction: 4.7/5

Navigate to **Delivery > Engagements** to see the full engagement list with detailed status.`;
    } else if (userQuery.includes('proposal') || userQuery.includes('create')) {
      response = `## Creating a Proposal

**Step-by-Step:**

1. **Navigate to Sales > Proposals**
2. Click "New Proposal"
3. Fill in:
   - Client selection
   - Engagement type (Strategic Planning, Capital Campaign, etc.)
   - Proposed scope and deliverables
   - Timeline and milestones
   - Pricing (fixed fee or hourly)
4. Attach any supporting documents
5. Submit for review

**Proposal Best Practices:**
- Start with executive summary highlighting client impact
- Include 3-5 relevant case studies
- Clear pricing breakdown
- Visual timeline
- Team credentials section

**Current Win Rate:** 42% (target: 45%)

**Tip:** Use proposal templates in the Knowledge Base for faster turnaround!`;
    } else if (userQuery.includes('client') || userQuery.includes('health')) {
      response = `## Client Health Overview

**Total Clients:** 28

**Health Distribution:**
- Excellent (90+): 12 clients (43%)
- Good (75-89): 9 clients (32%)
- Fair (60-74): 5 clients (18%)
- At Risk (<60): 2 clients (7%)

**Client Retention Rate:** 94% (+2% YoY)

**Top Performing Clients:**
- Hopewell Community Foundation
- Youth Alliance Network
- Regional Arts Council

**Clients Requiring Attention:**
- Review engagement health scores in **Client Success > Health**
- Focus on clients with declining NPS or reduced engagement

Would you like me to show specific client metrics or renewal pipeline?`;
    } else {
      response = `I can help you with Professional Services operations! I specialize in:

**Operations:**
- Client engagement tracking
- Proposal development & win rates
- Team utilization & capacity planning
- Project delivery metrics

**Finance:**
- Time tracking & billable hours
- Invoice generation
- Revenue analytics
- AR management

**Client Success:**
- Client health monitoring
- Renewal pipeline
- Satisfaction tracking

**Quick Stats:**
- 28 active clients
- 12 active engagements
- $487K monthly revenue
- 84% team utilization

What would you like to know more about?`;
    }

    console.log('AskPS query processed:', {
      query: userMessage.content.substring(0, 50),
      tenantId,
      department,
      page: context?.currentPage,
    });

    return NextResponse.json({
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
