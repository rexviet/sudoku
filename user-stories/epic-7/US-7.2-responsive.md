# US-7.2 — Responsive Design

| Field | Value |
|---|---|
| **Epic** | 7 — Polish & UX Enhancement |
| **Priority** | P1 (should-have) |
| **Story Points** | 3 |
| **Dependencies** | Tất cả UI components |

## User Story

**As a** player, **I want** chơi được trên mobile **so that** tôi chơi ở bất cứ đâu.

## Tasks

- [ ] T1: Desktop (≥1024px): Grid bên trái, controls bên phải (layout hiện tại)
- [ ] T2: Tablet (768-1023px): Grid trên, controls dưới (stacked)
- [ ] T3: Mobile (< 768px): Full-width, grid scale theo viewport, controls compact
- [ ] T4: Touch targets ≥ 44×44px cho tất cả interactive elements
- [ ] T5: Viewport meta tag cho mobile

## Breakpoint Summary

| Breakpoint | Layout | Grid Size |
|---|---|---|
| ≥ 1024px (Desktop) | Side-by-side | ~480px |
| 768–1023px (Tablet) | Stacked | ~450px |
| < 768px (Mobile) | Full-width stacked | 100vw - padding |

## Acceptance Criteria

- [ ] AC1: Grid luôn là hình vuông & centered ở mọi breakpoint
- [ ] AC2: Không bị scroll ngang ở bất kỳ kích thước nào
- [ ] AC3: Tất cả nút/cell đủ lớn để tap bằng ngón tay
- [ ] AC4: Layout chuyển đổi mượt giữa các breakpoint
