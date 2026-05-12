# ds:comp:discussion-card-001 — Community Post Card

## Overview

Card bài đăng trong Community (Phase 2). Dùng trong `ds:screen:discussion-001`. Hỗ trợ text + ảnh, like/comment/share/bookmark.

> **Phase**: 2 | **Implements**: US-20→23, US-26, US-27

---

## States / Variants

| DS-ID | State | Mô tả |
|---|---|---|
| `ds:comp:discussion-card-001--text` | **Default / Text** | Bài text + comment preview |
| `ds:comp:discussion-card-001--images` | **With Images** | Bài có ảnh — grid 1/2/3 cột |
| `ds:comp:discussion-card-001--loading` | **Loading** | Skeleton `aria-busy="true"` |
| `ds:comp:discussion-card-001--guest` | **Guest** | Đã xem nhưng actions disabled |

---

## CSS Classes

| Class | Mô tả |
|---|---|
| `.disc-card` | Container card + hover lift |
| `.disc-card__author` | Row avatar + name + timestamp + more |
| `.disc-card__avatar` | Avatar gradient circle `40px` |
| `.disc-card__name` | Tên + badge trình độ |
| `.disc-card__time` | Timestamp + tag context |
| `.disc-card__more` | Button `•••` options |
| `.disc-card__tags` | Row tag chips |
| `.disc-card__content` | Body text |
| `.disc-card__content--truncated` | `-webkit-line-clamp: 3` |
| `.disc-card__read-more` | Link "Xem thêm" |
| `.disc-card__images` | Image grid wrapper |
| `.disc-card__img-grid` | Base grid |
| `.disc-card__img-grid--1/2/3` | Layout variants |
| `.disc-card__img-item--tall` | Ảnh cao `min-height: 200px` |
| `.disc-card__img-more` | Overlay "+" count trên ảnh cuối |
| `.disc-card__actions` | Footer bar — like/comment/share/bookmark |
| `.disc-card__action` | Button đơn |
| `.disc-card__action--liked` | Màu đỏ khi đã like |
| `.disc-card__action--bookmarked` | Màu vàng khi đã bookmark |
| `.disc-card__comment-preview` | 1–2 comment preview bên dưới |
| `.disc-card__comment-bubble` | Bubble bình luận nhỏ |
| `.disc-card__view-more` | Link "Xem thêm X bình luận" |

---

## Livewire Pattern

```html
<article class="disc-card" data-ds-id="ds:comp:discussion-card-001--{{ $post->has_images ? 'images' : 'text' }}">
  <div class="disc-card__author">
    <div class="disc-card__avatar">{{ strtoupper(substr($post->user->name, 0, 1)) }}</div>
    <div class="disc-card__author-info">
      <div class="disc-card__name">
        {{ $post->user->name }}
        <x-badge-level :level="$post->user->level" size="xs" />
      </div>
      <div class="disc-card__time">{{ $post->created_at->diffForHumans() }}</div>
    </div>
    @auth
      <button class="disc-card__more" aria-label="Tùy chọn bài viết"
        wire:click="openMenu({{ $post->id }})">•••</button>
    @endauth
  </div>

  <div class="disc-card__tags">
    @foreach($post->tags as $tag)
      <x-tag-chip :tag="$tag" size="md" />
    @endforeach
  </div>

  <div class="disc-card__content {{ strlen($post->body) > 200 ? 'disc-card__content--truncated' : '' }}"
       id="post-body-{{ $post->id }}">
    {{ $post->body }}
  </div>

  {{-- Actions bar --}}
  <div class="disc-card__actions">
    <button class="disc-card__action {{ $post->liked_by_user ? 'disc-card__action--liked' : '' }}"
      wire:click="toggleLike({{ $post->id }})"
      @auth aria-pressed="{{ $post->liked_by_user ? 'true' : 'false' }}" @endauth
      @guest disabled style="opacity:.5;cursor:not-allowed;" title="Đăng nhập để thích" @endguest>
      {{ $post->liked_by_user ? '❤️' : '🤍' }} <span class="disc-card__count">{{ $post->likes_count }}</span>
    </button>
    <button class="disc-card__action" wire:click="focusComment({{ $post->id }})">
      💬 <span class="disc-card__count">{{ $post->comments_count }}</span>
    </button>
    <button class="disc-card__action" wire:click="share({{ $post->id }})">🔗 Chia sẻ</button>
    <button class="disc-card__action {{ $post->bookmarked_by_user ? 'disc-card__action--bookmarked' : '' }}"
      wire:click="toggleBookmark({{ $post->id }})"
      @guest disabled style="opacity:.5;cursor:not-allowed;" @endguest>🔖</button>
  </div>
</article>
```

---

## Accessibility

- `article` element = ARIA landmark lý tưởng cho social post
- Like button: `aria-pressed="true/false"` (chuyển từ ghost ❤️→ đỏ)
- Guest actions: `disabled` + `title="Đăng nhập để..."` (tooltip)
- Loading: `aria-busy="true"` trên `<article>`
- Image `+N` overlay: cần `aria-label="Còn X ảnh nữa"`
