import React from 'react'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'
import { screen, render, fireEvent } from '@testing-library/react'
import PlantCard from './PlantCard'
import { MemoryRouter } from 'react-router-dom';
import { addPlant, removePlant } from '../../actions'
import { Provider } from 'react-redux';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('PlantCard component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      plants: [
      {
        id: 10978,
        common_name: 'garden ginger',
        scientific_name: 'Zingiber officinale',
        image_url: 'https://bs.floristic.org/image/o/bd13',
        list: 'leaves',
        plantSaved: false
      },
      {
        id: 23768,
        common_name: 'garden cornflower',
        scientific_name: 'Centaurea cyanus',
        image_url: 'https://bs.floristic.org/image/o/2cd',
        list: 'leaves',
        plantSaved: false
      }
    ]
  })

  store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlantCard
            key={10978}
            id={10978}
            plantName={'GARDEN GINGER'}
            image={'https://bs.floristic.org/image/o/bd13'}
            sciName={'Zingiber officinale'}
            list={'leaves'}
            isSaved={false}
          />
        </MemoryRouter>
      </Provider>
    )
  })

  it('should render the plant information', () => {

    const rootName = screen.getByText('GARDEN GINGER')
    const rootSciName = screen.getByText('Zingiber officinale', { exact: false })
    const rootImg = screen.getByAltText('garden ginger', { exact: false })
    const button = screen.getByRole('button', { name: 'Save'})

    expect(rootName).toBeInTheDocument();
    expect(rootSciName).toBeInTheDocument();
    expect(rootImg).toBeInTheDocument();
    expect(button).toBeInTheDocument()
  })

  it('should fire addPlant action when Save button is clicked', () => {
    
  const id = 10978
  const saveButton = screen.getByRole('button', { name: 'Save' })
  
  fireEvent.click(saveButton)

  expect(store.dispatch).toHaveBeenCalledTimes(1);
  expect(store.dispatch).toHaveBeenCalledWith(addPlant(id));
  })

  it('should fire removePlant action when Saved button is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlantCard
            key={10978}
            id={10978}
            plantName={'GARDEN GINGER'}
            image={'https://bs.floristic.org/image/o/bd13'}
            sciName={'Zingiber officinale'}
            list={'leaves'}
            isSaved={true}
          />
        </MemoryRouter>
      </Provider>
    )
    const id = 10978
    const saveButton = screen.getByRole('button', { name: 'Saved' })
    
    fireEvent.click(saveButton)

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(removePlant(id));
  })
})