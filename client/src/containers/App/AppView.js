import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import teal from 'material-ui/colors/teal'

import NavBar from '../NavBar/NavBar'
import SideBar from '../SideBar/SideBar'
import Dashboard from '../../pages/dashboard'
import ViewEvents from '../../pages/viewEvents'
import GuestList from '../../pages/guestList'
import Invitation from '../../pages/invitation'
import SendInvites from '../../pages/sendInvites'
import Home from '../../pages/home'
import Rsvp from '../../pages/rsvp'
import Profile from '../../pages/profile'
import LogOut from '../../pages/logout'

import Callback from '../../callback'
import Auth from '../../auth'

const theme = createMuiTheme({
  palette: {
    primary: teal
  }
})

const styles = theme => ({
  root: {
    width: '100%',
    height: '100vh',
    zIndex: 1
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  content: {
    padding: theme.spacing.unit * 2,
    paddingTop: 80,
    margin: '0 auto',
    marginBottom: 100,
    [theme.breakpoints.up('md')]: {
      margin: '0 auto',
      marginBottom: 100,
      width: '80%'
    }
  }
})

const authService = new Auth()

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    authService.handleAuthentication()
  }
}

class App extends React.Component {
  componentWillMount () {
    if (authService.isAuthenticated()) {
      let accessToken = authService.getAccessToken()
      authService.setProfile(accessToken)
      this.props.loginSuccess(authService.getProfileFromLS())
    }
  }

  render () {
    const { classes } = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <NavBar authService={authService} />
            <SideBar authService={authService} />
            <Switch>
              {/* <Route exact path='/' render={(props) => <Home authService={authService} {...props} />} /> */}
              <Route exact path='/' render={(props) => <Home authService={authService} {...props} />} />
              <Route exact path='/events' render={(props) => (!authService.isAuthenticated() ? <Redirect to='/' /> : <ViewEvents authService={authService} {...props} />)} />
              <Route path='/rsvp' render={(props) => (!authService.isAuthenticated() ? <Redirect to='/' /> : <Rsvp authService={authService} {...props} />)} />
              <Route exact path='/dashboard' render={(props) => (!authService.isAuthenticated() ? <Redirect to='/' /> : <Dashboard authService={authService} {...props} />)} />
              <Route exact path='/guest-list' render={(props) => (!authService.isAuthenticated() ? <Redirect to='/' /> : <GuestList authService={authService} {...props} />)} />
              <Route exact path='/invitation' render={(props) => (!authService.isAuthenticated() ? <Redirect to='/' /> : <Invitation authService={authService} {...props} />)} />
              <Route exact path='/send-invites' render={(props) => (!authService.isAuthenticated() ? <Redirect to='/' /> : <SendInvites authService={authService} {...props} />)} />
              <Route exact path='/profile' render={(props) => (!authService.isAuthenticated() ? <Redirect to='/' /> : <Profile authService={authService} {...props} />)} />
              <Route exact path='/logout' render={(props) => <LogOut hideSideBar={this.hideSideBar} />} />
              <Route path='/callback' render={(props) => {
                handleAuthentication(props)
                return <Callback {...props} />
              }} />
            </Switch>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  loginSuccess: PropTypes.func.isRequired
}

export default withStyles(styles, { withTheme: true })(App)
