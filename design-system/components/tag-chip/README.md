# ds:comp:tag-chip-001 — Community Tag Chip

## Overview

Chip tag dùng trong Community (Phase 2). Có 5 system tags cố định, 3 kích thước, và 2 chế độ: filter (sidebar) và dismissible (post composer).

> **Phase**: 2 | **Implements**: US-25

---

## 5 System Tags

| DS-ID | Tag | Class | Màu nền | Màu chữ |
|---|---|---|---|---|
| `ds:comp:tag-chip-001--review` | `#review-sân` | `.tag-chip--review` | Vàng `#fef3c7` | Nâu `#92400e` |
| `ds:comp:tag-chip-001--hoidap` | `#hỏi-đáp` | `.tag-chip--hoidap` | Tím nhạt `#ede9fe` | Tím `#5b21b6` |
| `ds:comp:tag-chip-001--timdoi` | `#tìm-đôi` | `.tag-chip--timdoi` | Xanh lá nhạt `#dcfce7` | Xanh `#166534` |
| `ds:comp:tag-chip-001--meo` | `#mẹo-kỹ-thuật` | `.tag-chip--meo` | Xanh dương nhạt `#dbeafe` | Navy `#1e40af` |
| `ds:comp:tag-chip-001--chungvui` | `#chung-vui` | `.tag-chip--chungvui` | Hồng `#fce7f3` | Đỏ hồng `#9d174d` |

**Active state**: class `is-active` → filled solid màu tương ứng, chữ trắng.

---

## Sizes

| Class | Font | Padding | Dùng trong |
|---|---|---|---|
| `.tag-chip--sm` | `10px` | `2px 8px` | discussion-card tags (inline) |
| `.tag-chip--md` | `12px` | `4px 12px` | Filter sidebar, post composer |
| `.tag-chip--lg` | `13px` | `6px 14px` | Discussion page header filter |

---

## CSS Classes

| Class | Mô tả |
|---|---|
| `.tag-chip` | Base styles (cursor, transition, border-radius-full) |
| `.tag-chip--{variant}` | Color theme |
| `.tag-chip--sm/md/lg` | Size |
| `.is-active` | Active/selected state — filled |
| `.tag-chip--dismissible` | Có nút ✕ xóa tag |
| `.tag-chip__dismiss` | Nút ✕ bên trong chip |
| `.tag-chip__count` | Badge count số bài (dùng sidebar) |
| `.tag-chip--ghost` | Chip unselected trong sidebar — nền trắng |

---

## Usage Patterns

### In Discussion Card (read-only)
```html
{{-- Aria: dùng <span> không phải <button> khi không click-able --}}
<span class="tag-chip tag-chip--sm tag-chip--{{ $post->tag->slug }}">
  #{{ $post->tag->name }}
</span>
```

### Sidebar Filter (clickable toggle)
```html
<button class="tag-chip tag-chip--md tag-chip--{{ $tag->slug }} {{ $selectedTag === $tag->slug ? 'is-active' : '' }}"
  wire:click="filterByTag('{{ $tag->slug }}')"
  aria-pressed="{{ $selectedTag === $tag->slug ? 'true' : 'false' }}">
  #{{ $tag->name }}
  <span class="tag-chip__count">{{ $tag->posts_count }}</span>
</button>
```

### Post Composer (dismissible)
```html
<button class="tag-chip tag-chip--md tag-chip--{{ $tag }} is-active tag-chip--dismissible"
  x-data type="button">
  #{{ $tag }}
  <button class="tag-chip__dismiss"
    @click.stop="$wire.removeTag('{{ $tag }}')"
    aria-label="Bỏ tag {{ $tag }}">✕</button>
</button>
```

---

## Accessibility

- Filter chips: `aria-pressed="true/false"`
- Read-only: dùng `<span>` thay `<button>`
- Dismiss button: `aria-label="Bỏ tag [tên]"`
- Tất cả chips trong group filter: bao bởi `role="group"` + `aria-label="Lọc theo chủ đề"`
