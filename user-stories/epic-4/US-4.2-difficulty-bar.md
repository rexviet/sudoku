# US-4.2 — Thanh chọn độ khó (Difficulty Bar)

| Field | Value |
|---|---|
| **Epic** | 4 — UI Layout & Static Components |
| **Priority** | P0 (must-have) |
| **Story Points** | 2 |
| **Dependencies** | US-1.2 |

## User Story

**As a** player, **I want** chọn mức độ khó trước khi chơi **so that** tôi có thể chơi puzzle phù hợp trình độ.

## Tasks

- [ ] T1: Render 6 nút ngang: Easy, Medium, Hard, Expert, Master, Extreme
- [ ] T2: Highlight nút active (background accent color)
- [ ] T3: Click nút → trigger callback `onDifficultyChange(level)`
- [ ] T4: Responsive: trên mobile nhỏ → scrollable hoặc 2 hàng

## Technical Notes

- File: `src/ui/DifficultyBar.js`

## Acceptance Criteria

- [ ] AC1: Luôn có đúng 1 nút active
- [ ] AC2: Click nút khác → active chuyển sang nút mới
- [ ] AC3: Trên mobile: tất cả 6 nút vẫn accessible (không bị ẩn)
