# ds:comp:reminder-card-001 — Reminder Card

## Overview

Card hiển thị một lịch nhắc (smart reminder). Gồm toggle bật/tắt, thông tin lịch (ngày/giờ/trình độ), và số kèo phù hợp hôm nay.

---

## States

| DS-ID | State | Mô tả |
|---|---|---|
| `ds:comp:reminder-card-001--active` | **Active** | Lịch đang bật — full opacity |
| `ds:comp:reminder-card-001--inactive` | **Inactive** | Lịch đang tắt — `opacity: 0.55`, không hiện match count |
| `ds:comp:reminder-card-001--loading` | **Loading** | Skeleton với `aria-busy="true"` |
| `ds:comp:reminder-card-001--error` | **Error** | Không load được — nền đỏ nhạt + nút "Thử lại" |

---

## CSS Classes

| Class | Mô tả |
|---|---|
| `.reminder-card` | Container card |
| `.reminder-card--inactive` | Modifier — giảm opacity xuống 0.55 |
| `.reminder-card__header` | Row: name + toggle |
| `.reminder-card__name` | Tên lịch nhắc |
| `.reminder-card__details` | Row các chip thông tin (ngày, giờ) |
| `.reminder-card__detail` | Chip thông tin đơn |
| `.reminder-card__badges` | Row badge trình độ |
| `.reminder-card__match` | Text "X kèo phù hợp hôm nay" |
| `.reminder-card__actions` | Row buttons (Sửa / Xóa) |
| `.reminder-card__action--edit` | Nút sửa — nền xám |
| `.reminder-card__action--delete` | Nút xóa — nền đỏ nhạt |
| `.toggle` | Custom checkbox toggle |
| `.toggle__track` | Track nền của toggle |
| `.toggle__thumb` | Nút tròn trượt |

---

## Props / Data

| Prop | Type | Mô tả |
|---|---|---|
| `$reminder->name` | string | Tên lịch |
| `$reminder->days` | array | VD: `['T2','T4','T6']` |
| `$reminder->time_from` | string | HH:MM |
| `$reminder->time_to` | string | HH:MM |
| `$reminder->levels` | array | VD: `['TB','TB+']` |
| `$reminder->is_active` | bool | Toggle state |
| `$matchCount` | int | Số kèo phù hợp hôm nay (computed) |

---

## HTML Pattern (Blade)

```html
<div class="reminder-card {{ !$reminder->is_active ? 'reminder-card--inactive' : '' }}"
     data-ds-id="ds:comp:reminder-card-001--{{ $reminder->is_active ? 'active' : 'inactive' }}">

  <div class="reminder-card__header">
    <span class="reminder-card__name">
      <span class="reminder-card__name-icon">📅</span>
      {{ $reminder->name }}
    </span>
    <label class="toggle" aria-label="Bật/tắt lịch {{ $reminder->name }}">
      <input type="checkbox"
        {{ $reminder->is_active ? 'checked' : '' }}
        wire:click="toggleReminder({{ $reminder->id }})" />
      <span class="toggle__track"></span>
      <span class="toggle__thumb"></span>
    </label>
  </div>

  <div class="reminder-card__details">
    <span class="reminder-card__detail">📆 {{ implode(', ', $reminder->days) }}</span>
    <span class="reminder-card__detail">⏰ {{ $reminder->time_from }} – {{ $reminder->time_to }}</span>
  </div>

  <div class="reminder-card__badges">
    @foreach($reminder->levels as $level)
      {{-- Dùng ds:comp:badge-level-001 --}}
      <x-badge-level :level="$level" size="sm" />
    @endforeach
  </div>

  @if($reminder->is_active && $matchCount > 0)
    <div class="reminder-card__match">✅ {{ $matchCount }} kèo phù hợp hôm nay</div>
  @endif

  <div class="reminder-card__actions">
    <button class="reminder-card__action reminder-card__action--edit"
      wire:click="editReminder({{ $reminder->id }})">✏️ Sửa</button>
    <button class="reminder-card__action reminder-card__action--delete"
      wire:click="deleteReminder({{ $reminder->id }})"
      wire:confirm="Xóa lịch nhắc này?">🗑️ Xóa</button>
  </div>
</div>
```

---

## Livewire Events

| Action | Method | Notes |
|---|---|---|
| Toggle on/off | `toggleReminder($id)` | Flip `is_active`, dispatch `reminder-updated` |
| Edit | `editReminder($id)` | Mở `ds:comp:modal-001` form edit |
| Delete | `deleteReminder($id)` | `wire:confirm` trước, sau đó soft delete |

---

## Accessibility

- Toggle label: `aria-label="Bật/tắt lịch [tên]"` — dùng `<label>` bao quanh checkbox
- Error state: `role="alert"` trên container error
- Loading state: `aria-busy="true"` + `aria-label="Đang tải lịch nhắc"` trên container
- Nút Xóa: có `wire:confirm` — hiện browser native confirm trước khi xóa
