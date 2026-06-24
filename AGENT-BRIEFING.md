# Agent Briefing — GUP Alignment & BRD Gap-Fill for SPF Prototypes

## What You Are Doing

You are updating an existing HTML prototype for **صندوق الحماية الاجتماعية (Social Protection Fund — SPF), Sultanate of Oman** to meet two criteria simultaneously:

1. **GUP Design Compliance** — every page must follow the Government Unified Portal (Gov.om) design system exactly: correct tokens, correct components, correct page structure.
2. **BRD Completeness** — every page must reflect the Business Requirements Document faithfully: correct interaction model, correct business rules, correct data fields, correct workflow stages.

You will be told which prototype folder to work on and where its BRD lives. Do not start working until you have read both.

---

## 1. Read First — Every Time

Before touching a single file, read these four things in order:

1. **The BRD** for the prototype you are working on (location will be provided).
2. **`GUP/GUP-Design-Standards-Master.md`** — the authoritative GUP token and pattern reference (also available as PDF).
3. **`Saving-V3/assets/css/shell.css`** and **`Saving-V3/assets/css/app.css`** — the live CSS that implements GUP tokens in this project.
4. **Two or three representative pages** from the prototype you are working on, to understand the current tech stack.

Do not skip this. Assumptions made without reading the BRD produce wrong prototypes.

---

## 2. GUP Design System — Mandatory Standards

All values below come from `GUP/GUP-Design-Standards-Master.md`. Use the token names, never raw hex.

### 2.1 Font
**Single typeface: Readex Pro**, weights 400 and 700 only.
```html
<link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400;700&display=swap" rel="stylesheet">
```
Replace any other font (Zain, Cairo, Tajawal, system-ui, etc.) with Readex Pro. Body default: 16px / line-height 1.5.

### 2.2 Colour Tokens
```
Brand:
  --gup-color-brand-xhigh   #132459   darkest brand, link colour
  --gup-color-brand-high    #243d89   hover / strong fills
  --gup-color-brand-medium  #2f57cd   PRIMARY — buttons, key accents
  --gup-color-brand-low     #bfd8ff   subtle tint
  --gup-color-brand-xlow    #dde9ff   lightest background tint

Content (text):
  --gup-color-content-primary    #27272a   body text
  --gup-color-content-secondary  #52525b   secondary text
  --gup-color-content-tertiary   #7a7a83   hints / placeholders
  --gup-color-content-link       #132459   links

Background / surface:
  --gup-color-background-canvas      #fefcf9   page background (warm off-white)
  --gup-color-background-base        #ffffff   cards and elevated containers
  --gup-color-background-overcanvas  #eceef4   raised sections, table headers
  --gup-color-background-footer      #1c2133   footer

Border:
  --gup-color-border-medium  #d0d0d4
  --gup-color-border-low     #e1e1e2

Status (always pair with an icon — never colour alone):
  Success  medium #16a249 / xlow #f2fdf5
  Warning  medium #ca8511 / xlow #fefce7
  Negative medium #dc2828 / xlow #fef1f1

Interaction states:
  --gup-color-states-base-border      #7a7a83   form field borders
  --gup-color-states-base-focus-ring  #9747ff   focus ring (purple)
```

**Rules:**
- No raw hex outside these tables. A colour without a token is non-compliant.
- Page background = warm canvas `#fefcf9`. Cards = white `#ffffff`.
- Status colours are reserved for status meaning only.

### 2.3 Spacing
Base unit = 4px. All spacing is a multiple of 4.
- Items in a group: 8px | Between sections: 16–24px | Page padding: 28px 24px (desktop), 20px 16px (mobile ≤768px).

### 2.4 Border Radius
- Small controls: 4px | Default components: 8px | Cards: 12px | Pills / chips: 999px.

### 2.5 Icons
**Font Awesome 6 Free** — do not introduce any other icon library.
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

### 2.6 CSS Framework
**Bootstrap 5.3 RTL CDN** — never the standard (LTR) Bootstrap.
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css">
```

---

## 3. Shared Assets

All GUP-compliant pages in this project share a common asset layer located at `Saving-V3/assets/`. Either copy this folder to the prototype you are working on, or reference it with a relative path.

```
assets/css/app.css       — GUP token overrides, form control sizing, table readability
assets/css/shell.css     — page shell: header, footer, landing layout, internal layout
assets/css/wizard.css    — multi-step wizard, stepper bar, form section components
assets/js/prototype-core.js   — spf.showSuccess() toast and shared utilities
assets/js/external-shell.js  — injects navbar + footer for citizen / employer pages
assets/js/internal-shell.js  — injects navbar + sidebar for internal staff pages
```

Each page must reference these assets and declare the correct `data-*` attributes on `<body>`:

```html
<!-- Citizen / employer (external) pages -->
<body data-root="[relative path to assets root]" data-page-kind="form" data-user-role="[role]">

