# QA Test Plan: Firebase Authentication

## 1. Functional Testing
- **FT-1: Login Modal Visibility**
  - Verify that clicking the "Login" button opens the Auth Modal.
- **FT-2: Google Login**
  - Verify that clicking "Continue with Google" triggers the Firebase Popup (manual check usually, mocked in E2E).
- **FT-3: Email Login/Signup**
  - Verify that a user can create an account and log in.
- **FT-4: Cloud Sync**
  - Verify that game progress made while logged in is saved to Firestore.
  - Verify that logging out and logging in on another "device" (clean localStorage) restores the game state.
- **FT-5: Data Integrity (Nested Arrays)**
  - Verify that complex objects (9x9 board) are correctly serialized into a JSON string before being sent to Firestore (to avoid "nested arrays not supported" error).
- **FT-6: Permission Handling**
  - Verify that if Firestore returns a 403 (Permission Denied), the app doesn't crash and falls back/notifies the user suitably (graceful failure).

## 2. Regression Testing
- **RT-1: Guest Mode**
  - Verify that users who are NOT logged in can still play and save locally via `localStorage`.
- **RT-2: Offline Support**
  - Verify that the game still works if Firebase fails to load (fallback to local).

## 3. Automation Plan (Playwright)
- Add a new spec `tests/auth.spec.ts`.
- Mock Firebase Auth calls to test UI transitions.
- Verify "Login" button transforms to "User Email" + "Logout".
- **Mock Firestore**: Use Playwright's `page.addInitScript` to mock `firebase/firestore` calls and verify that `setDoc` only receives primitive/stringified data for the `game_data_json` field.
