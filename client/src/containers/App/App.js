import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { authActions } from '../../store/actions'
import AppView from './AppView'

const mapDispatchToProps = dispatch => ({
  loginSuccess: profile => dispatch(authActions.loginSuccess(profile))
})

export default withRouter(connect(
  null, // no mapStateToProps
  mapDispatchToProps
)(AppView))
