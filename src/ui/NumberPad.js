export class NumberPad {
  constructor(options = {}) {
    this.onNumberClick = options.onNumberClick || (() => {});
    this.board = [];
    this.element = null;
    this.buttons = [];
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'number-pad';
    this.buttons = [];

    for (let num = 1; num <= 9; num++) {
      const button = document.createElement('button');
      button.className = 'number-pad__button';
      button.dataset.number = num;
      button.dataset.testid = `num-btn-${num}`;
      
      const countSpan = document.createElement('span');
      countSpan.className = 'number-pad__count';
      countSpan.textContent = '9';
      
      button.textContent = num;
      button.appendChild(countSpan);

      button.addEventListener('click', () => {
        if (!button.disabled) {
          this.onNumberClick(num);
        }
      });

      this.element.appendChild(button);
      this.buttons.push({ button, countSpan, num });
    }

    return this.element;
  }

  updateBoard(board) {
    this.board = board;
    this.updateCounts();
  }

  updateCounts() {
    const counts = {};
    for (let n = 1; n <= 9; n++) {
      counts[n] = 0;
    }

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const value = this.board[row][col];
        if (value !== 0 && counts[value] !== undefined) {
          counts[value]++;
        }
      }
    }

    this.buttons.forEach(({ button, countSpan, num }) => {
      const remaining = 9 - counts[num];
      countSpan.textContent = remaining;
      
      if (remaining === 0) {
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    });
  }
}
