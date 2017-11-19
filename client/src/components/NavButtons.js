import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import Pages from 'material-ui-icons/Pages'
import BorderVertical from 'material-ui-icons/BorderVertical'
import Search from 'material-ui-icons/Search'
import Button from 'material-ui/Button'
import ButtonDialog from './ButtonDialog'
import CreateEvent from './CreateEvent'
import orange from 'material-ui/colors/orange'

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  raisedAccent: {
    backgroundColor: orange[700]
  }
})

function IconLabelButtons (props) {
  const { classes } = props
  return (
    <div>
      <ButtonDialog text='New Event' title='New Event'>
        <Pages className={classes.leftIcon} />
        <CreateEvent />
      </ButtonDialog>
      <Button className={classNames(classes.button, classes.raisedAccent)} raised color='accent' component={Link} to='/events'>
        <BorderVertical className={classes.leftIcon} />
        Invitation Maker
      </Button>
      <Button className={classNames(classes.button, classes.raisedAccent)} raised color='accent' component={Link} to='/guest-list'>
        <Search className={classes.leftIcon} />
        Find
      </Button>
    </div>
  )
}

IconLabelButtons.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(IconLabelButtons)
