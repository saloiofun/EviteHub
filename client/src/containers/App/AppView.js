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
import history from '../../history'
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

const auth = new Auth()

class App extends React.Component {
  render () {
    const { classes } = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <NavBar authService={auth} />
            <SideBar authService={auth} />
            <Switch>
              <Route exact path='/' render={(props) => (!auth.isAuthenticated() ? <Home /> : <Dashboard authService={auth} {...props} />)} />
              <Route exact path='/events' render={(props) => (!auth.isAuthenticated() ? <Redirect to='/' /> : <ViewEvents authService={auth} {...props} />)} />
              <Route path='/rsvp' render={(props) => (!auth.isAuthenticated() ? <Redirect to='/' /> : <Rsvp authService={auth} {...props} />)} />
              <Route exact path='/dashboard' render={(props) => (!auth.isAuthenticated() ? <Redirect to='/' /> : <Dashboard authService={auth} {...props} />)} />
              <Route exact path='/guest-list' render={(props) => (!auth.isAuthenticated() ? <Redirect to='/' /> : <GuestList authService={auth} {...props} />)} />
              <Route exact path='/invitation' render={(props) => (!auth.isAuthenticated() ? <Redirect to='/' /> : <Invitation authService={auth} {...props} />)} />
              <Route exact path='/send-invites' render={(props) => (!auth.isAuthenticated() ? <Redirect to='/' /> : <SendInvites authService={auth} {...props} />)} />
              <Route exact path='/profile' render={(props) => (!auth.isAuthenticated() ? <Redirect to='/' /> : <Profile authService={auth} {...props} />)} />
              <Route exact path='/logout' render={(props) => <LogOut hideSideBar={this.hideSideBar} />} />
              <Route path='/callback' render={(props) => {
                auth.auth0.parseHash((err, authResult) => {
                  if (authResult && authResult.accessToken && authResult.idToken) {
                    auth.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
                      if (err) { return this.props.loginError(err) }
                      auth.setSession(authResult)
                      auth.setProfile(authResult.accessToken)
                      this.props.loginSuccess(profile)
                      history.replace('/dashboard')
                    })
                  } else if (err) {
                    this.props.loginError(err)
                    history.replace('/')
                  }
                })
                return <Callback {...props} />
              }
              } />
            </Switch>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  loginSuccess: PropTypes.func.isRequired,
  loginError: PropTypes.func.isRequired
}

export default withStyles(styles, { withTheme: true })(App)
