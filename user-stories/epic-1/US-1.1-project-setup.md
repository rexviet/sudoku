# US-1.1 — Khởi tạo dự án

| Field | Value |
|---|---|
| **Epic** | 1 — Project Foundation |
| **Priority** | P0 (must-have) |
| **Story Points** | 1 |
| **Dependencies** | Không |

## User Story

**As a** developer, **I want** project được setup sẵn với Vite + vanilla JS **so that** tôi có thể bắt đầu develop ngay.

## Tasks

- [ ] T1: Khởi tạo project Vite với `npx create-vite@latest ./ --template vanilla`
- [ ] T2: Cấu hình `vite.config.js` (alias paths)
- [ ] T3: Tạo cấu trúc thư mục: `src/engine/`, `src/game/`, `src/ui/`, `src/styles/`
- [ ] T4: Import Google Font **Inter** trong `index.html`
- [ ] T5: Verify `npm run dev` chạy thành công trên `localhost:5173`

## Acceptance Criteria

- [ ] AC1: Chạy `npm run dev` → browser mở trang trắng, không lỗi console
- [ ] AC2: Cấu trúc thư mục đúng theo plan
- [ ] AC3: Font Inter được load thành công
