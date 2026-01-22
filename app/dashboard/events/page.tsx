'use client';

import Link from 'next/link';

// Mock events data
const events = [
  {
    id: '1',
    name: 'Annual Gala Fundraiser',
    type: 'Fundraiser',
    status: 'Planned',
    startDate: new Date('2025-02-15'),
    location: 'Grand Hotel Ballroom',
    capacity: 300,
    registered: 245,
    goal: 50000,
    raised: 42000,
    coordinator: 'Sarah Johnson',
  },
  {
    id: '2',
    name: 'Community Service Day',
    type: 'Community',
    status: 'Active',
    startDate: new Date('2025-01-20'),
    location: 'City Park',
    capacity: 150,
    registered: 127,
    coordinator: 'Mike Chen',
  },
];

export default function EventsPage() {
  const stats = {
    total: events.length,
    active: events.filter(e => e.status === 'Active').length,
    upcoming: events.filter(e => e.status === 'Planned').length,
    totalRegistered: events.reduce((sum, e) => sum + e.registered, 0),
    totalRaised: events.reduce((sum, e) => sum + (e.raised || 0), 0),
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600 mt-1">Manage fundraising events and community engagement</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Events</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">{stats.upcoming}</div>
            <div className="text-sm text-gray-600">Upcoming Events</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">{stats.totalRegistered}</div>
            <div className="text-sm text-gray-600">Total Registrations</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600">
              ${(stats.totalRaised / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-gray-600">Total Raised</div>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">All Events</h2>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Event Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Raised
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map((event) => {
                const capacityPercentage = event.capacity ? (event.registered / event.capacity) * 100 : 0;
                const isUpcoming = new Date(event.startDate) > new Date();

                return (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{event.name}</div>
                      <div className="text-sm text-gray-500">{event.location}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{event.type}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        event.status === 'Active' ? 'bg-green-100 text-green-800' :
                        event.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                        event.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {new Date(event.startDate).toLocaleDateString()}
                      </div>
                      {isUpcoming && (
                        <div className="text-xs text-blue-600">Upcoming</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {event.registered} / {event.capacity}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className={`h-1.5 rounded-full ${
                            capacityPercentage >= 90 ? 'bg-red-600' :
                            capacityPercentage >= 70 ? 'bg-yellow-600' :
                            'bg-green-600'
                          }`}
                          style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ${(event.raised || 0).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
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
