import React from 'react'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
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

const Brand = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Toolbar>
        <Typography type='title'>EviteHub</Typography>
      </Toolbar>
    </MuiThemeProvider>
  )
}

export default Brand
