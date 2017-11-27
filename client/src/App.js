import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import Dashboard from './pages/dashboard'
import viewEvents from './pages/viewEvents'
import GuestList from './pages/guestList'
import SendInvites from './pages/sendInvites'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import Home from './pages/home'
import Callback from './callback'
import Auth from './auth'
import history from './history'
import teal from 'material-ui/colors/teal'

// Authentication
const auth = new Auth()

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
  }
}

const drawerWidth = 250

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
    flex: '1 1 100%',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: theme.spacing.unit * 2,
    marginTop: 56,
    marginBottom: 100,
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
      marginTop: 64,
      marginBottom: 100
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
              {/* <SideBar /> */}
              <main className={classes.content}>
                <Switch>
                  <Route exact path='/' render={(props) => <Home auth={auth} {...props} />} />
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
