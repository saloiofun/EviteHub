// import React from 'react'
// import Button from 'material-ui/Button'

// const Dashboard = () => (
//   <Button raised color='primary'>
//     Dashboard
//   </Button>
// )

// export default Dashboard

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      width: '80%'
    },
    margin: '0 auto'
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
})

function Dashboard (props) {
  const { classes } = props

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <Typography type='headline'>Title</Typography>
        </Grid>
        <Grid item xs={12} sm={5} align='right'>
          <Typography type='headline'>Location</Typography>
        </Grid>
        <Grid item xs={12} sm={1} align='right'>
          <Typography type='headline'>Date</Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
      </Grid>
    </div>
  )
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Dashboard)
