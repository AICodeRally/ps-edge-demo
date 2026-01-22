/**
 * Legacy Route - Redirects to /dashboard/process/engagements
 * This page has been moved to the PROCESS section
 */

import { redirect } from 'next/navigation';

export default function LegacyEngagementsPage() {
  redirect('/dashboard/process/engagements');
}
