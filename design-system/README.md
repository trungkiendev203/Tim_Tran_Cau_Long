# Chill Cầu Design System

> **Version**: 1.7.0 — Iteration 9 | **Date**: 25/03/2026

## 🏸 Giới thiệu

Design System cho **Chill Cầu** — nền tảng tìm kèo cầu lông tại Hà Nội.
Đây là HTML/CSS prototype làm reference cho team dev implement vào Laravel/Livewire/Alpine.js.

---

## 📂 Cấu trúc thư mục

```
docs/design-system/
├── README.md                     ← Bạn đang ở đây
├── tokens/
│   ├── design-tokens.json        ← Source of truth cho tất cả tokens
│   └── tokens.css                ← CSS custom properties (generated từ JSON)
├── base/
│   └── base.css                  ← Shared base classes: .btn, .form-input, .card...
├── patterns/                     ← Mẫu UI kết hợp nhiều component
├── assets/                       ← Tài nguyên tĩnh (ảnh, icon...)
├── components/
│   ├── button/
│   │   ├── index.html            ← Prototype showcase
│   │   ├── styles.css            ← Component-specific overrides
│   │   └── README.md             ← Usage guide
│   ├── post-card/ ...
│   └── [21 components total]
├── screens/
│   ├── feed/                     ← Trang chính tìm kèo
│   ├── map/                      ← Bản đồ sân
│   ├── reminder/                 ← Nhắc lịch
│   ├── auth/                     ← Đăng nhập / Đăng ký
│   ├── profile/                  ← Hồ sơ cá nhân
│   ├── feed-states/              ← States: Empty, Error, Offline, Permission, Onboarding
│   └── coming-soon/              ← Placeholder cho Xếp hạng & Bảng giá (Phase 3)
├── showcase/
│   └── index.html                ← Hub tổng hợp toàn bộ DS ← MỞ CÁI NÀY TRƯỚC
├── TRACKING-STATE-MATRIX.md      ← Mapping PRD-ID ↔ DS-ID
├── CHANGELOG.md                  ← Version history
├── DS_AUDIT_REPORT.md            ← QA audit report
└── livewire-conventions.md       ← Livewire 3 + Alpine.js conventions ← ĐỌC TRƯỚC KHI CODE
```

---

## 🚀 Bắt đầu nhanh

**Mở Showcase Hub để xem toàn bộ:**
```
docs/design-system/showcase/index.html
```

**Dùng local server (khuyến khích):**
```bash
python -m http.server 8090 --directory "e:\KienCauLong"
# → http://127.0.0.1:8090/docs/design-system/showcase/index.html
```

---

## 🔧 Cách dùng tokens trong component mới

Mỗi component CSS phải import theo thứ tự:

```css
/* 1. CSS Variables từ design-tokens.json */
@import '../../tokens/tokens.css';

/* 2. Shared base classes (.btn, .form-input, .card, ...) */
@import '../../base/base.css';

/* 3. Component-specific styles ONLY (không redefine những gì base đã có) */
.my-component { ... }
```

**Không được:**
- ❌ Tự khai báo `:root { --color-primary: ... }` trong component
- ❌ Copy-paste `.btn { ... }` từ component khác
- ❌ Hardcode hex values — dùng `var(--color-primary-600)` thay vì `#16a34a`

---

## 🎨 Design Tokens

| Token | Mô tả | File |
|---|---|---|
| Colors: Primary (Green) | `--color-primary-600: #16a34a` | tokens.css |
| Colors: Accent (Blue) | `--color-accent-600: #2563eb` | tokens.css |
| Colors: Danger (Red) | `--color-danger-500: #ef4444` | tokens.css |
| Semantic | `--sm-bg-surface`, `--sm-text-primary`, ... | tokens.css |
| Spacing | `--space-xs` (4px) → `--space-4xl` (64px) | tokens.css |
| Z-Index | `--z-modal: 40`, `--z-toast: 50`, ... | tokens.css |

> ⚠️ **v1.1.0 Fix**: `--sm-color-accent` = `#2563eb` (blue), không phải green.
> Green = `--sm-color-primary` = `--color-primary-600`.

---

## ♿ Accessibility Checklist

Mỗi component phải đảm bảo:

- [ ] Tất cả interactive elements có `aria-label` nếu không có text label rõ ràng
- [ ] Modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trap
- [ ] Toast: `role="alert"` (error/warning) hoặc `role="status"` (success/info)
- [ ] Skeleton: `aria-busy="true"` trên container
- [ ] Icon buttons: `aria-label="[action]"` (e.g. "Đóng hộp thoại")
- [ ] Toggle buttons: `aria-pressed="true/false"`
- [ ] Forms: `<label for="...">` + `id` trên input

