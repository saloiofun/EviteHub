import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import List from 'material-ui/List'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import KeyboardArrowDownIcon from 'material-ui-icons/KeyboardArrowDown'
import Avatar from 'material-ui/Avatar';
import Hidden from 'material-ui/Hidden'
import Divider from 'material-ui/Divider'
import MenuIcon from 'material-ui-icons/Menu'
import Dashboard from './pages/dashboard'
import Events from './pages/events'
import GuestList from './pages/guestList'
import SendInvites from './pages/sendInvites'
import { DashboardListItems, EventsListItems, GuestListItems, SendInvitesListItems } from './tileData';

const drawerWidth = 240

const styles = theme => ({
  root: {
    width: '100%',
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerContainer: {
    height: '100vh'
  },
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
      position: 'relative',
      height: '100%',
    },
  },
  icon: {
    margin: theme.spacing.unit,
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
})

class App extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
        <div className={classes.drawerContainer}>
          <div className={classes.drawerHeader}>
            <Avatar
              alt="John Doe"
              src="/static/images/johnDoe.png"
              className={classes.bigAvatar}
            />
            <Typography type="title" gutterBottom>
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
      <Router>
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  color="contrast"
                  aria-label="open drawer"
                  onClick={this.handleDrawerToggle}
                  className={classes.navIconHide}
                >
                  <MenuIcon />
                </IconButton>
                <Typography type="title" color="inherit" noWrap>
                  EviteHub
                </Typography>
              </Toolbar>
            </AppBar>
            <Hidden mdUp>
              <Drawer
                type="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={this.state.mobileOpen}
                classes={{
                  paper: classes.drawerPaper,
                }}
                onRequestClose={this.handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden mdDown implementation="css">
              <Drawer
                type="permanent"
                open
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <main className={classes.content}>
                <Switch>
                  <Route exact path='/' component={Dashboard} />
                  <Route exact path='/events' component={Events} />
                  <Route exact path='/guest-list' component={GuestList} />
                  <Route exact path='/send-invites' component={SendInvites} />
                </Switch>            
            </main>
          </div>
        </div>
      </Router>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(App);