import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as actionCreators from '../../store/actions'

import NavBarView from './NavBarView'

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  loginRequest: () => dispatch(actionCreators.loginRequest()),
  logoutSuccess: () => dispatch(actionCreators.logoutSuccess()),
  onToggleSidebar: () => dispatch(actionCreators.toggleSidebar())
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBarView))
