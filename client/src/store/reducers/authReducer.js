import * as actionTypes from '../actions/actionTypes'
import AuthService from '../../auth'
import { updateObject } from '../utility'

const auth = new AuthService()

const initialState = {
  isAuthenticated: auth.isAuthenticated(),
  isFetching: false,
  profile: auth.getProfileFromLS(),
  error: null
}

export default function authReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return updateObject(state, {
        isFetching: true,
        error: null
      })
    case actionTypes.LOGIN_SUCCESS:
      return updateObject(state, {
        isFetching: false,
        isAuthenticated: true,
        profile: action.profile
      })
    case actionTypes.LOGIN_FAILURE:
      return updateObject(state, {
        isFetching: false,
        isAuthenticated: false,
        profile: {},
        error: action.error
      })
    case actionTypes.LOGOUT_SUCCESS:
      return updateObject(state, {
        isAuthenticated: false,
        profile: {}
      })
    default: return state
  }
}
