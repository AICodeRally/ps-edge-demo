/**
 * Skeleton Loading Components
 * Reusable skeleton screens for better perceived performance
 */

import React from 'react';

/**
 * Base Skeleton Component
 * Generic pulsing skeleton element
 */
export const Skeleton: React.FC<{
  className?: string;
  width?: string;
  height?: string;
}> = ({ className = '', width, height }) => {
  const style = {
    ...(width && { width }),
    ...(height && { height })
  };

  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
      style={style}
    />
  );
};

/**
 * Skeleton Card
 * Loading state for dashboard metric cards
 */
export const SkeletonCard: React.FC = () => {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-3">
        <Skeleton width="60%" height="14px" />
        <Skeleton width="20px" height="20px" className="rounded-full" />
      </div>
      <Skeleton width="80%" height="32px" className="mb-2" />
      <Skeleton width="40%" height="12px" />
    </div>
  );
};

/**
 * Skeleton Table
 * Loading state for data tables
 */
export const SkeletonTable: React.FC<{
  rows?: number;
  columns?: number;
}> = ({ rows = 5, columns = 5 }) => {
  return (
    <div className="card overflow-hidden">
      {/* Table Header */}
      <div className="bg-gray-50 dark:bg-dark-bg-secondary border-b border-gray-200 dark:border-dark-border-default px-6 py-3">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} height="16px" />
          ))}
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200 dark:divide-dark-border-default">
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div key={rowIdx} className="px-6 py-4">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {Array.from({ length: columns }).map((_, colIdx) => (
                <Skeleton key={colIdx} height="20px" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="bg-gray-50 dark:bg-dark-bg-secondary border-t border-gray-200 dark:border-dark-border-default px-6 py-4">
        <div className="flex items-center justify-between">
          <Skeleton width="150px" height="14px" />
          <div className="flex items-center gap-2">
            <Skeleton width="80px" height="32px" />
            <Skeleton width="120px" height="32px" />
            <Skeleton width="80px" height="32px" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton Chart
 * Loading state for chart visualizations
 */
export const SkeletonChart: React.FC<{
  height?: string;
}> = ({ height = '300px' }) => {
  return (
    <div className="card p-6">
      <div className="mb-4">
        <Skeleton width="200px" height="24px" className="mb-2" />
        <Skeleton width="300px" height="14px" />
      </div>
      <div className="flex items-end gap-2" style={{ height }}>
        {Array.from({ length: 12 }).map((_, i) => {
          const randomHeight = Math.random() * 80 + 20;
          return (
            <div key={i} className="flex-1 flex items-end">
              <Skeleton
                width="100%"
                height={`${randomHeight}%`}
                className="rounded-t"
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} width="40px" height="12px" />
        ))}
      </div>
    </div>
  );
};

/**
 * Skeleton List Item
 * Loading state for list items (e.g., engagements, clients)
 */
export const SkeletonListItem: React.FC = () => {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Skeleton width="70%" height="20px" className="mb-2" />
          <Skeleton width="40%" height="14px" className="mb-3" />
          <Skeleton width="80px" height="24px" className="rounded-full" />
        </div>
        <div className="text-right">
          <Skeleton width="100px" height="14px" className="mb-1" />
          <Skeleton width="80px" height="12px" />
        </div>
      </div>
      <div className="space-y-2 mb-3">
        <Skeleton width="100%" height="12px" />
        <Skeleton width="90%" height="12px" />
      </div>
      <div className="flex gap-2">
        <Skeleton width="60px" height="24px" className="rounded" />
        <Skeleton width="80px" height="24px" className="rounded" />
        <Skeleton width="70px" height="24px" className="rounded" />
      </div>
    </div>
  );
};

/**
 * Skeleton Dashboard
 * Loading state for full dashboard pages
 */
export const SkeletonDashboard: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-dark-bg-primary">
      {/* Header */}
      <div className="bg-white dark:bg-dark-bg-secondary border-b border-gray-200 dark:border-dark-border-default px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <Skeleton width="4px" height="40px" className="rounded-full" />
            <div className="flex-1">
              <Skeleton width="200px" height="32px" className="mb-2" />
              <Skeleton width="300px" height="14px" />
            </div>
          </div>
          <Skeleton width="120px" height="40px" />
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="bg-white dark:bg-dark-bg-secondary border-b border-gray-200 dark:border-dark-border-default px-6 py-4">
        <div className="grid grid-cols-4 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-6">
        <div className="space-y-6">
          <SkeletonChart height="250px" />
          <SkeletonTable rows={5} columns={5} />
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton Text Block
 * Loading state for text content
 */
export const SkeletonText: React.FC<{
  lines?: number;
}> = ({ lines = 3 }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? '80%' : '100%'}
          height="14px"
        />
      ))}
    </div>
  );
};

/**
 * Skeleton Avatar
 * Loading state for user avatars
 */
export const SkeletonAvatar: React.FC<{
  size?: 'sm' | 'md' | 'lg';
}> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return <Skeleton className={`${sizeClasses[size]} rounded-full`} />;
};
