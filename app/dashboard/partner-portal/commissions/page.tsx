/**
 * Legacy Route - Redirects to /dashboard/pipeline/commissions
 */

import { redirect } from 'next/navigation';

export default function LegacyCommissionsPage() {
  redirect('/dashboard/pipeline/commissions');
}
