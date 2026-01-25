/**
 * PEOPLE - Capacity & Utilization
 * Aggregated view of team capacity and utilization metrics
 */

'use client';

import { MOCK_CONSULTANTS } from '@/data/ps-edge/consultants.data';

export default function CapacityPage() {
  // Calculate aggregated metrics
  const totalConsultants = MOCK_CONSULTANTS.length;
  const totalCapacityHours = MOCK_CONSULTANTS.reduce((sum, c) => sum + c.weeklyCapacityHours, 0);
  const avgUtilization = MOCK_CONSULTANTS.reduce((sum, c) => sum + c.currentUtilization, 0) / totalConsultants;
  const totalUtilizedHours = MOCK_CONSULTANTS.reduce((sum, c) => sum + (c.weeklyCapacityHours * c.currentUtilization / 100), 0);
  const availableCapacity = totalCapacityHours - totalUtilizedHours;

  // Department breakdown
  const departmentStats = Array.from(
    new Set(MOCK_CONSULTANTS.map(c => c.department))
  ).map(dept => {
    const deptConsultants = MOCK_CONSULTANTS.filter(c => c.department === dept);
    const deptCapacity = deptConsultants.reduce((sum, c) => sum + c.weeklyCapacityHours, 0);
    const deptUtilization = deptConsultants.reduce((sum, c) => sum + c.currentUtilization, 0) / deptConsultants.length;
    return {
      name: dept,
      consultants: deptConsultants.length,
      capacity: deptCapacity,
      utilization: deptUtilization,
    };
  });

  // Utilization distribution
  const utilizationBuckets = [
    { label: 'Over Capacity (>90%)', count: MOCK_CONSULTANTS.filter(c => c.currentUtilization >= 90).length, color: 'red' },
    { label: 'Fully Utilized (75-90%)', count: MOCK_CONSULTANTS.filter(c => c.currentUtilization >= 75 && c.currentUtilization < 90).length, color: 'green' },
    { label: 'Well Utilized (50-75%)', count: MOCK_CONSULTANTS.filter(c => c.currentUtilization >= 50 && c.currentUtilization < 75).length, color: 'yellow' },
    { label: 'Under-Utilized (<50%)', count: MOCK_CONSULTANTS.filter(c => c.currentUtilization < 50).length, color: 'gray' },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Capacity & Utilization
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Team capacity planning and utilization metrics
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card p-6">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Consultants</div>
              <div className="text-3xl font-bold text-purple-600">{totalConsultants}</div>
            </div>
            <div className="card p-6">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Weekly Capacity</div>
              <div className="text-3xl font-bold text-blue-600">{totalCapacityHours.toFixed(0)}h</div>
            </div>
            <div className="card p-6">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Utilization</div>
              <div className="text-3xl font-bold text-green-600">{avgUtilization.toFixed(0)}%</div>
            </div>
            <div className="card p-6">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Available Hours</div>
              <div className="text-3xl font-bold text-orange-600">{availableCapacity.toFixed(0)}h</div>
            </div>
          </div>

          {/* Utilization Distribution */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Utilization Distribution
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {utilizationBuckets.map((bucket) => (
                <div key={bucket.label} className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${
                    bucket.color === 'red' ? 'text-red-600' :
                    bucket.color === 'green' ? 'text-green-600' :
                    bucket.color === 'yellow' ? 'text-yellow-600' :
                    'text-gray-600'
                  }`}>
                    {bucket.count}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {bucket.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department Breakdown */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Department Breakdown
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border-default">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Department
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Consultants
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Weekly Capacity
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Avg Utilization
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {departmentStats.map((dept) => (
                    <tr
                      key={dept.name}
                      className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary"
                    >
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {dept.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {dept.consultants}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {dept.capacity}h/week
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-dark-bg-tertiary rounded-full overflow-hidden max-w-[120px]">
                            <div
                              className="h-full bg-blue-500"
                              style={{ width: `${dept.utilization}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 w-12 text-right">
                            {dept.utilization.toFixed(0)}%
                          </span>
                        </div>
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
