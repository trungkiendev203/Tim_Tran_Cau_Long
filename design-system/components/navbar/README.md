# ds:comp:navbar-001 — Navigation Bar

## Overview

Thanh điều hướng chính của Chill Cầu. Có 3 biến thể theo trạng thái xác thực và viewport.

---

## States

| DS-ID | State | Mô tả |
|---|---|---|
| `ds:comp:navbar-001--guest` | **Guest** | Chưa đăng nhập — hiện nút "Đăng nhập" |
| `ds:comp:navbar-001--logged-in` | **Logged-in** | Đã đăng nhập — hiện avatar + bell |
| `ds:comp:navbar-001--mobile` | **Mobile** | `< 768px` — ẩn links, hiện hamburger |

---

## CSS Classes

| Class | Mô tả |
|---|---|
| `.navbar` | Container chính, `height: 56px`, flex |
| `.navbar__brand` | Logo 🏸 + tên sản phẩm |
| `.navbar__links` | Danh sách nav links (desktop) |
| `.navbar__link` | Link đơn lẻ |
| `.navbar__link--active` | Link đang active — nền xanh nhạt |
| `.navbar__actions` | Vùng bên phải — buttons, bell, avatar |
| `.navbar__bell` | Bell icon button với `.navbar__bell-count` badge |
| `.navbar__avatar` | Avatar tròn với initial chữ |
| `.navbar__toggle` | Dark mode toggle — pill button |
| `.navbar__icon-btn` | Icon button (yêu thích, bell guest) |
| `.navbar__hamburger` | 3-dashes hamburger — mobile only |
| `.navbar--mobile` | Modifier — ẩn `.navbar__links` |

---

## Props / Data

| Prop | Type | Mô tả |
|---|---|---|
| `auth.check()` | bool | Quyết định Guest vs Logged-in state |
| `auth.user.name` | string | Lấy ký tự đầu cho avatar initial |
| `unreadCount` | int | Số badge trên bell — ẩn nếu `== 0` |

---

## HTML Pattern

### Guest (Blade)
```html
<nav class="navbar">
  <div class="navbar__brand">
    <span class="navbar__logo">🏸</span>
    <span class="navbar__name">Chill Cầu</span>
  </div>
  <div class="navbar__links">
    <a href="{{ route('feed') }}" class="navbar__link {{ request()->routeIs('feed') ? 'navbar__link--active' : '' }}">Tìm kèo</a>
    <a href="{{ route('map') }}" class="navbar__link {{ request()->routeIs('map') ? 'navbar__link--active' : '' }}">Bản đồ</a>
    <a href="{{ route('reminder') }}" class="navbar__link {{ request()->routeIs('reminder') ? 'navbar__link--active' : '' }}">Nhắc lịch</a>
    <a href="{{ route('coming-soon') }}" class="navbar__link">Xếp hạng</a>
    <a href="{{ route('coming-soon') }}" class="navbar__link">Bảng giá</a>
  </div>
  <div class="navbar__actions">
    <button class="navbar__toggle" x-data @click="$dispatch('toggle-theme')">🌓 Tối</button>
    <a href="#" class="btn btn--warning btn--sm">☕ Ủng hộ</a>
    <button class="navbar__icon-btn" aria-label="Yêu thích">🤍</button>
    <a href="{{ route('login') }}" class="btn btn--primary btn--sm">➜ Đăng nhập</a>
  </div>
</nav>
```

### Logged-in (Blade)
```html
<nav class="navbar">
  {{-- brand + links như trên --}}
  <div class="navbar__actions">
    <button class="navbar__toggle" x-data @click="$dispatch('toggle-theme')">🌓 Tối</button>
    <a href="#" class="btn btn--warning btn--sm">☕ Ủng hộ</a>
    <button class="navbar__icon-btn" aria-label="Danh sách yêu thích">🤍</button>
    {{-- Notification Bell (xem ds:comp:notification-bell-001) --}}
    <button class="navbar__bell" aria-label="{{ $unreadCount }} thông báo chưa đọc">
      🔔
      @if($unreadCount > 0)
        <span class="navbar__bell-count">{{ $unreadCount }}</span>
      @endif
    </button>
    <a href="{{ route('profile') }}" class="navbar__avatar" aria-label="Hồ sơ cá nhân">
      <span class="navbar__avatar-initial">{{ strtoupper(substr(auth()->user()->name, 0, 1)) }}</span>
    </a>
  </div>
</nav>
```

---

## Dark Mode

Toggle lưu trạng thái trong `localStorage` key `sm-theme`. Script đã có trong `index.html`:

```js
// Blade layout: đặt trong <head> để tránh flash
const theme = localStorage.getItem('sm-theme') || 'light';
if (theme === 'dark') document.body.classList.add('theme-dark');
```

Xem thêm `livewire-conventions.md` § Dark Mode Toggle.

---

## Responsive

| Breakpoint | Behavior |
|---|---|
| `>= 768px` | Full navbar với links |
| `< 768px` | `.navbar--mobile` — links ẩn, hamburger hiện |

```css
@media (max-width: 767px) {
  .navbar--mobile .navbar__links { display: none; }
}
```

---

## Accessibility

- `<nav>` element đã là landmark — không cần `role="navigation"`
- Bell button: `aria-label="{{ $unreadCount }} thông báo chưa đọc"`
- Avatar link: `aria-label="Hồ sơ cá nhân"`
- Hamburger: `aria-label="Mở menu"`, `aria-expanded="true/false"`
- Active link: đã phân biệt bằng màu (không chỉ dựa vào màu — text vẫn rõ)
