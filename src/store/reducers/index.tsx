import { combineReducers } from '@reduxjs/toolkit'
import UsersReducer from './UsersReducer'

const rootReducers = combineReducers({
  users: UsersReducer,
})

export default rootReducers
