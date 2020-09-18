export const plants = (state = {}, action) => {
  switch (action.type) {
    case 'SET_EDIBLE_ROOTS':
    const newState = action.plants.reduce((plantsObj, plant) => {
       plantsObj[plant.id] = plant
       return plantsObj
      }, {})
        return newState
    default:
      return state
  }
}






