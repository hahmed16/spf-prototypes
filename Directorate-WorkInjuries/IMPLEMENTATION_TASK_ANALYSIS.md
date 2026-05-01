# Work Injuries Directorate - Implementation Task Analysis

## Overview
This document provides a detailed breakdown of all remaining checklist items for the Work Injuries Directorate implementation, including specific implementation details, dependencies, and file locations.

---

## 1. Direct Referral Flow

### 1.1 Add request-type search/filtering in referral lists
**Status:** Pending
**Priority:** High
**Files to Modify:**
- `Directorate-WorkInjuries/direct-referral-employee/referrals-list.html`
- `Directorate-WorkInjuries/referral-coordinator/referrals-list.html`
- `Directorate-WorkInjuries/committees-employee/referrals-list.html`
- `Directorate-WorkInjuries/committees-head/referrals-list.html`

**Implementation Details:**
- Add dropdown filter for request types: "إصابة عمل", "مرض مهني", "عرض مباشر", "ترخيص", "تظلم"
- Integrate with existing `renderUnifiedFilterBar` function
- Update `filterReferrals` function to include request type filtering
- Add request type column to referral tables if not present

**Dependencies:**
- None (can be implemented independently)

**Acceptance Criteria:**
- Filter dropdown appears in all referral list pages
- Filtering works correctly for all request types
- Filter state persists during search

---

### 1.2 Complete coordinator-side follow-up/details flow for direct referrals
**Status:** Pending
**Priority:** High
**Files to Modify:**
- `Directorate-WorkInjuries/referral-coordinator/referrals-details.html`
- `Directorate-WorkInjuries/shared/data-referrals.js`

**Implementation Details:**
- Create comprehensive details page for coordinator role
- Include all referral information: applicant, insured, employer, referral details
- Add action panel with coordinator-specific actions:
  - "توجيه إلى قسم اللجان الطبية"
  - "توصية برفض الإحالة مع تحديد السبب"
  - "إعادة للاستيفاء"
- Add timeline showing referral progression
- Include attachments and notes sections

**Dependencies:**
- 1.1 (request-type filtering)

**Acceptance Criteria:**
- Details page shows complete referral information
- All coordinator actions are available and functional
- Timeline accurately reflects referral status changes

---

### 1.3 Verify institution-session/decision continuation after coordinator stage
**Status:** Pending
**Priority:** Medium
**Files to Review:**
- `Directorate-WorkInjuries/shared/workflow-stages.js`
- `Directorate-WorkInjuries/shared/data-referrals.js`
- `Directorate-WorkInjuries/institution-rapporteur/sessions-list.html`

**Implementation Details:**
- Verify workflow stages include coordinator → institution-rapporteur transition
- Ensure data structure supports session scheduling after coordinator approval
- Test status transitions: coordinator approval → institution session → decision
- Verify timeline entries are created at each stage

**Dependencies:**
- 1.2 (coordinator details flow)

**Acceptance Criteria:**
- Workflow stages correctly map coordinator to institution-rapporteur
- Status transitions work as expected
- Timeline shows complete progression

---

## 2. Committee Decisions with Appeals

### 2.1 Build/refine dedicated committee decisions screen
**Status:** Pending
**Priority:** High
**Files to Modify:**
- `Directorate-WorkInjuries/committees-employee/committee-decisions.html`
- `Directorate-WorkInjuries/committees-head/committee-decisions.html`

**Implementation Details:**
- Create unified committee decisions screen
- Include filters by:
  - Decision type (approved, rejected, pending)
  - Request type (allowances, disability, licensing, appeals)
  - Date range
- Show decision details in expandable rows
- Add action buttons for:
  - View original request
  - View appeal history (if any)
  - Download decision document

**Dependencies:**
- None

**Acceptance Criteria:**
- Decisions screen shows all committee decisions
- Filters work correctly
- Decision details are comprehensive

---

