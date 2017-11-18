import React from 'react'
import { Route, Router } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import Callback from './callback'
import Auth from './auth'
import history from './history'
import Dashboard from './pages/dashboard'

const auth = new Auth()

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history} component={Login}>
      <div>
        <Route path='/' render={(props) => <Login auth={auth} {...props} />} />
        <Route path='/home' render={(props) => <Home auth={auth} {...props} />} />
        <Route path='/callback' render={(props) => {
          handleAuthentication(props)
          return <Callback {...props} />
        }} />
        <Route exact path='/dashboard' component={Dashboard} />
      </div>
    </Router>
  )
}
