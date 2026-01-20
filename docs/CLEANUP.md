# Cleanup Guide - Post 6 P's Migration

**Migration Date:** January 20, 2026
**Status:** ✅ Migration Complete, Cleanup Pending

---

## Files Deprecated

### Components

**1. MultiDepartmentLayout.tsx → DEPRECATED**
- **Location:** `/src/components/layout/MultiDepartmentLayout.DEPRECATED.tsx`
- **Reason:** Replaced by Navbar + Footer (SGM pattern)
- **Used By:** None (all references removed)
- **Action:** Can be deleted after 1-month verification period
- **Rollback:** Keep file for reference if rollback needed

### Routes

**Old Department Routes (29 files)**
All old department-based routes now contain redirects:
- `/app/dashboard/sales/*` → Redirect to PERFORMANCE/PURPOSE
- `/app/dashboard/delivery/*` → Redirect to PEOPLE/PROCESS
- `/app/dashboard/client-success/*` → Redirect to PEOPLE/PERFORMANCE/PURPOSE
- `/app/dashboard/finance/*` → Redirect to PROFIT
- `/app/dashboard/operations/*` → Redirect to PROCESS/PLATFORM
- `/app/dashboard/partner-portal/*` → Redirect to PLATFORM/PERFORMANCE/PROFIT

**Action:** Keep redirects for 3-6 months to preserve:
- Bookmark compatibility
- Search engine indexing
- External links
- User muscle memory

**After 3-6 months:**
- Remove redirect files
- Update any hardcoded links found in external systems
- Archive for historical reference

---

## Cleanup Schedule

### Immediate (Done ✅)
- [x] Renamed MultiDepartmentLayout to .DEPRECATED
- [x] Verified no imports of deprecated component
- [x] Updated all documentation

### 1 Month Review (February 2026)
- [ ] Verify no issues reported with navigation
- [ ] Confirm all pages working correctly
- [ ] Check analytics for 404 errors
- [ ] Delete MultiDepartmentLayout.DEPRECATED.tsx if confident

### 3 Month Review (April 2026)
- [ ] Analyze redirect usage (how many users hit legacy routes?)
- [ ] Update external documentation/links
- [ ] Plan for redirect removal

### 6 Month Review (July 2026)
- [ ] Remove legacy redirect files
- [ ] Archive old route structure documentation
- [ ] Update sitemap if applicable
- [ ] Complete cleanup

---

## Rollback Plan

If issues arise and rollback is needed:

### Quick Rollback (< 1 hour)

1. **Restore layout:**
   ```typescript
   // app/dashboard/layout.tsx
   import { MultiDepartmentLayout } from '@/src/components/layout/MultiDepartmentLayout.DEPRECATED'

   // Remove Navbar, restore sidebar
   ```

2. **Remove P landing pages** (optional, they won't interfere)

3. **Keep redirects** - They can point both directions if needed

### Full Rollback (< 1 day)

1. Restore MultiDepartmentLayout.tsx
2. Remove Navbar.tsx
3. Revert Footer.tsx to old version (git revert)
4. Delete P landing pages
5. Remove navigation.config.ts

**Git Safety:**
All changes committed separately for easy reversion:
- Phase 1: Navbar + Footer changes
- Phase 2: Landing pages
- Phase 3-4: Route migrations
- Phase 5: Documentation

---

## What NOT to Delete

### Keep These (Still Used)

✅ **Layout Components:**
- `Navbar.tsx` - Active
- `Footer.tsx` - Active
- `Breadcrumbs.tsx` - Active
- `UserDropdown.tsx` - Active

✅ **Configuration:**
- `navigation.config.ts` - Critical
- `brand.config.ts` - Active
- `six-ps.types.ts` - Active

✅ **Data & Logic:**
- All mock data files
- All API routes
- All Prisma models
- All type definitions

✅ **Legacy Routes (For Now):**
- Keep redirect files for 3-6 months
- They ensure zero broken links

---

## Verification Checklist

Before deleting anything, verify:

- [ ] No imports of MultiDepartmentLayout in codebase
- [ ] All 29 new pages accessible and working
- [ ] All 29 redirects functioning
- [ ] No 404 errors in production
- [ ] Analytics show users successfully navigating
- [ ] No user complaints about missing pages
- [ ] External documentation updated

---

## Post-Cleanup Monitoring

After removing files, monitor for:

**Week 1:**
- 404 error rate
- User session depth
- Navigation bounce rate

**Month 1:**
- Search engine indexing of new routes
- External referrers (are old links being updated?)
- User feedback

---

**Last Updated:** January 20, 2026
**Next Review:** February 20, 2026
