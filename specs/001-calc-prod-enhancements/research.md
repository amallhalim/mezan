# Research: Calculator Production Enhancements

## State Management

**Decision**: Use a Custom React Hook (`useCalculatorState`) to encapsulate state and logic, rather than introducing a global state manager like Zustand or Redux.

**Rationale**: The state of the calculator (selected food items, active food, search query, editing index) is highly localized to the calculator page and its child components. It does not need to be shared globally across the entire application right now. A custom hook ensures the "Separation of UI and Logic" principle without over-engineering.

**Alternatives considered**:
- *Zustand*: Overkill since no other page needs the calculator's current plate state.
- *React Context*: Would be useful if prop drilling is severe. Since the calculator page just passes state down one level to layout components, prop drilling is minimal. Returning the state and dispatch functions from a custom hook is sufficient.

## Theme & Styling

**Decision**: Replace inline gradients with Tailwind `bg-gradient-to-r` and standard theme colors configured in `tailwind.config.ts`. 

**Rationale**: Adheres to the Constitution's "Theme-Driven Styling" principle. Inline styles like `style={{ background: 'radial-gradient(...)' }}` bypass the design system and make global theme changes difficult.

**Alternatives considered**:
- *Custom CSS classes*: Tailwind provides enough utility for radial gradients (`bg-[radial-gradient(...)]`) or custom config extensions, avoiding the need for separate `.css` files.
