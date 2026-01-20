/**
 * Legacy Route - Redirects to /dashboard/platform/settings
 */

import { redirect } from 'next/navigation';

export default function LegacySettingsPage() {
  redirect('/dashboard/platform/settings');
}
