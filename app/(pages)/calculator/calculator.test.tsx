import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import CalculatorPage from './page'
import userEvent from '@testing-library/user-event'



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

  render(<CalculatorPage />)

  const calcBtn = screen.getByRole('button', { name: /Calculate Meal Summary/i })
  await user.click(calcBtn)

  // Verify the Modal opens (it has "My Full Plate" title)
  expect(screen.getByText(/My Full Plate/i)).toBeInTheDocument()
})


test("test exist calculator page", () => {
  render(<CalculatorPage />)
  expect(screen.getByText(/Calculator/i)).toBeInTheDocument()
})

test("ecepect not found message when no food added", () => {
  render(<CalculatorPage />)
  expect(screen.getByText(/No foods added yet/i)).toBeInTheDocument()
})
test("expect element not existing ", () => {
  render(<CalculatorPage />)
  expect(screen.queryByText(/Your Plate/i)).not.toBeInTheDocument()
})
test("except emelent exist twise only", () => {
  render(<CalculatorPage />)
  expect(screen.getAllByText(/Chicken Breast/i)).toHaveLength(2)
})


//query by all
test("query by all", () => {
  render(<CalculatorPage />)
  expect(screen.queryAllByTestId("Your Plate/i")).toHaveLength(1)
})

//query by label text
test("query by label text", () => {
  render(<CalculatorPage />)
  expect(screen.getByLabelText("Search 1000+ foods")).toBeInTheDocument()
})
