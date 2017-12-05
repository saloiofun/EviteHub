import * as actionTypes from './actionTypes'
// import API from '../../utils/Api'
import axios from 'axios'

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

    axios.get('localhost:3000/api/events/')
    .then(res => {
      console.log(res)
      console.log(res.data)
      const fetchedEvents = []
      for (let key in res.data) {
        fetchedEvents.push({
          ...res.data[key],
          id: key
        })
      }
      dispatch(fetchEventsSuccess(fetchedEvents))
    })
    .catch(err => {
      console.log(err)
      dispatch(fetchEventsFail(err))
    })
  }
}
