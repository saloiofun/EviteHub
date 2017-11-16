import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import List from 'material-ui/List'
import Typography from 'material-ui/Typography'
import KeyboardArrowDownIcon from 'material-ui-icons/KeyboardArrowDown'
import Avatar from 'material-ui/Avatar'
import Hidden from 'material-ui/Hidden'
import Divider from 'material-ui/Divider'
import { DashboardListItems, EventsListItems, GuestListItems, SendInvitesListItems } from '../components/drawerItems'

const drawerWidth = 250

const styles = theme => ({
  bigAvatar: {
    width: 150,
    height: 150,
    margin: '5px auto'
  },
  drawerHeader: {
    height: '215px',
    textAlign: 'center',
    paddingTop: '20px'
  },
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
    const { classes, theme } = this.props

    const drawer = (
      <div>
        <div className={classes.drawerHeader}>
          <Avatar
            alt='John Doe'
            src='/static/images/johnDoe.png'
            className={classes.bigAvatar}
            />
          <Typography type='title' gutterBottom>
              John Doe <KeyboardArrowDownIcon />
          </Typography>
        </div>
        <Divider />
        <List><DashboardListItems /></List>
        <List><EventsListItems /></List>
        <List><GuestListItems /></List>
        <List><SendInvitesListItems /></List>
      </div>
    )

    return (
      <div className={classes.root}>
        <Hidden mdUp>
          <Drawer
            type='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
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
      </div>
    )
  }
}
SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(SideBar)
