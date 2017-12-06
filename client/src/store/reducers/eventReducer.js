import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  events: [],
  loading: false,
  currentEvent: {}
}

const fetchEventsStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const fetchEventsSuccess = (state, action) => {
  return updateObject(state, {
    events: action.events,
    loading: false
  })
}

const fetchEventsFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const updateCurrentEvent = (state, action) => {
  return updateObject(state, { currentEvent: action.currentEvent })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_EVENTS_START: return fetchEventsStart(state, action)
    case actionTypes.FETCH_EVENTS_SUCCESS: return fetchEventsSuccess(state, action)
    case actionTypes.FETCH_EVENTS_FAIL: return fetchEventsFail(state, action)
    case actionTypes.UPDATE_CURRENT_EVENT: return updateCurrentEvent(state, action)
    default: return state
  }
}

export default reducer
