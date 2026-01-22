'use client';

import { shifts } from '@/src/data/np-edge/volunteersData';

export default function VolunteerSchedulePage() {
  const openShifts = shifts.filter(s => s.status === 'Open').length;
  const fullShifts = shifts.filter(s => s.status === 'Full').length;
  const totalSpots = shifts.reduce((sum, s) => sum + s.spotsTotal, 0);
  const filledSpots = shifts.reduce((sum, s) => sum + s.spotsFilled, 0);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Volunteer Schedule</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage volunteer shifts and assignments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Shifts</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{shifts.length}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">This month</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Open Shifts</p>
          <p className="text-3xl font-bold text-orange-600">{openShifts}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Need volunteers</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Full Shifts</p>
          <p className="text-3xl font-bold text-green-600">{fullShifts}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Fully staffed</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Fill Rate</p>
          <p className="text-3xl font-bold text-blue-600">{Math.round((filledSpots/totalSpots)*100)}%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{filledSpots}/{totalSpots} spots</p>
        </div>
      </div>

      {/* Shifts Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Upcoming Shifts</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Program</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Role</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Time</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Spots</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift) => (
                <tr key={shift.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{new Date(shift.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">{shift.program}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{shift.role}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{shift.startTime} - {shift.endTime}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{shift.spotsFilled}/{shift.spotsTotal}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      shift.status === 'Full' ? 'bg-green-100 text-green-800' :
                      shift.status === 'Open' ? 'bg-orange-100 text-orange-800' :
                      shift.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {shift.status}
                    </span>
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
