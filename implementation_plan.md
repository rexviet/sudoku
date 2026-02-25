# Sudoku Web App Clone — Implementation Plan

Clone các tính năng chính của [sudoku.com](https://sudoku.com/) thành một web app single-page chạy local bằng **Vite + vanilla JS + CSS**. Không cần backend — toàn bộ logic chạy client-side.

## Tổng quan tính năng

| Tính năng | Mô tả |
|---|---|
| **Puzzle Generator** | Tạo bảng Sudoku hợp lệ với thuật toán backtracking + loại bỏ ô |
| **6 mức độ khó** | Easy → Medium → Hard → Expert → Master → Extreme |
| **Bảng 9×9 tương tác** | Click chọn ô, highlight hàng/cột/box/số giống |
| **Number Pad** | Bàn phím số 1-9 trên giao diện |
| **Notes (Pencil)** | Ghi chú nhiều số vào 1 ô |
| **Undo / Erase** | Hoàn tác & xoá số |
| **Hint** | Gợi ý đáp án (giới hạn 3 lần/game) |
| **Mistakes** | Đếm lỗi, thua khi sai 3 lần |
| **Timer** | Đồng hồ đếm giờ, có nút pause |
| **Score** | Tính điểm dựa trên thời gian & lỗi |
| **Auto-save** | Lưu game vào localStorage |
| **Dark Mode** | Chuyển đổi giao diện sáng/tối |
| **Responsive** | Hỗ trợ mobile & desktop |
| **Win Celebration** | Modal chúc mừng + confetti khi hoàn thành |

---

## Cấu trúc Project

```
sudoku/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.js                 # Entry point
    ├── styles/
    │   ├── index.css           # Design tokens & global styles
    │   ├── header.css          # Header & nav
    │   ├── grid.css            # 9×9 grid styles
    │   ├── controls.css        # Number pad & game controls
    │   ├── modal.css           # Modals (win, new game, pause)
    │   └── dark-mode.css       # Dark mode overrides
    ├── engine/
    │   ├── generator.js        # Puzzle generation
    │   ├── solver.js           # Backtracking solver
    │   └── validator.js        # Move validation
    ├── game/
    │   ├── GameState.js        # State management
    │   ├── timer.js            # Timer logic
    │   ├── score.js            # Scoring system
    │   └── storage.js          # localStorage persistence
    └── ui/
        ├── Header.js           # Header component
        ├── DifficultyBar.js    # Difficulty selector
        ├── Grid.js             # 9×9 grid rendering
        ├── NumberPad.js        # Number pad 1-9
        ├── Controls.js         # Undo, Erase, Notes, Hint
        ├── StatsBar.js         # Mistakes, Score, Timer
        ├── Modal.js            # Win/Pause/NewGame modals
        └── ThemeToggle.js      # Dark mode toggle
```

---

## Proposed Changes

### Component 1: Project Foundation

#### [NEW] [package.json](file:///Users/macbook/Data/Projects/sudoku/package.json)
- Vite dev dependency, `dev` script

#### [NEW] [vite.config.js](file:///Users/macbook/Data/Projects/sudoku/vite.config.js)
- Minimal Vite config

#### [NEW] [index.html](file:///Users/macbook/Data/Projects/sudoku/index.html)
- HTML skeleton với semantic structure
- Google Font: **Inter** (hoặc Outfit)
- Meta tags cho SEO
- Đảm bảo có `<div id="app"></div>`

#### [NEW] [src/styles/index.css](file:///Users/macbook/Data/Projects/sudoku/src/styles/index.css)
- CSS custom properties (design tokens): colors, spacing, border-radius, shadows
- Color palette: xanh dương chủ đạo (`#3B82F6`), nền `#F0F4FF`, grid lines `#344861`
- Typography: font Inter, font sizes
- Reset & base styles

---

### Component 2: Sudoku Engine

#### [NEW] [src/engine/generator.js](file:///Users/macbook/Data/Projects/sudoku/src/engine/generator.js)
- `generateSolution()` — Tạo bảng Sudoku hoàn chỉnh (Fisher-Yates shuffle + backtracking)
- `generatePuzzle(difficulty)` — Loại bỏ ô từ solution, đảm bảo unique solution
- Số ô hiển thị theo difficulty:
  - Easy: 38-45 | Medium: 30-37 | Hard: 26-29
  - Expert: 22-25 | Master: 19-21 | Extreme: 17-18

#### [NEW] [src/engine/solver.js](file:///Users/macbook/Data/Projects/sudoku/src/engine/solver.js)
- `solve(board)` — Giải bằng backtracking
- `countSolutions(board, limit)` — Đếm số lời giải (dùng để verify unique solution)
- `getHint(board, solution)` — Trả về 1 ô đúng cho tính năng Hint

#### [NEW] [src/engine/validator.js](file:///Users/macbook/Data/Projects/sudoku/src/engine/validator.js)
- `isValidMove(board, row, col, num)` — Kiểm tra nước đi hợp lệ
- `isBoardComplete(board)` — Kiểm tra board đã hoàn thành
- `getConflicts(board, row, col)` — Trả về các ô xung đột

---

### Component 3: Game State Management

#### [NEW] [src/game/GameState.js](file:///Users/macbook/Data/Projects/sudoku/src/game/GameState.js)
- Class `GameState` quản lý toàn bộ state:
  - `board[][]` — Bảng hiện tại
  - `solution[][]` — Đáp án
  - `initial[][]` — Ô ban đầu (không thể sửa)
  - `notes[][][]` — Ghi chú
  - `history[]` — Stack undo
  - `mistakes`, `score`, `hints`, `difficulty`
  - `selectedCell`, `isNotesMode`
- Methods: `placeNumber()`, `erase()`, `undo()`, `toggleNotes()`, `useHint()`
- Event emitter pattern để notify UI khi state thay đổi

#### [NEW] [src/game/timer.js](file:///Users/macbook/Data/Projects/sudoku/src/game/timer.js)
- `Timer` class: start, pause, resume, reset, getFormatted

#### [NEW] [src/game/score.js](file:///Users/macbook/Data/Projects/sudoku/src/game/score.js)
- Tính điểm dựa trên difficulty + thời gian + số lỗi

#### [NEW] [src/game/storage.js](file:///Users/macbook/Data/Projects/sudoku/src/game/storage.js)
- Save/Load game state từ localStorage
- Auto-save sau mỗi nước đi

---

### Component 4: UI Components

#### [NEW] [src/ui/Header.js](file:///Users/macbook/Data/Projects/sudoku/src/ui/Header.js)
- Logo "Sudoku"
- Navigation links
- Theme toggle (dark/light)

#### [NEW] [src/ui/DifficultyBar.js](file:///Users/macbook/Data/Projects/sudoku/src/ui/DifficultyBar.js)
- 6 nút difficulty: Easy → Extreme
- Highlight active difficulty
- Click để đổi level → new game

#### [NEW] [src/ui/Grid.js](file:///Users/macbook/Data/Projects/sudoku/src/ui/Grid.js)
- Render bảng 9×9 bằng CSS Grid
- Highlighting logic:
  - Ô được chọn: background xanh đậm
  - Cùng hàng/cột/box: background xanh nhạt
  - Cùng số: background xanh trung bình
  - Ô sai: text đỏ
  - Ô gốc: font bold, không thể edit
- Click handler cho cell selection
- Keyboard support (arrow keys, number keys)

#### [NEW] [src/ui/NumberPad.js](file:///Users/macbook/Data/Projects/sudoku/src/ui/NumberPad.js)
- Grid 3×3 hoặc hàng ngang 9 nút
- Hiển thị count remaining cho mỗi số
- Dim/disable số đã đủ 9 lần

#### [NEW] [src/ui/Controls.js](file:///Users/macbook/Data/Projects/sudoku/src/ui/Controls.js)
- 4 nút tròn với icon SVG:
  - **Undo** ↩️ — Hoàn tác nước đi cuối
  - **Erase** 🗑️ — Xoá số ở ô đang chọn
  - **Notes** ✏️ — Toggle chế độ ghi chú (badge ON/OFF)
  - **Hint** 💡 — Điền đáp án (badge số hint còn lại)

#### [NEW] [src/ui/StatsBar.js](file:///Users/macbook/Data/Projects/sudoku/src/ui/StatsBar.js)
- Mistakes: `0/3` (đỏ khi gần thua)
- Score: số điểm
- Timer: `00:00` + nút pause ⏸️

#### [NEW] [src/ui/Modal.js](file:///Users/macbook/Data/Projects/sudoku/src/ui/Modal.js)
- **Win modal**: Confetti animation, thời gian, điểm, nút New Game
- **Pause modal**: Ẩn board, nút Resume
- **Game Over modal**: Khi sai 3 lần
- **New Game confirm**: Xác nhận bỏ game hiện tại

#### [NEW] CSS files cho từng component
- `header.css`, `grid.css`, `controls.css`, `modal.css`, `dark-mode.css`

---

### Component 5: Main Entry & Assembly

#### [NEW] [src/main.js](file:///Users/macbook/Data/Projects/sudoku/src/main.js)
- Import tất cả modules
- Khởi tạo GameState
- Render tất cả UI components
- Bind event listeners
- Load saved game hoặc start new game
- Setup keyboard shortcuts

---

## Design Chi Tiết

### Color Palette

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

### Grid Highlighting Rules
```
Khi chọn 1 ô (row=4, col=5, value=7):
├── Ô đang chọn      → --cell-selected (xanh đậm nhất)
├── Cùng hàng 4       → --cell-highlight (xanh nhạt)
├── Cùng cột 5        → --cell-highlight (xanh nhạt)
├── Cùng box 3×3      → --cell-highlight (xanh nhạt)
└── Tất cả ô có số 7  → --cell-same-number (xanh lá nhạt)
```

---

## Verification Plan

### Automated (Browser Testing)
Sẽ dùng browser subagent để verify:

1. **Render test**: Mở `http://localhost:5173`, kiểm tra grid 9×9 hiển thị đúng
2. **Click & input**: Click ô trống → click số → verify số xuất hiện
3. **Difficulty switch**: Click từng level, verify puzzle mới được tạo
4. **Notes mode**: Toggle notes → nhập số → verify hiển thị dạng nhỏ
5. **Undo**: Nhập số → undo → verify ô trống lại
6. **Mistake tracking**: Nhập sai → verify counter tăng
7. **Responsive**: Resize window → verify layout responsive
8. **Dark mode**: Toggle → verify theme thay đổi

### Manual Verification
Yêu cầu user kiểm tra:
1. Chạy `npm run dev` và mở browser
2. Chơi thử 1 game Easy hoàn chỉnh từ đầu đến khi thắng
3. Kiểm tra animations và transitions có mượt không
4. Test trên mobile browser (nếu có)
