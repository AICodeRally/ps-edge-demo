/**
 * Legacy Route - Redirects to /dashboard/people/team
 * This page has been moved to the PEOPLE section
 */

import { redirect } from 'next/navigation';

export default function LegacyTeamPage() {
  redirect('/dashboard/people/team');
}
