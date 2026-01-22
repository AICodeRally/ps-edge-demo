# NP-Edge: Old vs New System Comparison

## ✅ What's Complete

### Core Pages
| Page | Old Demo | New Demo | Status |
|------|----------|----------|--------|
| Dashboard | ✅ | ✅ | Complete |
| Programs | ✅ | ✅ | Complete with data |
| Fundraising (Donors) | ✅ | ✅ | Complete with data |
| Volunteers | ✅ | ✅ | Complete with data |
| Events | ✅ | ✅ | Complete with data |
| Beneficiaries | ❌ | ✅ | NEW - placeholder |
| Compliance | ❌ | ✅ | NEW - placeholder |

### Database
| Component | Old Demo | New Demo | Status |
|-----------|----------|----------|--------|
| Prisma Schema | ✅ Pattern B | ✅ Pattern A | **Upgraded** |
| Schema Location | `np_edge_demo` | `np_edge` | **Fixed** |
| Data Models | 14 models | 14 models | Complete |
| Seed Data | ❌ None | ✅ AFFCF data | **Added** |
| Database Setup | Local only | Shared Neon | **Improved** |

### Settings Pages
| Setting | Old Demo | New Demo | Status |
|---------|----------|----------|--------|
| Profile | ✅ | ✅ | Complete |
| Brand | ✅ | ✅ | Complete |
| AI Features | ✅ | ✅ | Complete |
| Modules | ❌ | ✅ | NEW (from PS-Edge) |

## ❌ What's Missing

### 1. AI Orb Test Data

**Current State:**
- 5 AI orb components exist (OpsChief, Pulse, Tasks, AskPS, PageKB)
- API routes exist (`/api/ai/opschief`, `/api/ai/pulse`, `/api/ai/tasks`, `/api/ai/askps`)
- ❌ **All return empty responses - need nonprofit-specific test data**

**What's Needed:**

#### OpsChief API (`/api/ai/opschief`)
```typescript
// Should return nonprofit health metrics:
{
  platform: "NP-Edge",
  organization: "Arizona Friends of Foster Children Foundation",
  metrics: {
    programHealth: {
      active: 6,
      atRisk: 0,
      totalBeneficiaries: 2531
    },
    fundraising: {
      ytdGoal: 2100000,
      ytdRaised: 1450000,
      progress: 69
    },
    volunteers: {
      active: 12,
      totalHours: 2847
    }
  },
  alerts: [
    "Form 990 due May 15, 2025",
    "ACF Grant Report due May 31, 2025"
  ]
}
```

#### Pulse API (`/api/ai/pulse`)
```typescript
// Should return priority cards:
{
  cards: [
    {
      id: "pulse-1",
      title: "Form 990 Filing Due Soon",
      description: "Annual IRS Form 990 must be filed by May 15, 2025",
      urgency: "high",
      category: "compliance",
      createdAt: "2025-01-22T..."
    },
    {
      id: "pulse-2",
      title: "Spring Appeal Behind Target",
      description: "2024 Annual Appeal at 77.5% of goal with 10 days remaining",
      urgency: "medium",
      category: "fundraising"
    },
    {
      id: "pulse-3",
      title: "Volunteer Appreciation Event",
      description: "67 volunteers registered for Feb 15 lunch",
      urgency: "low",
      category: "events"
    }
  ]
}
```

#### Tasks API (`/api/ai/tasks`)
```typescript
// Should return nonprofit tasks:
{
  tasks: [
    {
      id: "task-1",
      title: "Complete Form 990 draft",
      status: "in_progress",
      priority: "high",
      assignee: "Finance Director",
      dueDate: "2025-04-30"
    },
    {
      id: "task-2",
      title: "Review scholarship applications",
      status: "pending",
      priority: "medium",
      assignee: "Jennifer Martinez"
    }
  ]
}
```

#### AskPS API (`/api/ai/askps`)
```typescript
// Should respond to nonprofit queries:
// Query: "How many scholarships have we awarded this year?"
{
  response: "AFFCF has awarded 187 scholarships totaling $485,000 in 2024, with a 91% college retention rate.",
  sources: ["Scholarship Program data", "Financial reports"],
  confidence: 0.95
}
```

### 2. AI Settings Toggle

**Current State:**
- ✅ Settings page exists at `/dashboard/settings/ai`
- ✅ `AISettingsProvider` component exists
- ❌ **Need to verify 5 orbs have individual toggles**

