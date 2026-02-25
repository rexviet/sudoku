# US-7.3 — Micro-animations & Transitions

| Field | Value |
|---|---|
| **Epic** | 7 — Polish & UX Enhancement |
| **Priority** | P2 (nice-to-have) |
| **Story Points** | 3 |
| **Dependencies** | Tất cả UI components |

## User Story

**As a** player, **I want** giao diện có animations mượt **so that** trải nghiệm chơi premium.

## Tasks

- [ ] T1: Cell highlight transition (fade 0.15s)
- [ ] T2: Number appear animation (scale từ 0 → 1, 0.2s ease-out)
- [ ] T3: Mistake shake animation (cell rung nhẹ khi nhập sai)
- [ ] T4: Button hover/active effects (scale, shadow)
- [ ] T5: Modal appear/disappear (fade + slide up, 0.3s)
- [ ] T6: Confetti animation cho win screen
- [ ] T7: `prefers-reduced-motion` → tắt tất cả animation

## Acceptance Criteria

- [ ] AC1: Animations không gây giật lag
- [ ] AC2: Mỗi interaction có feedback visual
- [ ] AC3: `prefers-reduced-motion: reduce` → tất cả animation bị skip
- [ ] AC4: Animations không cản trở gameplay
