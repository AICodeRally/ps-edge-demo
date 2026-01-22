/**
 * Legacy Route - Redirects to /dashboard/practice/usage
 */

import { redirect } from 'next/navigation';

export default function LegacyUsagePage() {
  redirect('/dashboard/practice/usage');
}
