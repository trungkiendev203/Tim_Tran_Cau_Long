# ds:comp:skeleton-001 — Skeleton Loading Patterns

## DS-ID
`ds:comp:skeleton-001`

## Mô tả
Skeleton là placeholder animation hiển thị khi nội dung async đang load.
Skeleton replicate chính xác layout của component thật để tránh layout shift.

## When to Use / Do Not Use

| ✅ When to use | ❌ Do NOT use |
|---|---|
| Content đang được fetch từ API | Đã biết content, chỉ cần show/hide |
| Layout đã biết trước (card, navbar, filter) | Component đơn giản — dùng spinner |
| First meaningful paint chưa ready | Form input loading — dùng `aria-busy` trên form |

## Class Reference

| Class | Mô tả | Defined in |
|---|---|---|
| `.skeleton` | Base shimmer animation (rounded rect) | `base/base.css` |
| `.skeleton--circle` | Border-radius: 50% (avatar, icon) | `base/base.css` |
| `.skeleton--pill` | Border-radius: 9999px (badge, tag) | `base/base.css` |

## Layout Variants

| Variant | DS-ID | Mô tả |
|---|---|---|
| Navbar | `ds:comp:skeleton-001--navbar` | Logo + links + avatar |
| Post Card | `ds:comp:skeleton-001--post-card` | Header + body + badges + actions |
| Filter Panel | `ds:comp:skeleton-001--filter` | Labels + inputs + button groups |
| Reminder Card | `ds:comp:skeleton-001--reminder` | Header + toggle + tags |

## A11y Pattern

> ⚠️ **Required**: Every skeleton container MUST have:
> 1. `aria-busy="true"` — tells screen reader content is loading
> 2. `aria-label="Đang tải [tên component]"` — describes what is loading

```html
<!-- ✅ Correct -->
<div class="sk-card"
     aria-busy="true"
     aria-label="Đang tải bài đăng">
  <div class="skeleton" style="width:120px;height:16px;"></div>
  <div class="skeleton skeleton--circle" style="width:32px;height:32px;"></div>
  <div class="skeleton skeleton--pill" style="width:60px;height:22px;"></div>
</div>

<!-- ❌ Incorrect — missing a11y -->
<div class="sk-card">
  <div class="skeleton" style="width:120px;height:16px;"></div>
</div>
```

## Usage with Inline Styles

Skeleton elements use `style="width:Xpx;height:Ypx;"` to match the exact layout dimensions of the real component content. This is intentional — skeleton widths are content-dependent, not design-token-dependent.
