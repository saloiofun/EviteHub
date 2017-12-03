import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AuthAPI from '../../utils/AuthAPI'
import PageHeader from '../../components/PageHeader'
import Card, {CardContent } from 'material-ui/Card'
import List, { ListItem, ListItemText } from 'material-ui/List'
import AccountCircle from 'material-ui-icons/AccountCircle'
import Mail from 'material-ui-icons/Mail'
import Avatar from 'material-ui/Avatar'
import teal from 'material-ui/colors/teal'
import Grid from 'material-ui/Grid'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    paddingTop: 80,
    margin: '0 auto',
    marginBottom: 30,
    minHeight: '100vh',
    [theme.breakpoints.up('md')]: {
      width: '80%',
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3
    }
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  profileImage: {
    width: '100%'
  },
  iconAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: teal[500]
  }
})

class Profile extends Component {
  componentWillMount () {
    this.setState({ profile: {} })
    const { userProfile, getProfile } = this.props.auth
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile })
      })
    } else {
      this.setState({ profile: userProfile })
    }
  }

  componentDidMount () {
    // Get Token
    AuthAPI.getToken()
    .then(res => {
      // Use Token and call API to get Users
      AuthAPI.getUsers(res.data.token_type, res.data.access_token)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))

      // Use Token and call API to update User meta
      AuthAPI.updateUser(res.data.token_type, res.data.access_token, this.state.profile.sub)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))

      // Use Token and call API to get User by Email
      AuthAPI.getUserByEmail(res.data.token_type, res.data.access_token, this.state.profile.email)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))

      // Use Token and call API to get Events by Email
      AuthAPI.getEventsByEmail(res.data.token_type, res.data.access_token, this.state.profile.email)
      .then(res => console.log(res.data[0]))
      .catch(err => console.log(err))

      // Use Token and call API to get User by ID
      AuthAPI.getUserByID(res.data.token_type, res.data.access_token, this.state.profile.sub)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
    })
  }

  render () {
    const { profile } = this.state
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <PageHeader title='Profile' body='User Profile' />
        <div className='profile-area'>
          <Card>
            <CardContent>
              <Grid container spacing={24}>

                <Grid item xs={12} sm={3}>
                  <img src={profile.picture} alt='profile' className={classes.profileImage} />
                </Grid>

                <Grid item xs={12} sm={9}>
                  <List>
                    <ListItem divider>
                      <ListItemText primary={(<h1>{profile.name}</h1>)} />
                    </ListItem>
                    <ListItem divider>
                      <Avatar className={classes.iconAvatar}>
                        <AccountCircle />
                      </Avatar>
                      <ListItemText primary={profile.sub} secondary='User ID' />
                    </ListItem>
                    { (profile.email) &&
                      <ListItem divider>
                        <Avatar className={classes.iconAvatar}>
                          <Mail />
                        </Avatar>
                        <ListItemText primary={profile.email} secondary='Email' />
                      </ListItem>
                    }
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Profile)
