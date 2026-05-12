# ds:comp:post-card-001 — Post Card

## DS-ID
`ds:comp:post-card-001`

## Mô tả
Post Card hiển thị một kèo cầu lông trong Feed. Đây là component trung tâm của Chill Cầu — mọi user story về tìm kèo đều render qua component này.

## When to Use / Do Not Use

| ✅ When to use | ❌ Do NOT use |
|---|---|
| Hiển thị kèo trong Feed, Map popup, Search results | Hiển thị thông tin user profile |
| List item trong Reminder screen | Hiển thị lịch sử đã tham gia (dùng History Card) |

## States

| State | DS-ID | Mô tả |
|---|---|---|
| Default | `ds:comp:post-card-001--default` | Kèo còn slot, hiển thị đầy đủ info |
| Full | `ds:comp:post-card-001--full` | Kèo đã đủ người — Join button disabled |
| Expired | `ds:comp:post-card-001--expired` | Kèo đã qua giờ — opacity giảm |
| Loading | `ds:comp:post-card-001--loading` | Skeleton placeholder (dùng `ds:comp:skeleton-001--post-card`) |
| Error | `ds:comp:post-card-001--error` | Load riêng 1 card thất bại |

## Props / Attributes

| Prop | Type | Mô tả |
|---|---|---|
| `court-name` | string | Tên sân |
| `district` | string | Quận/huyện |
| `date` | string | Ngày đăng |
| `time-range` | string | Khung giờ (19:00 – 21:00) |
| `levels` | string[] | Trình độ yêu cầu |
| `slots-left` | number | Số slot còn lại |
| `total-slots` | number | Tổng số slot |
| `gender` | `all \| male \| female` | Đối tượng |
| `type` | `giao-luu \| doi-khang \| tap-luyen` | Hình thức |
| `is-full` | boolean | Đã đủ slot chưa |
| `is-expired` | boolean | Đã qua giờ chưa |

## A11y Notes

- Card container: `role="article"` để screen reader identify từng kèo riêng biệt
- "Tham gia" button khi disabled: `aria-disabled="true"` + `aria-label="Kèo đã đủ người"`
- Level badges: thêm `title` hoặc `aria-label` vì màu không đủ (color-only signaling)
- Skeleton: container phải có `aria-busy="true"` khi loading

## HTML Pattern

```html
<article class="post-card" role="article" data-ds-id="ds:comp:post-card-001--default">
  <div class="post-card__header">
    <span class="post-card__court">🏸 Sân A&C Đại Tú</span>
    <span class="post-card__date">Hôm nay</span>
  </div>
  <div class="post-card__body">
    <div class="post-card__time">19:00 – 21:00</div>
    <div class="post-card__badges">
      <span class="badge badge--tb" aria-label="Trình độ TB">TB</span>
    </div>
    <div class="post-card__meta">👥 3/6 slot · 📍 Hoàng Mai · 2.3 km</div>
  </div>
  <div class="post-card__actions">
    <button class="btn btn--primary">Tham gia</button>
    <button class="btn btn--secondary">Lưu</button>
  </div>
</article>
```
