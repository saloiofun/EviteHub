import { combineReducers } from 'redux'

import mobileReducer from './mobileReducer'
import authReducer from './authReducer'
import eventReducer from './eventReducer'

export default combineReducers({
  mobile: mobileReducer,
  auth: authReducer,
  event: eventReducer
})
