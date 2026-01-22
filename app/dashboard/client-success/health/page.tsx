/**
 * Legacy Route - Redirects to /dashboard/performance/health
 */

import { redirect } from 'next/navigation';

export default function LegacyHealthPage() {
  redirect('/dashboard/performance/health');
}
