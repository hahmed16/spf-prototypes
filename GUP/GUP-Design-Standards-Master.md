# GUP Design Standards — Master Reference for Designers

**Government Unified Portal (GUP) / Gov.om Design System**
The single, complete reference for designing and onboarding services onto GUP. Every value here is taken directly from the official Gov.om Design System (`@govom/tokens`, `@govom/components`) and the live Gov.om platform. Design *to the token name*, not to a one-off value.

| | |
|---|---|
| **Audience** | UI/UX designers and front-end implementers building or onboarding GUP services. |
| **Status** | Authoritative standard. Compliance is checked at onboarding (see §2). |
| **Sources** | `design-system.service.gov.om`, the `Gov-om/design-system` repository, the `@govom/tokens` package, and the live `gov.om` platform. |
| **Scope** | Visual foundations, UX patterns, full page architecture, and shared platform components (sign-in, service landing, account context, feedback). |

---

## Table of Contents

1. How to use this document
2. Governing documents & compliance
3. Design system source of truth
4. **Foundations** — colour, typography, spacing, radius, elevation, icons, breakpoints, focus, RTL
5. **Information architecture** — the five page archetypes
6. **Shared platform components** — header, footer, breadcrumbs, account switcher, search, language, feedback, chatbot, entity badge
7. **Service landing (detail) page** — the mandated template
8. **Sign-in / authentication** — PKI method selection
9. **Catalogue & home** — discovery pages
10. **Entity service forms** — the one-thing-per-page journey
11. **Forms** — field anatomy, validation, grouping
12. **Navigation & journey** — steppers, wizard, lifecycle, pagination, tabs
13. **Messaging, feedback & status**
14. **Interaction states**
15. **Content & voice**
16. **Component library inventory**
17. **Compliance checklists**
18. **Quick reference card**
19. **Known gaps & governance**

---

## 1. How to Use This Document

- Values shown as `--gup-color-brand-medium` are **design tokens** — the canonical names shared by design handoff and the front-end build. Use the token, not a raw hex copied out of context.
- Each colour role has an intensity ladder `xhigh → high → medium → low → xlow` plus a `contrast` value (the colour for text/icons placed on that family).
- "Compliant" means: correct tokens **and** correct page structure **and** correct journey behaviour. All three are assessed.
- Two principles run through everything:
  - **Compose, don't invent.** If a pattern exists as a GUP component, use it. New components go to the Gov.om Design System team.
  - **Bilingual by default.** Every screen is designed (or validated) in both English (LTR) and Arabic (RTL).

---

## 2. Governing Documents & Compliance

GUP onboarding is governed by these official Gov.om documents (Guidelines & Policies register). Several are Arabic-only.

| Document | Type | Language |
|---|---|---|
| **GUP Frontend Implementation Quality Criteria** | Control / Standard | EN |
| **Compliance Assessment Form for Government Digital Services** | Reference (audit) | EN |
| UX Guidelines for Government Digital Solutions and Products | Guideline | AR only |
| Design Standards for Government Website and E-Services Interfaces | Control / Standard | AR only |
| Standards and Procedures for Developing Government Applications | Control / Standard | AR only |
| Digital Accessibility Guideline | Guideline | EN |
| National Digital Accessibility Policy | National Policy | AR only |
| Content Strategy — Content Patterns / Style Guidelines / Creating Content Capability | Strategy | EN |
| Governance Regulation for Government Digital Transformation | Regulation | AR only |

> Services are formally checked against the **Compliance Assessment Form** and the **GUP Frontend Implementation Quality Criteria** before going live. Design deliverables must map cleanly onto these.

---

## 3. Design System Source of Truth

GUP front end is a framework-agnostic web-component library.

| Package | Purpose | Version |
|---|---|---|
| `@govom/components` | Core web components (Lit + PostCSS) | 3.26.0 |
| `@govom/react` | React wrappers (React < 19) | 1.5.0 |
| `@govom/angular` | Angular Forms compatibility layer | 0.0.3 |
| `@govom/tokens` | Design tokens (colour, typography, spacing) | 0.2.2 |
| `@govom/icons` | Icon library (Material Design + flags) | 0.2.0 |

- Live component explorer (Storybook): `https://storybook.service.gov.om/`
- Design system docs: `https://design-system.service.gov.om/`

---

## 4. Foundations

### 4.1 Colour

