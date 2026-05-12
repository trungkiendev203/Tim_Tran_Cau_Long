# Chill Cầu Design System — CHANGELOG

All notable changes to the Chill Cầu Design System will be documented here.
Format: [Version] | [Date] | [Type: Added/Changed/Fixed] | Description

---

## v1.7.0 — Iteration 9 (Dev Handoff Complete — All READMEs) — 25/03/2026

### 🟢 Added
- **`components/discussion-card/README.md`**: States (text/images/loading/guest), CSS classes, Livewire auth-gate pattern, image grid variants, a11y.
- **`components/tag-chip/README.md`**: 5 system tags color table, sizes, 3 usage patterns (read-only/filter/dismissible), a11y.
- **`components/post-composer/README.md`**: States (collapsed/expanded/submitting/error/guest), full Livewire component class, validation rules, a11y.
- **`components/comment-thread/README.md`**: States (default/empty/guest), Livewire pattern with auth gates, nested replies, like/reply methods, a11y.
- **`components/report-modal/README.md`**: States (reason/submitting/success), radio-card pattern, Alpine+Livewire trigger, success state template, a11y.

> ✅ **All 21/21 component READMEs are now complete.** Dev handoff documentation is 100% finished.

---

## v1.6.0 — Iteration 8 (Dev Handoff — Screens & Remaining READMEs) — 25/03/2026

### 🟢 Added
- **`components/court-dropdown/README.md`**: States, CSS classes, Alpine.js realtime search pattern with `x-model`, `aria-haspopup/expanded`, `role="listbox"`.
- **`components/pagination/README.md`**: Load More vs Numbered variants, Livewire `loadMore()` pattern, progress bar width formula.
- **`components/mobile-filter/README.md`**: Bottom sheet CSS, `slideUp` animation, Alpine.js open/close with `@click.outside`, `role="dialog"`.
- **`screens/not-found/index.html`** *(new screen)*: 404 error page — `ds:screen:not-found-001` — with navbar, 404 code, quick-nav links, dark mode, responsive.

### 🟡 Changed
- **`screens/map/index.html`**: Added 2 missing states: `ds:screen:map-001--loading` (skeleton court list + map placeholder) and `ds:screen:map-001--error` (API failure with retry CTA). Map screen now has **5 states**: Default, Permission-Denied, Empty, Loading, Error.
- **`TRACKING-STATE-MATRIX.md`**: Registered `not-found` screen (total screens: **8→9**). Updated map screen states column.

---

## v1.5.0 — Iteration 7 (Dev Handoff Fixes) — 25/03/2026

### 🟢 Added
- **`components/navbar/README.md`**: States, CSS classes, Blade/Alpine patterns, dark mode toggle, responsive, a11y.
- **`components/filter-panel/README.md`**: 9-filter table (with Spec-IDs), Livewire `$toggle` pattern, multi-select button binding, `wire:model.live.debounce`, responsive hide rule.
- **`components/reminder-card/README.md`**: States (Active/Inactive/Loading/Error), Blade template, `wire:confirm` delete pattern, Livewire events.
- **`components/notification-bell/README.md`**: States (Has/Empty/Loading/Error), Blade+Alpine dropdown pattern (`@click.outside`, `x-transition`), notification types, a11y attributes.
- **`components/map-marker/README.md`**: Marker variants table, **Leaflet DivIcon integration code**, popup HTML builder, a11y notes.
- **`livewire-conventions.md`** *(new file)*: Authoritative Livewire 3 + Alpine.js conventions — naming, data binding, loading states, events, dark mode, modal, toast, form validation.

### 🟡 Changed
- **`base/base.css`**: Added authoritative **Responsive Breakpoints** section (comments + media queries). Defines 3 breakpoints: `< 768px` (mobile), `768–1023px` (tablet), `≥ 1024px` (desktop). Documents which classes collapse/hide at each breakpoint.

---

## v1.4.0 — Iteration 6 (Doc Sync from PRD) — 25/03/2026

### 🔴 Fixed
- **`TRACKING-STATE-MATRIX.md` — Community US-ID Mapping**: Corrected ordering of Epic 5 user stories to exactly match `prd.md` US-20→US-28. Previous version had US-21/US-22/US-23/US-24 row descriptions out of order (feed & image were swapped).
- **`TRACKING-STATE-MATRIX.md` — Report Modal DS-ID**: US-27 (Report vi phạm) was mapped to `ds:comp:modal-001 (tái dùng)` — corrected to the dedicated `ds:comp:report-modal-001`.

### 🟢 Added
- **`ds:comp:report-modal-001`**: Registered the existing `components/report-modal/index.html` component (built Iteration 5, omitted from docs). States: Reason selection / Submitting / Success. Implements `<<spec:comp-report-modal-0001>>` and `<<prd:us-community-report-0001>>`.
- **`ds:screen:coming-soon-001`**: Registered the existing `screens/coming-soon/index.html` placeholder screen (built Iteration 5, omitted from docs). Covers Phase 3 out-of-scope features: Xếp hạng & Bảng giá.

