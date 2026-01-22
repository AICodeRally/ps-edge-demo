/**
 * PEOPLE - Onboarding Tracker
 * Monitor client onboarding progress and milestones
 */

'use client';

const onboardingClients = [
  { client: 'Lakeside Arts Foundation', daysActive: 12, progress: 65, stage: 'Training', milestones: '3/5', health: 'On Track' },
  { client: 'Metro Food Bank', daysActive: 8, progress: 45, stage: 'Data Migration', milestones: '2/5', health: 'On Track' },
  { client: 'Tech Education Alliance', daysActive: 5, progress: 30, stage: 'Initial Setup', milestones: '1/5', health: 'On Track' },
  { client: 'Ocean Conservation Group', daysActive: 18, progress: 75, stage: 'Go-Live Prep', milestones: '4/5', health: 'On Track' },
  { client: 'Urban Gardens Collective', daysActive: 22, progress: 55, stage: 'Training', milestones: '3/5', health: 'Delayed' },
];

export default function OnboardingPage() {
  const avgProgress = Math.round(onboardingClients.reduce((sum, c) => sum + c.progress, 0) / onboardingClients.length);
  const onTrack = onboardingClients.filter(c => c.health === 'On Track').length;
  const delayed = onboardingClients.filter(c => c.health === 'Delayed').length;
  const avgDays = Math.round(onboardingClients.reduce((sum, c) => sum + c.daysActive, 0) / onboardingClients.length);
  const completedMilestones = onboardingClients.reduce((sum, c) => sum + parseInt(c.milestones.split('/')[0]), 0);

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Onboarding Tracker</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Monitor new client onboarding progress</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-3 mt-4">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
            <div className="text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wide">Active Onboarding</div>
            <div className="text-lg font-bold text-purple-900 dark:text-purple-100 mt-1">{onboardingClients.length}</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
            <div className="text-xs text-green-600 dark:text-green-400 uppercase tracking-wide">Avg Progress</div>
            <div className="text-lg font-bold text-green-900 dark:text-green-100 mt-1">{avgProgress}%</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <div className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wide">On Track</div>
            <div className="text-lg font-bold text-blue-900 dark:text-blue-100 mt-1">{onTrack}</div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
            <div className="text-xs text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">Delayed</div>
            <div className="text-lg font-bold text-yellow-900 dark:text-yellow-100 mt-1">{delayed}</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Avg Days</div>
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">{avgDays}</div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="card p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-border-default">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Client</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Days Active</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Progress</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Current Stage</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Milestones</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Status</th>
                </tr>
              </thead>
              <tbody>
                {onboardingClients.map((client) => (
                  <tr key={client.client} className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">{client.client}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{client.daysActive}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-dark-bg-tertiary rounded-full overflow-hidden w-24">
                          <div className="h-full bg-blue-500" style={{ width: `${client.progress}%` }} />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{client.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{client.stage}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">{client.milestones}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        client.health === 'On Track' ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                        'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                      }`}>{client.health}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
