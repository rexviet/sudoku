# Sudoku Web App — User Stories & Task Breakdown

> **Quy ước**: Mỗi US có **Priority** (P0 = must-have, P1 = should-have, P2 = nice-to-have), **Story Points** (1/2/3/5/8), và được sắp xếp theo thứ tự implement.

---

## Epic 1: Project Foundation

### US-1.1 — Khởi tạo dự án
**As a** developer, **I want** project được setup sẵn với Vite + vanilla JS **so that** tôi có thể bắt đầu develop ngay.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P0 | 1 | Không |

**Tasks:**
- [ ] T1: Khởi tạo project Vite với `npx create-vite@latest ./ --template vanilla`
- [ ] T2: Cấu hình `vite.config.js` (alias paths)
- [ ] T3: Tạo cấu trúc thư mục: `src/engine/`, `src/game/`, `src/ui/`, `src/styles/`
- [ ] T4: Import Google Font **Inter** trong `index.html`
- [ ] T5: Verify `npm run dev` chạy thành công trên `localhost:5173`

**Acceptance Criteria:**
- ✅ Chạy `npm run dev` → browser mở trang trắng, không lỗi console
- ✅ Cấu trúc thư mục đúng theo plan
- ✅ Font Inter được load thành công

---

### US-1.2 — Design System & Base Styles
**As a** developer, **I want** một design system với CSS variables **so that** toàn bộ UI nhất quán về màu sắc, spacing, typography.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P0 | 2 | US-1.1 |

**Tasks:**
- [ ] T1: Tạo `src/styles/index.css` với CSS custom properties (colors, spacing, radius, shadows)
- [ ] T2: Định nghĩa color palette cho Light mode (bg, accent, text, error, success, grid)
- [ ] T3: CSS reset & base typography (font-family, sizes, line-height)
- [ ] T4: Tạo utility classes cơ bản (flex, grid, spacing)

**Acceptance Criteria:**
- ✅ Tất cả CSS variables được define trong `:root`
- ✅ Palette khớp với bảng màu trong implementation plan
- ✅ Không có hardcoded color values trong các file CSS sau này — chỉ dùng `var(--token)`

---

## Epic 2: Sudoku Engine (Core Logic)

### US-2.1 — Thuật toán giải Sudoku
**As a** system, **I want** một solver hoạt động chính xác **so that** tôi có thể verify puzzles và cung cấp hints.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P0 | 3 | US-1.1 |

**Tasks:**
- [ ] T1: Implement `solve(board)` — giải bảng Sudoku bằng backtracking
- [ ] T2: Implement `countSolutions(board, limit)` — đếm số lời giải (dừng khi > limit)
- [ ] T3: Implement `getHint(board, solution)` — trả về `{row, col, value}` cho 1 ô trống ngẫu nhiên
- [ ] T4: Viết unit tests cho solver với các board mẫu

**Acceptance Criteria:**
- ✅ `solve()` giải đúng mọi valid Sudoku board
- ✅ `solve()` return `null` cho invalid board
- ✅ `countSolutions()` phân biệt được board có 1 hoặc nhiều lời giải
- ✅ `getHint()` luôn trả về giá trị đúng khớp với solution

---

### US-2.2 — Generator tạo puzzle
**As a** player, **I want** hệ thống tạo ra puzzles mới mỗi lần chơi **so that** tôi luôn có bài mới để giải.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P0 | 5 | US-2.1 |

**Tasks:**
- [ ] T1: Implement `generateSolution()` — tạo bảng Sudoku hoàn chỉnh hợp lệ (diagonal-first + backtracking)
- [ ] T2: Implement `generatePuzzle(difficulty)` — loại bỏ ô từ solution
- [ ] T3: Đảm bảo puzzle có **unique solution** (dùng `countSolutions`)
- [ ] T4: Cấu hình số ô hiển thị theo difficulty:

| Difficulty | Clues (ô hiển thị) |
|---|---|
| Easy | 38–45 |
| Medium | 30–37 |
| Hard | 26–29 |
| Expert | 22–25 |
| Master | 19–21 |
| Extreme | 17–18 |

- [ ] T5: Đảm bảo thời gian generate < 2 giây ở mọi difficulty

**Acceptance Criteria:**
- ✅ Mỗi lần gọi `generatePuzzle()` → puzzle mới khác nhau
- ✅ Mọi puzzle đều có đúng 1 lời giải
- ✅ Số clues nằm trong range quy định cho từng difficulty
- ✅ Performance: generate xong trong < 2s (kể cả Extreme)

