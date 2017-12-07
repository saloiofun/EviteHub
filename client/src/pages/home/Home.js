import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import orange from 'material-ui/colors/orange'
import classNames from 'classnames'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Auth from '../../auth'
const auth = new Auth()

const styles = theme => ({
  root: {
    paddingTop: 64,
    margin: '0 auto',
    marginBottom: 30,
    width: '100vw',
    minHeight: '100vh'
  },
  button: {
    margin: theme.spacing.unit
  },
  raisedAccent: {
    backgroundColor: orange[700]
  },
  section: {
    paddingTop: '50px',
    paddingBottom: '50px'
  },
  sectionWhite: {
    paddingTop: '50px',
    paddingBottom: '50px',
    backgroundColor: '#fff'
  },
  sectionContentRight: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: '100px'
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: '175px',
      paddingRight: '200px'
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: '500px'
    }
  },
  sectionContentLeft: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: '100px'
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: '175px',
      paddingLeft: '200px'
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: '500px'
    }
  },
  image: {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textShadow: '0 1px 0 rgba(0, 0, 0, 0.25)'
  }
})

class Home extends Component {
  login () {
    auth.login()
  }

  render () {
    const { classes } = this.props
    console.log(this.props)

    return (
      <div className={classes.root}>
        <div className='featured-image'>
          <div className='featured-content'>
            <div className='featured-content-gradient'>
              <h1 className='featured-title'>Take the Hassle out of Event Planning</h1>
              <p>Plan your next Event with us by using our easy to use Event Planner. Event Planning has never been easier.</p>
              <div>
                <Button raised color='primary' className={classes.button} onClick={this.login.bind(this)}>Sign Up</Button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: 20 }}>
          <Grid container spacing={40} className={classes.sectionWhite}>
            <Grid item xs={12} sm={6}>
              <img src='/static/images/home/guest-list.jpg' alt='Guestlist' className={classes.image} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.sectionContentRight}>
                <Typography type='headline' component='h1' className={classes.heading} color='primary'>Guest List</Typography>
                <Typography component='p'>
                Manage your Guest List for your next event. Your Guest list can keep track of who's RSVP'd, Number of party for each guest, You can add guest to your Guest List anytime, Manage your guest contact information and more...</Typography>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={40} className={classes.section}>
            <Grid item xs={12} sm={6}>
              <div className={classNames(classes.sectionContent, classes.sectionContentLeft)}>
                <Typography type='headline' component='h1' className={classes.heading} color='primary'>Invitations</Typography>
                <Typography component='p'>Create your guest list and send out invitations for your next event. With our simple to use Invitation Maker. You can Send out customized Invitations with ease.</Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img src='/static/images/home/invitation-1.jpg' alt='Invitations' className={classes.image} />
            </Grid>
          </Grid>

          <Grid container spacing={40} className={classes.sectionWhite}>
            <Grid item xs={12} sm={6}>
              <img src='/static/images/home/events.jpg' alt='' className={classes.image} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.sectionContentRight}>
                <Typography type='headline' component='h1' className={classes.heading} color='primary'>Events</Typography>
                <Typography component='p'>Are you an Event Planner? Our dashboard allows you to create multiple events and keep track of each event with Guest List, Invitations and more...</Typography>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={40} className={classes.section}>
            <Grid item xs={12} sm={6}>
              <div className={classNames(classes.sectionContent, classes.sectionContentLeft)}>
                <Typography type='headline' component='h1' className={classes.heading} color='primary'>Todo Checklist</Typography>
                <Typography component='p'>Stay on schedule and keep track of your checklist of items needed for your event. You can keep track of items completed along the way.</Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img src='/static/images/home/todo-list.jpg' alt='Todo list' className={classes.image} />
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
