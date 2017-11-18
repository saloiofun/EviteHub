import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      subheading: {
        color: '#FFF'
      },
      colorSecondary: {
        color: '#FFF'
      }
    }
  }
})

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360
  },
  avatar: {
    margin: 10
  }
})

function UserAvatar (props) {
  const { classes } = props
  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <List>
          <ListItem>
            <Avatar
              alt='John Doe'
              src='/static/images/johnDoe.png'
              className={classes.bigAvatar}
          />
            <ListItemText primary='John Doe' secondary='johndoe@example.com' />
          </ListItem>
        </List>
      </div>
    </MuiThemeProvider>
  )
}

UserAvatar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, theme)(UserAvatar)
