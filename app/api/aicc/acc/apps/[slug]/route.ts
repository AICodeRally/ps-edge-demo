import { NextRequest, NextResponse } from 'next/server';
import { appRegistryService, syncService, UpdateAppRegistrySchema } from '@/src/lib/acc';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/aicc/acc/apps/[slug]
 *
 * Get a single app by slug
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const app = await appRegistryService.getBySlug(slug);

    if (!app) {
      return NextResponse.json(
        {
          success: false,
          error: 'App not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: app,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Get app error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get app',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/aicc/acc/apps/[slug]
 *
 * Update an app
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const body = await request.json();

    // Get app by slug to get ID
    const existingApp = await appRegistryService.getBySlug(slug);
    if (!existingApp) {
      return NextResponse.json(
        {
          success: false,
          error: 'App not found',
        },
        { status: 404 }
      );
    }

    // Validate input
    const validationResult = UpdateAppRegistrySchema.safeParse({
      ...body,
      id: existingApp.id,
    });

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid input',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const app = await appRegistryService.update(validationResult.data);

    return NextResponse.json({
      success: true,
      data: app,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Update app error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update app',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/aicc/acc/apps/[slug]
 *
 * Delete an app
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    // Get app by slug to get ID
    const existingApp = await appRegistryService.getBySlug(slug);
    if (!existingApp) {
      return NextResponse.json(
        {
          success: false,
          error: 'App not found',
        },
        { status: 404 }
      );
    }

    await appRegistryService.delete(existingApp.id);

    return NextResponse.json({
      success: true,
      message: 'App deleted',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Delete app error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete app',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/aicc/acc/apps/[slug]/sync
 *
 * Trigger sync for a specific app (accessed via POST with body)
 * Note: This is a workaround since Next.js doesn't support nested dynamic routes easily
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const body = await request.json().catch(() => ({}));

    // Check if this is a sync request
    if (body.action !== 'sync') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid action. Use action: "sync" to trigger sync.',
        },
        { status: 400 }
      );
    }

    // Get app by slug to get ID
    const existingApp = await appRegistryService.getBySlug(slug);
    if (!existingApp) {
      return NextResponse.json(
        {
          success: false,
          error: 'App not found',
        },
        { status: 404 }
      );
    }

    const direction = body.direction ?? 'pull';
    const result = await syncService.sync({
      appId: existingApp.id,
      direction,
      force: body.force ?? false,
    });

    return NextResponse.json({
      success: true,
      data: result[0],
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Sync app error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to sync app',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
