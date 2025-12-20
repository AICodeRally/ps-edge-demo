/**
 * Delivery Department Dashboard
 * Shows Delivery-specific 6Ps metrics
 */

import Link from 'next/link';
import { SixPsDashboard } from '@/src/components/ps-edge/SixPsDashboard';
import { DELIVERY_SIX_PS } from '@/src/data/ps-edge/six-ps.data';
import { RocketIcon, PersonIcon, FileTextIcon } from '@radix-ui/react-icons';

export default function DeliveryDashboard() {
  const navigationTiles = [
    {
      title: 'Engagements',
      description: 'View and manage all engagements',
      href: '/dashboard/delivery/engagements',
      icon: RocketIcon,
      color: 'bg-blue-500',
    },
    {
      title: 'Team',
      description: 'Team capacity and utilization',
      href: '/dashboard/delivery/team',
      icon: PersonIcon,
      color: 'bg-purple-500',
    },
    {
      title: 'Deliverables',
      description: 'Track project deliverables',
      href: '/dashboard/delivery/deliverables',
      icon: FileTextIcon,
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-dept-delivery rounded-lg">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-dept-delivery">
              Delivery Department
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Engagements, Deliverables & Team Performance
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Navigation Tiles */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
              Quick Actions
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {navigationTiles.map((tile) => (
                <Link
                  key={tile.href}
                  href={tile.href}
                  className="card p-6 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`${tile.color} w-12 h-12 flex items-center justify-center rounded-lg shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <tile.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-dept-delivery transition-colors">
                        {tile.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {tile.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 6Ps Dashboard - Delivery Specific */}
          <div>
            <SixPsDashboard
              data={DELIVERY_SIX_PS}
              title="Delivery 6Ps Performance"
              subtitle="Key metrics for delivery team utilization, project success, and client satisfaction"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