<!-- Internal staff pages -->
<body data-root="[relative path to assets root]">
```

---

## 4. Page Architecture Patterns

Use exactly these structures. Do not invent new ones.

### 4.1 Service Landing Page (`index.html` for each service)
```html
<main class="gup-main-shell">
  <section class="service-landing-hero">
    <div class="breadcrumbs-lite">
      <a href="[home]">الرئيسية</a> <span>›</span> <span>Service Name</span>
    </div>
    <h1>Service Title</h1>
    <p>Short description</p>
    <div class="service-meta">
      <span class="service-card-tag"><i class="fas fa-building"></i> صندوق الحماية الاجتماعية</span>
      <span class="service-card-tag"><i class="fas fa-user"></i> Role Name</span>
    </div>
  </section>

  <div class="landing-shell">          <!-- CSS grid: 1fr 300px -->
    <div class="landing-body">         <!-- main content column -->
      <section class="landing-body-section">
        <h2>المستندات المطلوبة</h2>
        <ul>...</ul>
      </section>
      <section class="landing-body-section"><h2>الرسوم</h2>...</section>
      <section class="landing-body-section"><h2>خطوات الخدمة</h2>...</section>
      <section class="landing-body-section"><h2>الشروط والمتطلبات</h2>...</section>
    </div>
    <aside>                            <!-- sticky CTA sidebar -->
      <div class="landing-side-card">
        <a href="start.html" class="gup-primary-btn mb-3">ابدأ الخدمة</a>
        <p class="landing-disclaimer">بالضغط على "ابدأ الخدمة" ستنتقل إلى صفحة تسجيل الدخول.</p>
        <div class="mt-4">
          <div class="fw-700 mb-2" style="font-size:.9rem;">قنوات الخدمة</div>
          <div class="landing-channel-chips">
            <span class="landing-channel-chip"><i class="fas fa-credit-card"></i> ONEIC</span>
            <span class="landing-channel-chip"><i class="fas fa-mobile-alt"></i> THAWANI</span>
            <span class="landing-channel-chip"><i class="fas fa-university"></i> OIFC</span>
          </div>
        </div>
      </div>
    </aside>
  </div>
</main>
<script src="[path]/prototype-core.js"></script>
<script src="[path]/external-shell.js"></script>
```

### 4.2 Multi-Step Form (`start.html`)
```html
<main class="gup-main-shell">
  <div class="gup-content-header">
    <div class="breadcrumbs-lite">
      <a href="[home]">الرئيسية</a> <span>›</span>
      <a href="index.html">Service Name</a> <span>›</span>
      <span>تقديم الطلب</span>
    </div>
    <h1>Service Title</h1>
  </div>

  <nav class="wizard-stepper-bar" aria-label="خطوات الطلب">
    <ol class="wizard-stepper">
      <li class="stepper-item selected" id="step1Indicator">
        <span class="stepper-num">1</span>
        <span class="stepper-label">Step Name</span>
        <div class="stepper-connector"></div>
      </li>
      <!-- repeat for each step; last item has no stepper-connector -->
    </ol>
  </nav>

  <div class="wizard-content-area" id="wizardStep1">
    <section class="gup-form-section">
      <h2>Section Heading</h2>
      <!-- fields -->
    </section>
  </div>

  <!-- Last step is always a success card -->
  <div class="wizard-content-area" id="wizardStepN" style="display:none">
    <div class="page-status-card">
      <div class="page-status-icon" style="background:#d4edda;color:#1a7f37;">
        <i class="fas fa-check-circle fa-2x"></i>
      </div>
      <h2>تم تقديم الطلب بنجاح</h2>
      <p>رقم المرجع:</p>
      <div class="ref-number">SPF-XXX-2026-000001</div>
      <p class="mt-3">Processing time / next steps message.</p>
      <div class="mt-4">
        <a href="[home]" class="gup-outline-btn">العودة إلى الرئيسية</a>
      </div>
    </div>
  </div>

  <div class="wizard-footer-bar" id="wizardFooter">
    <div class="wizard-footer-inner">
      <a href="index.html" class="gup-outline-btn" id="backBtn">
        <i class="fas fa-arrow-right"></i> رجوع
      </a>
      <button type="button" class="gup-primary-btn" id="continueBtn">
        تابع <i class="fas fa-arrow-left"></i>
      </button>
    </div>
  </div>
