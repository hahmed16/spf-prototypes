# Saving Prototype Gap Audit vs Full BRD

## Goal

Before creating `V2`, we must first close the coverage gap between:

- `Saving/Full-BRD/Saving-Full-BRD.html`
- the current prototype screens under `Saving/`

The target is not just to redesign the existing prototype, but to ensure that **all materially important elements described in the Full BRD are represented somewhere in the prototype set**.

This work should happen **without affecting the current V1 prototype**.

## Agreed Direction

- Keep the current prototype as `V1`.
- Build a new `V2` in parallel.
- Before designing `V2`, complete a **coverage audit** and identify missing prototype journeys/screens.
- Public pages should become fully GUP-compliant.
- Internal pages should be GUP-aligned in look and feel, even when their workflow differs from public Gov.om patterns.

## Current Prototype Inventory

Current prototype screens:

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

## High-Level Assessment

The current prototype appears to cover roughly the following:

- strong coverage of the core optional-saving concept
- partial coverage of employer and staff views
- partial coverage of disbursement review
- partial coverage of reporting and account views
- weak coverage of mandatory-saving operational workflows
- weak coverage of exception and manual-processing workflows
- weak coverage of some legally significant journeys introduced in the Full BRD

In practice, the current prototype is closer to:

- a good concept prototype for the main modules
- plus information pages and inquiry pages for unresolved areas

It is **not yet a full prototype representation of the Full BRD**.

## Coverage Status by Area

### 1. Areas already represented reasonably well

These areas already have visible prototype pages and can be evolved into V2 rather than invented from scratch:

- dashboard and high-level role switching
- optional registration
- account details
- individual and employer deposit concepts
- obligations settlement
- investment return entry/review
- disbursement request
- staff disbursement processing
- surplus transfers
- transaction history
- reports

### 2. Areas represented only partially

These areas exist, but not yet at Full BRD depth:

- mandatory saving
- employer operational flows
- non-Omani disbursement edge cases
- internal approval and audit detail
- data/integration-driven statuses
- legal-state transitions and exception outcomes

### 3. Areas missing or mostly missing as actual prototype flows

These are the biggest gaps between the Full BRD and the current prototype:

- PKI/identity-based entry journey and role establishment
- mandatory registration through all three mechanisms
- salary objection workflow
- employer response to salary objection
- labor complaint follow-up and subscriber-data review
- end-of-service gratuity settlement for the pre-system period
- settlement invoice generation and allocation tracking
- mandatory monthly contribution and penalty workflow in operational form
- exit/failure-of-condition notification workflow
- manual-exception handling workflow with assignment and SLA tracking
- deceased non-Omani savings handling workflow
- fallback banking flow when automatic bank retrieval fails
- explicit integration-driven states and operational queues

## Concrete Gaps Confirmed During Review

### A. Some BRD topics exist in the prototype only as questions, not workflows

The current prototype includes open inquiries inside informational pages rather than implemented screens for several important areas.

Examples:

- `09-mandatory-saving.html` contains open-question lists for salary objection, gratuity settlement, penalties, exit, and priority of deductions rather than executable prototype journeys.
- `11-optional-saving-inquiries.html` contains inquiry groups for optional and mandatory saving questions that the Full BRD later treats as actual business rules and workflows.

This means V1 documents uncertainty, but V2 needs actual screen journeys.

### B. Salary objection is in the Full BRD but not represented as a real prototype flow

The Full BRD defines a full workflow for:

- worker objection to registered salary
- employer response within the allowed period
- automatic acceptance if the employer does not respond
- labor complaint escalation if rejected
- subscriber-data review and retroactive salary correction
- penalty/granularity implications

Current prototype evidence suggests this is only mentioned as a topic, not implemented as a dedicated set of screens.

### C. Pre-system gratuity settlement is a major missing flow

The Full BRD includes a substantial workflow for:

- estimating previous end-of-service gratuity
- employer choosing either settlement with the worker or transfer into the saving system
- worker acknowledgment or disagreement
- invoice generation when transferred to saving
- payment, allocation, and audit history

Current prototype evidence suggests this area appears only as inquiry text, not as a real flow.

### D. Exception handling is underrepresented

The Full BRD explicitly includes:

- manual handling routes
- SLA tracking
- officer assignment
- failed bank retrieval fallback
- post-departure failed transfer handling
- non-Omani deceased saver handling pending legal completion

Current prototype pages do not yet show this as a proper operational module.

### E. Exit/failure-of-condition handling is too light compared with the Full BRD

There is an `exit-system` page, but the Full BRD expects more than a simple exit concept. It expects:

