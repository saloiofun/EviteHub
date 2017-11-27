import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import ButtonBase from 'material-ui/ButtonBase'
import classNames from 'classnames'
import teal from 'material-ui/colors/teal'

const drawerWidth = 250

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
    width: drawerWidth,
    paddingRight: 16
  },
  imageSpace: {
    marginBottom: 8,
    marginRight: 12
  },
  brandHeader: {
    height: 64,
    backgroundColor: teal[800]
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
          <ButtonBase className={classNames(classes.root, classes.brandHeader)} component={Link} to='/'>
            <img className={classes.imageSpace} src='/static/images/logo.png' alt='EviteHub' width='36' />
            <Typography type='title'>EviteHub</Typography>
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