---

### US-2.3 — Validation nước đi
**As a** player, **I want** hệ thống kiểm tra nước đi **so that** tôi biết khi nào mình đặt sai số.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P0 | 2 | US-2.1 |

**Tasks:**
- [ ] T1: Implement `isValidMove(board, row, col, num)` — check hàng, cột, box 3×3
- [ ] T2: Implement `isBoardComplete(board)` — kiểm tra đã điền đủ & đúng
- [ ] T3: Implement `getConflicts(board, row, col)` — trả về danh sách ô xung đột

**Acceptance Criteria:**
- ✅ `isValidMove()` phát hiện đúng mọi vi phạm hàng/cột/box
- ✅ `isBoardComplete()` chỉ return `true` khi board hoàn chỉnh & valid
- ✅ `getConflicts()` trả về đúng tất cả ô xung đột

---

## Epic 3: Game State Management

### US-3.1 — Quản lý trạng thái game
**As a** system, **I want** một state manager tập trung **so that** mọi thay đổi game đều qua 1 nơi duy nhất, đảm bảo consistency.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P0 | 5 | US-2.2, US-2.3 |

**Tasks:**
- [ ] T1: Tạo class `GameState` với properties: `board`, `solution`, `initial`, `notes`, `history`, `mistakes`, `score`, `hintsRemaining`, `difficulty`, `selectedCell`, `isNotesMode`
- [ ] T2: Implement `newGame(difficulty)` — generate puzzle mới & reset state
- [ ] T3: Implement `selectCell(row, col)` — set selected cell
- [ ] T4: Implement `placeNumber(num)` — đặt số vào selected cell (kiểm tra valid, cập nhật mistakes)
- [ ] T5: Implement `erase()` — xoá số ở selected cell (chỉ user-placed numbers)
- [ ] T6: Implement `undo()` — pop từ history stack & revert
- [ ] T7: Implement `toggleNotes()` — chuyển đổi chế độ notes
- [ ] T8: Implement `placeNote(num)` — thêm/xoá note ở selected cell
- [ ] T9: Implement `useHint()` — auto-fill 1 ô đúng, giảm hintsRemaining
- [ ] T10: Implement event system (`on`, `emit`) để notify UI khi state thay đổi

**Acceptance Criteria:**
- ✅ `placeNumber()` → push vào history, emit event `'update'`
- ✅ `placeNumber()` vào ô initial → bị reject (không thay đổi gì)
- ✅ `placeNumber()` sai → tăng `mistakes`, emit `'mistake'`
- ✅ `mistakes >= 3` → emit `'gameover'`
- ✅ Board hoàn thành → emit `'win'`
- ✅ `undo()` khi history rỗng → không lỗi, không thay đổi gì
- ✅ `useHint()` khi `hintsRemaining = 0` → bị reject
- ✅ Notes mode: nhập số → thêm note nhỏ thay vì đặt số chính

---

### US-3.2 — Timer
**As a** player, **I want** đồng hồ đếm giờ chơi **so that** tôi biết mình giải puzzle trong bao lâu.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P0 | 2 | US-1.1 |

**Tasks:**
- [ ] T1: Tạo class `Timer` với methods: `start()`, `pause()`, `resume()`, `reset()`, `getElapsed()`
- [ ] T2: `getFormatted()` → return string `"MM:SS"` hoặc `"HH:MM:SS"` nếu > 1h
- [ ] T3: Emit event `'tick'` mỗi giây để UI update

**Acceptance Criteria:**
- ✅ Timer bắt đầu khi game bắt đầu
- ✅ `pause()` → dừng đếm, `resume()` → tiếp tục chính xác
- ✅ Format đúng: `"05:23"`, `"1:02:30"`
- ✅ `reset()` → quay về `"00:00"`

---

### US-3.3 — Tính điểm
**As a** player, **I want** được tính điểm sau khi hoàn thành puzzle **so that** tôi có mục tiêu để cải thiện.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P1 | 2 | US-3.2 |

**Tasks:**
- [ ] T1: Thiết kế công thức scoring: `baseScore(difficulty) - timePenalty - mistakePenalty`
- [ ] T2: Implement `calculateScore(difficulty, elapsedSeconds, mistakes)`
- [ ] T3: Base scores: Easy=500, Medium=750, Hard=1000, Expert=1500, Master=2000, Extreme=3000