#### Brand
| Token | Hex | Use |
|---|---|---|
| `--gup-color-brand-xhigh` | `#132459` | Darkest brand; link colour |
| `--gup-color-brand-high` | `#243d89` | Primary hover; strong fills |
| `--gup-color-brand-medium` | `#2f57cd` | **Primary brand** — primary buttons, key accents |
| `--gup-color-brand-medium-low` | `#4d78ff` | Lighter accent |
| `--gup-color-brand-low` | `#bfd8ff` | Subtle tint |
| `--gup-color-brand-xlow` | `#dde9ff` | Lightest background tint |
| `--gup-color-brand-contrast` | `#ffffff` | Text/icon on brand fills |
| `--gup-color-accent-2xhigh` | `#132459` | Deepest accent |

#### Brand accent (navy-grey)
| Token | Hex |
|---|---|
| `--gup-color-brand-accent-xhigh` | `#11111e` |
| `--gup-color-brand-accent-high` | `#2a324c` |
| `--gup-color-brand-accent-medium` | `#414e77` |
| `--gup-color-brand-accent-low` | `#c9ccdd` |
| `--gup-color-brand-accent-xlow` | `#eceef4` |
| `--gup-color-brand-accent-contrast` | `#ffffff` |

#### Neutral
| Token | Hex |
|---|---|
| `--gup-color-neutral-xhigh` | `#202024` |
| `--gup-color-neutral-high` | `#27272a` |
| `--gup-color-neutral-medium` | `#3f3f46` |
| `--gup-color-neutral-low` | `#d0d0d4` |
| `--gup-color-neutral-xlow` | `#fcfcfc` |
| `--gup-color-neutral-contrast` | `#ffffff` |

#### Status (use only for their meaning; always pair with an icon, never colour alone)
| Role | xhigh | high | medium (core) | low | xlow | contrast |
|---|---|---|---|---|---|---|
| Positive | `#114c29` | `#157f3c` | `#16a249` | `#85efac` | `#f2fdf5` | `#ffffff` |
| Warning | `#733f12` | `#a26107` | `#ca8511` | `#ffe771` | `#fefce7` | `#ffffff` |
| Negative | `#811d1d` | `#ba1c1c` | `#dc2828` | `#ffa0a0` | `#fef1f1` | `#ffffff` |

#### Content (text)
| Token | Hex | Use |
|---|---|---|
| `--gup-color-content-primary` | `#27272a` | Body & headings |
| `--gup-color-content-secondary` | `#52525b` | Secondary text |
| `--gup-color-content-tertiary` | `#7a7a83` | Tertiary / hint |
| `--gup-color-content-link` | `#132459` | Links |
| `--gup-color-content-inverted-primary` | `#ffffff` | Primary text on dark |
| `--gup-color-content-inverted-secondary` | `rgba(255 255 255 / 70%)` | Secondary on dark |
| `--gup-color-content-inverted-tertiary` | `rgba(255 255 255 / 60%)` | Tertiary on dark |
| `--gup-color-content-inverted-link` | `#bfd8ff` | Links on dark |

#### Border
| Token | Hex |
|---|---|
| `--gup-color-border-medium` | `#d0d0d4` |
| `--gup-color-border-low` | `#e1e1e2` |
| `--gup-color-border-xlow` | `#f4f4f5` |
| `--gup-color-border-inverted-medium` | `rgba(255 255 255 / 26%)` |
| `--gup-color-border-inverted-low` | `rgba(255 255 255 / 18%)` |
| `--gup-color-border-inverted-xlow` | `rgba(255 255 255 / 12%)` |

#### Background / surface
| Token | Hex | Use |
|---|---|---|
| `--gup-color-background-base` | `#ffffff` | Base surface |
| `--gup-color-background-canvas` | `#fefcf9` | **Page canvas** (warm off-white) |
| `--gup-color-background-overcanvas` | `#eceef4` | Raised section over canvas |
| `--gup-color-background-elevated-container` | `#ffffff` | Cards / elevated containers |
| `--gup-color-background-accent-container` | `#eceef4` | Accent container |
| `--gup-color-background-navigation-bar` | `rgba(255 255 255 / 48%)` | Nav bar (translucent) |
| `--gup-color-background-footer` | `#1c2133` | Footer (dark navy) |
| `--gup-color-background-wizard-bar` | `#eceef4` | Wizard / stepper bar |
| `--gup-color-background-gradient-1` | `#eff5ff → #f7f5f1` | Hero gradient 1 |
| `--gup-color-background-gradient-2` | `#eff5ff → #fafbff` | Hero gradient 2 |

