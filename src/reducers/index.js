import { combineReducers } from 'redux'
import { roots } from './roots.reducers'
import { flowers } from './flowers.reducers'

export const rootReducer = combineReducers({
  roots,
  flowers
})