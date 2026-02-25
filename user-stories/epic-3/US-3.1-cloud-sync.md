# US-3.1: Sync Progress with Firebase

## Description
Modify the existing auto-save logic to store data in Firestore/Realtime Database under the authenticated User ID.

## Acceptance Criteria
1. When a user is logged in, `autoSave()` writes to Firebase.
2. Game state is retrieved from Firebase upon login.
3. Guests still use `localStorage` until authenticated.

## Gherkin
```gherkin
Feature: Cloud Sync
  Scenario: Sync data after login
    Given a user has guest progress in localStorage
    When they successfully log in
    Then their progress should be uploaded to Firebase
```
