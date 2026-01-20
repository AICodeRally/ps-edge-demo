/**
 * Legacy Department - Redirects to Platform
 * Operations functions are now organized under PLATFORM (integrations, data, AI) and PROCESS (documents, knowledge)
 */

import { redirect } from 'next/navigation';

export default function LegacyOperationsDashboard() {
  redirect('/dashboard/platform');
}
