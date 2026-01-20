/**
 * Legacy Route - Redirects to /dashboard/process/support
 * This page has been moved to the PROCESS section
 */

import { redirect } from 'next/navigation';

export default function LegacySupportPage() {
  redirect('/dashboard/process/support');
}
