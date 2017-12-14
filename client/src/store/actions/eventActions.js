import * as actionTypes from './actionTypes'
import API from '../../utils/Api'

export const fetchEventsSuccess = (events, currentEvent) => {
  return {
    type: actionTypes.FETCH_EVENTS_SUCCESS,
    events: events,
    currentEvent: currentEvent
  }
}

export const fetchEventsFail = (error) => {
  return {
    type: actionTypes.FETCH_EVENTS_FAIL,
    error: error
  }
}

export const fetchEventsStart = () => {
  return {
    type: actionTypes.FETCH_EVENTS_START
  }
}

export const updateCurrentEvent = (currentEvent, selectedIndex) => {
  return {
    type: actionTypes.UPDATE_CURRENT_EVENT,
    currentEvent: currentEvent,
    selectedIndex: selectedIndex
  }
}

export const updateAllEvents = (events) => {
  return {
    type: actionTypes.UPDATE_ALL_EVENTS,
    events: events
  }
}

export const fetchEvents = (userId) => {
  return dispatch => {
    dispatch(fetchEventsStart())
    API.getEventByUserId(userId)
    .then(res => {
      const fetchedEvents = res.data
      const currentEvent = res.data.length !== 0 ? res.data[0] : {}
      dispatch(fetchEventsSuccess(fetchedEvents, currentEvent))
    })
    .catch(err => {
      dispatch(fetchEventsFail(err))
    })
  }
}
