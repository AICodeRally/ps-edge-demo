/**
 * Legacy Route - Redirects to /dashboard/process/knowledge
 * This page has been moved to the PROCESS section
 */

import { redirect } from 'next/navigation';

export default function LegacyKnowledgePage() {
  redirect('/dashboard/process/knowledge');
}
