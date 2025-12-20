/**
 * Operations - Document Library
 * Manage templates, contracts, proposals, and deliverable documents
 */

'use client';

import { useState } from 'react';
import {
  FileTextIcon,
  DownloadIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
} from '@radix-ui/react-icons';

interface Document {
  id: string;
  name: string;
  type: 'Template' | 'Contract' | 'Proposal' | 'SOW' | 'Deliverable' | 'Guide';
  category: 'Sales' | 'Delivery' | 'Finance' | 'Legal' | 'Operations';
  format: 'PDF' | 'Word' | 'Excel' | 'PowerPoint';
  author: string;
  lastModified: string;
  downloads: number;
  size: string;
}

const documents: Document[] = [
  {
    id: '1',
    name: 'Standard Consulting Proposal Template',
    type: 'Template',
    category: 'Sales',
    format: 'Word',
    author: 'Sales Team',
    lastModified: '2025-01-15',
    downloads: 147,
    size: '2.3 MB',
  },
  {
    id: '2',
    name: 'Master Services Agreement (MSA)',
    type: 'Contract',
    category: 'Legal',
    format: 'PDF',
    author: 'Legal Team',
    lastModified: '2025-01-10',
    downloads: 89,
    size: '1.8 MB',
  },
  {
    id: '3',
    name: 'Statement of Work Template',
    type: 'SOW',
    category: 'Delivery',
    format: 'Word',
    author: 'Delivery Team',
    lastModified: '2025-01-12',
    downloads: 234,
    size: '1.5 MB',
  },
  {
    id: '4',
    name: 'Strategic Planning Engagement Proposal',
    type: 'Proposal',
    category: 'Sales',
    format: 'PowerPoint',
    author: 'Sarah Chen',
    lastModified: '2025-01-14',
    downloads: 56,
    size: '4.7 MB',
  },
  {
    id: '5',
    name: 'Time & Materials Rate Card',
    type: 'Template',
    category: 'Finance',
    format: 'Excel',
    author: 'Finance Team',
    lastModified: '2025-01-08',
    downloads: 178,
    size: '856 KB',
  },
  {
    id: '6',
    name: 'Change Management Deliverable Guide',
    type: 'Deliverable',
    category: 'Delivery',
    format: 'PDF',
    author: 'Michael Rodriguez',
    lastModified: '2025-01-11',
    downloads: 92,
    size: '3.2 MB',
  },
  {
    id: '7',
    name: 'Non-Disclosure Agreement (NDA)',
    type: 'Contract',
    category: 'Legal',
    format: 'PDF',
    author: 'Legal Team',
    lastModified: '2025-01-09',
    downloads: 201,
    size: '724 KB',
  },
  {
    id: '8',
    name: 'Executive Presentation Template',
    type: 'Template',
    category: 'Sales',
    format: 'PowerPoint',
    author: 'Marketing Team',
    lastModified: '2025-01-13',
    downloads: 143,
    size: '5.1 MB',
  },
  {
    id: '9',
    name: 'Project Status Report Template',
    type: 'Template',
    category: 'Delivery',
    format: 'PowerPoint',
    author: 'PMO Team',
    lastModified: '2025-01-07',
    downloads: 267,
    size: '2.8 MB',
  },
  {
    id: '10',
    name: 'Data Privacy Compliance Guide',
    type: 'Guide',
    category: 'Operations',
    format: 'PDF',
    author: 'Compliance Team',
    lastModified: '2025-01-06',
    downloads: 78,
    size: '1.9 MB',
  },
];

export default function DocumentLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || doc.type === filterType;
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'PDF':
        return 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400';
      case 'Word':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400';
      case 'Excel':
        return 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400';
      case 'PowerPoint':
        return 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Document Library
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Templates, contracts, proposals, and deliverable documents
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Documents
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {documents.length}
              </div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Downloads
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {documents.reduce((sum, doc) => sum + doc.downloads, 0).toLocaleString()}
              </div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Templates</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {documents.filter((d) => d.type === 'Template').length}
              </div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Contracts</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {documents.filter((d) => d.type === 'Contract').length}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="card p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-gray-100"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-gray-100"
              >
                <option value="all">All Types</option>
                <option value="Template">Templates</option>
                <option value="Contract">Contracts</option>
                <option value="Proposal">Proposals</option>
                <option value="SOW">SOWs</option>
                <option value="Deliverable">Deliverables</option>
                <option value="Guide">Guides</option>
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-gray-100"
              >
                <option value="all">All Categories</option>
                <option value="Sales">Sales</option>
                <option value="Delivery">Delivery</option>
                <option value="Finance">Finance</option>
                <option value="Legal">Legal</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
          </div>

          {/* Documents List */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Documents ({filteredDocuments.length})
            </h2>
            <div className="space-y-3">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-lg border border-gray-200 dark:border-dark-border-default hover:border-gray-300 dark:hover:border-gray-600 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <FileTextIcon className="w-6 h-6 text-gray-400 mt-1" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          {doc.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-dark-bg-tertiary text-gray-600 dark:text-gray-400">
                            {doc.type}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-dark-bg-tertiary text-gray-600 dark:text-gray-400">
                            {doc.category}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs ${getFormatColor(
                              doc.format
                            )}`}
                          >
                            {doc.format}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Author:</span>
                            <div className="text-gray-900 dark:text-gray-100">{doc.author}</div>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Modified:</span>
                            <div className="text-gray-900 dark:text-gray-100">
                              {doc.lastModified}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Downloads:</span>
                            <div className="text-gray-900 dark:text-gray-100">{doc.downloads}</div>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Size:</span>
                            <div className="text-gray-900 dark:text-gray-100">{doc.size}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-lg border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors flex items-center gap-2 opacity-0 group-hover:opacity-100">
                      <DownloadIcon className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
