import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth/auth.config';

/**
 * NextAuth.js API Route Handler
 *
 * Handles all authentication endpoints:
 * - /api/auth/signin
 * - /api/auth/signout
 * - /api/auth/session
 * - /api/auth/csrf
 * - /api/auth/providers
 * - /api/auth/callback/*
 */

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
