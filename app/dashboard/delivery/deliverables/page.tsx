/**
 * Legacy Route - Redirects to /dashboard/process/deliverables
 * This page has been moved to the PROCESS section
 */

import { redirect } from 'next/navigation';

export default function LegacyDeliverablesPage() {
  redirect('/dashboard/process/deliverables');
}
