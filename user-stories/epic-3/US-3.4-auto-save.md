# US-3.4 — Auto-save & Load

| Field | Value |
|---|---|
| **Epic** | 3 — Game State Management |
| **Priority** | P1 (should-have) |
| **Story Points** | 3 |
| **Dependencies** | US-3.1 |

## User Story

**As a** player, **I want** game tự lưu tiến trình **so that** tôi có thể tắt browser và quay lại chơi tiếp.

## Tasks

- [ ] T1: Implement `saveGame(gameState)` — serialize & lưu vào `localStorage`
- [ ] T2: Implement `loadGame()` — đọc từ `localStorage` & deserialize
- [ ] T3: Implement `hasSavedGame()` — kiểm tra có game đang lưu không
- [ ] T4: Implement `clearSave()` — xoá game đã lưu
- [ ] T5: Auto-save trigger: sau mỗi `placeNumber`, `erase`, `undo`, `useHint`
- [ ] T6: Lưu cả timer elapsed time

## Technical Notes

- File: `src/game/storage.js`
- localStorage key: `'sudoku_save'`
- Serialize: `JSON.stringify`, Deserialize: `JSON.parse` với try/catch

## Acceptance Criteria

- [ ] AC1: Refresh browser → game load lại đúng trạng thái trước đó
- [ ] AC2: Board, notes, history, mistakes, score, timer — tất cả được khôi phục
- [ ] AC3: Bắt đầu New Game → xoá save cũ
- [ ] AC4: Không crash nếu localStorage bị corrupted → fallback tạo game mới
