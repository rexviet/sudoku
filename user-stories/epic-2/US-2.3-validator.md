# US-2.3 — Validation nước đi

| Field | Value |
|---|---|
| **Epic** | 2 — Sudoku Engine (Core Logic) |
| **Priority** | P0 (must-have) |
| **Story Points** | 2 |
| **Dependencies** | US-2.1 |

## User Story

**As a** player, **I want** hệ thống kiểm tra nước đi **so that** tôi biết khi nào mình đặt sai số.

## Tasks

- [ ] T1: Implement `isValidMove(board, row, col, num)` — check hàng, cột, box 3×3
- [ ] T2: Implement `isBoardComplete(board)` — kiểm tra đã điền đủ & đúng
- [ ] T3: Implement `getConflicts(board, row, col)` — trả về danh sách ô xung đột

## Technical Notes

- File: `src/engine/validator.js`

## Acceptance Criteria

- [ ] AC1: `isValidMove()` phát hiện đúng mọi vi phạm hàng/cột/box
- [ ] AC2: `isBoardComplete()` chỉ return `true` khi board hoàn chỉnh & valid
- [ ] AC3: `getConflicts()` trả về đúng tất cả ô xung đột
