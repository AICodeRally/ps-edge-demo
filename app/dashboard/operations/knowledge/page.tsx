/**
 * Operations - Knowledge Library
 * Methodologies, playbooks, best practices, and onboarding resources
 */

'use client';

import { useState } from 'react';
import {
  ReaderIcon,
  MagnifyingGlassIcon,
  EyeOpenIcon,
  ClockIcon,
} from '@radix-ui/react-icons';

interface KnowledgeAsset {
  id: string;
  title: string;
  type: 'Methodology' | 'Playbook' | 'Best Practice' | 'Case Study' | 'Training' | 'Research';
  category: 'Strategy' | 'Delivery' | 'Sales' | 'Operations' | 'Leadership' | 'Technical';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  views: number;
  lastUpdated: string;
  author: string;
  description: string;
  tags: string[];
}

const knowledgeAssets: KnowledgeAsset[] = [
  {
    id: '1',
    title: 'Strategic Planning Methodology',
    type: 'Methodology',
    category: 'Strategy',
    difficulty: 'Advanced',
    estimatedHours: 8,
    views: 2453,
    lastUpdated: '2025-01-15',
    author: 'Strategy Team',
    description:
      'Comprehensive framework for leading strategic planning engagements with nonprofit clients',
    tags: ['Strategy', 'Planning', 'Facilitation'],
  },
  {
    id: '2',
    title: 'Client Onboarding Playbook',
    type: 'Playbook',
    category: 'Operations',
    difficulty: 'Beginner',
    estimatedHours: 2,
    views: 1876,
    lastUpdated: '2025-01-12',
    author: 'Client Success Team',
    description:
      'Step-by-step guide for onboarding new consulting clients from contract to kickoff',
    tags: ['Onboarding', 'Process', 'Client Success'],
  },
  {
    id: '3',
    title: 'Proposal Development Best Practices',
    type: 'Best Practice',
    category: 'Sales',
    difficulty: 'Intermediate',
    estimatedHours: 4,
    views: 3214,
    lastUpdated: '2025-01-14',
    author: 'Sarah Chen',
    description:
      'Proven techniques for creating winning proposals that resonate with nonprofit decision-makers',
    tags: ['Sales', 'Proposals', 'Win Rate'],
  },
  {
    id: '4',
    title: 'Hopewell Community Foundation Case Study',
    type: 'Case Study',
    category: 'Strategy',
    difficulty: 'Intermediate',
    estimatedHours: 1,
    views: 892,
    lastUpdated: '2025-01-10',
    author: 'Michael Rodriguez',
    description:
      '$2.5M capital campaign success story with lessons learned and replicable tactics',
    tags: ['Capital Campaign', 'Fundraising', 'Success Story'],
  },
  {
    id: '5',
    title: 'Change Management Delivery Framework',
    type: 'Methodology',
    category: 'Delivery',
    difficulty: 'Advanced',
    estimatedHours: 12,
    views: 1456,
    lastUpdated: '2025-01-11',
    author: 'Delivery Team',
    description:
      'End-to-end methodology for organizational change management consulting projects',
    tags: ['Change Management', 'Methodology', 'Project Management'],
  },
  {
    id: '6',
    title: 'New Consultant Onboarding Path',
    type: 'Training',
    category: 'Leadership',
    difficulty: 'Beginner',
    estimatedHours: 40,
    views: 567,
    lastUpdated: '2025-01-08',
    author: 'HR Team',
    description:
      '6-week ramp program for new hires covering tools, methodologies, and client engagement',
    tags: ['Onboarding', 'Training', 'Ramp Path'],
  },
  {
    id: '7',
    title: 'Nonprofit Sector Trends 2025',
    type: 'Research',
    category: 'Strategy',
    difficulty: 'Intermediate',
    estimatedHours: 3,
    views: 2134,
    lastUpdated: '2025-01-05',
    author: 'Research Team',
    description:
      'Annual analysis of nonprofit sector trends, challenges, and opportunities for consultants',
    tags: ['Research', 'Trends', 'Industry Analysis'],
  },
  {
    id: '8',
    title: 'Data-Driven Decision Making for Nonprofits',
    type: 'Best Practice',
    category: 'Technical',
    difficulty: 'Intermediate',
    estimatedHours: 6,
    views: 1234,
    lastUpdated: '2025-01-13',
    author: 'Analytics Team',
    description:
      'Guide to helping nonprofit clients leverage data analytics for better outcomes',
    tags: ['Analytics', 'Data', 'Decision Making'],
  },
  {
    id: '9',
    title: 'Board Development Engagement Playbook',
    type: 'Playbook',
    category: 'Delivery',
    difficulty: 'Advanced',
    estimatedHours: 10,
    views: 987,
    lastUpdated: '2025-01-09',
    author: 'Governance Team',
    description:
      'Complete toolkit for strengthening nonprofit boards: assessment, recruitment, governance',
    tags: ['Board Development', 'Governance', 'Leadership'],
  },
  {
    id: '10',
    title: 'Grant Writing Fundamentals',
    type: 'Training',
    category: 'Delivery',
    difficulty: 'Beginner',
    estimatedHours: 8,
    views: 1678,
    lastUpdated: '2025-01-07',
    author: 'Development Team',
    description:
      'Foundational training on grant research, proposal writing, and post-award management',
    tags: ['Grants', 'Writing', 'Fundraising'],
  },
];

