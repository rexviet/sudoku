import { loginWithEmail, registerWithEmail, loginWithGoogle, logout } from "../services/authService";

export class AuthModal {
  constructor(onAuthSuccess) {
    this.onAuthSuccess = onAuthSuccess;
    this.element = null;
    this.isLogin = true;
  }

  show() {
    this.render();
    document.body.appendChild(this.element);
    this.element.querySelector('#email').focus();
  }

  close() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'modal-overlay auth-modal modal-overlay--visible';
    this.element.innerHTML = `
      <div class="modal-content">
        <button class="modal-close" id="close-auth">&times;</button>
        <h2 id="auth-title">${this.isLogin ? 'Login to Sync Progress' : 'Create an Account'}</h2>
        <form id="auth-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" required placeholder="email@example.com">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" required placeholder="••••••••">
          </div>
          <button type="submit" class="btn-primary">${this.isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <div class="divider"><span>OR</span></div>
        <button id="google-login" class="btn-google">
           Continue with Google
        </button>
        <p class="auth-switch">
          ${this.isLogin ? "Don't have an account?" : "Already have an account?"}
          <a href="#" id="toggle-auth">${this.isLogin ? 'Sign Up' : 'Login'}</a>
        </p>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    this.element.querySelector('#close-auth').addEventListener('click', () => this.close());
    this.element.querySelector('#toggle-auth').addEventListener('click', (e) => {
      e.preventDefault();
      this.isLogin = !this.isLogin;
      this.close();
      this.show();
    });

    this.element.querySelector('#google-login').addEventListener('click', async () => {
      try {
        await loginWithGoogle();
        this.close();
        if (this.onAuthSuccess) this.onAuthSuccess();
      } catch (err) {
        alert(err.message);
      }
    });

    this.element.querySelector('#auth-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = this.element.querySelector('#email').value;
      const password = this.element.querySelector('#password').value;
      
      try {
        if (this.isLogin) {
          await loginWithEmail(email, password);
        } else {
          await registerWithEmail(email, password);
        }
        this.close();
        if (this.onAuthSuccess) this.onAuthSuccess();
      } catch (err) {
        alert(err.message);
      }
    });
  }
}
