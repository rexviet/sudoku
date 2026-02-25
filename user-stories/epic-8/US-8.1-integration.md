# US-8.1 — Kết nối toàn bộ (Integration)

| Field | Value |
|---|---|
| **Epic** | 8 — Assembly & Integration |
| **Priority** | P0 (must-have) |
| **Story Points** | 5 |
| **Dependencies** | Tất cả US trước đó |

## User Story

**As a** developer, **I want** tất cả components kết nối hoạt động cùng nhau **so that** game chạy end-to-end.

## Tasks

- [ ] T1: `src/main.js` — import & khởi tạo tất cả modules
- [ ] T2: Wire GameState events → UI updates (state change → re-render affected components)
- [ ] T3: Wire UI callbacks → GameState methods (click → action)
- [ ] T4: Init flow: check saved game → load hoặc generate new → render → start timer
- [ ] T5: Bind keyboard events
- [ ] T6: Setup auto-save listeners
- [ ] T7: Smoke test end-to-end: chơi 1 game hoàn chỉnh

## Init Flow

```
App Start
├── Check localStorage → hasSavedGame()?
│   ├── YES → loadGame() → render board → resume timer
│   └── NO  → generatePuzzle('easy') → render board → start timer
├── Render all UI components
├── Bind event listeners
└── Ready to play
```

## Acceptance Criteria

- [ ] AC1: Mở app → game ready to play ngay lập tức
- [ ] AC2: Click cell → number pad → số xuất hiện → stats update → tất cả sync
- [ ] AC3: Win/Lose → modal đúng → new game → fresh state
- [ ] AC4: Refresh → game restored đúng
- [ ] AC5: Không có console errors
