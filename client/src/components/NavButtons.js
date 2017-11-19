import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Pages from 'material-ui-icons/Pages'
import BorderVertical from 'material-ui-icons/BorderVertical'
import Search from 'material-ui-icons/Search'
import ButtonRaised from './ButtonRaised'
import ButtonDialog from './ButtonDialog'
import CreateEvent from './CreateEvent'

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

function IconLabelButtons (props) {
  const { classes } = props
  return (
    <div>
      <ButtonDialog text='New Event'>
        <Pages className={classes.leftIcon} />
        <CreateEvent />
      </ButtonDialog>
      <ButtonRaised text='Invitation Maker' component={Link} to='/events'>
        <BorderVertical className={classes.leftIcon} />
      </ButtonRaised>
      <ButtonRaised text='Find' component={Link} to='/guest-list' >
        <Search className={classes.leftIcon} />
      </ButtonRaised>
    </div>
  )
}

IconLabelButtons.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(IconLabelButtons)
