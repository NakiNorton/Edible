import * as actions from '../actions';

describe('actions', () => {
  it('should have a type of SET_PLANTS', () => {
    const plants = [1, 2, 3];
    const expectedAction = {
      type: 'SET_PLANTS',
      plants: [1, 2, 3]
    }

    const result = actions.setPlants(plants);

    expect(result).toEqual(expectedAction);
  });
});