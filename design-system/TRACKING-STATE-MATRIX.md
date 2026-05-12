# TRACKING-STATE-MATRIX — Chill Cầu Design System

> Ma trận theo dõi mapping giữa PRD-ID ↔ Design System (DS-ID) và trạng thái triển khai.
> **Updated: Iteration 6 — 25/03/2026**

## Legend

| Status | Ý nghĩa |
|---|---|
| ✅ Built | Đã tạo HTML prototype |
| 🔲 Planned | Đã lên kế hoạch, chưa triển khai |

---

## 1. Epic 1 — Tìm kèo (Feed)

| PRD-ID | User Story | DS-ID | Status |
|---|---|---|---|
| `prd:us-feed-guest-0001` | US-01: Xem danh sách kèo | `ds:screen:feed-001`, `ds:comp:post-card-001` | ✅ |
| `prd:us-filter-level-0001` | US-02: Lọc theo trình độ | `ds:comp:filter-panel-001`, `ds:comp:badge-level-001` | ✅ |
| `prd:us-filter-distance-0001` | US-03: Lọc theo khoảng cách | `ds:comp:filter-panel-001` | ✅ |
| `prd:us-filter-time-0001` | US-04: Lọc theo khung giờ | `ds:comp:filter-panel-001` | ✅ |
| `prd:us-ai-search-0001` | US-05: AI tìm kiếm | `ds:comp:search-bar-001` | ✅ |
| `prd:us-fb-link-0001` | US-06: Xem link gốc Facebook | `ds:comp:post-card-001` | ✅ |
| `prd:us-favorite-0001` | US-07: Yêu thích bài đăng | `ds:comp:post-card-001` | ✅ |

## 2. Epic 2 — Bản đồ (Map)

| PRD-ID | User Story | DS-ID | Status |
|---|---|---|---|
| `prd:us-map-view-0001` | US-08: Xem sân trên bản đồ | `ds:screen:map-001`, `ds:comp:map-marker-001` | ✅ |
| `prd:us-map-area-filter-0001` | US-09: Vẽ vùng lọc kèo | `ds:screen:map-001` | ✅ |
| `prd:us-map-court-detail-0001` | US-10: Click sân → danh sách kèo | `ds:comp:map-marker-001` | ✅ |
| `prd:us-map-directions-0001` | US-11: Chỉ đường đến sân | `ds:comp:map-marker-001` | ✅ |

## 3. Epic 3 — Nhắc lịch (Reminder)

| PRD-ID | User Story | DS-ID | Status |
|---|---|---|---|
| `prd:us-reminder-create-0001` | US-12: Tạo lịch chơi cố định | `ds:screen:reminder-001`, `ds:comp:reminder-card-001`, `ds:comp:modal-001` | ✅ |
| `prd:us-reminder-feed-0001` | US-13: Xem bài phù hợp lịch | `ds:screen:reminder-001` | ✅ |
| `prd:us-reminder-notify-0001` | US-14: Nhận thông báo | `ds:comp:notification-bell-001`, `ds:comp:toast-001` | ✅ |
| `prd:us-reminder-toggle-0001` | US-15: Bật/tắt lịch nhắc | `ds:comp:reminder-card-001` | ✅ |

## 4. Module F4 — Auth & Profile

| Spec-ID | Feature | DS-ID | Status |
|---|---|---|---|
| `spec:auth-register-0001` | Đăng ký | `ds:screen:auth-001`, `ds:comp:auth-form-001` | ✅ |
| `spec:auth-login-0001` | Đăng nhập | `ds:screen:auth-001`, `ds:comp:auth-form-001` | ✅ |
| `spec:auth-reset-0001` | Quên mật khẩu | `ds:comp:auth-form-001` | ✅ |
| `spec:auth-profile-0001` | Hồ sơ cá nhân | `ds:screen:profile-001` | ✅ |

## 5. Epic 5 — Thảo luận (Community) — Phase 2

| PRD-ID | User Story | DS-ID | Status |
|---|---|---|---|
| `prd:us-community-post-0001` | US-20: Đăng bài viết | `ds:comp:post-composer-001`, `ds:screen:discussion-001` | ✅ |
| `prd:us-community-image-0001` | US-21: Đính kèm ảnh | `ds:comp:post-composer-001` | ✅ |
| `prd:us-community-like-0001` | US-22: Like/unlike | `ds:comp:discussion-card-001` | ✅ |
| `prd:us-community-comment-0001` | US-23: Bình luận | `ds:comp:comment-thread-001` | ✅ |
| `prd:us-community-feed-0001` | US-24: Đọc bài (Guest) | `ds:screen:discussion-001`, `ds:comp:discussion-card-001` | ✅ |
| `prd:us-community-tag-0001` | US-25: Tag chủ đề | `ds:comp:tag-chip-001`, `ds:screen:discussion-001` | ✅ |
| `prd:us-community-bookmark-0001` | US-26: Bookmark bài viết | `ds:comp:discussion-card-001` | ✅ |
| `prd:us-community-report-0001` | US-27: Report vi phạm | `ds:comp:report-modal-001` | ✅ |
| `prd:us-community-delete-0001` | US-28: Xóa bài/comment | `ds:comp:comment-thread-001` | ✅ |

