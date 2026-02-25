export class Modal {
  constructor() {
    this.element = null;
    this.overlay = null;
  }

  render() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'modal-overlay';
    
    this.element = document.createElement('div');
    this.element.className = 'modal';
    
    this.overlay.appendChild(this.element);
    document.body.appendChild(this.overlay);

    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.hide();
      }
    });

    return this.overlay;
  }

  show() {
    this.overlay.classList.add('modal-overlay--visible');
  }

  hide() {
    this.overlay.classList.remove('modal-overlay--visible');
    this.clearConfetti();
  }

  showConfirm(title, message, onConfirm, onCancel) {
    this.element.innerHTML = `
      <div class="modal__title">${title}</div>
      <p class="modal__message">${message}</p>
      <div class="modal__buttons">
        <button class="modal__button modal__button--secondary" data-action="cancel">Cancel</button>
        <button class="modal__button modal__button--primary" data-action="confirm">Confirm</button>
      </div>
    `;

    this.element.querySelector('[data-action="cancel"]').addEventListener('click', () => {
      this.hide();
      if (onCancel) onCancel();
    });

    this.element.querySelector('[data-action="confirm"]').addEventListener('click', () => {
      this.hide();
      if (onConfirm) onConfirm();
    });

    this.show();
  }

  showWin(stats, onNewGame) {
    this.clearConfetti();
    
    this.element.innerHTML = `
      <div class="modal__icon">🎉</div>
      <div class="modal__title modal__title--win">Congratulations!</div>
      <div class="modal__content">
        <div class="modal__stats">
          <div class="modal__stat">
            <span class="modal__stat-label">Difficulty</span>
            <span class="modal__stat-value">${stats.difficulty}</span>
          </div>
          <div class="modal__stat">
            <span class="modal__stat-label">Time</span>
            <span class="modal__stat-value">${stats.time}</span>
          </div>
          <div class="modal__stat">
            <span class="modal__stat-label">Score</span>
            <span class="modal__stat-value">${stats.score}</span>
          </div>
          <div class="modal__stat">
            <span class="modal__stat-label">Mistakes</span>
            <span class="modal__stat-value">${stats.mistakes}</span>
          </div>
        </div>
      </div>
      <div class="modal__buttons">
        <button class="modal__button modal__button--primary" data-action="new-game">New Game</button>
      </div>
    `;

    this.element.querySelector('[data-action="new-game"]').addEventListener('click', () => {
      this.hide();
      if (onNewGame) onNewGame();
    });

    this.show();
    this.createConfetti();
  }

  showGameOver(stats, onRetry, onNewGame) {
    this.element.innerHTML = `
      <div class="modal__icon">😔</div>
      <div class="modal__title modal__title--lose">Game Over</div>
      <div class="modal__content">
        <p class="modal__message">Too many mistakes!</p>
        <div class="modal__stats">
          <div class="modal__stat">
            <span class="modal__stat-label">Difficulty</span>
            <span class="modal__stat-value">${stats.difficulty}</span>
          </div>
          <div class="modal__stat">
            <span class="modal__stat-label">Time</span>
            <span class="modal__stat-value">${stats.time}</span>
          </div>
          <div class="modal__stat">
            <span class="modal__stat-label">Mistakes</span>
            <span class="modal__stat-value">${stats.mistakes}/${stats.maxMistakes}</span>
          </div>
        </div>
      </div>
      <div class="modal__buttons">
        <button class="modal__button modal__button--secondary" data-action="retry">Try Again</button>
        <button class="modal__button modal__button--primary" data-action="new-game">New Game</button>
      </div>
    `;

    this.element.querySelector('[data-action="retry"]').addEventListener('click', () => {
      this.hide();
      if (onRetry) onRetry();
    });

    this.element.querySelector('[data-action="new-game"]').addEventListener('click', () => {
      this.hide();
      if (onNewGame) onNewGame();
    });

    this.show();
  }

  createConfetti() {
    const colors = ['blue', 'green', 'yellow', 'red', 'purple'];
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = `confetti confetti--${colors[Math.floor(Math.random() * colors.length)]}`;
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDelay = `${Math.random() * 2}s`;
      confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
      this.element.appendChild(confetti);
    }
  }

  clearConfetti() {
    const confettis = this.element.querySelectorAll('.confetti');
    confettis.forEach(c => c.remove());
  }
}
