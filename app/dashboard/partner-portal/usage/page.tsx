/**
 * Legacy Route - Redirects to /dashboard/platform/usage
 */

import { redirect } from 'next/navigation';

export default function LegacyUsagePage() {
  redirect('/dashboard/platform/usage');
}
