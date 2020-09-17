import * as actions from '../actions';

describe('actions', () => {
  it('should have a type of SET_EDIBLE_ROOTS', () => {
    const roots = [1, 2, 3];
    const expectedAction = {
      type: 'SET_EDIBLE_ROOTS',
      roots: [1, 2, 3]
    }

    const result = actions.setEdibleRoots(roots);

    expect(result).toEqual(expectedAction);
  });

  it('should have a type of SET_EDIBLE_flowers', () => {
    const flowers = [1, 2, 3];
    const expectedAction = {
      type: 'SET_EDIBLE_FLOWERS',
      flowers: [1, 2, 3]
    }

    const result = actions.setEdibleFlowers(flowers);

    expect(result).toEqual(expectedAction);
  });
});
