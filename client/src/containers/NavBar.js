import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Hidden from 'material-ui/Hidden'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'

import NavButtons from '../components/NavButtons'
import RaisedButton from '../components/RaisedButton'
import Brand from '../components/Brand'

import compose from 'recompose/compose'
import { connect } from 'react-redux'
import * as actionTypes from '../constants/ActionTypes'

const drawerWidth = 250

const styles = theme => ({
  navSpace: {
    padding: '0 16px'
  },
  brandCenter: {
    width: '80%',
    margin: '0 auto'
  },
  signinButton: {
    marginLeft: 'auto'
  },
  appBar: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up('lg')]: {
      display: 'none'
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
            <IconButton
              color='contrast'
              aria-label='open drawer'
              onClick={this.props.onToggleSidebar}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
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
        <AppBar className={classes.navbarBgColor}>
          <Toolbar disableGutters className={classNames(classes.navSpace, classes.brandCenter)}>
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
