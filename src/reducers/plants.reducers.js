export const plants = (state = [], action) => {
  switch (action.type) {
    case 'SET_PLANTS':
      const newState = [...state, ...action.plants]
      return newState
    default:
      return state
  }
}