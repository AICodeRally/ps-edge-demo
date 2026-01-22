import Link from 'next/link';

export const dynamic = 'force-dynamic';

// Mock data for AFFCF beneficiaries
const mockBeneficiaries = [
  {
    id: '1',
    name: 'Sarah M.',
    age: 16,
    programsEnrolled: ['Keys to Success', 'Educational Support'],
    status: 'Active',
    enrolledDate: '2024-01-15',
    caseworker: 'Jennifer Martinez',
  },
  {
    id: '2',
    name: 'Marcus T.',
    age: 18,
    programsEnrolled: ['Transition Services', 'Scholarship Program'],
    status: 'Transitioning',
    enrolledDate: '2023-06-20',
    caseworker: 'David Chen',
  },
  {
    id: '3',
    name: 'Emily R.',
    age: 14,
    programsEnrolled: ['Activity Funding', 'Life Skills'],
    status: 'Active',
    enrolledDate: '2024-09-10',
    caseworker: 'Jennifer Martinez',
  },
  {
    id: '4',
    name: 'Jordan L.',
    age: 17,
    programsEnrolled: ['Keys to Success', 'Life Skills', 'Activity Funding'],
    status: 'Active',
    enrolledDate: '2023-11-05',
    caseworker: 'Sarah Johnson',
  },
];

const stats = {
  total: 2547,
  active: 2345,
  transitioning: 158,
  graduated: 44,
};

export default async function BeneficiariesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Beneficiaries</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Foster children served by AFFCF programs
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-dark-bg-secondary p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Served YTD</div>
        </div>
        <div className="bg-white dark:bg-dark-bg-secondary p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Currently Active</div>
        </div>
        <div className="bg-white dark:bg-dark-bg-secondary p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-orange-600">{stats.transitioning}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Transitioning (18-21)</div>
        </div>
        <div className="bg-white dark:bg-dark-bg-secondary p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-purple-600">{stats.graduated}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Graduated This Year</div>
        </div>
      </div>

      {/* Beneficiaries List */}
      <div className="bg-white dark:bg-dark-bg-secondary rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Beneficiaries
          </h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Programs
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Caseworker
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {mockBeneficiaries.map((beneficiary) => (
              <tr key={beneficiary.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4">
                  <Link
                    href={`/beneficiaries/${beneficiary.id}`}
                    className="font-medium text-green-600 hover:underline"
                  >
                    {beneficiary.name}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{beneficiary.age}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {beneficiary.programsEnrolled.length} programs
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      beneficiary.status === 'Active'
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                        : 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400'
                    }`}
                  >
                    {beneficiary.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {beneficiary.caseworker}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Demo Notice */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-400">
          <strong>Demo Mode:</strong> This page shows synthetic data for demonstration purposes. Real beneficiary data is protected by HIPAA and would require proper authentication and authorization.
        </p>
      </div>
    </div>
  );
}
