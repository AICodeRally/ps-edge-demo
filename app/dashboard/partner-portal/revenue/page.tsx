/**
 * Legacy Route - Redirects to /dashboard/pipeline/partner-revenue
 */

import { redirect } from 'next/navigation';

export default function LegacyPartnerRevenuePage() {
  redirect('/dashboard/pipeline/partner-revenue');
}
