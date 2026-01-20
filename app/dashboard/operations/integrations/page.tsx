/**
 * Legacy Route - Redirects to /dashboard/platform/integrations
 */

import { redirect } from 'next/navigation';

export default function LegacyIntegrationsPage() {
  redirect('/dashboard/platform/integrations');
}