export default function KnowledgeLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  const filteredAssets = knowledgeAssets.filter((asset) => {
    const matchesSearch =
      asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || asset.type === filterType;
    const matchesCategory = filterCategory === 'all' || asset.category === filterCategory;
    const matchesDifficulty = filterDifficulty === 'all' || asset.difficulty === filterDifficulty;
    return matchesSearch && matchesType && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400';
      case 'Intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400';
      case 'Advanced':
        return 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400';
    }
  };

  const totalViews = knowledgeAssets.reduce((sum, asset) => sum + asset.views, 0);
  const totalHours = knowledgeAssets.reduce((sum, asset) => sum + asset.estimatedHours, 0);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Knowledge Library
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Methodologies, playbooks, best practices, and learning resources
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Assets</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {knowledgeAssets.length}
              </div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Views</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {totalViews.toLocaleString()}
              </div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Learning Hours
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {totalHours}
              </div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Methodologies</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {knowledgeAssets.filter((a) => a.type === 'Methodology').length}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="card p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search knowledge base..."
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
                <option value="Methodology">Methodologies</option>
                <option value="Playbook">Playbooks</option>
                <option value="Best Practice">Best Practices</option>
                <option value="Case Study">Case Studies</option>
                <option value="Training">Training</option>
                <option value="Research">Research</option>
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-gray-100"
              >
                <option value="all">All Categories</option>
                <option value="Strategy">Strategy</option>
                <option value="Delivery">Delivery</option>
                <option value="Sales">Sales</option>
                <option value="Operations">Operations</option>
                <option value="Leadership">Leadership</option>
                <option value="Technical">Technical</option>
              </select>
            </div>
            <div className="mt-4">
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-gray-100"
              >
                <option value="all">All Difficulty Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Knowledge Assets */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Knowledge Assets ({filteredAssets.length})
            </h2>
            <div className="space-y-4">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="p-5 rounded-lg border border-gray-200 dark:border-dark-border-default hover:border-gray-300 dark:hover:border-gray-600 transition-colors group cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <ReaderIcon className="w-6 h-6 text-gray-400 mt-1" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {asset.title}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${getDifficultyColor(
                            asset.difficulty
                          )}`}
                        >
                          {asset.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {asset.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded-full text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                          {asset.type}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                          {asset.category}
                        </span>
                        {asset.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-dark-bg-tertiary text-gray-600 dark:text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <ClockIcon className="w-4 h-4" />
                          <span>{asset.estimatedHours} hours</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <EyeOpenIcon className="w-4 h-4" />
                          <span>{asset.views.toLocaleString()} views</span>
                        </div>
                        <div>
                          <span className="text-gray-500">By:</span> {asset.author}
                        </div>
                        <div>
                          <span className="text-gray-500">Updated:</span> {asset.lastUpdated}
                        </div>
                      </div>
                    </div>
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
