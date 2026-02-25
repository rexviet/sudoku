# US-5.2 — Nhập số & Notes

| Field | Value |
|---|---|
| **Epic** | 5 — UI Interactions & Game Flow |
| **Priority** | P0 (must-have) |
| **Story Points** | 3 |
| **Dependencies** | US-5.1, US-4.4 |

## User Story

**As a** player, **I want** click number pad để điền số (hoặc ghi chú) **so that** tôi có thể giải puzzle.

## Tasks

- [ ] T1: Normal mode: click number → `gameState.placeNumber(num)`
- [ ] T2: Notes mode: click number → `gameState.placeNote(num)` (toggle note)
- [ ] T3: Nếu number đúng → hiển thị bình thường
- [ ] T4: Nếu number sai → hiển thị màu đỏ + tăng mistake counter
- [ ] T5: Auto-remove notes: khi đặt số chính vào ô → xoá note ở ô đó, xoá note cùng số ở cùng hàng/cột/box
- [ ] T6: Không cho nhập vào ô initial (gốc)

## Acceptance Criteria

- [ ] AC1: Normal mode: nhập số → số lớn xuất hiện trong ô
- [ ] AC2: Notes mode: nhập số → số nhỏ toggle ON/OFF trong ô
- [ ] AC3: Nhập sai → ô đỏ, mistakes tăng, emit event
- [ ] AC4: Nhập đúng số cuối cùng → trigger win check
- [ ] AC5: Auto-remove notes hoạt động đúng khi đặt số chính
