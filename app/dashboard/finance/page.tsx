/**
 * Legacy Department - Redirects to Profit
 * Finance functions are now organized under PROFIT (revenue, timesheets, invoices)
 */

import { redirect } from 'next/navigation';

export default function LegacyFinanceDashboard() {
  redirect('/dashboard/profit');
}
