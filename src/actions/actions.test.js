import * as actions from '../actions';

describe('actions', () => {
  it('should have a type of SET_EDIBLE_ROOTS', () => {
    const plants = [1, 2, 3];
    const expectedAction = {
      type: 'SET_EDIBLE_ROOTS',
      plants: [1, 2, 3]
    }

    const result = actions.setEdiblePlants(plants);
    expect(result).toEqual(expectedAction);
  });

  it('should have a type of SET_EDIBLE_FLOWERS', () => {
    const plants = [1, 2, 3];
    const expectedAction = {
      type: 'SET_EDIBLE_FLOWERS',
      plants: [1, 2, 3]
    }

    const result = actions.setEdibleFlowers(plants);
    expect(result).toEqual(expectedAction);
  });

  it('should have a type of SET_EDIBLE_LEAVES', () => {
    const plants = [1, 2, 3];
    const expectedAction = {
      type: 'SET_EDIBLE_LEAVES',
      plants: [1, 2, 3]
    }

    const result = actions.setEdibleLeaves(plants);
    expect(result).toEqual(expectedAction);
  });
});
