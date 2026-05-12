# ds:comp:modal-001 — Modal / Dialog

## Usage

Dùng Modal cho những hành động blocking yêu cầu user phản hồi trước khi tiếp tục.

| Variant | Khi nào dùng |
|---|---|
| `confirm` | Xác nhận destructive action (xóa, huỷ) |
| `form` | Form nhập liệu phức tạp (tạo lịch nhắc) |
| `share` | Chia sẻ kèo với link/platform options |

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Dùng Modal cho blocking decisions | Dùng Modal cho thông báo không cần action → dùng Toast |
| Có nút "Hủy" rõ ràng | Chỉ có 1 nút (user bị trapped) |
| Focus vào modal khi mở | Để focus ở background khi modal open |
| Close khi bấm overlay hoặc Esc | Không cho close = bad UX |

## Props (HTML → Livewire)

| Prop | Type | Default | Mô tả |
|---|---|---|---|
| `open` | boolean | false | Show/hide modal |
| `variant` | `confirm \| form \| share` | `confirm` | Loại dialog |
| `title` | string | — | Tiêu đề (dùng cho `aria-labelledby`) |
| `size` | `sm \| md \| lg` | `md` | Max-width của modal |

## A11y Requirements (CRITICAL)

```html
<div role="dialog"
     aria-modal="true"
     aria-labelledby="modal-title-id">

  <h2 id="modal-title-id">Tiêu đề modal</h2>

  <!-- Close button PHẢI có aria-label -->
  <button aria-label="Đóng hộp thoại">✕</button>
</div>
```

**JavaScript cần implement:**
- Focus trap: khi modal open, Tab chỉ di chuyển trong modal
- Restore focus: khi modal close, focus return về trigger element
- Esc key: close modal

## HTML Pattern

```html
<div class="modal-overlay" role="presentation">
  <div class="modal"
       role="dialog"
       aria-modal="true"
       aria-labelledby="modal-confirm-title">
    <div class="modal__header">
      <span id="modal-confirm-title" class="modal__title">⚠️ Xóa lịch nhắc</span>
      <button class="modal__close" aria-label="Đóng hộp thoại">✕</button>
    </div>
    <div class="modal__body">
      <p class="modal__text">Nội dung confirm...</p>
    </div>
    <div class="modal__footer">
      <button class="btn btn--secondary">Hủy</button>
      <button class="btn btn--danger">Xóa</button>
    </div>
  </div>
</div>
```
