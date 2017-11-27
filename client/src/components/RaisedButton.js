import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import classNames from 'classnames'
import orange from 'material-ui/colors/orange'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  raisedAccent: {
    backgroundColor: orange[700]
  }
})

function RaisedButton (props) {
  const { classes } = props
  return (
    <Button className={classNames(classes.button, classes.raisedAccent)} raised color='accent' onClick={props.onClick}>{props.children}</Button>
  )
}

RaisedButton.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RaisedButton)