**What's Needed:**
- [ ] Toggle for OpsChief orb
- [ ] Toggle for Pulse orb
- [ ] Toggle for Tasks orb
- [ ] Toggle for AskPS orb
- [ ] Toggle for PageKB panel
- [ ] Settings should save to localStorage
- [ ] Layout should respect toggle states

### 3. PageKB Integration

**Current State:**
- ✅ PageKbPanel component exists
- ✅ PageKbProvider component exists
- ❌ **Not visible in layout - needs integration**

**What's Needed:**
- [ ] Add PageKB panel to dashboard layout
- [ ] Populate with nonprofit-specific KB content
- [ ] Connect to settings toggle

### 4. Missing Components from Old Demo

| Component | Old Demo | New Demo | Notes |
|-----------|----------|----------|-------|
| AppLayout | ✅ Sidebar | ✅ Sidebar | Complete |
| Pulse Widgets | ✅ | ❌ | **Removed** (using orb instead) |
| Task Widgets | ✅ | ❌ | **Removed** (using orb instead) |
| AI Widget Provider | ✅ | ✅ | Different implementation |
| AppChatbot | ✅ | ❌ | **Missing** - was this AskDock? |

### 5. Mock Data Quality

**Old Demo:**
- Had basic placeholder data in components
- Used mock arrays in services

**New Demo:**
- ✅ Real database with Prisma
- ✅ Comprehensive seed data (6 programs, 24 donors, 15 volunteers, etc.)
- ❌ AI orbs still returning empty/mock responses

## 🔧 Priority Fixes Needed

### Priority 1: Make AI Orbs Work
1. Update `/api/ai/opschief` with nonprofit metrics
2. Update `/api/ai/pulse` with priority cards from database
3. Update `/api/ai/tasks` with tasks from database
4. Update `/api/ai/askps` with OpenAI integration for nonprofit queries
5. Test all orbs show real AFFCF data

### Priority 2: Settings Integration
1. Verify AI settings page has 5 toggles
2. Ensure toggles save to localStorage
3. Ensure layout respects toggle states
4. Test enable/disable for each orb

### Priority 3: PageKB Panel
1. Make PageKB visible in layout
2. Add nonprofit KB content
3. Connect to settings toggle

### Priority 4: Fill Placeholder Pages
1. Add content to Beneficiaries page
2. Add content to Compliance page
3. Consider adding Outreach page

## 📊 Feature Comparison Matrix

| Feature | Old NP-Edge | New NP-Edge | Notes |
|---------|-------------|-------------|-------|
| **Architecture** | Next.js 14 | Next.js 16 | ✅ Upgraded |
| **Database** | Mock/Local | Neon (shared) | ✅ Production-ready |
| **Schema Pattern** | Pattern B | Pattern A | ✅ AICR standard |
| **Port** | 3033 | 3034 | ✅ Unique |
| **AI Orbs** | 2 (OrgChief, AskDock) | 5 (Ops, Pulse, Tasks, Ask, PageKB) | ✅ More features |
| **Orb Data** | Mock | Empty | ❌ Needs work |
| **Settings Toggles** | Limited | Full | ✅ Better UX |
| **Seed Data** | None | AFFCF-specific | ✅ Demo-ready |
| **Branding** | Generic NP | AFFCF-specific | ✅ Realistic |
| **Module Count** | 6 pages | 7 pages | ✅ More complete |

## 🎯 Next Steps

1. **AI Orbs Integration** - Make all 5 orbs return nonprofit-specific data
2. **Settings Testing** - Verify toggles work for all orbs
3. **PageKB Setup** - Make knowledge panel visible and useful
4. **Content Filling** - Complete Beneficiaries and Compliance pages
5. **Final Polish** - Test full workflow end-to-end

## 📝 Summary

**Strengths of New System:**
- ✅ Modern Next.js 16
- ✅ Real Neon database with seed data
- ✅ Pattern A schema (AICR standard)
- ✅ 5 AI orbs (vs 2 in old)
- ✅ Better organized codebase

**Critical Gaps:**
- ❌ AI orbs not returning test data
- ❌ Settings toggles may not work
- ❌ PageKB not integrated
- ❌ Missing chatbot component?

**Bottom Line:** Infrastructure is superior, but AI features need wiring to data.
