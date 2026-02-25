export class Grid {
  constructor(options = {}) {
    this.onCellClick = options.onCellClick || (() => {});
    this.onNumberInput = options.onNumberInput || (() => {});
    this.onErase = options.onErase || (() => {});
    this.onUndo = options.onUndo || (() => {});
    this.onToggleNotes = options.onToggleNotes || (() => {});
    this.onMoveSelection = options.onMoveSelection || (() => {});
    this.board = [];
    this.initial = [];
    this.notes = [];
    this.selectedCell = null;
    this.element = null;
    this.cells = [];
    this.keydownHandler = null;
    this.prevBoard = null;
    this.prevNotes = null;
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'sudoku-grid';
    this.cells = [];

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cell = document.createElement('div');
        cell.className = 'sudoku-grid__cell';
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.dataset.testid = `cell-${row}-${col}`;

        cell.addEventListener('click', () => {
          this.onCellClick(row, col);
        });

        this.element.appendChild(cell);
        this.cells.push(cell);
      }
    }

    return this.element;
  }

  updateBoard(board, initial, notes) {
    this.board = board;
    this.initial = initial;
    this.notes = notes;
    this.renderCells();
  }

  renderCells() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const index = row * 9 + col;
        const cell = this.cells[index];
        const value = this.board[row][col];
        const prevValue = this.prevBoard?.[row]?.[col];
        const cellNotes = this.notes[row][col];
        const prevNotes = this.prevNotes?.[row]?.[col];

        const valueChanged = value !== prevValue;
        const notesChanged = JSON.stringify(cellNotes) !== JSON.stringify(prevNotes);

        if (!valueChanged && !notesChanged) continue;

        cell.className = 'sudoku-grid__cell';
        cell.innerHTML = '';

        if (value !== 0) {
          cell.textContent = value;
          if (this.initial[row][col] !== 0) {
            cell.classList.add('sudoku-grid__cell--initial', 'initial');
          } else {
            cell.classList.add('sudoku-grid__cell--user-placed');
          }
        } else if (cellNotes && cellNotes.length > 0) {
          const notesContainer = document.createElement('div');
          notesContainer.className = 'sudoku-grid__notes';
          
          for (let n = 1; n <= 9; n++) {
            const noteSpan = document.createElement('span');
            noteSpan.className = 'sudoku-grid__note';
            noteSpan.textContent = cellNotes.includes(n) ? n : '';
            notesContainer.appendChild(noteSpan);
          }
          
          cell.appendChild(notesContainer);
        }
      }
    }

    this.prevBoard = this.board.map(row => [...row]);
    this.prevNotes = this.notes.map(row => row.map(cell => [...cell]));
  }

  updateSelection(selectedCell) {
    this.selectedCell = selectedCell;
    this.updateHighlights();
  }

  updateHighlights() {
    this.cells.forEach(cell => {
      cell.classList.remove(
        'sudoku-grid__cell--selected',
        'sudoku-grid__cell--highlight',
        'sudoku-grid__cell--same-number'
      );
    });

    if (!this.selectedCell) return;

    const { row, col } = this.selectedCell;
    const selectedValue = this.board[row][col];

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const index = r * 9 + c;
        const cell = this.cells[index];

        if (r === row && c === col) {
          cell.classList.add('sudoku-grid__cell--selected');
        } else if (r === row || c === col) {
          cell.classList.add('sudoku-grid__cell--highlight');
        } else {
          const boxRow = Math.floor(row / 3) * 3;
          const boxCol = Math.floor(col / 3) * 3;
          if (r >= boxRow && r < boxRow + 3 && c >= boxCol && c < boxCol + 3) {
            cell.classList.add('sudoku-grid__cell--highlight');
          }
        }

        if (selectedValue !== 0 && this.board[r][c] === selectedValue) {
          cell.classList.add('sudoku-grid__cell--same-number');
        }
      }
    }
  }

  highlightError(row, col) {
    const index = row * 9 + col;
    const cell = this.cells[index];
    cell.classList.add('sudoku-grid__cell--error', 'sudoku-grid__cell--shake');
    setTimeout(() => {
      cell.classList.remove('sudoku-grid__cell--error', 'sudoku-grid__cell--shake');
    }, 500);
  }

  highlightHint(row, col) {
    const index = row * 9 + col;
    const cell = this.cells[index];
    cell.style.backgroundColor = 'var(--success)';
    setTimeout(() => {
      cell.style.backgroundColor = '';
    }, 500);
  }

  togglePause(isPaused, onResume) {
    if (isPaused) {
      if (this.pauseOverlay) return;
      
      this.cells.forEach(cell => {
        cell.classList.add('sudoku-grid__cell--paused');
      });
      
      this.pauseOverlay = document.createElement('div');
      this.pauseOverlay.className = 'sudoku-grid__pause-overlay sudoku-grid__overlay';
      this.pauseOverlay.innerHTML = `
        <button class="sudoku-grid__resume-btn sudoku-grid__play-btn" aria-label="Resume game">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      `;
      
      this.pauseOverlay.querySelector('.sudoku-grid__resume-btn').addEventListener('click', () => {
        if (onResume) onResume();
      });
      
      this.element.appendChild(this.pauseOverlay);
    } else {
      this.cells.forEach(cell => {
        cell.classList.remove('sudoku-grid__cell--paused');
      });
      if (this.pauseOverlay) {
        this.pauseOverlay.remove();
        this.pauseOverlay = null;
      }
    }
  }

  enableKeyboard() {
    if (this.keydownHandler) return;
    
    this.keydownHandler = (e) => this.handleKeydown(e);
    document.addEventListener('keydown', this.keydownHandler);
  }

  disableKeyboard() {
    if (this.keydownHandler) {
      document.removeEventListener('keydown', this.keydownHandler);
      this.keydownHandler = null;
    }
  }

  handleKeydown(e) {
    if (!this.selectedCell) {
      if (e.key >= '1' && e.key <= '9') {
        this.onMoveSelection(4, 4);
      }
      return;
    }

    const { row, col } = this.selectedCell;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        this.onMoveSelection(Math.max(0, row - 1), col);
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.onMoveSelection(Math.min(8, row + 1), col);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        this.onMoveSelection(row, Math.max(0, col - 1));
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.onMoveSelection(row, Math.min(8, col + 1));
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        e.preventDefault();
        this.onNumberInput(parseInt(e.key));
        break;
      case 'Backspace':
      case 'Delete':
        e.preventDefault();
        this.onErase();
        break;
      case 'z':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          this.onUndo();
        }
        break;
      case 'n':
      case 'N':
        e.preventDefault();
        this.onToggleNotes();
        break;
      default:
        break;
    }
  }
}
