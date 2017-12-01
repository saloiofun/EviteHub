import React from 'react'
import Grid from 'material-ui/Grid'
import API from '../../utils/Api'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 4,
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%'
  }
})

class Rsvp extends React.Component {
  componentDidMount () {
    var parsedURL = new URL(window.location.href)
    var hash = parsedURL.searchParams.get('id')
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
      <Grid container className={classes.root} style={{height: '100%'}} />
    )
  }
}

Rsvp.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Rsvp)
