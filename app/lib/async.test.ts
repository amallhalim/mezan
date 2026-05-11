import { calculateMacros, calculateMealTotals } from "./calculateMacros";
import {
  calculateNutrients,
  getCalorieColor,
  getHealthInsight,
} from "./calculatorUtils";
import { FOODS, Food } from "./data";
import { usePlatesStore, Plate } from "../store/usePlatesStore";

/**
 * ============================================================
 *  🧪 ASYNC UNIT TESTING — Using Your Existing Code
 * ============================================================
 *
 *  All tests here use YOUR real functions:
 *  - calculateMacros / calculateNutrients
 *  - calculateMealTotals
 *  - usePlatesStore (Zustand)
 *  - FOODS data
 *
 *  Patterns covered:
 *  1️⃣  Basic async/await with Promises
 *  2️⃣  .resolves / .rejects matchers
 *  3️⃣  Promise.all — Parallel execution
 *  4️⃣  Promise.allSettled — Graceful error handling
 *  5️⃣  Mocking async functions (vi.fn)
 *  6️⃣  Fake Timers
 *  7️⃣  Async Zustand Store testing
 *  8️⃣  Real-world chained async workflows
 * ============================================================
 */

// 🧹 Reset the Zustand store before every test
beforeEach(() => {
  usePlatesStore.getState().clearPlates();
});

// ─────────────────────────────────────────────────────────────
// HELPER: Wraps your sync functions in a Promise.
// WHY: In production these would be real API calls (axios/fetch).
//      This simulates that pattern using your existing logic.
// ─────────────────────────────────────────────────────────────
function fetchFoodById(id: string): Promise<Food> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const food = FOODS.find((f) => f.id === id);
      if (food) {
        resolve(food);
      } else {
        reject(new Error(`Food "${id}" not found`));
      }
    }, 100);
  });
}

function fetchFoodsByCategory(categoryId: number): Promise<Food[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(FOODS.filter((f) => f.categoryId === categoryId));
    }, 80);
  });
}

function searchFoodsAsync(query: string): Promise<Food[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!query.trim()) return reject(new Error("Query cannot be empty"));
      const results = FOODS.filter((f) =>
        f.name.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 50);
  });
}

// ─────────────────────────────────────────────────────────────
// 1️⃣  BASIC ASYNC/AWAIT
// ─────────────────────────────────────────────────────────────
describe("1️⃣ Basic async/await", () => {
  test("fetch Chicken Breast and calculate its macros", async () => {
    // FETCH the food (async)
    const food = await fetchFoodById("p1");

    // CALCULATE (sync — using your real function)
    const macros = calculateMacros(food, 200);

    // Chicken Breast: 165 cal/100g → 200g = 330 cal
    expect(macros.calories).toBe(330);
    expect(macros.protein).toBeCloseTo(62, 0);
  });

  test("fetch Egg and calculate with quantity=3", async () => {
    const food = await fetchFoodById("p2");
    const macros = calculateMacros(food, 1, 3); // 1 unit × 3

    // Egg: 155cal/100g, weightPerUnit=50g → 0.5 factor × 3 qty
    expect(macros.calories).toBeGreaterThan(0);
    expect(macros.protein).toBeGreaterThan(0);
  });

  test("search for Rice and verify results", async () => {
    const results = await searchFoodsAsync("Rice");

    expect(results.length).toBeGreaterThan(0);
    results.forEach((food) => {
      expect(food.name.toLowerCase()).toContain("rice");
    });
  });
});

// ─────────────────────────────────────────────────────────────
// 2️⃣  .resolves / .rejects MATCHERS
//     Cleaner one-liner syntax for async assertions.
// ─────────────────────────────────────────────────────────────
describe("2️⃣ .resolves / .rejects", () => {
  test(".resolves — fetchFoodById returns correct shape", async () => {
    await expect(fetchFoodById("p1")).resolves.toEqual(
      expect.objectContaining({
        id: "p1",
        name: "Chicken Breast",
        caloriesPer100: 165,
      })
    );
  });

  test(".resolves — search returns array with matching items", async () => {
    await expect(searchFoodsAsync("Egg")).resolves.toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "Egg" })])
    );
  });

  test(".rejects — fetchFoodById throws for invalid ID", async () => {
    await expect(fetchFoodById("INVALID_ID")).rejects.toThrow("not found");
  });

  test(".rejects — searchFoodsAsync throws for empty query", async () => {
    await expect(searchFoodsAsync("")).rejects.toThrow("Query cannot be empty");
  });

  test(".rejects — also works with whitespace-only query", async () => {
    await expect(searchFoodsAsync("   ")).rejects.toThrow(
      "Query cannot be empty"
    );
  });
});

