import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import ButtonBase from 'material-ui/ButtonBase'

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
  root: {
    minHeight: 64,
    justifyContent: 'left'
  },
  flex: {
    flex: 1
  }
})

function Brand (props) {
  const { classes } = props
  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.flex}>
        <Toolbar disableGutters>
          <ButtonBase disableRipple className={classes.root} component={Link} to='/'>
            <img src='/static/images/evitehub-icon.png' alt='EviteHub' width='50' />
            <Typography type='title'>eviteHub</Typography>
          </ButtonBase>
        </Toolbar>
      </div>
    </MuiThemeProvider>
  )
}

Brand.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, theme)(Brand)
