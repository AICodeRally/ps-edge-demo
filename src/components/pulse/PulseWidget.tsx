'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ActivityLogIcon, ArrowRightIcon, ReloadIcon } from '@radix-ui/react-icons';
import { getPulseFeed } from '@/src/lib/pulse-service';
import type { PulseCard } from '@/src/lib/pulse-service';

const urgencyStyles = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800',
};

export function PulseWidget() {
  const [cards, setCards] = useState<PulseCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFeed = async () => {
    setIsLoading(true);
    const response = await getPulseFeed();
    setCards(response.cards.slice(0, 3));
    setIsLoading(false);
  };

  useEffect(() => {
    loadFeed();
    const interval = setInterval(loadFeed, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <ActivityLogIcon className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Pulse</h3>
        </div>
        <Link
          href="/pulse"
          className="flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
        >
          View All
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-sm text-gray-500">
          <ReloadIcon className="w-5 h-5 animate-spin mx-auto mb-2" />
          Loading...
        </div>
      ) : cards.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm text-gray-600">All systems operational</p>
        </div>
      ) : (
        <div className="space-y-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${urgencyStyles[card.urgency]}`}>
                  {card.urgency.toUpperCase()}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(card.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">{card.title}</h4>
              <p className="text-xs text-gray-600 line-clamp-2">{card.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
