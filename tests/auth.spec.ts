import { test, expect } from '@playwright/test';

test.describe('Firebase Authentication & UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('QA-1: Login button should be visible in header', async ({ page }) => {
    const loginBtn = page.locator('#login-btn');
    await expect(loginBtn).toBeVisible();
    await expect(loginBtn).toContainText('Login');
  });

  test('QA-2: Clicking login should open the Auth Modal', async ({ page }) => {
    await page.locator('#login-btn').click();
    
    const modal = page.locator('.auth-modal');
    await expect(modal).toBeVisible();
    await expect(modal.locator('h2')).toContainText('Login to Sync Progress');
  });

  test('QA-3: Should be able to switch between Login and Signup', async ({ page }) => {
    await page.locator('#login-btn').click();
    
    // Switch to Sign Up
    await page.locator('#toggle-auth').click();
    await expect(page.locator('#auth-title')).toContainText('Create an Account');
    
    // Switch back to Login
    await page.locator('#toggle-auth').click();
    await expect(page.locator('#auth-title')).toContainText('Login to Sync Progress');
  });

  test('QA-4: Should close the modal when clicking X', async ({ page }) => {
    await page.locator('#login-btn').click();
    await page.locator('#close-auth').click();
    
    const modal = page.locator('.auth-modal');
    await expect(modal).not.toBeVisible();
  });

  test('QA-5: Should show Google Login option', async ({ page }) => {
    await page.locator('#login-btn').click();
    const googleBtn = page.locator('#google-login');
    await expect(googleBtn).toBeVisible();
    await expect(googleBtn).toContainText('Continue with Google');
  });

  test('QA-6: Firestore Save - Should NOT log "Nested arrays not supported" error', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        errors.push(msg.text());
      }
    });

    // Trigger a move which triggers autoSave
    // Wait for grid to be ready
    await page.waitForSelector('[data-testid^="cell-"]');
    const cell = page.locator('[data-testid^="cell-"]').first();
    await cell.click();
    await page.keyboard.press('1');

    // Give it a moment to attempt Firestore save
    await page.waitForTimeout(1000);

    // Filter for the specific Firebase error we fixed
    const nestedArrayError = errors.find(e => e.includes('Nested arrays are not supported'));
    expect(nestedArrayError, 'Should not have nested array error in console').toBeUndefined();
  });

  test('QA-7: Score should be updated real-time and saved in auto-save', async ({ page }) => {
    // Wait for game to load
    await page.waitForSelector('[data-testid^="cell-"]');
    
    // Initial score should be displayed in StatsBar
    const statsScore = page.locator('[data-testid="score"]');
    
    // Wait for timer to tick and score to change (it starts at base score and decreases by time penalty)
    // We wait for score to be visible and updated
    await expect(statsScore).not.toHaveText('0');
    const initialScoreText = await statsScore.textContent();
    const initialScore = Number(initialScoreText);

    // Make a move to trigger autoSave
    const cell = page.locator('[data-testid^="cell-"]:not(.initial)').first();
    await cell.click();
    await page.keyboard.press('1');

    // Wait for save to hit localStorage (as proxy for Firestore)
    await page.waitForTimeout(1000);
    
    const savedScore = await page.evaluate(() => {
      const raw = localStorage.getItem('sudoku_save');
      return raw ? JSON.parse(raw).score : -1;
    });

    // Score in DB should match (or be very close to) UI score and NOT be 0
    expect(savedScore).toBeGreaterThan(0);
    expect(Math.abs(savedScore - initialScore)).toBeLessThan(60); // Allowance for 1-2 penalty ticks + 1 potential mistake (50pts)
  });
});
