'use client';

import { useSession } from 'next-auth/react';
import { PersonIcon } from '@radix-ui/react-icons';

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Profile</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-2xl mx-auto">
          <div className="card p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white text-2xl font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{user?.name || 'User'}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email || 'user@ps-edge.com'}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={user?.name || ''}
                  disabled
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border-default bg-gray-50 dark:bg-dark-bg-tertiary text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border-default bg-gray-50 dark:bg-dark-bg-tertiary text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Profile editing coming soon
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
