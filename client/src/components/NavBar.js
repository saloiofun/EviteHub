import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Hidden from 'material-ui/Hidden'
import MenuIcon from 'material-ui-icons/Menu'
import NavButtons from './NavButtons'
import RaisedButton from './RaisedButton'
import Brand from './Brand'

const styles = theme => ({
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  navButtonsHide: {
    [theme.breakpoints.up('xs')]: {
      display: 'none'
    }
  },
  navSpace: {
    paddingRight: 16
  }
})

class NavBar extends Component {
  state = {
    mobileOpen: false
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

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

    return (
      <AppBar>
        <Toolbar disableGutters className={classes.navSpace}>
          <IconButton
            color='contrast'
            aria-label='open drawer'
            onClick={this.handleDrawerToggle}
            className={classes.navIconHide}
            >
            <MenuIcon />
          </IconButton>
          <Hidden smDown>
            { isAuthenticated() && (<NavButtons />) }
          </Hidden>
          <Brand />
          { !isAuthenticated() && (<RaisedButton onClick={this.login.bind(this)}>Sign In</RaisedButton>) }
          { isAuthenticated() && (<RaisedButton onClick={this.logout.bind(this)}>Sign Out</RaisedButton>) }
        </Toolbar>
      </AppBar>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NavBar)
