'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { TenantProvider } from './tenant-context';

/**
 * Combined Session + Tenant Provider
 *
 * Wraps the application with both NextAuth SessionProvider
 * and the PS-Edge TenantProvider for tenant-aware operations.
 */

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSessionProvider>
      <TenantProvider>{children}</TenantProvider>
    </NextAuthSessionProvider>
  );
}