### 2.2 Restrict access to committees-employee and committees-head
**Status:** Pending
**Priority:** High
**Files to Modify:**
- `Directorate-WorkInjuries/shared/config.js`
- `Directorate-WorkInjuries/shared/layout.js`

**Implementation Details:**
- Add role-based access control for committee decisions screen
- Only `committees-employee` and `committees-head` roles can access
- Add access check in `initLayout` function
- Redirect unauthorized users to dashboard with error message

**Dependencies:**
- 2.1 (committee decisions screen)

**Acceptance Criteria:**
- Only authorized roles can access committee decisions
- Unauthorized users see appropriate error message

---

### 2.3 Add appeal initiation from committee decision context
**Status:** Pending
**Priority:** High
**Files to Modify:**
- `Directorate-WorkInjuries/committees-employee/committee-decisions.html`
- `Directorate-WorkInjuries/committees-head/committee-decisions.html`
- `Directorate-WorkInjuries/shared/data-appeals.js`

**Implementation Details:**
- Add "تقديم تظلم" button to decision details
- Create appeal initiation modal with:
  - Original decision details (pre-filled)
  - Appeal reason field (required)
  - Appeal details field (required)
  - Additional notes field (optional)
  - Attachment upload
- Link appeal to original request via `originalRequestId` and `originalRequestType`

**Dependencies:**
- 2.1 (committee decisions screen)

**Acceptance Criteria:**
- Appeal button appears on decision details
- Appeal initiation modal is complete and functional
- Appeals are correctly linked to original decisions

---

### 2.4 Link decisions to appeal details/history
**Status:** Pending
**Priority:** High
**Files to Modify:**
- `Directorate-WorkInjuries/committees-employee/appeals-details.html`
- `Directorate-WorkInjuries/committees-head/appeals-details.html`
- `Directorate-WorkInjuries/shared/data-appeals.js`

**Implementation Details:**
- Add original decision section to appeal details
- Show decision history with timeline
- Include decision documents in attachments
- Add cross-reference between decisions and appeals

**Dependencies:**
- 2.3 (appeal initiation)

**Acceptance Criteria:**
- Appeal details show original decision
- Decision history is visible
- Cross-references work in both directions

---

## 3. Suspend/Resume Standardization

### 3.1 Add suspend/resume to all request types
**Status:** Pending
**Priority:** High
**Files to Modify:**
- `Directorate-WorkInjuries/shared/data-allowances.js`
- `Directorate-WorkInjuries/shared/data-disability.js`
- `Directorate-WorkInjuries/shared/data-chronic.js`
- `Directorate-WorkInjuries/shared/data-appeals.js`
- `Directorate-WorkInjuries/shared/data-licensing.js`
- `Directorate-WorkInjuries/shared/data-referrals.js`

**Implementation Details:**
- Add suspend/resume fields to all request templates:
  ```javascript
  suspended: false,
  suspensionReason: '',
  suspensionNotes: '',
  suspendedBy: '',
  suspendedDate: '',
  resumedBy: '',
  resumedDate: '',
  ```
- Add suspend/resume actions to action panels
- Create suspend/resume modal with required fields

**Dependencies:**
- None

**Acceptance Criteria:**
- All request types support suspend/resume
- Data structure is consistent across all types

---

### 3.2 Make suspension reason mandatory everywhere
**Status:** Pending
**Priority:** High
**Files to Modify:**
- All detail pages with action panels
- `Directorate-WorkInjuries/shared/utils.js`

**Implementation Details:**
- Add validation to suspend modal
- Show error if reason is empty
- Prevent suspension without reason

**Dependencies:**
- 3.1 (suspend/resume fields)

**Acceptance Criteria:**
- Suspension cannot be completed without reason
- Validation error is clear and helpful

---

### 3.3 Make suspension notes mandatory everywhere
**Status:** Pending
**Priority:** High
**Files to Modify:**
- All detail pages with action panels
- `Directorate-WorkInjuries/shared/utils.js`

