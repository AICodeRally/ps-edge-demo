/**
 * PLATFORM - AI Management
 * Manage AI tools and agents
 */

'use client';

export default function AIPage() {
  const aiModels = [
    { model: 'GPT-4 Turbo', requests: 12847, avgLatency: '1.2s', successRate: 99.1, costPerRequest: '$0.034', totalCost: '$437' },
    { model: 'Claude Sonnet 3.5', requests: 8234, avgLatency: '0.9s', successRate: 99.4, costPerRequest: '$0.028', totalCost: '$231' },
    { model: 'GPT-3.5 Turbo', requests: 2947, avgLatency: '0.6s', successRate: 98.8, costPerRequest: '$0.012', totalCost: '$35' },
    { model: 'Claude Haiku', requests: 863, avgLatency: '0.4s', successRate: 97.2, costPerRequest: '$0.008', totalCost: '$7' },
  ];

  const recentRequests = [
    { timestamp: '2m ago', model: 'GPT-4 Turbo', prompt: 'Generate proposal summary for client...', tokens: 2847, duration: '1.4s', status: 'Success' },
    { timestamp: '5m ago', model: 'Claude Sonnet 3.5', prompt: 'Analyze engagement health metrics...', tokens: 1923, duration: '1.1s', status: 'Success' },
    { timestamp: '8m ago', model: 'GPT-3.5 Turbo', prompt: 'Draft email template for invoice...', tokens: 743, duration: '0.7s', status: 'Success' },
    { timestamp: '12m ago', model: 'GPT-4 Turbo', prompt: 'Extract key insights from client...', tokens: 3421, duration: '1.8s', status: 'Success' },
    { timestamp: '15m ago', model: 'Claude Haiku', prompt: 'Quick summary of timesheet data...', tokens: 512, duration: '0.5s', status: 'Success' },
    { timestamp: '18m ago', model: 'GPT-4 Turbo', prompt: 'Generate risk assessment report...', tokens: 4192, duration: '2.1s', status: 'Failed' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">AI Management</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage AI tools and agents</p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-3 mt-4">
          <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg p-3">
            <div className="text-xs text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-wide">Total AI Requests</div>
            <div className="text-lg font-bold text-fuchsia-900 dark:text-fuchsia-100 mt-1">24,891</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
            <div className="text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wide">Success Rate</div>
            <div className="text-lg font-bold text-purple-900 dark:text-purple-100 mt-1">98.7%</div>
          </div>
          <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-3">
            <div className="text-xs text-pink-600 dark:text-pink-400 uppercase tracking-wide">Avg Response Time</div>
            <div className="text-lg font-bold text-pink-900 dark:text-pink-100 mt-1">1.2s</div>
          </div>
          <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg p-3">
            <div className="text-xs text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-wide">Models Active</div>
            <div className="text-lg font-bold text-fuchsia-900 dark:text-fuchsia-100 mt-1">4</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-3">
            <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Cost This Month</div>
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">$847</div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* AI Model Usage */}
          <div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border-default">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Model Usage</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Performance and cost breakdown by model</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Model</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Requests</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Avg Latency</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Success Rate</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Cost/Request</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Total Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                  {aiModels.map((model, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{model.model}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{model.requests.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{model.avgLatency}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{model.successRate}%</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{model.costPerRequest}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{model.totalCost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent AI Requests */}
          <div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border-default">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent AI Requests</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Latest AI model invocations and results</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Timestamp</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Model</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Prompt</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Tokens</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                  {recentRequests.map((request, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{request.timestamp}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{request.model}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">{request.prompt}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{request.tokens.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{request.duration}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          request.status === 'Success' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                        }`}>
                          {request.status}
                        </span>
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
