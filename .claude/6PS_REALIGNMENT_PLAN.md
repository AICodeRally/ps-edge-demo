# 6 P's Framework Realignment - Nonprofit Consulting Focus

**Issue:** Current implementation has mixed definitions, generic examples, and unclear separation between operational vs financial performance.

**Goal:** Realign 6 P's to reflect proper business operations for a **nonprofit consulting firm** (Phoenix Philanthropy Group).

---

## ✅ Proper 6 P's Framework for PPG

### **1. PURPOSE** 🎯 (Mission & Impact)
**Definition:** Strategic direction, nonprofit sector impact, mission alignment
**Focus:** WHY we exist, WHAT impact we create for the nonprofit sector
**Metrics:**
- Client mission advancement score
- Dollars raised for nonprofit clients
- Nonprofit leaders coached
- Sector impact (education, arts, environment served)

**Pages:**
- Mission Dashboard - PPG's impact on nonprofit sector
- Client Success - Nonprofit client outcomes and testimonials
- Sector Impact - Higher ed, human services, arts, environment metrics
- Case Studies - Nonprofit campaign successes

---

### **2. PEOPLE** 👥 (Consultant Capacity & Expertise)
**Definition:** Consultant team, nonprofit expertise, capacity planning
**Focus:** WHO delivers (our consultants with nonprofit sector expertise)
**Metrics:**
- Consultant utilization rate
- Nonprofit expertise coverage (campaign, board, M&A, etc.)
- Available capacity by service line
- Expertise in nonprofit subsectors (higher ed, arts, etc.)

**Pages:**
- Consultant Team - Directory with nonprofit specializations
- Capacity Planning - Utilization and availability
- Expertise Map - Coverage across 11 service lines
- Onboarding - New consultant training on nonprofit sector

---

### **3. PROCESS** ⚙️ (Service Delivery)
**Definition:** HOW we deliver consulting services to nonprofits
**Focus:** Engagement execution, deliverables, client communication
**Metrics:**
- Engagement on-time completion %
- Deliverable quality scores
- Client satisfaction (NPS)
- Time to value

**Pages:**
- Active Engagements - Nonprofit client projects in flight
- Deliverables - Campaign plans, strategic roadmaps, etc.
- Client Support - Nonprofit client inquiries and escalations
- Time Tracking - Billable hours on nonprofit engagements
- Knowledge Library - Nonprofit best practices, templates

---

### **4. PRACTICE** 🎓 (Service Lines & Methodologies)
**Definition:** WHAT we sell - 11 nonprofit consulting service lines + Advancement Academy
**Focus:** Service offerings, methodologies, intellectual property for nonprofit sector
**Metrics:**
- Service line revenue mix (Campaign, Strategic Planning, etc.)
- Methodology adoption rate
- Advancement Academy enrollments
- New service line development

**Pages:**
- Service Lines - 11 offerings (Campaign, Board Dev, Executive Coaching, M&A, etc.)
- Methodologies - PPG's consulting frameworks for nonprofits
- Advancement Academy - Training programs for nonprofit professionals
- Thought Leadership - Nonprofit sector insights and publications

**Why "Practice" not "Platform"?**
- This is a CONSULTING FIRM, not a SaaS company
- "Practice" = professional services practice (medical practice, law practice, consulting practice)
- Encompasses service lines, methodologies, IP, training offerings
- More appropriate than "Platform" (which implies technology product)

---

### **5. PIPELINE** 📈 (Sales & Business Development)
**Definition:** Future revenue - nonprofit prospect pipeline, proposals, sales process
**Focus:** Securing NEW nonprofit clients and engagements
**Metrics:**
- Pipeline value (weighted by stage)
- Proposal win rate
- Sales cycle length
- New nonprofit client acquisitions

**Pages:**
- Sales Pipeline - Nonprofit prospects by stage
- Proposals - Active proposals to nonprofits (campaigns, strategic plans)
- Lead Management - Inbound nonprofit inquiries
- Market Development - Sector targeting (higher ed, arts, etc.)

**Clear Scope:** FUTURE revenue only (sales process, not actual billings)

---

### **6. PROFIT** 💰 (Financial Performance)
**Definition:** ACTUAL financial outcomes - revenue recognition, billing, margins
**Focus:** Business sustainability and financial health
**Metrics:**
- Monthly recurring revenue
- Gross margin %
- Accounts receivable
- Revenue by service line

**Pages:**
- Revenue Dashboard - Actual revenue (not forecasted)
- Invoicing - Client billing for completed work
- Collections - AR aging and payments
- Margins - Service line profitability
- Partner Commissions - NP-Edge channel revenue share

**Clear Scope:** REALIZED revenue only (actual billings, not pipeline forecasts)

---

## 🔄 Current State Analysis

### What's Wrong Now

**1. Directory Structure Chaos**
Physical directories don't match 6 P's:
```
❌ client-success/  (legacy - should be PURPOSE)
❌ delivery/        (legacy - should be PROCESS)
❌ finance/         (legacy - should be PROFIT)
❌ operations/      (legacy - should be PRACTICE)
❌ sales/           (legacy - should be PIPELINE)
❌ partner-portal/  (legacy - mixed across multiple P's)
```

**2. "Performance" Ambiguity**
Current "Performance" mixes:
- Operational KPIs (belongs in PROCESS or PURPOSE)
- Client health (belongs in PURPOSE)
- Financial metrics (belongs in PROFIT)

