import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import blueGrey from 'material-ui/colors/blueGrey'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import NotificationsIcon from 'material-ui-icons/Notifications'
import MenuIcon from 'material-ui-icons/Menu'
import Typography from 'material-ui/Typography'

const drawerWidth = 250

const theme = createMuiTheme({
  palette: {
    primary: blueGrey
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
            <Typography type='title' color='inherit' className={classes.flex} noWrap>
            EviteHub
          </Typography>
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
