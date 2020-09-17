export const roots = (state = [], action) => {
  switch (action.type) {
    case 'SET_EDIBLE_ROOTS':
      const newState = [...state, ...action.roots]
      return newState
    default:
      return state
  }
}