**Implementation Details:**
- Add validation to suspend modal
- Show error if notes are empty
- Prevent suspension without notes

**Dependencies:**
- 3.1 (suspend/resume fields)

**Acceptance Criteria:**
- Suspension cannot be completed without notes
- Validation error is clear and helpful

---

### 3.4 Add consistent timeline entries for suspend/resume
**Status:** Pending
**Priority:** Medium
**Files to Modify:**
- All detail pages with timeline rendering
- `Directorate-WorkInjuries/shared/layout.js`

**Implementation Details:**
- Create helper function to add timeline entries:
  ```javascript
  function addSuspensionTimelineEntry(request, action, actor, reason, notes) {
    request.timeline.push({
      action: action,
      actor: actor,
      role: getCurrentUserRole(),
      time: new Date().toISOString(),
      note: `السبب: ${reason}. الملاحظات: ${notes}`,
      type: 'warning'
    });
  }
  ```
- Use helper in all suspend/resume actions

**Dependencies:**
- 3.1 (suspend/resume fields)

**Acceptance Criteria:**
- All suspend/resume actions create timeline entries
- Timeline entries are consistent in format

---

### 3.5 Show suspended state clearly in lists/details/action panels
**Status:** Pending
**Priority:** Medium
**Files to Modify:**
- All list pages
- All detail pages
- `Directorate-WorkInjuries/shared/config.js`

**Implementation Details:**
- Add suspended status badge to `statusBadges` in config
- Show suspended indicator in list tables
- Add suspended banner to detail pages
- Disable actions for suspended requests (except resume)

**Dependencies:**
- 3.1 (suspend/resume fields)

**Acceptance Criteria:**
- Suspended state is visually distinct
- Suspended requests cannot be acted upon (except resume)

---

## 4. Insured Summary Cards

### 4.1 Add related-request summary cards in insured detail contexts
**Status:** Pending
**Priority:** Medium
**Files to Modify:**
- `Directorate-WorkInjuries/disability-employee/disability-details.html`
- `Directorate-WorkInjuries/disability-head/disability-details.html`
- `Directorate-WorkInjuries/shared/data-disability.js`

**Implementation Details:**
- Create summary card component for related requests
- Add to insured detail pages
- Show count of each request type
- Make cards clickable to show filtered lists

**Dependencies:**
- None

**Acceptance Criteria:**
- Summary cards appear in insured detail pages
- Cards show accurate counts
- Clicking cards navigates to filtered lists

---

### 4.2 Include active benefit requests in summary cards
**Status:** Pending
**Priority:** Medium
**Files to Modify:**
- Same as 4.1

**Implementation Details:**
- Filter disability requests by status: "نشط", "معتمد"
- Show count in summary card
- Link to filtered disability list

**Dependencies:**
- 4.1 (summary cards)

**Acceptance Criteria:**
- Active benefit count is accurate
- Link shows correct filtered list

---

### 4.3 Include active paid benefits in summary cards
**Status:** Pending
**Priority:** Medium
**Files to Modify:**
- Same as 4.1

**Implementation Details:**
- Filter allowances by status: "معتمد", "تم الصرف"
- Show count in summary card
- Link to filtered allowances list

**Dependencies:**
- 4.1 (summary cards)

**Acceptance Criteria:**
- Paid benefits count is accurate
- Link shows correct filtered list

---

### 4.4 Include allowance requests in summary cards
**Status:** Pending
**Priority:** Medium
**Files to Modify:**
- Same as 4.1

**Implementation Details:**
- Filter allowances by status: "قيد المراجعة", "بانتظار"
- Show count in summary card
- Link to filtered allowances list

**Dependencies:**
- 4.1 (summary cards)

**Acceptance Criteria:**
- Allowance requests count is accurate
- Link shows correct filtered list

---

### 4.5 Include appeals in summary cards
**Status:** Pending
**Priority:** Medium
**Files to Modify:**
- Same as 4.1

