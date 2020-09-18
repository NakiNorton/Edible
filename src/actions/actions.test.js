import * as actions from '../actions';

describe('actions', () => {
  it('should have a type of SET_EDIBLE_PLANTS', () => {
    const plants = [1, 2, 3];
    const expectedAction = {
      type: 'SET_EDIBLE_PLANTS',
      plants: [1, 2, 3]
    }

    const result = actions.setEdiblePlants(plants);
    expect(result).toEqual(expectedAction);
  });

});
