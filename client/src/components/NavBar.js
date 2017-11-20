import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import teal from 'material-ui/colors/teal'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Hidden from 'material-ui/Hidden'
import MenuIcon from 'material-ui-icons/Menu'
import NavButtons from './NavButtons'
import Badge from 'material-ui/Badge'
import NotificationsIcon from 'material-ui-icons/Notifications'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import Button from 'material-ui/Button'
import orange from 'material-ui/colors/orange'

const drawerWidth = 250

const theme = createMuiTheme({
  palette: {
    primary: teal
  }
})

const styles = theme => ({
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
  button: {
    margin: theme.spacing.unit
  },
  raisedAccent: {
    backgroundColor: orange[700]
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

  render () {
    const { classes } = this.props
    return (
      <MuiThemeProvider theme={theme}>
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
              <NavButtons />
            </Hidden>
            <div className={classes.flex} />
            <Button className={classNames(classes.button, classes.raisedAccent)} raised color='accent' component={Link} to='/login'>
              Sign in
            </Button>
            <IconButton>
              <Badge className={classes.badge} badgeContent={4} color='accent'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, theme)(NavBar)
