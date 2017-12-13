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
  // Get a guest from the database
  getGuestByHash: function (hash, id) {
    return axios.get('/api/guests/rsvp/' + hash + '/' + id)
  },
  // User Registration
  registerUser: function (userData) {
    return axios.post('/api/user', userData)
  },
  // Gets all events
  getEvents: function () {
    return axios.get('/api/events/')
  },
  // Get event by Event Id
  getEventById: function (id) {
    return axios.get('/api/events/' + id)
  },
  // Get all Events from User
  getEventByUserId: function (id) {
    return axios.get('/api/events/user/' + id)
  },
  // Create Event
  saveEvent: function (data) {
    return axios.post('/api/events', data)
  },
  // Delete Event
  deleteEvent: function (id) {
    return axios.delete('/api/events/' + id)
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
  },
  // Done Todo
  doneTodo: function () {
    return axios.get('/api/todos/done')
  },
  // UnDone Todo
  unDoneTodo: function () {
    return axios.get('/api/todos/undone')
  },
  // Delete Todo
  deleteTodo: function (id) {
    return axios.delete('/api/todos/listed/' + id)
  },
  // Get Todo by Event
  getTodoByEvent: function (id) {
    return axios.get('/api/todos/event/' + id)
  },
  // Get Guest by Event
  getGuestByEvent: function (id) {
    return axios.get('/api/guests/event/' + id)
  }
}
