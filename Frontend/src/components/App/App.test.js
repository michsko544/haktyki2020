import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('home link is present', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/Home/i)
  expect(linkElement).toBeInTheDocument()
})
