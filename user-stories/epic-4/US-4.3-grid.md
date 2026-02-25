# US-4.3 — Bảng Sudoku 9×9

| Field | Value |
|---|---|
| **Epic** | 4 — UI Layout & Static Components |
| **Priority** | P0 (must-have) |
| **Story Points** | 5 |
| **Dependencies** | US-1.2 |

## User Story

**As a** player, **I want** thấy bảng Sudoku 9×9 đẹp mắt **so that** tôi có trải nghiệm chơi tốt.

## Tasks

- [ ] T1: Render grid 9×9 bằng CSS Grid (81 cells)
- [ ] T2: Border dày cho box 3×3, border mỏng cho cells
- [ ] T3: Hiển thị số trong ô (số gốc: bold + màu đậm, số user: màu nhạt hơn)
- [ ] T4: Hiển thị notes (tối đa 9 số nhỏ trong 1 ô, layout grid 3×3 mini)
- [ ] T5: Click cell → gọi callback `onCellClick(row, col)`
- [ ] T6: Tạo `src/styles/grid.css`
- [ ] T7: Grid responsive: scale theo viewport, giữ tỉ lệ vuông

## Technical Notes

- Files: `src/ui/Grid.js`, `src/styles/grid.css`
- CSS Grid: `grid-template-columns: repeat(9, 1fr)`
- Notes: mỗi cell chứa 1 mini grid 3×3 cho 9 notes

## Acceptance Criteria

- [ ] AC1: Grid là hình vuông ở mọi kích thước màn hình
- [ ] AC2: Viền box 3×3 dày hơn rõ rệt so với viền cell
- [ ] AC3: Phân biệt rõ số gốc vs số user-placed (font-weight hoặc color)
- [ ] AC4: Notes hiển thị dạng grid nhỏ 3×3 trong cell, không bị tràn
- [ ] AC5: Click vào cell → callback được gọi với đúng row, col
