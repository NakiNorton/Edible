import React from 'react'
import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import Header from './Header'
import { MemoryRouter } from 'react-router-dom'

describe('Header component', () => {
  it('should display the correct information on page load', () => {

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const homeLink = screen.getByText('HOME')
    const savedPlantsLink = screen.getByText('SAVED PLANTS')

    expect(homeLink).toBeInTheDocument();
    expect(savedPlantsLink).toBeInTheDocument();
  })
})