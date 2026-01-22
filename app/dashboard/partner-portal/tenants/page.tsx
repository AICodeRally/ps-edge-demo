/**
 * Legacy Route - Redirects to /dashboard/practice/tenants
 */

import { redirect } from 'next/navigation';

export default function LegacyTenantsPage() {
  redirect('/dashboard/practice/tenants');
}
