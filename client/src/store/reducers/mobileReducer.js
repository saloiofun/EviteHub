import * as actionTypes from '../actions/ActionsTypes'

const initialState = {
  mobileOpen: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        mobileOpen: !state.mobileOpen
      }
    default:
      return state
  }
}

export default reducer
