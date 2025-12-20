import React, { useState, useMemo } from 'react';
import {
  CaretUpIcon,
  CaretDownIcon,
  CaretSortIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@radix-ui/react-icons';

interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (row: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string;
  onRowClick?: (row: T) => void;
  selectable?: boolean;
  pagination?: {
    pageSize: number;
  };
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  selectable = false,
  pagination
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aVal = (a as any)[sortConfig.key];
      const bVal = (b as any)[sortConfig.key];

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Filter data
  const filteredData = useMemo(() => {
    return sortedData.filter(row => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const cellValue = String((row as any)[key]).toLowerCase();
        return cellValue.includes(value.toLowerCase());
      });
    });
  }, [sortedData, filters]);

  // Paginate
  const paginatedData = useMemo(() => {
    if (!pagination) return filteredData;
    const start = (currentPage - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage, pagination]);

  const totalPages = pagination ? Math.ceil(filteredData.length / pagination.pageSize) : 1;

  const handleSort = (key: string) => {
    setSortConfig(prev => {
      if (!prev || prev.key !== key) return { key, direction: 'asc' };
      if (prev.direction === 'asc') return { key, direction: 'desc' };
      return null;
    });
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map(keyExtractor)));
    }
  };

  const handleSelectRow = (key: string) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  return (
    <div className="card overflow-hidden">
      {/* Bulk actions bar */}
      {selectable && selectedRows.size > 0 && (
        <div className="bg-brand-50 dark:bg-brand-900/20 border-b border-brand-200 dark:border-brand-800 px-6 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-brand-900 dark:text-brand-100">
              {selectedRows.size} selected
            </span>
            <div className="flex gap-2">
              <button className="btn-secondary text-sm">Export</button>
              <button className="btn-destructive text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-dark-bg-secondary border-b border-gray-200 dark:border-dark-border-default">
            <tr>
              {selectable && (
                <th className="w-12 px-6 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                  />
                </th>
              )}
              {columns.map(col => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-label-md text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  style={{ width: col.width }}
                >
                  <div className="flex items-center gap-2">
                    <span>{col.header}</span>
                    {col.sortable && (
                      <button
                        onClick={() => handleSort(col.key)}
                        className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                      >
                        {sortConfig?.key === col.key ? (
                          sortConfig.direction === 'asc' ? (
                            <CaretUpIcon className="w-4 h-4" />
                          ) : (
                            <CaretDownIcon className="w-4 h-4" />
                          )
                        ) : (
                          <CaretSortIcon className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                  {col.filterable && (
                    <div className="mt-2 relative">
                      <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Filter..."
                        value={filters[col.key] || ''}
                        onChange={(e) => {
                          setFilters(prev => ({ ...prev, [col.key]: e.target.value }));
                          setCurrentPage(1); // Reset to first page when filtering
                        }}
                        className="w-full pl-7 pr-2 py-1 text-sm border border-gray-300 dark:border-dark-border-default rounded bg-white dark:bg-dark-bg-tertiary text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default bg-white dark:bg-dark-bg-tertiary">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                >
                  <div className="flex flex-col items-center gap-2">
                    <MagnifyingGlassIcon className="w-8 h-8" />
                    <p className="text-sm">No results found</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map(row => {
                const rowKey = keyExtractor(row);
                return (
                  <tr
                    key={rowKey}
                    onClick={() => onRowClick?.(row)}
                    className={`transition-colors ${
                      onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-bg-secondary' : ''
                    } ${selectedRows.has(rowKey) ? 'bg-brand-50 dark:bg-brand-900/10' : ''}`}
                  >
                    {selectable && (
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedRows.has(rowKey)}
                          onChange={() => handleSelectRow(rowKey)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                        />
                      </td>
                    )}
                    {columns.map(col => (
                      <td key={col.key} className="px-6 py-4 text-body-sm text-gray-900 dark:text-gray-100">
                        {col.render ? col.render(row) : String((row as any)[col.key] || '')}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && filteredData.length > 0 && (
        <div className="bg-gray-50 dark:bg-dark-bg-secondary border-t border-gray-200 dark:border-dark-border-default px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Showing {((currentPage - 1) * pagination.pageSize) + 1} to{' '}
              {Math.min(currentPage * pagination.pageSize, filteredData.length)} of{' '}
              {filteredData.length} results
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1"
              >
                <ChevronLeftIcon className="w-4 h-4" />
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 rounded transition-colors ${
                        currentPage === pageNum
                          ? 'bg-brand-600 text-white'
                          : 'bg-white dark:bg-dark-bg-tertiary text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-bg-primary border border-gray-300 dark:border-dark-border-default'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1"
              >
                Next
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