**Implementation Details:**
- Filter appeals by status: "قيد المراجعة", "بانتظار"
- Show count in summary card
- Link to filtered appeals list

**Dependencies:**
- 4.1 (summary cards)

**Acceptance Criteria:**
- Appeals count is accurate
- Link shows correct filtered list

---

### 4.6 Include referral requests in summary cards
**Status:** Pending
**Priority:** Medium
**Files to Modify:**
- Same as 4.1

**Implementation Details:**
- Filter referrals by status: "قيد المراجعة", "بانتظار"
- Show count in summary card
- Link to filtered referrals list

**Dependencies:**
- 4.1 (summary cards)

**Acceptance Criteria:**
- Referral requests count is accurate
- Link shows correct filtered list

---

### 4.7 Add click-through sample tables for each card
**Status:** Pending
**Priority:** Medium
**Files to Modify:**
- Same as 4.1

**Implementation Details:**
- Create modal with sample table for each card type
- Show top 5-10 recent requests
- Include key columns: ID, status, date
- Add "عرض الكل" link to full list

**Dependencies:**
- 4.2-4.6 (individual card types)

**Acceptance Criteria:**
- Each card shows sample table on click
- Sample data is accurate
- "عرض الكل" link works correctly

---

## 5. Workflow Visualization Rollout

### 5.1 Extend shared workflow component to all major request types
**Status:** Pending
**Priority:** High
**Files to Modify:**
- `Directorate-WorkInjuries/shared/workflow-stages.js`
- All detail pages

**Implementation Details:**
- Verify workflow stages exist for all request types:
  - allowances ✓ (already exists)
  - disability ✓ (already exists)
  - chronic ✓ (already exists)
  - appeals ✓ (already exists)
  - licensing ✓ (already exists)
  - disabilityRetirement ✓ (already exists)
  - referrals (needs to be added)
- Add `renderWorkflowPath` call to all detail pages

**Dependencies:**
- None

**Acceptance Criteria:**
- All request types have workflow stages defined
- Workflow visualization appears on all detail pages

---

### 5.2 Verify exact workflow stages per request type with current business logic
**Status:** Pending
**Priority:** High
**Files to Review:**
- `Directorate-WorkInjuries/shared/workflow-stages.js`
- `Directorate-WorkInjuries/shared/config.js`

**Implementation Details:**
- Review each workflow stage definition
- Compare with business requirements
- Update stage names, descriptions, transitions as needed
- Verify status mappings in `config.js`

**Dependencies:**
- 5.1 (workflow component extension)

**Acceptance Criteria:**
- Workflow stages match business requirements
- Status mappings are accurate
- Transitions are correct

---

### 5.3 Highlight current stage consistently in detail pages
**Status:** Pending
**Priority:** Medium
**Files to Modify:**
- All detail pages
- `Directorate-WorkInjuries/shared/layout.js`

**Implementation Details:**
- Ensure `inferWorkflowStageId` function works for all request types
- Update `renderWorkflowPath` to highlight current stage
- Add visual indicators for completed, current, and future stages

**Dependencies:**
- 5.2 (workflow stage verification)

**Acceptance Criteria:**
- Current stage is clearly highlighted
- Completed stages are visually distinct
- Future stages are visually distinct

---

## 6. SLA Remaining-Days Rollout

### 6.1 Add remaining-days column to any list tables still missing it
**Status:** Pending
**Priority:** Medium
**Files to Review:**
- All list pages
- `Directorate-WorkInjuries/shared/utils.js`

**Implementation Details:**
- Audit all list pages for missing remaining-days column
- Add column where missing
- Use `getRemainingDaysLabel` and `getRemainingDaysClass` helpers
- Ensure SLA metadata is calculated correctly

**Dependencies:**
- None

**Acceptance Criteria:**
- All list pages show remaining-days column
- Values are calculated correctly
- Styling is consistent

---

