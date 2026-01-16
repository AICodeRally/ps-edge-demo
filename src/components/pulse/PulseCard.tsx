'use client';

import { useState } from 'react';
import { Cross2Icon, ClockIcon, CheckIcon, ExclamationTriangleIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { PulseCard as PulseCardType, getChiefName, getUrgencyColor } from '@/src/lib/pulse-service';

interface PulseCardProps {
  card: PulseCardType;
  onDismiss: (cardId: string) => Promise<void>;
  onSnooze: (cardId: string, preset: '1_hour' | '4_hours' | 'tomorrow' | 'next_week') => Promise<void>;
  onPursue: (cardId: string) => Promise<void>;
}

export function PulseCard({ card, onDismiss, onSnooze, onPursue }: PulseCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSnoozeOpen, setIsSnoozeOpen] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleAction = async (action: () => Promise<void>) => {
    setIsLoading(true);
    setActionError(null);
    try {
      await action();
    } catch (error) {
      console.error('Card action failed:', error);
      setActionError(error instanceof Error ? error.message : 'Action failed');
    } finally {
      setIsLoading(false);
    }
  };

  const urgencyColors = getUrgencyColor(card.urgency);
  const chiefName = getChiefName(card.chief);
  const timeAgo = new Date(card.createdAt).toLocaleString();

  return (
    <div
      className={`relative rounded-lg border-2 ${urgencyColors} p-4 shadow-sm transition-all hover:shadow-md bg-white dark:bg-gray-900`}
    >
      {/* Purple AI accent bar */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-600 to-purple-800 rounded-l-lg" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3 pl-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${urgencyColors}`}>
              {card.urgency === 'critical' && <ExclamationTriangleIcon className="w-3 h-3 mr-1" />}
              {card.urgency.toUpperCase()}
            </span>
            <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
              {chiefName}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
            {card.title}
          </h3>
        </div>
      </div>

      {/* Summary */}
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed pl-2">
        {card.summary}
      </p>

      {/* Source and timestamp */}
      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3 pl-2">
        <span>Source: {card.source}</span>
        <span className="text-gray-300 dark:text-gray-600">|</span>
        <span>{timeAgo}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-wrap pl-2">
        <button
          onClick={() => handleAction(() => onPursue(card.id))}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckIcon className="w-3 h-3" />
          Pursue
        </button>

        <div className="relative">
          <button
            onClick={() => setIsSnoozeOpen(!isSnoozeOpen)}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ClockIcon className="w-3 h-3" />
            Snooze
            <ChevronDownIcon className="w-3 h-3" />
          </button>

          {isSnoozeOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsSnoozeOpen(false)} />
              <div className="absolute left-0 top-full mt-1 w-32 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-1 shadow-lg z-20">
                <button onClick={() => { setIsSnoozeOpen(false); handleAction(() => onSnooze(card.id, '1_hour')); }} className="w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">1 hour</button>
                <button onClick={() => { setIsSnoozeOpen(false); handleAction(() => onSnooze(card.id, '4_hours')); }} className="w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">4 hours</button>
                <button onClick={() => { setIsSnoozeOpen(false); handleAction(() => onSnooze(card.id, 'tomorrow')); }} className="w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">Tomorrow</button>
                <button onClick={() => { setIsSnoozeOpen(false); handleAction(() => onSnooze(card.id, 'next_week')); }} className="w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">Next week</button>
              </div>
            </>
          )}
        </div>

        <button
          onClick={() => handleAction(() => onDismiss(card.id))}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Cross2Icon className="w-3 h-3" />
          Dismiss
        </button>
      </div>

      {/* Error message */}
      {actionError && (
        <div className="mt-3 ml-2 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-2 text-xs text-red-600 dark:text-red-400">
          {actionError}
        </div>
      )}
    </div>
  );
}
