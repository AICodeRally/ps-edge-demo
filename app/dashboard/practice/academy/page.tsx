/**
 * PRACTICE - Advancement Academy
 * Professional development training for nonprofit professionals
 */

'use client';

import { SetPageTitle } from '@/src/components/SetPageTitle';

export default function AcademyPage() {
  const courses = [
    { name: 'Fundraising Fundamentals', enrollments: 45, duration: '6 weeks', satisfaction: '4.8/5', price: '$495' },
    { name: 'Board Governance Excellence', enrollments: 32, duration: '4 weeks', satisfaction: '4.7/5', price: '$395' },
    { name: 'Campaign Planning Certification', enrollments: 18, duration: '12 weeks', satisfaction: '4.9/5', price: '$1,295' },
    { name: 'Donor Relations Mastery', enrollments: 28, duration: '8 weeks', satisfaction: '4.6/5', price: '$695' },
    { name: 'AI for Nonprofits (2026)', enrollments: 12, duration: '4 weeks', satisfaction: '4.9/5', price: '$795', badge: 'NEW' },
  ];

  return (
    <div className="h-full flex flex-col">
      <SetPageTitle title="Advancement Academy" />
      
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Advancement Academy</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Professional development training for nonprofit professionals</p>
        
        <div className="grid grid-cols-4 gap-3 mt-4">
          <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg p-3">
            <div className="text-xs text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-wide">Total Enrollments</div>
            <div className="text-lg font-bold text-fuchsia-900 dark:text-fuchsia-100 mt-1">135</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
            <div className="text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wide">Active Courses</div>
            <div className="text-lg font-bold text-purple-900 dark:text-purple-100 mt-1">5</div>
          </div>
          <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-3">
            <div className="text-xs text-pink-600 dark:text-pink-400 uppercase tracking-wide">Avg Satisfaction</div>
            <div className="text-lg font-bold text-pink-900 dark:text-pink-100 mt-1">4.8/5</div>
          </div>
          <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg p-3">
            <div className="text-xs text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-wide">Revenue YTD</div>
            <div className="text-lg font-bold text-fuchsia-900 dark:text-fuchsia-100 mt-1">$89K</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto"><div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border-default">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Training Programs</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Course</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Enrollments</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Duration</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Satisfaction</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                  {courses.map((course, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                        <div className="flex items-center gap-2">
                          {course.name}
                          {course.badge && (
                            <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-full">
                              {course.badge}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{course.enrollments}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{course.duration}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{course.satisfaction}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100">{course.price}</td>
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