### 6.2 Ensure color indicators are consistent
**Status:** Pending
**Priority:** Medium
**Files to Modify:**
- `Directorate-WorkInjuries/shared/layout.js`
- CSS file (if needed)

**Implementation Details:**
- Review `getRemainingDaysClass` function
- Ensure consistent color scheme:
  - `sla-overdue`: Red (negative days)
  - `sla-near-due`: Yellow (0-3 days)
  - `sla-on-track`: Green (4+ days)
- Apply classes consistently across all pages

**Dependencies:**
- 6.1 (remaining-days column)

**Acceptance Criteria:**
- Color indicators are consistent
- Thresholds are correct
- Visual distinction is clear

---

### 6.3 Add/fix shared SLA metadata where calculations are missing
**Status:** Pending
**Priority:** Medium
**Files to Modify:**
- `Directorate-WorkInjuries/shared/layout.js`
- All data files

**Implementation Details:**
- Review `deriveRequestSummaryMeta` function
- Ensure all request types have SLA metadata:
  - `expectedClosureDate`
  - `remainingDays`
  - `slaDays`
- Add missing fields to data templates
- Fix calculation logic where needed

**Dependencies:**
- 6.1 (remaining-days column)

**Acceptance Criteria:**
- All request types have SLA metadata
- Calculations are accurate
- Fallback logic works correctly

---

## 7. Disability Card Enhancements

### 7.1 Audit all pages for old single-disability assumptions
**Status:** Pending
**Priority:** High
**Files to Review:**
- All disability-related pages
- `Directorate-WorkInjuries/shared/data-disability.js`

**Implementation Details:**
- Search for hardcoded disability references
- Look for patterns like `disability.type`, `disability.severity`
- Replace with array-based access: `disability.disabilities[]`
- Update all rendering logic to handle multiple disabilities

**Dependencies:**
- None

**Acceptance Criteria:**
- No single-disability assumptions remain
- All code handles multiple disabilities
- Rendering works correctly for 0, 1, or multiple disabilities

---

### 7.2 Ensure all card displays use card.disabilities[]
**Status:** Pending
**Priority:** High
**Files to Modify:**
- All disability card display code
- `Directorate-WorkInjuries/shared/data-disability.js`

**Implementation Details:**
- Update disability card template to use `disabilities[]` array
- Add iteration logic for multiple disabilities
- Update card rendering to show all disabilities
- Add "عرض الكل" for cards with many disabilities

**Dependencies:**
- 7.1 (audit for assumptions)

**Acceptance Criteria:**
- All card displays use array-based structure
- Multiple disabilities are shown correctly
- UI handles edge cases (0, 1, many disabilities)

---

### 7.3 Add issueDate wherever disability card details are shown and still missing
**Status:** Pending
**Priority:** Medium
**Files to Review:**
- All disability detail pages
- `Directorate-WorkInjuries/shared/data-disability.js`

**Implementation Details:**
- Search for disability card displays
- Add `issueDate` field where missing
- Update data template to include `issueDate`
- Format and display date consistently

**Dependencies:**
- 7.2 (card displays)

**Acceptance Criteria:**
- All disability card displays show issueDate
- Date is formatted consistently
- Missing dates show "—" placeholder

---

## 8. Disability Retirement Follow-up

### 8.1 Verify all expected fields appear in list/details for employee and head
**Status:** Pending
**Priority:** High
**Files to Review:**
- `Directorate-WorkInjuries/disability-employee/disability-retirement-list.html`
- `Directorate-WorkInjuries/disability-employee/disability-retirement-details.html`
- `Directorate-WorkInjuries/disability-head/disability-retirement-list.html`
- `Directorate-WorkInjuries/disability-head/disability-retirement-details.html`
- `Directorate-WorkInjuries/shared/data-disability-retirement.js`

**Implementation Details:**
- Review business requirements for required fields
- Compare with current implementation
- Add missing fields to list and detail views
- Ensure data structure supports all fields

**Dependencies:**
- None

