import { usePlatesStore } from "../store/usePlatesStore";
import { calculateNutrients } from "./calculatorUtils";
import { FOODS } from "./data";

/**
 * ============================================================
 *  🔄 LIFECYCLE HOOKS — beforeEach / afterEach / beforeAll / afterAll
 * ============================================================
 *
 *  WHEN TO USE EACH:
 *
 *  beforeEach  → Reset state, clear mocks, prepare fresh data
 *  afterEach   → Clean up timers, restore mocks, reset globals
 *  beforeAll   → One-time expensive setup (DB connection, big data load)
 *  afterAll    → One-time cleanup (close connections, delete temp files)
 *
 *  ⚡ RULE: Use beforeEach for MOST things.
 *     It keeps each test ISOLATED (can't affect each other).
 * ============================================================
 */

// ─────────────────────────────────────────────────────────────
// 1️⃣  beforeEach — Runs BEFORE every single test
//     "Give me a clean plate before each test"
// ─────────────────────────────────────────────────────────────
describe("1️⃣ beforeEach — Reset state before each test", () => {
  // 🧹 This runs BEFORE every test in this describe block
  beforeEach(() => {
    // Clear the Zustand store so each test starts fresh
    usePlatesStore.getState().clearPlates();
  });

  test("plate starts empty", () => {
    const plates = usePlatesStore.getState().plates;
    expect(plates).toHaveLength(0); // ✅ Clean state!
  });

  test("add chicken — plate has 1 item", () => {
    usePlatesStore.getState().addPlate({
      id: "p1",
      name: "Chicken Breast",
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
    });
    expect(usePlatesStore.getState().plates).toHaveLength(1);
  });

  test("plate is empty again — because beforeEach cleared it!", () => {
    // Even though the previous test added an item,
    // beforeEach cleared the store before THIS test runs
    expect(usePlatesStore.getState().plates).toHaveLength(0); // ✅
  });
});

// ─────────────────────────────────────────────────────────────
// ❌ WITHOUT beforeEach — Tests leak into each other!
// ─────────────────────────────────────────────────────────────
describe("❌ WITHOUT beforeEach — Tests affect each other", () => {
  // ⚠️ No beforeEach here! Store keeps state between tests.
  // This is DANGEROUS because test order matters.

  // We clear once at the start for a clean baseline
  beforeAll(() => {
    usePlatesStore.getState().clearPlates();
  });

  test("first test: add chicken", () => {
    usePlatesStore.getState().addPlate({
      id: "p1",
      name: "Chicken",
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
    });
    expect(usePlatesStore.getState().plates).toHaveLength(1);
  });

  test("second test: plate STILL has chicken from previous test!", () => {
    // ⚠️ This passes, but it DEPENDS on the previous test.
    // If test order changes or first test is skipped, this BREAKS!
    expect(usePlatesStore.getState().plates).toHaveLength(1);
    expect(usePlatesStore.getState().plates[0].name).toBe("Chicken");
  });
});

// ─────────────────────────────────────────────────────────────
// 2️⃣  afterEach — Runs AFTER every single test
//     "Clean up my mess after each test"
// ─────────────────────────────────────────────────────────────
describe("2️⃣ afterEach — Clean up after each test", () => {
  // Track what each test does for the demo
  const log: string[] = [];

  beforeEach(() => {
    usePlatesStore.getState().clearPlates();
  });

  afterEach(() => {
    // 🧹 Runs AFTER every test — perfect for cleanup
    log.push("cleaned up");

    // Common afterEach uses:
    // - vi.restoreAllMocks()   ← restore spies
    // - vi.useRealTimers()     ← restore real timers
    // - vi.clearAllMocks()     ← clear mock call history
  });

  test("first test runs and gets cleaned up", () => {
    usePlatesStore.getState().addPlate({
      id: "p1",
      name: "Chicken",
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
    });
    expect(usePlatesStore.getState().plates).toHaveLength(1);
  });

  test("verify afterEach ran after first test", () => {
    expect(log).toContain("cleaned up"); // ✅ afterEach already ran
  });
});

// ─────────────────────────────────────────────────────────────
// 3️⃣  afterEach with Mocks — THE MOST COMMON USE CASE
//     Reset mocks so they don't leak between tests.
// ─────────────────────────────────────────────────────────────
describe("3️⃣ afterEach with Mocks", () => {
  const mockFetchFood = vi.fn();

  beforeEach(() => {
    // ✅ Reset mock before each test — fresh call history
    mockFetchFood.mockReset();
  });

  test("mock is called once in this test", async () => {
    mockFetchFood.mockResolvedValue({ name: "Chicken" });
    await mockFetchFood("p1");

    expect(mockFetchFood).toHaveBeenCalledTimes(1);
  });

  test("mock count is 0 again — because beforeEach reset it", async () => {
    // Without reset, this would show calls from the previous test!
    expect(mockFetchFood).toHaveBeenCalledTimes(0); // ✅ Clean

    mockFetchFood.mockResolvedValue({ name: "Rice" });
    await mockFetchFood("c1");

    expect(mockFetchFood).toHaveBeenCalledTimes(1); // Only THIS test's calls
  });
});

