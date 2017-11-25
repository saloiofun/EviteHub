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
  updateUser: function (tokenType, accessToken, userID) {
    return axios({
      method: 'patch',
      url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${userID}`,
      headers: {
        authorization: `${tokenType} ${accessToken}`,
        'content-type': 'application/json'
      },
      data: {
        'app_metadata': {
          'event_id': [15, 25, 305]
        }
      }
    })
  },
  getUserByEmail: function (tokenType, accessToken, email) {
    return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users-by-email?email=${email}`, {
      headers: {
        authorization: `${tokenType} ${accessToken}`,
        'content-type': 'application/json'
      }
    })
  },
  getEventsByEmail: function (tokenType, accessToken, email) {
    return axios.get(`https://evitehub.auth0.com/api/v2/users-by-email?fields=app_metadata&include_fields=true&email=${email}`, {
      headers: {
        authorization: `${tokenType} ${accessToken}`,
        'content-type': 'application/json'
      }
    })
  }
}
