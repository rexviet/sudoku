# US-4.4 — Number Pad (Bàn phím số)

| Field | Value |
|---|---|
| **Epic** | 4 — UI Layout & Static Components |
| **Priority** | P0 (must-have) |
| **Story Points** | 3 |
| **Dependencies** | US-1.2 |

## User Story

**As a** player, **I want** bàn phím số 1-9 trên màn hình **so that** tôi có thể nhập số bằng click/tap.

## Tasks

- [ ] T1: Render 9 nút số (layout: hàng ngang hoặc grid 3×3)
- [ ] T2: Hiển thị count remaining cho mỗi số (bao nhiêu ô còn cần số đó)
- [ ] T3: Khi 1 số đã xuất hiện đủ 9 lần trên board → dim/disable nút đó
- [ ] T4: Click nút → gọi callback `onNumberClick(num)`
- [ ] T5: Tạo styles trong `src/styles/controls.css`

## Technical Notes

- File: `src/ui/NumberPad.js`
- Count remaining = 9 - (số lần số đó xuất hiện trên board)

## Acceptance Criteria

- [ ] AC1: 9 nút hiển thị số 1-9
- [ ] AC2: Count remaining hiển thị chính xác & update real-time khi board thay đổi
- [ ] AC3: Nút bị dim khi số đó đã đủ 9 lần
- [ ] AC4: Click nút dim → không trigger callback
- [ ] AC5: Kích thước nút đủ lớn để tap trên mobile (min 44×44px)
