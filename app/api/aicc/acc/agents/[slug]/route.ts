import { NextRequest, NextResponse } from 'next/server';
import {
  agentDefinitionService,
  syncService,
  UpdateAgentContractSchema,
} from '@/src/lib/acc';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/aicc/acc/agents/[slug]
 *
 * Get a single agent by slug (optionally scoped to app via query param)
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const appRegistryId = searchParams.get('appRegistryId') ?? undefined;

    const agent = await agentDefinitionService.getBySlugAndApp(slug, appRegistryId);

    if (!agent) {
      return NextResponse.json(
        {
          success: false,
          error: 'Agent not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: agent,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Get agent error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get agent',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/aicc/acc/agents/[slug]
 *
 * Update an agent
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const appRegistryId = searchParams.get('appRegistryId') ?? undefined;

    // Get agent by slug to get ID
    const existingAgent = await agentDefinitionService.getBySlugAndApp(slug, appRegistryId);
    if (!existingAgent) {
      return NextResponse.json(
        {
          success: false,
          error: 'Agent not found',
        },
        { status: 404 }
      );
    }

    // Validate input
    const validationResult = UpdateAgentContractSchema.safeParse({
      ...body,
      slug: existingAgent.slug,
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

    const agent = await agentDefinitionService.update(
      existingAgent.id,
      validationResult.data,
      body.changeReason,
      body.changedBy
    );

    return NextResponse.json({
      success: true,
      data: agent,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Update agent error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update agent',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/aicc/acc/agents/[slug]
 *
 * Delete an agent
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const appRegistryId = searchParams.get('appRegistryId') ?? undefined;

    // Get agent by slug to get ID
    const existingAgent = await agentDefinitionService.getBySlugAndApp(slug, appRegistryId);
    if (!existingAgent) {
      return NextResponse.json(
        {
          success: false,
          error: 'Agent not found',
        },
        { status: 404 }
      );
    }

    await agentDefinitionService.delete(existingAgent.id);

    return NextResponse.json({
      success: true,
      message: 'Agent deleted',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Delete agent error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete agent',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/aicc/acc/agents/[slug]
 *
 * Perform actions on an agent (approve, deprecate, push to file)
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const appRegistryId = searchParams.get('appRegistryId') ?? undefined;

    // Get agent by slug to get ID
    const existingAgent = await agentDefinitionService.getBySlugAndApp(slug, appRegistryId);
    if (!existingAgent) {
      return NextResponse.json(
        {
          success: false,
          error: 'Agent not found',
        },
        { status: 404 }
      );
    }

    const action = body.action;

    switch (action) {
      case 'approve': {
        if (!body.approvedBy) {
          return NextResponse.json(
            {
              success: false,
              error: 'approvedBy is required for approval',
            },
            { status: 400 }
          );
        }
        const agent = await agentDefinitionService.approve(existingAgent.id, body.approvedBy);
        return NextResponse.json({
          success: true,
          data: agent,
          message: 'Agent approved',
          timestamp: new Date().toISOString(),
        });
      }

      case 'deprecate': {
        const agent = await agentDefinitionService.deprecate(existingAgent.id);
        return NextResponse.json({
          success: true,
          data: agent,
          message: 'Agent deprecated',
          timestamp: new Date().toISOString(),
        });
      }

      case 'push': {
        const result = await syncService.pushToRepo(existingAgent.id);
        return NextResponse.json({
          success: result.status === 'success',
          data: result,
          timestamp: new Date().toISOString(),
        });
      }

      default:
        return NextResponse.json(
          {
            success: false,
            error: `Invalid action: ${action}. Valid actions: approve, deprecate, push`,
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Agent action error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to perform action',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
