/**
 * Legacy Route - Redirects to /dashboard/purpose/proposals
 */

import { redirect } from 'next/navigation';

export default function LegacyProposalsPage() {
  redirect('/dashboard/purpose/proposals');
}
