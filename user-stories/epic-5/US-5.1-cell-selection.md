# US-5.1 — Cell Selection & Highlighting

| Field | Value |
|---|---|
| **Epic** | 5 — UI Interactions & Game Flow |
| **Priority** | P0 (must-have) |
| **Story Points** | 3 |
| **Dependencies** | US-4.3, US-3.1 |

## User Story

**As a** player, **I want** khi click vào 1 ô thì highlight row/col/box/same number **so that** tôi dễ nhìn thấy context.

## Tasks

- [ ] T1: Click cell → cập nhật `selectedCell` trong GameState
- [ ] T2: Apply CSS class highlight lên ô đang chọn (đậm nhất)
- [ ] T3: Highlight tất cả ô cùng hàng (nhạt)
- [ ] T4: Highlight tất cả ô cùng cột (nhạt)
- [ ] T5: Highlight tất cả ô cùng box 3×3 (nhạt)
- [ ] T6: Highlight tất cả ô có cùng số (màu khác biệt, vd: xanh lá nhạt)
- [ ] T7: Ô sai (conflict) → border hoặc text đỏ

## Highlighting Rules

```
Khi chọn 1 ô (row=4, col=5, value=7):
├── Ô đang chọn      → --cell-selected (xanh đậm nhất)
├── Cùng hàng 4       → --cell-highlight (xanh nhạt)
├── Cùng cột 5        → --cell-highlight (xanh nhạt)
├── Cùng box 3×3      → --cell-highlight (xanh nhạt)
└── Tất cả ô có số 7  → --cell-same-number (xanh lá nhạt)
```

## Acceptance Criteria

- [ ] AC1: Click ô → 4 loại highlight hiển thị đồng thời, phân biệt rõ
- [ ] AC2: Click ô khác → highlight cũ bị xoá, highlight mới xuất hiện
- [ ] AC3: Click ô trống (chưa có số) → không highlight "same number"
- [ ] AC4: Transition mượt khi chuyển highlight
