import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  toDoCount: 0,
  toDoCompleted: 0,
  allGuest: 0,
  rsvpGuest: 0,
  loading: false
}

const fetchDashboardStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const fetchDashboardGuestSuccess = (state, action) => {
  return updateObject(state, {
    allGuest: action.allGuest,
    rsvpGuest: action.rsvpGuest,
    loading: false
  })
}

const fetchDashboardTodoSuccess = (state, action) => {
  return updateObject(state, {
    toDoCount: action.toDoCount,
    toDoCompleted: action.toDoCompleted,
    loading: false
  })
}

const fetchDashboardFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DASHBOARD_START: return fetchDashboardStart(state, action)
    case actionTypes.FETCH_DASHBOARD_GUEST_SUCCESS: return fetchDashboardGuestSuccess(state, action)
    case actionTypes.FETCH_DASHBOARD_TODO_SUCCESS: return fetchDashboardTodoSuccess(state, action)
    case actionTypes.FETCH_DASHBOARD_FAIL: return fetchDashboardFail(state, action)
    default: return state
  }
}

export default reducer