**Acceptance Criteria:**
- ✅ Difficulty cao → điểm base cao hơn
- ✅ Thời gian càng lâu → điểm càng giảm
- ✅ Mỗi mistake → trừ điểm cố định
- ✅ Điểm tối thiểu = 0 (không âm)

---

### US-3.4 — Auto-save & Load
**As a** player, **I want** game tự lưu tiến trình **so that** tôi có thể tắt browser và quay lại chơi tiếp.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P1 | 3 | US-3.1 |

**Tasks:**
- [ ] T1: Implement `saveGame(gameState)` — serialize & lưu vào `localStorage`
- [ ] T2: Implement `loadGame()` — đọc từ `localStorage` & deserialize
- [ ] T3: Implement `hasSavedGame()` — kiểm tra có game đang lưu không
- [ ] T4: Implement `clearSave()` — xoá game đã lưu
- [ ] T5: Auto-save trigger: sau mỗi `placeNumber`, `erase`, `undo`, `useHint`
- [ ] T6: Lưu cả timer elapsed time

**Acceptance Criteria:**
- ✅ Refresh browser → game load lại đúng trạng thái trước đó
- ✅ Board, notes, history, mistakes, score, timer — tất cả được khôi phục
- ✅ Bắt đầu New Game → xoá save cũ
- ✅ Không crash nếu localStorage bị corrupted → fallback tạo game mới

---

## Epic 4: UI — Layout & Static Components

### US-4.1 — Header & Navigation
**As a** player, **I want** thấy header với logo và navigation **so that** tôi nhận diện đây là Sudoku app.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P0 | 2 | US-1.2 |

**Tasks:**
- [ ] T1: Render header với logo text "Sudoku" (styled, không cần ảnh)
- [ ] T2: Nút theme toggle (icon mặt trời / mặt trăng)
- [ ] T3: Tạo `src/styles/header.css`
- [ ] T4: Header responsive: trên mobile thu gọn phù hợp

**Acceptance Criteria:**
- ✅ Logo hiển thị rõ ở mọi kích thước màn hình
- ✅ Theme toggle button hiển thị đúng icon theo theme hiện tại
- ✅ Header không che khuất game area

---

### US-4.2 — Thanh chọn độ khó (Difficulty Bar)
**As a** player, **I want** chọn mức độ khó trước khi chơi **so that** tôi có thể chơi puzzle phù hợp trình độ.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P0 | 2 | US-1.2 |

**Tasks:**
- [ ] T1: Render 6 nút ngang: Easy, Medium, Hard, Expert, Master, Extreme
- [ ] T2: Highlight nút active (background accent color)
- [ ] T3: Click nút → trigger callback `onDifficultyChange(level)`
- [ ] T4: Responsive: trên mobile nhỏ → scrollable hoặc 2 hàng

**Acceptance Criteria:**
- ✅ Luôn có đúng 1 nút active
- ✅ Click nút khác → active chuyển sang nút mới
- ✅ Trên mobile: tất cả 6 nút vẫn accessible (không bị ẩn)

---

### US-4.3 — Bảng Sudoku 9×9
**As a** player, **I want** thấy bảng Sudoku 9×9 đẹp mắt **so that** tôi có trải nghiệm chơi tốt.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P0 | 5 | US-1.2 |

**Tasks:**
- [ ] T1: Render grid 9×9 bằng CSS Grid (81 cells)
- [ ] T2: Border dày cho box 3×3, border mỏng cho cells
- [ ] T3: Hiển thị số trong ô (số gốc: bold + màu đậm, số user: màu nhạt hơn)
- [ ] T4: Hiển thị notes (tối đa 9 số nhỏ trong 1 ô, layout grid 3×3 mini)
- [ ] T5: Click cell → gọi callback `onCellClick(row, col)`
- [ ] T6: Tạo `src/styles/grid.css`
- [ ] T7: Grid responsive: scale theo viewport, giữ tỉ lệ vuông

**Acceptance Criteria:**
- ✅ Grid là hình vuông ở mọi kích thước màn hình
- ✅ Viền box 3×3 dày hơn rõ rệt so với viền cell
- ✅ Phân biệt rõ số gốc vs số user-placed (font-weight hoặc color)
- ✅ Notes hiển thị dạng grid nhỏ 3×3 trong cell, không bị tràn
- ✅ Click vào cell → callback được gọi với đúng row, col

