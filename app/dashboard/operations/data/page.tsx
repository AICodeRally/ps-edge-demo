/**
 * Legacy Route - Redirects to /dashboard/practice/data
 */

import { redirect } from 'next/navigation';

export default function LegacyDataPage() {
  redirect('/dashboard/practice/data');
}
