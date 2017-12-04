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

class SideBar extends Component {
  componentWillMount () {
    this.setState({ profile: {} })
    const { userProfile, getProfile } = this.props.auth
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile })
      })
    } else {
      this.setState({ profile: userProfile })
    }
  }

  goTo (route) {
    this.props.history.replace(`/${route}`)
  }

  render () {
    const { classes } = this.props
    const { profile } = this.state
    const { isAuthenticated } = this.props.auth

    console.log(this.props.auth)

    const drawer = (
      <div>
        <div className={classes.drawerHeader}>
          <Brand disableRipple />
        </div>
        <UserAvatar profile={profile} />
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
        { isAuthenticated() && (
          <div className={classes.root}>
            <Hidden lgUp>
              <Drawer
                type='temporary'
                anchor='left'
                open={this.props.sideBar}
                classes={{
                  paper: classes.drawerPaper,
                  paperAnchorDockedLeft: classes.noBorderRight
                }}
                onRequestClose={this.props.onToggleSidebar}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden lgDown implementation='css'>
              <Drawer
                type='permanent'
                open
                classes={{
                  paper: classes.drawerPaper,
                  paperAnchorDockedLeft: classes.noBorderRight
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
          </div>
        )}
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
