
import axios from 'axios'
import { FOODS } from './data'
import { calculateNutrients } from './calculatorUtils'

/**
 * ============================================================
 *  🎭 MOCKING REQUESTS — The Complete Guide
 * ============================================================
 *
 *  3 Ways to Mock Requests:
 *
 *  1️⃣  vi.mock('axios')     — Mock the entire axios module
 *  2️⃣  vi.fn() on fetch     — Mock the global fetch function
 *  3️⃣  vi.spyOn(axios)      — Spy on specific axios methods
 * ============================================================
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔧 SETUP: Mock the entire axios module
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
// This line replaces the REAL axios with a FAKE one.
// Every method (get, post, put, delete) becomes a vi.fn()
// that you can control: what it returns, what it throws, etc.
//
vi.mock('axios')

// Cast axios so TypeScript knows it's mocked
const mockedAxios = vi.mocked(axios)

// ─────────────────────────────────────────────────────────────
// 1️⃣  MOCKING axios.get()
//     Simulate GET requests to your API
// ─────────────────────────────────────────────────────────────
describe('1️⃣ Mocking axios.get()', () => {

  beforeEach(() => {
    // 🧹 Reset all mocks before each test
    vi.clearAllMocks()
  })

  test('mock a successful GET /api/foods', async () => {
    // 🎭 ARRANGE: Tell axios.get what to return
    // This is the FAKE response — no real server needed!
    const fakeFoods = [
      { id: 'p1', name: 'Chicken Breast', caloriesPer100: 165 },
      { id: 'c1', name: 'White Rice', caloriesPer100: 130 },
    ]

    mockedAxios.get.mockResolvedValue({ data: fakeFoods })

    // 🎬 ACT: Call axios.get (this hits our MOCK, not a real server)
    const response = await axios.get('/api/foods')

    // ✅ ASSERT: Verify the response
    expect(response.data).toHaveLength(2)
    expect(response.data[0].name).toBe('Chicken Breast')

    // ✅ Verify axios was called with the right URL
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/foods')
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
  })

  test('mock a GET request with query parameters', async () => {
    // 🎭 Mock: search endpoint
    const fakeResults = [
      { id: 'p1', name: 'Chicken Breast', caloriesPer100: 165 },
      { id: 'me1', name: 'Chicken Shawarma', caloriesPer100: 220 },
    ]
    mockedAxios.get.mockResolvedValue({ data: fakeResults })

    // 🎬 ACT
    const response = await axios.get('/api/foods?search=chicken')

    // ✅ ASSERT
    expect(response.data).toHaveLength(2)
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/foods?search=chicken')
  })

  test('mock a failed GET request — 404 Not Found', async () => {
    // 🎭 Mock: server returns an error
    mockedAxios.get.mockRejectedValue({
      response: { status: 404, data: { message: 'Food not found' } }
    })

    // 🎬 ACT + ASSERT
    try {
      await axios.get('/api/foods/INVALID_ID')
      expect(true).toBe(false) // Should never reach here
    } catch (error: any) {
      expect(error.response.status).toBe(404)
      expect(error.response.data.message).toBe('Food not found')
    }
  })

  test('mock a failed GET request — Network Error', async () => {
    // 🎭 Mock: no internet / server down
    mockedAxios.get.mockRejectedValue(new Error('Network Error'))

    await expect(axios.get('/api/foods')).rejects.toThrow('Network Error')
  })
})

// ─────────────────────────────────────────────────────────────
// 2️⃣  MOCKING axios.post()
//     Simulate POST requests (creating data)
// ─────────────────────────────────────────────────────────────
describe('2️⃣ Mocking axios.post()', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('mock saving a meal plate to the server', async () => {
    // 🎭 Mock: server responds with the saved meal + an ID
    mockedAxios.post.mockResolvedValue({
      data: {
        id: 'meal_123',
        name: 'My Lunch',
        totalCalories: 495,
        items: ['Chicken Breast', 'White Rice'],
        createdAt: '2026-05-05T12:00:00Z'
      }
    })

    // 🎬 ACT: Send the meal data
    const mealData = {
      name: 'My Lunch',
      items: [
        { foodId: 'p1', amount: 200 },
        { foodId: 'c1', amount: 150 },
      ]
    }
    const response = await axios.post('/api/meals', mealData)

    // ✅ ASSERT
    expect(response.data.id).toBe('meal_123')
    expect(response.data.totalCalories).toBe(495)

    // ✅ Verify the POST was called with correct URL AND body
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/meals', mealData)
  })

  test('mock a 400 Bad Request on POST', async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        status: 400,
        data: { message: 'Missing required field: name' }
      }
    })

    try {
      await axios.post('/api/meals', { items: [] })
    } catch (error: any) {
      expect(error.response.status).toBe(400)
      expect(error.response.data.message).toContain('Missing required field')
    }
  })
})

// ─────────────────────────────────────────────────────────────
// 3️⃣  MOCKING global fetch()
//     If you use fetch() instead of axios
// ─────────────────────────────────────────────────────────────
describe('3️⃣ Mocking global fetch()', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('mock a successful fetch() call', async () => {
    // 🎭 Replace the global fetch with a fake
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ([
        { id: 'p1', name: 'Chicken Breast' },
        { id: 'c1', name: 'White Rice' },
      ])
    })
    global.fetch = mockFetch

    // 🎬 ACT: Call fetch like your code normally would
    const response = await fetch('/api/foods')
    const data = await response.json()

    // ✅ ASSERT
    expect(data).toHaveLength(2)
    expect(data[0].name).toBe('Chicken Breast')
    expect(mockFetch).toHaveBeenCalledWith('/api/foods')
  })

  test('mock a failed fetch() — server error', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Internal Server Error' })
    })
    global.fetch = mockFetch

    const response = await fetch('/api/foods')

    expect(response.ok).toBe(false)
    expect(response.status).toBe(500)

    const error = await response.json()
    expect(error.message).toBe('Internal Server Error')
  })

  test('mock fetch() that throws (network failure)', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Failed to fetch'))

    await expect(fetch('/api/foods')).rejects.toThrow('Failed to fetch')
  })
})

// ─────────────────────────────────────────────────────────────
// 4️⃣  REAL-WORLD: Full workflow with mocked API
//     Combines mocked requests with YOUR real calculation logic
// ─────────────────────────────────────────────────────────────
describe('4️⃣ Real-World: Mock API + Real Calculations', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('fetch food from API → calculate with YOUR functions → verify', async () => {
    // 🎭 Mock the API to return a real food from YOUR data
    const chickenFromDB = FOODS.find(f => f.id === 'p1')!
    mockedAxios.get.mockResolvedValue({ data: chickenFromDB })

    // 🎬 Step 1: Fetch from the "API"
    const response = await axios.get('/api/foods/p1')
    const food = response.data

    // 🎬 Step 2: Use YOUR real calculateNutrients
    const macros = calculateNutrients(food, 200, 1, false)

    // ✅ Step 3: Verify — 200g of Chicken Breast
    expect(macros.calories).toBe(330)    // 165 × 2
    expect(macros.protein).toBe(62)      // 31 × 2
    expect(macros.fat).toBe(7.2)         // 3.6 × 2
  })

  test('simulate a full meal save workflow', async () => {
    // 🎭 Mock: GET foods
    const chicken = FOODS.find(f => f.id === 'p1')!
    const rice = FOODS.find(f => f.id === 'c1')!

    mockedAxios.get
      .mockResolvedValueOnce({ data: chicken })  // First call
      .mockResolvedValueOnce({ data: rice })      // Second call

    // 🎭 Mock: POST save meal
    mockedAxios.post.mockResolvedValue({
      data: { id: 'meal_456', saved: true }
    })

    // 🎬 Step 1: Fetch both foods
    const res1 = await axios.get('/api/foods/p1')
    const res2 = await axios.get('/api/foods/c1')

    // 🎬 Step 2: Calculate with YOUR functions
    const chickenMacros = calculateNutrients(res1.data, 200, 1, false)
    const riceMacros = calculateNutrients(res2.data, 150, 1, false)

    const totalCalories = chickenMacros.calories + riceMacros.calories

    // 🎬 Step 3: Save the meal
    const saveResponse = await axios.post('/api/meals', {
      items: [
        { food: res1.data.name, ...chickenMacros },
        { food: res2.data.name, ...riceMacros },
      ],
      totalCalories,
    })

    // ✅ Verify everything
    expect(saveResponse.data.saved).toBe(true)
    expect(mockedAxios.get).toHaveBeenCalledTimes(2)
    expect(mockedAxios.post).toHaveBeenCalledTimes(1)
    expect(totalCalories).toBe(330 + 195) // chicken + rice
  })

  test('handle API error gracefully in workflow', async () => {
    // First call succeeds, second call fails
    const chicken = FOODS.find(f => f.id === 'p1')!

    mockedAxios.get
      .mockResolvedValueOnce({ data: chicken })
      .mockRejectedValueOnce(new Error('Server timeout'))

    // 🎬 First fetch succeeds
    const res1 = await axios.get('/api/foods/p1')
    expect(res1.data.name).toBe('Chicken Breast')

    // 🎬 Second fetch fails — handle it gracefully
    let fallbackUsed = false
    let riceData

    try {
      const res2 = await axios.get('/api/foods/c1')
      riceData = res2.data
    } catch {
      // ✅ Use fallback/cached data
      fallbackUsed = true
      riceData = FOODS.find(f => f.id === 'c1')!
    }

    // Workflow continues despite the error
    expect(fallbackUsed).toBe(true)
    expect(riceData.name).toBe('White Rice')

    const macros = calculateNutrients(riceData, 100, 1, false)
    expect(macros.calories).toBe(130)
  })
})
