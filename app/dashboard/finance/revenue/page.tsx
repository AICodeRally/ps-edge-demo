/**
 * Legacy Route - Redirects to /dashboard/profit/revenue
 */

import { redirect } from 'next/navigation';

export default function LegacyRevenuePage() {
  redirect('/dashboard/profit/revenue');
}
