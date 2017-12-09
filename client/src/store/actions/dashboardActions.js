import * as actionTypes from './actionTypes'
import API from '../../utils/Api'

export const fetchDashboardGuestSuccess = (allGuest, rsvpGuest) => {
  return {
    type: actionTypes.FETCH_DASHBOARD_GUEST_SUCCESS,
    allGuest: allGuest,
    rsvpGuest: rsvpGuest
  }
}

export const fetchDashboardTodoSuccess = (toDoCount, toDoCompleted) => {
  return {
    type: actionTypes.FETCH_DASHBOARD_TODO_SUCCESS,
    toDoCount: toDoCount,
    toDoCompleted: toDoCompleted
  }
}

export const fetchDashboardFail = (error) => {
  return {
    type: actionTypes.FETCH_DASHBOARD_FAIL,
    error: error
  }
}

export const fetchDashboardStart = () => {
  return {
    type: actionTypes.FETCH_DASHBOARD_START
  }
}

export const fetchGuestDashboard = (currentEventId) => {
  return dispatch => {
    dispatch(fetchDashboardStart())

    API.getGuestByEvent(currentEventId)
    .then(res => {
      const allGuest = res.data.guest.length || 0
      const rsvpGuest = res.data.guest.filter(guest => guest.rsvp).length || 0
      dispatch(fetchDashboardGuestSuccess(allGuest, rsvpGuest))
    })
    .catch(err => { dispatch(fetchDashboardFail(err)) })
  }
}

export const fetchTodoDashboard = (currentEventId) => {
  return dispatch => {
    dispatch(fetchDashboardStart())

    API.getTodoByEvent(currentEventId)
    .then(res => {
      const toDoCount = res.data.todo.length || 0
      const toDoCompleted = res.data.todo.filter(todo => todo.todoDone).length || 0
      dispatch(fetchDashboardTodoSuccess(toDoCount, toDoCompleted))
    })
    .catch(err => { dispatch(fetchDashboardFail(err)) })
  }
}
