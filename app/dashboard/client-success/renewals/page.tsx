/**
 * Legacy Route - Redirects to /dashboard/purpose/renewals
 */

import { redirect } from 'next/navigation';

export default function LegacyRenewalsPage() {
  redirect('/dashboard/purpose/renewals');
}
