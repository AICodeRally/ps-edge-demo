/**
 * Legacy Route - Redirects to /dashboard/process/documents
 * This page has been moved to the PROCESS section
 */

import { redirect } from 'next/navigation';

export default function LegacyDocumentsPage() {
  redirect('/dashboard/process/documents');
}
