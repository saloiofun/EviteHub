import * as actionTypes from './actionTypes'
import API from '../../utils/Api'

// export const getAllEvents = () => {
//   return {
//     type: actionTypes.EVENT_GET_ALL
//   }
// }

// export const viewAllEvents = () => {
//   return (dispatch) => {
//     setTimeout(() => {
//       dispatch(getAllEvents)
//     }, 2000)
//   }
// }

// export const storeEvent = () => {
//   return (dispatch, getState) => {
//     setTimeout(() => {
//       const userEmail = getState().auth.profile.email
//       console.log(userEmail)
//       dispatch(getAllEvents)
//     }, 2000)
//   }
// }

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
      dispatch(fetchEventsFail(err))
    })
  }
}
