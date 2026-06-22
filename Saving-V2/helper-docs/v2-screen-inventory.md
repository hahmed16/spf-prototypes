# Saving V2 Screen Inventory

## Purpose

This file keeps the V2 prototype aligned to the Full BRD and prevents the work from stopping at a few sample pages.

V2 is being built as a **full parallel prototype set** under `Saving-V2/` while keeping `Saving/` unchanged.

## Baseline carried from V1

The following screens already exist in V2 because the current prototype was cloned into `Saving-V2/` as the starting baseline:

- `index.html`
- `01-dashboard.html`
- `02-registration.html`
- `03-registered-workers.html`
- `04-account-details.html`
- `05-deposit.html`
- `06-obligations.html`
- `07-investment-return.html`
- `08-disbursement.html`
- `09-mandatory-saving.html`
- `10-disbursement-processing.html`
- `11-optional-saving-inquiries.html`
- `12-surplus-transfers.html`
- `13-exit-system.html`
- `14-transaction-history.html`
- `15-reports.html`

## New V2 operational screens added

- `16-gratuity-settlement-employer.html`
  - employer list for all employees
  - per-employee settlement status
  - modal for decision if not settled
  - read-only modal for settled cases

- `17-gratuity-settlement-employee.html`
  - employee sees settlement details
  - employee sees employer decision
  - employee takes response on same screen

- `18-salary-objection.html`
  - role-based prototype flow
  - saver submits objection
  - employer responds
  - staff reviews complaint outcome

- `19-manual-cases.html`
  - staff queue for manual/exception cases
  - assignment and status update
  - core exception categories represented

- `20-mandatory-invoices.html`
  - employer view of mandatory monthly invoices
  - staff monitoring view
  - invoice detail modal

- `21-exit-notification.html`
  - saver notification flow
  - staff monitoring view
  - visible impact on returns

## Shared V2 assets updated

- `common.js`
  - V2 navigation expanded
  - new pages exposed in shared sidebar
  - role toggle preserved

- `styles.css`
  - added reusable utility styles for V2 list/detail/metric/status layouts

## Current V2 coverage direction

### Stronger coverage now exists for

- gratuity settlement before system start
- employee acknowledgment of settlement decision
- salary objection workflow
- mandatory invoice operations
- manual exception handling
- exit / loss-of-condition notification
- disbursement request exception states
- staff disbursement operations and escalation paths
- virtual-account payment and allocation visibility

### Previously weak pages now converted into operational V2 screens

- `09-mandatory-saving.html`
  - no longer an inquiry/reference page
  - now covers mandatory-saving operations through role-based working views
  - includes worker-level status tracking, registration routes, salary-review impact, invoice effect, and staff queue visibility

- `11-optional-saving-inquiries.html`
  - no longer an inquiry dump
  - now represents optional-saving journeys, employer programs, and staff governance coverage
  - includes a policy matrix showing where formerly open BRD questions are handled in V2

## High-priority screens enriched in the latest V2 pass

- `08-disbursement.html`
  - normal disbursement
  - failed bank retrieval fallback
  - returned transfer after departure
  - deceased non-Omani read-only/legal path coverage

- `10-disbursement-processing.html`
  - staff operations queue
  - route/status filtering
  - review modal with checks, finance, bank, and decision actions
  - manual-escalation coverage

- `13-exit-system.html`
  - on-time exit notification
  - delayed notification with reason capture
  - manual review path before closure
  - visible impact on returns and settlement

- `20-mandatory-invoices.html`
  - explicit virtual account display
  - invoice payment registration
  - allocation history
  - late invoice / penalty state

- `01-dashboard.html`
  - stronger cross-role command center
  - visible links to V2 operational journeys
  - role-specific priorities and alerts

- `02-registration.html`
  - clearer coverage for direct registration
  - employer registration flow
  - retroactive and direct-decision registration representation

- `03-registered-workers.html`
  - operational worker list with states
  - links to objection / settlement follow-up
  - per-worker modal context

- `05-deposit.html`
  - saver deposit flow
  - employer bulk-deposit flow
  - clearer payment-channel effects on posting and balance visibility

- `15-reports.html`
  - operational, financial, and compliance reporting views
  - export-oriented report list
  - stronger linkage to V2 journeys

## Working rule

V2 should be treated as complete only when:

- the prototype set remains fully navigable as one system
- the major BRD gaps are represented in screens or modals
- no critical flow is left only as inquiry text when it should be an actual prototype interaction

## Current baseline status

At the baseline coverage level, the previously identified critical BRD gaps are now represented in `Saving-V2/`.

What may still happen later is polish, visual refinement, or deeper scenario expansion, but there are no longer known high-priority areas left only as inquiry text in the core V2 prototype set.
