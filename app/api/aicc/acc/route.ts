import { NextResponse } from 'next/server';
import { appRegistryService, agentDefinitionService, syncService } from '@/src/lib/acc';
import type { ACCDashboardStats } from '@/src/lib/acc';

/**
 * GET /api/aicc/acc
 *
 * Get ACC dashboard statistics and overview
 */
export async function GET() {
  try {
    const [appStats, agentStats, syncStatus] = await Promise.all([
      appRegistryService.getStats(),
      agentDefinitionService.getStats(),
      syncService.getSyncStatus(),
    ]);

    const stats: ACCDashboardStats = {
      apps: {
        total: appStats.total,
        byTier: appStats.byTier,
        byStatus: appStats.byStatus,
      },
      agents: {
        total: agentStats.total,
        byProvider: agentStats.byProvider,
        byStatus: agentStats.byStatus,
        byType: agentStats.byType,
        pendingReview: agentStats.pendingReview,
      },
      sync: {
        lastGlobalSync: syncStatus.lastGlobalSync,
        appsNeedingSync: syncStatus.apps.filter(
          a => !a.lastSyncAt || a.lastSyncStatus === 'failed'
        ).length,
      },
      recentActivity: [], // TODO: Implement activity tracking
    };

    return NextResponse.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('ACC dashboard error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load dashboard',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
