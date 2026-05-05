import { render, screen } from '@testing-library/react'
import { expect, test, vi, beforeEach } from 'vitest'
import CalculatorPage from './page'
import userEvent from '@testing-library/user-event'
import { usePlatesStore } from '@/app/store/usePlatesStore'



// 🧹 This resets the plate before EVERY test starts
beforeEach(() => {
  usePlatesStore.getState().clearPlates()
})

test('full calculator workflow: search, add, and verify', async () => {
  const user = userEvent.setup()
  const { rerender } = render(<CalculatorPage />)

  // STEP 1: Search for food
  const searchInput = screen.getByPlaceholderText(/Search 1000\+ foods/i)
  await user.type(searchInput, 'Chicken')

  // STEP 2: Open the adjustment panel
  const chickenItem = screen.getAllByText(/Chicken Breast/i)[0]
  await user.click(chickenItem)

  // STEP 3: Click "ADD TO PLATE" inside the adjustment panel
  const addBtn = screen.getByRole('button', { name: /ADD TO PLATE/i })
  await user.click(addBtn)

  // STEP 4: Verify it appears in the "Your Plate" summary
  rerender(<CalculatorPage />)
  expect(screen.getByText(/Your Plate/i)).toBeInTheDocument()
})

test('opens result modal when calculation button is clicked', async () => {
  const user = userEvent.setup()

  // Pre-add an item so the button works
  usePlatesStore.getState().addPlate({ name: 'Chicken', calories: 165, protein: 31, carbs: 0, fat: 3.6, id: '1' })

  render(<CalculatorPage />)

  const calcBtn = screen.getByRole('button', { name: /Calculate Meal Summary/i })
  await user.click(calcBtn)

  expect(screen.getByText(/My Full Plate/i)).toBeInTheDocument()
})

test("test exist calculator page", () => {
  render(<CalculatorPage />)
  // Your page header says "Macro Calc", not "Calculator"
  expect(screen.getByText(/Macro/i)).toBeInTheDocument()
})

test("expect plate section is hidden when no food added", () => {
  render(<CalculatorPage />)
  // Since the app returns null when empty, the section should be missing
  expect(screen.queryByText(/Your Plate/i)).not.toBeInTheDocument()
})

test("expect element exists once", () => {
  render(<CalculatorPage />)
  // "Chicken Breast" appears exactly once in the starting category
  expect(screen.getAllByText(/Chicken Breast/i)).toHaveLength(1)
})

test("query all headings", () => {
  render(<CalculatorPage />)
  // Check that we have at least one heading on the page
  const headings = screen.queryAllByRole("heading")
  expect(headings.length).toBeGreaterThan(0)
})

test("verify search label exists", () => {
  render(<CalculatorPage />)
  // This now works because we added 'aria-label' to the input!
  expect(screen.getByLabelText(/Search 1000\+ foods/i)).toBeInTheDocument()
})
