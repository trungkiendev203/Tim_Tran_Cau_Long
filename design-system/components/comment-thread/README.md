# ds:comp:comment-thread-001 — Comment Thread

## Overview

Thread bình luận đầy đủ cho một bài đăng Community. Hiện trong modal hoặc trang chi tiết bài. Hỗ trợ reply, like bình luận, và guest-view.

> **Phase**: 2 | **Implements**: US-22, US-23

---

## States

| DS-ID | State | Mô tả |
|---|---|---|
| `ds:comp:comment-thread-001--default` | **Default** | Có bình luận — hiện list |
| `ds:comp:comment-thread-001--empty` | **Empty** | Chưa có bình luận — CTA "Hãy là người đầu tiên" |
| `ds:comp:comment-thread-001--guest` | **Guest** | Thấy comments nhưng không thể reply |

---

## CSS Classes

| Class | Mô tả |
|---|---|
| `.comment-thread` | Container tổng |
| `.comment-thread__count` | "X bình luận" header |
| `.comment-thread__list` | Danh sách comments |
| `.comment-item` | Item 1 bình luận |
| `.comment-item__avatar` | Avatar tròn `32px` |
| `.comment-item__body` | Bubble + meta |
| `.comment-item__bubble` | Background `neutral-100` pill shape |
| `.comment-item__name` | Tên + trình độ badge |
| `.comment-item__text` | Nội dung bình luận |
| `.comment-item__actions` | Row: Like, Reply, Thời gian |
| `.comment-item__action` | Button đơn nhỏ |
| `.comment-item__action--liked` | Màu đỏ khi đã like |
| `.comment-item__replies` | Indent replies (margin-left) |
| `.comment-thread__input` | Row avatar + input + send khi logged in |
| `.comment-thread__input-box` | Input field |
| `.comment-thread__send` | Send button |
| `.comment-thread__empty` | Empty state centered |
| `.comment-thread__empty-icon` | Icon to `💬` |
| `.comment-thread__guest-cta` | Guest CTA "Đăng nhập để bình luận" |

---

## Livewire Pattern

```html
<div class="comment-thread" data-ds-id="ds:comp:comment-thread-001--default">
  <div class="comment-thread__count">{{ $post->comments_count }} bình luận</div>

  <div class="comment-thread__list" role="list" aria-label="Danh sách bình luận">
    @forelse($comments as $comment)
    <div class="comment-item" role="listitem">
      <div class="comment-item__avatar">{{ strtoupper(substr($comment->user->name, 0, 1)) }}</div>
      <div class="comment-item__body">
        <div class="comment-item__bubble">
          <div class="comment-item__name">
            {{ $comment->user->name }}
            <x-badge-level :level="$comment->user->level" size="xs" />
          </div>
          <p class="comment-item__text">{{ $comment->body }}</p>
        </div>
        <div class="comment-item__actions">
          <button class="comment-item__action {{ $comment->liked_by_user ? 'comment-item__action--liked' : '' }}"
            wire:click="likeComment({{ $comment->id }})"
            @guest disabled @endguest
            aria-pressed="{{ $comment->liked_by_user ? 'true' : 'false' }}">
            {{ $comment->liked_by_user ? '❤️' : '🤍' }} {{ $comment->likes_count }}
          </button>
          @auth
          <button class="comment-item__action" wire:click="setReply({{ $comment->id }})">
            💬 Trả lời
          </button>
          @endauth
          <span class="comment-item__action" style="cursor:default;">
            {{ $comment->created_at->diffForHumans() }}
          </span>
        </div>

        {{-- Nested replies --}}
        @if($comment->replies_count > 0)
          <div class="comment-item__replies">
            @foreach($comment->replies as $reply)
              {{-- Same structure, indent 1 level --}}
            @endforeach
          </div>
        @endif
      </div>
    </div>
    @empty
      <div class="comment-thread__empty" data-ds-id="ds:comp:comment-thread-001--empty">
        <div class="comment-thread__empty-icon">💬</div>
        <p>Chưa có bình luận. Hãy là người đầu tiên!</p>
      </div>
    @endforelse
  </div>

  {{-- Input --}}
  @auth
  <div class="comment-thread__input" wire:submit.prevent="addComment">
    <div class="comment-item__avatar">{{ strtoupper(substr(auth()->user()->name, 0, 1)) }}</div>
    <input class="comment-thread__input-box" type="text"
      wire:model="commentBody"
      placeholder="Viết bình luận..."
      aria-label="Nhập bình luận"
      @keydown.enter.prevent="$wire.addComment()" />
    <button class="comment-thread__send" wire:click="addComment"
      :disabled="!commentBody.trim()"
      aria-label="Gửi bình luận">➤</button>
  </div>
  @else
  <div class="comment-thread__guest-cta" data-ds-id="ds:comp:comment-thread-001--guest">
    <a href="{{ route('login') }}" class="btn btn--primary btn--sm">Đăng nhập để bình luận</a>
  </div>
  @endauth
</div>
```

---

## Livewire Methods

| Method | Mô tả |
|---|---|
| `addComment()` | Thêm comment mới, emit `comment-added` |
| `likeComment($id)` | Toggle like, update `likes_count` |
| `setReply($id)` | Set `$replyingTo` — input placeholder thay đổi |
| `loadMore()` | Tải thêm comments (`perPage += 10`) |

---

## Accessibility

- List: `role="list"`, `aria-label="Danh sách bình luận"`
- Each item: `role="listitem"`
- Like button: `aria-pressed="true/false"`
- Guest actions: `disabled`
- Input: `aria-label="Nhập bình luận"`
- Send button: `aria-label="Gửi bình luận"`
- Nested replies: indent bằng margin, không dùng `ul>li` (tránh nesting quá sâu)
