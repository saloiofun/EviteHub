import * as ActionTypes from './ActionTypes'

export const getAllEvents = () => {
  return {
    type: ActionTypes.EVENT_GET_ALL
  }
}

export const viewAllEvents = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(getAllEvents)
    }, 2000)
  }
}

export const storeEvent = () => {
  return (dispatch, getState) => {
    setTimeout(() => {
      const userEmail = getState().auth.profile.email
      console.log(userEmail)
      dispatch(getAllEvents)
    }, 2000)
  }
}
