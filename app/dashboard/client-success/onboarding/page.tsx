/**
 * Legacy Route - Redirects to /dashboard/people/onboarding
 * This page has been moved to the PEOPLE section
 */

import { redirect } from 'next/navigation';

export default function LegacyOnboardingPage() {
  redirect('/dashboard/people/onboarding');
}
