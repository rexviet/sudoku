import './styles/main.css';
import './styles/header.css';
import './styles/difficulty-bar.css';
import './styles/grid.css';
import './styles/controls.css';
import './styles/stats-bar.css';
import './styles/modal.css';
import './styles/number-pad.css';

import { Header, DifficultyBar, Grid, NumberPad, Controls, StatsBar, Modal } from '@ui/index.js';
import { GameState, Timer, calculateScore } from '@game/index.js';
import { saveGame, loadGame, hasSavedGame, clearSave } from '@game/storage.js';
import { AuthModal } from '@ui/AuthModal.js';
import { subscribeToAuthChanges, logout } from './services/authService';
import './styles/auth-modal.css';

class SudokuApp {
  constructor() {
    this.gameState = new GameState();
    this.timer = new Timer();
    this.isPaused = false;
    this.isGameInProgress = false;
    
    this.initComponents();
    this.initTheme();
    this.bindEvents();

    // Initialize Auth Listener
    subscribeToAuthChanges((user) => {
      this.handleAuthStateChange(user);
    });
  }

  initTheme() {
    const savedTheme = localStorage.getItem('sudoku_theme');
    let isDark;
    
    if (savedTheme) {
      isDark = savedTheme === 'dark';
    } else {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    this.header.setDarkMode(isDark);
  }

  async initGame() {
    const savedGame = await loadGame();
    if (savedGame) {
      this.loadSavedGame(savedGame);
    } else {
      this.startNewGame();
    }
  }

  handleAuthStateChange(user) {
    if (user) {
      console.log("Logged in as:", user.email);
      this.header.setLoggedIn(true, user.email || user.displayName);
    } else {
      console.log("Logged out");
      this.header.setLoggedIn(false);
    }
    
    // Re-init game to sync from cloud if needed
    this.initGame();
  }

  loadSavedGame(savedGame) {
    this.gameState.board = savedGame.board;
    this.gameState.solution = savedGame.solution;
    this.gameState.initial = savedGame.initial;
    this.gameState.notes = savedGame.notes;
    this.gameState.history = savedGame.history;
    this.gameState.mistakes = savedGame.mistakes;
    this.gameState.score = savedGame.score;
    this.gameState.hintsRemaining = savedGame.hintsRemaining;
    this.gameState.difficulty = savedGame.difficulty;
    this.gameState.selectedCell = savedGame.selectedCell;
    this.gameState.isNotesMode = savedGame.isNotesMode;
    
    this.difficultyBar.setDifficulty(savedGame.difficulty, true);
    this.timer.setElapsed(savedGame.timerElapsed);
    this.timer.resume();
    this.isPaused = false;
    this.isGameInProgress = true;
    this.statsBar.togglePause(false);
    this.grid.enableKeyboard();
    
    this.handleGameUpdate(this.gameState.getState());
  }

  autoSave() {
    const timerElapsed = this.timer.getElapsed();
    saveGame(this.gameState.getFullState(), timerElapsed);
  }

  initComponents() {
    this.header = new Header({
      onThemeToggle: (isDark) => this.handleThemeToggle(isDark),
      onLoginClick: () => this.handleLoginClick(),
      onLogoutClick: () => this.handleLogoutClick()
    });

    this.difficultyBar = new DifficultyBar({
      defaultDifficulty: 'Medium',
      onDifficultyChange: (diff) => this.handleDifficultyChange(diff)
    });

    this.grid = new Grid({
      onCellClick: (row, col) => this.handleCellClick(row, col),
      onNumberInput: (num) => this.handleNumberClick(num),
      onErase: () => this.handleErase(),
      onUndo: () => this.handleUndo(),
      onToggleNotes: () => this.handleToggleNotes(),
      onMoveSelection: (row, col) => this.gameState.selectCell(row, col)
    });

    this.numberPad = new NumberPad({
      onNumberClick: (num) => this.handleNumberClick(num)
    });

    this.controls = new Controls({
      onUndo: () => this.handleUndo(),
      onErase: () => this.handleErase(),
      onToggleNotes: () => this.handleToggleNotes(),
      onHint: () => this.handleHint()
    });

    this.statsBar = new StatsBar({
      onPauseToggle: () => this.handlePauseToggle()
    });

    this.modal = new Modal();
    this.modal.render();

    const app = document.querySelector('#app');
    app.appendChild(this.header.render());
    app.appendChild(this.difficultyBar.render());
    app.appendChild(this.statsBar.render());
    const gameLayout = document.createElement('div');
    gameLayout.className = 'game-layout';
    
    gameLayout.appendChild(this.grid.render());
    
    const gameControls = document.createElement('div');
    gameControls.className = 'game-controls-wrapper';
    gameControls.appendChild(this.numberPad.render());
    gameControls.appendChild(this.controls.render());
    gameLayout.appendChild(gameControls);

    app.appendChild(gameLayout);
  }

  bindEvents() {
    this.gameState.on('update', (state) => {
      const elapsedSeconds = Math.floor(this.timer.getElapsed() / 1000);
      const currentScore = calculateScore(state.difficulty, elapsedSeconds, state.mistakes);
      this.gameState.score = currentScore;
      
      this.handleGameUpdate(this.gameState.getState());
      if (this.isGameInProgress) {
        this.autoSave();
      }
    });
    this.gameState.on('mistake', (data) => this.handleMistake(data));
    this.gameState.on('select', (cell) => this.handleSelection(cell));
    this.gameState.on('toggleNotes', (isNotesMode) => this.controls.updateNotesMode(isNotesMode));
    this.gameState.on('hint', (data) => this.handleHintUsed(data));
    this.gameState.on('win', () => this.handleWin());
    this.gameState.on('gameover', () => this.handleGameOver());
    this.gameState.on('newGame', () => {
      this.isGameInProgress = true;
    });

    this.gameState.on('loading', (isLoading) => {
      document.querySelector('#app').classList.toggle('app--loading', isLoading);
    });

    this.timer.on('tick', (elapsed) => {
      if (!this.isPaused) {
        this.statsBar.updateTime(this.timer.getFormatted());
        
        // Update score in real-time based on elapsed time
        const state = this.gameState.getState();
        const currentScore = calculateScore(state.difficulty, Math.floor(elapsed / 1000), state.mistakes);
        this.gameState.score = currentScore;
        this.statsBar.updateScore(currentScore);
      }
    });
  }

  startNewGame() {
    clearSave();
    const difficulty = this.difficultyBar.getDifficulty();
    this.isGameInProgress = true;
    this.gameState.newGame(difficulty);
    this.timer.reset();
    this.timer.start();
    this.isPaused = false;
    this.statsBar.togglePause(false);
    this.grid.enableKeyboard();
  }

  handleGameUpdate(state) {
    this.grid.updateBoard(state.board, state.initial, state.notes);
    this.grid.updateSelection(state.selectedCell);
    this.numberPad.updateBoard(state.board);
    this.controls.updateHints(state.hintsRemaining);
    this.statsBar.updateMistakes(state.mistakes);
    this.statsBar.updateScore(state.score);
  }

  handleMistake(data) {
    this.statsBar.updateMistakes(data.mistakes);
    if (this.gameState.selectedCell) {
      this.grid.highlightError(this.gameState.selectedCell.row, this.gameState.selectedCell.col);
    }
  }

  handleSelection(cell) {
    this.grid.updateSelection(cell);
  }

  handleCellClick(row, col) {
    this.gameState.selectCell(row, col);
  }

  handleNumberClick(num) {
    const state = this.gameState.getState();
    if (state.isNotesMode) {
      this.gameState.placeNote(num);
    } else {
      this.gameState.placeNumber(num);
    }
  }

  handleUndo() {
    this.gameState.undo();
  }

  handleErase() {
    this.gameState.erase();
  }

  handleToggleNotes() {
    this.gameState.toggleNotes();
  }

  handleHint() {
    this.gameState.useHint();
  }

  handleHintUsed(data) {
    this.grid.highlightHint(data.row, data.col);
  }

  handlePauseToggle() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.timer.pause();
      this.grid.disableKeyboard();
      this.grid.togglePause(true, () => {
        this.handlePauseToggle();
      });
    } else {
      this.timer.resume();
      this.grid.enableKeyboard();
      this.grid.togglePause(false);
    }
    this.statsBar.togglePause(this.isPaused);
  }

  handleDifficultyChange(diff) {
    if (this.isGameInProgress) {
      const state = this.gameState.getState();
      const hasUserInput = state.board.some(row => row.some(cell => cell !== 0 && state.initial[row.indexOf(cell)] === 0));
      
      if (hasUserInput) {
        this.modal.showConfirm(
          'New Game?',
          'You have unsaved progress. Do you want to start a new game?',
          () => {
            this.difficultyBar.setDifficulty(diff);
            this.startNewGame();
          }
        );
        return;
      }
    }
    
    this.difficultyBar.setDifficulty(diff);
    this.startNewGame();
  }

  handleThemeToggle(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('sudoku_theme', isDark ? 'dark' : 'light');
  }

  handleLoginClick() {
    const authModal = new AuthModal();
    authModal.show();
  }

  handleLogoutClick() {
    this.modal.showConfirm(
      'Logout?',
      'Your current game will stay synced to this account. Logout anyway?',
      async () => {
        await logout();
      }
    );
  }

  async handleWin() {
    this.timer.pause();
    this.grid.disableKeyboard();
    this.isGameInProgress = false;
    
    // Calculate final score
    const state = this.gameState.getState();
    const elapsedSeconds = Math.floor(this.timer.getElapsed() / 1000);
    const score = calculateScore(state.difficulty, elapsedSeconds, state.mistakes);
    this.gameState.score = score;
    this.statsBar.updateScore(score);

    // Await clearSave to prevent autoSave race condition
    await clearSave();
    
    this.modal.showWin({
      time: this.timer.getFormatted(),
      score: score,
      mistakes: state.mistakes,
      difficulty: state.difficulty
    }, () => {
      this.startNewGame();
    });
  }

  async handleGameOver() {
    this.timer.pause();
    this.grid.disableKeyboard();
    this.isGameInProgress = false;
    
    // Await clearSave to prevent autoSave race condition
    await clearSave();
    
    const state = this.gameState.getState();
    
    this.modal.showGameOver({
      time: this.timer.getFormatted(),
      mistakes: state.mistakes,
      maxMistakes: state.maxMistakes,
      difficulty: state.difficulty
    }, () => {
      this.gameState.retry();
      this.timer.reset();
      this.timer.start();
      this.isPaused = false;
      this.statsBar.togglePause(false);
      this.grid.enableKeyboard();
      this.isGameInProgress = true;
      this.autoSave();
    }, () => {
      this.startNewGame();
    });
  }
}

const app = new SudokuApp();

if (import.meta.env.MODE !== 'production') {
  window.app = app;
}
