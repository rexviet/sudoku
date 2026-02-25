# US-1.1: Firebase Initialization

## Description
Initialize the Firebase SDK in the project and configure the necessary environment variables.

## Acceptance Criteria
1. Firebase SDK is installed as a dependency.
2. `firebaseConfig` is stored in a secure `.env` file or vite config.
3. A singleton `firebaseApp` instance is exported for use across the application.

## Gherkin
```gherkin
Feature: Firebase SDK Initialization
  Scenario: Successfully initialize Firebase
    Given the application is starting
    When the firebaseConfig is valid
    Then the Firebase app should be initialized successfully
```
