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
  // login
  login: function (data) {
    return axios.post('/login', data)
  },
  // User Registration
  registerUser: function (userData) {
    return axios.post('/api/user', userData)
  },
  // Gets all events of user
  getEvents: function () {
    return axios.get('/api/events/')
  },
  // Delete Event
  deleteEvent:  function(id) {
    return axios.delete('/api/events/' + id)
  },
  // Create Event
  saveEvent: function (data) {
    return axios.post('/api/events', data)
  },
  // Find event by Id
  getEventId: function (id) {
    return axios.get('/api/events/' + id)
  },
  // Update event
  updateEvent: function (id, eventData){
    return axios.put('/api/events/' + id, eventData)
  }
}
