import Link from 'next/link';
import { FileTextIcon, CheckCircledIcon, ClockIcon } from '@radix-ui/react-icons';

export const dynamic = 'force-dynamic';

// Mock data for AFFCF compliance
const mockComplianceItems = [
  {
    id: '1',
    type: 'IRS Form 990',
    year: '2025',
    status: 'In Progress',
    dueDate: '2026-05-15',
    assignedTo: 'Finance Team',
    priority: 'High',
  },
  {
    id: '2',
    type: 'Board Meeting Minutes',
    year: '2025 Q4',
    status: 'Complete',
    dueDate: '2026-01-15',
    assignedTo: 'Board Secretary',
    priority: 'Medium',
  },
  {
    id: '3',
    type: 'Grant Report - ABC Foundation',
    year: '2025',
    status: 'Complete',
    dueDate: '2026-01-31',
    assignedTo: 'Program Director',
    priority: 'High',
  },
  {
    id: '4',
    type: 'Annual Audit',
    year: '2025',
    status: 'Scheduled',
    dueDate: '2026-03-31',
    assignedTo: 'External Auditor',
    priority: 'High',
  },
  {
    id: '5',
    type: 'Arizona Corporation Commission Annual Report',
    year: '2026',
    status: 'Not Started',
    dueDate: '2026-04-30',
    assignedTo: 'Executive Director',
    priority: 'Medium',
  },
];

const stats = {
  complete: 12,
  inProgress: 5,
  upcoming: 8,
  overdue: 1,
};

export default async function CompliancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Compliance</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          990 forms, grant reporting, and governance documents
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-dark-bg-secondary p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600">{stats.complete}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed YTD</div>
        </div>
        <div className="bg-white dark:bg-dark-bg-secondary p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
        </div>
        <div className="bg-white dark:bg-dark-bg-secondary p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.upcoming}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming</div>
        </div>
        <div className="bg-white dark:bg-dark-bg-secondary p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Overdue</div>
        </div>
      </div>

      {/* Compliance Items */}
      <div className="bg-white dark:bg-dark-bg-secondary rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Compliance Requirements
          </h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Document Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Year/Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Assigned To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Priority
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {mockComplianceItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <FileTextIcon className="h-4 w-4 text-gray-400" />
                    <Link
                      href={`/compliance/${item.id}`}
                      className="font-medium text-green-600 hover:underline"
                    >
                      {item.type}
                    </Link>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{item.year}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 w-fit ${
                      item.status === 'Complete'
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                        : item.status === 'In Progress'
                          ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400'
                          : item.status === 'Scheduled'
                            ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400'
                            : 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400'
                    }`}
                  >
                    {item.status === 'Complete' && <CheckCircledIcon className="h-3 w-3" />}
                    {item.status === 'In Progress' && <ClockIcon className="h-3 w-3" />}
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {new Date(item.dueDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {item.assignedTo}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      item.priority === 'High'
                        ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                        : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
                    }`}
                  >
                    {item.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Key Compliance Dates */}
      <div className="bg-white dark:bg-dark-bg-secondary rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Key Annual Deadlines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <FileTextIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Form 990</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Due 5th month after fiscal year end (May 15)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <FileTextIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Arizona Annual Report</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Due to Arizona Corporation Commission (April 30)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <FileTextIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Annual Audit</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Independent financial audit (March 31)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
              <FileTextIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Board Meetings</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Quarterly meetings with minutes and resolutions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-400">
          <strong>Demo Mode:</strong> This page shows synthetic compliance data for demonstration purposes.
        </p>
      </div>
    </div>
  );
}
