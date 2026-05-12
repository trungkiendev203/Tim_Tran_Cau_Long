# ds:comp:search-bar-001 — AI Search Bar

## DS-ID
`ds:comp:search-bar-001`

## Mô tả
AI-powered search bar cho phép user tìm kèo bằng ngôn ngữ tự nhiên (NLP).
Input tiếng Việt → Chill Cầu AI hiểu và filter kết quả.

## When to Use / Do Not Use

| ✅ When to use | ❌ Do NOT use |
|---|---|
| Tìm kèo bằng câu hỏi tự nhiên ("tìm kèo TB tối nay") | Search đơn giản không qua AI — dùng input text thường |
| Global search ở Feed screen | Tìm trong list nhỏ — dùng filter |

## States

| State | DS-ID | Mô tả |
|---|---|---|
| Default (empty) | `ds:comp:search-bar-001--default` | Placeholder văn bản gợi ý |
| Focused | `ds:comp:search-bar-001--focused` | Border màu primary, keyboard visible |
| Loading | `ds:comp:search-bar-001--loading` | Spinner + "AI đang phân tích..." |
| Results | `ds:comp:search-bar-001--results` | Dropdown với kết quả và AI interpretation |
| Error | `ds:comp:search-bar-001--error` | Không parse được query — suggestion text |
| Empty Results | `ds:comp:search-bar-001--empty` | "Không tìm thấy kèo phù hợp" |

## Props / Attributes

| Prop | Type | Mô tả |
|---|---|---|
| `placeholder` | string | Placeholder text (cycling suggestions) |
| `loading` | boolean | AI processing spinner |
| `results` | Post[] | Kết quả trả về |
| `ai-interpretation` | string | Text AI đã hiểu ("Tìm kèo TB+, tối Thứ 3...") |
| `error` | string | Error message khi parse thất bại |

## A11y Notes

- Input có `role="combobox"` + `aria-expanded` + `aria-controls` (points to dropdown)
- Dropdown: `role="listbox"` + `id` để combobox reference được
- Mỗi result item: `role="option"`
- Loading: `aria-live="polite"` trên status region
- Clear button: `aria-label="Xóa tìm kiếm"`

## HTML Pattern

```html
<div class="search-bar" role="search">
  <input
    class="search-bar__input"
    type="search"
    role="combobox"
    aria-expanded="false"
    aria-controls="search-results"
    aria-label="Tìm kèo bằng AI"
    placeholder="VD: tìm kèo TB tối nay Hoàng Mai..." />
  <div id="search-results" class="search-bar__dropdown" role="listbox" aria-label="Kết quả tìm kiếm">
    <div class="search-result" role="option">...</div>
  </div>
  <div aria-live="polite" class="visually-hidden">
    <!-- AI status updates announced here -->
  </div>
</div>
```
