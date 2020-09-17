import { roots } from './roots.reducers';
import { flowers } from './flowers.reducers';

describe('Plants Reducer', () => {
  it('Should return the initial state for roots', () => {

    const expected = [];
    const result = roots(undefined, {});

    expect(result).toEqual(expected)
  })

  it('Should return the initial state for flowers', () => {
    const expected = [];
    const result = flowers(undefined, {});

    expect(result).toEqual(expected)
  })
})
