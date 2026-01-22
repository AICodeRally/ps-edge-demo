# 7th P Implementation: PARTNERS (Horizontal Toggleable Module)

**Goal:** Add PARTNERS as a 7th P that sits horizontally below the main 6 P grid, toggleable via settings.

---

## Architecture Design

### Visual Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Main Dashboard (6 P Performance Dashboard)                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                      │
│  │ PURPOSE │  │ PEOPLE  │  │ PROCESS │    ← Row 1           │
│  └─────────┘  └─────────┘  └─────────┘                      │
│                                                               │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                      │
│  │PRACTICE │  │PIPELINE │  │ PROFIT  │    ← Row 2           │
│  └─────────┘  └─────────┘  └─────────┘                      │
│                                                               │
│  ─────────────────────────────────────────────────────       │
│                                                               │
│  ┌───────────────────────────────────────────────────────┐   │
│  │ 🤝 PARTNERS - Channel Partner Management             │   │
│  │ Nonprofit NP-Edge tenant monitoring & revenue        │   │← Horizontal
│  │ [7 Quick Links: Tenants, Signals, Benchmarks, ...]  │   │
│  └───────────────────────────────────────────────────────┘   │
│                                        (Toggleable via ⚙️)    │
└─────────────────────────────────────────────────────────────┘
```

### Toggle Mechanism

**Settings Toggle:**
```
Settings → General → Business Modules
  ☑ Enable Channel Partner Module
  
  When enabled:
  - 7th P appears horizontally below 6 P grid
  - Navigation includes Partners links
  - Telemetry endpoints active
  
  When disabled:
  - Only 6 P's visible (pure consulting business)
  - Channel features hidden
  - Cleaner demo for non-channel use cases
```

**LocalStorage Key:** `ps-edge:modules:partners-enabled`

---

## Implementation Steps

### 1. Create Partners Module Directory

```
app/dashboard/partners/
├── page.tsx              # Landing: Portfolio overview
├── tenants/page.tsx      # Nonprofit NP-Edge customers
├── signals/page.tsx      # Health monitoring inbox
├── benchmarks/page.tsx   # Performance analytics
├── usage/page.tsx        # API usage tracking
├── commissions/page.tsx  # Revenue sharing
└── revenue/page.tsx      # MRR/ARR metrics
```

### 2. Add Partners to Navigation Config

```typescript
// src/config/navigation.config.ts

export const SEVENTH_P_NAVIGATION: PNavigation = {
  category: 'PARTNERS',
  slug: 'partners',
  landingPageHref: '/dashboard/partners',
  pages: [
    {
      name: 'Client Tenants',
      href: '/dashboard/partners/tenants',
      description: 'Nonprofit organizations using NP-Edge',
    },
    {
      name: 'Signals Inbox',
      href: '/dashboard/partners/signals',
      description: 'Real-time health alerts from client deployments',
    },
    {
      name: 'Benchmarks',
      href: '/dashboard/partners/benchmarks',
      description: 'Portfolio-wide performance analytics',
    },
    {
      name: 'Usage Analytics',
      href: '/dashboard/partners/usage',
      description: 'API usage and performance monitoring',
    },
    {
      name: 'Commissions',
      href: '/dashboard/partners/commissions',
      description: 'Revenue sharing and vendor costs',
    },
    {
      name: 'Partner Revenue',
      href: '/dashboard/partners/revenue',
      description: 'MRR, ARR, and revenue stream tracking',
    },
  ],
  optional: true, // New flag
  horizontalDisplay: true, // New flag for layout
};
```

### 3. Update Main Dashboard Layout

```typescript
// app/dashboard/page.tsx

const showPartners = usePartnersEnabled(); // Hook from settings context

