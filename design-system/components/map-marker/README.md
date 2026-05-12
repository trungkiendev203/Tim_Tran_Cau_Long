# ds:comp:map-marker-001 — Map Marker + Popup

## Overview

Marker Leaflet.js hiển thị trên bản đồ. Màu sắc/kích thước thay đổi theo số bài đăng tại sân. Click marker mở popup danh sách kèo.

> ⚠️ Marker CSS là pure HTML/CSS showcase để dev reference — trong production implement qua **Leaflet custom DivIcon**.

---

## Variants

| DS-ID | Variant | Màu | Kích thước | Điều kiện |
|---|---|---|---|---|
| `ds:comp:map-marker-001--zero` | **Zero** | Xám `#94a3b8` | 32px | 0 bài đăng |
| `ds:comp:map-marker-001--low` | **Low** | Vàng cam `#f59e0b` | 32px | 1–2 bài đăng |
| `ds:comp:map-marker-001--high` | **High** | Xanh primary | 38px | 3+ bài đăng |

---

## Popup (ds:comp:map-marker-001--popup)

Popup `300px` hiện khi click marker, gồm:
- Header: tên sân + địa chỉ + khoảng cách
- List posts: giờ chơi, badge trình độ, số slot
- Footer: "Chỉ đường" + "Xem chi tiết"

---

## CSS Classes

| Class | Mô tả |
|---|---|
| `.marker` | Circle base |
| `.marker--zero` | Xám — 0 bài |
| `.marker--low` | Vàng — 1-2 bài |
| `.marker--high` | Xanh — 3+ bài, size lớn hơn |
| `.map-popup` | Container popup |
| `.map-popup__header` | Tên sân + địa chỉ |
| `.map-popup__name` | Tên sân bold |
| `.map-popup__addr` | Địa chỉ + khoảng cách |
| `.map-popup__posts` | List bài đăng |
| `.map-popup__post` | Row 1 bài: giờ + badges + slots |
| `.map-popup__post-time` | Giờ chơi — màu primary |
| `.map-popup__post-level` | Badge trình độ group |
| `.mini-badge` | Badge nhỏ trong popup |
| `.map-popup__footer` | Row 2 buttons |
| `.map-popup__btn--dir` | "Chỉ đường" — Google Maps |
| `.map-popup__btn--detail` | "Xem chi tiết" — primary |

---

## Leaflet DivIcon Integration

```javascript
// resources/js/map.js

function getMarkerClass(postCount) {
    if (postCount === 0) return 'marker--zero';
    if (postCount <= 2) return 'marker--low';
    return 'marker--high';
}

function createMarker(court) {
    const cls = getMarkerClass(court.post_count);
    const size = court.post_count >= 3 ? 38 : 32;

    const icon = L.divIcon({
        className: '',
        html: `<div class="marker ${cls}">${court.post_count}</div>`,
        iconSize: [size, size + 6],
        iconAnchor: [size / 2, size + 6],
        popupAnchor: [0, -(size + 6)],
    });

    return L.marker([court.lat, court.lng], { icon });
}
```

---

## Popup HTML (Leaflet bindPopup)

```javascript
function buildPopupHtml(court, posts) {
    const postRows = posts.map(p => `
        <div class="map-popup__post">
            <span class="map-popup__post-time">${p.time_start} – ${p.time_end}</span>
            <div class="map-popup__post-level">
                ${p.levels.map(l => `<span class="mini-badge mini-badge--tb">${l}</span>`).join('')}
            </div>
            <span>👥 ${p.slots_available} slot</span>
        </div>
    `).join('');

    return `
        <div class="map-popup">
            <div class="map-popup__header">
                <div class="map-popup__name">🏸 ${court.name}</div>
                <div class="map-popup__addr">${court.address} • ${court.distance} km</div>
            </div>
            <div class="map-popup__posts">${postRows}</div>
            <div class="map-popup__footer">
                <button class="map-popup__btn map-popup__btn--dir"
                    onclick="window.open('https://maps.google.com/?q=${court.lat},${court.lng}')">
                    🗺️ Chỉ đường
                </button>
                <button class="map-popup__btn map-popup__btn--detail"
                    onclick="window.location='/courts/${court.id}'">
                    Xem chi tiết
                </button>
            </div>
        </div>
    `;
}

marker.bindPopup(buildPopupHtml(court, posts), { maxWidth: 320 });
```

---

## Accessibility

> Map là thành phần khó accessible nhất. Đảm bảo:
- Mỗi marker có `title` trên DivIcon để screen reader đọc được: `title: court.name + ' - ' + postCount + ' bài'`
- Nút "Chỉ đường": mở trong tab mới — thêm `aria-label="Chỉ đường đến {{ court.name }}, mở Google Maps"`
- Nút "Xem chi tiết": `aria-label="Xem kèo tại {{ court.name }}"`
