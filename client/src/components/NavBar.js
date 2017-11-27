import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Hidden from 'material-ui/Hidden'
import MenuIcon from 'material-ui-icons/Menu'
import NavButtons from './NavButtons'
import Button from 'material-ui/Button'
import classNames from 'classnames'
import Badge from 'material-ui/Badge'
import NotificationsIcon from 'material-ui-icons/Notifications'
import orange from 'material-ui/colors/orange'

const drawerWidth = 250

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  raisedAccent: {
    backgroundColor: orange[700]
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
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
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  flex: {
    flex: 1
  },
  badge: {
    margin: `0 ${theme.spacing.unit * 2}px`
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
      <AppBar className={classes.appBar}>
        <Toolbar>
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
          <div className={classes.flex} />
          { !isAuthenticated() && (<Button className={classNames(classes.button, classes.raisedAccent)} raised color='accent' onClick={this.login.bind(this)}>Sign In</Button>) }
          { isAuthenticated() && (<Button className={classNames(classes.button, classes.raisedAccent)} raised color='accent' onClick={this.logout.bind(this)}>Sign Out</Button>) }
          <IconButton>
            <Badge className={classes.badge} badgeContent={4} color='accent'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NavBar)
