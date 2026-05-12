# ds:comp:mobile-filter-001 — Mobile Filter Bottom Sheet

## Overview

Bottom sheet chứa toàn bộ bộ lọc dành cho màn hình mobile (`< 768px`). Thay thế `ds:comp:filter-panel-001` trên mobile — cùng logic lọc, khác UI.

---

## States

| DS-ID | State | Mô tả |
|---|---|---|
| `ds:comp:mobile-filter-001` | **Open** | Full bottom sheet (duy nhất 1 state) |

Trigger: nút "Bộ lọc" trên mobile feed header → mở sheet. Đóng: nút "Đóng" hoặc tap backdrop.

---

## CSS Classes

| Class | Mô tả |
|---|---|
| `.backdrop` | `position: fixed; inset: 0` — semi-transparent |
| `.bottom-sheet` | Container sheet: `border-radius: 20px 20px 0 0`, `max-height: 85vh` |
| `.bottom-sheet__handle` | Drag handle bar ở đầu sheet |
| `.bottom-sheet__bar` | Thanh xám `36×4px` |
| `.bottom-sheet__header` | Title + "Xóa tất cả" |
| `.bottom-sheet__title` | "🔍 Bộ lọc" |
| `.bottom-sheet__clear` | Nút xóa filter — màu đỏ |
| `.bottom-sheet__body` | Scroll area chứa filter groups |
| `.bottom-sheet__footer` | Sticky footer: "Đóng" + "Áp dụng (X kết quả)" |
| `.active-count` | Text đếm bộ lọc đang bật |
| `.filter-group`, `.filter-btns`, `.filter-btn`, `.filter-btn--active` | Giống `filter-panel-001` |

---

## Animation

```css
/* Slide up khi mở */
@keyframes slideUp {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
.bottom-sheet { animation: slideUp 300ms ease; }
```

---

## Alpine.js + Livewire Pattern

```html
{{-- Trigger button — chỉ hiện trên mobile --}}
<button class="btn btn--secondary"
  @click="$dispatch('open-mobile-filter')"
  x-show="window.innerWidth < 768">
  🔍 Bộ lọc <span x-text="filterCount > 0 ? '(' + filterCount + ')' : ''"></span>
</button>

{{-- Bottom sheet --}}
<div x-data="{ open: false }"
     @open-mobile-filter.window="open = true"
     @keydown.escape.window="open = false">

  <div class="backdrop" x-show="open" @click="open = false"
       x-transition:enter="transition ease-out duration-200"
       x-transition:enter-start="opacity-0"
       x-transition:enter-end="opacity-100"
       style="display:none;"></div>

  <div class="bottom-sheet" x-show="open"
       x-transition:enter="transition ease-out duration-300"
       x-transition:enter-start="transform translate-y-full"
       x-transition:enter-end="transform translate-y-0"
       style="display:none;"
       role="dialog" aria-modal="true" aria-label="Bộ lọc">

    <div class="bottom-sheet__handle">
      <div class="bottom-sheet__bar"></div>
    </div>
    <div class="bottom-sheet__header">
      <h2 class="bottom-sheet__title">🔍 Bộ lọc</h2>
      <button class="bottom-sheet__clear"
        wire:click="resetAll" @click="open = false">Xóa tất cả</button>
    </div>

    {{-- Dùng cùng filter groups với filter-panel-001 --}}
    <div class="bottom-sheet__body">
      @include('partials.filter-groups')
    </div>

    <div class="bottom-sheet__footer">
      <button class="btn btn--secondary" @click="open = false">Đóng</button>
      <button class="btn btn--primary"
        @click="open = false"
        wire:click="applyFilter">
        Áp dụng ({{ $resultCount }} kết quả)
      </button>
    </div>
  </div>
</div>
```

---

## Responsive Rule

```css
/* base.css — đã có sẵn */
@media (max-width: 767px) {
  .filter-panel { display: none; }         /* ← ẩn sidebar */
}
/* Mobile filter trigger chỉ hiện ở < 768px (Alpine x-show) */
```

---

## Accessibility

- `.bottom-sheet`: `role="dialog"`, `aria-modal="true"`, `aria-label="Bộ lọc"`
- Backdrop click đóng sheet
- Escape key đóng sheet
- Focus trap cần thêm `x-trap="open"` (Alpine Focus plugin)