**3. Generic Examples**
Demo data is generic consulting, not **nonprofit-focused**:
- Clients should be nonprofits (universities, museums, foundations)
- Engagements should be campaigns, board dev, strategic planning
- Context should reference nonprofit challenges (donor fatigue, board governance, mission drift)

---

## 🎯 Realignment Actions Required

### Phase 1: Clarify 6 P Definitions

**Update all documentation:**
1. `CLAUDE.md` - Correct 6 P definitions
2. `README.md` - Align with proper framework
3. `docs/6PS_FRAMEWORK.md` - Create canonical guide
4. `src/config/navigation.config.ts` - Add comments explaining each P

**Correct Order:**
```
PURPOSE → PEOPLE → PROCESS → PRACTICE → PIPELINE → PROFIT
```

**Correct Focus:**
```
PURPOSE    = WHY (mission/impact on nonprofit sector)
PEOPLE     = WHO (consultants with nonprofit expertise)
PROCESS    = HOW (delivery to nonprofit clients)
PRACTICE   = WHAT (11 service lines for nonprofits)
PIPELINE   = FUTURE $ (sales to nonprofit prospects)
PROFIT     = ACTUAL $ (realized revenue from completed work)
```

### Phase 2: Nonprofit-ify All Content

**Client Data:**
```typescript
// ❌ Current (generic)
{ name: "Acme Corp", industry: "Technology" }

// ✅ Should be (nonprofit-focused)
{
  name: "Metropolitan Museum of Art",
  clientType: "ARTS_CULTURE",
  focusAreas: ["Visual Arts", "Public Programming"],
  annualBudget: 285000000, // Typical museum budget
  missionArea: "Arts & Culture"
}
```

**Engagement Data:**
```typescript
// ❌ Current
{ type: "PROJECT", name: "System Implementation" }

// ✅ Should be
{
  engagementType: "CAPITAL_CAMPAIGN",
  engagementName: "Building for Future Generations Campaign",
  objective: "Raise $50M for new wing construction",
  deliverables: ["Case for Support", "Donor Pyramid", "Campaign Cabinet"]
}
```

**Service Lines (from Phoenix Philanthropy):**
1. Campaign Fundraising
2. Volunteer Leadership (Board Development)
3. Executive Coaching
4. Mergers & Acquisitions
5. Operational Fundraising
6. Relationship Management
7. Interim Management
8. Philanthropy Advisory
9. Strategic Planning
10. Alumni Relations
11. Advancement Academy (Training)

### Phase 3: Clean Up Directory Structure

**Delete legacy directories:**
```bash
rm -rf app/dashboard/client-success/
rm -rf app/dashboard/delivery/
rm -rf app/dashboard/finance/
rm -rf app/dashboard/operations/
rm -rf app/dashboard/sales/
rm -rf app/dashboard/partner-portal/
```

**Keep only 6 P's + settings:**
```
app/dashboard/
├── purpose/
├── people/
├── process/
├── practice/      (or platform/ - decide)
├── pipeline/
├── profit/        (or performance/ if combining financial + operational)
└── settings/
```

### Phase 4: Separate Performance Types

**Two options:**

**Option A: Combine under "PERFORMANCE"**
```
performance/
├── kpis/           # Operational metrics
├── health/         # Client health
├── benchmarks/     # Industry comparisons
├── revenue/        # Financial dashboard
├── margins/        # Profitability
└── pipeline/       # Sales forecast
```
Single P for ALL outcomes (operational + financial)

**Option B: Split "PERFORMANCE" → operational, "PROFIT" → financial**
```
performance/        # Operational only
├── kpis/
├── health/
├── benchmarks/

profit/             # Financial only
├── revenue/
├── margins/
├── invoices/
├── commissions/
```
Clearer separation

---

## 🎓 My Recommendation

**Use Option B with nonprofit focus:**

```
PURPOSE    = Nonprofit sector impact metrics
PEOPLE     = Nonprofit consulting expertise
PROCESS    = Nonprofit engagement delivery
PRACTICE   = 11 PPG service lines (campaign, board, coaching, etc.)
PIPELINE   = Nonprofit prospect pipeline
PROFIT     = Financial performance (revenue from nonprofit clients)
```

**Rationale:**
- **Separating PERFORMANCE (operational) from PROFIT (financial)** is cleaner for reporting
- Board wants to see operational health AND financial health separately
- Sales team cares about PIPELINE (future)
- Finance team cares about PROFIT (actual)
- Operations team cares about PERFORMANCE (delivery quality)

**All examples should be nonprofit sector:**
- Clients = Universities, Museums, Foundations, Community Orgs
- Engagements = Capital Campaigns, Strategic Plans, Board Development
- Context = Nonprofit challenges (donor retention, mission alignment, governance)

---

## 📋 Action Plan

1. **Fetch Phoenix Philanthropy services** ✅ Done
2. **Define proper 6 P's** ✅ Proposed above
3. **Update navigation config** - Realign pages to correct P's
4. **Update demo data** - All nonprofit clients/engagements
5. **Clean legacy directories** - Remove old structure
6. **Update documentation** - Sync all docs with new definitions
7. **Add nonprofit context** - Service descriptions, help text, examples

---

**Ready to execute this realignment?**
