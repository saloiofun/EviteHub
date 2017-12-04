import { combineReducers } from 'redux'

import mobileReducer from './mobileReducer'
import authReducer from './authReducer'

export default combineReducers({
  mobile: mobileReducer,
  auth: authReducer
})
