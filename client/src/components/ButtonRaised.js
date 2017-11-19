import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import orange from 'material-ui/colors/orange'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  raisedAccent: {
    backgroundColor: orange[700]
  }
})

function ButtonRaised (props) {
  const { classes } = props
  return (
    <Button className={classNames(classes.button, classes.raisedAccent)} raised color='accent' {...props}>
      {props.children}
      {props.text}
    </Button>
  )
}

ButtonRaised.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ButtonRaised)
