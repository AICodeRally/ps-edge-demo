'use client';

import { ActivityLogIcon } from '@radix-ui/react-icons';
import { PulseFeed } from '@/src/components/pulse/PulseFeed';

export default function PulsePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              <ActivityLogIcon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pulse</h1>
              <p className="text-gray-600">Operations insights and recommendations</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Real-time operational intelligence powered by AICR Platform Chiefs
          </p>
        </div>

        {/* Feed */}
        <PulseFeed />
      </div>
    </div>
  );
}
