# US-2.2 — Generator tạo puzzle

| Field | Value |
|---|---|
| **Epic** | 2 — Sudoku Engine (Core Logic) |
| **Priority** | P0 (must-have) |
| **Story Points** | 5 |
| **Dependencies** | US-2.1 |

## User Story

**As a** player, **I want** hệ thống tạo ra puzzles mới mỗi lần chơi **so that** tôi luôn có bài mới để giải.

## Tasks

- [ ] T1: Implement `generateSolution()` — tạo bảng Sudoku hoàn chỉnh hợp lệ (diagonal-first + backtracking)
- [ ] T2: Implement `generatePuzzle(difficulty)` — loại bỏ ô từ solution
- [ ] T3: Đảm bảo puzzle có **unique solution** (dùng `countSolutions`)
- [ ] T4: Cấu hình số ô hiển thị theo difficulty (xem bảng bên dưới)
- [ ] T5: Đảm bảo thời gian generate < 2 giây ở mọi difficulty

## Difficulty Configuration

| Difficulty | Clues (ô hiển thị) |
|---|---|
| Easy | 38–45 |
| Medium | 30–37 |
| Hard | 26–29 |
| Expert | 22–25 |
| Master | 19–21 |
| Extreme | 17–18 |

## Technical Notes

- File: `src/engine/generator.js`
- `generateSolution()`: Fill 3 diagonal boxes trước (không cần check conflict), rồi backtrack phần còn lại
- `generatePuzzle()`: Loại ô ngẫu nhiên, sau mỗi lần loại → verify unique solution bằng `countSolutions(board, 2)`

## Acceptance Criteria

- [ ] AC1: Mỗi lần gọi `generatePuzzle()` → puzzle mới khác nhau
- [ ] AC2: Mọi puzzle đều có đúng 1 lời giải
- [ ] AC3: Số clues nằm trong range quy định cho từng difficulty
- [ ] AC4: Performance: generate xong trong < 2s (kể cả Extreme)
