import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import orange from 'material-ui/colors/orange'
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import DeviceHub from 'material-ui-icons/DeviceHub'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'

function theme (outerTheme) {
  return createMuiTheme({
    typography: {
      title: {
        color: '#FFF'
      }
    }
  })
}

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit,
    fill: orange[900]
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  brandHover: {
    '&:hover': {
      fill: orange[700]
    }
  }
})

function Brand (props) {
  const { classes } = props
  return (
    <MuiThemeProvider theme={theme}>
      <Toolbar>
        <DeviceHub
          className={classNames(classes.leftIcon, classes.brandHover)}
          style={{
            width: 36,
            height: 36
          }} />
        <Typography type='title'>eviteHub</Typography>
      </Toolbar>
    </MuiThemeProvider>
  )
}

Brand.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, theme)(Brand)
