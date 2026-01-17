import { NextRequest, NextResponse } from 'next/server';
import {
  agentDefinitionService,
  appRegistryService,
  CreateAgentContractSchema,
} from '@/src/lib/acc';

/**
 * GET /api/aicc/acc/agents
 *
 * List all agent definitions with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters = {
      provider: searchParams.get('provider') as any,
      agentType: searchParams.get('agentType') as any,
      scope: searchParams.get('scope') as any,
      status: searchParams.get('status') as any,
      appRegistryId: searchParams.get('appRegistryId') ?? undefined,
      search: searchParams.get('search') ?? undefined,
    };

    const agents = await agentDefinitionService.getAll(filters);

    return NextResponse.json({
      success: true,
      data: agents,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('List agents error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to list agents',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/aicc/acc/agents
 *
 * Create a new agent definition
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = CreateAgentContractSchema.safeParse(body);
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

    // If appSlug is provided, resolve to appRegistryId
    let appRegistryId: string | undefined;
    if (body.appSlug) {
      const app = await appRegistryService.getBySlug(body.appSlug);
      if (!app) {
        return NextResponse.json(
          {
            success: false,
            error: `App with slug "${body.appSlug}" not found`,
          },
          { status: 400 }
        );
      }
      appRegistryId = app.id;
    } else if (body.appRegistryId) {
      appRegistryId = body.appRegistryId;
    }

    const agent = await agentDefinitionService.create(
      validationResult.data,
      appRegistryId,
      body.createdBy
    );

    return NextResponse.json(
      {
        success: true,
        data: agent,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create agent error:', error);

    // Check for unique constraint violation
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Agent with this slug already exists for this app',
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create agent',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
