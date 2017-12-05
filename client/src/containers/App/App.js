import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as actionCreators from '../../store/actions'
import AppView from './AppView'

const mapDispatchToProps = dispatch => ({
  loginSuccess: profile => dispatch(actionCreators.loginSuccess(profile)),
  loginError: error => dispatch(actionCreators.loginError(error))
})

export default withRouter(connect(
  null, // no mapStateToProps
  mapDispatchToProps
)(AppView))