**Acceptance Criteria:**
- All required fields appear in lists
- All required fields appear in details
- Data structure is complete

---

### 8.2 Add any missing cross-navigation from dashboards if needed
**Status:** Pending
**Priority:** Medium
**Files to Review:**
- `Directorate-WorkInjuries/disability-employee/dashboard.html`
- `Directorate-WorkInjuries/disability-head/dashboard.html`

**Implementation Details:**
- Review dashboard for disability retirement links
- Add navigation to retirement list/details if missing
- Ensure links are prominent and clear
- Add counts/badges where appropriate

**Dependencies:**
- 8.1 (field verification)

**Acceptance Criteria:**
- Dashboard has links to retirement list
- Links are clear and prominent
- Navigation works correctly

---

### 8.3 Align status labels/timeline text with final agreed business wording
**Status:** Pending
**Priority:** High
**Files to Modify:**
- `Directorate-WorkInjuries/shared/config.js`
- `Directorate-WorkInjuries/shared/data-disability-retirement.js`
- All disability retirement pages

**Implementation Details:**
- Review final business requirements for status wording
- Update `statusBadges` in config
- Update status labels in all pages
- Update timeline text to match business wording

**Dependencies:**
- 8.1 (field verification)

**Acceptance Criteria:**
- Status labels match business requirements
- Timeline text matches business requirements
- Wording is consistent across all pages

---

## 9. Employee Phone in Timeline

### 9.1 Extend timeline phone rendering to remaining detail pages that still use local timeline markup
**Status:** Pending
**Priority:** Medium
**Files to Review:**
- All detail pages with timeline rendering
- `Directorate-WorkInjuries/shared/layout.js`

**Implementation Details:**
- Search for local timeline rendering code
- Replace with shared `renderTimelineList` function
- Ensure phone numbers are displayed using `getPhoneForActor`
- Update timeline data structure to include phone field

**Dependencies:**
- None

**Acceptance Criteria:**
- All timelines use shared rendering function
- Phone numbers appear where applicable
- Phone display is consistent

---

## 10. Role/Config Consistency Pass

### 10.1 Review all new statuses in statusBadges
**Status:** Pending
**Priority:** High
**Files to Modify:**
- `Directorate-WorkInjuries/shared/config.js`

**Implementation Details:**
- Review all status badges in config
- Add missing statuses for new request types
- Ensure badge classes are appropriate
- Remove obsolete statuses

**Dependencies:**
- None

**Acceptance Criteria:**
- All statuses have badge definitions
- Badge classes are appropriate
- No obsolete statuses remain

---

### 10.2 Review all role queues in roleStages
**Status:** Pending
**Priority:** High
**Files to Modify:**
- `Directorate-WorkInjuries/shared/config.js`

**Implementation Details:**
- Review role stages for all roles
- Add missing stages for new request types
- Ensure stage mappings are correct
- Update for new roles (direct-referral-employee, referral-coordinator)

**Dependencies:**
- 10.1 (status badges)

**Acceptance Criteria:**
- All roles have stage definitions
- Stage mappings are correct
- New roles are included

---

### 10.3 Review sidebar/navigation consistency for new and updated flows
**Status:** Pending
**Priority:** Medium
**Files to Modify:**
- `Directorate-WorkInjuries/shared/config.js`

**Implementation Details:**
- Review sidebar items for all roles
- Ensure new flows have navigation items
- Check for consistency across similar roles
- Update labels and icons as needed

**Dependencies:**
- 10.2 (role stages)

**Acceptance Criteria:**
- All flows have navigation items
- Navigation is consistent
- Labels and icons are appropriate

---

### 10.4 Fix any remaining role mapping gaps in layout.js
**Status:** Pending
**Priority:** Medium
**Files to Modify:**
- `Directorate-WorkInjuries/shared/layout.js`

**Implementation Details:**
- Review `getUserData` function
- Add missing role mappings
- Ensure all roles have user data
- Fix any gaps in role handling

