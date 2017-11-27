import React from 'react'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
})

function ToggleSidebar (props) {
  const { classes } = props
  return (
    <IconButton
      color='contrast'
      aria-label='open drawer'
      onClick={props.onClick}
      className={classes.navIconHide}
    >
      <MenuIcon />
    </IconButton>
  )
}

ToggleSidebar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ToggleSidebar)
