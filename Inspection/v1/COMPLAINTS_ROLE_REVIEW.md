# Complaints Pages Role Review (List / New / Details)

Date: 2026-04-23  
Scope: `Inspection/v1` complaints pages only.  
Purpose: lock role visibility, readonly/query behavior, and action-panel exposure.

## 1) `fund-staff` (internal applicant)

### List
- Should see: complaints submitted by same fund staff user only.
- Should not see: complaints of other fund staff users.
- Columns: include internal columns (submitter/assigned) if needed for operations.

### New
- `readonly`: submitter identity (name/civil/phone/email/job title) from session.
- `editable`: complaint type, description, employer by CRN, worker by civil number, priority, attachments, 
- `query`: employer by CRN (`استعلام`).
- `query`: insured by civil number (`استعلام`).
- Action buttons: `حفظ كمسودة`, `حفظ وإرسال الطلب`.

### Details
- Should see: applicant-facing details + complaint status + completion note if returned.
- Should not see: internal verification panels, internal operational notes, cumulative role action history.
- Action panel: allowed, but applicant-mode only (no rejection/close reason dropdown).

## 2) `insured` (external)

### List
- Should see:
  - complaints submitted by this insured user.
  - complaints where this insured user is party.
- Should not see: unrelated complaints.
- Columns: external set only (no internal assignee columns).

### New
- `readonly`: submitter identity (name/civil/phone).
- `editable`: complaint type, description, employer selection mode, attachments.
- `query`:
  - if current employer selected: employer details auto-filled.
  - if other employer selected: CRN lookup required.
- Must not request forbidden docs: national ID image / wage protection extract.

### Details
- Should see: basic complaint details, submitter data, required docs, attachments, timeline, completion note.
- Should not see: internal verification results, internal notes, internal cumulative role panels.
- Action panel:
  - visible only if applicant action exists (e.g. re-submit on reopened case).
  - no rejection/closure/save/reopen reason dropdown for external user.

## 3) `employer` (external)

### List
- Should see:
  - complaints submitted by this employer.
  - complaints where this employer is party.
- Should not see: unrelated employers’ complaints.
- Columns: external set only.

### New
- `readonly`: submitter identity.
- `editable`: complaint core fields + attachments.
- `query`: employer CRN lookup.

### Details
- Same external rule as insured:
  - show applicant-facing panels only.
  - hide internal workflow/verification/operational panels.
  - action panel only for applicant actions, no internal reason controls.

## 4) `monitoring-employee`

### List
- Should see: complaints assigned to this employee or checked out by this employee.
- Should not see: complaints assigned to other monitoring employees.

### New
- If used internally: can create with internal submitter context (insured/employer/fund-staff/external-ref).

### Details
- Should see: full internal workflow details.
- Should see action panel with monitoring-employee actions only.
- Reason is required only for actions that require reason by policy.

## 5) `monitoring-head`

### List
- Should see: all complaints.
- Default ordering: monitoring-stage complaints first.

### New
- Usually not primary entry screen, but if opened should follow internal mode.

### Details
- Should see: full internal panels including cumulative role panels and operational notes.
- Should see head actions only.
- Reason required where policy says (reject/close/save/reopen).

## 6) `field-inspector`

### List
- If complaints list is used: show only assigned/checked-out inspection items.

### New
- Not typical for complaints creation.

### Details
- Should see internal workflow details needed for inspection.
- Should see inspector actions only.
- No exposure of actions not owned by inspector role.

## 7) `field-head`

### List
- Should see: all complaints (inspection perspective), with inspection-stage items prioritized.

### Details
- Should see full internal panels and history.
- Should see field-head actions only.
- Reason required where applicable.

## 8) `inspection-director`

### List
- Should see: all complaints across all stages/states.

### Details
- Should see full internal panels.
- Should see director actions only.
- Reason required where applicable.

## Critical Fix Applied Now

- External users (`insured`, `employer`) no longer receive internal-style action panel controls with rejection/closure reasons.
- Internal-only panels in complaint details are now hidden for external roles:
  - verification systems panel
  - cumulative role action panels
  - operational notes panel
- Applicant-mode action panel is simplified and does not include internal reason controls.
- Reason enforcement is now action-specific and no longer incorrectly triggered by `حفظ كمسودة`.

## Next Review Pass (One-by-One Implementation)

1. Freeze `List` visibility filters per role using exact user/party identity keys.
2. Freeze `New` screen field-level rules (readonly/query/required) per role.
3. Freeze `Details` panel visibility matrix per role.
4. Add guard rails so role-inappropriate actions can never render.

