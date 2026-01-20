/**
 * Legacy Route - Redirects to /dashboard/purpose/clients
 */

import { redirect } from 'next/navigation';

export default function LegacyClientsPage() {
  redirect('/dashboard/purpose/clients');
}
