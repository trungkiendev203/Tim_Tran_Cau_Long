# Chill Cầu Design System — QA Audit Report

> **Auditor**: AI QA/Design System Auditor  
> **Date**: 24/03/2026  
> **Scope**: `docs/design-system/`

---

## Tổng Kết Nhanh

| Tiêu chí | Rating |
|---|---|
| 1. Cấu trúc thư mục | ⚠️ Cần cải thiện |
| 2. Design Tokens | ⚠️ Cần cải thiện |
| 3. Components | ✅ Tốt |
| 4. State Coverage | ✅ Tốt |
| 5. Documentation | ❌ Thiếu |
| 6. Accessibility | ⚠️ Cần cải thiện |
| 7. Consistency & Scalability | ⚠️ Cần cải thiện |
| 8. Integration với Dev | ❌ Thiếu |

---

## 1. Cấu Trúc Thư Mục — ⚠️ Cần cải thiện

**Tốt:**
- Phân tách rõ `components/`, `screens/`, `showcase/`.
- DS-ID naming convention (`ds:comp:button-001`) nhất quán xuyên suốt.
- Có `TRACKING-STATE-MATRIX.md` — điểm cộng lớn.

**Vấn đề:**

| Vấn đề | Mức độ |
|---|---|
| `design-tokens.json` nằm ở root, không có file CSS variables tương ứng | Medium |
| Không có thư mục `assets/`, `patterns/` | Medium |
| Một số component có `styles.css` riêng, số còn lại nhúng CSS inline — **không nhất quán** | High |
| Không có `README.md` ở root để onboarding | Medium |

**Đề xuất cấu trúc:**
```
docs/design-system/
├── README.md                  ← THIẾU
├── tokens/
│   ├── design-tokens.json
│   └── tokens.css             ← THIẾU (generated CSS vars)
├── components/
├── screens/
├── patterns/                  ← THIẾU
├── assets/                    ← THIẾU
└── showcase/
```

---

## 2. Design Tokens — ⚠️ Cần cải thiện

**Tốt:**
- Coverage đủ 7 loại: `color`, `typography`, `spacing`, `shadow`, `border.radius`, `breakpoint`, `transition`. ✅
- Có semantic layer (`color.semantic.*`) với naming rõ: `bg-page`, `text-primary`, `border-focus`. ✅
- Có `_meta` block với versioning. ✅

**Vấn đề:**

| Vấn đề | Mức độ |
|---|---|
| Token JSON **không được sync thành CSS variables** — mỗi component tự khai báo lại `:root` riêng | **Critical** |
| `color.semantic.color-accent = #16a34a` (green) nhưng showcase gọi `accent` là blue — **naming conflict** | High |
| Không có dark mode / theming layer | Medium |
| `level-badge` tokens dùng hardcode hex thay vì reference `color.primary.*` — duplication | Medium |
| Thiếu token `z-index` (modal, toast, sticky nav đang hardcode số) | Medium |

> ⚠️ **Risk**: `design-tokens.json` hiện là documentation artifact, không phải single source of truth. Không có tooling sync token → CSS. Dev phải copy tay → divergence sẽ xảy ra.

---

## 3. Components — ✅ Tốt

**Tốt:**
- 16 components built, mapping 1-1 với user stories. ✅
- Button: 3 variants × 4 states × 3 sizes. ✅
- Skeleton patterns matching từng component layout. ✅
- `data-ds-id` attribute trên mỗi DOM element — testability tốt. ✅

**Vấn đề:**

| Vấn đề | Mức độ |
|---|---|
| CSS không share được — `.btn` trong `modal/index.html` ≠ `button/styles.css` (padding, font-size khác) | **Critical** |
| `btn--lg` dùng `border-radius: 10px` thay vì token `--radius-lg: 12px` | Medium |
| Reminder Card, Notification Bell thiếu Loading/Error state | Medium |
| Search Bar thiếu states: `results-empty`, `error` | Medium |
| Thiếu `focus-visible` styles nhất quán trên mọi interactive elements | Medium |

---

## 4. State Coverage — ✅ Tốt

**Tốt:**
- `feed-states/index.html` cover đủ 5 states: Empty, Error, Offline, Permission, Onboarding. ✅
- Error state có error code (`Mã lỗi: 500`). ✅
- Permission state có privacy reassurance copy. ✅
- `TRACKING-STATE-MATRIX.md` mapping PRD-ID ↔ DS-ID rõ ràng. ✅

**Vấn đề:**

| Vấn đề | Mức độ |
|---|---|
| Auth screen thiếu: Loading (submit), Success redirect state | Medium |
| Profile screen: Error và Offline chưa được design | Medium |
| Map screen thiếu Permission state ở screen level | Medium |

---

