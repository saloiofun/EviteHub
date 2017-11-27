import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import teal from 'material-ui/colors/teal'
import orange from 'material-ui/colors/orange'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import List from 'material-ui/List'
import Hidden from 'material-ui/Hidden'
import Divider from 'material-ui/Divider'

import UserAvatar from '../components/UserAvatar'
import Brand from '../components/Brand'
import EventsDropdown from '../components/EventsDropdown'
import { DashboardListItems, GuestListItems, SendInvitesListItems } from '../components/drawerItems'

import compose from 'recompose/compose'
import { connect } from 'react-redux'
import * as actionTypes from '../constants/ActionTypes'

const drawerWidth = 250

const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: teal[500]
      }
    },
    MuiDrawer: {
      paperAnchorDockedLeft: {
        borderRight: 'none'
      }
    },
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
  bigAvatar: {
    width: 60,
    height: 60,
    margin: '5px auto'
  },
  drawerHeader: {
    height: 64,
    backgroundColor: teal[800]
  },
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      height: '100%'
    }
  }
})

class SideBar extends Component {
  render () {
    const { classes } = this.props

    const drawer = (
      <div>
        <div className={classes.drawerHeader}>
          <Brand />
        </div>
        <UserAvatar />
        <Divider />
        <EventsDropdown />
        <Divider />
        <List><DashboardListItems /></List>
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
            open={this.props.sideBar}
            classes={{
              paper: classes.drawerPaper
            }}
            onRequestClose={this.props.onToggleSidebar}
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

const mapStateToProps = state => {
  return {
    sideBar: state.mobileOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onToggleSidebar: () => dispatch({type: actionTypes.TOGGLE_SIDEBAR})
  }
}

export default compose(
  withStyles(styles, theme, {
    name: 'SideBar'
  }), connect(mapStateToProps, mapDispatchToProps)
)(SideBar)
