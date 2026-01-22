/**
 * Legacy Route - Redirects to /dashboard/practice/ai
 */

import { redirect } from 'next/navigation';

export default function LegacyAIPage() {
  redirect('/dashboard/practice/ai');
}
