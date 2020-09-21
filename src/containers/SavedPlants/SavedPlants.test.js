import React from 'react'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import SavedPlants from './SavedPlants'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('SavedPlants Container', () => {
  let fetchedPlants
  beforeEach(() => {
    fetchedPlants = [
      {
        id: 10978,
        common_name: 'garden ginger',
        scientific_name: 'Zingiber officinale',
        image_url: 'https://bs.floristic.org/image/o/bd13',
        list: 'leaves',
        plantSaved: true
      },
      {
        id: 19630,
        common_name: 'lawndaisy',
        scientific_name: 'Bellis perennis',
        image_url: 'https://bs.floristic.org/image/o/430',
        list: 'leaves',
        plantSaved: false
      },
      {
        id: 23768,
        common_name: 'garden cornflower',
        scientific_name: 'Centaurea cyanus',
        image_url: 'https://bs.floristic.org/image/o/2cd',
        list: 'seeds',
        plantSaved: false
      }
    ]
  })

  it('should render the page heading', () => {

    const store = mockStore({
      plants: fetchedPlants
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SavedPlants />
        </MemoryRouter>
      </Provider>
    )

    const pageHeading = screen.getByRole('heading', { name: 'Your Saved Plants' })

    expect(pageHeading).toBeInTheDocument()
  })

  it('should only display saved plants', () => {

    const store = mockStore({
      plants: fetchedPlants
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SavedPlants />
        </MemoryRouter>
      </Provider>
    )

    const savedFlowerName = screen.getByRole('heading', { name: 'garden ginger', exact: false })
    const savedFlowerSciName = screen.getByText('Zingiber officinale', { exact: false })
    const savedFlowerImg = screen.getByAltText('garden ginger')

    const unsavedFlowerName = screen.queryByText('heading', { name: 'lawndaisy', exact: false })
    const unsavedFlowerSciName = screen.queryByText('Bellis perennis', { exact: false })
    const unsavedFlowerImg = screen.queryByAltText('lawndaisy')

    expect(savedFlowerName).toBeInTheDocument();
    expect(savedFlowerSciName).toBeInTheDocument();
    expect(savedFlowerImg).toBeInTheDocument();

    expect(unsavedFlowerName).not.toBeInTheDocument();
    expect(unsavedFlowerSciName).not.toBeInTheDocument();
    expect(unsavedFlowerImg).not.toBeInTheDocument();
  })
})

describe('No SavedPlants', () => {
  it('should display message if there are no saved plants', () => {
    
    let fetchedPlants = [
      {
        id: 10978,
        common_name: 'garden ginger',
        scientific_name: 'Zingiber officinale',
        image_url: 'https://bs.floristic.org/image/o/bd13',
        list: 'leaves',
        plantSaved: false
      },
      {
        id: 19630,
        common_name: 'lawndaisy',
        scientific_name: 'Bellis perennis',
        image_url: 'https://bs.floristic.org/image/o/430',
        list: 'leaves',
        plantSaved: false
      }
    ]

    const store = mockStore({
      plants: fetchedPlants
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SavedPlants />
        </MemoryRouter>
      </Provider>
    )
    
    const message = screen.getByText("You haven't saved any plants yet :(")

    expect(message).toBeInTheDocument()
  })
})