'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

/**
 * Tenant Context for PS-Edge
 *
 * Provides tenant-aware context throughout the application.
 * Extracts tenant information from the NextAuth session.
 */

export interface TenantInfo {
  tenantId: string;
  tenantSlug: string;
  tenantName: string;
  tenantTier: 'DEMO' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';
}

export interface TenantContextValue {
  tenant: TenantInfo | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const TenantContext = createContext<TenantContextValue>({
  tenant: null,
  isLoading: true,
  isAuthenticated: false,
});

/**
 * Hook to access tenant context
 */
export function useTenant(): TenantContextValue {
  return useContext(TenantContext);
}

/**
 * Hook to get just the tenant ID (convenience)
 */
export function useTenantId(): string {
  const { tenant } = useTenant();
  return tenant?.tenantSlug || 'ps-edge';
}

/**
 * Provider component that wraps the application
 */
export function TenantProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';

  const tenant: TenantInfo | null = session?.user
    ? {
        tenantId: (session.user as any).tenantId || 'tenant-ps-edge',
        tenantSlug: (session.user as any).tenantSlug || 'ps-edge',
        tenantName: (session.user as any).tenantName || 'Phoenix Philanthropy Group',
        tenantTier: (session.user as any).tenantTier || 'PROFESSIONAL',
      }
    : null;

  return (
    <TenantContext.Provider value={{ tenant, isLoading, isAuthenticated }}>
      {children}
    </TenantContext.Provider>
  );
}

/**
 * Get tenant ID for server-side operations
 * Falls back to 'ps-edge' for unauthenticated requests
 */
export function getServerTenantId(session: any): string {
  return session?.user?.tenantSlug || 'ps-edge';
}
