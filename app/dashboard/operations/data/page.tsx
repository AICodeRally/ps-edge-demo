/**
 * Operations - Data Management
 * Import, export, and bulk manage client, engagement, and consultant data
 */

'use client';

import { useState } from 'react';
import {
  DownloadIcon,
  UploadIcon,
  FileTextIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  ReloadIcon,
} from '@radix-ui/react-icons';

interface DataEntity {
  id: string;
  name: string;
  description: string;
  recordCount: number;
  lastUpdated: string;
  exportFormats: string[];
}

const dataEntities: DataEntity[] = [
  {
    id: 'clients',
    name: 'Clients',
    description: 'Client organizations and contact information',
    recordCount: 247,
    lastUpdated: '2025-01-15',
    exportFormats: ['CSV', 'Excel', 'JSON'],
  },
  {
    id: 'engagements',
    name: 'Engagements',
    description: 'Active and historical client engagements',
    recordCount: 428,
    lastUpdated: '2025-01-14',
    exportFormats: ['CSV', 'Excel', 'JSON'],
  },
  {
    id: 'consultants',
    name: 'Consultants',
    description: 'Internal team members and contractors',
    recordCount: 156,
    lastUpdated: '2025-01-13',
    exportFormats: ['CSV', 'Excel', 'JSON'],
  },
  {
    id: 'proposals',
    name: 'Proposals',
    description: 'Sales proposals and quotes',
    recordCount: 312,
    lastUpdated: '2025-01-12',
    exportFormats: ['CSV', 'Excel', 'JSON', 'PDF'],
  },
  {
    id: 'timesheets',
    name: 'Timesheets',
    description: 'Time tracking and billable hours',
    recordCount: 8453,
    lastUpdated: '2025-01-15',
    exportFormats: ['CSV', 'Excel'],
  },
  {
    id: 'invoices',
    name: 'Invoices',
    description: 'Client invoices and payment records',
    recordCount: 1876,
    lastUpdated: '2025-01-14',
    exportFormats: ['CSV', 'Excel', 'PDF'],
  },
];

interface ImportHistory {
  id: string;
  entityType: string;
  fileName: string;
  recordsImported: number;
  status: 'success' | 'failed' | 'partial';
  timestamp: string;
  errors?: number;
}

const recentImports: ImportHistory[] = [
  {
    id: '1',
    entityType: 'Clients',
    fileName: 'clients_2025_q1.csv',
    recordsImported: 47,
    status: 'success',
    timestamp: '2025-01-15 14:32',
  },
  {
    id: '2',
    entityType: 'Timesheets',
    fileName: 'timesheets_dec_2024.xlsx',
    recordsImported: 1247,
    status: 'success',
    timestamp: '2025-01-14 09:15',
  },
  {
    id: '3',
    entityType: 'Proposals',
    fileName: 'proposals_update.csv',
    recordsImported: 12,
    status: 'partial',
    timestamp: '2025-01-13 16:48',
    errors: 3,
  },
];

export default function DataManagementPage() {
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string>('CSV');

  const handleExport = (entityId: string, format: string) => {
    // In a real implementation, this would trigger a download
    console.log(`Exporting ${entityId} as ${format}`);
    alert(`Exporting ${entityId} data as ${format}...`);
  };

  const handleImport = (entityId: string) => {
    // In a real implementation, this would open a file picker
    console.log(`Importing data for ${entityId}`);
    alert(`Import functionality for ${entityId} would open here`);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Data Management
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Import, export, and bulk manage business data
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Data Entities */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Data Entities
            </h2>
            <div className="space-y-3">
              {dataEntities.map((entity) => (
                <div
                  key={entity.id}
                  className="p-4 rounded-lg border border-gray-200 dark:border-dark-border-default hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileTextIcon className="w-5 h-5 text-gray-400" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {entity.name}
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {entity.recordCount.toLocaleString()} records
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {entity.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>Last updated: {entity.lastUpdated}</span>
                        <span>•</span>
                        <span>Formats: {entity.exportFormats.join(', ')}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleImport(entity.id)}
                        className="px-4 py-2 rounded-lg border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors flex items-center gap-2"
                      >
                        <UploadIcon className="w-4 h-4" />
                        Import
                      </button>
                      <button
                        onClick={() => handleExport(entity.id, 'CSV')}
                        className="px-4 py-2 rounded-lg border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors flex items-center gap-2"
                      >
                        <DownloadIcon className="w-4 h-4" />
                        Export
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Import History */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Recent Imports
              </h2>
              <button className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border-default text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary transition-colors flex items-center gap-2">
                <ReloadIcon className="w-4 h-4" />
                Refresh
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border-default">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Entity Type
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      File Name
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Records
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentImports.map((imp) => (
                    <tr
                      key={imp.id}
                      className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary"
                    >
                      <td className="py-3 px-4">
                        {imp.status === 'success' && (
                          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                            <CheckCircledIcon className="w-4 h-4" />
                            <span className="text-sm">Success</span>
                          </div>
                        )}
                        {imp.status === 'failed' && (
                          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                            <CrossCircledIcon className="w-4 h-4" />
                            <span className="text-sm">Failed</span>
                          </div>
                        )}
                        {imp.status === 'partial' && (
                          <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                            <CrossCircledIcon className="w-4 h-4" />
                            <span className="text-sm">Partial ({imp.errors} errors)</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                        {imp.entityType}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {imp.fileName}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                        {imp.recordsImported.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {imp.timestamp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
