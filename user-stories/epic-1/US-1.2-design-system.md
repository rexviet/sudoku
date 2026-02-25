# US-1.2 — Design System & Base Styles

| Field | Value |
|---|---|
| **Epic** | 1 — Project Foundation |
| **Priority** | P0 (must-have) |
| **Story Points** | 2 |
| **Dependencies** | US-1.1 |

## User Story

**As a** developer, **I want** một design system với CSS variables **so that** toàn bộ UI nhất quán về màu sắc, spacing, typography.

## Tasks

- [ ] T1: Tạo `src/styles/index.css` với CSS custom properties (colors, spacing, radius, shadows)
- [ ] T2: Định nghĩa color palette cho Light mode (bg, accent, text, error, success, grid)
- [ ] T3: CSS reset & base typography (font-family, sizes, line-height)
- [ ] T4: Tạo utility classes cơ bản (flex, grid, spacing)

## Color Palette Reference

| Token | Light Mode | Dark Mode |
|---|---|---|
| `--bg-primary` | `#F0F4FF` | `#1A1A2E` |
| `--bg-secondary` | `#FFFFFF` | `#16213E` |
| `--accent` | `#3B82F6` | `#60A5FA` |
| `--text-primary` | `#344861` | `#E2E8F0` |
| `--text-secondary` | `#94A3B8` | `#64748B` |
| `--error` | `#EF4444` | `#F87171` |
| `--success` | `#10B981` | `#34D399` |
| `--grid-border` | `#344861` | `#475569` |
| `--cell-highlight` | `#BBDEFB` | `#1E3A5F` |
| `--cell-selected` | `#90CAF9` | `#1565C0` |
| `--cell-same-number` | `#C8E6C9` | `#1B5E20` |

## Acceptance Criteria

- [ ] AC1: Tất cả CSS variables được define trong `:root`
- [ ] AC2: Palette khớp với bảng màu trên
- [ ] AC3: Không có hardcoded color values trong các file CSS sau này — chỉ dùng `var(--token)`
