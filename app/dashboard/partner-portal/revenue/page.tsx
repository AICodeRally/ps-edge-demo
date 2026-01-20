/**
 * Legacy Route - Redirects to /dashboard/profit/partner-revenue
 */

import { redirect } from 'next/navigation';

export default function LegacyPartnerRevenuePage() {
  redirect('/dashboard/profit/partner-revenue');
}
