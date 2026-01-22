'use client';

import { useState, useEffect } from 'react';
import { PulseCard } from './PulseCard';
import { getPulseFeed } from '@/src/lib/pulse-service';
import type { PulseCard as PulseCardType, PulseUrgency } from '@/src/lib/pulse-service';
import { ReloadIcon } from '@radix-ui/react-icons';

export function PulseFeed() {
  const [cards, setCards] = useState<PulseCardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [urgencyFilter, setUrgencyFilter] = useState<PulseUrgency | 'all'>('all');

  const loadFeed = async () => {
    setIsLoading(true);
    const response = await getPulseFeed();
    setCards(response.cards);
    setIsLoading(false);
  };

  useEffect(() => {
    loadFeed();
    const interval = setInterval(loadFeed, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCardAction = () => {
    loadFeed();
  };

  const filteredCards = urgencyFilter === 'all'
    ? cards
    : cards.filter(card => card.urgency === urgencyFilter);

  if (isLoading && cards.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-2 text-gray-500">
          <ReloadIcon className="w-5 h-5 animate-spin" />
          <span>Loading Pulse feed...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Urgency:</label>
          <select
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value as PulseUrgency | 'all')}
            className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-700"
          >
            <option value="all">All</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <button
          onClick={loadFeed}
          disabled={isLoading}
          className="ml-auto px-4 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
        >
          <ReloadIcon className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Cards */}
      {filteredCards.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No Pulse cards found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCards.map((card) => (
            <PulseCard key={card.id} card={card} onAction={handleCardAction} />
          ))}
        </div>
      )}

      {/* Auto-refresh indicator */}
      {cards.length > 0 && (
        <div className="text-center text-xs text-gray-400 py-2">
          Auto-refreshing every 60 seconds
        </div>
      )}
    </div>
  );
}
