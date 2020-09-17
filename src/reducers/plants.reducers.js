export const plants = (state = [], action) => {
  switch (action.type) {
    case 'SET_EDIBLE_ROOTS':
      const newRootsState = { ...state };
      newRootsState.roots = action.plants
      return newRootsState
    case 'SET_EDIBLE_FLOWERS':
      const newFlowersState = { ...state };
      newFlowersState.flowers = action.plants
      return newFlowersState
    case 'SET_EDIBLE_LEAVES':
      const newLeavesState = { ...state };
      newLeavesState.Leaves = action.plants
      return newLeavesState
    default:
      return state
  }
}



