import React from 'react'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import Plants from './Plants'
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from '../../reducers';
// jest.mock('../../API');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Plants Container', () => {
  let fetchedRoots;
  let fetchedFlowers;
  beforeEach(() => {
    fetchedRoots = [
      { id: 10978, 
        common_name: 'garden ginger', 
        scientific_name: 'Zingiber officinale', 
        image_url: 'https://bs.floristic.org/image/o/bd13'
      },
        {
        id: 19630,
          common_name: 'lawndaisy',
          scientific_name: 'Bellis perennis',
          image_url: 'https://bs.floristic.org/image/o/430'
        }
    ]
    fetchedFlowers = [
      {
        id: 23768,
          common_name: 'garden cornflower',
          scientific_name: 'Centaurea cyanus',
          image_url: 'https://bs.floristic.org/image/o/2cd'
      }
    ]
  })

  it('should render the page heading', () => {
    const store = mockStore({
      roots: fetchedRoots,
      flowers: fetchedFlowers,
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
      roots: fetchedRoots,
      flowers: fetchedFlowers,
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Plants />
        </MemoryRouter>
      </Provider>
    )
    
    const rootName = screen.getByText('Common name: garden ginger')
    const rootSciName = screen.getByText('Scientific name: Zingiber officinale')
    const rootImg = screen.getByAltText('garden ginger')
    const flowerName = screen.getByText('Common name: garden cornflower')
    const flowerSciName = screen.getByText('Scientific name: Centaurea cyanus')
    const flowerImg = screen.getByAltText('garden cornflower')

    expect(rootName).toBeInTheDocument();
    expect(rootSciName).toBeInTheDocument();
    expect(rootImg).toBeInTheDocument();
    expect(flowerName).toBeInTheDocument();
    expect(flowerSciName).toBeInTheDocument();
    expect(flowerImg).toBeInTheDocument();
  })
})