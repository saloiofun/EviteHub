import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import CheckboxList from '../../components/Todo'
import PageHeader from '../../components/PageHeader'

const styles = theme => ({
  root: {
    flex: '1 1 100%',
    [theme.breakpoints.up('sm')]: {
      width: '80%'
    },
    margin: '0 auto'
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  card: {
    minWidth: 275
  },
  media: {
    height: 250
  },
  progress: {
    height: 150
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary
  }
})

function Dashboard (props) {
  const { classes } = props

  return (
    <div className={classes.root}>
      <PageHeader />
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <CardMedia
            className={classes.progress}
            image='/static/images/cards/progress.png'
            title='Progress'
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image='/static/images/cards/website.png'
              title='Website'
            />
            <CardContent>
              <Typography type='headline' component='h2'>
                Title
              </Typography>
            </CardContent>
            <CardActions>
              <Button dense color='primary'>
                Share
              </Button>
              <Button dense color='primary'>
                View Website
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography type='headline' component='h2'>
                To Do List
              </Typography>
              <CheckboxList />
            </CardContent>
            <CardActions align='right'>
              <Button dense color='primary'>Share</Button>
              <Button dense color='primary'>View All</Button>
            </CardActions>
          </Card>
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
