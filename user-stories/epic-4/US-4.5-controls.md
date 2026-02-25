# US-4.5 — Game Controls (Undo, Erase, Notes, Hint)

| Field | Value |
|---|---|
| **Epic** | 4 — UI Layout & Static Components |
| **Priority** | P0 (must-have) |
| **Story Points** | 3 |
| **Dependencies** | US-1.2 |

## User Story

**As a** player, **I want** 4 nút điều khiển game **so that** tôi có thể hoàn tác, xoá, ghi chú, và nhận gợi ý.

## Tasks

- [ ] T1: Render 4 nút tròn với icon SVG inline: Undo ↩, Erase 🗑, Notes ✏, Hint 💡
- [ ] T2: Nút Notes có badge "ON/OFF" hiển thị trạng thái hiện tại
- [ ] T3: Nút Hint có badge số hints còn lại (vd: "3")
- [ ] T4: Click mỗi nút → gọi callback tương ứng
- [ ] T5: Label text dưới mỗi icon

## Technical Notes

- File: `src/ui/Controls.js`
- Icons: inline SVG (không cần external icon library)

## Acceptance Criteria

- [ ] AC1: 4 nút hiển thị rõ icon + label
- [ ] AC2: Badge Notes toggle giữa "ON" (có màu accent) và "OFF"
- [ ] AC3: Badge Hint hiển thị số chính xác, đổi màu cảnh báo khi còn 1
- [ ] AC4: Hover/active states rõ ràng
