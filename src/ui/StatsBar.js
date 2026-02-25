export class StatsBar {
  constructor(options = {}) {
    this.onPauseToggle = options.onPauseToggle || (() => {});
    this.mistakes = 0;
    this.maxMistakes = 3;
    this.score = 0;
    this.time = '00:00';
    this.isPaused = false;
    this.element = null;
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'stats-bar';
    this.element.dataset.testid = 'stats-bar';
    this.element.innerHTML = `
      <div class="stats-bar__item">
        <span class="stats-bar__label">Mistakes</span>
        <span class="stats-bar__value" data-stat="mistakes" data-testid="mistakes">0/${this.maxMistakes}</span>
      </div>
      <div class="stats-bar__item">
        <span class="stats-bar__label">Score</span>
        <span class="stats-bar__value" data-stat="score" data-testid="score">0</span>
      </div>
      <div class="stats-bar__item">
        <span class="stats-bar__label">Time</span>
        <div class="stats-bar__timer">
          <span class="stats-bar__value" data-stat="time" data-testid="timer">00:00</span>
          <button class="stats-bar__pause-btn" data-action="pause" aria-label="Pause" data-testid="btn-pause">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          </button>
        </div>
      </div>
    `;

    this.element.querySelector('[data-action="pause"]').addEventListener('click', () => {
      this.onPauseToggle();
    });

    return this.element;
  }

  updateMistakes(count) {
    this.mistakes = count;
    const valueEl = this.element.querySelector('[data-stat="mistakes"]');
    valueEl.textContent = `${count}/${this.maxMistakes}`;
    
    if (count >= 2) {
      valueEl.classList.add('stats-bar__value--warning');
    } else {
      valueEl.classList.remove('stats-bar__value--warning');
    }
  }

  updateScore(score) {
    this.score = score;
    const valueEl = this.element.querySelector('[data-stat="score"]');
    valueEl.textContent = score;
  }

  updateTime(timeString) {
    this.time = timeString;
    const valueEl = this.element.querySelector('[data-stat="time"]');
    valueEl.textContent = timeString;
  }

  togglePause(isPaused) {
    this.isPaused = isPaused;
    const button = this.element.querySelector('[data-action="pause"]');
    button.innerHTML = isPaused ? this.getPlayIcon() : this.getPauseIcon();
  }

  getPauseIcon() {
    return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
    </svg>`;
  }

  getPlayIcon() {
    return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5v14l11-7z"/>
    </svg>`;
  }
}
