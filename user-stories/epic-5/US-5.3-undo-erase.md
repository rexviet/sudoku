# US-5.3 — Undo & Erase

| Field | Value |
|---|---|
| **Epic** | 5 — UI Interactions & Game Flow |
| **Priority** | P0 (must-have) |
| **Story Points** | 2 |
| **Dependencies** | US-5.2 |

## User Story

**As a** player, **I want** hoàn tác hoặc xoá nước đi **so that** tôi có thể sửa sai.

## Tasks

- [ ] T1: Click Undo → `gameState.undo()` → revert ô về trạng thái trước
- [ ] T2: Click Erase → `gameState.erase()` → xoá số/notes ở selected cell
- [ ] T3: Không cho erase ô initial
- [ ] T4: UI update real-time sau undo/erase

## Acceptance Criteria

- [ ] AC1: Undo revert chính xác nước đi cuối (cả number & notes)
- [ ] AC2: Undo nhiều lần liên tiếp → revert từng bước đúng thứ tự
- [ ] AC3: Erase ô initial → không thay đổi gì
- [ ] AC4: Erase ô trống → không thay đổi gì, không lỗi
