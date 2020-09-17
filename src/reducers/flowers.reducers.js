export const flowers = (state = [], action) => {
  switch (action.type) {
    case 'SET_EDIBLE_FLOWERS':
      const newState = [...state, ...action.flowers]
      return newState
    default:
      return state
  }
}