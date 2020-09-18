import React from 'react'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'
import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Plants from './Plants'
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from '../../reducers';
jest.mock()
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Plants Container', () => {
  let fetchedPlants;
  beforeEach(() => {
    fetchedPlants = [
      { id: 10978, 
        common_name: 'garden ginger', 
        scientific_name: 'Zingiber officinale', 
        image_url: 'https://bs.floristic.org/image/o/bd13',
        list: 'leaves'
      },
      {
      id: 19630,
        common_name: 'lawndaisy',
        scientific_name: 'Bellis perennis',
        image_url: 'https://bs.floristic.org/image/o/430',
        list: 'leaves',
      },
      {
        id: 23768,
        common_name: 'garden cornflower',
        scientific_name: 'Centaurea cyanus',
        image_url: 'https://bs.floristic.org/image/o/2cd',
        list: 'seeds',
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
          <Plants />
        </MemoryRouter>
      </Provider>
      )
  
    const pageHeading = screen.getByRole('heading', {name: 'Browse Plants'})

    expect(pageHeading).toBeInTheDocument();
  })

  it('should render the plants container', () => {
    const store = mockStore({
      plants: fetchedPlants
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Plants />
        </MemoryRouter>
      </Provider>
    )

    const flowerName = screen.getByText('Common name: garden ginger')
    const flowerSciName = screen.getByText('Scientific name: Zingiber officinale')
    const flowerImg = screen.getByAltText('garden ginger')

    expect(flowerName).toBeInTheDocument();
    expect(flowerSciName).toBeInTheDocument();
    expect(flowerImg).toBeInTheDocument();
  })

  it('should render a search container', () => {
    const store = mockStore({
      plants: fetchedPlants
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Plants />
        </MemoryRouter>
      </Provider>
    )

    const searchArea = screen.getByPlaceholderText('Search by plant name..')
    expect(searchArea).toBeInTheDocument()
  })


  it('should render a search container', () => {
    const store = mockStore({
      plants: fetchedPlants
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Plants />
        </MemoryRouter>
      </Provider>
    )

    const searchArea = screen.getByPlaceholderText('Search by plant name..')
    const searchBtn = screen.getByText('Search');

    expect(searchArea).toBeInTheDocument()
    expect(searchBtn).toBeInTheDocument()
  })

  it('should have search value inputted by user', () => {
    const store = mockStore({
      plants: fetchedPlants
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Plants />
        </MemoryRouter>
      </Provider>
    )
    const searchInput = screen.getByPlaceholderText('Search by plant name..')
    
    fireEvent.change(searchInput, { target: { value: 'ginger' }})

    expect(searchInput).toBeInTheDocument() 
  })

  it('should render filter dropdown form', () => {
    const store = mockStore({
      plants: fetchedPlants
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Plants />
        </MemoryRouter>
      </Provider>
    )
    const filterMenu = screen.getByLabelText('select filter value')
    expect(filterMenu).toBeInTheDocument()
  })

  it('should have filter value selected by user', () => {
    const store = mockStore({
      plants: fetchedPlants
    })

    render (
      <Provider store={store}>
        <MemoryRouter>
          <Plants />
        </MemoryRouter>
      </Provider>
    )
    
    const form = screen.getByTestId('select-one');
    const userInput = screen.getByTestId('seeds');

    userEvent.selectOptions(form, 'seeds')
    
    expect(userInput.selected).toBe(true);
  })
})