// ─────────────────────────────────────────────────────────────
// 3️⃣  PROMISE.ALL — Run multiple fetches in parallel
// ─────────────────────────────────────────────────────────────
describe("3️⃣ Promise.all — Parallel", () => {
  test("fetch multiple foods in parallel and calculate meal totals", async () => {
    // Fetch 3 foods at the SAME TIME (not one-by-one)
    const [chicken, rice, egg] = await Promise.all([
      fetchFoodById("p1"),
      fetchFoodById("c1"),
      fetchFoodById("p2"),
    ]);

    // Calculate macros for each using YOUR calculateNutrients
    const chickenMacros = calculateNutrients(chicken, 200, 1, false);
    const riceMacros = calculateNutrients(rice, 150, 1, false);
    const eggMacros = calculateNutrients(egg, 2, 1, false); // 2 eggs

    // Use YOUR calculateMealTotals to sum them
    const totals = calculateMealTotals([chickenMacros, riceMacros, eggMacros]);

    expect(totals.calories).toBeGreaterThan(0);
    expect(totals.protein).toBeGreaterThan(0);
    expect(totals.carbs).toBeGreaterThan(0);
  });

  test("fetch all protein foods and all carb foods in parallel", async () => {
    const [proteins, carbs] = await Promise.all([
      fetchFoodsByCategory(1),
      fetchFoodsByCategory(3),
    ]);

    expect(proteins.length).toBeGreaterThan(0);
    expect(carbs.length).toBeGreaterThan(0);

    proteins.forEach((f) => expect(f.categoryId).toBe(1));
    carbs.forEach((f) => expect(f.categoryId).toBe(3));
  });

  test("Promise.all fails fast — if ONE rejects, ALL reject", async () => {
    await expect(
      Promise.all([
        fetchFoodById("p1"), // ✅ valid
        fetchFoodById("INVALID"), // ❌ will reject
        fetchFoodById("c1"), // ✅ valid — but never resolves!
      ])
    ).rejects.toThrow("not found");
  });
});

// ─────────────────────────────────────────────────────────────
// 4️⃣  PROMISE.ALLSETTLED — Don't crash on partial failures
// ─────────────────────────────────────────────────────────────
describe("4️⃣ Promise.allSettled — Graceful errors", () => {
  test("some succeed, some fail — get results for both", async () => {
    const results = await Promise.allSettled([
      fetchFoodById("p1"), // ✅
      fetchFoodById("NOPE"), // ❌
      fetchFoodById("c1"), // ✅
      fetchFoodById("ALSO_BAD"), // ❌
    ]);

    const fulfilled = results.filter((r) => r.status === "fulfilled");
    const rejected = results.filter((r) => r.status === "rejected");

    expect(fulfilled).toHaveLength(2);
    expect(rejected).toHaveLength(2);

    // Extract successful foods
    const foods = fulfilled.map(
      (r) => (r as PromiseFulfilledResult<Food>).value
    );
    expect(foods.map((f) => f.id)).toEqual(["p1", "c1"]);

    // Extract error messages
    const errors = rejected.map(
      (r) => (r as PromiseRejectedResult).reason.message
    );
    errors.forEach((msg) => expect(msg).toContain("not found"));
  });
});

