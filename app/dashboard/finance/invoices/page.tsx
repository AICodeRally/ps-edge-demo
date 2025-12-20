/**
 * Finance - Invoices Page
 * Manage client invoicing and payment tracking
 */

'use client';

import { useState } from 'react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  engagement: string;
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  amountPaid: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'partial';
  paymentDate?: string;
}

const invoices: Invoice[] = [
  {
    id: 'inv-001',
    invoiceNumber: 'INV-2025-001',
    client: 'Hopewell Community Foundation',
    engagement: 'Capital Campaign Strategy',
    issueDate: '2025-01-15',
    dueDate: '2025-02-14',
    totalAmount: 28120,
    amountPaid: 28120,
    status: 'paid',
    paymentDate: '2025-01-28',
  },
  {
    id: 'inv-002',
    invoiceNumber: 'INV-2025-002',
    client: 'Education Excellence Fund',
    engagement: 'Strategic Planning',
    issueDate: '2025-01-15',
    dueDate: '2025-02-14',
    totalAmount: 24500,
    amountPaid: 12250,
    status: 'partial',
  },
  {
    id: 'inv-003',
    invoiceNumber: 'INV-2025-003',
    client: 'Community Arts Alliance',
    engagement: 'Board Development',
    issueDate: '2025-01-10',
    dueDate: '2025-02-09',
    totalAmount: 19800,
    amountPaid: 0,
    status: 'sent',
  },
  {
    id: 'inv-004',
    invoiceNumber: 'INV-2025-004',
    client: 'Heritage Preservation Society',
    engagement: 'Grant Writing Workshop',
    issueDate: '2024-12-15',
    dueDate: '2025-01-14',
    totalAmount: 17360,
    amountPaid: 0,
    status: 'overdue',
  },
  {
    id: 'inv-005',
    invoiceNumber: 'INV-2025-005',
    client: 'Youth Development Network',
    engagement: 'Fundraising Strategy',
    issueDate: '2025-01-20',
    dueDate: '2025-02-19',
    totalAmount: 27200,
    amountPaid: 0,
    status: 'sent',
  },
  {
    id: 'inv-006',
    invoiceNumber: 'INV-2025-006',
    client: 'Animal Rescue Coalition',
    engagement: 'Feasibility Study',
    issueDate: '2025-01-08',
    dueDate: '2025-02-07',
    totalAmount: 16000,
    amountPaid: 16000,
    status: 'paid',
    paymentDate: '2025-01-22',
  },
];

const statusConfig = {
  draft: { label: 'Draft', color: 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400' },
  sent: { label: 'Sent', color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' },
  partial: { label: 'Partial', color: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400' },
  paid: { label: 'Paid', color: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' },
  overdue: { label: 'Overdue', color: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400' },
};

export default function InvoicesPage() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const filteredInvoices = invoices.filter((inv) => filterStatus === 'all' || inv.status === filterStatus);
  const stats = {
    totalBilled: invoices.reduce((sum, inv) => sum + inv.totalAmount, 0),
    totalPaid: invoices.reduce((sum, inv) => sum + inv.amountPaid, 0),
    outstanding: invoices.reduce((sum, inv) => sum + (inv.totalAmount - inv.amountPaid), 0),
    overdue: invoices.filter((inv) => inv.status === 'overdue').reduce((sum, inv) => sum + inv.totalAmount, 0),
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Invoices</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage client invoicing and payment tracking</p>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Billed</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">${(stats.totalBilled / 1000).toFixed(0)}k</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Paid</div>
              <div className="text-3xl font-bold text-green-600">${(stats.totalPaid / 1000).toFixed(0)}k</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Outstanding</div>
              <div className="text-3xl font-bold text-blue-600">${(stats.outstanding / 1000).toFixed(0)}k</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Overdue</div>
              <div className="text-3xl font-bold text-red-600">${(stats.overdue / 1000).toFixed(0)}k</div>
            </div>
          </div>
          <div className="card p-4">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 border border-gray-200 dark:border-dark-border-default rounded-lg bg-white dark:bg-dark-bg-primary text-gray-900 dark:text-gray-100">
              <option value="all">All Invoices</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="partial">Partial Payment</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          <div className="card p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border-default">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Invoice #</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Client</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Engagement</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Due Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Total</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Paid</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">{invoice.invoiceNumber}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">{invoice.client}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{invoice.engagement}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{invoice.dueDate}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">${invoice.totalAmount.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-green-600">${invoice.amountPaid.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${statusConfig[invoice.status].color}`}>{statusConfig[invoice.status].label}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
