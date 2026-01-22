'use client';

import { useState } from 'react';
import {
  Cross2Icon,
  ClockIcon,
  CheckCircledIcon,
  ExclamationTriangleIcon,
  ChevronDownIcon,
} from '@radix-ui/react-icons';
import type { PulseCard as PulseCardType } from '@/src/lib/pulse-service';
import { dismissCard, snoozeCard, pursueCard } from '@/src/lib/pulse-service';

interface PulseCardProps {
  card: PulseCardType;
  onAction?: () => void;
}

const urgencyStyles = {
  low: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', badge: 'bg-blue-100 text-blue-800' },
  medium: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', badge: 'bg-yellow-100 text-yellow-800' },
  high: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', badge: 'bg-orange-100 text-orange-800' },
  critical: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', badge: 'bg-red-100 text-red-800' },
};

export function PulseCard({ card, onAction }: PulseCardProps) {
  const [isSnoozeOpen, setIsSnoozeOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const style = urgencyStyles[card.urgency];

  const handleDismiss = async () => {
    setIsProcessing(true);
    const success = await dismissCard(card.id);
    setIsProcessing(false);
    if (success) onAction?.();
  };

  const handleSnooze = async (preset: '1_hour' | '4_hours' | 'tomorrow' | 'next_week') => {
    setIsProcessing(true);
    setIsSnoozeOpen(false);
    const success = await snoozeCard(card.id, preset);
    setIsProcessing(false);
    if (success) onAction?.();
  };

  const handlePursue = async () => {
    setIsProcessing(true);
    const success = await pursueCard(card.id);
    setIsProcessing(false);
    if (success) onAction?.();
  };

  return (
    <div className={`rounded-lg border-2 ${style.border} ${style.bg} p-4 transition-all hover:shadow-md`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <ExclamationTriangleIcon className={`w-5 h-5 mt-0.5 ${style.text}`} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 text-sm">{card.title}</h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${style.badge}`}>
                {card.urgency.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{card.summary}</p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>Source: {card.chiefName || card.source}</span>
              <span className="text-gray-300">|</span>
              <span>{new Date(card.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={handleDismiss}
            disabled={isProcessing}
            className="p-2 rounded-lg text-gray-500 hover:bg-white hover:text-gray-700 transition-colors disabled:opacity-50"
            title="Dismiss"
          >
            <Cross2Icon className="w-4 h-4" />
          </button>

          <div className="relative">
            <button
              onClick={() => setIsSnoozeOpen(!isSnoozeOpen)}
              disabled={isProcessing}
              className="p-2 rounded-lg text-gray-500 hover:bg-white hover:text-gray-700 transition-colors disabled:opacity-50 flex items-center gap-1"
              title="Snooze"
            >
              <ClockIcon className="w-4 h-4" />
              <ChevronDownIcon className="w-3 h-3" />
            </button>

            {isSnoozeOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsSnoozeOpen(false)} />
                <div className="absolute right-0 top-full mt-1 w-32 rounded-lg border border-gray-200 bg-white py-1 shadow-lg z-20">
                  <button onClick={() => handleSnooze('1_hour')} className="w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 text-gray-700">1 hour</button>
                  <button onClick={() => handleSnooze('4_hours')} className="w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 text-gray-700">4 hours</button>
                  <button onClick={() => handleSnooze('tomorrow')} className="w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 text-gray-700">Tomorrow</button>
                  <button onClick={() => handleSnooze('next_week')} className="w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 text-gray-700">Next week</button>
                </div>
              </>
            )}
          </div>

          <button
            onClick={handlePursue}
            disabled={isProcessing}
            className="px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-1 text-xs font-medium"
            title="Pursue"
          >
            <CheckCircledIcon className="w-4 h-4" />
            Pursue
          </button>
        </div>
      </div>
    </div>
  );
}
