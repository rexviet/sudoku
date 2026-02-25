export class DifficultyBar {
  constructor(options = {}) {
    this.difficulties = ['Easy', 'Medium', 'Hard', 'Expert', 'Master', 'Extreme'];
    this.currentDifficulty = options.defaultDifficulty || 'Medium';
    this.onDifficultyChange = options.onDifficultyChange || (() => {});
    this.element = null;
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'difficulty-bar';

    this.difficulties.forEach(diff => {
      const button = document.createElement('button');
      button.className = 'difficulty-bar__button';
      button.textContent = diff;
      button.dataset.testid = `diff-btn-${diff.toLowerCase()}`;
      
      if (diff === this.currentDifficulty) {
        button.classList.add('difficulty-bar__button--active');
      }

      button.addEventListener('click', () => {
        this.setDifficulty(diff);
      });

      this.element.appendChild(button);
    });

    return this.element;
  }

  setDifficulty(difficulty, skipCallback = false) {
    if (this.currentDifficulty === difficulty && !skipCallback) return;

    this.currentDifficulty = difficulty;
    
    const buttons = this.element.querySelectorAll('.difficulty-bar__button');
    buttons.forEach(btn => {
      if (btn.textContent === difficulty) {
        btn.classList.add('difficulty-bar__button--active');
      } else {
        btn.classList.remove('difficulty-bar__button--active');
      }
    });

    if (!skipCallback) {
      this.onDifficultyChange(difficulty);
    }
  }

  getDifficulty() {
    return this.currentDifficulty;
  }
}
