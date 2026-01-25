/**
 * ACC Seed Data
 *
 * Initial data for App Registry and Agent Definitions.
 * Run via: npx ts-node src/lib/acc/seed.ts
 */

import { prisma } from '../db/prisma';

const DEMO_APPS = [
  {
    slug: 'spot',
    name: 'SPOT (Sales Performance Operations Tool)',
    description: 'Sales pipeline management and performance tracking',
    repoPath: '/Users/toddlebaron/dev/spot',
    repoUrl: 'https://github.com/toddlebaron/spot',
    port: 3020,
    hostname: 'spot.local',
    tier: 'demo',
    status: 'active',
  },
  {
    slug: 'sgm-summit-demo',
    name: 'SGM Summit Demo',
    description: 'Strategic Growth Management summit demonstration',
    repoPath: '/Users/toddlebaron/dev/sgm-summit-demo',
    repoUrl: 'https://github.com/toddlebaron/sgm-summit-demo',
    port: 3030,
    hostname: 'sgm.local',
    tier: 'demo',
    status: 'active',
  },
  {
    slug: 'ps-edge-demo',
    name: 'PS-Edge Demo',
    description: 'Professional Services Edge - consulting operations and channel partner portal',
    repoPath: '/Users/toddlebaron/dev/ps-edge-demo',
    repoUrl: 'https://github.com/toddlebaron/ps-edge-demo',
    port: 3033,
    hostname: 'ps.local',
    tier: 'demo',
    status: 'active',
  },
];

export async function seedApps() {
  console.log('Seeding ACC apps...');

  for (const app of DEMO_APPS) {
    try {
      const existing = await prisma.appRegistry.findUnique({
        where: { slug: app.slug },
      });

      if (existing) {
        console.log(`  - ${app.slug}: already exists, updating...`);
        await prisma.appRegistry.update({
          where: { slug: app.slug },
          data: app,
        });
      } else {
        console.log(`  - ${app.slug}: creating...`);
        await prisma.appRegistry.create({ data: app });
      }
    } catch (error) {
      console.error(`  - ${app.slug}: failed -`, error);
    }
  }

  console.log('Done seeding apps!');
}

export async function seedAll() {
  await seedApps();
  // Future: sync agents from files
}

// Run if called directly
if (require.main === module) {
  seedAll()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
