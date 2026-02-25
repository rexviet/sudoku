# Tech Spec: Firebase Authentication & Cloud Sync

## 1. Overview
The goal is to replace/augment the local storage system with Firebase Authentication and Firestore database for persistent, cross-device game saves.

## 2. Tech Stack
- **Firebase Auth**: For user identification.
- **Firestore**: For storing game state JSON.
- **Firebase JS SDK**: Version 10+.

## 3. Database Schema (Firestore)
- **Collection**: `users`
  - **Document**: `{userId}`
    - `current_game`: {
        board: Array,
        solution: Array,
        initial: Array,
        notes: Array,
        mistakes: Number,
        score: Number,
        hintsRemaining: Number,
        difficulty: String,
        timerElapsed: Number,
        timestamp: Timestamp
      }
    - `stats`: {
        gamesWon: Number,
        totalTime: Number,
        bestScore: Number
      }

## 4. Implementation Plan
1. **Infrastructure**: Create `src/services/firebase.js` to initialize the app.
2. **Auth Layer**: Create `src/ui/AuthModal.js` and `src/services/authService.js`.
3. **Storage Layer**: Modify `src/game/storage.js` to detect if a user is logged in. If logged in, use `Firestore` instead of `localStorage`.
4. **Main Entry**: Update `src/main.js` to handle auth state changes and show/hide the Auth button.

## 5. Security Rules
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
