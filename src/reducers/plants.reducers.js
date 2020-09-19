export const plants = (state = [], action) => {
  switch (action.type) {
    case 'SET_EDIBLE_PLANTS':
      const newState = action.plants
      return newState
    case 'ADD_PLANT':
      const updatedSavedValue = state
      updatedSavedValue.filter(plant => {
        if(plant.id === action.plants) {
         return plant.plantSaved = true;
        } 
      })
      return [...state, updatedSavedValue]
    case 'REMOVE_PLANT':
      const revertedSavedValue = state
      revertedSavedValue.filter(plant => {
        if (plant.id === action.plants) {
          return plant.plantSaved = false;
        }
      })
      return [ ...state, revertedSavedValue ]
    default:
      return state
  }
}





