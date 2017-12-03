import * as actionTypes from './ActionTypes'

export function loginRequest () {
  return {
    type: actionTypes.LOGIN_REQUEST
  }
}

export function loginSuccess (profile) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    profile
  }
}

export function loginError (error) {
  return {
    type: actionTypes.LOGIN_FAILURE,
    error
  }
}

export function logoutSuccess () {
  return {
    type: actionTypes.LOGOUT_SUCCESS
  }
}
