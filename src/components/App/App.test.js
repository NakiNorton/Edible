import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'
import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import App from './App'
import { MemoryRouter } from 'react-router-dom';
import { setPlants, addPlant, removePlant } from '../../actions'
import { Provider } from 'react-redux';
import { fetchEdiblePlants } from '../../helpers/apiCalls'
jest.mock('../../helpers/apiCalls');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('App component while loading', () => {
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
  let fetchedPlants;
  let store;
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

    fetchEdiblePlants.mockResolvedValue(fetchedPlants);

    store = mockStore({
      plants: fetchedPlants
    })

    store.dispatch = jest.fn();

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
    const rootName = screen.getByText('garden ginger')
    const rootSciName = screen.getByText('Zingiber officinale', {exact: false})
    const rootImg = screen.getByAltText('garden ginger', { exact: false })
    const button = screen.getAllByRole('button', { name: 'Save' })

    expect(homeLink).toBeInTheDocument();
    expect(savedPlantsLink).toBeInTheDocument();
    expect(appHeading).toBeInTheDocument()
    expect(plantsHeading ).toBeInTheDocument()
    expect(factsContent).toBeInTheDocument()
    expect(plantIcon).toBeInTheDocument()
    expect(rootName).toBeInTheDocument()
    expect(rootSciName).toBeInTheDocument()
    expect(rootImg).toBeInTheDocument()
    expect(button).toHaveLength(3)
  })

  it('user should be able to search for a plant', async () => {
    const searchBox = screen.getByPlaceholderText('Search by plant name...')
    const searchBtn = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(searchBox, { target: { value: 'ginger' } })
    fireEvent.click(searchBtn)

    const name = await waitFor(() => screen.getByText('garden ginger'))
    const sciName = await waitFor(() => screen.getByText('Zingiber officinale', { exact: false }))
    const plantImg = await waitFor(() => screen.getByAltText('garden ginger', { exact: false }))

    expect(name).toBeInTheDocument()
    expect(sciName).toBeInTheDocument()
    expect(plantImg).toBeInTheDocument()
  })
})

  describe('App component, user save/unsave interaction', () => {
    it('user should be able to save a plant', () => {
      const fetchedPlants = [
        {
          id: 10978,
          common_name: 'garden ginger',
          scientific_name: 'Zingiber officinale',
          image_url: 'https://bs.floristic.org/image/o/bd13',
          list: 'leaves',
          plantSaved: false
        }
      ]

      fetchEdiblePlants.mockResolvedValue(fetchedPlants);

      let store = mockStore({
        plants: fetchedPlants
      })

      store.dispatch = jest.fn();

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
      expect(store.dispatch).toHaveBeenCalledWith(addPlant(id));
  })

  it('user should be able to unsave a plant', () => {
    const fetchedPlants = [
      {
        id: 10978,
        common_name: 'garden ginger',
        scientific_name: 'Zingiber officinale',
        image_url: 'https://bs.floristic.org/image/o/bd13',
        list: 'leaves',
        plantSaved: true
      }
    ]

    fetchEdiblePlants.mockResolvedValue(fetchedPlants);

    let store = mockStore({
      plants: fetchedPlants
    })

    store.dispatch = jest.fn();

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
    expect(store.dispatch).toHaveBeenCalledWith(removePlant(id));
  })

})