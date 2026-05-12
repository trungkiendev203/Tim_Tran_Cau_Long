# Chill Cầu — Livewire & Alpine.js Conventions

> **Áp dụng cho**: Laravel 11 + Livewire 3 + Alpine.js + Tailwind CSS
> **Ngày tạo**: 25/03/2026 | **Version**: 1.0

---

## 1. Nguyên tắc phân chia trách nhiệm

| Layer | Công nghệ | Làm gì |
|---|---|---|
| **Server state** | Livewire | Data fetching, filtering, CRUD, auth checks |
| **UI micro-interaction** | Alpine.js | Toggle dropdown, show/hide, accordion, form preview |
| **Global state** | Alpine `$store` | Dark mode, toast queue |
| **Heavy JS** | Vanilla JS / Blade script | Leaflet.js map, file upload preview |

> ❗ **Không dùng Alpine để fetch data**. Mọi API call đều qua Livewire.

---

## 2. Naming Conventions

### Livewire Component

```
app/Http/Livewire/
├── Feed/
│   ├── PostFeed.php        ← Màn feed chính
│   └── FilterPanel.php     ← Sidebar bộ lọc
├── Reminder/
│   ├── ReminderList.php
│   └── ReminderForm.php
├── Map/
│   └── CourtMap.php
└── Shared/
    └── NotificationBell.php
```

### Naming Rules

| Loại | Quy tắc | Ví dụ |
|---|---|---|
| Public property | camelCase | `$searchQuery`, `$selectedLevels` |
| Method (action) | camelCase verb | `applyFilter()`, `toggleReminder()` |
| Method (computed) | `get` prefix | `getFilteredPosts()` |
| Event (emit) | kebab-case | `filters-updated`, `reminder-created` |
| Listener | camelCase | `filtersUpdated()` |

---

## 3. Data Binding Patterns

### Text input với debounce
```html
{{-- Debounce 400ms để tránh re-query mỗi keystroke --}}
<input wire:model.live.debounce.400ms="searchQuery"
       class="filter-input" type="text"
       placeholder="Tên sân, khu vực..." />
```

### Select / Dropdown
```html
<select wire:model.live="gender" class="filter-select">
  <option value="mixed">Nam & Nữ</option>
  <option value="male">Chỉ Nam</option>
  <option value="female">Chỉ Nữ</option>
</select>
```

### Multi-select toggle button (trình độ, hình thức)
```html
{{-- Livewire component có method toggleLevel($value) --}}
@foreach(['Y','Y+','TBY','TB','TB+','TB++','Khá','Giỏi'] as $level)
<button
  class="filter-btn {{ in_array($level, $selectedLevels) ? 'filter-btn--active' : '' }}"
  wire:click="toggleLevel('{{ $level }}')"
  aria-pressed="{{ in_array($level, $selectedLevels) ? 'true' : 'false' }}"
>{{ $level }}</button>
@endforeach
```

```php
// Trong Livewire component
public array $selectedLevels = [];

public function toggleLevel(string $level): void
{
    if (in_array($level, $this->selectedLevels)) {
        $this->selectedLevels = array_values(
            array_filter($this->selectedLevels, fn($l) => $l !== $level)
        );
    } else {
        $this->selectedLevels[] = $level;
    }
}
```

### Checkbox / Toggle
```html
<label class="toggle" aria-label="Bật/tắt lịch {{ $reminder->name }}">
  <input type="checkbox"
    wire:model.live="isActive"
    wire:click="toggle" />
  <span class="toggle__track"></span>
  <span class="toggle__thumb"></span>
</label>
```

---

## 4. Loading States

```html
{{-- Spinner khi Livewire đang xử lý --}}
<div wire:loading wire:target="applyFilter" class="spinner" aria-label="Đang lọc..."></div>

{{-- Disabled button khi loading --}}
<button wire:click="submit" wire:loading.attr="disabled" class="btn btn--primary">
  <span wire:loading.remove wire:target="submit">Lưu</span>
  <span wire:loading wire:target="submit" class="spinner spinner--sm"></span>
</button>

{{-- Skeleton thay thế content khi loading --}}
<div wire:loading wire:target="loadPosts">
  {{-- ds:comp:skeleton-001 --}}
  @include('components.skeleton.post-card')
</div>
<div wire:loading.remove wire:target="loadPosts">
  {{-- actual content --}}
  @foreach($posts as $post) ... @endforeach
</div>
```

---

## 5. Event Communication

### Emit từ child → parent
```php
// Child: FilterPanel.php
public function updated(): void
{
    $this->dispatch('filters-updated', filters: $this->getFilters());
}
```

