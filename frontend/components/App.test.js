import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import AppFunctional from './AppFunctional'

test('Functional grid renders on the page w/o errors', () => {
  render(<AppFunctional />)
})


test('renders grid information visible texts', () => {
  render(<AppFunctional />)

  const coordinateHeading = screen.getByText(/coordinates \(2, 2\)/i)

  const stepsHeading = screen.getByText(/You moved 0 times/i)

  expect(coordinateHeading).toBeInTheDocument()
  expect(coordinateHeading).toBeVisible()

  expect(stepsHeading).toBeInTheDocument()
  expect(stepsHeading).toBeVisible()
})


test(`renders buttons + their texts`, () => {
  render(<AppFunctional />)

  const downButton = screen.getByRole('button', { name: /down/i })

  const leftButton = screen.getByRole('button', { name: /left/i })

  const rightButton = screen.getByRole('button', { name: /up/i })

  const upButton = screen.getByRole('button', { name: /up/i })

  const resetButton = screen.getByRole('button', { name: /reset/i })

  const submitButton = screen.getByRole('button', { name: /submit/i })

  expect(upButton).toBeInTheDocument()
  expect(upButton).toBeVisible()

  expect(downButton).toBeInTheDocument()
  expect(downButton).toBeVisible()

  expect(leftButton).toBeInTheDocument()
  expect(leftButton).toBeVisible()

  expect(rightButton).toBeInTheDocument()
  expect(rightButton).toBeVisible()

  expect(resetButton).toBeInTheDocument()
  expect(resetButton).toBeVisible()

  expect(submitButton).toBeInTheDocument()
  expect(submitButton).toBeVisible()
})


test('renders email input box', () => {
  render(<AppFunctional />)

  const emailBox = screen.getByPlaceholderText(/type email/i)

  expect(emailBox).toBeInTheDocument()
  expect(emailBox).toBeVisible()
})


test('value changes when typing in email input box', () => {
  render(<AppFunctional />)

  const emailBox = screen.getByPlaceholderText(/type email/i)

  fireEvent.change(emailBox, { target: { value: 'user@test.com' } })

  expect(emailBox.value).toMatch(/user@test.com/i)

})
