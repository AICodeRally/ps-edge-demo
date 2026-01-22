import Link from 'next/link';
import { getAllPrograms, getProgramStats } from '@/src/lib/queries/programs';

export const dynamic = 'force-dynamic';

type ProgramRow = {
  id: string;
  name: string;
  category: string;
  status: string;
  manager: string;
  budget: number;
  beneficiaries: number;
  targetBeneficiaries: number;
};

export default async function ProgramsPage() {
  const programs = (await getAllPrograms()) as ProgramRow[];
  const stats = await getProgramStats();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Programs</h1>
          <p className="text-gray-600 mt-1">Manage nonprofit programs and track impact</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Programs</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <div className="text-sm text-gray-600">Active Programs</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">{stats.totalBeneficiaries}</div>
            <div className="text-sm text-gray-600">Beneficiaries Served</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600">
              ${(stats.totalBudget / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-gray-600">Total Budget</div>
          </div>
        </div>

        {/* Programs List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Program Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Manager
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Beneficiaries
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {programs.map((program) => (
                <tr key={program.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Link href={`/programs/${program.id}`} className="font-medium text-blue-600 hover:underline">
                      {program.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{program.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      program.status === 'Active' ? 'bg-green-100 text-green-800' :
                      program.status === 'Planned' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {program.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{program.manager}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    ${program.budget.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {program.beneficiaries} / {program.targetBeneficiaries}
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
