import * as actionTypes from '../actions/ActionTypes'
import AuthService from '../../auth'

const auth = new AuthService()

const initialState = {
  isAuthenticated: auth.isAuthenticated(),
  isFetching: false,
  profile: auth.getProfileR(),
  error: null
}

export default function authReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        profile: action.profile
      }
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        profile: {},
        error: action.error
      }
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        profile: {}
      }
    default:
      return state
  }
}
