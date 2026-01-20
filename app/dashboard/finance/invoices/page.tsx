/**
 * Legacy Route - Redirects to /dashboard/profit/invoices
 */

import { redirect } from 'next/navigation';

export default function LegacyInvoicesPage() {
  redirect('/dashboard/profit/invoices');
}