</main>
```

### 4.3 Internal Staff Page
```html
<main>
  <section class="internal-hero">
    <h1>Page Title</h1>
    <p>Short description of what this screen does</p>
  </section>

  <!-- Filter panel (if needed) -->
  <div class="internal-grid-card mb-4">
    <!-- filter row: selects + search button -->
  </div>

  <!-- Main content: table or review panel -->
  <div class="internal-grid-card">
    <!-- data table, detail panel, decision form -->
  </div>
</main>
<script src="[path]/prototype-core.js"></script>
<script src="[path]/internal-shell.js"></script>
```

### 4.4 Key Component Patterns

**Form field:**
```html
<label class="gup-field-label" for="id">Label <span class="text-danger">*</span></label>
<input id="id" type="text" class="form-control" required>
<div class="gup-field-hint">Helper text below the field</div>
```

**Inline alert:**
```html
<div class="gup-inline-alert info">    <!-- variants: success / warning / danger / info -->
  <i class="fas fa-info-circle"></i>
  <span>Message text</span>
</div>
```

**Key-value display row:**
```html
<div class="gup-labelled-item">
  <span class="item-label">Field Name</span>
  <span class="item-value">Value</span>
</div>
```

**Status badges (Bootstrap):**
```html
<span class="badge bg-success">مكتمل</span>
<span class="badge bg-warning text-dark">قيد المراجعة</span>
<span class="badge bg-danger">مرفوض</span>
<span class="badge bg-info text-dark">قيد المعالجة</span>
<span class="badge bg-secondary">ملغى</span>
```

**Approval chain visualisation:**
```html
<div class="d-flex align-items-center gap-2 flex-wrap" style="font-size:.82rem;">
  <div class="text-center px-2 py-1 rounded" style="background:#cff4fc;border:1px solid #0dcaf0;">
    <div><i class="fas fa-user-edit"></i></div>
    <div class="fw-bold">Stage 1 Role</div>
    <div>Stage Action</div>
  </div>
  <i class="fas fa-arrow-left" style="color:#aaa;"></i>
  <!-- repeat for each stage -->
