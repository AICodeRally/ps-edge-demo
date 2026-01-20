/**
 * Legacy Route - Redirects to /dashboard/performance/benchmarks
 */

import { redirect } from 'next/navigation';

export default function LegacyBenchmarksPage() {
  redirect('/dashboard/performance/benchmarks');
}
