import { NextRequest, NextResponse } from 'next/server';
import { appRegistryService, CreateAppRegistrySchema } from '@/lib/acc';

/**
 * GET /api/aicc/acc/apps
 *
 * List all registered apps with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters = {
      tier: searchParams.get('tier') as 'core' | 'demo' | 'external' | undefined,
      status: searchParams.get('status') as 'active' | 'inactive' | 'archived' | undefined,
      search: searchParams.get('search') ?? undefined,
    };

    const apps = await appRegistryService.getAll(filters);

    return NextResponse.json({
      success: true,
      data: apps,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('List apps error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to list apps',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/aicc/acc/apps
 *
 * Register a new app
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = CreateAppRegistrySchema.safeParse(body);
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

    const app = await appRegistryService.create(validationResult.data);

    return NextResponse.json(
      {
        success: true,
        data: app,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create app error:', error);

    // Check for unique constraint violation
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        {
          success: false,
          error: 'App with this slug already exists',
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create app',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