---

### US-4.4 — Number Pad (Bàn phím số)
**As a** player, **I want** bàn phím số 1-9 trên màn hình **so that** tôi có thể nhập số bằng click/tap.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P0 | 3 | US-1.2 |

**Tasks:**
- [ ] T1: Render 9 nút số (layout: hàng ngang hoặc grid 3×3)
- [ ] T2: Hiển thị count remaining cho mỗi số (bao nhiêu ô còn cần số đó)
- [ ] T3: Khi 1 số đã xuất hiện đủ 9 lần trên board → dim/disable nút đó
- [ ] T4: Click nút → gọi callback `onNumberClick(num)`
- [ ] T5: Tạo styles trong `src/styles/controls.css`

**Acceptance Criteria:**
- ✅ 9 nút hiển thị số 1-9
- ✅ Count remaining hiển thị chính xác & update real-time khi board thay đổi
- ✅ Nút bị dim khi số đó đã đủ 9 lần
- ✅ Click nút dim → không trigger callback
- ✅ Kích thước nút đủ lớn để tap trên mobile (min 44×44px)

---

### US-4.5 — Game Controls (Undo, Erase, Notes, Hint)
**As a** player, **I want** 4 nút điều khiển game **so that** tôi có thể hoàn tác, xoá, ghi chú, và nhận gợi ý.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P0 | 3 | US-1.2 |

**Tasks:**
- [ ] T1: Render 4 nút tròn với icon SVG inline: Undo ↩, Erase 🗑, Notes ✏, Hint 💡
- [ ] T2: Nút Notes có badge "ON/OFF" hiển thị trạng thái hiện tại
- [ ] T3: Nút Hint có badge số hints còn lại (vd: "3")
- [ ] T4: Click mỗi nút → gọi callback tương ứng
- [ ] T5: Label text dưới mỗi icon

**Acceptance Criteria:**
- ✅ 4 nút hiển thị rõ icon + label
- ✅ Badge Notes toggle giữa "ON" (có màu accent) và "OFF"
- ✅ Badge Hint hiển thị số chính xác, đổi màu cảnh báo khi còn 1
- ✅ Hover/active states rõ ràng

---

### US-4.6 — Stats Bar (Mistakes, Score, Timer)
**As a** player, **I want** thấy thống kê game **so that** tôi biết trạng thái hiện tại.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P0 | 2 | US-1.2 |

**Tasks:**
- [ ] T1: Render 3 stats ngang: Mistakes `0/3`, Score `0`, Timer `00:00`
- [ ] T2: Nút pause ⏸ bên cạnh Timer
- [ ] T3: Mistakes đổi màu đỏ khi ≥ 2
- [ ] T4: Update methods cho từng stat

**Acceptance Criteria:**
- ✅ 3 stats luôn hiển thị, layout không bị vỡ
- ✅ Mistakes hiện format `X/3`
- ✅ Timer tự chạy, cập nhật mỗi giây
- ✅ Nút pause toggle giữa ⏸ và ▶

---

## Epic 5: UI — Interactions & Game Flow

### US-5.1 — Cell Selection & Highlighting
**As a** player, **I want** khi click vào 1 ô thì highlight row/col/box/same number **so that** tôi dễ nhìn thấy context.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P0 | 3 | US-4.3, US-3.1 |

**Tasks:**
- [ ] T1: Click cell → cập nhật `selectedCell` trong GameState
- [ ] T2: Apply CSS class highlight lên ô đang chọn (đậm nhất)
- [ ] T3: Highlight tất cả ô cùng hàng (nhạt)
- [ ] T4: Highlight tất cả ô cùng cột (nhạt)
- [ ] T5: Highlight tất cả ô cùng box 3×3 (nhạt)
- [ ] T6: Highlight tất cả ô có cùng số (màu khác biệt, vd: xanh lá nhạt)
- [ ] T7: Ô sai (conflict) → border hoặc text đỏ

**Acceptance Criteria:**
- ✅ Click ô → 4 loại highlight hiển thị đồng thời, phân biệt rõ
- ✅ Click ô khác → highlight cũ bị xoá, highlight mới xuất hiện
- ✅ Click ô trống (chưa có số) → không highlight "same number"
- ✅ Transition mượt khi chuyển highlight

---

