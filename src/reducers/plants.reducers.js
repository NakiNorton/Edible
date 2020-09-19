export const plants = (state = [], action) => {
  switch (action.type) {
    case 'SET_EDIBLE_PLANTS':
      const newState = action.plants
      return newState
    case 'ADD_PLANT':
      const modifiedState = state
      modifiedState.filter(plant => {
        if(plant.id === action.plants) {
         return plant.plantSaved = true;
        } 
      })
      return modifiedState



    case 'REMOVE_PLANT':
      const removePlant = action.plants
      return removePlant
    default:
      return state
  }
}





