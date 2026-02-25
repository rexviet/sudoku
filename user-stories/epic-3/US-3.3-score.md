# US-3.3 — Tính điểm

| Field | Value |
|---|---|
| **Epic** | 3 — Game State Management |
| **Priority** | P1 (should-have) |
| **Story Points** | 2 |
| **Dependencies** | US-3.2 |

## User Story

**As a** player, **I want** được tính điểm sau khi hoàn thành puzzle **so that** tôi có mục tiêu để cải thiện.

## Tasks

- [ ] T1: Thiết kế công thức scoring: `baseScore(difficulty) - timePenalty - mistakePenalty`
- [ ] T2: Implement `calculateScore(difficulty, elapsedSeconds, mistakes)`
- [ ] T3: Base scores: Easy=500, Medium=750, Hard=1000, Expert=1500, Master=2000, Extreme=3000

## Technical Notes

- File: `src/game/score.js`
- `timePenalty`: mỗi giây trừ 1 điểm (hoặc tuỳ chỉnh)
- `mistakePenalty`: mỗi mistake trừ 50 điểm
- Score tối thiểu = 0

## Acceptance Criteria

- [ ] AC1: Difficulty cao → điểm base cao hơn
- [ ] AC2: Thời gian càng lâu → điểm càng giảm
- [ ] AC3: Mỗi mistake → trừ điểm cố định
- [ ] AC4: Điểm tối thiểu = 0 (không âm)
