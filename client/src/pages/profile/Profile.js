import React, { Component } from 'react'
import AuthAPI from '../../utils/AuthAPI'

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
    })
  }

  render () {
    const { profile } = this.state
    return (
      <div className='profile-area'>
        <h1>{profile.name}</h1>
        <div header='Profile'>
          <img src={profile.picture} alt='profile' />
          <div>Nickname</div>
          <h3>{profile.nickname}</h3>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
      </div>
    )
  }
}

export default Profile