## 5. DS Infrastructure Components

| DS-ID | Component | Variants/States | Iteration | Status |
|---|---|---|---|---|
| `ds:comp:button-001` | Button | 3 variants, 4 states, 3 sizes | 1 | ✅ |
| `ds:comp:badge-level-001` | Skill Level Badge | 10 levels, 3 sizes | 1 | ✅ |
| `ds:comp:post-card-001` | Match Post Card | Default/Loading/Empty/Error | 1 | ✅ |
| `ds:comp:navbar-001` | Navigation Bar | Guest/Logged-in/Mobile | 1 | ✅ |
| `ds:comp:search-bar-001` | AI Search Bar | Default/Loading/Results | 1 | ✅ |
| `ds:comp:filter-panel-001` | Smart Filter Panel | 9 filter types | 1 | ✅ |
| `ds:comp:reminder-card-001` | Reminder Card | Active/Inactive | 1 | ✅ |
| `ds:comp:auth-form-001` | Auth Form | Login/Error/Register | 1 | ✅ |
| `ds:comp:notification-bell-001` | Notification Bell | Has-notif/Empty | 1 | ✅ |
| `ds:comp:map-marker-001` | Map Marker + Popup | 3 markers + popup | 1 | ✅ |
| `ds:comp:modal-001` | Modal / Dialog | Confirm/Form/Share | 2 | ✅ |
| `ds:comp:toast-001` | Toast Notification | Success/Error/Info/Warning | 2 | ✅ |
| `ds:comp:court-dropdown-001` | Searchable Court Dropdown | Closed/Open/Selected/Empty | 2 | ✅ |
| `ds:comp:skeleton-001` | Skeleton Loading | Navbar/Card/Filter/Reminder | 2 | ✅ |
| `ds:comp:pagination-001` | Pagination | LoadMore/Loading/Numbered/End | 2 | ✅ |
| `ds:comp:mobile-filter-001` | Mobile Filter Bottom Sheet | Full filter in sheet | 2 | ✅ |
| `ds:comp:discussion-card-001` | Community Post Card | Text/Image/Loading/Guest | 4 | ✅ |
| `ds:comp:tag-chip-001` | Community Tag Chip | 5 system tags, sm/md/lg, dismissible | 4 | ✅ |
| `ds:comp:post-composer-001` | Post Composer | Collapsed/Expanded/Error/Submitting/Guest | 4 | ✅ |
| `ds:comp:comment-thread-001` | Comment Thread | Default/Empty/Guest | 4 | ✅ |
| `ds:comp:report-modal-001` | Report Modal | Reason selection/Submitting/Success | 5 | ✅ |

## 6. Screens

| DS-ID | Screen | Layout | Iteration | Status |
|---|---|---|---|---|
| `ds:screen:feed-001` | Feed / Tìm kèo | Sidebar-Content | 1 | ✅ |
| `ds:screen:map-001` | Map / Bản đồ | Master-Detail | 1 | ✅ | Default/Permission-Denied/Empty/Loading/Error |
| `ds:screen:reminder-001` | Reminder / Nhắc lịch | Card Grid | 1 | ✅ |
| `ds:screen:auth-001` | Auth / Đăng nhập | Centered | 1 | ✅ |
| `ds:screen:profile-001` | Profile / Hồ sơ | Single Column | 2 | ✅ |
| `ds:screen:feed-states` | Feed States | 5 state cards | 2 | ✅ |
| `ds:screen:discussion-001` | Discussion / Thảo luận | Sidebar-Content + Modal Composer | 4 | ✅ |
| `ds:screen:coming-soon-001` | Coming Soon | Placeholder — Xếp hạng & Bảng giá | 5 | ✅ |
| `ds:screen:not-found-001` | 404 Not Found | Centered — error + quick links | 7 | ✅ |

---

## Summary

| Category | Total | ✅ Built | Coverage |
|---|---|---|---|
| **User Stories (US-01→US-28)** | 28 | 28 | **100%** |
| **Spec Features** | 22 | 22 | **100%** |
| **Components** | 21 | 21 | **100%** |
| **Screens** | 9 | 9 | **100%** |
| **Layouts** | 3 | 3 | **100%** |
| **Showcase Hub** | 1 | 1 | **100%** |
