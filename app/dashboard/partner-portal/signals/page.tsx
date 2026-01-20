/**
 * Legacy Route - Redirects to /dashboard/performance/signals
 */

import { redirect } from 'next/navigation';

export default function LegacySignalsPage() {
  redirect('/dashboard/performance/signals');
}
