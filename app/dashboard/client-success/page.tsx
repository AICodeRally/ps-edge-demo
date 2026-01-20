/**
 * Legacy Route - Redirects to /dashboard/purpose/success
 */

import { redirect } from 'next/navigation';

export default function LegacyClientSuccessPage() {
  redirect('/dashboard/purpose/success');
}
