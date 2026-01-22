'use client';

export default function BeneficiaryOutcomesPage() {
  const outcomes = [
    { category: 'Education', metric: 'Grade Level Improvement', value: 2.3, target: 2.0, unit: 'grades' },
    { category: 'Health', metric: 'Chronic Conditions Managed', value: 92, target: 85, unit: '%' },
    { category: 'Housing', metric: 'Permanent Housing Placement', value: 72, target: 65, unit: '%' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Beneficiary Outcomes</h1>
        <p className="text-gray-600 dark:text-gray-400">Track outcomes and success metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {outcomes.map((outcome, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{outcome.category}</p>
            <p className="font-medium text-gray-900 dark:text-gray-100 mb-3">{outcome.metric}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-green-600">{outcome.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{outcome.unit}</p>
            </div>
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Target: {outcome.target} {outcome.unit}
            </div>
            <div className="mt-3 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div
                className="h-full rounded-full bg-green-500"
                style={{ width: `${Math.min((outcome.value/outcome.target)*100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
