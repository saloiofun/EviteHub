import axios from 'axios'

export default {
  // login
  login: function (data) {
    return axios.post('/login', data)
  }
}
