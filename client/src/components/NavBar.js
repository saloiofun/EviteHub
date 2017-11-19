import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import teal from 'material-ui/colors/teal'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import Hidden from 'material-ui/Hidden'
import NotificationsIcon from 'material-ui-icons/Notifications'
import MenuIcon from 'material-ui-icons/Menu'
import NavButtons from './NavButtons'
import ButtonRaised from './ButtonRaised'

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
  flex: {
    flex: 1
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
            <ButtonRaised text='Sign in' component={Link} to='/login' />
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
