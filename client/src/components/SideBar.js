import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import blueGrey from 'material-ui/colors/blueGrey'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import List from 'material-ui/List'
import Hidden from 'material-ui/Hidden'
import Divider from 'material-ui/Divider'
import UserAvatar from '../components/UserAvatar'
import Brand from '../components/Brand'
import { DashboardListItems, EventsListItems, GuestListItems, SendInvitesListItems } from '../components/drawerItems'

const drawerWidth = 250

const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        backgroundColor: blueGrey[700]
      }
    }
  }
})

const styles = theme => ({
  bigAvatar: {
    width: 60,
    height: 60,
    margin: '5px auto'
  },
  // drawerHeader: theme.mixins.toolbar,
  drawerHeader: {
    height: 64,
    backgroundColor: blueGrey[500],
    margin: '0 auto'
  },
  drawerAvatar: {
    height: '215px',
    textAlign: 'center',
    paddingTop: '20px'
  },
  flex: {
    flex: '0 1 100%'
  },
  // drawerHeader: {
  //   height: '215px',
  //   textAlign: 'center',
  //   paddingTop: '20px'
  // },
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      height: '100%'
    }
  },
  icon: {
    margin: theme.spacing.unit
  }
})

class SideBar extends Component {
  state = {
    mobileOpen: false
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  render () {
    const { classes } = this.props

    const drawer = (
      <div>
        <div className={classes.drawerHeader}>
          <Brand />
        </div>
        <Divider />
        <UserAvatar />
        <Divider />
        <List><DashboardListItems /></List>
        <List><EventsListItems /></List>
        <List><GuestListItems /></List>
        <List><SendInvitesListItems /></List>
      </div>
    )

    return (
      <MuiThemeProvider theme={theme}>
        <Hidden mdUp>
          <Drawer
            type='temporary'
            anchor='left'
            open={this.state.mobileOpen}
            classes={{
              paper: classes.drawerPaper
            }}
            onRequestClose={this.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
              >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation='css'>
          <Drawer
            type='permanent'
            open
            classes={{
              paper: classes.drawerPaper
            }}
              >
            {drawer}
          </Drawer>
        </Hidden>
      </MuiThemeProvider>
    )
  }
}
SideBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, theme)(SideBar)
