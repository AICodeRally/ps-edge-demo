/**
 * Legacy Department - Redirects to Practice
 * Operations functions are now organized under PRACTICE (integrations, data, AI) and PROCESS (documents, knowledge)
 */

import { redirect } from 'next/navigation';

export default function LegacyOperationsDashboard() {
  redirect('/dashboard/practice');
}
