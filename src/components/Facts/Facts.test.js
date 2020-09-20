import React from 'react'
import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import Facts from './Facts'
import { MemoryRouter } from 'react-router-dom';

describe('Facts component', () => {
  it('should display the correct information on page load', () => {

    render(
      <MemoryRouter>
        <Facts />
      </MemoryRouter>
    )

    const factsContainer = screen.getByText('Even in the modern world', { exact: false })
    const plantIcon = screen.getByAltText('plant icon')

    expect(plantIcon).toBeInTheDocument()
    expect(factsContainer).toBeInTheDocument()
  })
})