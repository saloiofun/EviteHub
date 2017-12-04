import React from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import Snackbar from 'material-ui/Snackbar'

const styles = theme => ({
  alerts: {
    top: 80
  }
})

function Alert (props) {
  const { classes } = props
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={props.open}
      onRequestClose={props.onRequestClose}
      autoHideDuration='3000'
      classes={{anchorTopRight: classes.alerts}}
      SnackbarContentProps={{
        'aria-describedby': 'message-id2'
      }}
      message={<span id='message-id'>{props.message}</span>}
  />
  )
}

Alert.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Alert)
