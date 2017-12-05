import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  mobileOpen: false
}

const mobileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_SIDEBAR: return updateObject(state, { mobileOpen: !state.mobileOpen })
    default: return state
  }
}

export default mobileReducer
