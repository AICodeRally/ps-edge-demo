'use client';

import { useState } from 'react';
import { RocketIcon, PlusIcon, CheckCircledIcon, ClockIcon } from '@radix-ui/react-icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { projects } from '@/src/data/np-edge/programsData';

const STATUS_COLORS = {
  'On Track': '#10b981',
  'At Risk': '#f59e0b',
  'Behind': '#ef4444',
  'Completed': '#3b82f6',
};

export default function ProjectsPage() {
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredProjects = projects.filter(p =>
    filterStatus === 'All' || p.status === filterStatus
  );

  const totalProjects = projects.length;
  const onTrack = projects.filter(p => p.status === 'On Track').length;
  const atRisk = projects.filter(p => p.status === 'At Risk').length;
  const avgProgress = Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / totalProjects);

  // Project progress overview
  const projectProgress = projects.map(p => ({
    name: p.name.length > 20 ? p.name.substring(0, 20) + '...' : p.name,
    progress: p.progress,
    budget: Math.round((p.spent / p.budget) * 100),
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Project Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Track project progress, milestones, and budgets</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:shadow-lg transition-shadow flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          New Project
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Projects</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{totalProjects}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Active initiatives</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">On Track</p>
          <p className="text-3xl font-bold text-green-600">{onTrack}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Meeting targets</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">At Risk</p>
          <p className="text-3xl font-bold text-orange-600">{atRisk}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Need attention</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg. Progress</p>
          <p className="text-3xl font-bold text-blue-600">{avgProgress}%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Overall completion</p>
        </div>
      </div>

      {/* Project Progress Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Project Progress Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={projectProgress}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" angle={-15} textAnchor="end" height={100} />
            <YAxis stroke="#6b7280" domain={[0, 100]} />
            <Tooltip
              contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              formatter={(value: number) => `${value}%`}
            />
            <Legend />
            <Bar dataKey="progress" fill="#3b82f6" name="Project Progress" radius={[8, 8, 0, 0]} />
            <Bar dataKey="budget" fill="#10b981" name="Budget Utilized" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Projects List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">All Projects</h3>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option>All</option>
            <option>On Track</option>
            <option>At Risk</option>
            <option>Behind</option>
            <option>Completed</option>
          </select>
        </div>

        <div className="space-y-6">
          {filteredProjects.map((project) => {
            const daysUntilDue = Math.ceil((new Date(project.dueDate).getTime() - Date.now()) / (24 * 60 * 60 * 1000));
            const budgetUtilization = (project.spent / project.budget) * 100;
            const completedMilestones = project.milestones.filter(m => m.completed).length;

            return (
              <div key={project.id} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <RocketIcon className="w-5 h-5 text-blue-600" />
                      <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">{project.name}</h4>
                      <span
                        className="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: STATUS_COLORS[project.status as keyof typeof STATUS_COLORS] + '20',
                          color: STATUS_COLORS[project.status as keyof typeof STATUS_COLORS],
                        }}
                      >
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{project.description}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        Due: {new Date(project.dueDate).toLocaleDateString()}
                      </span>
                      <span>Program: {project.programName}</span>
                      <span>Lead: {project.assignedTo}</span>
                      {daysUntilDue > 0 && daysUntilDue <= 30 && (
                        <span className="text-orange-600 font-medium">{daysUntilDue} days left</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Project Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Project Progress</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          project.progress >= 75 ? 'bg-green-500' :
                          project.progress >= 50 ? 'bg-blue-500' :
                          project.progress >= 25 ? 'bg-orange-500' :
                          'bg-gray-400'
                        }`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Budget Utilization */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Budget Utilization</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                        ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          budgetUtilization >= 90 ? 'bg-orange-500' :
                          budgetUtilization >= 75 ? 'bg-blue-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {Math.round(budgetUtilization)}% utilized
                    </p>
                  </div>
                </div>

                {/* Milestones */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Milestones</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {completedMilestones} of {project.milestones.length} completed
                    </p>
                  </div>
                  <div className="space-y-2">
                    {project.milestones.map((milestone, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                          milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {milestone.completed && <CheckCircledIcon className="w-4 h-4 text-white" />}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${
                            milestone.completed ? 'text-gray-900 dark:text-gray-100 line-through' : 'text-gray-900 dark:text-gray-100'
                          }`}>
                            {milestone.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Due: {new Date(milestone.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        {milestone.completed && (
                          <span className="text-xs text-green-600 font-medium">Completed</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
