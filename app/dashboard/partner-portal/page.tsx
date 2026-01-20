/**
 * Legacy Department - Redirects to Platform
 * Partner portal functions are now organized under PLATFORM (tenants, usage), PERFORMANCE (signals, benchmarks), and PROFIT (commissions, revenue)
 */

import { redirect } from 'next/navigation';

export default function LegacyPartnerPortalDashboard() {
  redirect('/dashboard/platform');
}
