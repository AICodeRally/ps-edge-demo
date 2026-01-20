/**
 * Legacy Route - Redirects to /dashboard/profit/timesheets
 */

import { redirect } from 'next/navigation';

export default function LegacyTimesheetsPage() {
  redirect('/dashboard/profit/timesheets');
}