```php
// Parent: PostFeed.php
protected $listeners = ['filters-updated' => 'applyFilters'];

public function applyFilters(array $filters): void
{
    $this->filters = $filters;
    $this->resetPage();
}
```

### Dispatch browser event (Livewire → Alpine)
```php
// Trong Livewire action
$this->dispatch('show-toast', message: 'Lưu thành công!', type: 'success');
```

```html
{{-- Alpine listener --}}
<div x-data="toastManager()" @show-toast.window="addToast($event.detail)">
  ...
</div>
```

---

## 6. Dark Mode Toggle

Dark mode dùng **class-based toggle** trên `<body>` + `localStorage`.

```html
{{-- Trong layouts/app.blade.php <head> — phải đặt trước body để tránh flash --}}
<script>
  if (localStorage.getItem('sm-theme') === 'dark') {
    document.documentElement.classList.add('theme-dark');
  }
</script>
```

```html
{{-- Navbar toggle button --}}
<button class="navbar__toggle"
  x-data
  @click="
    document.documentElement.classList.toggle('theme-dark');
    const isDark = document.documentElement.classList.contains('theme-dark');
    localStorage.setItem('sm-theme', isDark ? 'dark' : 'light');
    $el.textContent = isDark ? '🌞 Sáng' : '🌓 Tối';
  "
  x-text="$el.textContent"
>🌓 Tối</button>
```

> **Lưu ý**: Token `.theme-dark` overrides chưa implement trong `tokens.css`. Sprint 2 task: thêm `tokens/theme-dark.css`.

---

## 7. Modal Pattern

```html
{{-- Dùng Alpine cho open/close, Livewire cho data --}}
<div x-data="{ open: false }">

  <button class="btn btn--primary" @click="open = true">Tạo lịch mới</button>

  {{-- ds:comp:modal-001: focus trap đã có sẵn trong components/modal/index.html --}}
  <div role="dialog" aria-modal="true" aria-labelledby="modal-title"
       x-show="open" x-trap="open"
       @keydown.escape.window="open = false"
       style="display:none;">
    <div class="modal-overlay" @click="open = false"></div>
    <div class="modal">
      <div class="modal__header">
        <h2 id="modal-title" class="modal__title">Tạo lịch nhắc</h2>
        <button class="modal__close" @click="open = false"
          aria-label="Đóng hộp thoại">✕</button>
      </div>
      <div class="modal__body">
        <livewire:reminder.reminder-form />
      </div>
    </div>
  </div>
</div>
```

---

## 8. Toast Notification

Toast được quản lý bởi Alpine global store — Livewire dispatch event, Alpine hiển thị.

```javascript
// resources/js/app.js
Alpine.store('toasts', {
    items: [],
    add(message, type = 'success', duration = 3000) {
        const id = Date.now();
        this.items.push({ id, message, type });
        setTimeout(() => this.remove(id), duration);
    },
    remove(id) {
        this.items = this.items.filter(t => t.id !== id);
    }
});
```

```html
{{-- Trong layouts/app.blade.php — toast container --}}
<div class="toast-container" aria-live="polite"
     x-data
     @show-toast.window="$store.toasts.add($event.detail.message, $event.detail.type)">
  <template x-for="toast in $store.toasts.items" :key="toast.id">
    <div class="toast" :class="`toast--${toast.type}`" role="status">
      <span x-text="toast.message"></span>
      <button class="toast__close"
        @click="$store.toasts.remove(toast.id)"
        aria-label="Đóng thông báo">✕</button>
    </div>
  </template>
</div>
```

**Toast positioning**: `position: fixed; bottom: 24px; right: 24px; z-index: var(--z-toast);`

---

## 9. Form Validation Error

```html
{{-- Input với lỗi validation --}}
<div class="form-group">
  <label class="form-label" for="name">Tên lịch nhắc</label>
  <input id="name" type="text"
    class="form-input {{ $errors->has('name') ? 'form-input--error' : '' }}"
    wire:model.blur="name"
    aria-invalid="{{ $errors->has('name') ? 'true' : 'false' }}"
    aria-describedby="{{ $errors->has('name') ? 'name-error' : '' }}" />
  @error('name')
    <span id="name-error" class="form-error" role="alert">{{ $message }}</span>
  @enderror
</div>
```

```css
/* base.css — thêm class này */
.form-input--error {
  border-color: var(--color-danger-500);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
.form-error {
  display: block;
  margin-top: 4px;
  font-size: var(--font-size-xs);
  color: var(--color-danger-600);
}
```
