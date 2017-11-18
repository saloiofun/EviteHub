import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import orange from 'material-ui/colors/orange'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import Pages from 'material-ui-icons/Pages'
import BorderVertical from 'material-ui-icons/BorderVertical'
import Search from 'material-ui-icons/Search'

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

function IconLabelButtons (props) {
  const { classes } = props
  return (
    <div>
      <Button className={classNames(classes.button, classes.raisedAccent)} raised color='accent'>
        <Pages className={props.classes.leftIcon} />
          New Event
        </Button>
      <Button className={classNames(classes.button, classes.raisedAccent)} raised color='accent'>
        <BorderVertical className={props.classes.leftIcon} />
          Invitation Maker
        </Button>
      <Button className={classNames(classes.button, classes.raisedAccent)} raised color='accent'>
        <Search className={props.classes.leftIcon} />
          Find
        </Button>
    </div>
  )
}

IconLabelButtons.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(IconLabelButtons)