- notification within the legal timeframe
- explanation of impact on investment returns
- state handling for delayed notification
- exception/manual route when needed

This should be treated as partially covered, not complete.

### F. Mandatory saving operations are not yet covered end-to-end

The Full BRD includes a deeper mandatory-saving operating model than what exists in the current screens, including:

- automatic and retroactive registration
- direct registration by fund decision
- monthly contribution logic
- wrong-salary correction effects
- penalties and additional amounts
- worker state changes affecting required invoices

The current prototype includes awareness of the subject, but not complete operational representation.

## Specific Screen Checklist: Previous End-of-Service Gratuity Settlement

This is still a confirmed BRD gap, but for prototype purposes it should be implemented in the leanest possible way.

We do **not** need to split this into many separate screens if the same business coverage can be shown clearly with fewer screens.

### Minimal prototype coverage for this flow

#### 1. Employer screen: all employees + settlement status

One screen should show:

- all relevant non-Omani employees
- estimated settlement amount for each employee
- settlement status for each employee
- an action per employee

Expected behavior:

- if the employee is **not yet settled**, clicking the action opens a modal
- the modal allows the employer to choose one of the two approved decisions:
  - `تمت التسوية مع العامل وديا`
  - `تم ترحيلها إلى نظام الادخار`
- if the employee is **already settled**, clicking the action opens a **read-only modal**
- the read-only modal shows the settlement details and current status

At minimum, the modal content should be able to represent:

- join date
- service duration
- latest registered basic salary
- estimated settlement amount
- selected decision
- settlement status
- if relevant: invoice/payment/allocation summary for the transfer-to-saving case

#### 2. Employee screen: view and take decision in the same screen

One employee-facing screen should show:

- the employee’s estimated settlement amount
- the employer’s selected decision
- the current status
- the employee action area on the same screen

Expected behavior:

- if the employer decision is pending, the screen shows that state
- if the employer has issued a decision, the employee can:
  - acknowledge / approve
  - record non-acceptance / disagreement
- if the case is transfer to saving, the same screen can also show the relevant follow-up status instead of creating another screen

### Prototype rule for this flow

For prototype purposes, this flow is considered covered if:

- there is **one employer screen** with row-level settlement action and modal behavior
- there is **one employee screen** that combines viewing the decision and taking the employee response

Anything beyond that is optional enhancement, not required baseline coverage.

## Working Classification of Current Screens

### Reusable for V2 with redesign

- `01-dashboard.html`
- `02-registration.html`
- `03-registered-workers.html`
- `04-account-details.html`
- `05-deposit.html`
- `06-obligations.html`
- `07-investment-return.html`
- `08-disbursement.html`
- `10-disbursement-processing.html`
- `12-surplus-transfers.html`
- `14-transaction-history.html`
- `15-reports.html`

### Likely to be split, expanded, or replaced in V2

- `09-mandatory-saving.html`
- `11-optional-saving-inquiries.html`
- `13-exit-system.html`

These are currently more informative than operational and should be converted into actual workflow screens in V2.

## Proposed Pre-V2 Work Packages

Before starting the actual V2 UI build, we should complete these packages:

### Package 1. BRD-to-screen coverage matrix

Map each major BRD capability to:

- existing prototype page
- partial prototype coverage
- missing prototype screen(s)

### Package 2. Missing-flow definition

Define the missing prototype journeys for at least:

- salary objection
- employer objection response
- labor complaint follow-up
- subscriber-data review
- gratuity settlement
- settlement invoice and allocation
- manual-exception queue
- exit/failure-of-condition notification
- deceased non-Omani handling

### Package 3. V2 IA split

Classify V2 screens into:

- public GUP-compliant
- authenticated service flow
- internal GUP-aligned back-office

### Package 4. Safe implementation structure

Create V2 separately so V1 remains unchanged, for example:

- `Saving-V2/`
- or `Saving/v2/`

## Recommended Immediate Next Step

The next concrete step should be:

1. produce a **BRD-to-prototype coverage matrix**
2. list all **missing prototype screens/journeys**
3. then start building `V2` only after that matrix is accepted

## Initial Conclusion

Yes, the direction is clear:

- the current prototype is not the final source for V2
- the Full BRD is the scope baseline
- every materially important BRD element should be represented in the prototype set
- we should close that gap first, then build the new GUP-aligned V2 in parallel

At this stage, the biggest uncovered areas are:

- salary objection
- pre-system gratuity settlement
- manual exception handling
- richer mandatory-saving operational flows
- exit/failure-of-condition handling
- some integration-driven and legally sensitive edge cases
