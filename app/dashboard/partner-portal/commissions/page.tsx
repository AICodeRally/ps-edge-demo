/**
 * Legacy Route - Redirects to /dashboard/profit/commissions
 */

import { redirect } from 'next/navigation';

export default function LegacyCommissionsPage() {
  redirect('/dashboard/profit/commissions');
}
