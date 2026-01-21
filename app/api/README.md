# API Routes - Validation Pattern

This directory contains all PS-Edge API routes with comprehensive Zod validation following the SGM gold standard pattern.

## Validation Helper

**Location**: `src/lib/api/validation.ts`

Provides three main validation functions:
- `validateRequestBody()` - Validate POST/PUT/PATCH request bodies
- `validateQueryParams()` - Validate GET query parameters
- `validateRouteParams()` - Validate dynamic route parameters

## Usage Pattern

### POST Request with Body Validation

```typescript
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { validateRequestBody, successResponse } from '@/src/lib/api/validation';

// Define schema
const CreateClientSchema = z.object({
  name: z.string().min(1).max(200),
  industry: z.string(),
  status: z.enum(['active', 'inactive', 'prospect']),
  tenantId: z.string().default('ppg-main'),
});

export async function POST(request: NextRequest) {
  // Validate request body
  const validation = await validateRequestBody(request, CreateClientSchema);
  if (!validation.success) {
    return validation.error; // Returns formatted 400 error
  }

  const { name, industry, status, tenantId } = validation.data;

  // ... business logic

  return successResponse({ id: 'new-id', name, industry, status });
}
```

### GET Request with Query Parameter Validation

```typescript
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { validateQueryParams, successResponse } from '@/src/lib/api/validation';

// Define schema
const ListClientsQuerySchema = z.object({
  tenantId: z.string().default('ppg-main'),
  status: z.enum(['active', 'inactive', 'prospect']).optional(),
  offset: z.coerce.number().int().min(0).default(0),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export async function GET(request: NextRequest) {
  // Validate query params
  const validation = validateQueryParams(request, ListClientsQuerySchema);
  if (!validation.success) {
    return validation.error;
  }

  const { tenantId, status, offset, limit } = validation.data;

  // ... fetch data

  return successResponse({ clients: [], total: 0 });
}
```

### Dynamic Route with Route Parameter Validation

```typescript
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { validateRouteParams, successResponse, errorResponse } from '@/src/lib/api/validation';

const RouteParamsSchema = z.object({
  id: z.string().cuid(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;

  // Validate route params
  const validation = validateRouteParams(resolvedParams, RouteParamsSchema);
  if (!validation.success) {
    return validation.error;
  }

  const { id } = validation.data;

  // ... fetch by ID

  return successResponse({ id, name: 'Example' });
}
```

## Common Schema Patterns

The validation helper provides reusable schema patterns in `CommonSchemas`:

```typescript
import { CommonSchemas } from '@/src/lib/api/validation';

const MySchema = z.object({
  ...CommonSchemas.pagination,      // { offset, limit }
  ...CommonSchemas.search,           // { q }
  tenantId: CommonSchemas.tenantId,  // String with default 'ppg-main'
});
```

Available patterns:
- `CommonSchemas.tenantId` - Tenant ID with default
- `CommonSchemas.userId` - CUID user ID
- `CommonSchemas.pagination` - offset/limit pagination
- `CommonSchemas.dateRange` - startDate/endDate filters
- `CommonSchemas.search` - Search query

## Error Response Format

Validation errors return a standardized format:

```json
{
  "error": "Validation failed",
  "details": [
    {
      "path": "messages",
      "message": "At least one message is required",
      "code": "too_small"
    }
  ]
}
```

## Examples

### ✅ Updated Routes (Using Validation)

- `/api/ai/askps` - POST with body validation
- `/api/ai/opschief` - GET with query param validation

### ⏳ Routes to Update

The following routes should be updated to use the validation pattern:

- `/api/ai/pulse` - GET with query params
- `/api/ai/tasks` - GET with query params
- `/api/aicc/acc` - GET with query params
- `/api/aicc/acc/agents` - GET/POST validation
- `/api/aicc/acc/agents/[slug]` - GET/PUT/DELETE validation
- `/api/aicc/acc/apps` - GET/POST validation
- `/api/aicc/acc/apps/[slug]` - GET/PUT/DELETE validation
- `/api/aicc/acc/sync` - POST validation
- `/api/ui-kb/page` - GET with query params

## Migration Checklist

For each route:

1. Import validation helpers:
   ```typescript
   import { z } from 'zod';
   import { validateRequestBody, validateQueryParams, validateRouteParams, successResponse } from '@/src/lib/api/validation';
   ```

2. Define Zod schema above the route handler

3. Replace manual validation with helper function call

4. Use type-safe `validation.data` instead of raw params

5. Replace manual NextResponse.json() with `successResponse()` helper

6. Test with invalid inputs to ensure validation works

## Benefits

- **Type Safety**: Automatic TypeScript types from Zod schemas
- **Runtime Validation**: Catch invalid data before business logic
- **Consistent Errors**: Standardized error response format
- **Developer Experience**: Clear, descriptive validation errors
- **Production Ready**: Follows SGM gold standard pattern

---

For more information, see:
- `src/lib/api/validation.ts` - Validation helper implementation
- `.claude/architecture-context.md` - Full architecture documentation
