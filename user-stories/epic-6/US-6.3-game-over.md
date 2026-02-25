# US-6.3 — Game Over (Thua)

| Field | Value |
|---|---|
| **Epic** | 6 — Modals & Game Flow |
| **Priority** | P0 (must-have) |
| **Story Points** | 2 |
| **Dependencies** | US-5.2 |

## User Story

**As a** player, **I want** biết khi nào tôi thua **so that** tôi có thể bắt đầu lại.

## Tasks

- [ ] T1: Khi `mistakes >= 3` → show Game Over Modal
- [ ] T2: Modal hiển thị: thông báo thua, số lỗi, thời gian
- [ ] T3: Nút "Try Again" (chơi lại cùng puzzle) & "New Game" (puzzle mới)

## Technical Notes

- File: `src/ui/Modal.js` (shared with Win modal)
- "Try Again": reset `mistakes`, `timer`, `history` nhưng giữ `board` = `initial`

## Acceptance Criteria

- [ ] AC1: Modal xuất hiện ngay khi mistake thứ 3
- [ ] AC2: "Try Again" → reset mistakes & timer nhưng giữ puzzle
- [ ] AC3: "New Game" → puzzle hoàn toàn mới