### 🟡 Changed
- **`README.md`**: Bumped to v1.4.0 Iteration 6. Added `report-modal` row to Components table. Added `coming-soon` screen to Screens table and directory tree. Updated component count from 16 → 21.
- **`TRACKING-STATE-MATRIX.md`**: Updated header date to Iteration 6. Summary counts corrected: Components 20 → 21, Screens 7 → 8.

---

## v1.3.0 — Iteration 5 (QA Remediation) — 25/03/2026

### 🔴 Fixed (Audit Remediation)
- **Folder Structure**: Moved `design-tokens.json` to `tokens/` directory. Added `patterns/` and `assets/` directories as required by the QA audit report.
- **Component States**: 
  - `reminder-card`: Added Loading (Skeleton) and Error markup variants.
  - `notification-bell`: Added Loading (Skeleton) and Error/Offline markup variants.
  - `search-bar`: Added `results-empty` and `error` states.
- **Accessibility & Consistency**:
  - `base/base.css`: Added global `[tabindex="0"]:focus-visible` and `[role="button"]:focus-visible` rules for consistent keyboard navigation.
  - `modal/index.html`: Implemented vanilla JS focus trap and Escape key listener template for developers.

### 🟢 Added
- **`tokens/design-tokens.d.ts`**: Generated TypeScript definitions for design tokens to aid developer integration.

---

## v1.2.2 — UI Sync (Map Layout & Navbar) — 24/03/2026

### 🟡 Changed
- **`components/navbar`**: Thêm link "Xếp hạng", "Bảng giá". Cập nhật bộ nút action bên phải (Chuyển chế độ Sáng/Tối, nút Ủng hộ, icon Yêu thích).
- **`screens/feed/index.html`**: Đồng bộ Navbar mới vào màn Tìm kèo.
- **`screens/map/index.html`**: 
  - Đổi layout từ 2 cột sang **3 cột** chuẩn: [Danh sách sân] | [Bộ lọc tìm kèo] | [Bản đồ].
  - Bổ sung overlay cards (Khu vực trên bản đồ) và Floating Action Buttons (Trợ lý AI, Cài app) giống 100% bản thiết kế.

### 📝 Notes
- **Trang cá nhân (Profile)**: Đã ghi nhận file `screens/profile/index.html` hiện tại chỉ là khung rỗng. Chưa tiến hành code vì chưa có thiết kế. Sẽ bổ sung sau.

---

## v1.2.1 — QA Hotfix — 24/03/2026

### 🔴 Fixed
- **Modal CSS duplication**: Removed inline `.btn`, `.form-input`, `.form-label`, `.form-group` definitions — now imported from `base/base.css`. Only modal-specific overrides remain (`.modal .btn { padding: 9px 18px }`)
- **Toast CSS cleanup**: Removed inline CSS reset (`*, *::before`), replaced all hardcoded hex values (`#f8fafc`, `#1e293b`, `12px`, etc.) with token vars (`var(--sm-bg-page)`, `var(--font-size-xs)`, etc.). Added `base.css` import.
- **`design-tokens.json` — `color-accent`**: Fixed persistent naming conflict — `semantic.color-accent` was still `#16a34a` (green/primary) → now correctly `#2563eb` (blue/accent)

### 🟢 Added
- **`design-tokens.json` — `z-index` scale**: 7 entries — `dropdown: 10`, `sticky: 20`, `fixed: 30`, `modal: 40`, `toast: 50`, `popover: 60`, `tooltip: 70`
- **`components/skeleton/README.md`**: Class table (`.skeleton`, `.skeleton--circle`, `.skeleton--pill`), 4 layout variants, `aria-busy="true"` a11y pattern with code example
- **Toast `focus-visible`**: Added `.toast__close:focus-visible` for keyboard nav

### 📋 Validation
- `design-tokens.json` version bumped to `1.2.1`, iteration `4`
- Modal: 0 inline `.btn` / `.form-input` / `.form-label` / `.form-group` definitions
- Toast: 0 CSS reset lines, 0 hardcoded body colors
- `color-accent` = `#2563eb` ≠ `color-primary` = `#16a34a` ✅

---

## v1.2.0 — Iteration 4 — 24/03/2026

### 🔴 Fixed (Re-Audit QA)
- **Showcase counter**: Stat "17 Components" → "16" (corrected)
- **Skeleton class naming**: Renamed `.sk` → `.skeleton`, `.sk--circle` → `.skeleton--circle`, `.sk--pill` → `.skeleton--pill` — now consistent with canonical `base.css`
- **Skeleton ARIA**: Added `aria-busy="true"` + `aria-label` on all 4 skeleton containers (navbar, post-card, filter, reminder)

