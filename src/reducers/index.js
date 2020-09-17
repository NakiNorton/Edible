import { combineReducers } from 'redux'
import { plants } from './plants.reducers'

export const rootReducer = combineReducers({
  plants
})