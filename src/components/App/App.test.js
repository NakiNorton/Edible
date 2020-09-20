import React from 'react'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'
import { screen, render, fireEvent } from '@testing-library/react'
import App from './App'
import { MemoryRouter } from 'react-router-dom';
import { setPlants, addPlant, removePlant } from '../../actions'
import { Provider } from 'react-redux';
import { fetchEdiblePlants } from '../../helpers/apiCalls'
jest.mock('../../helpers/apiCalls');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


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

  it('should display message while page is loading', () => {

    const pageLoadingMsg = screen.getByRole('heading', 
    { name: 'Page loading...' })

    expect(pageLoadingMsg).toBeInTheDocument();
  })

  // it.skip('should invoke setPlants action', () => {
  //   expect(store.dispatch).toHaveBeenCalledTimes(1);
  //   expect(store.dispatch).toHaveBeenCalledWith(setPlants(fetchedPlants));
  // })



  // it.skip('should display the correct information on page load', () => {
  //   const homeLink = screen.getByText('HOME')
  //   const savedPlantsLink = screen.getByText('SAVED PLANTS')
  //   const heading = screen.getByText('Browse Plants')
    
  //   expect(homeLink).toBeInTheDocument();
  //   expect(savedPlantsLink).toBeInTheDocument();
  //   expect (heading).toBeInTheDocument()
  // })


})