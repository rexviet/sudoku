export class Controls {
  constructor(options = {}) {
    this.onUndo = options.onUndo || (() => {});
    this.onErase = options.onErase || (() => {});
    this.onToggleNotes = options.onToggleNotes || (() => {});
    this.onHint = options.onHint || (() => {});
    this.hintsRemaining = 3;
    this.isNotesMode = false;
    this.element = null;
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'game-controls';
    this.element.innerHTML = `
      <button class="game-controls__button" data-action="undo" aria-label="Undo" data-testid="btn-undo">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>
        </svg>
        <span class="game-controls__label">Undo</span>
      </button>
      <button class="game-controls__button" data-action="erase" aria-label="Erase" data-testid="btn-erase">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
        </svg>
        <span class="game-controls__label">Erase</span>
      </button>
      <button class="game-controls__button" data-action="notes" aria-label="Notes" data-testid="btn-notes">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        </svg>
        <span class="game-controls__label">Notes</span>
        <span class="game-controls__badge" data-badge="notes">OFF</span>
      </button>
      <button class="game-controls__button" data-action="hint" aria-label="Hint" data-testid="btn-hint">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
        </svg>
        <span class="game-controls__label">Hint</span>
        <span class="game-controls__badge" data-badge="hint">3</span>
      </button>
    `;

    this.element.querySelector('[data-action="undo"]').addEventListener('click', () => this.onUndo());
    this.element.querySelector('[data-action="erase"]').addEventListener('click', () => this.onErase());
    this.element.querySelector('[data-action="notes"]').addEventListener('click', () => this.onToggleNotes());
    this.element.querySelector('[data-action="hint"]').addEventListener('click', () => this.onHint());

    return this.element;
  }

  updateHints(count) {
    this.hintsRemaining = count;
    const badge = this.element?.querySelector('[data-badge="hint"]');
    if (badge) {
      badge.textContent = count;
      if (count === 1) {
        badge.classList.add('game-controls__badge--warning');
      } else {
        badge.classList.remove('game-controls__badge--warning');
      }
    }
  }

  updateNotesMode(isNotesMode) {
    this.isNotesMode = isNotesMode;
    const badge = this.element?.querySelector('[data-badge="notes"]');
    if (badge) {
      badge.textContent = isNotesMode ? 'ON' : 'OFF';
      if (isNotesMode) {
        badge.classList.add('game-controls__badge--notes-on');
      } else {
        badge.classList.remove('game-controls__badge--notes-on');
      }
    }
  }
}
