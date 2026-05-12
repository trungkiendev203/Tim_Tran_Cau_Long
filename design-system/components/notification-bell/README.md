# ds:comp:notification-bell-001 — Notification Bell

## Overview

Bell icon + dropdown danh sách thông báo. Hiển thị trong navbar khi user đã đăng nhập. Thông báo chủ yếu là: kèo mới khớp lịch nhắc.

---

## States

| DS-ID | State | Mô tả |
|---|---|---|
| `ds:comp:notification-bell-001--has-notif` | **Has Notifications** | Có thông báo chưa đọc — hiện badge đỏ |
| `ds:comp:notification-bell-001--empty` | **Empty** | Không có thông báo mới |
| `ds:comp:notification-bell-001--loading` | **Loading** | Skeleton khi fetch notifications |
| `ds:comp:notification-bell-001--error` | **Error/Offline** | Không kết nối được server |

---

## CSS Classes

| Class | Mô tả |
|---|---|
| `.bell-wrap` | `position: relative` — chứa button + badge |
| `.bell-btn` | Bell icon button |
| `.bell-count` | Badge đỏ số lượng chưa đọc — ẩn nếu = 0 |
| `.notif-dropdown` | Dropdown `340px` — shadow + border-radius |
| `.notif-dropdown__header` | Row: title "Thông báo" + "Đánh dấu đã đọc" |
| `.notif-dropdown__title` | Tiêu đề dropdown |
| `.notif-dropdown__mark` | Nút "Đánh dấu đã đọc tất cả" |
| `.notif-item` | Row 1 thông báo |
| `.notif-item--unread` | Modifier — nền xanh nhạt |
| `.notif-item__icon` | Emoji icon loại thông báo |
| `.notif-item__body` | Content text + timestamp |
| `.notif-item__text` | Nội dung thông báo |
| `.notif-item__time` | Timestamp "5 phút trước" |
| `.notif-item__dot` | Chấm xanh đánh dấu chưa đọc |
| `.notif-dropdown__footer` | Link "Xem tất cả thông báo" |
| `.notif-empty` | Empty state — icon + text |

---

## Props / Data

| Prop | Type | Mô tả |
|---|---|---|
| `$notifications` | Collection | Danh sách thông báo (tối đa 10 gần nhất) |
| `$unreadCount` | int | Số chưa đọc — dùng cho badge |
| `$isOpen` | bool | Toggle dropdown Alpine |

---

## HTML Pattern (Blade + Alpine)

```html
<div class="bell-wrap" x-data="{ open: false }" @click.outside="open = false">

  <button class="bell-btn"
    @click="open = !open"
    aria-label="{{ $unreadCount }} thông báo chưa đọc"
    aria-haspopup="true"
    :aria-expanded="open.toString()"
    wire:click="markSeen">
    🔔
    @if($unreadCount > 0)
      <span class="bell-count" aria-hidden="true">{{ $unreadCount }}</span>
    @endif
  </button>

  <div class="notif-dropdown" x-show="open" x-transition
       role="dialog" aria-label="Thông báo" style="display:none;">
    <div class="notif-dropdown__header">
      <span class="notif-dropdown__title">Thông báo</span>
      @if($unreadCount > 0)
        <button class="notif-dropdown__mark"
          wire:click="markAllRead">Đánh dấu đã đọc</button>
      @endif
    </div>

    @forelse($notifications as $notif)
      <div class="notif-item {{ !$notif->read_at ? 'notif-item--unread' : '' }}"
        wire:click="handleNotif({{ $notif->id }})">
        <span class="notif-item__icon">{{ $notif->icon }}</span>
        <div class="notif-item__body">
          <p class="notif-item__text">{!! $notif->message !!}</p>
          <span class="notif-item__time">{{ $notif->created_at->diffForHumans() }}</span>
        </div>
        @if(!$notif->read_at)
          <span class="notif-item__dot" aria-hidden="true"></span>
        @endif
      </div>
    @empty
      <div class="notif-empty">
        <div class="notif-empty__icon">🔕</div>
        <p class="notif-empty__text">Chưa có thông báo mới</p>
      </div>
    @endforelse

    <div class="notif-dropdown__footer">
      <a href="{{ route('notifications') }}">Xem tất cả thông báo</a>
    </div>
  </div>
</div>
```

---

## Livewire Methods

| Method | Mô tả |
|---|---|
| `markSeen()` | Gọi khi mở dropdown — cập nhật `seen_at` |
| `markAllRead()` | Đánh dấu tất cả `read_at = now()` |
| `handleNotif($id)` | Đánh dấu đã đọc + redirect đến resource |

---

## Notification Types

| Icon | Type | Trigger |
|---|---|---|
| 🏸 | `match_found` | Có kèo mới khớp lịch nhắc |
| 📅 | `reminder_created` | Tạo lịch mới thành công |
| ✅ | `generic` | Hệ thống |

---

## Accessibility

- Bell button: `aria-label="{{ $unreadCount }} thông báo chưa đọc"`
- Bell button: `aria-haspopup="true"`, `:aria-expanded="open.toString()"`
- Dropdown: `role="dialog"` + `aria-label="Thông báo"`
- Badge count: `aria-hidden="true"` — thông tin đã có trong aria-label của button
- Chấm unread: `aria-hidden="true"` — thông tin đã có qua background color