### US-5.2 — Nhập số & Notes
**As a** player, **I want** click number pad để điền số (hoặc ghi chú) **so that** tôi có thể giải puzzle.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P0 | 3 | US-5.1, US-4.4 |

**Tasks:**
- [ ] T1: Normal mode: click number → `gameState.placeNumber(num)`
- [ ] T2: Notes mode: click number → `gameState.placeNote(num)` (toggle note)
- [ ] T3: Nếu number đúng → hiển thị bình thường
- [ ] T4: Nếu number sai → hiển thị màu đỏ + tăng mistake counter
- [ ] T5: Auto-remove notes: khi đặt số chính vào ô → xoá note ở ô đó, xoá note cùng số ở cùng hàng/cột/box
- [ ] T6: Không cho nhập vào ô initial (gốc)

**Acceptance Criteria:**
- ✅ Normal mode: nhập số → số lớn xuất hiện trong ô
- ✅ Notes mode: nhập số → số nhỏ toggle ON/OFF trong ô
- ✅ Nhập sai → ô đỏ, mistakes tăng, emit event
- ✅ Nhập đúng số cuối cùng → trigger win check
- ✅ Auto-remove notes hoạt động đúng khi đặt số chính

---

### US-5.3 — Undo & Erase
**As a** player, **I want** hoàn tác hoặc xoá nước đi **so that** tôi có thể sửa sai.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P0 | 2 | US-5.2 |

**Tasks:**
- [ ] T1: Click Undo → `gameState.undo()` → revert ô về trạng thái trước
- [ ] T2: Click Erase → `gameState.erase()` → xoá số/notes ở selected cell
- [ ] T3: Không cho erase ô initial
- [ ] T4: UI update real-time sau undo/erase

**Acceptance Criteria:**
- ✅ Undo revert chính xác nước đi cuối (cả number & notes)
- ✅ Undo nhiều lần liên tiếp → revert từng bước đúng thứ tự
- ✅ Erase ô initial → không thay đổi gì
- ✅ Erase ô trống → không thay đổi gì, không lỗi

---

### US-5.4 — Hint
**As a** player, **I want** nhận gợi ý **so that** tôi có thể vượt qua chỗ khó.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P1 | 2 | US-5.2 |

**Tasks:**
- [ ] T1: Click Hint → auto-select 1 ô trống → điền đáp án đúng
- [ ] T2: Giảm `hintsRemaining` (mặc định: 3)
- [ ] T3: Nếu đã hết hint → disable nút hoặc show thông báo
- [ ] T4: Hint count trên badge update real-time

**Acceptance Criteria:**
- ✅ Hint điền đúng giá trị từ solution
- ✅ Badge giảm sau mỗi lần dùng
- ✅ Khi `hintsRemaining = 0` → nút Hint bị dim, click không hoạt động
- ✅ Ô được hint fill không thể undo (optional: tuỳ quyết định)

---

### US-5.5 — Timer & Pause
**As a** player, **I want** pause game **so that** tôi có thể tạm dừng mà không mất thời gian.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P1 | 2 | US-3.2, US-4.6 |

**Tasks:**
- [ ] T1: Click pause → timer dừng, board bị ẩn (overlay)
- [ ] T2: Hiển thị overlay "Game Paused" với nút Resume
- [ ] T3: Click Resume → timer tiếp tục, board hiện lại
- [ ] T4: Timer display update mỗi giây

**Acceptance Criteria:**
- ✅ Pause → board ẩn hoàn toàn (không cho nhìn trộm)
- ✅ Timer dừng chính xác, resume tiếp tục từ điểm dừng
- ✅ Icon toggle đúng (⏸ ↔ ▶)

---

### US-5.6 — Keyboard Input
**As a** player, **I want** dùng bàn phím để chơi **so that** tôi chơi nhanh hơn trên desktop.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P1 | 3 | US-5.2 |

**Tasks:**
- [ ] T1: Arrow keys (↑↓←→) để di chuyển selected cell
- [ ] T2: Phím 1-9 → nhập số (hoặc note nếu đang notes mode)
- [ ] T3: Backspace / Delete → erase
- [ ] T4: Ctrl+Z → undo
- [ ] T5: Phím N → toggle notes mode

**Acceptance Criteria:**
- ✅ Arrow keys di chuyển đúng hướng, không vượt biên grid
- ✅ Phím số hoạt động giống click number pad
- ✅ Shortcuts không conflict với browser shortcuts
- ✅ Keyboard input bị disable khi game paused

