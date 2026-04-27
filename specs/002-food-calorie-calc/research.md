# Research: Calculation Precision

## Mathematical Precision for Macros

**Decision**: Use standard floating-point arithmetic with a fixed 1-decimal-place rounding (`Math.round(val * 10) / 10`) at the presentation layer, but maintain full precision in state.

**Rationale**: Since Javascript uses IEEE 754 floating point, minor inaccuracies can occur (e.g., `0.1 + 0.2 = 0.30000000000000004`). However, since we are calculating macros which are inherently estimates, sub-gram precision issues are irrelevant to the user. We only need to round the final display value to 1 decimal place to ensure the UI looks clean, while the state holds the raw float.

**Alternatives considered**:
- *Using a library like Decimal.js*: Overkill and adds unnecessary bundle weight for simple macro calculations.
- *Rounding at the state level*: Rejected, as rounding early can lead to cumulative errors when aggregating multiple food items into a meal. Full precision should be kept until the final render.
