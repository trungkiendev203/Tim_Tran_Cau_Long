# ds:comp:button-001 — Button

## Usage

Dùng Button để trigger hành động chính của người dùng.

| Variant | Khi nào dùng |
|---|---|
| `btn--primary` | Hành động chính trong 1 viewport (ví dụ: "Tìm kèo", "Tạo lịch") |
| `btn--secondary` | Hành động phụ, hủy, quay lại |
| `btn--danger` | Destructive actions (xóa, huỷ đăng ký) |

## ✅ Do / ❌ Don't

| ✅ Do | ❌ Don't |
|---|---|
| Tối đa 1 `btn--primary` trên 1 màn hình | Dùng 2+ primary button trong cùng 1 viewport |
| Dùng `btn--lg` cho CTA chính trên hero/landing | Dùng `btn--lg` cho actions phụ |
| Thêm `aria-label` nếu button chỉ có icon | Dùng `<div>` hay `<a>` thay vì `<button>` |
| Luôn thêm `:disabled` khi form chưa valid | Ẩn button khi trạng thái chưa sẵn sàng |

## Props (HTML → Livewire)

| Prop | Type | Default | Mô tả |
|---|---|---|---|
| `variant` | `primary \| secondary \| danger \| ghost` | `primary` | Màu sắc và style |
| `size` | `sm \| md \| lg` | `md` | Kích thước |
| `disabled` | boolean | false | Vô hiệu hóa |
| `loading` | boolean | false | Show spinner, block click |
| `icon` | string (emoji/SVG) | — | Icon trước text |
| `full` | boolean | false | Width 100% |

## States

- **Default**: base styles
- **Hover**: `translateY(-1px)` + shadow-md (primary only)
- **Active/Focus**: green outline 2px
- **Disabled**: opacity 0.45, no pointer events
- **Loading**: spinner + "đang xử lý..."

## HTML Pattern

```html
<!-- Primary -->
<button class="btn btn--primary" type="button">
  Tìm kèo
</button>

<!-- Danger with confirmation -->
<button class="btn btn--danger" type="button" aria-label="Xóa lịch nhắc Tối hàng tuần">
  Xóa
</button>

<!-- Loading state -->
<button class="btn btn--primary btn--loading" disabled aria-busy="true">
  <span class="spinner" aria-hidden="true"></span>
  Đang tìm...
</button>

<!-- Icon only (a11y required) -->
<button class="btn btn--ghost btn--sm" aria-label="Đóng hộp thoại">✕</button>
```

## A11y Notes

- Luôn dùng `<button type="button">`, không dùng `type="submit"` trừ khi trong form
- Icon-only buttons **phải có** `aria-label`
- Loading buttons phải có `aria-busy="true"` và `disabled`
- Focus ring: `outline: 2px solid var(--sm-border-focus)` — không xóa

## CSS Import

```css
@import '../../tokens/tokens.css';
@import '../../base/base.css';
/* base.css đã chứa .btn — không cần define lại */
```
