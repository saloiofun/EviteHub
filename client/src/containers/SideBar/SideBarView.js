import React from 'react'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import teal from 'material-ui/colors/teal'
import orange from 'material-ui/colors/orange'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import List from 'material-ui/List'
import Hidden from 'material-ui/Hidden'
import Divider from 'material-ui/Divider'

import UserAvatar from '../../components/UserAvatar'
import Brand from '../../components/Brand'
import EventsDropdown from '../../components/EventsDropdown'
import { DashboardListItems, GuestListItems, SendInvitesListItems } from '../../components/drawerItems'

const drawerWidth = 250

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      subheading: {
        color: 'white'
      },
      colorSecondary: {
        fontWeight: 500,
        color: orange[300]
      }
    },
    MuiListItemIcon: {
      root: {
        color: teal[900]
      }
    }
  }
})

const styles = theme => ({
  root: {
    [theme.breakpoints.up('lg')]: {
      minWidth: drawerWidth
    }
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: '5px auto'
  },
  drawerHeader: {
    height: theme.mixins.toolbar,
    backgroundColor: teal[800]
  },
  drawerPaper: {
    backgroundColor: teal[500],
    width: drawerWidth
  },
  noBorderRight: {
    borderRight: 'none'
  }
})

const SideBarView = ({ auth, onToggleSidebar, mobile, classes }) => (
  <MuiThemeProvider theme={theme}>
    { auth.isAuthenticated && (
      <div className={classes.root}>
        <Hidden lgUp>
          <Drawer
            type='temporary'
            anchor='left'
            open={mobile.mobileOpen}
            classes={{
              paper: classes.drawerPaper,
              paperAnchorDockedLeft: classes.noBorderRight
            }}
            onRequestClose={() => {
              onToggleSidebar()
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }} >
            <div>
              <div className={classes.drawerHeader}>
                <Brand disableRipple />
              </div>
              <UserAvatar profile={auth.profile} />
              <Divider />
              <EventsDropdown />
              <Divider />
              <List><DashboardListItems /></List>
              <List><GuestListItems /></List>
              <List><SendInvitesListItems /></List>
            </div>
          </Drawer>
        </Hidden>
        <Hidden lgDown implementation='css'>
          <Drawer
            type='permanent'
            open
            classes={{
              paper: classes.drawerPaper,
              paperAnchorDockedLeft: classes.noBorderRight
            }} >
            <div>
              <div className={classes.drawerHeader}>
                <Brand disableRipple />
              </div>
              <UserAvatar profile={auth.profile} />
              <Divider />
              <EventsDropdown />
              <Divider />
              <List><DashboardListItems /></List>
              <List><GuestListItems /></List>
              <List><SendInvitesListItems /></List>
            </div>
          </Drawer>
        </Hidden>
      </div>
    )}
  </MuiThemeProvider>
)

SideBarView.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    profile: PropTypes.object,
    error: PropTypes.string
  }).isRequired,
  mobile: PropTypes.object.isRequired,
  onToggleSidebar: PropTypes.func.isRequired
}

export default withStyles(styles, theme)(SideBarView)
