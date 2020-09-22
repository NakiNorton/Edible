import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'
import { screen, render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { MemoryRouter } from 'react-router-dom'
import { addPlant, removePlant } from '../../actions'
import { Provider } from 'react-redux'
import { fetchEdiblePlants } from '../../helpers/apiCalls'
jest.mock('../../helpers/apiCalls')
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);

describe('App component during page load', () => {
  it('should display message when page is loading', () => {

    const store = mockStore({
      plants: []
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    )

  const message = screen.getByText('Page loading...')
  expect(message).toBeInTheDocument()
  })
})

describe('App component', () => {
  let fetchedPlants
  let store
  beforeEach(() => {
    fetchedPlants = [
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

    fetchEdiblePlants.mockResolvedValue(fetchedPlants)

    store = mockStore({
      plants: fetchedPlants
    })

    store.dispatch = jest.fn()

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    )
  })

  it('should display the correct information when app loads', () => {

    const homeLink = screen.getByText('HOME')
    const savedPlantsLink = screen.getByText('SAVED PLANTS')
    const appHeading = screen.getByText('Edible.')
    const plantsHeading = screen.getByText('Browse Plants')
    const plantIcon = screen.getByAltText('plant icon')
    const factsContent = screen.getByText('Even in the modern world,', { exact: false })
    const plantName = screen.getByText('garden ginger')
    const sciName = screen.getByText('Zingiber officinale', {exact: false})
    const plantImg = screen.getByAltText('garden ginger', { exact: false })
    const button = screen.getAllByRole('button', { name: 'Save' })

    expect(homeLink).toBeInTheDocument();
    expect(savedPlantsLink).toBeInTheDocument()
    expect(appHeading).toBeInTheDocument()
    expect(plantsHeading ).toBeInTheDocument()
    expect(factsContent).toBeInTheDocument()
    expect(plantIcon).toBeInTheDocument()
    expect(plantName).toBeInTheDocument()
    expect(sciName).toBeInTheDocument()
    expect(plantImg).toBeInTheDocument()
    expect(button).toHaveLength(3)
  })

  it('user should be able to search for a plant(s) and only see search results displayed', () => {
    
    const searchBox = screen.getByPlaceholderText('Search by plant name...')
    const searchBtn = screen.getByRole('button', { name: 'Search' })
    
    fireEvent.change(searchBox, { target: { value: 'Bellis' } })
    fireEvent.click(searchBtn)

    const name = screen.queryByText('garden ginger')
    const name1 = screen.queryByText('lawndaisy')
    const sciName = screen.queryByText('Zingiber officinale', { exact: false })
    const plantImg = screen.queryByText('garden ginger', { exact: false })
  
    expect(name).not.toBeInTheDocument()
    expect(sciName).not.toBeInTheDocument()
    expect(plantImg).not.toBeInTheDocument()
    expect(name1).toBeInTheDocument()
  })

  it('user should be able to filter the plants being displayed by edible part category', () => {

    const form = screen.getByTestId('select-one')
    const userInput = screen.getByTestId('seeds')
    const filterButton = screen.getByRole('button', { name: 'Submit' })

    userEvent.selectOptions(form, 'seeds')
    fireEvent.click(filterButton)

    expect(userInput.selected).toBe(true)
    expect(userInput.value).toBe('seeds')

    const flowerPlantName1 = screen.queryByText('lawndaisy')
    const flowerPlantName2 = screen.queryByText('garden ginger')
    const seedPlantName = screen.queryByText('garden cornflower')

    expect(flowerPlantName1).not.toBeInTheDocument()
    expect(flowerPlantName2).not.toBeInTheDocument()
    expect(seedPlantName).toBeInTheDocument()
  })
})

describe('App component, user save/unsave interaction', () => {
  it('user should be able to save a plant', () => {

    const plants = [
      {
        id: 10978,
        common_name: 'garden ginger',
        scientific_name: 'Zingiber officinale',
        image_url: 'https://bs.floristic.org/image/o/bd13',
        list: 'leaves',
        plantSaved: false
      }
    ]

    let store = mockStore({
      plants: plants
    })

    store.dispatch = jest.fn()

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App addPlant={jest.fn()} removePlant={jest.fn()} />
        </MemoryRouter>
      </Provider>
    )

    const id = 10978
    const saveButton = screen.getByRole('button', { name: 'Save' })
    
    fireEvent.click(saveButton)

    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(store.dispatch).toHaveBeenCalledWith(addPlant(id))
  })

  it('user should be able to unsave a plant', () => {

    const plants = [
      {
        id: 10978,
        common_name: 'garden ginger',
        scientific_name: 'Zingiber officinale',
        image_url: 'https://bs.floristic.org/image/o/bd13',
        list: 'leaves',
        plantSaved: true
      }
    ]

    let store = mockStore({
      plants: plants
    })

    store.dispatch = jest.fn()

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App addPlant={jest.fn()} removePlant={jest.fn()} />
        </MemoryRouter>
      </Provider>
    )

    const id = 10978
    const savedButton = screen.queryByRole('button', { name: 'Saved' })

    fireEvent.click(savedButton)

    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(store.dispatch).toHaveBeenCalledWith(removePlant(id))
  })
})