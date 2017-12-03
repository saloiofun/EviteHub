import * as types from '../actions/ActionTypes'
import AuthService from '../../auth'

const auth = new AuthService()

const initialState = {
  isAuthenticated: auth.isAuthenticated(),
  isFetching: false,
  profile: auth.getProfile(),
  error: null
}

export default function authReducer (state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        profile: action.profile
      }
    case types.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        profile: {},
        error: action.error
      }
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        profile: {}
      }
    default:
      return state
  }
}
