# ds:comp:court-dropdown-001 — Searchable Court Dropdown

## Overview

Dropdown có tìm kiếm realtime để chọn sân cầu lông. Dùng trong `ds:comp:filter-panel-001` (bộ lọc "Lọc theo sân") và trong form tạo lịch nhắc.

---

## States

| DS-ID | State | Mô tả |
|---|---|---|
| `ds:comp:court-dropdown-001--closed` | **Closed** | Chưa chọn — hiện placeholder |
| `ds:comp:court-dropdown-001--open` | **Open** | Đang mở + search box |
| `ds:comp:court-dropdown-001--selected` | **Selected** | Đã chọn — hiện tên sân + chip xóa |
| `ds:comp:court-dropdown-001--empty` | **No Results** | Search không có kết quả |

---

## CSS Classes

| Class | Mô tả |
|---|---|
| `.dropdown` | Wrapper `position: relative` |
| `.dropdown--open` | Modifier — mở panel, xoay arrow |
| `.dropdown__trigger` | Trigger button (full width) |
| `.dropdown__placeholder` | Text màu muted khi chưa chọn |
| `.dropdown__value` | Text màu đậm khi đã chọn |
| `.dropdown__arrow` | `▼` icon — xoay 180° khi open |
| `.dropdown__panel` | Panel dropdown — `position: absolute` |
| `.dropdown__search-wrap` | Wrapper input tìm kiếm |
| `.dropdown__search` | Input tìm kiếm trong panel |
| `.dropdown__list` | Danh sách sân (`max-height: 200px`, scroll) |
| `.dropdown__item` | Row 1 sân |
| `.dropdown__item--active` | Đang chọn — nền xanh + checkmark |
| `.dropdown__item-name` | Tên sân với highlight search term |
| `.dropdown__item-district` | Quận/huyện màu muted |
| `.dropdown__item-check` | `✓` checkmark — chỉ hiện với `--active` |
| `.dropdown__empty` | Empty state "Không tìm thấy sân nào" |
| `.dropdown__selected` | Chip màu xanh hiện bên dưới trigger |
| `.dropdown__selected-remove` | `✕` button xóa selection |

---

## Alpine.js Pattern

```html
<div class="dropdown" x-data="{
    open: false,
    search: '',
    selected: null,
    courts: {{ json_encode($courts) }},
    get filtered() {
        if (!this.search) return this.courts;
        return this.courts.filter(c =>
            c.name.toLowerCase().includes(this.search.toLowerCase())
        );
    }
}" @click.outside="open = false">

  <button class="dropdown__trigger"
    :class="{ 'dropdown--open': open }"
    @click="open = !open"
    type="button"
    :aria-expanded="open.toString()"
    aria-haspopup="listbox">
      <span :class="selected ? 'dropdown__value' : 'dropdown__placeholder'">
        <span x-text="selected ? '🏸 ' + selected.name : 'Chọn sân cầu lông...'"></span>
      </span>
      <span class="dropdown__arrow">▼</span>
  </button>

  <div class="dropdown__panel" x-show="open" x-transition style="display:none;"
       role="listbox" aria-label="Danh sách sân">
    <div class="dropdown__search-wrap">
      <input class="dropdown__search" type="text"
        x-model="search" x-ref="searchInput"
        x-init="$watch('open', v => v && $nextTick(() => $refs.searchInput.focus()))"
        placeholder="Tìm tên sân..." />
    </div>
    <div class="dropdown__list">
      <template x-for="court in filtered" :key="court.id">
        <div class="dropdown__item"
          :class="{ 'dropdown__item--active': selected?.id === court.id }"
          @click="selected = court; open = false; search = ''"
          role="option"
          :aria-selected="(selected?.id === court.id).toString()">
          <span class="dropdown__item-name" x-text="'🏸 ' + court.name"></span>
          <span class="dropdown__item-district" x-text="court.district"></span>
          <span class="dropdown__item-check" x-show="selected?.id === court.id">✓</span>
        </div>
      </template>
      <div class="dropdown__empty" x-show="filtered.length === 0">
        😕 Không tìm thấy sân nào
      </div>
    </div>
  </div>

  <div class="dropdown__selected" x-show="selected" style="display:none;">
    <span x-text="selected?.name"></span>
    <button class="dropdown__selected-remove"
      @click="selected = null"
      aria-label="Xóa lựa chọn">✕</button>
  </div>

  {{-- Gửi courtId về Livewire --}}
  <input type="hidden" :value="selected?.id" wire:model="courtId" />
</div>
```

---

## Accessibility

- Trigger: `aria-haspopup="listbox"`, `aria-expanded`
- Panel: `role="listbox"`, `aria-label`
- Items: `role="option"`, `aria-selected`
- Search input: auto-focus khi mở dropdown
- Xóa button: `aria-label="Xóa lựa chọn"`
