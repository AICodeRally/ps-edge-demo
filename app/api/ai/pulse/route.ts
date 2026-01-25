import { NextRequest, NextResponse } from 'next/server';
import { getAISettings } from '@/lib/config/ai-settings';

/**
 * Pulse API - AI-curated content feed
 * Returns curated articles, insights, and best practices
 * Based on user interests and nonprofit sector trends
 * Like ChatGPT's daily digest feature
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tenantId = searchParams.get('tenantId') || 'ppg-main';
  const settings = getAISettings();

  try {
    // Check if demo data mode is enabled
    if (settings.useDemoData) {
      // Return curated nonprofit content
      const items = getCuratedNonprofitContent();
      return NextResponse.json({ items }, { status: 200 });
    }

    // TODO: Connect to AICR platform for AI-curated content
    // const response = await fetch(`${process.env.AICR_API_URL}/api/pulse/${tenantId}`);
    // if (!response.ok) throw new Error('AICR unavailable');
    // return NextResponse.json(await response.json());

    // Fallback to demo data if AICR unavailable
    const items = getCuratedNonprofitContent();
    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error('Pulse API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch curated content' },
      { status: 500 }
    );
  }
}

// Curated nonprofit sector content (based on browsing history/interests)
function getCuratedNonprofitContent() {
  return [
    {
      id: '1',
      title: 'AI in Fundraising: 2026 Trends',
      summary: 'How nonprofits are using predictive analytics to identify major donor prospects. 76% lack governance policies - opportunity for consulting.',
      category: 'Trending',
      source: 'Nonprofit Quarterly',
      url: '#',
      readTime: '5 min',
      timestamp: new Date().toISOString(),
      relevance: 'high', // Based on recent AI assessment work
    },
    {
      id: '2',
      title: 'Board Engagement Best Practices',
      summary: 'New research on effective governance models for community foundations. Focus on volunteer leadership and accountability frameworks.',
      category: 'Best Practices',
      source: 'BoardSource',
      url: '#',
      readTime: '8 min',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      relevance: 'high', // Based on board development projects
    },
    {
      id: '3',
      title: 'Capital Campaign Success Rates',
      summary: 'Study of 500+ campaigns shows feasibility studies increase success rate by 42%. Silent phase strategies that work in 2026.',
      category: 'Research',
      source: 'CASE Insights',
      url: '#',
      readTime: '6 min',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      relevance: 'medium', // Based on campaign fundraising focus
    },
    {
      id: '4',
      title: 'Donor Retention Strategies',
      summary: 'Relationship management techniques from top-performing nonprofits. Monthly giving programs show 3x lifetime value.',
      category: 'Sector News',
      source: 'Chronicle of Philanthropy',
      url: '#',
      readTime: '7 min',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      relevance: 'medium',
    },
    {
      id: '5',
      title: 'Grant Writing in the AI Era',
      summary: 'Federal agencies updating requirements for 2026. How to balance AI tools with authentic storytelling in proposals.',
      category: 'Tools & Tech',
      source: 'Grant Professionals Association',
      url: '#',
      readTime: '4 min',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      relevance: 'low',
    },
    {
      id: '6',
      title: 'Executive Coaching ROI',
      summary: 'New study shows leadership development programs increase nonprofit ED retention by 28%. Best practices for coaching engagements.',
      category: 'Industry Report',
      source: 'Bridgespan Group',
      url: '#',
      readTime: '10 min',
      timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
      relevance: 'medium',
    },
  ];
}
