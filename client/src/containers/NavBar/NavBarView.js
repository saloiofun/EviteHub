import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Hidden from 'material-ui/Hidden'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'

import NavButtons from '../../components/NavButtons'
import RaisedButton from '../../components/RaisedButton'
import Brand from '../../components/Brand'

import AuthService from '../../auth'

const Auth = new AuthService()

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

const NavBarView = ({ authService, auth, loginRequest, logoutSuccess, onToggleSidebar, classes }) =>
(<div>
  {auth.isAuthenticated
    ? <AppBar className={classes.appBar}>
      <Toolbar disableGutters className={classes.navSpace}>
        <IconButton
          color='contrast'
          aria-label='open drawer'
          onClick={() => {
            onToggleSidebar()
          }}
          className={classes.navIconHide} >
          <MenuIcon />
        </IconButton>
        <Hidden smDown>
          <NavButtons />
        </Hidden>
        <div className={classes.signinButton}>
          <RaisedButton onClick={() => {
            logoutSuccess()
            Auth.logout()
          }}>Sign Out</RaisedButton>
        </div>
      </Toolbar>
    </AppBar>
    : <AppBar className={classes.navbarBgColor}>
      <Toolbar disableGutters className={classNames(classes.navSpace, classes.brandCenter)}>
        <Brand disableRipple />
        <div className={classes.signinButton}>
          <RaisedButton onClick={() => {
            authService.login()
            loginRequest()
          }}>Sign In</RaisedButton>
        </div>
      </Toolbar>
    </AppBar>
  }
  {auth.error &&
    <p>{auth.error}</p>
  }
</div>)

NavBarView.propTypes = {
  classes: PropTypes.object.isRequired,
  authService: PropTypes.object.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    profile: PropTypes.object,
    error: PropTypes.string
  }).isRequired,
  loginRequest: PropTypes.func.isRequired,
  logoutSuccess: PropTypes.func.isRequired,
  onToggleSidebar: PropTypes.func.isRequired
}

export default withStyles(styles)(NavBarView)
