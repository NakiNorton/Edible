import React from 'react'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import PlantCard from './PlantCard'
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from '../../reducers';
// jest.mock('../../API');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('PlantCard component', () => {
  let fetchedRoots;
  let fetchedFlowers;
  beforeEach(() => {
    fetchedRoots = [
      {
        id: 10978,
        common_name: 'garden ginger',
        scientific_name: 'Zingiber officinale',
        image_url: 'https://bs.floristic.org/image/o/bd13'
      },
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

  it('should render the plant information', () => {
    const store = mockStore({
      roots: fetchedRoots,
      flowers: fetchedFlowers,
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlantCard
            key={10978}
            id={10978}
            plantName={'garden ginger'}
            image={'https://bs.floristic.org/image/o/bd13'}
            sciName={'Zingiber officinale'}
          />
        </MemoryRouter>
      </Provider>
    )

    const rootName = screen.getByText('Common name: garden ginger')
    const rootSciName = screen.getByText('Scientific name: Zingiber officinale')
    const rootImg = screen.getByAltText('garden ginger')

    expect(rootName).toBeInTheDocument();
    expect(rootSciName).toBeInTheDocument();
    expect(rootImg).toBeInTheDocument();
  })

/* ADD TEST FOR SAVED PLANTS ************************************

    it('the users saved plants should be displayed with a filled in heart icon', () => {
    */

})