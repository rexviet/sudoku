# US-7.1 — Dark Mode

| Field | Value |
|---|---|
| **Epic** | 7 — Polish & UX Enhancement |
| **Priority** | P1 (should-have) |
| **Story Points** | 3 |
| **Dependencies** | US-4.1 |

## User Story

**As a** player, **I want** chuyển sang dark mode **so that** tôi chơi thoải mái trong điều kiện thiếu sáng.

## Tasks

- [ ] T1: Tạo `src/styles/dark-mode.css` — override tất cả CSS variables khi `[data-theme="dark"]`
- [ ] T2: Click theme toggle → toggle attribute `data-theme` trên `<html>`
- [ ] T3: Lưu preference vào `localStorage`
- [ ] T4: Load lần đầu → check `prefers-color-scheme` của OS
- [ ] T5: Transition mượt khi chuyển theme (0.3s)

## Dark Mode Color Palette

| Token | Dark Mode Value |
|---|---|
| `--bg-primary` | `#1A1A2E` |
| `--bg-secondary` | `#16213E` |
| `--accent` | `#60A5FA` |
| `--text-primary` | `#E2E8F0` |
| `--text-secondary` | `#64748B` |
| `--error` | `#F87171` |
| `--success` | `#34D399` |
| `--grid-border` | `#475569` |
| `--cell-highlight` | `#1E3A5F` |
| `--cell-selected` | `#1565C0` |
| `--cell-same-number` | `#1B5E20` |

## Technical Notes

- File: `src/styles/dark-mode.css`, `src/ui/ThemeToggle.js`
- localStorage key: `'sudoku_theme'`

## Acceptance Criteria

- [ ] AC1: Tất cả elements đổi đúng màu khi switch theme
- [ ] AC2: Không có element nào bị "lạc" (vẫn giữ màu light trong dark mode)
- [ ] AC3: Theme persist khi refresh
- [ ] AC4: Respect OS theme preference lần đầu
