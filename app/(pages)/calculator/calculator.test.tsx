import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
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

  expect(screen.getByText(/My Full Plate/i)).toBeInTheDocument()
})

test("test exist calculator page", () => {
  render(<CalculatorPage />)
  expect(screen.getByText(/Calculator/i)).toBeInTheDocument()
})

test("ecepect not found message when no food added", () => {
  render(<CalculatorPage />)
  expect(screen.getByText(/No foods added yet/i)).not.toBeInTheDocument()
})

test("expect element not existing ", () => {
  render(<CalculatorPage />)
  // We use queryBy when we expect something to be GONE
  expect(screen.queryByText(/Your Plate/i)).toBeInTheDocument()
})

test("except emelent exist twise only", () => {
  render(<CalculatorPage />)
  expect(screen.getAllByText(/Chicken Breast/i)).toHaveLength(2)
})

test("query by all", () => {
  render(<CalculatorPage />)
  // queryAll returns an array. We check if it's not zero.
  const headings = screen.queryAllByRole("heading")
  expect(headings.length).toBeGreaterThan(0)
})

test("query by label text", () => {
  render(<CalculatorPage />)
  // Labels are linked to inputs. We search for the label text.
  expect(screen.getByLabelText(/Search 1000\+ foods/i)).not.toBeInTheDocument()
})
