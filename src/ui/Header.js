export class Header {
  constructor(options = {}) {
    this.onThemeToggle = options.onThemeToggle || (() => {});
    this.onLoginClick = options.onLoginClick || (() => {});
    this.onLogoutClick = options.onLogoutClick || (() => {});
    this.isDarkMode = false;
    this.isLoggedIn = false;
    this.userName = '';
    this.element = null;
  }

  render() {
    if (this.element) {
      this.element.innerHTML = this.getHTML();
    } else {
      this.element = document.createElement('header');
      this.element.className = 'header';
      this.element.innerHTML = this.getHTML();
    }
    
    this.bindEvents();
    return this.element;
  }

  getHTML() {
    return `
      <div class="header__logo">Sudoku</div>
      <div class="header__actions">
        ${this.isLoggedIn ? `
          <div class="header__user">
            <span class="user-email">${this.userName}</span>
            <button class="btn-logout" id="logout-btn">Logout</button>
          </div>
        ` : `
          <button class="btn-login" id="login-btn">Login</button>
        `}
        <button class="header__theme-toggle" aria-label="Toggle theme" data-testid="theme-toggle">
          ${this.isDarkMode ? this.getMoonIcon() : this.getSunIcon()}
        </button>
      </div>
    `;
  }

  bindEvents() {
    const themeToggle = this.element.querySelector('.header__theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    const loginBtn = this.element.querySelector('#login-btn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => this.onLoginClick());
    }

    const logoutBtn = this.element.querySelector('#logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.onLogoutClick());
    }
  }

  setLoggedIn(status, name = '') {
    this.isLoggedIn = status;
    this.userName = name;
    if (this.element) this.render();
  }

  getSunIcon() {
    return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/>
    </svg>`;
  }

  getMoonIcon() {
    return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
    </svg>`;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.onThemeToggle(this.isDarkMode);
    this.render();
  }

  setDarkMode(isDark) {
    this.isDarkMode = isDark;
    if (this.element) this.render();
  }
}