</div>
```

---

## 5. Universal Fixes — Apply to Every Page

Before doing any BRD gap analysis, apply these baseline corrections to every HTML file in the prototype.

### 5.1 Replace Old Tech Stack
| Remove | Replace with |
|---|---|
| Bespoke `shared/style.css` | `assets/css/app.css` + `shell.css` + `wizard.css` |
| Bespoke `shared/layout.js`, `components.js` | `external-shell.js` or `internal-shell.js` |
| Any non-Readex-Pro font | Readex Pro 400 + 700 |
| Standard Bootstrap CDN | Bootstrap 5.3 RTL CDN |
| Raw hex colour values | GUP CSS token variables |
| Emoji icons | Font Awesome 6 Free classes |

### 5.2 Payment Channels
The only approved payment gateways are **ONEIC**, **THAWANI**, and **OIFC**.

- Replace every mention of مدفوع / تلغرام / تحويل بنكي / Mawdoo3 / bank transfer with the three approved names.
- In prose: `(ONEIC أو THAWANI أو OIFC)`
- In service landing chips: three `.landing-channel-chip` spans (see §4.1)
- In payment method dropdowns: three `<option>` elements — ONEIC, THAWANI, OIFC

### 5.3 Invoice-First Payment Model
SPF does not accept direct card, cheque, or bank-transfer input in any form. Whenever a transaction requires payment:
1. The system **creates an invoice** with a reference number (e.g. `INV-SVC-2026-000055`).
2. The user pays that invoice through one of the three gateways outside the portal.
3. The confirmation screen shows the invoice number and brief gateway instructions.

Any page that shows card number fields, cheque input fields, or bank reference number inputs must be **removed and replaced** with an invoice reference display.

### 5.4 Tables
- Do not use `table-sm` — it produces unreadably compact rows.
- Use `class="table table-hover table-bordered align-middle"` as the standard.
- The shared `app.css` already provides comfortable cell padding overrides.

### 5.5 Checkboxes and Radio Buttons
Always use Bootstrap `.form-check` / `.form-check-input`. The shared `app.css` provides the correct sizing fix (`min-height: unset; width: 1.1em; height: 1.1em`). Do not add any height or border-radius override for checkboxes or radios in page-level CSS.

### 5.6 RTL Directional Icons
In Arabic RTL, "go back" points toward the document start (right side of screen), "go forward" points left:
- Back button: `<i class="fas fa-arrow-right"></i>`
- Forward / continue button: `<i class="fas fa-arrow-left"></i>`

### 5.7 Reference Number Format
All system-generated reference numbers follow: `PREFIX-YEAR-NNNNNN`  
Example: `SPF-CMP-2026-000123`, `INV-DEP-2026-000055`  
Use realistic fake numbers in the prototype — never leave `XXXX` or `0000`.

---

## 6. Gap Analysis — Process

### Step 1 — Read the BRD
Read the BRD completely. Build a clear understanding of:
- All user roles and what each role can do
- Every functional requirement (FR-xx) and business rule (BR-xxx)
- Required data fields, validations, and constraints
- Workflow stages, approval chains, and state transitions
- Edge cases (e.g. death, non-citizen, late notification, dispute)

### Step 2 — Inventory existing pages
List every HTML file per role folder. For each file note: its title, its page type (landing / form / dashboard / list / detail / status), and the BRD requirement it corresponds to (if any).

### Step 3 — Classify every gap
For each BRD requirement and each existing page, assign one classification:

| Classification | Meaning |
|---|---|
| **MISSING** | Page or feature does not exist at all |
| **WRONG NATURE** | Page exists but the interaction model contradicts the BRD (e.g. a notification page built as a data-entry form; a read-only summary built as an editable wizard) |
| **INCOMPLETE** | Page exists and the nature is correct, but fields, rules, calculations, validation, or workflow stages are missing |
| **STYLE ONLY** | Content and logic are correct but visual design is not GUP-compliant |

### Step 4 — Produce a prioritised checklist
Group gaps by: HIGH (MISSING or WRONG NATURE) → MED (INCOMPLETE) → LOW (STYLE ONLY).  
Present the full list to confirm scope before beginning fixes.

### Step 5 — Fix in priority order
Fix HIGH first, then MED, then LOW. After each fix, mark it done in the checklist. Do not batch-close items — mark each one complete as soon as it is done.

---

## 7. What NOT to Do

- Do not invent new design patterns. If a component exists in the shared assets, use it.
- Do not add features or fields that are not in the BRD.
- Do not write comments explaining what the code does. Only comment when the WHY is non-obvious (a constraint, a workaround, a hidden invariant).
- Do not use inline `style=""` for colours that have a CSS class. Only use inline style for one-off layout adjustments with no class equivalent.
- Do not use `table-sm`.
- Do not add `position: absolute` for elements that should be sticky — use `position: sticky` with `top`.
- Do not break RTL layout. Validate that breadcrumbs, arrows, form labels, and table column order read right-to-left.
- Do not add multi-line comment blocks or docstrings.
- Do not add error handling or validation for scenarios that cannot happen in the prototype context.
- Do not summarise completed work at the end of each response — the diff speaks for itself.

---

## 8. Working Checklist Template

Copy this for each prototype you work on:

```
PROTOTYPE: [name]
BRD LOCATION: [path]

PHASE 1 — BASELINE (do before any BRD work)
[ ] Replace old CSS with GUP shared assets
[ ] Replace old JS shell with external-shell.js / internal-shell.js
[ ] Switch font to Readex Pro
[ ] Switch to Bootstrap 5.3 RTL CDN
[ ] Update colour values to GUP tokens
[ ] Replace payment channels → ONEIC / THAWANI / OIFC everywhere
[ ] Remove card/cheque/bank-transfer forms → invoice model
[ ] Fix table classes (no table-sm)
[ ] Fix checkbox/radio rendering
[ ] Fix RTL arrow directions
[ ] Fix landing page layout (aside in same row as content)

PHASE 2 — BRD GAPS (after gap analysis)
HIGH — MISSING / WRONG NATURE
[ ] ...

MED — INCOMPLETE
[ ] ...

LOW — STYLE ONLY
[ ] ...

PHASE 3 — FINAL REVIEW
[ ] All reference numbers use correct format
[ ] All approval chains visualised
[ ] All status badges consistent
[ ] All payment channel text updated
[ ] No raw hex or non-Readex font remains
[ ] RTL validated on every fixed page
```
