import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import ButtonBase from 'material-ui/ButtonBase'
import teal from 'material-ui/colors/teal'

const brandWidth = 250
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
  root: {
    marginRight: 16
  },
  imageSpace: {
    marginLeft: 16,
    marginBottom: 5,
    marginRight: 8
  },
  logo: {
    minHeight: brandHeight,
    width: brandWidth,
    justifyContent: 'left',
    backgroundColor: teal[800]
  }
})

function Brand (props) {
  const { classes } = props
  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <Toolbar disableGutters>
          <ButtonBase className={classes.logo} component={Link} to='/'>
            <img className={classes.imageSpace} src='/static/images/evitehub-icon.png' alt='EviteHub' width='50' />
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
