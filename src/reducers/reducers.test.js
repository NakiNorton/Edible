import { plants } from './plants.reducers';

describe('Plants Reducer', () => {
  it('Should return the initial state', () => {

    const expected = [];
    const result = plants(undefined, {});

    expect(result).toEqual(expected)
  })
})
