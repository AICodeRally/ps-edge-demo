'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SIX_PS_DEFINITIONS, type SixPCategory } from '@/types/ps-edge/six-ps.types';
import {
  PersonIcon,
  GearIcon,
  RocketIcon,
  BarChartIcon,
  PieChartIcon,
  StarIcon,
  ArrowRightIcon,
  TargetIcon,
  LightningBoltIcon,
  HeartIcon,
} from '@radix-ui/react-icons';

const iconMap: Record<SixPCategory, React.ComponentType<{ className?: string }>> = {
  PEOPLE: PersonIcon,
  PROCESS: GearIcon,
  PRACTICE: RocketIcon,
  PERFORMANCE: BarChartIcon,
  PIPELINE: PieChartIcon,
  PURPOSE: StarIcon,
};

const sixPsDescriptions: Record<SixPCategory, string> = {
  PEOPLE: 'Team capacity and workforce management',
  PROCESS: 'Workflow efficiency and deliverables',
  PRACTICE: 'Methodologies, tools, and delivery excellence',
  PERFORMANCE: 'KPIs and operational metrics',
  PIPELINE: 'Sales pipeline, proposals, and revenue forecasting',
  PURPOSE: 'Mission alignment and client impact',
};

/**
 * Public Landing Page
 * Shows before authentication - introduces PS-Edge and the 6 P's framework
 */
export default function LandingPage() {
  const { status } = useSession();
  const router = useRouter();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  // Show loading while checking auth
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  const sixPs: SixPCategory[] = ['PURPOSE', 'PEOPLE', 'PROCESS', 'PRACTICE', 'PIPELINE', 'PERFORMANCE'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-8">
            {/* Left: PS Logo */}
            <div
              className="w-32 h-32 rounded-2xl flex items-center justify-center shadow-2xl flex-shrink-0"
              style={{
                backgroundImage: 'linear-gradient(135deg, #9333ea, #c026d3, #facc15)',
              }}
            >
              <span className="text-white font-bold text-5xl">PS</span>
            </div>

            {/* Right: Text Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                Professional Services{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #9333ea, #c026d3, #db2777, #facc15)',
                  }}
                >
                  Edge
                </span>
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
                Complete operations platform for nonprofit consulting firms.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage clients, projects, team utilization, billing, and channel partnerships—organized by the 6 P's framework.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 P's Framework Section */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            The 6 P's Framework
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Every aspect of your consulting business organized by function—29 pages of powerful tools.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sixPs.map((pCategory) => {
              const config = SIX_PS_DEFINITIONS[pCategory];
              const IconComponent = iconMap[pCategory];

              return (
                <div
                  key={pCategory}
                  className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow border-2 transition-all hover:shadow-md"
                  style={{
                    borderColor: `${config.colorHex}40`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: `${config.colorHex}20`,
                        color: config.colorHex,
                      }}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold" style={{ color: config.colorHex }}>
                      {config.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 pl-10">
                    {sixPsDescriptions[pCategory]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Domain Pack Section */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-purple-50 to-teal-50 dark:from-purple-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Nonprofit Consulting Pack
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              Specialized capabilities for capital campaigns, strategic planning, board development, grant writing, executive coaching, and the full spectrum of nonprofit advancement services. Includes 2026 AI Line of Service: readiness assessments, ethical governance frameworks, and pilot implementations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                  <TargetIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-0.5">Strategic Services</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Campaign fundraising, strategic planning, board development, grant writing, feasibility studies, alumni relations
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <LightningBoltIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-0.5">AI Advisory</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    AI readiness assessments, ethical governance policy development, donor analytics pilots, chatbot implementations, training workshops
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
                  <HeartIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-0.5">Capacity Building</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Executive coaching, interim management, Advancement Academy workshops, relationship management, operational fundraising
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 px-6 pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <Link
            href="/auth/signin"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white rounded-xl shadow-lg transition-all hover:opacity-90 hover:shadow-2xl"
            style={{
              backgroundImage: 'linear-gradient(90deg, #9333ea, #c026d3, #db2777, #facc15)',
            }}
          >
            Get Started
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            Demo mode: Enter <span className="font-mono text-purple-600 dark:text-purple-400">admin@ppg.com</span> to explore
          </p>
        </div>
      </section>
    </div>
  );
}