---

## Epic 6: Modals & Game Flow

### US-6.1 — New Game Flow
**As a** player, **I want** bắt đầu game mới **so that** tôi có thể chơi puzzle khác.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P0 | 3 | US-3.1, US-4.2 |

**Tasks:**
- [ ] T1: Click difficulty khi đang chơi → show confirm modal "Bạn muốn bỏ game hiện tại?"
- [ ] T2: Click "New Game" button → show confirm nếu đang chơi, hoặc tạo game mới
- [ ] T3: Confirm → `gameState.newGame(difficulty)`, reset UI, start timer
- [ ] T4: Lần đầu load app (không có save) → auto start game Easy
- [ ] T5: Lần đầu load app (có save) → load saved game

**Acceptance Criteria:**
- ✅ Có confirm dialog khi đang chơi dở → tránh mất tiến trình
- ✅ New game → board mới, timer reset, mistakes reset, score reset
- ✅ Load app lần đầu → có game sẵn để chơi ngay

---

### US-6.2 — Win Celebration
**As a** player, **I want** được chúc mừng khi hoàn thành puzzle **so that** tôi cảm thấy thành tựu.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P0 | 3 | US-5.2 |

**Tasks:**
- [ ] T1: Khi board hoàn thành (`gameover` event với win=true) → show Win Modal
- [ ] T2: Win Modal hiển thị: 🎉 animation, difficulty, thời gian, điểm số, số mistakes
- [ ] T3: Confetti animation (CSS particles hoặc canvas)
- [ ] T4: Nút "New Game" trong modal
- [ ] T5: Timer dừng khi win

**Acceptance Criteria:**
- ✅ Modal xuất hiện ngay khi điền đúng ô cuối cùng
- ✅ Hiển thị đúng stats (time, score, mistakes)
- ✅ Confetti animation chạy mượt, không giật
- ✅ Click "New Game" → đóng modal, bắt đầu game mới

---

### US-6.3 — Game Over (Thua)
**As a** player, **I want** biết khi nào tôi thua **so that** tôi có thể bắt đầu lại.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P0 | 2 | US-5.2 |

**Tasks:**
- [ ] T1: Khi `mistakes >= 3` → show Game Over Modal
- [ ] T2: Modal hiển thị: thông báo thua, số lỗi, thời gian
- [ ] T3: Nút "Try Again" (chơi lại cùng puzzle) & "New Game" (puzzle mới)

**Acceptance Criteria:**
- ✅ Modal xuất hiện ngay khi mistake thứ 3
- ✅ "Try Again" → reset mistakes & timer nhưng giữ puzzle
- ✅ "New Game" → puzzle hoàn toàn mới

---

## Epic 7: Polish & UX Enhancement

### US-7.1 — Dark Mode
**As a** player, **I want** chuyển sang dark mode **so that** tôi chơi thoải mái trong điều kiện thiếu sáng.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P1 | 3 | US-4.1 |

**Tasks:**
- [ ] T1: Tạo `src/styles/dark-mode.css` — override tất cả CSS variables khi `[data-theme="dark"]`
- [ ] T2: Click theme toggle → toggle attribute `data-theme` trên `<html>`
- [ ] T3: Lưu preference vào `localStorage`
- [ ] T4: Load lần đầu → check `prefers-color-scheme` của OS
- [ ] T5: Transition mượt khi chuyển theme (0.3s)

**Acceptance Criteria:**
- ✅ Tất cả elements đổi đúng màu khi switch theme
- ✅ Không có element nào bị "lạc" (vẫn giữ màu light trong dark mode)
- ✅ Theme persist khi refresh
- ✅ Respect OS theme preference lần đầu

---

### US-7.2 — Responsive Design
**As a** player, **I want** chơi được trên mobile **so that** tôi chơi ở bất cứ đâu.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P1 | 3 | Tất cả UI components |

**Tasks:**
- [ ] T1: Desktop (≥1024px): Grid bên trái, controls bên phải (layout hiện tại)
- [ ] T2: Tablet (768-1023px): Grid trên, controls dưới (stacked)
- [ ] T3: Mobile (< 768px): Full-width, grid scale theo viewport, controls compact
- [ ] T4: Touch targets ≥ 44×44px cho tất cả interactive elements
- [ ] T5: Viewport meta tag cho mobile