#### Interaction-state
| Token | Value |
|---|---|
| `--gup-color-states-base-border` | `#7a7a83` |
| `--gup-color-states-base-bg` | `#ffffff` |
| `--gup-color-states-base-bg-secondary` | `#f4f4f5` |
| `--gup-color-states-base-bg-control` | `#eceef4` |
| `--gup-color-states-base-focus-ring` | `#9747ff` (purple) |
| `--gup-color-states-primary-hover` | `rgba(26 26 26 / 26%)` |
| `--gup-color-states-primary-active` | `rgba(26 26 26 / 70%)` |
| `--gup-color-states-secondary-hover` | `rgba(26 26 26 / 8%)` |
| `--gup-color-states-secondary-active` | `rgba(26 26 26 / 18%)` |
| `--gup-color-states-disabled-medium` | `#a1a1aa` |
| `--gup-color-states-disabled-low` | `#d0d0d4` |
| `--gup-color-states-inverted-primary-hover` | `rgba(255 255 255 / 80%)` |
| `--gup-color-states-inverted-primary-active` | `rgba(255 255 255 / 60%)` |

**Shadow tints:** `--gup-color-shadow-color-1…5` = `rgba(28 33 51 / 1%…6%)`. **Icon inverse:** `#ffffff`.

**Colour rules**
1. No hex outside these tables. A mockup colour with no token is non-compliant.
2. Pair every fill with its `contrast` token for text/icons.
3. Status colours are reserved for status, with an icon.
4. Page background is the warm canvas `#fefcf9`; cards sit on white above it.

### 4.2 Typography

- **Single typeface: Readex Pro.** Weights **400** and **700** only. Latin + Arabic subsets (one family serves LTR and RTL). `woff2`, `font-display: swap`. Never substitute another font for headings, Arabic, or numerals.

| Token | Size | Role |
|---|---|---|
| `--font-size-90` | 8px | Micro / fine print |
| `--font-size-200` | 12px | Captions, helper text |
| `--font-size-250` | 13px | Small labels |
| `--font-size-300` | 14px | Secondary body, dense UI |
| `--font-size-400` | **16px** | **Body default** |
| `--font-size-525` | 19px | Lead / large body |
| `--font-size-550` | 20px | Subheading |
| `--font-size-600` | 24px | Heading |
| `--font-size-700` | 32px | Page title / display |

Line heights: `--line-height-400` = 1.4, `--line-height-500` = 1.5. Body = 16px / 1.5, colour `content-primary`. Bold weight = 700.

### 4.3 Spacing & Layout

**Base unit `--unit` = 4px. All spacing is a multiple of 4.**

| Semantic token | Value | Use |
|---|---|---|
| `--gup-spacing-between-options` | 0px | Adjacent options |
| `--gup-spacing-between-items` | 8px | Items in a group |
| `--gup-spacing-component-default` | 12px | Default inside-component |
| `--gup-spacing-between-text` | 16px | Between text blocks |
| `--gup-spacing-text-to-component` | 16px | Text → component |
| `--gup-spacing-image-bottom` | 8px | Below image |
| `--gup-spacing-between-form-fields` | 20px | Between form fields |
| `--gup-spacing-between-content` | 24px | Between content blocks |
| `--gup-spacing-horizontal-between-columns` | 24px | Column gutters |
| `--gup-spacing-content-to-cta` | 32px | Content → primary CTA |
| `--gup-spacing-between-sections` | 48px | Between page sections |

Padding scale: `--gup-padding-xs/sm/md/lg/xl` = 8 / 16 / 24 / 32 / 40 px.
Universal scale (`--gup-component-0…9`, `--gup-universal-space-*`): 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 64, 80 px.

### 4.4 Border Radius
| Token | Value | Use |
|---|---|---|
| `--gup-radius-component-small` | 4px | Small controls, checkboxes |
| `--gup-radius-component-default` | 8px | Inputs, default components |
| `--gup-radius-card` | 12px | Cards, containers |
| `--gup-radius-button` / `--gup-radius-component-full` | 999px | **Buttons & pills (fully rounded)** |

> Fully-rounded pill buttons are a defining GUP signature. Square/lightly-rounded buttons are non-compliant.

### 4.5 Elevation & Shadows
Subtle, layered, built from the five navy shadow tints. Standard card / elevated container:
```
box-shadow:
  0 8px 16px 0 var(--gup-color-shadow-color-3),
  0 4px 8px  0 var(--gup-color-shadow-color-2),
  0 1.5px 3px 0 var(--gup-color-shadow-color-1),
  0 0.5px 1px 0 var(--gup-color-shadow-color-1);
```
Separation relies on canvas + white cards + hairline borders more than heavy shadow.

