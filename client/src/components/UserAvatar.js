import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'
import PowerSettingsNew from 'material-ui-icons/PowerSettingsNew'
import Settings from 'material-ui-icons/Settings'
import Email from 'material-ui-icons/Email'

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
  details: {
    display: 'flex',
    justifyContent: 'center'
  },
  content: {
    flex: '1 0 auto'
  },
  button: {
    margin: theme.spacing.unit
  },
  default: {
    paddingBottom: 0
  }
})

function UserAvatar (props) {
  const { classes } = props
  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <List>
          <ListItem className={classes.default}>
            <Avatar
              alt='John Doe'
              src='/static/images/johnDoe.png'
          />

            <ListItemText primary='John Doe' secondary='johndoe@example.com' />
          </ListItem>
        </List>
        <div className={classes.details}>
          <IconButton className={classes.button} aria-label='Logout'>
            <PowerSettingsNew />
          </IconButton>
          <IconButton className={classes.button} aria-label='Message'>
            <Email />
          </IconButton>
          <IconButton className={classes.button} aria-label='Settings'>
            <Settings />
          </IconButton>
        </div>

      </div>
    </MuiThemeProvider>
  )
}

UserAvatar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, theme)(UserAvatar)