// ─────────────────────────────────────────────────────────────
// 5️⃣  MOCKING ASYNC FUNCTIONS (vi.fn)
//     Simulate API calls without real data.
// ─────────────────────────────────────────────────────────────
describe("5️⃣ Mocking with vi.fn()", () => {
  test("mockResolvedValue — mock a successful API response", async () => {
    // 🎭 Pretend this is axios.get('/api/foods/p1')
    const mockFetch = vi.fn().mockResolvedValue({
      id: "p1",
      name: "Chicken Breast",
      caloriesPer100: 165,
      proteinPer100: 31,
      carbsPer100: 0,
      fatPer100: 3.6,
    });

    const food = await mockFetch("p1");

    expect(mockFetch).toHaveBeenCalledWith("p1");
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(food.name).toBe("Chicken Breast");
  });

  test("mockRejectedValue — mock a failed API response", async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error("500 Server Error"));

    await expect(mockFetch("p1")).rejects.toThrow("500 Server Error");
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test("mockResolvedValueOnce — different results per call", async () => {
    const mockSearch = vi
      .fn()
      .mockResolvedValueOnce([{ name: "Chicken Breast" }]) // Call 1
      .mockResolvedValueOnce([{ name: "White Rice" }]) // Call 2
      .mockRejectedValueOnce(new Error("Rate limit!")); // Call 3

    expect(await mockSearch("chicken")).toEqual([{ name: "Chicken Breast" }]);
    expect(await mockSearch("rice")).toEqual([{ name: "White Rice" }]);
    await expect(mockSearch("egg")).rejects.toThrow("Rate limit!");

    expect(mockSearch).toHaveBeenCalledTimes(3);
  });

  test("mockImplementation — custom async logic", async () => {
    // 🎭 Mock that uses YOUR real calculateMacros inside
    const mockCalculate = vi
      .fn()
      .mockImplementation(async (foodId: string, amount: number) => {
        const food = FOODS.find((f) => f.id === foodId);
        if (!food) throw new Error("Not found");
        // Uses YOUR real function
        return calculateMacros(food, amount);
      });

    const result = await mockCalculate("p1", 200);
    expect(result.calories).toBe(330);
    expect(mockCalculate).toHaveBeenCalledWith("p1", 200);
  });
});

