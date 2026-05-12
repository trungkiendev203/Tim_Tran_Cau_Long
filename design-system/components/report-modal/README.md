# ds:comp:report-modal-001 — Report Modal

## Overview

Modal báo cáo vi phạm người dùng. Trigger từ button "•••" → "Báo cáo" trong `ds:comp:discussion-card-001`.

> **Phase**: 1 (Profile) + 2 (Community) | **Implements**: US-18, US-28

---

## States

| DS-ID | State | Mô tả |
|---|---|---|
| `ds:comp:report-modal-001--reason` | **Reason Selection** | User chọn lý do báo cáo |
| `ds:comp:report-modal-001--submitting` | **Submitting** | Loading khi gửi |
| `ds:comp:report-modal-001--success` | **Success** | Xác nhận đã gửi |

---

## CSS Classes

| Class | Mô tả |
|---|---|
| `.modal-overlay` | `position:fixed; inset:0` — backdrop |
| `.report-modal` | Container `max-width:480px` + `modal-pop` animation |
| `.report-modal__header` | Row title + close button |
| `.report-modal__title` | "🚨 Báo cáo vi phạm" |
| `.report-modal__close` | Button × |
| `.report-modal__body` | Scroll area — form |
| `.report-modal__desc` | Context text "@username" |
| `.report-reason-grid` | Flex column danh sách lý do |
| `.radio-card` | Custom radio label — card style |
| `.radio-card:has(input:checked)` | Card active — xanh primary |
| `.radio-card__title` | Tiêu đề lý do |
| `.radio-card__desc` | Mô tả lý do |
| `.report-modal__footer` | Row buttons — Hủy + Gửi |

---

## Reasons (3 predefined)

| Value | Tiêu đề | 
|---|---|
| `spam` | Spam / Quảng cáo |
| `fake_level` | Khai man trình độ |
| `scam` | Lừa đảo / Quỵt tiền sân |

---

## Livewire + Alpine Pattern

```html
{{-- Trigger từ DiscussionCard --}}
<button wire:click="$dispatch('open-report', { userId: {{ $user->id }} })"
  aria-haspopup="dialog">
  🚨 Báo cáo
</button>

{{-- Modal — trong layout --}}
<div x-data="{ open: false, userId: null }"
     @open-report.window="open = true; userId = $event.detail.userId"
     @keydown.escape.window="open = false">

  <div class="modal-overlay" x-show="open" @click.self="open = false"
       style="display:none;" x-transition>
    <div class="report-modal" role="dialog" aria-modal="true" aria-labelledby="report-title"
         x-trap="open">

      <div class="report-modal__header">
        <h2 id="report-title" class="report-modal__title">
          <span style="color:var(--color-danger-500)">🚨</span> Báo cáo vi phạm
        </h2>
        <button class="report-modal__close" @click="open = false" aria-label="Đóng hộp thoại">×</button>
      </div>

      <div class="report-modal__body">
        <livewire:report-form :key="userId" :target-user-id="userId" />
      </div>

      <div class="report-modal__footer">
        <button class="btn btn--secondary" @click="open = false">Hủy bỏ</button>
        <button class="btn btn--danger" wire:click="submitReport" wire:loading.attr="disabled">
          <span wire:loading.remove>Gửi Báo Cáo</span>
          <span wire:loading><span class="spinner"></span></span>
        </button>
      </div>
    </div>
  </div>
</div>
```

---

## Success State

```html
{{-- Thay body sau khi gửi thành công --}}
<div style="text-align:center;padding:32px;">
  <div style="font-size:48px;margin-bottom:12px;">✅</div>
  <h3 style="font-weight:700;margin-bottom:8px;">Đã gửi báo cáo</h3>
  <p style="color:var(--sm-text-secondary);font-size:14px;margin-bottom:20px;">
    Cảm ơn bạn! Quản trị viên sẽ xem xét trong 24 giờ.
  </p>
  <button class="btn btn--primary" @click="open = false">Đóng</button>
</div>
```

---

## Accessibility

- `role="dialog"`, `aria-modal="true"`, `aria-labelledby="report-title"`
- Close button: `aria-label="Đóng hộp thoại"`
- Focus trap: `x-trap="open"` (Alpine Focus plugin)
- ESC key: đóng modal
- Radio cards: dùng native `<input type="radio">` trong `<label>` — hoạt động keyboard đầy đủ