**Acceptance Criteria:**
- ✅ Grid luôn là hình vuông & centered ở mọi breakpoint
- ✅ Không bị scroll ngang ở bất kỳ kích thước nào
- ✅ Tất cả nút/cell đủ lớn để tap bằng ngón tay
- ✅ Layout chuyển đổi mượt giữa các breakpoint

---

### US-7.3 — Micro-animations & Transitions
**As a** player, **I want** giao diện có animations mượt **so that** trải nghiệm chơi premium.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P2 | 3 | Tất cả UI components |

**Tasks:**
- [ ] T1: Cell highlight transition (fade 0.15s)
- [ ] T2: Number appear animation (scale từ 0 → 1, 0.2s ease-out)
- [ ] T3: Mistake shake animation (cell rung nhẹ khi nhập sai)
- [ ] T4: Button hover/active effects (scale, shadow)
- [ ] T5: Modal appear/disappear (fade + slide up, 0.3s)
- [ ] T6: Confetti animation cho win screen
- [ ] T7: `prefers-reduced-motion` → tắt tất cả animation

**Acceptance Criteria:**
- ✅ Animations không gây giật lag
- ✅ Mỗi interaction có feedback visual
- ✅ `prefers-reduced-motion: reduce` → tất cả animation bị skip
- ✅ Animations không cản trở gameplay

---

## Epic 8: Assembly & Integration

### US-8.1 — Kết nối toàn bộ
**As a** developer, **I want** tất cả components kết nối hoạt động cùng nhau **so that** game chạy end-to-end.

| Priority | Story Points | Dependencies |
|----------|-------------|--------------|
| P0 | 5 | Tất cả US trước đó |

**Tasks:**
- [ ] T1: `src/main.js` — import & khởi tạo tất cả modules
- [ ] T2: Wire GameState events → UI updates (state change → re-render affected components)
- [ ] T3: Wire UI callbacks → GameState methods (click → action)
- [ ] T4: Init flow: check saved game → load hoặc generate new → render → start timer
- [ ] T5: Bind keyboard events
- [ ] T6: Setup auto-save listeners
- [ ] T7: Smoke test end-to-end: chơi 1 game hoàn chỉnh

**Acceptance Criteria:**
- ✅ Mở app → game ready to play ngay lập tức
- ✅ Click cell → number pad → số xuất hiện → stats update → tất cả sync
- ✅ Win/Lose → modal đúng → new game → fresh state
- ✅ Refresh → game restored đúng
- ✅ Không có console errors

---

## Tổng kết

| Metric | Value |
|---|---|
| **Tổng User Stories** | 20 |
| **Tổng Story Points** | 56 |
| **P0 (Must-have)** | 14 US (39 SP) |
| **P1 (Should-have)** | 5 US (14 SP) |
| **P2 (Nice-to-have)** | 1 US (3 SP) |

### Thứ tự implement đề xuất

```mermaid
graph TD
    A[US-1.1 Project Setup] --> B[US-1.2 Design System]
    A --> C[US-2.1 Solver]
    C --> D[US-2.2 Generator]
    C --> E[US-2.3 Validator]
    D --> F[US-3.1 GameState]
    E --> F
    B --> G[US-4.1 Header]
    B --> H[US-4.2 Difficulty Bar]
    B --> I[US-4.3 Grid]
    B --> J[US-4.4 Number Pad]
    B --> K[US-4.5 Controls]
    B --> L[US-4.6 Stats Bar]
    A --> M[US-3.2 Timer]
    F --> N[US-5.1 Selection & Highlight]
    I --> N
    N --> O[US-5.2 Input & Notes]
    J --> O
    O --> P[US-5.3 Undo & Erase]
    O --> Q[US-5.4 Hint]
    O --> R[US-5.6 Keyboard]
    M --> S[US-5.5 Timer & Pause]
    L --> S
    F --> T[US-6.1 New Game Flow]
    H --> T
    O --> U[US-6.2 Win]
    O --> V[US-6.3 Game Over]
    F --> W[US-3.4 Auto-save]
    M --> X[US-3.3 Score]
    G --> Y[US-7.1 Dark Mode]
    U --> Z[US-7.3 Animations]
    V --> Z
    Z --> AA[US-7.2 Responsive]
    AA --> AB[US-8.1 Integration]
    T --> AB
    W --> AB
    Y --> AB
