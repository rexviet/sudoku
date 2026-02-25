# US-4.6 — Stats Bar (Mistakes, Score, Timer)

| Field | Value |
|---|---|
| **Epic** | 4 — UI Layout & Static Components |
| **Priority** | P0 (must-have) |
| **Story Points** | 2 |
| **Dependencies** | US-1.2 |

## User Story

**As a** player, **I want** thấy thống kê game **so that** tôi biết trạng thái hiện tại.

## Tasks

- [ ] T1: Render 3 stats ngang: Mistakes `0/3`, Score `0`, Timer `00:00`
- [ ] T2: Nút pause ⏸ bên cạnh Timer
- [ ] T3: Mistakes đổi màu đỏ khi ≥ 2
- [ ] T4: Update methods cho từng stat

## Technical Notes

- File: `src/ui/StatsBar.js`

## Acceptance Criteria

- [ ] AC1: 3 stats luôn hiển thị, layout không bị vỡ
- [ ] AC2: Mistakes hiện format `X/3`
- [ ] AC3: Timer tự chạy, cập nhật mỗi giây
- [ ] AC4: Nút pause toggle giữa ⏸ và ▶
