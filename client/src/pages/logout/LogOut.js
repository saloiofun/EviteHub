import React, { Component } from 'react'
import { Redirect, Router } from 'react-router-dom'
import history from '../../history'

class Logout extends Component {
  render () {
    return (
      <Router history={history}>
        <Redirect to='/' />
      </Router>
    )
  }
}

export default Logout
