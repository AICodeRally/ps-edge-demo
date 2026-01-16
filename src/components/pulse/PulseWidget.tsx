'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ActivityLogIcon, ArrowRightIcon, ReloadIcon } from '@radix-ui/react-icons';
import { getPulseFeed, PulseCard, getChiefName, getUrgencyColor } from '@/src/lib/pulse-service';

export function PulseWidget() {
  const [cards, setCards] = useState<PulseCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getPulseFeed();
      // Show only top 3 critical/high cards
      const topCards = response.cards
        .filter(c => c.urgency === 'critical' || c.urgency === 'high')
        .slice(0, 3);
      setCards(topCards);
    } catch (err) {
      console.error('Failed to fetch Pulse cards:', err);
      setError('Failed to load');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="relative rounded-lg border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 shadow-sm overflow-hidden">
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-800 text-white">
              <ActivityLogIcon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Pulse
              </h3>
              <p className="text-xs text-purple-600 dark:text-purple-400">Channel Insights</p>
            </div>
          </div>
          {!isLoading && (
            <button
              onClick={fetchCards}
              className="rounded p-1 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
              aria-label="Refresh"
            >
              <ReloadIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Cards */}
        {isLoading ? (
          <div className="flex items-center justify-center py-6">
            <ReloadIcon className="w-5 h-5 animate-spin text-purple-600" />
          </div>
        ) : error ? (
          <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3 text-xs text-red-600 dark:text-red-400">
            {error}
          </div>
        ) : cards.length === 0 ? (
          <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-3 text-center">
            <p className="text-sm text-green-800 dark:text-green-400 font-medium">
              All clear!
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              No urgent insights
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {cards.map((card) => {
              const urgencyColors = getUrgencyColor(card.urgency);
              const chiefName = getChiefName(card.chief);
              const timeAgo = new Date(card.createdAt).toLocaleDateString();

              return (
                <div
                  key={card.id}
                  className={`rounded-md border ${urgencyColors} p-2 text-xs bg-white dark:bg-gray-900`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className={`font-semibold ${urgencyColors}`}>
                      {card.urgency.toUpperCase()}
                    </span>
                    <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                      {chiefName}
                    </span>
                  </div>
                  <p className="text-gray-900 dark:text-gray-100 font-medium mb-1 line-clamp-1">
                    {card.title}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-2">
                    {card.summary}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{timeAgo}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* View All Link */}
        <Link
          href="/dashboard/pulse"
          className="mt-3 flex items-center justify-center gap-1.5 rounded-md bg-gradient-to-r from-purple-600 to-purple-700 px-3 py-2 text-xs font-medium text-white hover:from-purple-700 hover:to-purple-800 transition-all"
        >
          View All Insights
          <ArrowRightIcon className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
