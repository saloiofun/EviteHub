import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import Dashboard from './pages/dashboard'
import viewEvents from './pages/viewEvents'
import GuestList from './pages/guestList'
import SendInvites from './pages/sendInvites'
import NavBar from './containers/NavBar'
import SideBar from './containers/SideBar'
import Home from './pages/home'
import Callback from './callback'
import Auth from './auth'
import Rsvp from './pages/rsvp'
import history from './history'
import teal from 'material-ui/colors/teal'

// Authentication
const auth = new Auth()

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
  }
}

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
      paddingTop: 80,
      margin: '0 auto',
      marginBottom: 100,
      width: '100%'
    }
  }
})

class App extends React.Component {
  render () {
    const { classes } = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <Router history={history} component={Home}>
          <div className={classes.root}>
            <div className={classes.appFrame}>
              <Route path='/' render={(props) => <NavBar auth={auth} {...props} />} />
              <Route path='/' render={(props) => <SideBar auth={auth} {...props} />} />
              <main className={classes.content}>
                <Switch>
                  <Route exact path='/' render={(props) => <Home auth={auth} {...props} />} />
                  <Route path='/rsvp' component={Rsvp}/>
                  <Route exact path='/events' component={viewEvents} />
                  <Route exact path='/dashboard' component={Dashboard} />
                  <Route exact path='/guest-list' component={GuestList} />
                  <Route exact path='/send-invites' component={SendInvites} />
                  <Route path='/callback' render={(props) => {
                    handleAuthentication(props)
                    return <Callback {...props} />
                  }} />
                </Switch>
              </main>
            </div>
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(App)