### 4.6 Iconography
Material Design icons + country flags, via `@govom/icons` / `gup-icon` only.
Sizes: `--gup-icon-xs/sm/md/lg/xl` = 16 / 20 / 24 / 28 / 32 px.

### 4.7 Breakpoints / Responsive
| Name | Min width |
|---|---|
| `xsmall` | 360px |
| `small` | 768px |
| `medium` | 1024px |
| `large` | 1440px |

Mobile-first. Design and review at 360 / 768 / 1024 / 1440.

### 4.8 Accessibility & Focus
Mandated by the National Digital Accessibility Policy and Digital Accessibility Guideline; verified at onboarding.

- **Focus ring:** `--gup-color-states-base-focus-ring` = **`#9747ff` (purple)**, stroke **6px** (`--gup-stroke-focus-ring`), offset **3px**.
- **Standard focus treatment:**
  ```
  box-shadow: 0 0 0 2px var(--gup-color-neutral-contrast),
              0 0 0 6px var(--gup-color-states-base-focus-ring);
  ```
- Every interactive element shows the purple focus state on keyboard focus.
- Status by icon **and** colour, never colour alone.
- Provide visible labels; use `screenreader-text`, `skip-link`, `labelled-item`, `form-hint`.
- Disabled states use the `states-disabled-*` tokens.

### 4.9 Bilingual & RTL
GUP is bilingual (Arabic / English); Arabic is RTL and a first-class requirement.

- Direction via `dir="rtl"` / `:dir(rtl)`; a `--gup--is-ltr` flag (`1` LTR, `-1` RTL) drives directional logic.
- Use **logical CSS properties** (`padding-inline`, `margin-inline`, `inset-inline-start`, `start`/`end`) — never hard left/right — so layouts mirror.
- RTL text alignment defaults to `start`.
- Readex Pro covers both scripts; no font swap between languages.
- Every screen designed/validated in **both** LTR English and RTL Arabic. Icons, steppers, breadcrumbs, navigation mirror. Numerals, dates, currency checked in Arabic context.

---

## 5. Information Architecture — The Five Page Archetypes

Gov.om is primarily a **service catalogue and identity layer**. The actual transactional form usually runs on the **entity's own system**, reached after authentication. Designers must know which archetype they are building, because each has a different required structure.

| # | Archetype | URL pattern | Role |
|---|---|---|---|
| 1 | **Home** | `/home` | Search-first discovery, categories, life-event bundles |
| 2 | **Catalogue / category listing** | `/service-catalogue?service=…` | Searchable, filterable service cards |
| 3 | **Service landing (detail) page** | `/w/[service-name]` | Standardised service description + "Start now" |
| 4 | **Sign-in (authentication)** | `/sign-in` | National PKI identity (phone or ID card) |
| 5 | **Entity service form** | entity portal | The multi-step transactional form |

**The canonical end-to-end journey:**
`Home (search) → category catalogue → service landing/detail → sign-in (PKI) → Start now → entity form → confirmation`

The auth gate sits between archetype 3 and 5. The entity form should assume the user arrives already authenticated via SSO, with personal/business context already set.

---

## 6. Shared Platform Components

These appear across archetypes and must be identical everywhere.

### 6.1 Global header
- Gov.om logo (links Home), primary nav landmark (`aria-label`), global **search**, **language toggle** (English ⇄ العربية), and **Sign in** / signed-in account.
- Background translucent white (`background-navigation-bar`), hairline bottom border. May be sticky.

### 6.2 Global footer (dark navy `#1c2133`)
Consistent across all pages, in this order:
1. **Emergency numbers** (Emergency 9999, Water 1442, Electricity 80070008, View all).
2. **Service categories** (the 14 categories: Education, Family & Parenting, Licenses & permits, Housing, Environment, Justice, Jobs, Retirement, Citizenship, Tourism, Public Health, Business & investment, Benefits, Labor).
3. **Digital Oman links** (Home, News, Entities, Sign Language Library, Open Data, E-Participation).
4. **Social** (YouTube, Facebook, X, Instagram, Snapchat, LinkedIn, WhatsApp).
5. **Utility links** (About, FAQ, Contact, Accessibility, Sitemap, ePayment policy/FAQ, Privacy, Guidelines & Policies, Design System, Feedback Hub).
6. **App store badges** (Apple, Google Play, Huawei AppGallery) and **© Gov.om**.
Use inverted content/link tokens on the dark surface.

