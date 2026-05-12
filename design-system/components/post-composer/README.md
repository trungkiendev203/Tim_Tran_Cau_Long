# ds:comp:post-composer-001 — Post Composer

## Overview

Form tạo bài đăng mới trong Community. Hiện collapsed (1 dòng), expand khi user click. Hỗ trợ text + tag + ảnh upload.

> **Phase**: 2 | **Implements**: US-21, US-25

---

## States

| DS-ID | State | Mô tả |
|---|---|---|
| `ds:comp:post-composer-001--collapsed` | **Collapsed** | Input placeholder 1 dòng |
| `ds:comp:post-composer-001--expanded` | **Expanded** | Full form — text area, tags, upload |
| `ds:comp:post-composer-001--submitting` | **Submitting** | Loading khi submit |
| `ds:comp:post-composer-001--error` | **Error** | Validation error highlight |
| `ds:comp:post-composer-001--guest` | **Guest** | Disabled — "Đăng nhập để đăng" |

---

## CSS Classes

| Class | Mô tả |
|---|---|
| `.post-composer` | Container card |
| `.post-composer__trigger` | Row avatar + input placeholder (collapsed) |
| `.post-composer__avatar` | Avatar user hiện tại |
| `.post-composer__placeholder` | Input giả click để expand |
| `.post-composer__body` | Full form (expanded) |
| `.post-composer__textarea` | Textarea chính — auto-resize |
| `.post-composer__tags` | Row selected tag chips (dismissible) |
| `.post-composer__tag-select` | Dropdown chọn tag |
| `.post-composer__actions` | Row: upload, submit buttons |
| `.post-composer__upload` | Upload ảnh button |
| `.post-composer__submit` | Nút "Đăng bài" |
| `.post-composer--guest` | Modifier — opacity 0.6, pointer-events none |

---

## Alpine + Livewire Pattern

```html
<div class="post-composer" x-data="{ expanded: false }"
     data-ds-id="ds:comp:post-composer-001--{{ auth()->check() ? 'collapsed' : 'guest' }}">

  {{-- Collapsed trigger --}}
  <div class="post-composer__trigger" x-show="!expanded" @click="expanded = true">
    <div class="post-composer__avatar">{{ strtoupper(substr(auth()->user()->name ?? 'G', 0, 1)) }}</div>
    <div class="post-composer__placeholder" role="button" tabindex="0"
         @keydown.enter="expanded = true"
         aria-label="Tạo bài đăng mới">
      @auth Chia sẻ điều gì đó... @else Đăng nhập để chia sẻ @endauth
    </div>
  </div>

  {{-- Expanded form --}}
  <div class="post-composer__body" x-show="expanded" style="display:none;">
    <livewire:community.post-composer />
  </div>
</div>
```

```php
// app/Http/Livewire/Community/PostComposer.php
public string $body = '';
public array $selectedTags = [];
public array $uploadedImages = [];
public bool $isSubmitting = false;

protected array $rules = [
    'body'           => 'required|min:10|max:2000',
    'selectedTags'   => 'required|array|min:1|max:3',
    'uploadedImages' => 'array|max:5',
];

public function submit(): void
{
    $this->validate();
    $this->isSubmitting = true;

    $post = Post::create([
        'user_id' => auth()->id(),
        'body'    => $this->body,
        'tags'    => $this->selectedTags,
    ]);

    // Attach images...
    $this->reset(['body', 'selectedTags', 'uploadedImages', 'isSubmitting']);
    $this->dispatch('post-created', postId: $post->id);
    $this->dispatch('show-toast', message: 'Bài đăng đã được tạo!', type: 'success');
}
```

---

## Validation Rules

| Field | Rule |
|---|---|
| `body` | required, min:10, max:2000 |
| `selectedTags` | required, min:1 tag, max:3 tags |
| `uploadedImages` | optional, max:5 files, jpg/png/gif |

---

## Accessibility

- Collapsed trigger: `role="button"`, `tabindex="0"`, `aria-label`
- Textarea: `aria-label="Nội dung bài đăng"`, `aria-required="true"`
- Submit: `aria-busy="true"` khi submitting
- Cancel: `aria-label="Hủy tạo bài"`
