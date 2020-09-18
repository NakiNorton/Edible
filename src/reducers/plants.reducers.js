export const plants = (state = [], action) => {
  switch (action.type) {
    case 'SET_EDIBLE_PLANTS':
      const newState = action.plants
      return newState
    default:
      return state
  }
}





