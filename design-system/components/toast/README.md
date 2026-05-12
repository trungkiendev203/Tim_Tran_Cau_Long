# ds:comp:toast-001 — Toast Notification

## Usage

Dùng Toast cho feedback không blocking sau hành động của user.

| Variant | Khi nào dùng | ARIA role |
|---|---|---|
| `success` | Hành động thành công | `role="status"` (polite) |
| `error` | Lỗi system / network | `role="alert"` (assertive) |
| `info` | Thông tin neutral | `role="status"` (polite) |
| `warning` | Cảnh báo cần chú ý | `role="alert"` (assertive) |

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Tối đa 1-2 toast cùng lúc | Stack 5+ toasts |
| Auto-dismiss sau 5s (success/info) | Auto-dismiss error/warning (user cần đọc) |
| Cung cấp action nếu có thể follow-up | Toast không có cách tắt |
| Đặt ở góc màn hình (top-right hoặc bottom-center) | Chặn content quan trọng |

## A11y Requirements

```html
<!-- Success / Info → role="status" (không interrupt) -->
<div class="toast toast--success" role="status" aria-live="polite">
  <span aria-hidden="true">✅</span>       <!-- ← icon là decorative -->
  ...
  <button aria-label="Đóng thông báo">✕</button>
</div>

<!-- Error / Warning → role="alert" (interrupt ngay lập tức) -->
<div class="toast toast--error" role="alert" aria-live="assertive">
  ...
</div>
```

## Props

| Prop | Type | Default | Mô tả |
|---|---|---|---|
| `variant` | `success \| error \| info \| warning` | `info` | Loại thông báo |
| `message` | string | — | Text nội dung |
| `title` | string | — | Tiêu đề (optional) |
| `action-label` | string | — | Text của action button |
| `duration` | number (ms) | 5000 | Auto-dismiss (0 = manual) |
| `closeable` | boolean | true | Hiện nút close |
