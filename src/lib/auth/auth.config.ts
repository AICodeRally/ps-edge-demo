/**
 * NextAuth.js Configuration (using @aicr/auth)
 *
 * PS-Edge Demo - Professional Services platform
 * Phoenix Philanthropy Group
 */

import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { createAuthOptionsV4, type AuthConfig } from '@aicr/auth/v4';

const authConfig: AuthConfig = {
  bindingMode: 'synthetic',
  providers: {
    credentials: true,
  },
  synthetic: {
    defaultRole: 'ADMIN',
    defaultTenantId: 'tenant-ps-edge',
    defaultTenantSlug: 'ps-edge',
    defaultTenantName: 'Phoenix Philanthropy Group',
    defaultTenantTier: 'PROFESSIONAL',
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

// Create auth options using shared factory
export const authOptions: AuthOptions = createAuthOptionsV4({
  config: authConfig,
  CredentialsProvider,
}) as AuthOptions;