return (
  <div>
    {/* 6 P's Grid (2 rows x 3 cols) */}
    <div className="grid grid-cols-3 gap-6 mb-8">
      {sixPsTiles.map(tile => <PTile key={tile.slug} {...tile} />)}
    </div>

    {/* 7th P: PARTNERS - Horizontal Module (Toggleable) */}
    {showPartners && (
      <>
        <div className="border-t-2 border-dashed border-gray-300 dark:border-gray-700 my-8" />
        
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg border-2 border-blue-200 dark:border-blue-800 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <UsersIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  🤝 Partners
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Channel Partner Management - Nonprofit NP-Edge Tenant Portal
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/partners"
              className="btn-primary"
            >
              View Partners →
            </Link>
          </div>

          {/* Quick Links (Horizontal) */}
          <div className="grid grid-cols-6 gap-3">
            {partnersPages.map(page => (
              <Link
                key={page.href}
                href={page.href}
                className="bg-white dark:bg-dark-bg-secondary p-3 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {page.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {page.shortDescription}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </>
    )}
  </div>
);
```

### 4. Add Settings Toggle

```typescript
// app/dashboard/settings/general/page.tsx (or new modules page)

<div className="card">
  <h3>Business Modules</h3>
  
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <label className="font-medium">Channel Partner Module</label>
        <p className="text-sm text-gray-600">
          Enable NP-Edge tenant management, telemetry monitoring, and channel revenue tracking
        </p>
      </div>
      <Switch
        checked={partnersEnabled}
        onCheckedChange={setPartnersEnabled}
      />
    </div>
  </div>
</div>
```

### 5. Create Context Provider

```typescript
// src/contexts/ModulesContext.tsx

export function ModulesProvider({ children }) {
  const [partnersEnabled, setPartnersEnabled] = useState(() => {
    return localStorage.getItem('ps-edge:modules:partners-enabled') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('ps-edge:modules:partners-enabled', String(partnersEnabled));
  }, [partnersEnabled]);

  return (
    <ModulesContext.Provider value={{ partnersEnabled, setPartnersEnabled }}>
      {children}
    </ModulesContext.Provider>
  );
}

export const usePartnersEnabled = () => {
  const context = useContext(ModulesContext);
  return context.partnersEnabled;
};
```

---

## Styling Approach

**7th P Visual Distinction:**
- **Gradient:** Blue → Cyan (ocean/water theme = partnership, flow)
- **Border:** Dashed top separator + solid colored border
- **Layout:** Full-width horizontal card (not grid tile)
- **Icon:** 🤝 Handshake or Partners icon
- **Badge:** "Channel Module" badge in corner

**6 P's vs 7th P:**
- 6 P's = Grid tiles (2 rows x 3 cols)
- 7th P = Horizontal banner below
- Clear visual separation via dashed border
- Different color family (blue vs purple-yellow gradient)

---

## Navigation Impact

**Footer (when Partners enabled):**
```
┌────────────────────────────────────────────────────────────┐
│  PURPOSE  PEOPLE  PROCESS  PRACTICE  PIPELINE  PROFIT      │
│  ────────────────────────────────────────────────────────  │
│  PARTNERS (Channel)                                         │
└────────────────────────────────────────────────────────────┘
```

**Or keep Partners in Settings/as navbar link** (cleaner footer)

---

## File Restoration Needed

**From backup commits (57ddf10, 36c9d00):**

```bash
# Copy from ~/Dev/ps-edge-demo → ~/dev/ps-edge-demo
cp -r ~/Dev/ps-edge-demo/app/dashboard/partner-portal/ ~/dev/ps-edge-demo/app/dashboard/partners/

# Files to restore:
1. partners/page.tsx              # Portfolio dashboard
2. partners/tenants/page.tsx      # Client tenants
3. partners/signals/page.tsx      # Signals inbox
4. partners/benchmarks/page.tsx   # Benchmarks
5. partners/usage/page.tsx        # API usage
6. partners/commissions/page.tsx  # Commissions
7. partners/revenue/page.tsx      # Revenue tracking
```

---

## Benefits of This Approach

✅ **Flexibility:** Toggle on/off for different demos
✅ **Visual Clarity:** Horizontal layout signals "optional module"
✅ **Framework Purity:** 6 P's stays clean and focused
✅ **Scalability:** Could add 8th P (PRODUCTS) later for other modules
✅ **User Control:** Business decides what they need

---

**Ready to implement? I'll:**
1. Copy Partner Portal pages from backup
2. Create modules toggle in settings
3. Add ModulesContext provider
4. Update main dashboard with horizontal 7th P
5. Make it visually distinct with blue gradient
6. Default to ENABLED (show channel capabilities)

Sound good?