/**
 * Legacy Route - Redirects to /dashboard/platform/ai
 */

import { redirect } from 'next/navigation';

export default function LegacyAIPage() {
  redirect('/dashboard/platform/ai');
}