// ─────────────────────────────────────────────────────────────
// 4️⃣  afterEach with Fake Timers
//     ALWAYS restore real timers after using fake ones.
// ─────────────────────────────────────────────────────────────
describe("4️⃣ afterEach with Fake Timers", () => {
  beforeEach(() => {
    vi.useFakeTimers(); // ⏰ Install fake timers
  });

  afterEach(() => {
    vi.useRealTimers(); // 🧹 MUST restore real timers!
    // If you forget this, ALL tests after this block break!
  });

  test("control setTimeout with fake timers", () => {
    let toastVisible = true;

    // Simulate your CalculatorPage toast
    setTimeout(() => {
      toastVisible = false;
    }, 3000);

    expect(toastVisible).toBe(true); // Still visible
    vi.advanceTimersByTime(3000);
    expect(toastVisible).toBe(false); // Disappeared!
  });

  test("real timers work fine in the next test (thanks to afterEach)", () => {
    // This test works because afterEach restored real timers
    const start = Date.now();
    expect(start).toBeGreaterThan(0); // Real time works ✅
  });
});

// ─────────────────────────────────────────────────────────────
// 5️⃣  beforeAll / afterAll — Run ONCE for the whole block
//     "Expensive setup that all tests share"
// ─────────────────────────────────────────────────────────────
describe("5️⃣ beforeAll / afterAll — One-time setup & cleanup", () => {
  // Shared data calculated ONCE for all tests
  let allProteinFoods: typeof FOODS;
  let allProteinMacros: ReturnType<typeof calculateNutrients>[];

  beforeAll(() => {
    // 🏗️ Runs ONCE before any test in this describe
    // Perfect for expensive operations you don't want to repeat
    allProteinFoods = FOODS.filter((f) => f.categoryId === 1);
    allProteinMacros = allProteinFoods.map((f) =>
      calculateNutrients(f, 100, 1, false)
    );
  });

  afterAll(() => {
    // 🧹 Runs ONCE after ALL tests in this describe are done
    // Perfect for closing connections, cleaning temp data
    allProteinFoods = [];
    allProteinMacros = [];
  });

  // These tests READ from the shared data — fast! No recalculation.

  test("we have protein foods loaded", () => {
    expect(allProteinFoods.length).toBeGreaterThan(0);
  });

  test("all protein foods have positive protein macros", () => {
    allProteinMacros.forEach((macros) => {
      expect(macros.protein).toBeGreaterThan(0);
    });
  });

  test("chicken breast has the highest protein per 100g", () => {
    const highestProtein = allProteinMacros.reduce((best, curr) =>
      curr.protein > best.protein ? curr : best
    );
    // Chicken Breast: 31g protein per 100g
    expect(highestProtein.protein).toBe(31);
  });
});

// ─────────────────────────────────────────────────────────────
// 6️⃣  EXECUTION ORDER — See exactly when each hook runs
// ─────────────────────────────────────────────────────────────
describe("6️⃣ Execution Order Demo", () => {
  const order: string[] = [];

  beforeAll(() => {
    order.push("1. beforeAll");
  });

  beforeEach(() => {
    order.push("2. beforeEach");
  });

  afterEach(() => {
    order.push("4. afterEach");
  });

  afterAll(() => {
    order.push("6. afterAll");
    // Full order for 2 tests:
    // 1. beforeAll
    // 2. beforeEach → 3. test A → 4. afterEach
    // 2. beforeEach → 3. test B → 4. afterEach
    // 6. afterAll
  });

  test("test A", () => {
    order.push("3. test A");
    expect(order).toEqual(["1. beforeAll", "2. beforeEach", "3. test A"]);
  });

  test("test B", () => {
    order.push("3. test B");
    expect(order).toEqual([
      "1. beforeAll",
      "2. beforeEach",
      "3. test A",
      "4. afterEach", // ← afterEach ran after test A
      "2. beforeEach", // ← beforeEach ran again before test B
      "3. test B",
    ]);
  });
});

// ─────────────────────────────────────────────────────────────
// 7️⃣  NESTED describes — Each level has its own hooks
// ─────────────────────────────────────────────────────────────
describe("7️⃣ Nested describes — Hooks stack!", () => {
  const steps: string[] = [];

  beforeEach(() => {
    steps.length = 0; // Clear for each test
    steps.push("outer beforeEach");
  });

  describe("inner group", () => {
    beforeEach(() => {
      // This runs AFTER the outer beforeEach
      steps.push("inner beforeEach");
    });

    afterEach(() => {
      steps.push("inner afterEach");
    });

    test("both beforeEach hooks run, outer first", () => {
      steps.push("test runs");
      expect(steps).toEqual([
        "outer beforeEach", // ← Outer runs FIRST
        "inner beforeEach", // ← Inner runs SECOND
        "test runs",
      ]);
    });
  });
});

// ─────────────────────────────────────────────────────────────
// 🧠 CHEAT SHEET — When to use each
// ─────────────────────────────────────────────────────────────
//
// ┌─────────────────┬──────────────────────────────────────────┐
// │ Hook            │ Use for                                  │
// ├─────────────────┼──────────────────────────────────────────┤
// │ beforeEach      │ Reset store, clear mocks, fresh data     │
// │ afterEach       │ Restore timers, restore mocks, cleanup   │
// │ beforeAll       │ One-time expensive setup (DB, big data)  │
// │ afterAll        │ One-time cleanup (close connections)      │
// └─────────────────┴──────────────────────────────────────────┘
//
// ⚡ GOLDEN RULE: When in doubt, use beforeEach.
//    It guarantees test isolation.
