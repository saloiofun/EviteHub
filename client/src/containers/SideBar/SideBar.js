import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as actionCreators from '../../store/actions'

import SideBarView from './SideBarView'

const mapStateToProps = state => ({
  auth: state.auth,
  mobile: state.mobile
})

const mapDispatchToProps = dispatch => ({
  onToggleSidebar: () => dispatch(actionCreators.toggleSidebar())
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBarView))