### 6.3 Breadcrumbs
`role="list"`; separator `›` (LTR) / `‹` (RTL). Depth reflects IA — service detail pages run 5 levels: `Home › Services › [Category] › [Sub-group] › [Service]`.

### 6.4 Account context switcher (Personal / Business)
- Tied to the **signed-in PKI identity**, not a per-form control.
- Surfaces on service pages as **"You are starting the service as:"** with Personal account / Business account options (avatar + label).
- The active context carries through the journey into the entity form. Design it consistently across pages.

### 6.5 Global search
Search-first is central to the platform (the home hero *is* a search). Provide a prominent search field with "Popular searches" suggestions where space allows.

### 6.6 Language toggle
Single control switching English ⇄ العربية and flipping `dir`. Present in the header on every page.

### 6.7 Skip link
"Skip to main content" as the first focusable element on every page.

### 6.8 Feedback bar
Appears near the foot of content pages: **"Are you satisfied with this page?"** with **Yes** / **No** (thumb icons), plus **"Report a problem with this page"** opening a short form ("What were you doing? / What went wrong?", with a "don't include personal or financial information" note). Standardised — reuse, don't redesign.

### 6.9 GUP chatbot
A persistent assistant ("GUP Chatbot") is available across the portal. Reserve space for its launcher; don't let it collide with sticky CTAs or footers.

### 6.10 Entity badge
On service pages: the responsible entity's logo + name (e.g. "Ministry of Health"), shown with an **"Updated: [date]"** stamp.

---

## 7. Service Landing (Detail) Page — Mandated Template

This is the standardised structure of every Gov.om service page (archetype 3). It is consistent across ministries (verified on Labour and Health services). Build it section-for-section in this order.

| # | Section | Content / rules |
|---|---|---|
| 1 | **Breadcrumb** | 5 levels: Home › Services › Category › Sub-group › Service. |
| 2 | **H1 + description** | Service name (one H1) + a single-sentence description. |
| 3 | **Entity badge + Updated date** | Responsible entity logo + name; "Updated: [date]". |
| 4 | **Account context** | "You are starting the service as:" → Personal / Business account (avatar). |
| 5 | **Required documents** | Tick list of documents the applicant must have. |
| 6 | **Service fees** | **Collapsible** (Show/Hide) panel; amounts with the Omani rial mark; "0" / "–" where free or not applicable. |
| 7 | **Service steps (lifecycle)** | Numbered list of the **post-application lifecycle** (e.g. Submit → Process → Approve, or up to 8+ steps). **Variable length with a "Show All Steps" toggle** when long. This is informational, *not* the form's progress bar. |
| 8 | **Special conditions** | List of eligibility prerequisites (e.g. "must have a health record"). |
| 9 | **Service Locations / channels** | Channel (e.g. Online), **estimated time** (e.g. "~3 minutes"), and **cost** ("Fixed cost"), shown as chips. |
| 10 | **Start now CTA** | Primary action. Variants: **Start now** (redirects to the provider) or **Visit website**. Always show the disclaimer: *"By clicking Start now you will leave Gov.om and be taken to the service provider's website."* |
| 11 | **Feedback bar** | The shared satisfaction + report-a-problem bar (§6.8). |

**Layout:** main column for sections 5–9, with a sticky sidebar carrying the account context + fee/time/channel summary + the **Start now** button + disclaimer. Stacks above content on tablet/mobile.

> **"Steps" disambiguation:** On the service landing page, "Service steps" is the **lifecycle** (what happens after applying) and supports a show-all toggle. On the entity form, the stepper is **form progress** (page X of Y). Never mix them.

---

## 8. Sign-in / Authentication — PKI Method Selection

GUP authentication is **national PKI / eID — not username + password.** The sign-in page (archetype 4) is a method-selection page.

**Structure**
1. Breadcrumb: Home › Gov.om Experiences › Sign In.
2. H1 "Sign in" + description ("Log in with your information to get a personalized experience…").
3. **"Choose a way to sign in"** — two selectable method cards:
   - **Mobile phone** — "You'll need your PKI-activated phone number."
   - **Identity card** — "You'll need the card reader."
4. **Continue** (primary) + **Get Help** (secondary/link).
5. Benefits panel — **"What do you benefit from signing in?"**:
   - A single sign-in for all services
   - A personalized dashboard to track service progress online
   - Easy navigation between personal and business profiles
   - Editable user details
   - Personalized notifications of what matters to you
