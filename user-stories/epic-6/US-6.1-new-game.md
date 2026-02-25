# US-6.1 — New Game Flow

| Field | Value |
|---|---|
| **Epic** | 6 — Modals & Game Flow |
| **Priority** | P0 (must-have) |
| **Story Points** | 3 |
| **Dependencies** | US-3.1, US-4.2 |

## User Story

**As a** player, **I want** bắt đầu game mới **so that** tôi có thể chơi puzzle khác.

## Tasks

- [ ] T1: Click difficulty khi đang chơi → show confirm modal "Bạn muốn bỏ game hiện tại?"
- [ ] T2: Click "New Game" button → show confirm nếu đang chơi, hoặc tạo game mới
- [ ] T3: Confirm → `gameState.newGame(difficulty)`, reset UI, start timer
- [ ] T4: Lần đầu load app (không có save) → auto start game Easy
- [ ] T5: Lần đầu load app (có save) → load saved game

## Acceptance Criteria

- [ ] AC1: Có confirm dialog khi đang chơi dở → tránh mất tiến trình
- [ ] AC2: New game → board mới, timer reset, mistakes reset, score reset
- [ ] AC3: Load app lần đầu → có game sẵn để chơi ngay
