# US-2.1: Authentication Modal

## Description
Create a premium, dark-mode compatible modal for user authentication (Login/Signup).

## Acceptance Criteria
1. Modal includes fields for Email and Password.
2. Modal includes a "Continue with Google" button.
3. Modal validates email format before submission.
4. Modal is responsive and follows the project's design system.

## Gherkin
```gherkin
Feature: Auth Modal UI
  Scenario: User opens auth modal
    Given the user is on the main page
    When they click on the "Login" button
    Then the Auth Modal should appear with Email/Password fields
```