6. Shared feedback bar + footer.

**Design rules**
- Present the two methods as equal, selectable cards (radio-style), one chosen at a time, then Continue. One-thing-per-page.
- Account duality (personal/business) is established here and persists across the session (§6.4).
- Don't design password fields, "remember me", or social login — they don't exist in this model.

---

## 9. Catalogue & Home (Discovery Pages)

### 9.1 Home (archetype 1)
- **Search-first hero**: a welcome line + "How can we help you today?" + a prominent search with **Popular searches**.
- **Category tiles** (Unified Services, Jobs & Occupations, Public Health & Safety, Business & investment, Benefits, Labor, …) → catalogue pages.
- **"Life's big events" bundles** — curated multi-service journeys (e.g. *A new baby joins my family*, *Step into the job market*, *Care for the elderly*, *Accessible life for people with disabilities*) → `/w/` bundle pages.
- Supporting blocks: upcoming dates, the **PKI activation guide** (3 steps), homepage slider.

### 9.2 Catalogue / category listing (archetype 2)
- Breadcrumb, H1 (category name), one-line description.
- Prominent **search** + filters.
- A **grid of service cards** (each linking to a service landing page). Cards use the standard card radius (12px), white surface, hairline border, elevation.

---

## 10. Entity Service Forms — One-Thing-Per-Page Journey

The transactional form (archetype 5) follows the government **one-thing-per-page** service model: a guided journey of small, focused pages — not dense multi-field screens.

**Journey shape:** `Start → stepped form pages → Check your answers → Confirmation`.

**Page anatomy (top to bottom):**
1. Global header (§6.1).
2. **Form progress stepper** (`gup-stepper`) — current step highlighted.
3. **Content header** (`gup-content-header`): breadcrumbs → optional small subtitle → **H1** → summary.
4. Main content: `gup-form-section` panels (each with an H2).
5. **Wizard footer** (`gup-wizard-main` + `gup-wizard-footer`): sticky, with **Back** (`start` slot) + **Continue/Submit** (`end` slot).
6. Global footer.

