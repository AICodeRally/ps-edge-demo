import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

/**
 * NextAuth.js Configuration for PS-Edge
 *
 * Multi-tenant Professional Services platform with:
 * - Credentials (passkey) for demo mode
 * - Session enrichment with tenant context
 * - Role-based access control
 */

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'passkey',
      name: 'Email',
      credentials: {
        passkey: { label: 'Email', type: 'email' },
      },
      async authorize(credentials) {
        // Demo mode: accept any valid email
        const email = credentials?.passkey?.trim();
        if (email && email.includes('@')) {
          // Extract name from email
          const name = email
            .split('@')[0]
            .replace(/[._-]/g, ' ')
            .replace(/\b\w/g, (c: string) => c.toUpperCase());

          // Determine role and tenant from email domain
          const domain = email.split('@')[1];
          let role = 'USER';
          let tenantSlug = 'ps-edge';
          let tenantName = 'Phoenix Philanthropy Group';

          // Admin for ppg.com domain
          if (domain === 'ppg.com' || domain === 'phoenixphilanthropy.com') {
            role = 'ADMIN';
          }

          // Demo/consultant domains get elevated access
          if (domain === 'demo.com' || domain === 'consultant.com') {
            role = 'ADMIN';
            tenantSlug = 'ps-edge-demo';
            tenantName = 'PS-Edge Demo';
          }

          return {
            id: `user-${email.replace(/[^a-z0-9]/gi, '-')}`,
            name: name || 'Demo User',
            email: email,
            role,
            tenantSlug,
            tenantName,
          };
        }
        return null;
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },

  callbacks: {
    async jwt({ token, user }) {
      // On initial sign-in, enrich token with user data
      if (user) {
        token.userId = user.id;
        token.role = (user as any).role || 'USER';
        token.tenantId = `tenant-${(user as any).tenantSlug || 'ps-edge'}`;
        token.tenantSlug = (user as any).tenantSlug || 'ps-edge';
        token.tenantName = (user as any).tenantName || 'Phoenix Philanthropy Group';
        token.tenantTier = 'PROFESSIONAL'; // PS-Edge default tier
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.userId as string;
        (session.user as any).role = token.role as string;
        (session.user as any).tenantId = token.tenantId as string;
        (session.user as any).tenantSlug = token.tenantSlug as string;
        (session.user as any).tenantName = token.tenantName as string;
        (session.user as any).tenantTier = token.tenantTier as string;
      }
      return session;
    },
  },

  debug: process.env.NODE_ENV === 'development',
};
