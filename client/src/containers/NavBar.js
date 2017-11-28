import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
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

const drawerWidth = 250

const styles = theme => ({
  navSpace: {
    padding: '0 16px'
  },
  signinButton: {
    marginLeft: 'auto'
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
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
    if (isAuthenticated()) {
      return (
        <AppBar className={classes.appBar}>
          <Toolbar disableGutters className={classes.navSpace}>
            <ToggleSidebar onClick={this.props.onToggleSidebar} />
            <Hidden smDown>
              <NavButtons />
            </Hidden>
            <div className={classes.signinButton}>
              <RaisedButton onClick={this.logout.bind(this)}>Sign Out</RaisedButton>
            </div>
          </Toolbar>
        </AppBar>
      )
    } else {
      return (
        <AppBar>
          <Toolbar disableGutters className={classes.navSpace}>
            <Brand disableRipple />
            <div className={classes.signinButton}>
              <RaisedButton onClick={this.login.bind(this)}>Sign In</RaisedButton>
            </div>
          </Toolbar>
        </AppBar>
      )
    }
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