**Dependencies:**
- 10.3 (sidebar/navigation)

**Acceptance Criteria:**
- All roles have user data mappings
- No gaps in role handling
- User data is correct for all roles

---

## 11. Shared Cleanup

### 11.1 Extract more repeated referral/workflow/action-panel patterns into shared helpers
**Status:** Pending
**Priority:** Low
**Files to Modify:**
- `Directorate-WorkInjuries/shared/utils.js`
- All detail pages

**Implementation Details:**
- Identify repeated patterns in detail pages
- Create shared helper functions:
  - `renderActionPanel(actions)`
  - `renderRequestSummary(request)`
  - `renderAttachmentsList(attachments)`
  - `renderNotesList(notes)`
- Replace repeated code with helper calls

**Dependencies:**
- None

**Acceptance Criteria:**
- Repeated patterns are extracted
- Helper functions are reusable
- Code is DRY (Don't Repeat Yourself)

---

### 11.2 Reduce duplicated page-local logic where safe
**Status:** Pending
**Priority:** Low
**Files to Modify:**
- All detail pages
- `Directorate-WorkInjuries/shared/utils.js`

**Implementation Details:**
- Identify duplicated logic across pages
- Extract to shared functions where safe
- Ensure extracted functions are generic
- Update pages to use shared functions

**Dependencies:**
- 11.1 (pattern extraction)

**Acceptance Criteria:**
- Duplicated logic is reduced
- Shared functions are generic
- Code is maintainable

---

## Implementation Priority Order

### Phase 1: Critical Functionality (Week 1)
1. Direct referral flow (1.1, 1.2, 1.3)
2. Committee decisions with appeals (2.1, 2.2, 2.3, 2.4)
3. Suspend/resume standardization (3.1, 3.2, 3.3, 3.4, 3.5)

### Phase 2: User Experience Enhancements (Week 2)
4. Insured summary cards (4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7)
5. Workflow visualization rollout (5.1, 5.2, 5.3)
6. SLA remaining-days rollout (6.1, 6.2, 6.3)

### Phase 3: Data Quality and Consistency (Week 3)
7. Disability card enhancements (7.1, 7.2, 7.3)
8. Disability retirement follow-up (8.1, 8.2, 8.3)
9. Employee phone in timeline (9.1)

### Phase 4: Configuration and Cleanup (Week 4)
10. Role/config consistency pass (10.1, 10.2, 10.3, 10.4)
11. Shared cleanup (11.1, 11.2)

---

## Testing Strategy

### Unit Testing
- Test each helper function independently
- Verify data structure transformations
- Validate business logic

### Integration Testing
- Test workflow transitions
- Verify cross-page navigation
- Test role-based access control

### UI Testing
- Verify visual consistency
- Test responsive design
- Check accessibility

### End-to-End Testing
- Test complete user flows
- Verify data persistence
- Test error handling

---

## Risk Assessment

### High Risk Items
- Committee decisions with appeals (complex workflow)
- Suspend/resume standardization (affects all request types)
- Disability card enhancements (data structure changes)

### Medium Risk Items
- Direct referral flow (new functionality)
- Workflow visualization rollout (affects all pages)
- Role/config consistency pass (affects all roles)

### Low Risk Items
- Insured summary cards (new feature)
- SLA remaining-days rollout (UI enhancement)
- Shared cleanup (code quality improvement)

---

## Success Criteria

### Functional Requirements
- All checklist items are implemented
- All workflows work as expected
- All roles can perform their required actions

### Non-Functional Requirements
- Code is maintainable and DRY
- UI is consistent and responsive
- Performance is acceptable

### Business Requirements
- Status labels match business wording
- Workflow stages match business logic
- All required fields are present

---

## Notes

- This implementation plan assumes the existing codebase is stable
- Some tasks may require additional research or clarification
- Timeline estimates are approximate and may change
- Regular testing should be performed throughout implementation
- Code reviews should be conducted after each phase