import React from 'react'
import Grid from 'material-ui/Grid'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ButtonBase from 'material-ui/ButtonBase'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 4,
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%'
  },
  action: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100
    },
    '&:hover': {
      zIndex: 1
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15
    },
    '&:hover $imageMarked': {
      opacity: 0
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor'
    }
  },
  actionButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white
  },
  actionSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%'
  },
  actionBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity')
  },
  actionTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`
  },
  actionMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity')
  }
})

const actions = [
  {
    title: 'View Events',
    width: '100%',
    height: '100%'
  },
  {
    title: 'Add A New Event',
    width: '100%',
    height: '100%'
  }
]

class Events extends React.Component {
  directToPage = (page) => {
    if (page.includes('Add')) {
      this.props.history.push('/events/add')
    } else {
      this.props.history.push('/events/view')
    }
  }

  render () {
    const { classes } = this.props

    return (
      <Grid container className={classes.root} style={{height: '100%'}}>
        {actions.map(action => (
          <Grid item xs={12} sm={6}>
            <ButtonBase
              onClick={() => this.directToPage(action.title)}
              focusRipple
              key={action.title}
              className={classes.action}
              style={{
                width: action.width,
                height: action.height
              }}
          >
              <div
                style={{
                  backgroundColor: `black`
                }}
            />
              <div className={classes.actionBackdrop} />
              <div className={classes.actionButton}>
                <Typography
                  component='h3'
                  type='subheading'
                  color='inherit'
                  className={classes.actionTitle}
              >
                  {action.title}
                  <div className={classes.actionMarked} />
                </Typography>
              </div>
            </ButtonBase>
          </Grid>
      ))}
      </Grid>
    )
  }
}

Events.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Events)
