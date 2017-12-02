import React from 'react'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import API from '../../utils/Api'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 9,
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    paddingTop: 16,
    paddingBottom: 16,
    width: '50%',
    margin: '0 auto',
    height: '80%'
  }
})

class Rsvp extends React.Component {
  componentDidMount () {
    var parsedURL = new URL(window.location.href)
    var hash = parsedURL.searchParams.get('token')
    API.getGuestByHash(hash)
        .then((data) => {
          console.log(data)
        })
        .catch((err) => {
          throw (err)
        })
  }
  render () {
    const { classes } = this.props

    return (
      <Paper className={classes.root} elevation={8}>
        <Typography type='headline' align='center' style={{width: '100%'}}> Test </Typography>
      </Paper>
    )
  }
}

Rsvp.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Rsvp)