// ─────────────────────────────────────────────────────────────
// 6️⃣  FAKE TIMERS — Control setTimeout/setInterval
// ─────────────────────────────────────────────────────────────
describe("6️⃣ Fake Timers", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("promise stays pending until timer advances", async () => {
    let resolved = false;

    const promise = fetchFoodById("p1").then((food) => {
      resolved = true;
      return food;
    });

    // ⏸️ Timer hasn't advanced → still pending
    expect(resolved).toBe(false);

    // ⏩ Advance past the 100ms delay
    vi.advanceTimersByTime(150);
    const food = await promise;

    // ✅ Now resolved
    expect(resolved).toBe(true);
    expect(food.name).toBe("Chicken Breast");
  });

  test("advanceTimersByTime — control search delay", async () => {
    const promise = searchFoodsAsync("Chicken");

    vi.advanceTimersByTime(100);

    const results = await promise;
    expect(results.length).toBeGreaterThan(0);
  });

  test("simulate toast disappearing after 3 seconds", async () => {
    // This mirrors the toast logic in your CalculatorPage
    let toastVisible = true;
    const hideToast = () => {
      toastVisible = false;
    };

    setTimeout(hideToast, 3000);

    // Toast is still visible
    expect(toastVisible).toBe(true);

    // ⏩ Advance 2 seconds — toast should STILL be visible
    vi.advanceTimersByTime(2000);
    expect(toastVisible).toBe(true);

    // ⏩ Advance 1 more second — toast should disappear
    vi.advanceTimersByTime(1000);
    expect(toastVisible).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────
// 7️⃣  ASYNC ZUSTAND STORE TESTING
//     Test store actions that could be async in a real app.
// ─────────────────────────────────────────────────────────────
describe("7️⃣ Async Zustand Store", () => {
  test("fetch food → calculate → addPlate (async workflow)", async () => {
    const store = usePlatesStore.getState();

    // Step 1: Fetch food async
    const food = await fetchFoodById("p1");

    // Step 2: Calculate macros using YOUR function
    const macros = calculateNutrients(food, 200, 1, false);

    // Step 3: Build plate item and add to store
    const plate: Plate = {
      id: food.id,
      name: food.name,
      calories: macros.calories,
      protein: macros.protein,
      carbs: macros.carbs,
      fat: macros.fat,
    };
    store.addPlate(plate);

    // Verify
    const plates = usePlatesStore.getState().plates;
    expect(plates).toHaveLength(1);
    expect(plates[0].name).toBe("Chicken Breast");
    expect(plates[0].calories).toBe(330); // 165 × 2
  });

  test("fetch multiple foods → add all to plate → verify totals", async () => {
    const store = usePlatesStore.getState();

    // Fetch in parallel
    const [chicken, rice] = await Promise.all([
      fetchFoodById("p1"),
      fetchFoodById("c1"),
    ]);

    // Calculate and add each
    const chickenMacros = calculateNutrients(chicken, 200, 1, false);
    store.addPlate({
      id: chicken.id,
      name: chicken.name,
      ...chickenMacros,
    });

    const riceMacros = calculateNutrients(rice, 150, 1, false);
    store.addPlate({
      id: rice.id,
      name: rice.name,
      ...riceMacros,
    });

    // Verify plate
    const plates = usePlatesStore.getState().plates;
    expect(plates).toHaveLength(2);

    // Verify totals using YOUR calculateMealTotals
    const totals = calculateMealTotals(plates);
    expect(totals.calories).toBe(chickenMacros.calories + riceMacros.calories);
    expect(totals.protein).toBeCloseTo(
      chickenMacros.protein + riceMacros.protein,
      0
    );
  });

  test("async remove: fetch → add → remove → verify empty", async () => {
    const store = usePlatesStore.getState();

    const food = await fetchFoodById("p2");
    const macros = calculateNutrients(food, 1, 1, false);
    store.addPlate({ id: food.id, name: food.name, ...macros });

    expect(usePlatesStore.getState().plates).toHaveLength(1);

    // Remove it
    store.removePlate(food.id);
    expect(usePlatesStore.getState().plates).toHaveLength(0);
  });
});

// ─────────────────────────────────────────────────────────────
// 8️⃣  REAL-WORLD: Full Meal Planning Workflow
// ─────────────────────────────────────────────────────────────
describe("8️⃣ Real-World Workflows", () => {
  test("full workflow: search → pick → calculate → add → get totals", async () => {
    const store = usePlatesStore.getState();

    // 1. Search for protein
    const proteinResults = await searchFoodsAsync("Chicken");
    const chicken = proteinResults[0];
    expect(chicken).toBeDefined();

    // 2. Search for carbs
    const carbResults = await searchFoodsAsync("Rice");
    const rice = carbResults[0];
    expect(rice).toBeDefined();

    // 3. Calculate each using YOUR functions
    const chickenCalc = calculateNutrients(chicken, 250, 1, false);
    const riceCalc = calculateNutrients(rice, 200, 1, false);

    // 4. Add both to the real Zustand store
    store.addPlate({ id: chicken.id, name: chicken.name, ...chickenCalc });
    store.addPlate({ id: rice.id, name: rice.name, ...riceCalc });

    // 5. Verify totals with YOUR calculateMealTotals
    const plates = usePlatesStore.getState().plates;
    const totals = calculateMealTotals(plates);

    expect(plates).toHaveLength(2);
    expect(totals.calories).toBe(chickenCalc.calories + riceCalc.calories);
    expect(totals.protein).toBeCloseTo(
      chickenCalc.protein + riceCalc.protein,
      0
    );

    // 6. Verify getCalorieColor and getHealthInsight with the total
    const color = getCalorieColor(totals.calories);
    expect(color).toBeTruthy();

    const insight = getHealthInsight(totals.calories);
    expect(insight.text).toBeTruthy();
    expect(insight.icon).toBeTruthy();
  });

  test("error recovery: invalid food doesnt break the plate", async () => {
    const store = usePlatesStore.getState();

    // Add a valid food first
    const chicken = await fetchFoodById("p1");
    const macros = calculateNutrients(chicken, 100, 1, false);
    store.addPlate({ id: chicken.id, name: chicken.name, ...macros });

    // Try to fetch an invalid food — should NOT break existing plate
    try {
      await fetchFoodById("INVALID");
    } catch {
      // Error caught — plate is still intact
    }

    expect(usePlatesStore.getState().plates).toHaveLength(1);
    expect(usePlatesStore.getState().plates[0].name).toBe("Chicken Breast");
  });

  test("batch: fetch entire category → calculate all → pick highest protein", async () => {
    // 1. Fetch all proteins
    const proteins = await fetchFoodsByCategory(1);
    expect(proteins.length).toBeGreaterThan(0);

    // 2. Calculate macros for 100g of each
    const reports = proteins.map((food) => ({
      food,
      macros: calculateNutrients(food, 100, 1, false),
    }));

    // 3. Find the highest protein food
    const highestProtein = reports.reduce((best, curr) =>
      curr.macros.protein > best.macros.protein ? curr : best
    );

    expect(highestProtein.food.name).toBeTruthy();
    expect(highestProtein.macros.protein).toBeGreaterThan(0);

    // The winner should have a high protein value
    expect(highestProtein.macros.protein).toBeGreaterThanOrEqual(20);
  });
});
