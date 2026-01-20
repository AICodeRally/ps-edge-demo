/**
 * Legacy Route - Redirects to /dashboard/performance/pipeline
 */

import { redirect } from 'next/navigation';

export default function LegacyPipelinePage() {
  redirect('/dashboard/performance/pipeline');
}
