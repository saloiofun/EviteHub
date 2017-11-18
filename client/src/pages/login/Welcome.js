import React, { Component } from 'react'
import Button from 'material-ui/Button'

class Welcome extends Component {
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
    const { isAuthenticated } = this.props.auth

    return (
      <div>
        <Button onClick={this.goTo.bind(this, 'events')}>Home</Button>
        { !isAuthenticated() && (<Button onClick={this.login.bind(this)}>Log In</Button>) }
        { isAuthenticated() && (<Button onClick={this.logout.bind(this)} >Log Out</Button>) }
      </div>
    )
  }
}

export default Welcome
