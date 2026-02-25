# US-3.1 — Quản lý trạng thái game

| Field | Value |
|---|---|
| **Epic** | 3 — Game State Management |
| **Priority** | P0 (must-have) |
| **Story Points** | 5 |
| **Dependencies** | US-2.2, US-2.3 |

## User Story

**As a** system, **I want** một state manager tập trung **so that** mọi thay đổi game đều qua 1 nơi duy nhất, đảm bảo consistency.

## Tasks

- [ ] T1: Tạo class `GameState` với properties: `board`, `solution`, `initial`, `notes`, `history`, `mistakes`, `score`, `hintsRemaining`, `difficulty`, `selectedCell`, `isNotesMode`
- [ ] T2: Implement `newGame(difficulty)` — generate puzzle mới & reset state
- [ ] T3: Implement `selectCell(row, col)` — set selected cell
- [ ] T4: Implement `placeNumber(num)` — đặt số vào selected cell (kiểm tra valid, cập nhật mistakes)
- [ ] T5: Implement `erase()` — xoá số ở selected cell (chỉ user-placed numbers)
- [ ] T6: Implement `undo()` — pop từ history stack & revert
- [ ] T7: Implement `toggleNotes()` — chuyển đổi chế độ notes
- [ ] T8: Implement `placeNote(num)` — thêm/xoá note ở selected cell
- [ ] T9: Implement `useHint()` — auto-fill 1 ô đúng, giảm hintsRemaining
- [ ] T10: Implement event system (`on`, `emit`) để notify UI khi state thay đổi

## Technical Notes

- File: `src/game/GameState.js`
- Event pattern: simple pub/sub — `on(event, callback)`, `emit(event, data)`
- Events: `'update'`, `'mistake'`, `'win'`, `'gameover'`, `'select'`

## Acceptance Criteria

- [ ] AC1: `placeNumber()` → push vào history, emit event `'update'`
- [ ] AC2: `placeNumber()` vào ô initial → bị reject (không thay đổi gì)
- [ ] AC3: `placeNumber()` sai → tăng `mistakes`, emit `'mistake'`
- [ ] AC4: `mistakes >= 3` → emit `'gameover'`
- [ ] AC5: Board hoàn thành → emit `'win'`
- [ ] AC6: `undo()` khi history rỗng → không lỗi, không thay đổi gì
- [ ] AC7: `useHint()` khi `hintsRemaining = 0` → bị reject
- [ ] AC8: Notes mode: nhập số → thêm note nhỏ thay vì đặt số chính
