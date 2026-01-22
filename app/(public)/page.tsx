'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SIX_PS_DEFINITIONS, type SixPCategory } from '@/src/types/ps-edge/six-ps.types';
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-8">
            {/* Left: AF Logo */}
            <div
              className="w-32 h-32 rounded-2xl flex items-center justify-center shadow-2xl flex-shrink-0"
              style={{
                backgroundImage: 'linear-gradient(135deg, #22c55e, #14b8a6)',
              }}
            >
              <span className="text-white font-bold text-5xl">AF</span>
            </div>

            {/* Right: Text Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                Nonprofit{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #22c55e, #14b8a6)',
                  }}
                >
                  Edge
                </span>
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
                Complete operations platform for foster care organizations.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage programs, fundraising, volunteers, beneficiaries, compliance, and events—built for Arizona Friends of Foster Children Foundation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nonprofit Modules Section */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Nonprofit Operations Modules
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Everything you need to run a foster care nonprofit—programs, fundraising, volunteers, and compliance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow border-2 border-green-200 transition-all hover:shadow-md">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 bg-green-100 text-green-600">
                  <RocketIcon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-green-600">Programs</h3>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 pl-10">
                Foster care programs, beneficiaries served, and impact tracking
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow border-2 border-teal-200 transition-all hover:shadow-md">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 bg-teal-100 text-teal-600">
                  <HeartIcon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-teal-600">Fundraising</h3>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 pl-10">
                Donor management, campaigns, and gift tracking
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow border-2 border-blue-200 transition-all hover:shadow-md">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 bg-blue-100 text-blue-600">
                  <PersonIcon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-blue-600">Volunteers</h3>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 pl-10">
                Volunteer roster, hours tracking, and engagement
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow border-2 border-purple-200 transition-all hover:shadow-md">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 bg-purple-100 text-purple-600">
                  <TargetIcon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-purple-600">Beneficiaries</h3>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 pl-10">
                Foster children served, caseworkers, and program enrollment
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow border-2 border-gray-200 transition-all hover:shadow-md">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 bg-gray-100 text-gray-600">
                  <GearIcon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-gray-600">Compliance</h3>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 pl-10">
                Form 990, board minutes, and Arizona reporting
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow border-2 border-orange-200 transition-all hover:shadow-md">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 bg-orange-100 text-orange-600">
                  <StarIcon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-orange-600">Events</h3>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 pl-10">
                Fundraising galas, volunteer days, and community engagement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AFFCF Programs Section */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Arizona Friends of Foster Children Foundation
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              Enriching the lives of children in Arizona's foster care system through mentorship, education, and support services. Serving 2,500+ foster youth annually with 6 core programs and 342 active volunteers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                  <TargetIcon className="w-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-0.5">Mentorship & Education</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Keys to Success mentoring, Educational Support tutoring, Scholarship Program for college/vocational training
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <LightningBoltIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-0.5">Transition Services</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Support for youth aging out of foster care (18-21), including housing assistance, job readiness, life skills training
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <HeartIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-0.5">Activity & Enrichment</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Extracurricular activities funding, sports programs, arts participation, field trips, and community events
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
              backgroundImage: 'linear-gradient(90deg, #22c55e, #14b8a6)',
            }}
          >
            Get Started
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            Demo mode: Enter <span className="font-mono text-green-600 dark:text-green-400">admin@affcf.org</span> to explore
          </p>
        </div>
      </section>
    </div>
  );
}
