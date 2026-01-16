import 'next-auth';
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

/**
 * NextAuth.js Type Extensions for PS-Edge
 *
 * Extends the default session and token types with
 * tenant-aware properties for multi-tenant operation.
 */

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      tenantId: string;
      tenantSlug: string;
      tenantName: string;
      tenantTier: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role?: string;
    tenantSlug?: string;
    tenantName?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    userId?: string;
    role?: string;
    tenantId?: string;
    tenantSlug?: string;
    tenantName?: string;
    tenantTier?: string;
  }
}
