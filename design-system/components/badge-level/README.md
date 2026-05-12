# ds:comp:badge-level-001 — Badge Level

## DS-ID
`ds:comp:badge-level-001`

## Mô tả
Badge hiển thị trình độ cầu lông của người chơi và yêu cầu trình độ của kèo.
Hệ thống có 10 levels được color-coded từ Y (beginner) → Giỏi (advanced).

## When to Use / Do Not Use

| ✅ When to use | ❌ Do NOT use |
|---|---|
| Hiển thị skill level trong Post Card, user profile | Status badge (online/offline) → dùng dot indicator |
| Filter chip cho level selection | Label cho state (error/success) → dùng Toast |

## All Levels (10)

| Level | Color | CSS class |
|---|---|---|
| Y | Blue 100 | `badge--y` |
| Y+ | Blue 200 | `badge--y-plus` |
| TBY | Teal 100 | `badge--tby` |
| TBY+ | Teal 200 | `badge--tby-plus` |
| TB- | Purple 100 | `badge--tb-minus` |
| TB | Purple 200 | `badge--tb` |
| TB+ | Purple 300 | `badge--tb-plus` |
| TB++ | Amber 100 | `badge--tb-dplus` |
| Khá | Orange 100 | `badge--kha` |
| Giỏi | Red 100 | `badge--gioi` |

## Props / Attributes

| Prop | Type | Mô tả |
|---|---|---|
| `level` | string (enum above) | Trình độ cần hiển thị |
| `size` | `sm \| md` | Kích thước badge |

## A11y Notes

- ⚠️ **Color-only signaling**: Badge hiện distinguish chủ yếu qua màu sắc.
- **Fix cần thiết**: Thêm `title="Trình độ: TB+"` hoặc `aria-label="Trình độ TB+"` để screen reader và colorblind users có context.
- Không dùng `<div>` — dùng `<span>` để không tạo block-level layout break.

## HTML Pattern

```html
<!-- With a11y label -->
<span class="badge badge--tb-plus" title="Trình độ TB+" aria-label="Trình độ TB+">TB+</span>

<!-- Multiple badges in a group -->
<div class="badge-group" aria-label="Trình độ yêu cầu">
  <span class="badge badge--tb" title="Trình độ TB">TB</span>
  <span class="badge badge--tb-plus" title="Trình độ TB+">TB+</span>
</div>
```
