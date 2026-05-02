# Verification Matrix for Meeting Notes 27-04-2026

## Purpose
This note is a practical meeting-readiness matrix for the inspection prototype. It distinguishes between:
- Covered now in prototype screens
- Covered as a prototype concept only
- Deferred to BRD / full implementation

## Coverage Summary

| Item from meeting notes | Prototype status | Where covered now | Notes |
|---|---|---|---|
| Switch profile / multiple user capacities | Prototype concept covered | `Inspection/role-selection.html` and BRD note | UI concept only, not full delegated-identity logic |
| Response periods / SLA visibility | Partially covered | Complaint and appeal detail flows show due dates and timeline | Full SLA engine and auto-deadline handling remain BRD/full implementation |
| Auto-return of request after no response | Partially covered | Complaint lifecycle, return/re-submit states, timeline narrative | Full automation is deferred |
| Heads and director take actions on complaint or visit outcome | Covered | Complaint details, visit details, appeal details, ban details | Action panels available by role |
| Visit evaluation | Covered | Visit detail report section | Added explicitly in inspector report/view |
| Complaint impact / case impact | Covered | Visit detail report section | Added explicitly for business review |
| Additional applicant contact data | Covered | Complaint details and complaint creation screens | Phone/contact fields visible |
| Hide worker inquiry when worker is the applicant | Covered conceptually | Complaint creation/detail flow | Current prototype already separates worker/submitter scenarios |
| Show previous/current employers and allow search outside list | Covered in analysis | Worker analysis + complaint entry employer selection | Search concept shown; full master-data search remains later enhancement |
| Complaint-type definition and priority | Covered conceptually | Complaint list/new complaint/report filters | Full admin configuration screen remains BRD/full implementation |
| Hide complaint number for unreceived complaints | Covered conceptually | Draft states and pre-submission flow | Prototype uses draft state instead of operational masking logic |
| Repeated reminders for delayed completion with timeline and correspondence logging | Covered conceptually | Timeline + correspondence components | Full reminder automation is deferred |
| Reassign complaints from complaints list by heads/director | Partially covered | Monitoring head reassignment/workload screens | Visit redistribution is fully shown; complaint reassignment can be strengthened later if requested |
| Show attendance and availability for department staff | Covered as prototype concept | Staff availability screens | Explicitly marked as prototype/non-integrated |
| External escalation for delayed requests | Covered conceptually | Director and appeal/complaint escalation-oriented actions | Full escalation workflow remains BRD/full implementation |
| Integration with external complaint intake | Deferred to BRD | Documentation only | Not represented as executable prototype integration |
| Rule definition per benefit and resulting guidance | Deferred to BRD | BRD/helper docs only | Out of inspection prototype execution scope |

## High-confidence pages for business demo

### Inspection employee / field inspector
- Visit detail pages now show a clear visit report section
- Report includes:
  - executive summary
  - visit evaluation
  - complaint/inspection impact
  - field narrative
  - attendees
  - evidence points
  - corrective actions
  - attachments
  - notes

### Inspection head / field head
- Same visit report is visible for review
- Review panel now makes it explicit that the head can:
  - approve the report
  - return it for revision
  - issue corrective action
- Review checklist is visible in the page itself

### Detail-page completeness
- Complaint details: attachments and notes now always display with sample records if source data is empty
- Appeal details: attachments and notes now always display with sample records if source data is empty
- Visit details: inspector report, attachments, and notes now display clearly
- Inspection plan details: supporting attachments and notes are shown
- Ban case details: supporting attachments and notes are shown
- Report details: supporting attachments and notes are shown

## Deferred to BRD / full implementation

These should be positioned in the meeting as intentionally beyond prototype depth:
- Full SLA engine with timers, escalations, and automatic rerouting
- Automated repeated reminders across channels
- Real delegated identity switching with permission enforcement
- Attendance system integration
- External complaint intake integration
- Administrative master screen for complaint-type configuration
- Fully operational escalation workflow for external users

## Recommendation for meeting

Use the prototype to demonstrate:
- complete complaint and appeal detail views
- complete visit report and head review flow
- timeline and correspondence traceability
- supervisory visibility through staff availability and corrective-action follow-up

State clearly that automation, integrations, and configurable administration are captured for BRD/full implementation where applicable.
