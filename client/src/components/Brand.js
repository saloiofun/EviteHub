import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import ButtonBase from 'material-ui/ButtonBase'

const brandHeight = 64

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
  imageSpace: {
    marginLeft: 16,
    marginBottom: 5,
    marginRight: 8
  },
  logo: {
    minHeight: brandHeight,
    width: '100%',
    justifyContent: 'left'
  }
})

function Brand (props) {
  const { classes } = props
  return (
    <MuiThemeProvider theme={theme}>
      <Toolbar disableGutters>
        <ButtonBase className={classes.logo} {...props} component={Link} to='/'>
          <img className={classes.imageSpace} src='/static/images/evitehub-icon.png' alt='EviteHub' width='50' />
          <Typography type='title'>EviteHub</Typography>
        </ButtonBase>
      </Toolbar>
    </MuiThemeProvider>
  )
}

Brand.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, theme)(Brand)