**Layout rules:** page canvas `#fefcf9`; cards on white; single readable column for forms (don't widen line length). Section rhythm: 48px between sections, 24px between content blocks, 20px between fields, 32px from last content to primary CTA.

---

## 11. Forms — Field Anatomy, Validation, Grouping

The most important pattern. Encoded in `gup-input-field`, `gup-form-section`, `gup-form-hint`, `gup-form-validation-message`.

### 11.1 Field anatomy (top to bottom inside one field)
1. **Label** — *above* the input, always visible. Never use placeholder text as the label.
2. **Hint** — directly under the label, before the input (format help, e.g. "DD/MM/YYYY").
3. **Error message** — appears **above the input** when invalid, prefixed with an `error` icon.
4. **Input** — with optional leading/trailing affordances.

Accessibility wiring is built in: the input's `aria-describedby` links hint + error; validity is driven by the error message. Designers must design the **error and hint states**, not just the empty state.

### 11.2 Built-in input affordances
| Type | Affordance |
|---|---|
| Email | leading `mail` icon |
| Phone | leading `phone` icon |
| Date | trailing `calendar-today` button |
| Time | trailing `schedule` button |
| Password | trailing visibility toggle |

### 11.3 Grouping & required marking
- Group related fields under a **`gup-form-section`** with an **H2** and optional footer.
- Fields expose a **`required`** flag; mark requirement consistently (follow the Arabic UX guideline for exact required/optional wording).
- Spacing: 20px between fields; 32px to the primary CTA.
- **Read-only / answer display:** `gup-labelled-item` (label above, value below) — e.g. on "Check your answers".

### 11.4 Form journey rules
- One question (or one tightly-related group) per page.
- One primary action per page (`Continue` / `Submit`); secondary actions subordinate.
- A **Back** affordance on every step.
- A **"Check your answers"** page (`gup-labelled-item` rows + "Change" links) before final submit.

---

## 12. Navigation & Journey

| Pattern | Component | Rules |
|---|---|---|
| Global nav | `gup-header` | Logo + nav landmark; minimal items. |
| Breadcrumbs | `gup-breadcrumbs` / `-item` | Location in hierarchy; mirrors in RTL. |
| **Form progress** | `gup-stepper` / `gup-stepper-item` | Step states `default`, `done`, `selected` (+ `and`). `wizard-mode` (active) / `static-mode` (overview). Supports **show/hide-all** (`toggle-all-displayed`, `show-all-label`, `hide-all-label`) — used for long step lists. |
| **Lifecycle steps** | numbered list (service landing) | Informational post-application stages; variable length with **"Show All Steps"** toggle. |
| Wizard chrome | `gup-wizard-main` + `gup-wizard-footer` | Sticky footer: `start` = Back, `end` = Continue/Submit. |
| Pagination | `gup-pagination` | `numbered` / `directional`; `aria-current="page"`. For lists/results, **not** form steps. |
| Tabs | `gup-tabs` (+ `tab`, `tab-panel`, `tabs-navigation`) | Switch views within one page; never to advance a journey. |
| Links | `gup-link` | Underlined, 2px offset; link colour `#132459`; inverted `#bfd8ff` on dark. |
| Skip link | `gup-skip-link` | Required. |

Progress through a service is **linear and explicit**. Provide in-page Back; don't rely on browser back. Don't use tabs/pagination to advance a form.

---

## 13. Messaging, Feedback & Status

| Need | Component | Options |
|---|---|---|
| Page-level inline notice | `gup-banner` | `type`: neutral/success/warning/error; `appearance`: outline/filled; optional close + icon; H2 title + message + action slot. |
| Highlighted aside / callout | `gup-callout` | `appearance`: default/background/border; H2 title + content + footer. Emphasis, not errors. |
| Whole-page outcome | `gup-page-status` | `type`: success/error/expired → icon done/close/priority-high; large icon + H2 title + message + action. The **confirmation page**. |
| Transient confirmation | `gup-toasts` | Brief, auto-dismiss, non-blocking. |
| Blocking decision/detail | `gup-dialog` (+ `dialog-container`) | Modal. |
| Contextual help | `gup-tooltip` | Hover/focus hints. |
| In-progress | `gup-spinner` | Loading. |
| Inline field error | `gup-form-validation-message` | Error icon + message tied to field. |
| Page satisfaction | shared feedback bar (§6.8) | "Are you satisfied with this page?" + report. |

Status colour discipline: success/warning/error map to the status tokens, always with an icon.

---

## 14. Interaction States

Every interactive element defines **five** states.

| State | Standard |
|---|---|
| Default | Base token fill/border. |
| Hover | `states-*-hover` overlays. |
| Active/Pressed | `states-*-active` overlays. |
| **Focus** | Purple ring — white halo + `#9747ff`, 6px, 3px offset. Mandatory on **all** interactive elements. |
| Disabled | `states-disabled-medium/low`; reduced affordance, not just low opacity. |

**Button hierarchy** (`gup-button`, appearance) — one primary per view:
| Appearance | Use |
|---|---|
| `primary` | The single main action (Continue, Submit, Start now). |
| `secondary` | Supporting actions. |
| `text` | Low-emphasis / tertiary (Back-style). |
| `danger` | Destructive only. |

Also: `kind` (`button`/`link`), `type` (`button`/`submit`/`reset`), `with-icon-only`, `inverted` (dark surfaces). All buttons are full pills (999px); padding-block 8 / padding-inline 16; font 16/1.5; icon-label gap 12.

---

## 15. Content & Voice

Mandated by the **Content Strategy** (Content Patterns, Style Guidelines, Creating Content Capability).
- Write realistic, plain-language copy in mockups (labels, hints, errors, button text) — not lorem ipsum.
- Active voice; buttons say what happens ("Save changes", not "Submit"); an action keeps the same name through the flow.
- Errors explain what went wrong and how to fix it, in the interface's voice; they don't apologise or stay vague.
- Sentence case; no filler; one job per element.
- Apply the same standards in Arabic per the Arabic content rules; confirm all Arabic wording with an Arabic reviewer.

---

## 16. Component Library Inventory

Compose services from these existing components. A custom alternative to any of these will fail review.

**Actions & navigation:** `button`, `button-group`, `link`, `breadcrumbs`, `pagination`, `tabs`, `header`, `skip-link`, `dropdown`, `search`
**Forms & inputs:** `input-field`, `textarea-field`, `checkbox`, `radio-button`, `radio-button-group`, `toggle`, `file-upload`, `file-item`, `form-section`, `form-list`, `form-hint`, `form-validation-message`, `labelled-item`, `filter-chip`
**Content & layout:** `accordion`, `details`, `content-header`, `divider`, `image`, `rich-text`, `data-table`, `table`, `data-sheet`, `avatar`, `badge`, `badge-chip`, `flag`, `logo`, `icon`
**Feedback & status:** `banner`, `callout`, `dialog`, `generic-popup`, `toasts`, `tooltip`, `spinner`, `page-status`
**Process / wizard:** `stepper`, `track`, `wizard-main`, `wizard-footer`
**Utilities:** `gup-track` (spacing — `gap` scale 2=4px, 3=8px, 4=12px, 5=16px, 6=20px), `gup-screenreader-text` (visually hidden, AT-readable).

---

## 17. Compliance Checklists

### 17.1 Visual (every screen)
- [ ] Page canvas `#fefcf9`; content cards on white.
- [ ] All colours are GUP tokens; status colours used only for status (with icon).
- [ ] Readex Pro only; weights 400/700; type sizes snapped to scale; body 16/1.5.
- [ ] Spacing on the 4px grid (48 sections / 24 content / 20 fields / 32 to CTA).
- [ ] Buttons full-pill, correct appearance; cards 12px, components 8px radius.
- [ ] Standard layered elevation only.
- [ ] Icons from `@govom/icons` at standard sizes.
- [ ] Purple 6px focus on every interactive element.
- [ ] Validated in English (LTR) and Arabic (RTL); responsive at 360/768/1024/1440.

### 17.2 UX / structure (per screen)
- [ ] Exactly one H1; no skipped heading levels; no faked headings via size.
- [ ] Content-header order (breadcrumbs → subtitle → H1 → summary).
- [ ] Forms: label above, hint below label, error above input with icon; no placeholder-as-label.
- [ ] Required/optional marked consistently; fields grouped in `gup-form-section` (H2).
- [ ] One primary action per screen; correct messaging component chosen.
- [ ] Every element maps to an existing GUP component.

### 17.3 Per-archetype
- [ ] **Service landing page** follows the §7 template, in order, with the off-portal disclaimer on Start now and the lifecycle steps (show-all if long).
- [ ] **Sign-in** uses PKI method selection (phone / ID card), Continue + Get Help, benefits panel; no passwords.
- [ ] **Catalogue** has search + filterable service-card grid.
- [ ] **Entity form** is one-thing-per-page with stepper + wizard footer + Check-your-answers + `page-status` confirmation; assumes SSO-authenticated, account-context set.
- [ ] **Shared components** (header, footer, breadcrumbs, account switcher, feedback bar, chatbot space) identical across pages.

### 17.4 Per-journey
- [ ] Linear flow; stepper shows progress; wizard footer provides Back + Continue.
- [ ] Auth gate (PKI) sits before the entity form; personal/business context persists.
- [ ] Outcome via `gup-page-status`; skip link present; logical focus order.
- [ ] Whole journey validated EN (LTR) and AR (RTL).

---

## 18. Quick Reference Card

| Item | Standard |
|---|---|
| Primary brand | `#2f57cd` |
| Brand dark / links | `#132459` |
| Page canvas | `#fefcf9` |
| Footer | `#1c2133` |
| Success / Warning / Error | `#16a249` / `#ca8511` / `#dc2828` |
| Body text | `#27272a` |
| Focus ring | `#9747ff`, 6px, 3px offset |
| Font | Readex Pro (400 / 700), Latin + Arabic |
| Body type | 16px / 1.5 |
| Base unit | 4px |
| Button radius | 999px (pill) |
| Card / component radius | 12px / 8px |
| Breakpoints | 360 / 768 / 1024 / 1440 |
| Section spacing | 48px |
| Icon set | `@govom/icons` (Material + flags) |
| Auth | National PKI (phone / ID card) — no passwords |
| Service page CTA | "Start now" (redirects off-portal) + disclaimer |
| Account model | Personal / Business, tied to PKI identity |

---

## 19. Known Gaps & Governance

This document covers the token, component, interaction-pattern, and page-architecture layers — everything derivable from the design system and the live platform. Confirm these before final sign-off:

1. **Arabic-only governance documents** (UX Guidelines; interface Design Standards; App Development Standards) may add rules on journey structure, required/optional conventions, microcopy, and date/number/address formats. Review with an Arabic reviewer.
2. **Live behavioural detail** — animation/transition timings, exact responsive reflow of complex components (tables, long steppers), and any newly-added components — confirm against the live **Storybook** (`storybook.service.gov.om`), since the library is versioned (current: `@govom/tokens` 0.2.2, `@govom/components` 3.26.0) and evolving.
3. **Catalogue card and search/filter detail** render client-side on the live site; confirm card fields and filter behaviour against Storybook/production at build time.

*Re-verify token versions before each major design cycle.*
