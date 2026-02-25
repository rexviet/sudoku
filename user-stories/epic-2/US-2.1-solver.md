# US-2.1 — Thuật toán giải Sudoku

| Field | Value |
|---|---|
| **Epic** | 2 — Sudoku Engine (Core Logic) |
| **Priority** | P0 (must-have) |
| **Story Points** | 3 |
| **Dependencies** | US-1.1 |

## User Story

**As a** system, **I want** một solver hoạt động chính xác **so that** tôi có thể verify puzzles và cung cấp hints.

## Tasks

- [ ] T1: Implement `solve(board)` — giải bảng Sudoku bằng backtracking
- [ ] T2: Implement `countSolutions(board, limit)` — đếm số lời giải (dừng khi > limit)
- [ ] T3: Implement `getHint(board, solution)` — trả về `{row, col, value}` cho 1 ô trống ngẫu nhiên
- [ ] T4: Viết unit tests cho solver với các board mẫu

## Technical Notes

- File: `src/engine/solver.js`
- Thuật toán: Backtracking (recursive)
- `countSolutions` dùng `limit` để early-stop (thường limit=2 để check unique)

## Acceptance Criteria

- [ ] AC1: `solve()` giải đúng mọi valid Sudoku board
- [ ] AC2: `solve()` return `null` cho invalid board
- [ ] AC3: `countSolutions()` phân biệt được board có 1 hoặc nhiều lời giải
- [ ] AC4: `getHint()` luôn trả về giá trị đúng khớp với solution
