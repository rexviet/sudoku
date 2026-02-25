# US-4.1 — Header & Navigation

| Field | Value |
|---|---|
| **Epic** | 4 — UI Layout & Static Components |
| **Priority** | P0 (must-have) |
| **Story Points** | 2 |
| **Dependencies** | US-1.2 |

## User Story

**As a** player, **I want** thấy header với logo và navigation **so that** tôi nhận diện đây là Sudoku app.

## Tasks

- [ ] T1: Render header với logo text "Sudoku" (styled, không cần ảnh)
- [ ] T2: Nút theme toggle (icon mặt trời / mặt trăng)
- [ ] T3: Tạo `src/styles/header.css`
- [ ] T4: Header responsive: trên mobile thu gọn phù hợp

## Technical Notes

- Files: `src/ui/Header.js`, `src/styles/header.css`

## Acceptance Criteria

- [ ] AC1: Logo hiển thị rõ ở mọi kích thước màn hình
- [ ] AC2: Theme toggle button hiển thị đúng icon theo theme hiện tại
- [ ] AC3: Header không che khuất game area
