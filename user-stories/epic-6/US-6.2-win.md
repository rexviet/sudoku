# US-6.2 — Win Celebration

| Field | Value |
|---|---|
| **Epic** | 6 — Modals & Game Flow |
| **Priority** | P0 (must-have) |
| **Story Points** | 3 |
| **Dependencies** | US-5.2 |

## User Story

**As a** player, **I want** được chúc mừng khi hoàn thành puzzle **so that** tôi cảm thấy thành tựu.

## Tasks

- [ ] T1: Khi board hoàn thành (`'win'` event) → show Win Modal
- [ ] T2: Win Modal hiển thị: 🎉 animation, difficulty, thời gian, điểm số, số mistakes
- [ ] T3: Confetti animation (CSS particles hoặc canvas)
- [ ] T4: Nút "New Game" trong modal
- [ ] T5: Timer dừng khi win

## Technical Notes

- File: `src/ui/Modal.js`, `src/styles/modal.css`
- Confetti: CSS animation hoặc canvas-based particles

## Acceptance Criteria

- [ ] AC1: Modal xuất hiện ngay khi điền đúng ô cuối cùng
- [ ] AC2: Hiển thị đúng stats (time, score, mistakes)
- [ ] AC3: Confetti animation chạy mượt, không giật
- [ ] AC4: Click "New Game" → đóng modal, bắt đầu game mới
