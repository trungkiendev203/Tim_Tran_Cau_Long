# ds:comp:filter-panel-001 — Smart Filter Panel

## Overview

Sidebar bộ lọc cho Feed và Map. Gồm 9 bộ lọc theo chuẩn `spec:feed-filter-0001`. Tất cả bộ lọc hoạt động AND — kết quả cập nhật realtime, không cần nhấn Search.

---

## States

| DS-ID | State | Mô tả |
|---|---|---|
| `ds:comp:filter-panel-001--default` | **Default** | Không có bộ lọc nào active |
| `ds:comp:filter-panel-001--active` | **Active** | Một hoặc nhiều bộ lọc đang bật — hiện badge count |

---

## CSS Classes

| Class | Mô tả |
|---|---|
| `.filter-panel` | Container card trắng |
| `.filter-panel__header` | Header với title + nút "Xóa tất cả" |
| `.filter-panel__clear` | Button "Xóa tất cả" — màu đỏ |
| `.filter-panel__count` | Đếm số bộ lọc đang bật |
| `.filter-group` | Wrapper cho 1 bộ lọc |
| `.filter-group__label` | Label của bộ lọc |
| `.filter-input` | Text input (tìm kiếm nhanh) |
| `.filter-date` | Date picker |
| `.filter-time` | Time picker (dùng trong time range) |
| `.filter-time-range` | Wrapper 2 time picker |
| `.filter-select` | Native `<select>` với custom arrow |
| `.filter-btns` | Flex container của các toggle buttons |
| `.filter-btn` | Toggle button đơn |
| `.filter-btn--active` | Trạng thái đang chọn — nền xanh nhạt |

---

## 9 Bộ lọc

| DS-ID | Bộ lọc | UI Type | Spec-ID |
|---|---|---|---|
| `filter-panel-001--search` | Tìm kiếm nhanh | text input | `spec:feed-filter-text-0001` |
| `filter-panel-001--date` | Ngày chơi | date picker | `spec:feed-filter-date-0001` |
| `filter-panel-001--time` | Khung giờ | time range | `spec:feed-filter-time-0001` |
| `filter-panel-001--level` | Trình độ | multi-select buttons (10 levels) | `spec:feed-filter-level-0001` |
| `filter-panel-001--slots` | Số slot | buttons (Tất cả/1–2/3–4/5+) | `spec:feed-filter-slots-0001` |
| `filter-panel-001--distance` | Khoảng cách | select | `spec:feed-filter-distance-0001` |
| `filter-panel-001--gender` | Đối tượng | select | `spec:feed-filter-gender-0001` |
| `filter-panel-001--type` | Hình thức | buttons (3 options) | `spec:feed-filter-type-0001` |
| `filter-panel-001--court` | Lọc theo sân | searchable dropdown → `ds:comp:court-dropdown-001` | `spec:feed-filter-court-0001` |

---

## Livewire Integration

```php
// app/Http/Livewire/FeedFilter.php
public string $search = '';
public string $date = '';
public string $timeFrom = '00:00';
public string $timeTo = '23:59';
public array $levels = [];      // multi-select
public string $slots = '';      // 'all' | '1-2' | '3-4' | '5+'
public string $distance = '';   // '1' | '3' | '5' | '10'
public string $gender = 'mixed'; // 'male' | 'female' | 'mixed'
public string $playType = '';   // 'giao_luu' | 'doi_khang' | 'tap_luyen'
public ?int   $courtId = null;

// Reactive — tự động emit khi bất kỳ prop nào thay đổi
public function updated(): void
{
    $this->dispatch('filters-updated', $this->getFilters());
}
```

```html
<!-- Blade: toggle button với Livewire -->
<button
  class="filter-btn {{ in_array('TB', $levels) ? 'filter-btn--active' : '' }}"
  wire:click="$toggle('levels', 'TB')"
  aria-pressed="{{ in_array('TB', $levels) ? 'true' : 'false' }}"
>TB</button>

<!-- Text input: debounce 400ms để tránh spam query -->
<input class="filter-input" type="text"
  wire:model.debounce.400ms="search"
  placeholder="Tên sân, khu vực, quận..." />

<!-- Xóa tất cả -->
<button class="filter-panel__clear" wire:click="resetAll">Xóa tất cả</button>
```

---

## HTML Pattern (Trình độ — Multi-select)

```html
<div class="filter-group">
  <span class="filter-group__label">🎯 Trình độ</span>
  <div class="filter-btns" role="group" aria-label="Chọn trình độ">
    @foreach(['Y','Y+','TBY','TBY+','TB-','TB','TB+','TB++','Khá','Giỏi'] as $level)
    <button
      class="filter-btn {{ in_array($level, $levels) ? 'filter-btn--active' : '' }}"
      wire:click="toggleLevel('{{ $level }}')"
      aria-pressed="{{ in_array($level, $levels) ? 'true' : 'false' }}"
    >{{ $level }}</button>
    @endforeach
  </div>
</div>
```

---

## Responsive

| Breakpoint | Behavior |
|---|---|
| `>= 768px` | Hiện sidebar bên trái (width `280–320px`) |
| `< 768px` | Ẩn — thay bằng `ds:comp:mobile-filter-001` (bottom sheet) |

---

## Accessibility

- Button groups: `role="group"` + `aria-label` trên container
- Toggle buttons: `aria-pressed="true/false"` theo trạng thái
- "Xóa tất cả": không cần aria thêm — text đủ rõ
- Label dùng `<span>` thay `<label>` vì không map với 1 input cụ thể
