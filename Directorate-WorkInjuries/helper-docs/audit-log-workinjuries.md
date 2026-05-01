# Audit Log - Directorate Work Injuries

## Purpose
Prototype logic audit for `Directorate-WorkInjuries` using the same review standard applied in `Inspection`.

Review rule used:
- Check whether each role page represents the target business screen properly.
- Focus on page purpose, visible content, role actions, and logical controls.
- Full backend behavior is not required at this stage.

## Current Progress

### Shared / Cross-Role Fixes Completed

| Area | Status | Direct Note |
|---|---|---|
| `committee-decisions` access control | `OK` | Added shared role-access enforcement helper and applied it on committee decision pages. |
| `committee-decisions` content richness | `OK` | Expanded committee decisions into a wider decision view with request type, decision type, date filters, and original-request linkage. |
| Shared committee decision dataset | `OK` | Widened data source so decisions are not limited to direct referrals only. |
| `referred-list` for committee roles | `OK` | Upgraded from a thin table to a real tracking screen with stage tabs, summary cards, current owner, next step, and role-specific purpose/actions. |
| External `referrals-details` pages | `OK` | Worker and employer delegate detail pages now show real page content: request purpose, insured/employer data, institution follow-up, attachments, and timeline instead of a minimal summary only. |

## Files Updated In This Pass

- [shared/layout.js](/home/hamdyahmed/Docs/Documents/SPF/BA%20Engagement/Prototypes/spf-prototypes/Directorate-WorkInjuries/shared/layout.js:80)
- [shared/utils.js](/home/hamdyahmed/Docs/Documents/SPF/BA%20Engagement/Prototypes/spf-prototypes/Directorate-WorkInjuries/shared/utils.js:912)
- [committees-employee/committee-decisions.html](/home/hamdyahmed/Docs/Documents/SPF/BA%20Engagement/Prototypes/spf-prototypes/Directorate-WorkInjuries/committees-employee/committee-decisions.html:1)
- [committees-head/committee-decisions.html](/home/hamdyahmed/Docs/Documents/SPF/BA%20Engagement/Prototypes/spf-prototypes/Directorate-WorkInjuries/committees-head/committee-decisions.html:1)
- [committees-employee/referred-list.html](/home/hamdyahmed/Docs/Documents/SPF/BA%20Engagement/Prototypes/spf-prototypes/Directorate-WorkInjuries/committees-employee/referred-list.html:1)
- [committees-head/referred-list.html](/home/hamdyahmed/Docs/Documents/SPF/BA%20Engagement/Prototypes/spf-prototypes/Directorate-WorkInjuries/committees-head/referred-list.html:1)
- [worker/referrals-details.html](/home/hamdyahmed/Docs/Documents/SPF/BA%20Engagement/Prototypes/spf-prototypes/Directorate-WorkInjuries/worker/referrals-details.html:1)
- [employer-delegate/referrals-details.html](/home/hamdyahmed/Docs/Documents/SPF/BA%20Engagement/Prototypes/spf-prototypes/Directorate-WorkInjuries/employer-delegate/referrals-details.html:1)

## Next Audit Order

1. `direct referral` roles
2. `allowances / investigation` roles
3. `disability / chronic` roles
4. `licensing / institution` roles
5. `appeals / rapporteur / supervisory committee` roles

## Notes

- The Work Injuries prototype mixes:
  - shared utilities and shared data-driven panels
  - role-specific standalone HTML pages
- Because of that, the audit/fix work will be done in grouped domains rather than one giant role list all at once.
- Current committee-role screens now have a stronger prototype standard:
  - page purpose is stated
  - visible action scope is stated
  - tracking/list pages show the workflow stage, current owner, and next expected step
