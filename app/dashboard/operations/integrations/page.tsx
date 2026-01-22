/**
 * Legacy Route - Redirects to /dashboard/practice/integrations
 */

import { redirect } from 'next/navigation';

export default function LegacyIntegrationsPage() {
  redirect('/dashboard/practice/integrations');
}
