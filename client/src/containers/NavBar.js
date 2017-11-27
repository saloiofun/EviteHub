import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Hidden from 'material-ui/Hidden'
import NavButtons from '../components/NavButtons'
import RaisedButton from '../components/RaisedButton'
import Brand from '../components/Brand'
import ToggleSidebar from '../components/ToggleSidebar'

import compose from 'recompose/compose'
import { connect } from 'react-redux'
import * as actionTypes from '../constants/ActionTypes'

const styles = theme => ({
  navSpace: {
    paddingRight: 16
  }
})

class NavBar extends Component {
  goTo (route) {
    this.props.history.replace(`/${route}`)
  }

  login () {
    this.props.auth.login()
  }

  logout () {
    this.props.auth.logout()
  }

  render () {
    const { classes } = this.props
    const { isAuthenticated } = this.props.auth

    return (
      <AppBar>
        <Toolbar disableGutters className={classes.navSpace}>
          <ToggleSidebar onClick={this.props.onToggleSidebar} />
          <Brand />
          <Hidden smDown>
            { isAuthenticated() && (<NavButtons />) }
          </Hidden>
          { !isAuthenticated() && (<RaisedButton onClick={this.login.bind(this)}>Sign In</RaisedButton>) }
          { isAuthenticated() && (<RaisedButton onClick={this.logout.bind(this)}>Sign Out</RaisedButton>) }
        </Toolbar>
      </AppBar>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    onToggleSidebar: () => dispatch({type: actionTypes.TOGGLE_SIDEBAR})
  }
}

export default compose(
  withStyles(styles, {
    name: 'NavBar'
  }),
  connect(null, mapDispatchToProps)
)(NavBar)