### 🟢 Added
- **`base/base.css` — `.form-select`**: New class for native `<select>` with `appearance: auto` — prevents `.form-input`'s `appearance: none` from suppressing native arrows
- **`screens/profile/index.html` — Error state**: New `ds:screen:profile-001--error` — shows when profile API call fails (503/network error). Includes retry CTA, error code, support email. Uses `role="alert"`.
- **`screens/map/index.html` — Permission Denied state**: New `ds:screen:map-001--permission-denied` — shows when user denies geolocation. Includes privacy reassurance, manual location fallback input. Uses `role="status"`.
- **`components/post-card/README.md`**: Usage, states, props, `role="article"` a11y note
- **`components/auth-form/README.md`**: All 5 states, props, `aria-invalid` + `aria-describedby` error pattern
- **`components/badge-level/README.md`**: All 10 levels table, ⚠️ color-only signaling warning, `title`/`aria-label` fix
- **`components/search-bar/README.md`**: AI-specific states (NLP loading, empty results, error), `role="combobox"` ARIA pattern

### 🟡 Changed (Token Migration — Complete)
- Migrated 8 remaining component files to import `tokens/tokens.css`:
  - `skeleton/index.html`
  - `notification-bell/index.html`
  - `filter-panel/index.html`
  - `reminder-card/index.html`
  - `court-dropdown/index.html`
  - `map-marker/index.html`
  - `pagination/index.html`
  - `mobile-filter/index.html`
- All 16 components now use `tokens.css` — zero inline `:root` declarations remain

---

## v1.1.0 — Iteration 3 — 24/03/2026

### 🔴 Fixed (QA Audit)
- **token naming conflict**: `semantic.color-accent` was `#16a34a` (green/primary) — now correctly `#2563eb` (blue/accent). Semantic `--sm-color-primary` remains green.
- **button CSS**: `btn--lg` `border-radius` was `10px`, now uses token `--radius-lg: 12px`
- **modal ARIA**: Added `role="dialog"`, `aria-modal="true"`, `aria-labelledby` to all 3 modal variants
- **modal close**: `✕` button had no label — now has `aria-label="Đóng hộp thoại"` on all instances
- **toast ARIA**: Added `role="alert"` (error/warning) and `role="status"` (success/info). Icons are now `aria-hidden="true"`. Close buttons have `aria-label`.
- **base.css lint**: Added `appearance: none` alongside `-webkit-appearance: none` for cross-browser compatibility
- **form labels**: `auth-form` now uses proper `for`/`id` pairs on all inputs
- **error messages**: `aria-describedby` + `aria-invalid="true"` added to error state inputs

### 🟢 Added
- **`tokens/tokens.css`**: CSS custom properties generated from `design-tokens.json`. All components can now `@import` this file instead of declaring their own `:root`.
- **`base/base.css`**: Shared canonical stylesheet with `.btn`, `.form-input`, `.form-label`, `.form-group`, `.card`, `.badge`, `.skeleton`, `.spinner`, `.visually-hidden`. Eliminates CSS duplication across components.
- **`design-tokens.json` — z-index tokens**: `--z-dropdown: 10`, `--z-sticky: 20`, `--z-overlay: 30`, `--z-modal: 40`, `--z-toast: 50`, `--z-tooltip: 60`
- **`README.md`**: Design system onboarding doc — structure, import convention, token usage, a11y checklist, component table
- **`components/button/README.md`**: Button usage guide, do/don't, props, states, HTML patterns
- **`components/modal/README.md`**: Modal usage, ARIA requirements, focus trap notes
- **`components/toast/README.md`**: Toast guide, role=alert vs role=status decision table
- **Auth Form — New States**: Loading (spinner + aria-busy) and Success Redirect (progress bar + aria-live) added to `auth-form/index.html`

### 🟡 Changed
- **`button/styles.css`**: Refactored to use `@import tokens.css + base.css`. Now only defines component-specific overrides. Eliminated all duplicate `:root` declarations.
- **`modal/index.html`**: Migrated CSS to use `tokens/tokens.css`. `.btn` padding harmonized across modal and button component.
- **`toast/index.html`**: Migrated to `tokens/tokens.css`.
- **Showcase counter**: Will update in Iteration 3 final pass.

---

## v1.0.0 — Iteration 1 & 2 — 24/03/2026

### Added (Iteration 1)
- Foundation: `design-tokens.json` (colors, typography, spacing, shadows, borders, breakpoints, transitions)
- Components: `button`, `post-card`, `badge-level`, `filter-panel`, `navbar`, `search-bar`, `map-marker`, `reminder-card`, `notification-bell`, `auth-form` (10 total)
- Screens: `feed`, `map`, `reminder`, `auth` (4 total)
- Layouts: `sidebar-content`, `master-detail` (2 total)
- `TRACKING-STATE-MATRIX.md`: PRD-ID ↔ DS-ID mapping

### Added (Iteration 2)
- Components: `modal`, `toast`, `court-dropdown`, `skeleton`, `pagination`, `mobile-filter` (6 new)
- Screens: `profile`, `feed-states` (2 new)
- `showcase/index.html`: Central Design System Hub
- `iterations-report/iteration-0001.md` and `iteration-0002.md`
