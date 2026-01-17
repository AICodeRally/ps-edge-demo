import { NextRequest, NextResponse } from 'next/server';
import { syncService, SyncRequestSchema } from '@/src/lib/acc';

/**
 * GET /api/aicc/acc/sync
 *
 * Get sync status for all apps
 */
export async function GET() {
  try {
    const status = await syncService.getSyncStatus();

    return NextResponse.json({
      success: true,
      data: status,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Get sync status error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get sync status',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/aicc/acc/sync
 *
 * Trigger sync for all apps or a specific app
 *
 * Body:
 * - appId?: string - Sync specific app (optional)
 * - direction?: 'pull' | 'push' | 'both' - Sync direction (default: 'pull')
 * - force?: boolean - Ignore hash comparison (default: false)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    // Validate input
    const validationResult = SyncRequestSchema.safeParse(body);
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

    const results = await syncService.sync(validationResult.data);

    const hasErrors = results.some(r => r.errors.length > 0);
    const totalProcessed = results.reduce((sum, r) => sum + r.agentsProcessed, 0);
    const totalCreated = results.reduce((sum, r) => sum + r.agentsCreated, 0);
    const totalUpdated = results.reduce((sum, r) => sum + r.agentsUpdated, 0);

    return NextResponse.json({
      success: !hasErrors,
      data: {
        results,
        summary: {
          appsProcessed: results.length,
          totalAgentsProcessed: totalProcessed,
          totalAgentsCreated: totalCreated,
          totalAgentsUpdated: totalUpdated,
          hasErrors,
        },
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to sync',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
