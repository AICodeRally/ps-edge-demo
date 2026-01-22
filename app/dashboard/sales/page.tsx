/**
 * Legacy Department - Redirects to Performance
 * Sales functions are now organized under PERFORMANCE (pipeline) and PURPOSE (clients, proposals)
 */

import { redirect } from 'next/navigation';

export default function LegacySalesDashboard() {
  redirect('/dashboard/performance');
}
