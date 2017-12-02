import axios from 'axios'

export default {
  // Gets all guests
  getGuests: function () {
    return axios.get('/api/guests')
  },
  // Gets the guest with the given id
  getGuestId: function (id) {
    return axios.get('/api/guests/' + id)
  },
  // Deletes the guest with the given id
  deleteGuest: function (id) {
    return axios.delete('/api/guests/' + id)
  },
  // Saves a guest to the database
  saveGuest: function (guestData) {
    return axios.post('/api/guests', guestData)
  },
  // Update a guest in the database
  updateGuest: function (id, guestData) {
    return axios.put('/api/guests/' + id, guestData)
  },
  // User Registration
  registerUser: function (userData) {
    return axios.post('/api/user', userData)
  },
  // Gets all events of user
  getEvents: function () {
    return axios.get('/api/events/')
  },
  // Create Event
  saveEvent: function (data) {
    return axios.post('/api/events', data)
  },
  // Send Email
  sendEmail: function (data) {
    return axios.post('/api/email', data)
  },
  // Get Todo
  getTodo: function () {
    return axios.get('/api/todos')
  },
  // Save Todo
  saveTodo: function (data) {
    return axios.post('/api/todos', data)
  },
  // Update Todo
  updateTodo: function (id, data) {
    return axios.put('api/todos/listed/' + id, data)
  }
}
