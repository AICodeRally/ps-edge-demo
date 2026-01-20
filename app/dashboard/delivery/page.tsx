/**
 * Legacy Department - Redirects to Process
 * Delivery functions are now organized under PROCESS (engagements, deliverables) and PEOPLE (team)
 */

import { redirect } from 'next/navigation';

export default function LegacyDeliveryDashboard() {
  redirect('/dashboard/process');
}
