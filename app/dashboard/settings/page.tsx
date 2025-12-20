/**
 * Settings Page
 * Manage user preferences and system configuration
 */

'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(false);
  const [weeklyReports, setWeeklyReports] = useState(true);

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage your preferences and system configuration</p>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <input type="text" defaultValue="Demo User" className="w-full px-4 py-2 border border-gray-200 dark:border-dark-border-default rounded-lg bg-white dark:bg-dark-bg-primary text-gray-900 dark:text-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input type="email" defaultValue="user@ppg.com" className="w-full px-4 py-2 border border-gray-200 dark:border-dark-border-default rounded-lg bg-white dark:bg-dark-bg-primary text-gray-900 dark:text-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                <select className="w-full px-4 py-2 border border-gray-200 dark:border-dark-border-default rounded-lg bg-white dark:bg-dark-bg-primary text-gray-900 dark:text-gray-100">
                  <option>Administrator</option>
                  <option>Consultant</option>
                  <option>Finance Manager</option>
                  <option>Partner Manager</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">Email Notifications</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Receive email updates about important events</div>
                </div>
                <button onClick={() => setEmailNotifications(!emailNotifications)} className={`w-12 h-6 rounded-full transition-colors ${emailNotifications ? 'bg-teal-500' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${emailNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">Slack Notifications</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Get notified in Slack channels</div>
                </div>
                <button onClick={() => setSlackNotifications(!slackNotifications)} className={`w-12 h-6 rounded-full transition-colors ${slackNotifications ? 'bg-teal-500' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${slackNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">Weekly Reports</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Receive weekly summary reports</div>
                </div>
                <button onClick={() => setWeeklyReports(!weeklyReports)} className={`w-12 h-6 rounded-full transition-colors ${weeklyReports ? 'bg-teal-500' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${weeklyReports ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Organization</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Organization Name</label>
                <input type="text" defaultValue="Phoenix Philanthropy Group" className="w-full px-4 py-2 border border-gray-200 dark:border-dark-border-default rounded-lg bg-white dark:bg-dark-bg-primary text-gray-900 dark:text-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time Zone</label>
                <select className="w-full px-4 py-2 border border-gray-200 dark:border-dark-border-default rounded-lg bg-white dark:bg-dark-bg-primary text-gray-900 dark:text-gray-100">
                  <option>Pacific Time (PT)</option>
                  <option>Mountain Time (MT)</option>
                  <option>Central Time (CT)</option>
                  <option>Eastern Time (ET)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button className="px-4 py-2 border border-gray-200 dark:border-dark-border-default rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
              Cancel
            </button>
            <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
