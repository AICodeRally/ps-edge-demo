import { NextRequest, NextResponse } from 'next/server';
import { getAISettings } from '@/src/lib/config/ai-settings';

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

// Curated foster care & nonprofit content for AFFCF
function getCuratedNonprofitContent() {
  return [
    {
      id: '1',
      title: 'Foster Youth Education Outcomes: 2026 Report',
      summary: 'Arizona foster youth graduation rates up 12% due to tutoring programs. After-school support shows strongest correlation with academic success. Case study: Keys to Success model.',
      category: 'Trending',
      source: 'National Foster Care Coalition',
      url: '#',
      readTime: '6 min',
      timestamp: new Date().toISOString(),
      relevance: 'high',
    },
    {
      id: '2',
      title: 'AI for Donor Segmentation in Foster Care',
      summary: 'How foster care nonprofits use predictive analytics to identify prospective major donors based on giving patterns, interests, and engagement history.',
      category: 'AI & Technology',
      source: 'Nonprofit Tech Quarterly',
      url: '#',
      readTime: '5 min',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      relevance: 'high',
    },
    {
      id: '3',
      title: 'Transition Services That Work',
      summary: 'Best practices for supporting foster youth aging out of the system (18-21). Housing assistance, job training, and life skills programs with proven outcomes.',
      category: 'Best Practices',
      source: 'Casey Family Programs',
      url: '#',
      readTime: '8 min',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      relevance: 'high',
    },
    {
      id: '4',
      title: 'Grant Strategies for Youth Services',
      summary: 'Federal and foundation grants available for foster care education programs. Tips for compelling impact narratives and outcome measurement.',
      category: 'Fundraising',
      source: 'Grant Professionals Association',
      url: '#',
      readTime: '7 min',
      timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      relevance: 'medium',
    },
    {
      id: '5',
      title: 'Volunteer Management for Youth Programs',
      summary: 'Recruiting and retaining tutors, mentors, and life skills coaches. Background check best practices and volunteer recognition programs.',
      category: 'Operations',
      source: 'VolunteerMatch Insights',
      url: '#',
      readTime: '6 min',
      timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
      relevance: 'medium',
    },
    {
      id: '6',
      title: 'Trauma-Informed Care Training',
      summary: 'New research on trauma-informed approaches for working with foster youth. Staff training frameworks and implementation guides for service providers.',
      category: 'Professional Development',
      source: 'Child Welfare Information Gateway',
      url: '#',
      readTime: '9 min',
      timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
      relevance: 'medium',
    },
  ];
}
