/**
 * Legacy Route - Redirects to /dashboard/platform/tenants
 */

import { redirect } from 'next/navigation';

export default function LegacyTenantsPage() {
  redirect('/dashboard/platform/tenants');
}
