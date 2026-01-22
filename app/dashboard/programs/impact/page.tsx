'use client';

import { useState } from 'react';
import { CheckCircledIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { monthlyImpact } from '@/src/data/np-edge/programsData';

export default function ImpactPage() {
  const [timeRange, setTimeRange] = useState<string>('12 months');

  // Overall impact metrics
  const totalBeneficiaries = 1760;
  const totalActivities = 289;
  const avgSatisfaction = 93;
  const impactGrowth = 18;

  // Program outcome scores (radar chart)
  const outcomeScores = [
    { category: 'Education', score: 92, target: 85 },
    { category: 'Health', score: 88, target: 80 },
    { category: 'Housing', score: 85, target: 80 },
    { category: 'Food Security', score: 95, target: 90 },
    { category: 'Youth Services', score: 90, target: 85 },
    { category: 'Senior Services', score: 87, target: 80 },
  ];

  // Success stories by category
  const successMetrics = [
    {
      category: 'Education',
      metric: 'Students Improved 2+ Grade Levels',
      value: 127,
      percentage: 89,
      color: '#3b82f6',
    },
    {
      category: 'Health',
      metric: 'Chronic Conditions Managed',
      value: 342,
      percentage: 92,
      color: '#10b981',
    },
    {
      category: 'Housing',
      metric: 'Families Transitioned to Permanent Housing',
      value: 48,
      percentage: 72,
      color: '#8b5cf6',
    },
    {
      category: 'Food Security',
      metric: 'Households Food Secure',
      value: 687,
      percentage: 84,
      color: '#f59e0b',
    },
    {
      category: 'Youth Services',
      metric: 'College Enrollment Rate',
      value: 58,
      percentage: 68,
      color: '#ec4899',
    },
    {
      category: 'Senior Services',
      metric: 'Reduced Social Isolation',
      value: 101,
      percentage: 65,
      color: '#14b8a6',
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Maria G.',
      program: 'After-School Tutoring',
      quote: 'My daughter\'s reading improved 3 grade levels in just 6 months. She now loves learning!',
      impact: 'Reading Level: Grade 4 → Grade 7',
    },
    {
      name: 'Robert J.',
      program: 'Senior Wellness',
      quote: 'This program gave me a reason to get out of the house. I\'ve made lifelong friends here.',
      impact: 'Social Engagement: +85%',
    },
    {
      name: 'Jennifer M.',
      program: 'Emergency Housing',
      quote: 'They helped me get back on my feet. I now have a stable home and a full-time job.',
      impact: 'Housing: Homeless → Permanent',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Impact Measurement</h1>
          <p className="text-gray-600 dark:text-gray-400">Track outcomes, measure success, and demonstrate impact</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option>12 months</option>
          <option>6 months</option>
          <option>3 months</option>
          <option>Year to date</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Lives Impacted</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{totalBeneficiaries.toLocaleString()}</p>
          <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
            <ArrowUpIcon className="w-4 h-4" />
            {impactGrowth}% from last year
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Program Activities</p>
          <p className="text-3xl font-bold text-blue-600">{totalActivities}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">This month</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Satisfaction Score</p>
          <p className="text-3xl font-bold text-green-600">{avgSatisfaction}%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Beneficiary feedback</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Success Rate</p>
          <p className="text-3xl font-bold text-purple-600">87%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Achieved goals</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Impact Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Monthly Impact Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyImpact}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Line type="monotone" dataKey="beneficiaries" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 5 }} name="Beneficiaries" />
              <Line type="monotone" dataKey="satisfaction" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 4 }} name="Satisfaction %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Program Outcome Scores */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Program Outcome Scores</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={outcomeScores}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="category" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#6b7280" />
              <Radar name="Actual Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Radar name="Target" dataKey="target" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.3} />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Success Metrics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">Key Success Metrics by Program Area</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {successMetrics.map((metric) => (
            <div key={metric.category} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: metric.color }} />
                <h4 className="font-bold text-gray-900 dark:text-gray-100">{metric.category}</h4>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{metric.metric}</p>
              <div className="flex items-baseline gap-2 mb-2">
                <p className="text-3xl font-bold" style={{ color: metric.color }}>{metric.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">people</p>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ backgroundColor: metric.color, width: `${metric.percentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{metric.percentage}% success rate</p>
            </div>
          ))}
        </div>
      </div>

      {/* Success Stories / Testimonials */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">Success Stories</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((story, idx) => (
            <div key={idx} className="p-6 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircledIcon className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-gray-100">{story.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{story.program}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">"{story.quote}"</p>
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-700">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Impact</p>
                <p className="text-sm font-bold text-blue-600">{story.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg shadow p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">2024 Impact Summary</h3>
            <p className="text-blue-100 mb-4">Our programs have touched lives across the community</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-3xl font-bold">1,760</p>
                <p className="text-sm text-blue-100">Lives Changed</p>
              </div>
              <div>
                <p className="text-3xl font-bold">89%</p>
                <p className="text-sm text-blue-100">Success Rate</p>
              </div>
              <div>
                <p className="text-3xl font-bold">3,468</p>
                <p className="text-sm text-blue-100">Total Activities</p>
              </div>
              <div>
                <p className="text-3xl font-bold">93%</p>
                <p className="text-sm text-blue-100">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
