import * as actions from '../actions';

describe('actions', () => {
  it('should have a type of SET_EDIBLE_PLANTS', () => {
    const plants = [
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
    const expectedAction = {
      type: 'SET_EDIBLE_PLANTS',
      plants: plants 
    }

    const result = actions.setEdiblePlants(plants);
    expect(result).toEqual(expectedAction);
  });

  it('should have a type of ADD_PLANT', () => {
    const plants = {
      id: 10978,
      common_name: 'garden ginger',
      scientific_name: 'Zingiber officinale',
      image_url: 'https://bs.floristic.org/image/o/bd13',
      list: 'leaves',
      plantSaved: false
    }

    const expectedAction = {
      type: 'ADD_PLANT',
      plants: plants
    }

    const result = actions.addPlant(plants);
    expect(result).toEqual(expectedAction);
  });

  it('should have a type of REMOVE_PLANT', () => {
    const plants = {
      id: 10978,
      common_name: 'garden ginger',
      scientific_name: 'Zingiber officinale',
      image_url: 'https://bs.floristic.org/image/o/bd13',
      list: 'leaves',
      plantSaved: false
    }

    const expectedAction = {
      type: 'REMOVE_PLANT',
      plants: plants
    }

    const result = actions.removePlant(plants);
    expect(result).toEqual(expectedAction);
  });

});
