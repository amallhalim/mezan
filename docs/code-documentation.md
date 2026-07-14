# 📝 Code Documentation Guidelines

This guide details the conventions and standards for documenting code in the **Mizan Health Suite** project. Following these guidelines ensures that the codebase remains maintainable, easy to debug, and friendly to new contributors.

---

## 🎯 Goal

Write code that another developer (or your future self) can understand without asking questions. Good documentation improves onboarding, simplifies debugging, makes code reviews easier, and enables rich IDE autocomplete and hover information.

---

## 💡 Core Principles

### 1. Prioritize Clean Code Over Comments

Always choose descriptive, clear names for variables, functions, and components over comments explaining obscure logic. Clean code requires fewer comments.

#### ❌ Bad

```tsx
const d = new Date();
const x = d.getTime();

function calc(a, b) {
  return a * b;
}
```

#### ✅ Better

```tsx
const currentDate = new Date();
const currentTimestamp = currentDate.getTime();

function calculateDiscount(price: number, discount: number) {
  return price * discount;
}
```

---

### 2. Comment the "Why", Not the "What"

Use inline comments only to explain complex logic, non-obvious business rules, or performance workarounds. Do not describe the obvious mechanics of the code.

#### ❌ Bad

```tsx
// Increment i
i++;
```

#### ✅ Better

```tsx
// We sort bookings here because Firestore cannot combine these filters with an orderBy clause.
const sortedBookings = bookings.sort(compareBookings);

// FR-009: Cap food weight inputs at 5000g to prevent layout distortion on smaller devices
const cappedAmount = Math.min(amount, 5000);
```

---

### 3. Document APIs, Components, and Hooks with JSDoc

Use JSDoc block comments to document components, props, custom hooks, and utility functions. This allows modern editors (like VS Code) to display information automatically during typing/hover.

#### Functions

```tsx
/**
 * Calculates the total booking cost.
 *
 * @param hourlyRate Cost per hour.
 * @param hours Number of booked hours.
 * @returns Total booking price.
 */
function calculateBookingPrice(hourlyRate: number, hours: number): number {
  return hourlyRate * hours;
}
```

#### React Components and Props

Every reusable component should explain its purpose, props, and behavior.

```tsx
interface UserCardProps {
  /** User's full name */
  name: string;
  /** User profile image URL */
  avatar: string;
  /** Whether the user is currently online */
  isOnline?: boolean;
}

/**
 * Reusable UserCard component showing profile details and online status.
 */
export function UserCard({ name, avatar, isOnline }: UserCardProps) {
  // ...
}
```

#### Custom Hooks

```tsx
/**
 * Fetches bookings from the database.
 *
 * @returns Object containing bookings list, loading state, and reload function.
 */
export function useBookings() {
  // ...
}
```

#### Utility Functions

```tsx
/**
 * Formats a phone number using standard international spacing.
 *
 * @example
 * formatPhoneNumber("+201001234567") => "+20 100 123 4567"
 */
export function formatPhoneNumber(phone: string): string {
  // ...
}
```

---

### 4. Define Strong TypeScript Types

Avoid using `any` at all costs. Leverage interfaces, type unions, enums, and generics to self-document data contracts.

#### Interfaces

```tsx
interface Booking {
  id: string;
  cleanerName: string;
  propertyName: string;
  status: BookingStatus;
}
```

#### Enums

```tsx
enum BookingStatus {
  Pending,
  Accepted,
  Completed,
}
```

#### Union Types

```tsx
type Theme = "light" | "dark";
```

#### Generic Types

```tsx
interface ApiResponse<T> {
  data: T;
  success: boolean;
}
```

---

### 5. Organize Types

In larger components or features, separate generic or shared data types into dedicated files or directories to keep code modular and readable.

```text
app/
├── types/
│   ├── booking.ts
│   ├── user.ts
│   └── api.ts
├── hooks/
└── components/
```

Example in `types/booking.ts`:

```tsx
export interface Booking {
  id: string;
  status: string;
}
```

---

### 6. ESLint Documentation Rules

Use ESLint configurations to enforce code consistency, check for unused variables/imports, and optionally require JSDoc comments on exported API layers using plugins like `eslint-plugin-jsdoc`.

Example configuration:

```json
{
  "rules": {
    "no-unused-vars": "error",
    "no-console": "warn",
    "eqeqeq": "error"
  }
}
```

---

### 7. Keep Comments and Documentation Synchronized

When changing code, always update or delete any adjacent JSDoc/inline comments. Outdated comments that contradict the code are a liability.

#### ❌ Bad

```tsx
// Returns user details
function deleteUser() { ... }
```

#### ✅ Better

Delete incorrect/outdated comments immediately or rewrite them to accurately reflect code changes.
