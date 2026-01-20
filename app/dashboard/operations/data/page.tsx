/**
 * Legacy Route - Redirects to /dashboard/platform/data
 */

import { redirect } from 'next/navigation';

export default function LegacyDataPage() {
  redirect('/dashboard/platform/data');
}
