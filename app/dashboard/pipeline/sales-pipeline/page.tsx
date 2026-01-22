/**
 * PIPELINE - Sales Pipeline
 * Active deals and opportunities tracking
 */

'use client';

export default function SalesPipelinePage() {
  const deals = [
    { client: 'Ocean Conservation Foundation', value: 84000, stage: 'Proposal', service: 'Strategic Planning', consultant: 'Sarah Chen', daysInStage: 18, probability: 65 },
    { client: 'Urban Innovation Lab', value: 72000, stage: 'Negotiation', service: 'AI Readiness', consultant: 'Marcus Rodriguez', daysInStage: 8, probability: 80 },
    { client: 'Heritage Arts Initiative', value: 68000, stage: 'Decision', service: 'Board Development', consultant: 'Sarah Chen', daysInStage: 4, probability: 75 },
    { client: 'Safe Harbor Housing', value: 62000, stage: 'Proposal', service: 'Campaign Fundraising', consultant: 'Emily Foster', daysInStage: 12, probability: 55 },
    { client: 'Community Food Network', value: 58000, stage: 'Discovery', service: 'Strategic Planning', consultant: 'David Kim', daysInStage: 6, probability: 40 },
    { client: 'Youth Leadership Foundation', value: 54000, stage: 'Negotiation', service: 'Grant Writing', consultant: 'Marcus Rodriguez', daysInStage: 10, probability: 70 },
    { client: 'Green Future Alliance', value: 48000, stage: 'Proposal', service: 'AI Readiness', consultant: 'Sarah Chen', daysInStage: 5, probability: 80 },
    { client: 'Lakeside Arts Center', value: 42000, stage: 'Decision', service: 'Executive Coaching', consultant: 'Emily Foster', daysInStage: 2, probability: 85 },
  ];

  const pipelineByStage = [
    { stage: 'Discovery', count: 4, value: 186000, avgDays: 8 },
    { stage: 'Proposal', count: 7, value: 524000, avgDays: 12 },
    { stage: 'Negotiation', count: 4, value: 286000, avgDays: 9 },
    { stage: 'Decision', count: 3, value: 224000, avgDays: 5 },
  ];

  const pipelineByService = [
    { service: 'Strategic Planning', count: 6, value: 412000, winRate: 45 },
    { service: 'AI Readiness', count: 4, value: 324000, winRate: 67 },
    { service: 'Campaign Fundraising', count: 3, value: 256000, winRate: 38 },
    { service: 'Board Development', count: 2, value: 186000, winRate: 38 },
    { service: 'Grant Writing', count: 2, value: 124000, winRate: 42 },
    { service: 'Executive Coaching', count: 1, value: 96000, winRate: 52 },
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Discovery': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'Proposal': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Negotiation': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'Decision': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Sales Pipeline</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Active deals and opportunities tracking</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-3 mt-4">
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
            <div className="text-xs text-orange-600 dark:text-orange-400 uppercase tracking-wide">Total Pipeline</div>
            <div className="text-lg font-bold text-orange-900 dark:text-orange-100 mt-1">$1.8M</div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
            <div className="text-xs text-amber-600 dark:text-amber-400 uppercase tracking-wide">Active Deals</div>
            <div className="text-lg font-bold text-amber-900 dark:text-amber-100 mt-1">18</div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
            <div className="text-xs text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">Avg Deal Size</div>
            <div className="text-lg font-bold text-yellow-900 dark:text-yellow-100 mt-1">$64K</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
            <div className="text-xs text-green-600 dark:text-green-400 uppercase tracking-wide">Win Rate</div>
            <div className="text-lg font-bold text-green-900 dark:text-green-100 mt-1">42%</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
            <div className="text-xs text-orange-600 dark:text-orange-400 uppercase tracking-wide">Weighted Value</div>
            <div className="text-lg font-bold text-orange-900 dark:text-orange-100 mt-1">$720K</div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Active Deals */}
          <div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border-default">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Active Deals</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Current opportunities in pipeline</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Client</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Stage</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Service</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Owner</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Days</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Probability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                  {deals.map((deal, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{deal.client}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">${deal.value.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStageColor(deal.stage)}`}>
                          {deal.stage}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{deal.service}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{deal.consultant}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{deal.daysInStage}d</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{deal.probability}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Pipeline by Stage */}
            <div className="card">
              <div className="p-4 border-b border-gray-200 dark:border-dark-border-default">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Pipeline by Stage</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Deal distribution across stages</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Stage</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Count</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Value</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Avg Days</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                    {pipelineByStage.map((stage, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{stage.stage}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{stage.count}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">${stage.value.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{stage.avgDays}d</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pipeline by Service */}
            <div className="card">
              <div className="p-4 border-b border-gray-200 dark:border-dark-border-default">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Pipeline by Service Line</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Opportunities by service type</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Service</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Deals</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Value</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Win Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                    {pipelineByService.map((service, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{service.service}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{service.count}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">${service.value.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{service.winRate}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
