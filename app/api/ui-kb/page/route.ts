import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Page KB API - Context-aware help content
 * Returns markdown documentation for specific pages
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pagePath = searchParams.get('path') || '/dashboard';

  try {
    // Convert URL path to KB file path
    // /dashboard/people/team -> /kb/pages/dashboard/people/team.md
    const kbPath = path.join(
      process.cwd(),
      'kb',
      'pages',
      `${pagePath.replace(/^\//, '')}.md`
    );

    // Check if KB file exists
    if (!fs.existsSync(kbPath)) {
      // Return a generic "coming soon" message
      return NextResponse.json(
        {
          title: 'Documentation Coming Soon',
          description: 'Help content is being prepared for this page.',
          content: `# Page Help\n\nDocumentation for **${pagePath}** is being created.\n\nCheck back soon!`,
        },
        { status: 200 }
      );
    }

    // Read and parse KB markdown file
    const fileContents = fs.readFileSync(kbPath, 'utf8');
    const { data, content } = matter(fileContents);

    return NextResponse.json(
      {
        title: data.title || 'Page Help',
        description: data.description || '',
        content,
        owner: data.owner,
        lastUpdated: data.lastUpdated,
        tags: data.tags || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Page KB API error:', error);
    return NextResponse.json(
      {
        title: 'Help Content Unavailable',
        description: 'Unable to load page documentation.',
        content: '# Error\n\nFailed to load help content for this page.',
      },
      { status: 200 }
    );
  }
}