## 5. Documentation — ❌ Thiếu

Đây là **gap lớn nhất** của Design System này.

| Thiếu | Mức độ |
|---|---|
| Không có usage doc — không biết khi nào dùng/không dùng component | **Critical** |
| Không có Do/Don't examples | High |
| Không có prop/API spec cho dev implement React/Flutter | **Critical** |
| Không có CHANGELOG (iteration 1 vs 2 thay đổi gì?) | Medium |
| Showcase hub không có description text dưới mỗi component card | Medium |

**Đề xuất:** Mỗi component cần ít nhất một block comment:
```html
<!--
  ds:comp:button-001 — Button
  Usage: CTA chính (primary), secondary actions, destructive (danger)
  Do NOT: Dùng primary button quá 1 cái trong 1 viewport
  Props: variant, size, disabled, loading, icon
-->
```

---

## 6. Accessibility (a11y) — ⚠️ Cần cải thiện

**Tốt:**
- Contrast primary (#16a34a / white) đạt WCAG AA. ✅
- Form inputs có `<label>` đúng. ✅
- Buttons dùng `<button>` tag. ✅
- `lang="vi"` trên `<html>`. ✅

**Vấn đề:**

| Vấn đề | Mức độ |
|---|---|
| Modal thiếu `role="dialog"`, `aria-modal="true"`, `aria-labelledby` | **High** |
| Modal close button `✕` thiếu `aria-label="Đóng"` | High |
| Toast thiếu `role="alert"` hoặc `aria-live="polite"` | High |
| Skeleton elements thiếu `aria-busy="true"` | Medium |
| Không có focus trap trong modal | High |
| Badge level phân biệt chủ yếu bằng màu — không có fallback cho colorblind | Medium |
| Không có accessibility guideline doc | High |

---

## 7. Consistency & Scalability — ⚠️ Cần cải thiện

**Tốt:**
- DS-ID system là foundation tốt. ✅
- Token layer tập trung values. ✅

**Vấn đề:**

| Vấn đề | Mức độ |
|---|---|
| **CSS duplication nghiêm trọng**: `.btn`, `.form-input`, `.form-label` define ≥ 5 lần khác nhau | **Critical** |
| `auth-form` dùng `btn-block` thay vì `btn btn--primary` — break naming convention | High |
| Modal redefine `.btn` padding `8px 18px` vs button component `10px 20px` | High |
| Showcase nói "17 Components" nhưng tracking matrix list 16 | Low |
| Không có shared base CSS — mỗi component là island | **Critical** |

> ❌ **Scalability Risk**: Kiến trúc hiện tại (HTML island + inline CSS) không scalable. Khi grow lên 30+ components, >50% values sẽ diverge.

---

## 8. Integration với Dev — ❌ Thiếu

| Thiếu | Mức độ |
|---|---|
| Không có mapping sang React/Flutter components | **Critical** |
| Không có Token Transformer (Style Dictionary...) sync JSON → CSS/JS | High |
| Không có Figma file reference | Medium |
| Không có CHANGELOG tracking breaking changes | Medium |
| Không có TypeScript types cho tokens | Medium |
| Không có responsive behavior spec per component | Medium |

---

## 🚨 Top 3 Technical Risks

### Risk #1 — CSS Architecture (Critical)
Không có shared CSS. Mỗi component copy-paste styles → drift tăng dần khi scale.  
**Fix**: Tạo `tokens/tokens.css` + `base/base.css` shared, import vào mọi component.

### Risk #2 — Token Sync Gap (High)
`design-tokens.json` là dead-end artifact. Dev sẽ hardcode values thay vì dùng token.  
**Fix**: Setup Style Dictionary hoặc ít nhất generate `tokens.css` manual từ JSON.

### Risk #3 — Doc Gap = Dev Handoff Failure (High)
Không usage guidelines, không prop specs. Developer sẽ guess thay vì follow DS.  
**Fix**: Mỗi component cần README với: when to use, props, states, a11y notes.

---

## Actionable Roadmap — Iteration 3

| Priority | Action | Effort |
|---|---|---|
| P0 | Tạo `tokens/tokens.css` từ `design-tokens.json`, import vào tất cả components | 1 ngày |
| P0 | Tạo `base/base.css` chứa `.btn`, `.form-input`, `.card` base classes | 1 ngày |
| P1 | Thêm ARIA attributes vào modal, toast, skeleton | 0.5 ngày |
| P1 | Tạo README cho 5 core components (button, modal, form, card, toast) | 1 ngày |
| P2 | Resolve `color-accent` naming conflict trong tokens | 2h |
| P2 | Add Loading + Error state cho Auth, Profile screens | 1 ngày |
| P3 | Add `CHANGELOG.md` để track iterations | 2h |
