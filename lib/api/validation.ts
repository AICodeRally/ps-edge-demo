/**
 * API Request Validation Utilities
 *
 * Provides Zod-based validation helpers for API routes following SGM gold standard pattern.
 *
 * Usage:
 * ```typescript
 * import { validateRequestBody, validateQueryParams } from '@/src/lib/api/validation';
 * import { z } from 'zod';
 *
 * const BodySchema = z.object({ name: z.string().min(1) });
 *
 * export async function POST(request: NextRequest) {
 *   const validation = await validateRequestBody(request, BodySchema);
 *   if (!validation.success) {
 *     return validation.error; // Returns formatted NextResponse with errors
 *   }
 *   const { data } = validation; // Type-safe validated data
 *   // ... use data
 * }
 * ```
 */

import { NextRequest, NextResponse } from 'next/server';
import { z, ZodError } from 'zod';

/**
 * Validation result type
 */
export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: NextResponse };

/**
 * Validate request body against Zod schema
 */
export async function validateRequestBody<T extends z.ZodTypeAny>(
  request: NextRequest,
  schema: T
): Promise<ValidationResult<z.infer<T>>> {
  try {
    const body = await request.json();
    const validated = schema.parse(body);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: NextResponse.json(
          {
            error: 'Validation failed',
            details: error.errors.map((err) => ({
              path: err.path.join('.'),
              message: err.message,
              code: err.code,
            })),
          },
          { status: 400 }
        ),
      };
    }
    if (error instanceof SyntaxError) {
      return {
        success: false,
        error: NextResponse.json(
          { error: 'Invalid JSON in request body' },
          { status: 400 }
        ),
      };
    }
    throw error; // Re-throw unexpected errors
  }
}

/**
 * Validate query parameters against Zod schema
 */
export function validateQueryParams<T extends z.ZodTypeAny>(
  request: NextRequest,
  schema: T
): ValidationResult<z.infer<T>> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const params = Object.fromEntries(searchParams.entries());
    const validated = schema.parse(params);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: NextResponse.json(
          {
            error: 'Invalid query parameters',
            details: error.errors.map((err) => ({
              path: err.path.join('.'),
              message: err.message,
              code: err.code,
            })),
          },
          { status: 400 }
        ),
      };
    }
    throw error;
  }
}

/**
 * Validate route parameters (from dynamic routes)
 */
export function validateRouteParams<T extends z.ZodTypeAny>(
  params: unknown,
  schema: T
): ValidationResult<z.infer<T>> {
  try {
    const validated = schema.parse(params);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: NextResponse.json(
          {
            error: 'Invalid route parameters',
            details: error.errors.map((err) => ({
              path: err.path.join('.'),
              message: err.message,
              code: err.code,
            })),
          },
          { status: 400 }
        ),
      };
    }
    throw error;
  }
}

/**
 * Common schema patterns for reuse
 */
export const CommonSchemas = {
  /**
   * Tenant ID (CUID or specific format)
   */
  tenantId: z.string().min(1).max(50).default('ppg-main'),

  /**
   * User ID (CUID)
   */
  userId: z.string().cuid(),

  /**
   * Pagination offset/limit
   */
  pagination: z.object({
    offset: z.coerce.number().int().min(0).default(0),
    limit: z.coerce.number().int().min(1).max(100).default(20),
  }),

  /**
   * Date range filter
   */
  dateRange: z.object({
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
  }),

  /**
   * Search query
   */
  search: z.object({
    q: z.string().min(1).max(200).optional(),
  }),
};

/**
 * Error response helper
 */
export function errorResponse(message: string, status: number = 500) {
  return NextResponse.json(
    {
      error: message,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

/**
 * Success response helper
 */
export function successResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(data, { status });
}
