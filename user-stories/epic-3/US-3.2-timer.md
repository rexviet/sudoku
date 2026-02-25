# US-3.2 — Timer

| Field | Value |
|---|---|
| **Epic** | 3 — Game State Management |
| **Priority** | P0 (must-have) |
| **Story Points** | 2 |
| **Dependencies** | US-1.1 |

## User Story

**As a** player, **I want** đồng hồ đếm giờ chơi **so that** tôi biết mình giải puzzle trong bao lâu.

## Tasks

- [ ] T1: Tạo class `Timer` với methods: `start()`, `pause()`, `resume()`, `reset()`, `getElapsed()`
- [ ] T2: `getFormatted()` → return string `"MM:SS"` hoặc `"HH:MM:SS"` nếu > 1h
- [ ] T3: Emit event `'tick'` mỗi giây để UI update

## Technical Notes

- File: `src/game/timer.js`
- Dùng `setInterval` với 1000ms
- Lưu `startTime` và `elapsed` để tính chính xác khi pause/resume

## Acceptance Criteria

- [ ] AC1: Timer bắt đầu khi game bắt đầu
- [ ] AC2: `pause()` → dừng đếm, `resume()` → tiếp tục chính xác
- [ ] AC3: Format đúng: `"05:23"`, `"1:02:30"`
- [ ] AC4: `reset()` → quay về `"00:00"`
