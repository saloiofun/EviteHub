import * as actionTypes from './actionTypes'
import API from '../../utils/Api'

export const fetchEventsSuccess = (events) => {
  return {
    type: actionTypes.FETCH_EVENTS_SUCCESS,
    events: events
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

export const fetchEvents = () => {
  return dispatch => {
    dispatch(fetchEventsStart())
    API.getEvents()
    .then(res => {
      console.log(res)
      console.log(res.data)
      const fetchedEvents = res.data
      dispatch(fetchEventsSuccess(fetchedEvents))
    })
    .catch(err => {
      dispatch(fetchEventsFail(err))
    })
  }
}
