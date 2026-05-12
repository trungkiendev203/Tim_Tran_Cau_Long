# ds:comp:pagination-001 — Pagination / Load More

## Overview

Hỗ trợ 2 pattern phân trang: **Load More** (infinite scroll style cho Feed/Reminder) và **Numbered pagination** (dự phòng). Feed mặc định dùng Load More + progress bar.

---

## States / Variants

| DS-ID | Variant | Mô tả |
|---|---|---|
| `ds:comp:pagination-001--load-more` | **Load More** | Button "Xem thêm" + progress bar |
| `ds:comp:pagination-001--loading` | **Loading** | Spinner trong button khi đang fetch |
| `ds:comp:pagination-001--numbered` | **Numbered** | Prev/số trang/Next |
| `ds:comp:pagination-001--end` | **End of List** | "Đã xem hết kèo" + 100% progress |

---

## CSS Classes

| Class | Mô tả |
|---|---|
| `.load-more` | Container flex column |
| `.load-more__info` | Text đếm `X / Y kèo` |
| `.load-more__btn` | Button xanh primary |
| `.progress-info` | Wrapper text + bar |
| `.progress-info__text` | "Đang hiển thị X / Y kèo" |
| `.progress-bar` | Track thanh tiến trình |
| `.progress-bar__fill` | Fill – `width` theo % |
| `.pagination` | Flex container số trang |
| `.pagination__btn` | Page number button |
| `.pagination__btn--active` | Trang hiện tại — nền xanh |
| `.pagination__btn--disabled` | Prev/Next không dùng được |
| `.pagination__dots` | `…` ngăn cách |
| `.end-of-list` | Text + đường kẻ hai bên |

---

## Livewire Pattern (Load More)

```php
// Livewire component
public int $perPage = 20;

public function loadMore(): void
{
    $this->perPage += 20;
}

public function getPosts(): LengthAwarePaginator
{
    return Post::with('court')
        ->applyFilters($this->filters)
        ->paginate($this->perPage);
}
```

```html
{{-- Blade --}}
@if($posts->hasMorePages())
<div class="load-more">
  <div class="progress-info">
    <div class="progress-info__text">
      Đang hiển thị {{ $posts->count() }} / {{ $posts->total() }} kèo
    </div>
    <div class="progress-bar">
      <div class="progress-bar__fill"
           style="width: {{ round($posts->count() / $posts->total() * 100) }}%">
      </div>
    </div>
  </div>
  <button class="load-more__btn"
    wire:click="loadMore"
    wire:loading.attr="disabled"
    wire:target="loadMore">
    <span wire:loading.remove wire:target="loadMore">Xem thêm kèo ↓</span>
    <span wire:loading wire:target="loadMore">
      <span class="spinner"></span> Đang tải...
    </span>
  </button>
</div>
@else
<div class="end-of-list" role="status">🏸 Đã xem hết kèo</div>
@endif
```

---

## Notes

- **Feed & Reminder** dùng Load More (UX tốt hơn cho mobile)
- **Community Discussion** có thể dùng Numbered (cursor-based pagination) theo `spec-community.md`
- Progress bar width = `(đã hiển thị / tổng) × 100%`
