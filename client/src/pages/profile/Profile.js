import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AuthAPI from '../../utils/AuthAPI'

const styles = theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      width: '80%'
    },
    margin: '0 auto'
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
        <div className='profile-area'>
          <h1>{profile.name}</h1>
          <div header='Profile'>
            <img src={profile.picture} alt='profile' />
            <div>Nickname</div>
            <h3>{profile.nickname}</h3>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </div>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Profile)
