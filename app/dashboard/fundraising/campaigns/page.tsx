'use client';

import { useState } from 'react';
import { PlusIcon, CalendarIcon } from '@radix-ui/react-icons';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { campaigns } from '@/src/data/np-edge/fundraisingData';

const STATUS_COLORS = {
  'Active': '#10b981',
  'Completed': '#3b82f6',
  'Planned': '#f59e0b',
};

const TYPE_COLORS = {
  'Annual': '#3b82f6',
  'Capital': '#8b5cf6',
  'Special Event': '#14b8a6',
  'Emergency': '#ef4444',
};

export default function CampaignsPage() {
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredCampaigns = campaigns.filter(campaign =>
    filterStatus === 'All' || campaign.status === filterStatus
  );

  const totalGoal = campaigns.reduce((sum, c) => sum + c.goal, 0);
  const totalRaised = campaigns.reduce((sum, c) => sum + c.raised, 0);
  const activeCampaigns = campaigns.filter(c => c.status === 'Active').length;
  const completedCampaigns = campaigns.filter(c => c.status === 'Completed').length;

  // Campaign performance data for chart
  const campaignPerformance = campaigns.map(c => ({
    name: c.name.length > 20 ? c.name.substring(0, 20) + '...' : c.name,
    goal: c.goal,
    raised: c.raised,
    percentage: Math.round((c.raised / c.goal) * 100),
  }));

  // Monthly progress data (mock trend)
  const monthlyProgress = [
    { month: 'Jul', amount: 125000 },
    { month: 'Aug', amount: 158000 },
    { month: 'Sep', amount: 192000 },
    { month: 'Oct', amount: 234000 },
    { month: 'Nov', amount: 289000 },
    { month: 'Dec', amount: 387500 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Campaign Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Track fundraising campaigns and goals</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:shadow-lg transition-shadow flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          New Campaign
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Goal</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">${(totalGoal/1000000).toFixed(1)}M</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{campaigns.length} campaigns</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Raised</p>
          <p className="text-3xl font-bold text-green-600">${(totalRaised/1000000).toFixed(1)}M</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{Math.round((totalRaised/totalGoal)*100)}% of goal</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Campaigns</p>
          <p className="text-3xl font-bold text-orange-600">{activeCampaigns}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Currently running</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completed</p>
          <p className="text-3xl font-bold text-blue-600">{completedCampaigns}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">This year</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Campaign Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaignPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" angle={-15} textAnchor="end" height={100} />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Legend />
              <Bar dataKey="goal" fill="#94a3b8" name="Goal" radius={[8, 8, 0, 0]} />
              <Bar dataKey="raised" fill="#10b981" name="Raised" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Cumulative Progress (YTD)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 5 }} name="Raised" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Campaign Cards */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">All Campaigns</h3>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option>All</option>
            <option>Active</option>
            <option>Completed</option>
            <option>Planned</option>
          </select>
        </div>

        <div className="space-y-6">
          {filteredCampaigns.map((campaign) => {
            const progress = (campaign.raised / campaign.goal) * 100;
            const daysLeft = Math.ceil((new Date(campaign.endDate).getTime() - Date.now()) / (24 * 60 * 60 * 1000));

            return (
              <div key={campaign.id} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">{campaign.name}</h4>
                      <span
                        className="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: STATUS_COLORS[campaign.status as keyof typeof STATUS_COLORS] + '20',
                          color: STATUS_COLORS[campaign.status as keyof typeof STATUS_COLORS],
                        }}
                      >
                        {campaign.status}
                      </span>
                      <span
                        className="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: TYPE_COLORS[campaign.type as keyof typeof TYPE_COLORS] + '20',
                          color: TYPE_COLORS[campaign.type as keyof typeof TYPE_COLORS],
                        }}
                      >
                        {campaign.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}</span>
                      </div>
                      {campaign.status === 'Active' && daysLeft > 0 && (
                        <span className="text-orange-600 font-medium">{daysLeft} days left</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Goal</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${campaign.goal.toLocaleString()}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        progress >= 100 ? 'bg-green-500' :
                        progress >= 75 ? 'bg-blue-500' :
                        progress >= 50 ? 'bg-teal-500' :
                        'bg-orange-500'
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Raised</p>
                    <p className="text-lg font-bold text-green-600">${campaign.raised.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Remaining</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100">${(campaign.goal - campaign.raised).toLocaleString()}</p>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Donors</p>
                    <p className="text-lg font-bold text-blue-600">{campaign.donors}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
