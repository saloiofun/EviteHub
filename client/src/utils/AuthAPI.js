import axios from 'axios'

export default {
  getToken: function () {
    return axios({
      method: 'post',
      url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,
      headers: { 'content-type': 'application/json' },
      data: {
        grant_type: 'client_credentials',
        client_id: process.env.REACT_APP_AUTH0_API_CLIENT_ID,
        client_secret: process.env.REACT_APP_AUTH0_API_CLIENT_SECRET,
        audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`
      }
    })
  },
  getUsers: function (tokenType, accessToken) {
    return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users`, {
      headers: {
        authorization: `${tokenType} ${accessToken}`,
        'content-type': 'application/json'
      }
    })
  },
  updateUser: function (tokenType, accessToken) {
    return axios({
      method: 'patch',
      url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/google-oauth2|111176812360524449794`,
      headers: {
        authorization: `${tokenType} ${accessToken}`,
        'content-type': 'application/json'
      },
      data: {
        'app_metadata': {
          'event_id': [15, 25]
        }
      }
    })
  },
  getUserByEmail: function (tokenType, accessToken) {
    return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users-by-email?email=saloiofun@gmail.com`, {
      headers: {
        authorization: `${tokenType} ${accessToken}`,
        'content-type': 'application/json'
      }
    })
  }
}
