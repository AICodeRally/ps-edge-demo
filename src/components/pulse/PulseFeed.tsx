'use client';

import { useState, useEffect } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { PulseCard } from './PulseCard';
import {
  getPulseFeed,
  dismissCard,
  snoozeCard,
  pursueCard,
  PulseCard as PulseCardType,
  PulseUrgency,
  PulseChief,
} from '@/src/lib/pulse-service';

export function PulseFeed() {
  const [cards, setCards] = useState<PulseCardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [urgencyFilter, setUrgencyFilter] = useState<PulseUrgency | 'all'>('all');
  const [chiefFilter, setChiefFilter] = useState<PulseChief | 'all'>('all');

  const fetchCards = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getPulseFeed();
      setCards(response.cards);
    } catch (err) {
      console.error('Failed to fetch Pulse cards:', err);
      setError(err instanceof Error ? err.message : 'Failed to load Pulse feed');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleDismiss = async (cardId: string) => {
    await dismissCard(cardId);
    setCards(prev => prev.filter(c => c.id !== cardId));
  };

  const handleSnooze = async (cardId: string, preset: '1_hour' | '4_hours' | 'tomorrow' | 'next_week') => {
    await snoozeCard(cardId, preset);
    setCards(prev => prev.filter(c => c.id !== cardId));
  };

  const handlePursue = async (cardId: string) => {
    await pursueCard(cardId);
    setCards(prev => prev.filter(c => c.id !== cardId));
  };

  // Apply filters
  const filteredCards = cards.filter(card => {
    if (urgencyFilter !== 'all' && card.urgency !== urgencyFilter) return false;
    if (chiefFilter !== 'all' && card.chief !== chiefFilter) return false;
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <ReloadIcon className="w-8 h-8 animate-spin text-purple-600" />
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading Pulse insights...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6">
        <p className="text-red-800 dark:text-red-400 mb-3">{error}</p>
        <button
          onClick={fetchCards}
          className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <div className="flex items-center justify-between gap-4 flex-wrap p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Urgency Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Urgency
            </label>
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value as PulseUrgency | 'all')}
              className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800"
            >
              <option value="all">All Urgency</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Chief Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Chief
            </label>
            <select
              value={chiefFilter}
              onChange={(e) => setChiefFilter(e.target.value as PulseChief | 'all')}
              className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800"
            >
              <option value="all">All Chiefs</option>
              <option value="gov">GovChief</option>
              <option value="ops">OpsChief</option>
              <option value="task">TaskChief</option>
              <option value="kb">KBChief</option>
              <option value="summit">SummitChief</option>
              <option value="strategy">StrategyChief</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {filteredCards.length} {filteredCards.length === 1 ? 'insight' : 'insights'}
          </span>
          <button
            onClick={fetchCards}
            disabled={isLoading}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all disabled:opacity-50"
          >
            <ReloadIcon className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Cards */}
      {filteredCards.length === 0 ? (
        <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-8 text-center border-2 border-purple-200 dark:border-purple-800">
          <p className="text-lg font-medium text-purple-900 dark:text-purple-100 mb-2">
            All caught up!
          </p>
          <p className="text-sm text-purple-700 dark:text-purple-300">
            No active Pulse insights at the moment. Your Chiefs are monitoring the situation.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredCards.map((card) => (
            <PulseCard
              key={card.id}
              card={card}
              onDismiss={handleDismiss}
              onSnooze={handleSnooze}
              onPursue={handlePursue}
            />
          ))}
        </div>
      )}
    </div>
  );
}