---

## 📦 Components (v1.7.0)

> ✅ **README coverage: 21/21 components — 100% complete** (Iteration 9)

| DS-ID | Tên | States | Iteration |
|---|---|---|---|
| `ds:comp:button-001` | Button | Primary/Secondary/Danger + 4 states | 1 |
| `ds:comp:post-card-001` | Post Card | Default/Loading/Empty/Error | 1 |
| `ds:comp:badge-level-001` | Badge Level | 10 levels | 1 |
| `ds:comp:filter-panel-001` | Filter Panel | 9 filters | 1 |
| `ds:comp:navbar-001` | Navbar | Guest/LoggedIn/Mobile | 1 |
| `ds:comp:search-bar-001` | AI Search Bar | Default/Loading/Results | 1 |
| `ds:comp:map-marker-001` | Map Marker | 3 variants + popup | 1 |
| `ds:comp:reminder-card-001` | Reminder Card | Active/Inactive | 1 |
| `ds:comp:notification-bell-001` | Notification Bell | Has/Empty | 1 |
| `ds:comp:auth-form-001` | Auth Form | Login/Error/Register | 1 |
| `ds:comp:modal-001` | Modal *(a11y fixed)* | Confirm/Form/Share | 2 |
| `ds:comp:toast-001` | Toast *(a11y fixed)* | Success/Error/Info/Warning | 2 |
| `ds:comp:court-dropdown-001` | Court Dropdown | 4 states | 2 |
| `ds:comp:skeleton-001` | Skeleton Loading | 4 patterns | 2 |
| `ds:comp:pagination-001` | Pagination | 4 patterns | 2 |
| `ds:comp:mobile-filter-001` | Mobile Filter | Bottom sheet | 2 |
| `ds:comp:discussion-card-001` | Community Post Card | Text/Image/Loading/Guest | 4 |
| `ds:comp:tag-chip-001` | Tag Chip | 5 system tags, 3 sizes, dismissible | 4 |
| `ds:comp:post-composer-001` | Post Composer | Collapsed/Expanded/Error/Submitting/Guest | 4 |
| `ds:comp:comment-thread-001` | Comment Thread | Default/Empty/Guest + reply | 4 |
| `ds:comp:report-modal-001` | Report Modal *(tái dùng cho Community)* | Reason/Submitting/Success | 5 |

---

## 🗺️ Screens (v1.4.0)

| DS-ID | Screen | PRD Coverage |
|---|---|---|
| `ds:screen:feed-001` | Feed / Tìm kèo | US-01–07 |
| `ds:screen:map-001` | Map / Bản đồ | US-08–11 |
| `ds:screen:reminder-001` | Reminder | US-12–15 |
| `ds:screen:auth-001` | Auth | spec:auth-* |
| `ds:screen:profile-001` | Profile | spec:auth-profile-0001 |
| `ds:screen:feed-states` | Feed States | Empty/Error/Offline/Permission/Onboarding |
| `ds:screen:discussion-001` | Discussion / Thảo luận | Epic 5 (US-20→28) · Phase 2 |
| `ds:screen:coming-soon-001` | Coming Soon | Placeholder — Xếp hạng & Bảng giá (Phase 3) |

---

## 📋 Iteration Log

| Iteration | Ngày | Tóm tắt |
|---|---|---|
| 1 | 24/03/2026 | Foundation: 10 components, 4 screens, 2 layouts, tokens |
| 2 | 24/03/2026 | +7 components, +2 screens, Showcase Hub |
| 3 | 24/03/2026 | QA fixes: tokens.css, base.css, ARIA, docs, naming fix |
| 4 | 24/03/2026 | Community (Phase 2): +4 components (discussion-card, tag-chip, post-composer, comment-thread), +1 screen (discussion), +1 layout |
| 5 | 25/03/2026 | QA Remediation: Structure fixes, Missing States (Cards, Bell, Search), A11y Focus Trap, TS Types |
| 6 | 25/03/2026 | Doc Sync: +1 component (report-modal), +1 screen (coming-soon), fix Community US-ID mapping, bump counts → 21 comps / 8 screens |
| 7 | 25/03/2026 | Dev Handoff: +5 READMEs (navbar, filter-panel, reminder-card, bell, map-marker), livewire-conventions.md, responsive breakpoints in base.css |
| 8 | 25/03/2026 | Dev Handoff: +3 READMEs (court-dropdown, pagination, mobile-filter), +1 screen (not-found/404), map Loading+Error states, screens: 8→9 |
| 9 | 25/03/2026 | Dev Handoff Complete: +5 READMEs (discussion-card, tag-chip, post-composer, comment-thread, report-modal) — **21/21 READMEs done, 100% coverage** |
