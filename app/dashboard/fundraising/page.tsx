'use client';

import Link from 'next/link';
import { donors } from '@/src/data/np-edge/fundraisingData';

export default function DonorsPage() {
  // Calculate stats from mock data
  const totalGiving = donors.reduce((sum, d) => sum + d.totalGiving, 0);
  const stats = {
    totalDonors: donors.length,
    activeDonors: donors.filter(d => d.status === 'Active').length,
    totalGiving: totalGiving,
    totalRaised: totalGiving, // Same as totalGiving for donors
    avgGift: Math.round(totalGiving / donors.length),
    avgDonation: Math.round(totalGiving / donors.length),
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Donor Management</h1>
          <p className="text-gray-600 mt-1">Track donors, donations, and fundraising campaigns</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-gray-900">{stats.totalDonors}</div>
            <div className="text-sm text-gray-600">Total Donors</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">{stats.activeDonors}</div>
            <div className="text-sm text-gray-600">Active Donors</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">
              ${(stats.totalRaised / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-gray-600">Total Raised</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600">
              ${(stats.avgDonation / 1000).toFixed(1)}K
            </div>
            <div className="text-sm text-gray-600">Avg Donation</div>
          </div>
        </div>


        {/* Donors Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">All Donors</h2>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total Giving
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Last Gift
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Member Since
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donors.map((donor) => (
                <tr key={donor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{donor.name}</div>
                    <div className="text-sm text-gray-500">{donor.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{donor.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      donor.status === 'Active' ? 'bg-green-100 text-green-800' :
                      donor.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {donor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    ${donor.totalGiving.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {donor.lastGift ? new Date(donor.lastGift).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(donor.memberSince).toLocaleDateString()}
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
