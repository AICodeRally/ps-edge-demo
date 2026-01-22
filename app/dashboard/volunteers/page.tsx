'use client';

import Link from 'next/link';
import { volunteers } from '@/src/data/np-edge/volunteersData';

export default function VolunteersPage() {
  // Calculate stats from mock data
  const totalHrs = volunteers.reduce((sum, v) => sum + v.totalHours, 0);
  const avgHrs = totalHrs / volunteers.length;
  const stats = {
    total: volunteers.length,
    totalVolunteers: volunteers.length,
    active: volunteers.filter(v => v.status === 'Active').length,
    activeVolunteers: volunteers.filter(v => v.status === 'Active').length,
    totalHours: totalHrs,
    avgHours: Math.round(avgHrs),
    avgHoursPerVolunteer: avgHrs,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Volunteers</h1>
          <p className="text-gray-600 mt-1">Manage volunteer engagement and track contributions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Volunteers</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <div className="text-sm text-gray-600">Active Volunteers</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">
              {stats.totalHours.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Hours</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600">
              {stats.avgHoursPerVolunteer.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Avg Hours/Volunteer</div>
          </div>
        </div>

        {/* Volunteers Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">All Volunteers</h2>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Skills
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Assignments
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {volunteers.map((volunteer) => (
                <tr key={volunteer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{volunteer.name}</div>
                    <div className="text-sm text-gray-500">{volunteer.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      volunteer.status === 'Active' ? 'bg-green-100 text-green-800' :
                      volunteer.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {volunteer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex flex-wrap gap-1">
                      {volunteer.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                      {volunteer.skills.length > 3 && (
                        <span className="text-gray-400 text-xs">+{volunteer.skills.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {volunteer.totalHours}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {volunteer.assignedPrograms.length} active
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(volunteer.joinDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
