/**
 * PROFIT - Invoices
 */

'use client';

export default function InvoicesPage() {
  const invoices = [
    { invoiceId: 'INV-2026-0012', client: 'Global Giving Foundation', amount: 47500, issued: 'Jan 15, 2026', due: 'Feb 14, 2026', status: 'Outstanding', daysOpen: 5 },
    { invoiceId: 'INV-2026-0011', client: 'Community Impact Network', amount: 32800, issued: 'Jan 10, 2026', due: 'Feb 9, 2026', status: 'Outstanding', daysOpen: 10 },
    { invoiceId: 'INV-2026-0010', client: 'Youth Development Alliance', amount: 28400, issued: 'Jan 8, 2026', due: 'Feb 7, 2026', status: 'Paid', daysOpen: 8 },
    { invoiceId: 'INV-2026-0009', client: 'Education First Collaborative', amount: 51200, issued: 'Jan 5, 2026', due: 'Feb 4, 2026', status: 'Outstanding', daysOpen: 15 },
    { invoiceId: 'INV-2026-0008', client: 'Health Access Partners', amount: 38900, issued: 'Dec 28, 2025', due: 'Jan 27, 2026', status: 'Paid', daysOpen: 12 },
    { invoiceId: 'INV-2025-0247', client: 'Arts & Culture Initiative', amount: 19750, issued: 'Dec 20, 2025', due: 'Jan 19, 2026', status: 'Outstanding', daysOpen: 31 },
    { invoiceId: 'INV-2025-0246', client: 'Global Giving Foundation', amount: 43200, issued: 'Dec 15, 2025', due: 'Jan 14, 2026', status: 'Paid', daysOpen: 18 },
    { invoiceId: 'INV-2025-0245', client: 'Environmental Action Group', amount: 23100, issued: 'Nov 30, 2025', due: 'Dec 30, 2025', status: 'Overdue', daysOpen: 51 },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Invoices</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Invoice management and payments</p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-3 mt-4">
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
            <div className="text-xs text-orange-600 dark:text-orange-400 uppercase tracking-wide">Total Invoices</div>
            <div className="text-lg font-bold text-orange-900 dark:text-orange-100 mt-1">387</div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
            <div className="text-xs text-amber-600 dark:text-amber-400 uppercase tracking-wide">Outstanding</div>
            <div className="text-lg font-bold text-amber-900 dark:text-amber-100 mt-1">$156K</div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
            <div className="text-xs text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">Paid This Month</div>
            <div className="text-lg font-bold text-yellow-900 dark:text-yellow-100 mt-1">$284K</div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
            <div className="text-xs text-red-600 dark:text-red-400 uppercase tracking-wide">Overdue</div>
            <div className="text-lg font-bold text-red-900 dark:text-red-100 mt-1">$23K</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
            <div className="text-xs text-orange-600 dark:text-orange-400 uppercase tracking-wide">Avg Days to Pay</div>
            <div className="text-lg font-bold text-orange-900 dark:text-orange-100 mt-1">32</div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border-default">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Invoice List</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">All invoices and payment tracking</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Invoice ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Client</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Issued</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Due Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Days</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                  {invoices.map((invoice, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-gray-100">{invoice.invoiceId}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{invoice.client}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">${invoice.amount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{invoice.issued}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{invoice.due}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          invoice.status === 'Paid' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                            : invoice.status === 'Overdue'
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{invoice.daysOpen}</td>
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
