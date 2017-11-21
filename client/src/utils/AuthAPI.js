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
  }
}
