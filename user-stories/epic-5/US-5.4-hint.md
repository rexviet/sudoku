# US-5.4 — Hint

| Field | Value |
|---|---|
| **Epic** | 5 — UI Interactions & Game Flow |
| **Priority** | P1 (should-have) |
| **Story Points** | 2 |
| **Dependencies** | US-5.2 |

## User Story

**As a** player, **I want** nhận gợi ý **so that** tôi có thể vượt qua chỗ khó.

## Tasks

- [ ] T1: Click Hint → auto-select 1 ô trống → điền đáp án đúng
- [ ] T2: Giảm `hintsRemaining` (mặc định: 3)
- [ ] T3: Nếu đã hết hint → disable nút hoặc show thông báo
- [ ] T4: Hint count trên badge update real-time

## Acceptance Criteria

- [ ] AC1: Hint điền đúng giá trị từ solution
- [ ] AC2: Badge giảm sau mỗi lần dùng
- [ ] AC3: Khi `hintsRemaining = 0` → nút Hint bị dim, click không hoạt động
- [ ] AC4: Ô được hint fill không thể undo (optional: tuỳ quyết định)
