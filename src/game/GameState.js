import { generatePuzzle } from '@engine/index.js';
import { isValidMove, isBoardComplete } from '@engine/index.js';
import { getHint as getSolverHint } from '@engine/index.js';

export class GameState {
  constructor() {
    this.board = [];
    this.solution = [];
    this.initial = [];
    this.notes = [];
    this.history = [];
    this.mistakes = 0;
    this.score = 0;
    this.hintsRemaining = 3;
    this.difficulty = 'Medium';
    this.selectedCell = null;
    this.isNotesMode = false;
    this.listeners = {};
    this.maxMistakes = 3;
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (!this.listeners[event]) return;
    const index = this.listeners[event].indexOf(callback);
    if (index > -1) {
      this.listeners[event].splice(index, 1);
    }
  }

  emit(event, data) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(callback => callback(data));
  }

  newGame(difficulty = 'Medium') {
    this.difficulty = difficulty;
    this.emit('loading', true);

    const worker = new Worker(new URL('@engine/generator.worker.js', import.meta.url), { type: 'module' });
    worker.postMessage({ difficulty });
    worker.onmessage = (e) => {
      this._applyNewGame(e.data);
      this.emit('loading', false);
      worker.terminate();
    };
  }

  _applyNewGame(game) {
    this.board = game.puzzle.map(row => [...row]);
    this.solution = game.solution.map(row => [...row]);
    this.initial = game.puzzle.map(row => [...row]);
    this.notes = Array(9).fill(null).map(() => Array(9).fill(null).map(() => []));
    this.history = [];
    this.mistakes = 0;
    this.score = 0;
    this.hintsRemaining = 3;
    this.selectedCell = null;
    this.isNotesMode = false;

    this.emit('update', this.getState());
    this.emit('newGame', this.getState());
  }

  retry() {
    this.board = this.initial.map(row => [...row]);
    this.notes = Array(9).fill(null).map(() => Array(9).fill(null).map(() => []));
    this.history = [];
    this.mistakes = 0;
    this.selectedCell = null;
    this.isNotesMode = false;

    this.emit('update', this.getState());
    this.emit('retry', this.getState());
  }

  selectCell(row, col) {
    if (row < 0 || row > 8 || col < 0 || col > 8) {
      this.selectedCell = null;
    } else {
      this.selectedCell = { row, col };
    }
    this.emit('select', this.selectedCell);
  }

  placeNumber(num) {
    if (!this.selectedCell) return false;
    if (num < 1 || num > 9) return false;

    const { row, col } = this.selectedCell;
    
    if (this.initial[row][col] !== 0) {
      return false;
    }

    const isCorrect = this.solution[row][col] === num;

    const previousValue = this.board[row][col];
    const previousNotes = this.notes[row][col].slice();

    this.history.push({
      type: 'place',
      row,
      col,
      previousValue,
      previousNotes: previousNotes.slice(),
      isNotesMode: false
    });

    this.board[row][col] = num;
    this.notes[row][col] = [];

    if (!isCorrect) {
      this.mistakes++;
      this.emit('mistake', { mistakes: this.mistakes, maxMistakes: this.maxMistakes });
      
      if (this.mistakes >= this.maxMistakes) {
        this.emit('gameover', this.getState());
        return true;
      }
    }

    this.emit('update', this.getState());

    if (isBoardComplete(this.board)) {
      if (this.isBoardValid()) {
        this.emit('win', this.getState());
      }
    }

    return true;
  }

  isBoardValid() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.board[row][col] !== this.solution[row][col]) {
          return false;
        }
      }
    }
    return true;
  }

  erase() {
    if (!this.selectedCell) return false;

    const { row, col } = this.selectedCell;
    
    if (this.initial[row][col] !== 0) {
      return false;
    }

    if (this.board[row][col] === 0 && this.notes[row][col].length === 0) {
      return false;
    }

    const previousValue = this.board[row][col];
    const previousNotes = this.notes[row][col].slice();

    this.history.push({
      type: 'erase',
      row,
      col,
      previousValue,
      previousNotes: previousNotes.slice(),
      isNotesMode: false
    });

    this.board[row][col] = 0;
    this.notes[row][col] = [];

    this.emit('update', this.getState());
    return true;
  }

  undo() {
    if (this.history.length === 0) return false;

    const lastAction = this.history.pop();
    const { row, col, previousValue, previousNotes } = lastAction;

    this.board[row][col] = previousValue;
    this.notes[row][col] = previousNotes;

    this.emit('update', this.getState());
    return true;
  }

  toggleNotes() {
    this.isNotesMode = !this.isNotesMode;
    this.emit('toggleNotes', this.isNotesMode);
  }

  placeNote(num) {
    if (!this.selectedCell) return false;
    if (num < 1 || num > 9) return false;

    const { row, col } = this.selectedCell;
    
    if (this.initial[row][col] !== 0) {
      return false;
    }

    const noteIndex = this.notes[row][col].indexOf(num);
    const previousNotes = this.notes[row][col].slice();

    if (noteIndex > -1) {
      this.notes[row][col].splice(noteIndex, 1);
    } else {
      this.notes[row][col].push(num);
    }

    this.history.push({
      type: 'note',
      row,
      col,
      previousValue: this.board[row][col],
      previousNotes,
      isNotesMode: true
    });

    this.emit('update', this.getState());
    return true;
  }

  useHint() {
    if (this.hintsRemaining <= 0) return false;

    const emptyCells = [];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.board[row][col] === 0) {
          emptyCells.push({ row, col });
        }
      }
    }

    if (emptyCells.length === 0) return false;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { row, col } = emptyCells[randomIndex];
    const correctValue = this.solution[row][col];

    this.board[row][col] = correctValue;
    this.notes[row][col] = [];
    this.hintsRemaining--;

    this.emit('hint', { row, col, value: correctValue, hintsRemaining: this.hintsRemaining });
    this.emit('update', this.getState());

    if (isBoardComplete(this.board)) {
      if (this.isBoardValid()) {
        this.emit('win', this.getState());
      }
    }

    return true;
  }

  getState() {
    return {
      board: this.board.map(row => [...row]),
      initial: this.initial.map(row => [...row]),
      notes: this.notes.map(row => row.map(cell => [...cell])),
      mistakes: this.mistakes,
      score: this.score,
      hintsRemaining: this.hintsRemaining,
      difficulty: this.difficulty,
      selectedCell: this.selectedCell ? { ...this.selectedCell } : null,
      isNotesMode: this.isNotesMode,
      maxMistakes: this.maxMistakes
    };
  }

  getFullState() {
    return {
      ...this.getState(),
      solution: this.solution.map(row => [...row]),
      history: this.history.slice(),
    };
  }
}
