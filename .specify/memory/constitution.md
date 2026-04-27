<!-- Sync Impact Report
Version change: 1.0.0 → 1.1.0
List of modified principles: None
Added sections: Principle V. Continuous & Helpful Documentation
Removed sections: None
Templates requiring updates: None currently
Follow-up TODOs: None
-->
# Mizan Constitution

## Core Principles

### I. Reusable Components First
Before building any new UI element, always check if a reusable component already exists. If a new component must be built, design it to be highly reusable across the project. 

### II. Separation of UI and Logic
Code must be strictly split into View (UI) components and Logic (Custom Hooks/Utility) components. Avoid cluttering UI components with complex state management or business logic.

### III. Clean and Modular Code
Code must be clean, concise, and modular. Files should never become too large. Whenever a file grows too complex, break it down into smaller, highly-focused files.

### IV. Theme-Driven Styling
Always use existing colors defined in the project theme. Strictly decrease the number of custom or hardcoded colors used. If a color is needed, rely on the established design system palette first.

### V. Continuous & Helpful Documentation
Whenever a business rule or feature changes, the corresponding documentation MUST be updated simultaneously. Documentation must be designed to be extremely helpful for future developers by explicitly explaining **WHY** a decision was made and **HOW** the system works under the hood.

## Development Standards

- **TypeScript Strictness**: Ensure strong typing for all components and logic.
- **Modern Web Design**: Implement visually excellent, responsive, and dynamic user interfaces.
- **Performance**: Always optimize for speed, reducing cumulative layout shifts (CLS) and optimizing renders.

## Governance

This Constitution supersedes all other practices in the Mizan application. All pull requests, code reviews, and new features must comply with these core principles. Complexity must always be justified.

**Version**: 1.1.0 | **Ratified**: 2026-04-26 | **Last Amended**: 2026-04-27
