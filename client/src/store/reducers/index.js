import { combineReducers } from 'redux'

import mobileReducer from './mobileReducer'
import authReducer from './authReducer'
import eventReducer from './eventReducer'
import dashboardReducer from './dashboardReducer'

export default combineReducers({
  mobile: mobileReducer,
  auth: authReducer,
  event: eventReducer,
  dashboard: dashboardReducer
})
