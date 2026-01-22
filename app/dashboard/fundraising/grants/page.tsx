'use client';

import { useState } from 'react';
import { PlusIcon, CalendarIcon } from '@radix-ui/react-icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { grants } from '@/src/data/np-edge/fundraisingData';

const STATUS_COLORS = {
  'Applied': '#94a3b8',
  'Under Review': '#f59e0b',
  'Awarded': '#10b981',
  'Rejected': '#ef4444',
  'Reported': '#3b82f6',
};

export default function GrantsPage() {
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredGrants = grants.filter(grant =>
    filterStatus === 'All' || grant.status === filterStatus
  );

  const statusCounts = [
    { name: 'Applied', count: grants.filter(g => g.status === 'Applied').length },
    { name: 'Under Review', count: grants.filter(g => g.status === 'Under Review').length },
    { name: 'Awarded', count: grants.filter(g => g.status === 'Awarded').length },
    { name: 'Reported', count: grants.filter(g => g.status === 'Reported').length },
  ];

  const totalRequested = grants.reduce((sum, g) => sum + g.amount, 0);
  const awarded = grants.filter(g => g.status === 'Awarded').reduce((sum, g) => sum + g.amount, 0);
  const pending = grants.filter(g => ['Applied', 'Under Review'].includes(g.status)).reduce((sum, g) => sum + g.amount, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Grant Tracking</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor grant applications and deadlines</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:shadow-lg transition-shadow flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          New Application
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Requested</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">${(totalRequested/1000).toFixed(0)}K</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{grants.length} applications</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Awarded</p>
          <p className="text-3xl font-bold text-green-600">${(awarded/1000).toFixed(0)}K</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{Math.round((awarded/totalRequested)*100)}% success rate</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending</p>
          <p className="text-3xl font-bold text-orange-600">${(pending/1000).toFixed(0)}K</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Under review</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Reports Due</p>
          <p className="text-3xl font-bold text-blue-600">2</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Next 30 days</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grant Status Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Grant Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusCounts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" angle={-15} textAnchor="end" height={80} />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Bar dataKey="count" fill="#3b82f6" name="Count" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Upcoming Deadlines</h3>
          <div className="space-y-4">
            {grants.filter(g => g.reportDue).slice(0, 4).map((grant) => {
              const daysLeft = Math.ceil((new Date(grant.reportDue!).getTime() - Date.now()) / (24 * 60 * 60 * 1000));
              const isUrgent = daysLeft < 14;

              return (
                <div key={grant.id} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <CalendarIcon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-gray-100 truncate">{grant.program}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{grant.funder}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Due: {grant.reportDue && new Date(grant.reportDue).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    isUrgent
                      ? 'bg-red-100 text-red-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {daysLeft} days
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grant Applications Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">All Applications</h3>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option>All</option>
            <option>Applied</option>
            <option>Under Review</option>
            <option>Awarded</option>
            <option>Rejected</option>
            <option>Reported</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Funder</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Program</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Applied</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Next Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredGrants.map((grant) => (
                <tr key={grant.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900 dark:text-gray-100">{grant.funder}</p>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{grant.program}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{grant.purpose}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">
                    ${grant.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                      style={{
                        backgroundColor: STATUS_COLORS[grant.status as keyof typeof STATUS_COLORS] + '20',
                        color: STATUS_COLORS[grant.status as keyof typeof STATUS_COLORS],
                      }}
                    >
                      {grant.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                    {new Date(grant.applicationDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    {grant.reportDue ? (
                      <div className="text-xs">
                        <p className="text-gray-600 dark:text-gray-400">Report due</p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{new Date(grant.reportDue).toLocaleDateString()}</p>
                      </div>
                    ) : grant.status === 'Under Review' ? (
                      <span className="text-xs text-orange-600">Awaiting decision</span>
                    ) : grant.status === 'Applied' ? (
                      <span className="text-xs text-blue-600">Follow up</span>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
