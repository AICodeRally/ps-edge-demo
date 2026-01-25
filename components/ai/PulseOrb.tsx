'use client';

import { useState, useEffect } from 'react';
import { ReaderIcon, Cross2Icon, BookmarkIcon } from '@radix-ui/react-icons';

interface PulseItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  url: string;
  readTime: string;
  timestamp: string;
  relevance: 'high' | 'medium' | 'low';
  bookmarked?: boolean;
}

interface PulseOrbProps {
  enabled?: boolean;
}

/**
 * PulseOrb - AI-curated content feed
 *
 * Displays curated articles, insights, and best practices:
 * - Nonprofit sector news and trends
 * - Best practices and research
 * - Content personalized to user's work (like ChatGPT daily digest)
 * - Based on browsing history and current projects
 *
 * Position: Bottom-left (position 2)
 */
export function PulseOrb({ enabled = true }: PulseOrbProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [pulseItems, setPulseItems] = useState<PulseItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    fetchPulse();

    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchPulse, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [enabled]);

  const fetchPulse = async () => {
    setIsLoading(true);
    setIsOffline(false);

    try {
      const response = await fetch('/api/ai/pulse?tenantId=ppg-main');
      if (!response.ok) throw new Error('Failed to fetch pulse');

      const data = await response.json();
      setPulseItems(data.items || []);
    } catch (error) {
      console.error('Pulse fetch error:', error);
      setIsOffline(true);
      // Use mock data when offline
      setPulseItems(getMockPulseItems());
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBookmark = (id: string) => {
    setPulseItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, bookmarked: !item.bookmarked } : item))
    );
  };

  const dismiss = (id: string) => {
    setPulseItems((prev) => prev.filter((item) => item.id !== id));
  };

  const unreadItems = pulseItems.filter((item) => !item.bookmarked);
  const newCount = unreadItems.length;

  if (!enabled) return null;

  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case 'high':
        return 'bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-500';
      case 'medium':
        return 'bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500';
      default:
        return 'bg-gray-50 dark:bg-gray-900/30 border-l-4 border-gray-400';
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    if (category.includes('Trending')) return 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300';
    if (category.includes('Best Practices')) return 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300';
    if (category.includes('Research')) return 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300';
    return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
  };

  return (
    <>
      {/* Orb Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-20 z-40 w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center text-white"
        style={{
          background: 'linear-gradient(135deg, #a855f7, #ec4899)',
        }}
        title="Pulse - Curated Content"
      >
        <ReaderIcon className="w-6 h-6" />
        {newCount > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold">
            {newCount}
          </span>
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-20 left-20 z-50 w-[600px] bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[750px] flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Your Pulse</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">Curated for you</span>
              {isOffline && (
                <span className="text-sm text-yellow-600 dark:text-yellow-400">(Offline)</span>
              )}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            >
              <Cross2Icon className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {isLoading && pulseItems.length === 0 ? (
              <div className="text-center text-gray-500 py-8">Loading content...</div>
            ) : pulseItems.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <ReaderIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No content available</p>
                <p className="text-xs mt-1">Check back later</p>
              </div>
            ) : (
              pulseItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-lg ${getRelevanceColor(item.relevance)}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getCategoryBadgeColor(item.category)}`}>
                        {item.category}
                      </span>
                      {item.relevance === 'high' && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
                          ★ For You
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => toggleBookmark(item.id)}
                      className="p-1 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded"
                      title={item.bookmarked ? "Unbookmark" : "Bookmark"}
                    >
                      <BookmarkIcon className={`w-4 h-4 ${item.bookmarked ? 'text-purple-600 fill-purple-600' : 'text-gray-400'}`} />
                    </button>
                  </div>
                  <h4 className="font-semibold text-base text-gray-900 dark:text-gray-100 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
                    {item.summary}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium">{item.source}</span>
                    <span>{item.readTime} read</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 text-center">
            Curated based on your recent work • Updates daily
          </div>
        </div>
      )}
    </>
  );
}

// Mock curated content for offline mode
function getMockPulseItems(): PulseItem[] {
  return [
    {
      id: '1',
      title: 'AI in Fundraising: 2026 Trends',
      summary: 'How nonprofits are using predictive analytics to identify major donor prospects. 76% lack governance policies - opportunity for consulting.',
      category: 'Trending',
      source: 'Nonprofit Quarterly',
      url: '#',
      readTime: '5 min',
      timestamp: new Date().toISOString(),
      relevance: 'high',
    },
    {
      id: '2',
      title: 'Board Engagement Best Practices',
      summary: 'New research on effective governance models for community foundations. Focus on volunteer leadership and accountability frameworks.',
      category: 'Best Practices',
      source: 'BoardSource',
      url: '#',
      readTime: '8 min',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      relevance: 'high',
    },
    {
      id: '3',
      title: 'Capital Campaign Success Rates',
      summary: 'Study of 500+ campaigns shows feasibility studies increase success rate by 42%. Silent phase strategies that work in 2026.',
      category: 'Research',
      source: 'CASE Insights',
      url: '#',
      readTime: '6 min',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      relevance: 'medium',
    },
    {
      id: '4',
      title: 'Executive Coaching ROI',
      summary: 'New study shows leadership development programs increase nonprofit ED retention by 28%. Best practices for coaching engagements.',
      category: 'Industry Report',
      source: 'Bridgespan Group',
      url: '#',
      readTime: '10 min',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      relevance: 'medium',
    },
  ];
}
