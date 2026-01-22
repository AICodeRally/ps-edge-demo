'use client';

import { useState } from 'react';
import { PlusIcon, ArrowUpIcon, ArrowDownIcon } from '@radix-ui/react-icons';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { programs } from '@/src/data/np-edge/programsData';

export default function BudgetPage() {
  const [viewType, setViewType] = useState<string>('overview');

  // Calculate totals
  const totalBudget = programs.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = programs.reduce((sum, p) => sum + p.spent, 0);
  const totalRemaining = totalBudget - totalSpent;
  const utilization = (totalSpent / totalBudget) * 100;

  // Budget by category
  const budgetByCategory = [
    { category: 'Education', budget: 125000, spent: 87500 },
    { category: 'Health', budget: 85000, spent: 62000 },
    { category: 'Housing', budget: 250000, spent: 198000 },
    { category: 'Food Security', budget: 180000, spent: 145000 },
    { category: 'Youth Services', budget: 95000, spent: 71000 },
    { category: 'Senior Services', budget: 110000, spent: 88000 },
  ];

  // Monthly spending trend
  const monthlySpending = [
    { month: 'Jan', budget: 71000, actual: 68500 },
    { month: 'Feb', budget: 71000, actual: 72800 },
    { month: 'Mar', budget: 71000, actual: 69200 },
    { month: 'Apr', budget: 71000, actual: 73500 },
    { month: 'May', budget: 71000, actual: 70100 },
    { month: 'Jun', budget: 71000, actual: 71900 },
    { month: 'Jul', budget: 71000, actual: 67800 },
    { month: 'Aug', budget: 71000, actual: 69400 },
    { month: 'Sep', budget: 71000, actual: 75200 },
    { month: 'Oct', budget: 71000, actual: 72600 },
    { month: 'Nov', budget: 71000, actual: 73100 },
    { month: 'Dec', budget: 71000, actual: 70800 },
  ];

  // Expense breakdown
  const expenseBreakdown = [
    { category: 'Salaries & Benefits', amount: 425000, percentage: 52 },
    { category: 'Program Costs', amount: 245000, percentage: 30 },
    { category: 'Facilities & Utilities', amount: 82000, percentage: 10 },
    { category: 'Marketing & Outreach', amount: 41000, percentage: 5 },
    { category: 'Administration', amount: 25000, percentage: 3 },
  ];

  const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Budget Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Track budget allocations, spending, and variances</p>
        </div>
        <div className="flex gap-3">
          <select
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="overview">Overview</option>
            <option value="programs">By Program</option>
            <option value="monthly">Monthly</option>
          </select>
          <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:shadow-lg transition-shadow flex items-center gap-2">
            <PlusIcon className="w-5 h-5" />
            New Budget Item
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Budget</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">${(totalBudget/1000).toFixed(0)}K</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">FY 2024</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Spent</p>
          <p className="text-3xl font-bold text-blue-600">${(totalSpent/1000).toFixed(0)}K</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{Math.round(utilization)}% utilized</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Remaining</p>
          <p className="text-3xl font-bold text-green-600">${(totalRemaining/1000).toFixed(0)}K</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{Math.round(100 - utilization)}% available</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Budget Health</p>
          <p className={`text-3xl font-bold ${
            utilization <= 80 ? 'text-green-600' :
            utilization <= 90 ? 'text-blue-600' :
            utilization <= 100 ? 'text-orange-600' :
            'text-red-600'
          }`}>
            {utilization <= 80 ? 'Good' :
             utilization <= 90 ? 'Fair' :
             utilization <= 100 ? 'Watch' :
             'Over'}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Status</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget vs Spending by Category */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Budget vs. Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetByCategory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" stroke="#6b7280" angle={-15} textAnchor="end" height={100} />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Legend />
              <Bar dataKey="budget" fill="#94a3b8" name="Budget" radius={[8, 8, 0, 0]} />
              <Bar dataKey="spent" fill="#3b82f6" name="Spent" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Expense Breakdown</h3>
          <div className="flex items-center gap-8">
            <ResponsiveContainer width="50%" height={300}>
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {expenseBreakdown.map((expense, index) => (
                <div key={expense.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: PIE_COLORS[index] }} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{expense.category}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{expense.percentage}%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">${(expense.amount/1000).toFixed(0)}K</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Spending Trend */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Monthly Spending Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlySpending}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              formatter={(value: number) => `$${value.toLocaleString()}`}
            />
            <Legend />
            <Line type="monotone" dataKey="budget" stroke="#94a3b8" strokeWidth={2} dot={{ fill: '#94a3b8', r: 4 }} name="Budget" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 5 }} name="Actual" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Budget Details Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">Budget Details by Category</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Category</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Budget</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Spent</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Remaining</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Utilization</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {budgetByCategory.map((category) => {
                const remaining = category.budget - category.spent;
                const utilization = (category.spent / category.budget) * 100;

                return (
                  <tr key={category.category} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">{category.category}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">${category.budget.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">${category.spent.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={remaining >= 0 ? 'text-green-600' : 'text-red-600'}>
                        ${Math.abs(remaining).toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 max-w-[120px]">
                          <div
                            className={`h-full rounded-full ${
                              utilization >= 100 ? 'bg-red-500' :
                              utilization >= 90 ? 'bg-orange-500' :
                              utilization >= 75 ? 'bg-blue-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(utilization, 100)}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12">
                          {Math.round(utilization)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                        utilization >= 100 ? 'bg-red-100 text-red-800' :
                        utilization >= 90 ? 'bg-orange-100 text-orange-800' :
                        utilization >= 75 ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {utilization >= 100 ? (
                          <>
                            <ArrowUpIcon className="w-3 h-3" />
                            Over
                          </>
                        ) : utilization >= 90 ? (
                          <>
                            <ArrowUpIcon className="w-3 h-3" />
                            High
                          </>
                        ) : utilization >= 75 ? (
                          'On Track'
                        ) : (
                          <>
                            <ArrowDownIcon className="w-3 h-3" />
                            Low
                          </>
                        )}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
