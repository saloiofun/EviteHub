import React from 'react'
import Login from './pages/Login'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path='/Login' component={Login} />
      </Switch>
    </div>
  </Router>

export default App
