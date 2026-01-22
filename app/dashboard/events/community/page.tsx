'use client';

export default function CommunityEventsPage() {
  const events = [
    { id: '1', name: 'Community Service Day', date: '2025-02-15', attendees: 127, capacity: 150, type: 'Volunteer' },
    { id: '2', name: 'Educational Workshop', date: '2025-02-20', attendees: 45, capacity: 50, type: 'Program' },
    { id: '3', name: 'Town Hall Meeting', date: '2025-03-01', attendees: 0, capacity: 200, type: 'Outreach' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Community Events</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage community engagement and outreach</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-gray-900 dark:text-gray-100">{event.name}</h3>
              <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {event.type}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {new Date(event.date).toLocaleDateString()}
            </p>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">Attendance</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{event.attendees}/{event.capacity}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{ width: `${(event.attendees/event.capacity)*100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
