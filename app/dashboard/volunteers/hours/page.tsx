'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { volunteerHours, monthlyVolunteerMetrics } from '@/src/data/np-edge/volunteersData';

export default function VolunteerHoursPage() {
  const totalHours = volunteerHours.reduce((sum, v) => sum + v.hours, 0);
  const avgHours = totalHours / volunteerHours.length;
  const totalShifts = volunteerHours.reduce((sum, v) => sum + v.shifts, 0);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Volunteer Hours</h1>
        <p className="text-gray-600 dark:text-gray-400">Track volunteer contributions and time</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Hours</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{totalHours.toLocaleString()}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">This year</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Shifts</p>
          <p className="text-3xl font-bold text-blue-600">{totalShifts}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Completed</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Hours/Volunteer</p>
          <p className="text-3xl font-bold text-green-600">{avgHours.toFixed(1)}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Per month</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Volunteers</p>
          <p className="text-3xl font-bold text-purple-600">{volunteerHours.length}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Contributing</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Monthly Volunteer Hours</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyVolunteerMetrics}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
            <Legend />
            <Bar dataKey="hours" fill="#3b82f6" name="Hours" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Hours by Volunteer</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Volunteer</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Month</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Hours</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Shifts</th>
              </tr>
            </thead>
            <tbody>
              {volunteerHours.map((record) => (
                <tr key={`${record.volunteerId}-${record.month}`} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">{record.volunteerName}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{record.month}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-gray-100 font-semibold">{record.hours}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{record.shifts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
