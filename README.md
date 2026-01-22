# NP-Edge Demo
**Nonprofit Operations Platform for Arizona Friends of Foster Children Foundation (AFFCF)**

> **Navigation:** Left-pane sidebar with nonprofit modules
> **Pattern:** Sidebar + top navbar (no footer navigation)
> **Pages:** Dashboard + 8 nonprofit operation modules
> **AI Orbs:** 5 intelligent assistants (OpsChief, Pulse, Tasks, AskPS, PageKB)

A comprehensive nonprofit operations management platform for foster care organizations, showcasing:
- **Program Management** - Track foster care programs, beneficiaries, and impact metrics
- **Fundraising & Development** - Donor management, campaigns, and gift tracking
- **Volunteer Management** - Volunteer roster, hours, skills, and engagement
- **Beneficiary Services** - Foster children served, caseworkers, program enrollment
- **Compliance & Governance** - 990 forms, board minutes, grant reporting
- **Event Management** - Fundraising events, volunteer days, community engagement

**Latest:** Transformed from PS-Edge consulting demo with sidebar navigation, nonprofit modules, and green/teal branding.

## ✨ Key Features

### 5 AI Orbs
- **OpsChief** - Nonprofit operational health insights
- **Pulse** - Real-time activity notifications
- **Tasks** - AICR-synced task management
- **AskNP** - AI chat assistant for nonprofit questions
- **PageKB** - Context-aware documentation

### Nonprofit Modules
- **Dashboard** - Overview with key metrics (programs, fundraising, volunteers, beneficiaries)
- **Programs** - 6 AFFCF programs (Keys to Success, Educational Support, Scholarships, etc.)
- **Fundraising** - Donor management, campaigns, YTD progress
- **Volunteers** - 342 active volunteers, hours tracking, retention metrics
- **Beneficiaries** - 2,547 foster children served YTD, caseworker assignments
- **Compliance** - Form 990, Arizona annual report, board governance
- **Events** - Fundraising galas, volunteer days, community events
- **Settings** - Profile, AI features, preferences

### Sidebar Navigation Pattern
- Fixed left sidebar with module navigation
- Top navbar with user menu and dark mode toggle
- Mobile-responsive with collapsible sidebar
- Green/teal color scheme (nonprofit branding)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Neon (Vercel Postgres) + Prisma ORM
- **Deployment**: Vercel + GitHub
- **AI**: Vercel AI SDK Gateway → AICR Platform
- **UI**: React 19.2, TypeScript 5.9, Tailwind CSS 4.1
- **Charts**: Recharts 3.4
- **Icons**: Radix UI Icons
- **Markdown**: react-markdown + gray-matter

## Project Structure (Nonprofit Modules)

```
np-edge-demo/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx                 # Main dashboard (AFFCF overview)
│   │   ├── programs/                # Program management
│   │   ├── fundraising/             # Donor & campaign management
│   │   ├── volunteers/              # Volunteer roster & hours
│   │   ├── beneficiaries/           # Foster children served
│   │   ├── compliance/              # 990s, governance docs
│   │   ├── events/                  # Events & activities
│   │   ├── pulse/                   # Pulse orb page
│   │   ├── tasks/                   # Tasks orb page
│   │   └── settings/                # User settings
│   └── (public)/                    # Public pages
├── src/
│   ├── components/
│   │   ├── layout/AppLayout.tsx     # Sidebar navigation layout
│   │   ├── ai/                      # 5 AI orb components
│   │   └── kb/                      # Knowledge base panel
│   ├── config/
│   │   └── brand.config.ts          # Green/teal nonprofit theme
│   └── contexts/
└── prisma/
    └── schema.prisma                # Nonprofit data models
```

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL

# Run development server (port 3034)
npm run dev

# Open browser
open http://localhost:3034
```

## Environment Variables

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3034"

# Optional: AICR Platform Integration
AICR_API_KEY="..."
AICR_TENANT_ID="..."
```

## Demo Data

All data shown is **synthetic** for demonstration purposes:
- 6 AFFCF programs (Keys to Success, Educational Support, Scholarships, etc.)
- 1,240 donors, $1.85M raised YTD
- 342 active volunteers, 12,840 hours contributed
- 2,547 foster children served, 2,345 currently active
- Compliance items (Form 990, board minutes, grants)
- 18 events YTD, 4 upcoming

## Organization: Arizona Friends of Foster Children Foundation

**Mission:** Enriching the lives of children in Arizona's foster care system through mentorship, education, and support services.

**Founded:** 1980s (40+ years serving Arizona foster youth)

**Programs:**
1. **Keys to Success** - Mentorship and guidance
2. **Educational Support** - Tutoring, resources, field trips
3. **Scholarship Program** - College/vocational scholarships
4. **Transition Services** - Support for aging out (18-21)
5. **Activity Funding** - Extracurriculars, sports, arts
6. **Life Skills** - Driver training, job readiness, financial literacy

**Contact:**
- Location: Phoenix, Arizona
- Phone: (602) 252-9445
- Website: affcf.org

## Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Generate Prisma client
npx prisma generate

# Open Prisma Studio
npx prisma studio
```

## Demo Ecosystem Connection

- **PS-Edge Demo** (port 3033): Phoenix Philanthropy Group consulting firm - shows PPG managing AFFCF as a client
- **NP-Edge Demo** (port 3034): Arizona Friends of Foster Children Foundation - shows AFFCF's internal nonprofit operations

This creates a complete demo showing both sides:
1. Consulting firm managing nonprofit clients (PS-Edge)
2. Nonprofit managing its own operations (NP-Edge)

## Deployment

Deployed on Vercel with automatic deployments from GitHub:

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## License

MIT - Demo/Educational purposes

## Support

For questions about AFFCF: Visit [affcf.org](https://affcf.org)
For demo questions: Contact Phoenix Philanthropy Group
