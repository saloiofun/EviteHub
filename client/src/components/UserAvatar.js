import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'
import PowerSettingsNewIcon from 'material-ui-icons/PowerSettingsNew'
import EmailIcon from 'material-ui-icons/Email'
import SettingsIcon from 'material-ui-icons/Settings'
import { Link } from 'react-router-dom'

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
  const { classes, profile } = props
  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <List>
          <ListItem className={classes.default}>
            <Avatar
              alt={profile.name}
              src={profile.picture}
          />
            <ListItemText primary={profile.name} secondary={profile.email} />
          </ListItem>
        </List>
        <div className={classes.details}>
          <IconButton className={classes.button} aria-label='Logout'>
            <PowerSettingsNewIcon />
          </IconButton>
          <IconButton className={classes.button} aria-label='Inbox'>
            <EmailIcon />
          </IconButton>
          <Link to='/profile'>
            <IconButton
              className={classes.button}
              aria-label='Settings'>
              <SettingsIcon />
            </IconButton>
          </Link>
        </div>
      </div>
    </MuiThemeProvider>
  )
}

UserAvatar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, theme)(UserAvatar)
